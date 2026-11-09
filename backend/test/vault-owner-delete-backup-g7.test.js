import { describe, it, expect } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, newUser, freshIp, ORIGIN, settle } from './helpers.js';
import { cleanupAbandonedUploads } from '../src/processing.js';
import { runBackup, vaultBackupKey, restoreBackup, purgeBackupForMedia } from '../src/backup.js';
import { DELETE_R2_PENDING_ERR } from '../src/media-config.js';
import worker from '../src/index.js';

const pad = (head, n = 256) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = i & 0xff; return b; };
const JPEG = pad([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46]);
const put = async (u, url, bytes) => (await SELF.fetch(`https://api.test${url}`, {
  method: 'PUT', body: bytes,
  headers: { Origin: ORIGIN, Cookie: u.cookie, 'Content-Length': String(bytes.length), 'Content-Type': 'application/octet-stream', 'CF-Connecting-IP': freshIp() },
})).status;
async function ready(u, name = 'r.jpg') {
  const c = await call('POST', '/media/uploads', {
    cookie: u.cookie,
    body: { type: 'photo', content_type: 'image/jpeg', filename: name, size: JPEG.length, access: 'private' },
    ip: freshIp(),
  });
  expect(c.status).toBe(201);
  expect(await put(u, c.json.upload.upload_url, JPEG)).toBe(200);
  await call('POST', `/media/${c.json.upload.id}/complete`, { cookie: u.cookie, ip: freshIp() });
  expect(await settle(c.json.upload.id)).toBe('ready');
  return c.json.upload.id;
}
const row = (id) => env.DB.prepare('SELECT * FROM media WHERE id=?').bind(id).first();
const audits = async (id, a) => (await env.DB.prepare('SELECT COUNT(*) n FROM audit_log WHERE action=? AND target=?').bind(a, id).first()).n;
function proxyWith(obj, k, fn) {
  return new Proxy(obj, { get(t, kk) { if (kk === k) return fn(t); const v = t[kk]; return typeof v === 'function' ? v.bind(t) : v; } });
}

describe('G7 owner-delete prunes backup + restore skips when authority known', () => {
  it('after backup then owner delete: primary+backup object gone, media_backups row gone; restore skips', async () => {
    const a = await newUser();
    const id = await ready(a, 'secret-backup.jpg');
    const r = await row(id);
    const bkey = vaultBackupKey(r.object_key);
    const bk = await runBackup(env, 'admin');
    expect(bk.state === 'succeeded' || bk.objects_copied >= 1).toBe(true);
    expect(await env.MEDIA_BACKUP.head(bkey)).toBeTruthy();
    expect(await env.DB.prepare('SELECT 1 AS ok FROM media_backups WHERE media_id=?').bind(id).first()).toBeTruthy();

    // Snapshot old manifest that still lists id (before a later rewrite)
    const manifestsBefore = (await env.MEDIA_BACKUP.list({ prefix: 'manifests/' })).objects
      .map((o) => o.key).filter((k) => !k.endsWith('latest.json'));
    expect(manifestsBefore.length).toBeGreaterThan(0);
    const oldManifestKey = manifestsBefore[0];
    const oldMan = await (await env.MEDIA_BACKUP.get(oldManifestKey)).json();
    expect(JSON.stringify(oldMan).includes(id)).toBe(true);

    const d = await call('DELETE', `/media/${id}`, { cookie: a.cookie, ip: freshIp() });
    expect([200, 202]).toContain(d.status);
    expect(d.json.media.deleted).toBe(true);
    expect(await audits(id, 'media.deleted')).toBe(1);
    expect(await audits(id, 'media.upload_abandoned')).toBe(0);

    if (d.status === 202) await cleanupAbandonedUploads(env);

    expect(await env.MEDIA.head(r.object_key)).toBeNull();
    expect(await env.MEDIA_BACKUP.head(bkey)).toBeNull();
    expect(await env.DB.prepare('SELECT 1 AS ok FROM media_backups WHERE media_id=?').bind(id).first()).toBeFalsy();
    const tomb = await row(id);
    expect(tomb.state).toBe('deleted');
    expect(tomb.deleted_at).toBeTruthy();
    expect(tomb.last_error).toMatch(/deleted by owner/i);

    // Old manifest may still *mention* the id as text, but restore must not resurrect.
    const report = await restoreBackup({
      sourceBucket: env.MEDIA_BACKUP,
      targetDb: env.DB,
      targetBucket: env.MEDIA,
      manifestKey: oldManifestKey,
      confirmIsolatedTarget: true,
      // Target already has owner-delete tombstone; also pass id explicitly for old manifests lacking deleted_entries.
      extraDeletedIds: [id],
      deletionSnapshotDb: env.DB,
    });
    expect(report.skipped_missing_backup.includes(id) || report.skipped_owner_deleted.includes(id)).toBe(true);
    expect(report.restored === 0 || !report.errors.some((e) => e.media_id === id && !String(e.error).includes('skip'))).toBe(true);
    const after = await row(id);
    expect(after.state).toBe('deleted');
    expect(after.deleted_at).toBeTruthy();
    expect(await env.MEDIA.head(r.object_key)).toBeNull();
  });

  it('backup R2 delete failure → 202; retry purges backup; exact 1 media.deleted', async () => {
    const a = await newUser();
    const id = await ready(a, 'bak-fail.jpg');
    const r = await row(id);
    const bkey = vaultBackupKey(r.object_key);
    await runBackup(env, 'admin');
    expect(await env.MEDIA_BACKUP.head(bkey)).toBeTruthy();

    const failBak = proxyWith(env.MEDIA_BACKUP, 'delete', () => async () => { throw new Error('BACKUP R2 503'); });
    const req = new Request(`https://api.test/media/${id}`, {
      method: 'DELETE',
      headers: { Origin: ORIGIN, Cookie: a.cookie, 'CF-Connecting-IP': freshIp() },
    });
    const res = await worker.fetch(req, { ...env, MEDIA_BACKUP: failBak }, { waitUntil() {} });
    expect(res.status).toBe(202);
    const body = await res.json();
    expect(body.media.cleanup_pending).toBe(true);
    expect(body.media.message).toMatch(/cleanup/i);
    expect((await row(id)).last_error).toBe(DELETE_R2_PENDING_ERR);
    expect(await audits(id, 'media.deleted')).toBe(1);
    // Primary may already be gone; backup still present until heal
    expect(await env.MEDIA_BACKUP.head(bkey)).toBeTruthy();

    await cleanupAbandonedUploads({ ...env, MEDIA_BACKUP: failBak });
    expect((await row(id)).last_error).toMatch(/owner delete/i);
    expect((await row(id)).last_error).toMatch(/;n=1$/);

    await cleanupAbandonedUploads(env);
    expect(await env.MEDIA_BACKUP.head(bkey)).toBeNull();
    expect(await env.DB.prepare('SELECT 1 AS ok FROM media_backups WHERE media_id=?').bind(id).first()).toBeFalsy();
    expect((await row(id)).last_error).toBe('deleted by owner');
    expect(await audits(id, 'media.deleted')).toBe(1);
    expect(await audits(id, 'media.upload_abandoned')).toBe(0);
  });

  it('concurrent backup vs delete: no media_backups row / backup object left for deleted id', async () => {
    const a = await newUser();
    const id = await ready(a, 'race.jpg');
    const r = await row(id);
    const bkey = vaultBackupKey(r.object_key);
    // Start backup (may copy), then delete immediately, then finish another backup pass
    const pBackup = runBackup(env, 'admin');
    const d = await call('DELETE', `/media/${id}`, { cookie: a.cookie, ip: freshIp() });
    expect([200, 202]).toContain(d.status);
    await pBackup;
    if (d.status === 202) await cleanupAbandonedUploads(env);
    await runBackup(env, 'admin');
    await cleanupAbandonedUploads(env);
    expect(await env.MEDIA.head(r.object_key)).toBeNull();
    expect(await env.MEDIA_BACKUP.head(bkey)).toBeNull();
    expect(await env.DB.prepare('SELECT 1 AS ok FROM media_backups WHERE media_id=?').bind(id).first()).toBeFalsy();
    expect((await row(id)).state).toBe('deleted');
  });

  it('purgeBackupForMedia refuses cross-row tamper keys', async () => {
    const a = await newUser();
    const b = await newUser();
    const idA = await ready(a, 'a.jpg');
    const idB = await ready(b, 'b.jpg');
    const ra = await row(idA);
    const rb = await row(idB);
    await runBackup(env, 'admin');
    // Forge a row that points at B's object_key while claiming A's id — must refuse
    await expect(purgeBackupForMedia(env, { ...ra, object_key: rb.object_key })).rejects.toThrow(/refusing non-vault|VaultKey/i);
    expect(await env.MEDIA_BACKUP.head(vaultBackupKey(rb.object_key))).toBeTruthy();
  });
});

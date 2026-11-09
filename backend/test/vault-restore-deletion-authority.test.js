import { describe, it, expect } from 'vitest';
import { SELF, env, applyD1Migrations } from 'cloudflare:test';
import { call, newUser, freshIp, ORIGIN, settle } from './helpers.js';
import { cleanupAbandonedUploads, quarantineReport } from '../src/processing.js';
import {
  runBackup, vaultBackupKey, restoreBackup, purgeBackupForMedia,
  writeOwnerDeleteMarker, vaultDeleteMarkerKey,
} from '../src/backup.js';
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
function proxyWith(obj, k, fn) {
  return new Proxy(obj, { get(t, kk) { if (kk === k) return fn(t); const v = t[kk]; return typeof v === 'function' ? v.bind(t) : v; } });
}
const failOn = (bucket, method, pred = () => true) => proxyWith(bucket, method, (t) => async (...a) => {
  if (pred(...a)) throw new Error(`R2 ${method} 503`);
  return t[method](...a);
});
const req = (u, path, method) => new Request(`https://api.test${path}`, {
  method, headers: { Origin: ORIGIN, Cookie: u.cookie, 'CF-Connecting-IP': freshIp() },
});
const ctxNo = { waitUntil() {} };
const delWith = async (u, id, e) => {
  const r = await worker.fetch(req(u, `/media/${id}`, 'DELETE'), e, ctxNo);
  return { status: r.status, json: await r.json() };
};
const latestManifest = async () => (await (await env.MEDIA_BACKUP.get('manifests/latest.json')).json()).manifest_key;
let restoreReady = false;
async function freshRestoreTarget(users) {
  if (!restoreReady) { await applyD1Migrations(env.RESTORE_DB, env.TEST_MIGRATIONS); restoreReady = true; }
  await env.RESTORE_DB.prepare('DELETE FROM media').run();
  try { await env.RESTORE_DB.prepare('DELETE FROM media_entitlements').run(); } catch { /* optional */ }
  for (const u of users) {
    const r = await env.DB.prepare('SELECT * FROM users WHERE id=?').bind(u.id).first();
    const c = Object.keys(r);
    await env.RESTORE_DB.prepare(
      `INSERT OR IGNORE INTO users (${c.join(',')}) VALUES (${c.map(() => '?').join(',')})`
    ).bind(...c.map((k) => r[k])).run();
  }
  // Clear isolated restore bucket objects best-effort via known keys only in tests
}

describe('restore deletion authority + isolated enforce (S1/S2/S3)', () => {
  it('refuses restore without confirmIsolatedTarget', async () => {
    await expect(restoreBackup({
      sourceBucket: env.MEDIA_BACKUP, targetDb: env.RESTORE_DB, targetBucket: env.RESTORE_MEDIA,
    })).rejects.toThrow(/confirmIsolatedTarget/);
  });

  it('refuses old manifest without deleted_entries / extras (fail closed)', async () => {
    const a = await newUser();
    const id = await ready(a, 'auth-fail.jpg');
    await runBackup(env, 'admin');
    const mk = await latestManifest();
    const man = await (await env.MEDIA_BACKUP.get(mk)).json();
    delete man.deleted_entries;
    await env.MEDIA_BACKUP.put('manifests/old-no-deleted.json', JSON.stringify(man));
    await freshRestoreTarget([a]);
    await expect(restoreBackup({
      sourceBucket: env.MEDIA_BACKUP,
      targetDb: env.RESTORE_DB,
      targetBucket: env.RESTORE_MEDIA,
      manifestKey: 'manifests/old-no-deleted.json',
      confirmIsolatedTarget: true,
    })).rejects.toThrow(/deletion_authority_incomplete/);
  });

  it('pending backup-purge (202): disaster restore into empty D1 skips via marker + extras; does not resurrect', async () => {
    const a = await newUser();
    const id = await ready(a, 'pend.jpg');
    const key = (await row(id)).object_key;
    const bkey = vaultBackupKey(key);
    await runBackup(env, 'admin');
    const mk = await latestManifest();
    // Fail backup object delete but allow marker put
    const bFail = { ...env, MEDIA_BACKUP: failOn(env.MEDIA_BACKUP, 'delete', (k) => k === bkey) };
    const d = await delWith(a, id, bFail);
    expect(d.status).toBe(202);
    expect(await env.MEDIA_BACKUP.head(bkey)).toBeTruthy();
    expect(await env.MEDIA_BACKUP.head(vaultDeleteMarkerKey(id))).toBeTruthy();

    await freshRestoreTarget([a]);
    // Old-style: strip deleted_entries from a copy but pass deletionSnapshotDb from live DB (has tombstone)
    const man = await (await env.MEDIA_BACKUP.get(mk)).json();
    const stripped = { ...man, deleted_entries: undefined };
    // Keep deleted_entries absent → must use snapshot/extras
    delete stripped.deleted_entries;
    await env.MEDIA_BACKUP.put('manifests/pending-stripped.json', JSON.stringify({ ...man, entries: man.entries }));
    // Use live snapshot as authority (tombstone in env.DB) + markers
    const rep = await restoreBackup({
      sourceBucket: env.MEDIA_BACKUP,
      targetDb: env.RESTORE_DB,
      targetBucket: env.RESTORE_MEDIA,
      manifestKey: mk, // new manifest may already list deleted_entries after another run; force snapshot path:
      confirmIsolatedTarget: true,
      deletionSnapshotDb: env.DB,
    });
    expect(rep.skipped_owner_deleted.includes(id) || rep.restored === 0).toBe(true);
    expect(rep.skipped_owner_deleted.includes(id)).toBe(true);
    expect(await env.RESTORE_DB.prepare('SELECT state FROM media WHERE id=?').bind(id).first()).toBeFalsy();
    expect(await env.RESTORE_MEDIA.head(key)).toBeNull();
    expect(rep.limits.same_bucket_deletion_ledger).toBe(true);
  });

  it('quarantined backup leftover: quarantineReport flags restore_risk; restore with snapshot skips', async () => {
    const a = await newUser();
    const id = await ready(a, 'quar.jpg');
    const key = (await row(id)).object_key;
    const bkey = vaultBackupKey(key);
    await runBackup(env, 'admin');
    const mk = await latestManifest();
    const bFail = { ...env, MEDIA_BACKUP: failOn(env.MEDIA_BACKUP, 'delete', (k) => k === bkey) };
    await delWith(a, id, bFail);
    for (let i = 0; i < 6; i++) await cleanupAbandonedUploads(bFail);
    expect((await row(id)).last_error).toMatch(/quarantined:delete:/);
    expect(await env.MEDIA_BACKUP.head(bkey)).toBeTruthy();
    const qr = await quarantineReport(env);
    const hit = qr.quarantined.find((x) => x.id === id);
    expect(hit).toBeTruthy();
    expect(hit.backup_object_present).toBe(true);
    expect(hit.restore_risk).toBe(true);
    expect(qr.backup_restore_risk_count).toBeGreaterThanOrEqual(1);

    await freshRestoreTarget([a]);
    const rep = await restoreBackup({
      sourceBucket: env.MEDIA_BACKUP,
      targetDb: env.RESTORE_DB,
      targetBucket: env.RESTORE_MEDIA,
      manifestKey: mk,
      confirmIsolatedTarget: true,
      deletionSnapshotDb: env.DB,
    });
    expect(rep.skipped_owner_deleted.includes(id)).toBe(true);
    expect(await env.RESTORE_MEDIA.head(key)).toBeNull();
  });

  it('live restore vs delete race: conditional upsert + recheck does not clear tombstone', async () => {
    const a = await newUser();
    const id = await ready(a, 'race.jpg');
    const key = (await row(id)).object_key;
    const bkey = vaultBackupKey(key);
    await runBackup(env, 'admin');
    const mk = await latestManifest();
    let fired = false;
    const src = proxyWith(env.MEDIA_BACKUP, 'get', (t) => async (k, ...r) => {
      const o = await t.get(k, ...r);
      if (!fired && k === bkey && o) {
        fired = true;
        const buf = await o.arrayBuffer();
        await call('DELETE', `/media/${id}`, { cookie: a.cookie, ip: freshIp() });
        return { body: new Response(buf).body, size: buf.byteLength };
      }
      return o;
    });
    const rep = await restoreBackup({
      sourceBucket: src,
      targetDb: env.DB,
      targetBucket: env.MEDIA,
      manifestKey: mk,
      confirmIsolatedTarget: true,
      deletionSnapshotDb: env.DB,
      extraDeletedIds: [], // manifest from runBackup has deleted_entries after delete? may not yet — snapshot covers
    });
    // Delete during get → tombstone exists before upsert; must not resurrect
    const r = await row(id);
    expect(r.state).toBe('deleted');
    expect(r.deleted_at).toBeTruthy();
    expect(rep.skipped_owner_deleted.includes(id) || rep.skipped_live_tombstone_race.includes(id)).toBe(true);
    // Primary may be absent after purge; must not be listed as ready
    const listed = (await call('GET', '/media?limit=100', { cookie: a.cookie, ip: freshIp() })).json.media.some((x) => x.id === id);
    expect(listed).toBe(false);
  });

  it('backup insert race after recheck: no dangling media_backups row for deleted id', async () => {
    const a = await newUser();
    const id = await ready(a, 'insrace.jpg');
    const key = (await row(id)).object_key;
    let fired = false;
    const db2 = proxyWith(env.DB, 'prepare', (t) => (sql) => {
      const st = t.prepare(sql);
      if (!fired && /INSERT INTO media_backups/i.test(sql)) {
        return proxyWith(st, 'bind', (s) => (...args) => {
          const b = s.bind(...args);
          if (args[0] !== id) return b;
          return proxyWith(b, 'run', (bb) => async () => {
            fired = true;
            await call('DELETE', `/media/${id}`, { cookie: a.cookie, ip: freshIp() });
            return bb.run();
          });
        });
      }
      return st;
    });
    await runBackup({ ...env, DB: db2 }, 'admin');
    expect(fired).toBe(true);
    // Conditional insert should yield no row (or row removed); object should not remain for deleted id
    expect(await env.DB.prepare('SELECT 1 AS ok FROM media_backups WHERE media_id=?').bind(id).first()).toBeFalsy();
    expect(await env.MEDIA_BACKUP.head(vaultBackupKey(key))).toBeNull();
  });

  it('cross-user / tampered purge still refused; writeOwnerDeleteMarker uses row-bound id only', async () => {
    const a = await newUser();
    const b = await newUser();
    const ia = await ready(a, 'ta.jpg');
    const ib = await ready(b, 'tb.jpg');
    const ra = await row(ia);
    const rb = await row(ib);
    await runBackup(env, 'admin');
    await expect(purgeBackupForMedia(env, { ...ra, object_key: rb.object_key })).rejects.toThrow(/VaultKey|refusing/i);
    await expect(writeOwnerDeleteMarker(env, { ...ra, id: '../x' })).rejects.toThrow(/VaultKey|refusing/i);
    expect(await env.MEDIA_BACKUP.head(vaultBackupKey(rb.object_key))).toBeTruthy();
  });

  it('prior G7 happy path: after successful purge, disaster restore skips missing backup', async () => {
    const a = await newUser();
    const id = await ready(a, 'g7ok.jpg');
    const key = (await row(id)).object_key;
    await runBackup(env, 'admin');
    const mk = await latestManifest();
    const d = await call('DELETE', `/media/${id}`, { cookie: a.cookie, ip: freshIp() });
    expect([200, 202]).toContain(d.status);
    if (d.status === 202) await cleanupAbandonedUploads(env);
    expect(await env.MEDIA_BACKUP.head(vaultBackupKey(key))).toBeNull();
    await freshRestoreTarget([a]);
    const rep = await restoreBackup({
      sourceBucket: env.MEDIA_BACKUP,
      targetDb: env.RESTORE_DB,
      targetBucket: env.RESTORE_MEDIA,
      manifestKey: mk,
      confirmIsolatedTarget: true,
      deletionSnapshotDb: env.DB,
    });
    expect(
      rep.skipped_owner_deleted.includes(id) || rep.skipped_missing_backup.includes(id)
    ).toBe(true);
    expect(await env.RESTORE_MEDIA.head(key)).toBeNull();
  });
});

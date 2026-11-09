import { describe, it, expect } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, newUser, ORIGIN, settle } from './helpers.js';
import { runBackup, restoreBackup, vaultBackupKey } from '../src/backup.js';
import { VaultKeyError } from '../src/vault-keys.js';

const ascii = (s) => [...s].map(c => c.charCodeAt(0));
const pad = (head, n) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = (i * 7) & 0xff; return b; };
const PNG = (n = 256) => pad([0x89, ...ascii('PNG'), 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13, ...ascii('IHDR'), 0, 0, 2, 128, 0, 0, 1, 224, 8, 2, 0, 0, 0], n);
const raw = (u, method, path, body) => SELF.fetch(`https://api.test${path}`, { method, body,
  headers: { Origin: ORIGIN, Cookie: u.cookie, 'CF-Connecting-IP': '10.77.2.2', ...(body ? { 'Content-Length': String(body.length) } : {}) } });
const create = (u, body) => call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/png', filename: 'a.png', ...body } });
const MUSIC = 'planted music object';
async function plantMusic(u) { const k = `music/${u.id}/mus_planted0002/track.mp3`; await env.MEDIA.put(k, MUSIC); await env.MEDIA_BACKUP.put(k, MUSIC); return k; }
async function survives(k) {
  for (const b of [env.MEDIA, env.MEDIA_BACKUP]) { const o = await b.get(k); expect(o).not.toBeNull(); expect(await o.text()).toBe(MUSIC); }
}

describe('Vault slice 4 operations never touch music/ keys', () => {
  it('cancel (single + multipart) deletes only the vault object; a tampered row pointing at music/ is refused', async () => {
    const u = await newUser(); const mk = await plantMusic(u);
    const c = await create(u, { size: 256 });
    expect((await raw(u, 'PUT', c.json.upload.upload_url, PNG())).status).toBe(200);
    const vk = (await env.DB.prepare('SELECT object_key FROM media WHERE id=?').bind(c.json.upload.id).first()).object_key;
    expect(vk.startsWith(`vault/photo/${u.id}/`)).toBe(true);
    expect((await call('DELETE', `/media/uploads/${c.json.upload.id}`, { cookie: u.cookie })).status).toBe(200);
    expect(await env.MEDIA.head(vk)).toBeNull();
    const mp = await create(u, { size: 6 * 1024 * 1024, multipart: true, part_size: 5 * 1024 * 1024 });
    expect(mp.status).toBe(201);
    expect((await call('DELETE', `/media/uploads/${mp.json.upload.id}`, { cookie: u.cookie })).status).toBe(200);
    const t = await create(u, { size: 10 });
    await env.DB.prepare('UPDATE media SET object_key=? WHERE id=?').bind(mk, t.json.upload.id).run();
    const r = await call('DELETE', `/media/uploads/${t.json.upload.id}`, { cookie: u.cookie });
    expect(r.status).toBeGreaterThanOrEqual(400);
    await survives(mk);
  });

  it('backup copies only vault/ objects to objects/vault/...; music keys are ignored and a tampered row is not copied', async () => {
    const u = await newUser(); const mk = await plantMusic(u);
    const c = await create(u, { size: 256 });
    await raw(u, 'PUT', c.json.upload.upload_url, PNG());
    await call('POST', `/media/${c.json.upload.id}/complete`, { cookie: u.cookie });
    expect(await settle(c.json.upload.id)).toBe('ready');
    const t = await create(u, { size: 10 });
    await env.DB.prepare(`UPDATE media SET object_key=?, state='ready', checksum_sha256='0000000000000000000000000000000000000000000000000000000000000000', ready_at=? WHERE id=?`).bind(mk, new Date().toISOString(), t.json.upload.id).run();
    const run = await runBackup(env, 'admin');
    expect(run.errors).toBeGreaterThanOrEqual(1);
    const b = await env.DB.prepare('SELECT backup_key FROM media_backups WHERE media_id=?').bind(c.json.upload.id).first();
    expect(b.backup_key).toBe(`objects/vault/photo/${u.id}/${c.json.upload.id}`);
    expect(await env.DB.prepare('SELECT 1 FROM media_backups WHERE media_id=?').bind(t.json.upload.id).first()).toBeNull();
    const listed = await env.MEDIA_BACKUP.list({ prefix: 'objects/' });
    expect(listed.objects.every(o => o.key.startsWith('objects/vault/'))).toBe(true);
    expect(() => vaultBackupKey(mk)).toThrow(VaultKeyError);
    await env.DB.prepare(`UPDATE media SET deleted_at=?, state='deleted' WHERE id=?`).bind(new Date().toISOString(), t.json.upload.id).run();
    await survives(mk);
  });

  it('restore refuses manifest entries that point outside vault/ and never writes music/ keys', async () => {
    const u = await newUser(); const mk = await plantMusic(u);
    const target = env.RESTORE_MEDIA;
    await target.put(mk, MUSIC);
    const man = { format: 'pikk-vault-backup-manifest/1', run_id: 'r1', deleted_entries: [], entries: [
      { id: 'med_evil00001', owner_id: u.id, object_key: mk, backup_key: 'objects/' + mk, checksum_sha256: 'x', size_bytes: 1 },
      { id: 'med_evil00002', owner_id: u.id, object_key: `vault/photo/${u.id}/med_evil00002`, backup_key: mk, checksum_sha256: 'x', size_bytes: 1 },
    ], entitlements: [] };
    await env.MEDIA_BACKUP.put('manifests/evil.json', JSON.stringify(man));
    const rep = await restoreBackup({ sourceBucket: env.MEDIA_BACKUP, targetDb: env.DB, targetBucket: target, manifestKey: 'manifests/evil.json', confirmIsolatedTarget: true, extraDeletedIds: [] });
    expect(rep.restored).toBe(0);
    expect(rep.errors.map(e => e.media_id).sort()).toEqual(['med_evil00001', 'med_evil00002']);
    expect(await (await target.get(mk)).text()).toBe(MUSIC);
    await survives(mk);
  });
});

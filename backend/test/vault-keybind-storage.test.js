import { describe, it, expect } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, newUser, ORIGIN, settle } from './helpers.js';
import { runBackup, restoreBackup } from '../src/backup.js';
import { startMultipart } from '../src/multipart.js';
import { VaultKeyError } from '../src/vault-keys.js';
import mediaSrc from '../src/media.js?raw';
import multipartSrc from '../src/multipart.js?raw';
import processingSrc from '../src/processing.js?raw';
import backupSrc from '../src/backup.js?raw';
import contentSrc from '../src/media-content.js?raw';
import storageSrc from '../src/storage.js?raw';

const ascii = (s) => [...s].map(c => c.charCodeAt(0));
const pad = (head, n) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = (i * 7) & 0xff; return b; };
const PNG = (n = 256) => pad([0x89, ...ascii('PNG'), 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13, ...ascii('IHDR'), 0, 0, 2, 128, 0, 0, 1, 224, 8, 2, 0, 0, 0], n);
const raw = (u, method, path, body) => SELF.fetch(`https://api.test${path}`, { method, body,
  headers: { Origin: ORIGIN, Cookie: u.cookie, 'CF-Connecting-IP': '10.77.3.3', ...(body ? { 'Content-Length': String(body.length) } : {}) } });
const create = (u, body) => call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/png', filename: 'a.png', ...body } });
const VICTIM = 'victim owner object';
const ATTACK = 'attacker bytes';
const sha = async (t) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)))].map(x => x.toString(16).padStart(2, '0')).join('');
const victimIntact = async (bucket, k) => { const o = await bucket.get(k); expect(o).not.toBeNull(); expect(await o.text()).toBe(VICTIM); };

describe('slice 4: keys bound to their row (multipart, backup, restore)', () => {
  it('multipart start refuses a key that is not this row\'s owner/type/id (no R2 multipart, no session row)', async () => {
    const a = await newUser(); const b = await newUser();
    const row = { id: 'med_mpstart0001', owner_id: a.id, media_type: 'photo' };
    for (const key of [`vault/photo/${b.id}/med_mpstart0001`, `vault/video/${a.id}/med_mpstart0001`, `vault/photo/${a.id}/med_mpstart0002`]) {
      await expect(startMultipart(env, row, key, 6 * 1024 * 1024, 5 * 1024 * 1024)).rejects.toThrow(VaultKeyError);
    }
    expect(await env.DB.prepare('SELECT 1 FROM media_multipart WHERE media_id=?').bind(row.id).first()).toBeNull();
  });

  it("multipart cancel on a row repointed at another owner's key never deletes that object", async () => {
    const a = await newUser(); const b = await newUser();
    const victim = `vault/photo/${b.id}/med_victimcancel1`;
    await env.MEDIA.put(victim, VICTIM);
    const mp = await create(a, { size: 6 * 1024 * 1024, multipart: true, part_size: 5 * 1024 * 1024 });
    expect(mp.status).toBe(201);
    await env.DB.prepare('UPDATE media SET object_key=? WHERE id=?').bind(victim, mp.json.upload.id).run();
    const r = await call('DELETE', `/media/uploads/${mp.json.upload.id}`, { cookie: a.cookie });
    expect(r.status).toBeGreaterThanOrEqual(400);
    await victimIntact(env.MEDIA, victim);
  });

  it("backup never copies another owner's object for a tampered row", async () => {
    const a = await newUser(); const b = await newUser();
    const victim = `vault/photo/${b.id}/med_victimbackup1`;
    await env.MEDIA.put(victim, VICTIM);
    const t = await create(a, { size: 10 });
    await env.DB.prepare(`UPDATE media SET object_key=?, state='ready', checksum_sha256=?, ready_at=? WHERE id=?`)
      .bind(victim, await sha(VICTIM), new Date().toISOString(), t.json.upload.id).run();
    const run = await runBackup(env, 'admin');
    expect(run.errors).toBeGreaterThanOrEqual(1);
    expect(await env.DB.prepare('SELECT 1 FROM media_backups WHERE media_id=?').bind(t.json.upload.id).first()).toBeNull();
    expect(await env.MEDIA_BACKUP.head(`objects/${victim}`)).toBeNull();
    await env.DB.prepare(`UPDATE media SET deleted_at=?, state='deleted' WHERE id=?`).bind(new Date().toISOString(), t.json.upload.id).run();
  });

  it("restore refuses entries whose key is not their own owner/type/id and never overwrites another owner's object or row", async () => {
    const a = await newUser(); const b = await newUser();
    const target = env.RESTORE_MEDIA;
    const victim = `vault/photo/${b.id}/med_victimrestor1`;
    await target.put(victim, VICTIM);
    await env.MEDIA_BACKUP.put(`objects/${victim}`, ATTACK);
    // b owns a row med_bowned00001 in the target DB; a manifest entry for a with the same id must not replace it.
    const bRow = await create(b, { size: 10 });
    const bid = bRow.json.upload.id;
    const aKeyForBid = `vault/photo/${a.id}/${bid}`;
    await env.MEDIA_BACKUP.put(`objects/${aKeyForBid}`, ATTACK);
    const typeKey = `vault/video/${a.id}/med_typemism01`;
    await env.MEDIA_BACKUP.put(`objects/${typeKey}`, ATTACK);
    const base = { checksum_sha256: await sha(ATTACK), size_bytes: ATTACK.length, media_type: 'photo', state: 'ready', is_story: 0, access_policy: 'private', filename: 'a.png', declared_content_type: 'image/png', created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    const man = { format: 'pikk-vault-backup-manifest/1', run_id: 'rk', entries: [
      { ...base, id: 'med_victimrestor1', owner_id: a.id, object_key: victim, backup_key: `objects/${victim}` },
      { ...base, id: 'med_typemism01', owner_id: a.id, object_key: typeKey, backup_key: `objects/${typeKey}` },
      { ...base, id: bid, owner_id: a.id, object_key: aKeyForBid, backup_key: `objects/${aKeyForBid}` },
    ], entitlements: [] };
    await env.MEDIA_BACKUP.put('manifests/keybind.json', JSON.stringify(man));
    const rep = await restoreBackup({ sourceBucket: env.MEDIA_BACKUP, targetDb: env.DB, targetBucket: target, manifestKey: 'manifests/keybind.json' });
    expect(rep.restored).toBe(0);
    expect(rep.errors.map(e => e.media_id).sort()).toEqual([bid, 'med_typemism01', 'med_victimrestor1'].sort());
    await victimIntact(target, victim);
    expect(await target.head(typeKey)).toBeNull();
    expect(await target.head(aKeyForBid)).toBeNull();
    expect((await env.DB.prepare('SELECT owner_id FROM media WHERE id=?').bind(bid).first()).owner_id).toBe(b.id);
  });

  it("ownedMedia: complete() on a row repointed at another owner's object never reads/accepts it", async () => {
    const a = await newUser(); const b = await newUser();
    const victim = `vault/photo/${b.id}/med_victimcomplt1`;
    await env.MEDIA.put(victim, PNG());
    const t = await create(a, { size: 256 });
    await env.DB.prepare(`UPDATE media SET object_key=?, state='uploaded' WHERE id=?`).bind(victim, t.json.upload.id).run();
    const r = await call('POST', `/media/${t.json.upload.id}/complete`, { cookie: a.cookie });
    expect(r.status).toBeGreaterThanOrEqual(400);
    const row = await env.DB.prepare('SELECT state, checksum_sha256 FROM media WHERE id=?').bind(t.json.upload.id).first();
    expect(row.state).toBe('uploaded'); expect(row.checksum_sha256).toBeNull();
    expect(await env.MEDIA.head(victim)).not.toBeNull();
  });

  it('no Vault module writes or deletes bucket objects directly (only via vaultDeleteFor/vaultPutFor/vaultDelete)', () => {
    const rawMutation = /\b(?:env\.MEDIA|bucket\(env\)|storage\(env\)|bucket|targetBucket)\s*\.\s*(?:delete|put)\s*\(/;
    for (const [name, src] of Object.entries({ mediaSrc, multipartSrc, processingSrc, backupSrc, contentSrc, storageSrc })) {
      expect(src.length).toBeGreaterThan(200);
      const hits = src.split('\n').filter(l => rawMutation.test(l) && !/^\s*\/\//.test(l));
      expect({ name, hits }).toEqual({ name, hits: [] });
    }
  });
});

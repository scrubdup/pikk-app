import { describe, it, expect, beforeEach } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, newUser, ORIGIN } from './helpers.js';
import { assertVaultKey, vaultKey, vaultDelete, vaultList, isVaultKey, VaultKeyError } from '../src/vault-keys.js';

const pad = (head, n = 256) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = i & 0xff; return b; };
const ascii = (s) => [...s].map(c => c.charCodeAt(0));
const JPEG = pad([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, ...ascii('JFIF')]);
const EXE = pad([...ascii('MZ'), 0x90, 0, 3, 0, 0, 0, 4, 0, 0, 0]);
export const MUSIC_BYTES = 'planted music object';

async function put(u, url, bytes) {
  const res = await SELF.fetch(`https://api.test${url}`, { method: 'PUT', body: bytes,
    headers: { Origin: ORIGIN, Cookie: u.cookie, 'Content-Length': String(bytes.length), 'Content-Type': 'application/octet-stream', 'CF-Connecting-IP': '10.9.9.8' } });
  return res.status;
}
async function plantMusic(u) {
  const key = `music/${u.id}/mus_planted0001/track.mp3`;
  await env.MEDIA.put(key, MUSIC_BYTES);
  return key;
}
async function musicSurvives(key) {
  const o = await env.MEDIA.get(key);
  expect(o).not.toBeNull();
  expect(await o.text()).toBe(MUSIC_BYTES);
}

describe('Vault key prefix guard (shared MEDIA bucket with music/)', () => {
  it('builds vault/<type>/<owner>/<id> keys and refuses everything else', () => {
    expect(vaultKey('photo', 'usr_abc', 'med_12345678')).toBe('vault/photo/usr_abc/med_12345678');
    for (const bad of ['music/usr_a/x/y.mp3', 'u/usr_a/med_1', '', null, undefined, 'vault/', 'vault/photo/usr_a',
      'vault/photo/../music/x', 'vault/photo/usr_a/med_1/extra', 'vaultx/photo/a/b', '/vault/photo/a/b', 'vault/photo/a/b/../../../../music/u/x']) {
      expect(() => assertVaultKey(bad)).toThrow(VaultKeyError);
      expect(isVaultKey(bad)).toBe(false);
    }
    expect(() => vaultKey('photo', '../music', 'x')).toThrow(VaultKeyError);
  });

  it('vaultDelete refuses a music/ key and leaves it intact', async () => {
    const u = await newUser(); const mk = await plantMusic(u);
    await expect(vaultDelete(env.MEDIA, mk)).rejects.toThrow(VaultKeyError);
    await musicSurvives(mk);
  });

  it('vaultList ignores music/ keys and refuses non-vault prefixes', async () => {
    const u = await newUser(); const mk = await plantMusic(u);
    const vk = vaultKey('photo', u.id, 'med_listtest01');
    await env.MEDIA.put(vk, 'v');
    const l = await vaultList(env.MEDIA);
    expect(l.objects.map(o => o.key)).toContain(vk);
    expect(l.objects.every(o => o.key.startsWith('vault/'))).toBe(true);
    await expect(vaultList(env.MEDIA, { prefix: 'music/' })).rejects.toThrow(VaultKeyError);
    await expect(vaultList(env.MEDIA, { prefix: '' })).rejects.toThrow(VaultKeyError);
    await musicSurvives(mk);
  });

  it('upload stores under vault/; a spoofed-type rejection deletes only the vault object, never music/', async () => {
    const u = await newUser(); const mk = await plantMusic(u);
    const c = await call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 'x.jpg', size: EXE.length } });
    expect(await put(u, c.json.upload.upload_url, EXE)).toBe(200);
    const row = await env.DB.prepare('SELECT object_key FROM media WHERE id=?').bind(c.json.upload.id).first();
    expect(row.object_key).toBe(`vault/photo/${u.id}/${c.json.upload.id}`);
    const done = await call('POST', `/media/${c.json.upload.id}/complete`, { cookie: u.cookie });
    expect(done.status).toBe(422);
    expect(await env.MEDIA.head(row.object_key)).toBeNull();
    await musicSurvives(mk);
  });

  it('a tampered DB row pointing at a music/ key cannot make Vault delete it', async () => {
    const u = await newUser(); const mk = await plantMusic(u);
    const c = await call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 'x.jpg', size: EXE.length } });
    await env.DB.prepare('UPDATE media SET object_key=? WHERE id=?').bind(mk, c.json.upload.id).run();
    // PUT would write to the music key only via put(); guard the reject path: mark uploaded and complete.
    await env.DB.prepare(`UPDATE media SET state='uploaded' WHERE id=?`).bind(c.json.upload.id).run();
    const done = await call('POST', `/media/${c.json.upload.id}/complete`, { cookie: u.cookie });
    expect(done.status).toBeGreaterThanOrEqual(400);
    await musicSurvives(mk);
  });
});

describe('Vault story sweep vs music/ keys (slice 3)', () => {
  it('sweeping expired stories deletes vault objects only; a music key survives; a tampered row is refused', async () => {
    const { sweepExpiredStories } = await import('../src/processing.js');
    const u = await newUser(); const mk = await plantMusic(u);
    const c = await call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 's.jpg', size: JPEG.length, story: true } });
    expect(await put(u, c.json.upload.upload_url, JPEG)).toBe(200);
    const vk = (await env.DB.prepare('SELECT object_key FROM media WHERE id=?').bind(c.json.upload.id).first()).object_key;
    const bad = await call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 't.jpg', size: 10, story: true } });
    await env.DB.prepare('UPDATE media SET object_key=? WHERE id=?').bind(mk, bad.json.upload.id).run();
    const past = new Date(Date.now() - 1000).toISOString();
    await env.DB.prepare('UPDATE media SET expires_at=? WHERE id IN (?,?)').bind(past, c.json.upload.id, bad.json.upload.id).run();
    const r = await sweepExpiredStories(env);
    expect(r.errors).toBeGreaterThanOrEqual(1);
    expect(await env.MEDIA.head(vk)).toBeNull();
    await musicSurvives(mk);
  });
});

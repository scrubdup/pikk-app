import { describe, it, expect } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, newUser, ORIGIN } from './helpers.js';
import { assertVaultKey, assertVaultKeyFor, VaultKeyError, VAULT_MEDIA_TYPES } from '../src/vault-keys.js';

const VICTIM_BYTES = 'victim vault object';
async function put(u, url, bytes) {
  const res = await SELF.fetch(`https://api.test${url}`, { method: 'PUT', body: bytes,
    headers: { Origin: ORIGIN, Cookie: u.cookie, 'Content-Length': String(bytes.length), 'Content-Type': 'application/octet-stream', 'CF-Connecting-IP': '10.9.9.7' } });
  return res.status;
}

describe('Vault keys are bound to their row (owner, type, id)', () => {
  it("segment check rejects '.' and '..' segments in an otherwise 4-part key", () => {
    for (const bad of ['vault/photo/../med_1', 'vault/../u1/med_1', 'vault/photo/u1/..', 'vault/photo/u1/.', 'vault/photo/u.1/med_1', 'vault/../../x']) {
      expect(() => assertVaultKey(bad)).toThrow(VaultKeyError);
    }
  });

  it('assertVaultKeyFor accepts only the row\'s own owner/type/id', () => {
    const row = { id: 'med_1', owner_id: 'u1', media_type: 'photo' };
    expect(assertVaultKeyFor('vault/photo/u1/med_1', row)).toBe('vault/photo/u1/med_1');
    for (const bad of ['vault/photo/OTHER_OWNER/med_1', 'vault/notatype/u1/med_1', 'vault/video/u1/med_1', 'vault/photo/u1/med_2', 'music/u1/med_1/x', 'vault/photo/u1/..']) {
      expect(() => assertVaultKeyFor(bad, row)).toThrow(VaultKeyError);
    }
    expect(() => assertVaultKeyFor('vault/notatype/u1/med_1', { ...row, media_type: 'notatype' })).toThrow(VaultKeyError);
    expect(() => assertVaultKeyFor('vault/photo/u1/med_1', null)).toThrow(VaultKeyError);
  });

  it('assertVaultKeyFor requires row.id: a non-empty string equal to the key id segment', () => {
    const k = 'vault/photo/u1/med_1';
    for (const id of [undefined, null, '', 0, 1, {}, ['med_1'], 'med_2']) {
      expect(() => assertVaultKeyFor(k, { id, owner_id: 'u1', media_type: 'photo' })).toThrow(VaultKeyError);
    }
    expect(() => assertVaultKeyFor(k, { owner_id: 'u1', media_type: 'photo' })).toThrow(VaultKeyError);
    expect(assertVaultKeyFor(k, { id: 'med_1', owner_id: 'u1', media_type: 'photo' })).toBe(k);
  });

  it('type allowlist is pinned to exactly photo, video, audio', () => {
    expect([...VAULT_MEDIA_TYPES]).toEqual(['photo', 'video', 'audio']);
    expect(Object.isFrozen(VAULT_MEDIA_TYPES)).toBe(true);
    for (const t of ['photo', 'video', 'audio']) expect(assertVaultKeyFor(`vault/${t}/u1/med_1`, { id: 'med_1', owner_id: 'u1', media_type: t })).toBeTruthy();
    for (const t of ['music', 'story', 'image', 'file', 'doc', 'Photo']) {
      expect(() => assertVaultKeyFor(`vault/${t}/u1/med_1`, { id: 'med_1', owner_id: 'u1', media_type: t })).toThrow(VaultKeyError);
    }
  });

  it("ownedMedia: a row repointed at another owner's vault key cannot overwrite it", async () => {
    const a = await newUser(); const b = await newUser();
    const victim = `vault/photo/${b.id}/med_victim0001`;
    await env.MEDIA.put(victim, VICTIM_BYTES);
    const body = new TextEncoder().encode('x'.repeat(64));
    const c = await call('POST', '/media/uploads', { cookie: a.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 'x.jpg', size: body.length } });
    await env.DB.prepare('UPDATE media SET object_key=? WHERE id=?').bind(victim, c.json.upload.id).run();
    expect(await put(a, c.json.upload.upload_url, body)).toBeGreaterThanOrEqual(400);
    expect(await (await env.MEDIA.get(victim)).text()).toBe(VICTIM_BYTES);
  });

  it('ownedMedia: a row whose key type differs from media_type is refused', async () => {
    const a = await newUser();
    const body = new TextEncoder().encode('x'.repeat(64));
    const c = await call('POST', '/media/uploads', { cookie: a.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 'x.jpg', size: body.length } });
    const wrong = `vault/video/${a.id}/${c.json.upload.id}`;
    await env.MEDIA.put(wrong, VICTIM_BYTES);
    await env.DB.prepare('UPDATE media SET object_key=? WHERE id=?').bind(wrong, c.json.upload.id).run();
    expect(await put(a, c.json.upload.upload_url, body)).toBeGreaterThanOrEqual(400);
    expect(await (await env.MEDIA.get(wrong)).text()).toBe(VICTIM_BYTES);
  });
});

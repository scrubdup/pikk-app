import { describe, it, expect, vi } from 'vitest';
import { env } from 'cloudflare:test';
import { newUser, freshIp, ORIGIN } from './helpers.js';
import { loadSession } from '../src/auth.js';
import { musicUploadRoute } from '../src/music-upload.js';
import { musicKey } from '../src/music-keys.js';

async function sessionFor(user) {
  const req = new Request('https://api.test/media/music', {
    headers: { Origin: ORIGIN, Cookie: user.cookie, 'CF-Connecting-IP': freshIp() },
  });
  return loadSession(env, req);
}

async function seedDraft(owner, id = 'media_delete_test') {
  const now = new Date().toISOString();
  const key = musicKey(owner.id, id);
  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO media_assets(id,owner_id,kind,storage_key,original_name,mime_type,size_bytes,status,created_at)
       VALUES (?,?,'music',?,'draft.mp3','audio/mpeg',4,'draft',?)`
    ).bind(id, owner.id, key, now),
    env.DB.prepare(
      `INSERT INTO music_tracks(media_id,title,artist_name,rights_certified,explicit_content)
       VALUES (?,'Draft','Artist',1,0)`
    ).bind(id),
  ]);
  return { id, key };
}

describe('music private draft deletion', () => {
  it('owner soft-deletes then removes storage (claim before delete)', async () => {
    const owner = await newUser();
    const { id, key } = await seedDraft(owner, 'media_owner_delete');
    const session = await sessionFor(owner);
    const deleteMock = vi.fn(async () => {});
    const fakeEnv = { ...env, MEDIA: { put: vi.fn(), get: vi.fn(), delete: deleteMock } };
    const req = new Request('https://api.test/media/music/' + id, {
      method: 'DELETE',
      headers: { Origin: ORIGIN, Cookie: owner.cookie, 'CF-Connecting-IP': freshIp() },
    });
    const result = await musicUploadRoute(fakeEnv, req, { session }, 'DELETE', '/media/music/' + id);
    expect(result.status).toBe(200);
    expect(result.body.cleanup_pending).toBe(false);
    expect(deleteMock).toHaveBeenCalledTimes(1);
    expect(deleteMock.mock.calls[0][0]).toBe(key);
    const row = await env.DB.prepare('SELECT status,deleted_at FROM media_assets WHERE id=?').bind(id).first();
    expect(row.status).toBe('deleted');
    expect(row.deleted_at).toBeTruthy();
  });

  it('another user cannot delete (404, no storage call)', async () => {
    const owner = await newUser();
    const other = await newUser();
    const { id } = await seedDraft(owner, 'media_other_delete');
    const session = await sessionFor(other);
    const deleteMock = vi.fn(async () => {});
    const fakeEnv = { ...env, MEDIA: { put: vi.fn(), get: vi.fn(), delete: deleteMock } };
    const req = new Request('https://api.test/media/music/' + id, {
      method: 'DELETE',
      headers: { Origin: ORIGIN, Cookie: other.cookie, 'CF-Connecting-IP': freshIp() },
    });
    await expect(musicUploadRoute(fakeEnv, req, { session }, 'DELETE', '/media/music/' + id))
      .rejects.toMatchObject({ status: 404, code: 'not_found' });
    expect(deleteMock).not.toHaveBeenCalled();
    const row = await env.DB.prepare('SELECT status FROM media_assets WHERE id=?').bind(id).first();
    expect(row.status).toBe('draft');
  });

  it('storage delete failure after claim returns 202 cleanup_pending; row stays deleted', async () => {
    const owner = await newUser();
    const { id } = await seedDraft(owner, 'media_cleanup_pending');
    const session = await sessionFor(owner);
    const fakeEnv = {
      ...env,
      MEDIA: { put: vi.fn(), get: vi.fn(), delete: vi.fn(async () => { throw new Error('R2 503'); }) },
    };
    const req = new Request('https://api.test/media/music/' + id, {
      method: 'DELETE',
      headers: { Origin: ORIGIN, Cookie: owner.cookie, 'CF-Connecting-IP': freshIp() },
    });
    const result = await musicUploadRoute(fakeEnv, req, { session }, 'DELETE', '/media/music/' + id);
    expect(result.status).toBe(202);
    expect(result.body.cleanup_pending).toBe(true);
    const row = await env.DB.prepare('SELECT status,deleted_at FROM media_assets WHERE id=?').bind(id).first();
    expect(row.status).toBe('deleted');
    expect(row.deleted_at).toBeTruthy();
  });
});

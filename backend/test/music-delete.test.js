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

async function seed(owner, { id = 'media_delete_test', status = 'draft', key } = {}) {
  const now = new Date().toISOString();
  const storageKey = key || musicKey(owner.id, id);
  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO media_assets(id,owner_id,kind,storage_key,original_name,mime_type,size_bytes,status,created_at,published_at)
       VALUES (?,?,'music',?,'draft.mp3','audio/mpeg',4,?,?,?)`
    ).bind(id, owner.id, storageKey, status, now, status === 'published' ? now : null),
    env.DB.prepare(
      `INSERT INTO music_tracks(media_id,title,artist_name,rights_certified,explicit_content)
       VALUES (?,'Draft','Artist',1,0)`
    ).bind(id),
  ]);
  return { id, key: storageKey };
}

const delReq = (user, id) => new Request('https://api.test/media/music/' + id, {
  method: 'DELETE',
  headers: { Origin: ORIGIN, Cookie: user.cookie, 'CF-Connecting-IP': freshIp() },
});

describe('music private draft deletion', () => {
  it('owner soft-deletes then removes storage (claim before delete)', async () => {
    const owner = await newUser();
    const { id, key } = await seed(owner, { id: 'media_owner_delete' });
    const session = await sessionFor(owner);
    const deleteMock = vi.fn(async () => {});
    const fakeEnv = { ...env, MEDIA: { put: vi.fn(), get: vi.fn(), delete: deleteMock } };
    const result = await musicUploadRoute(fakeEnv, delReq(owner, id), { session }, 'DELETE', '/media/music/' + id);
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
    const { id } = await seed(owner, { id: 'media_other_delete' });
    const session = await sessionFor(other);
    const deleteMock = vi.fn(async () => {});
    const fakeEnv = { ...env, MEDIA: { put: vi.fn(), get: vi.fn(), delete: deleteMock } };
    await expect(musicUploadRoute(fakeEnv, delReq(other, id), { session }, 'DELETE', '/media/music/' + id))
      .rejects.toMatchObject({ status: 404, code: 'not_found' });
    expect(deleteMock).not.toHaveBeenCalled();
  });

  it('storage failure returns 202 retry_required; owner DELETE retries cleanup successfully', async () => {
    const owner = await newUser();
    const { id, key } = await seed(owner, { id: 'media_cleanup_pending' });
    const session = await sessionFor(owner);
    const failing = {
      ...env,
      MEDIA: { put: vi.fn(), get: vi.fn(), delete: vi.fn(async () => { throw new Error('R2 503'); }) },
    };
    const first = await musicUploadRoute(failing, delReq(owner, id), { session }, 'DELETE', '/media/music/' + id);
    expect(first.status).toBe(202);
    expect(first.body.cleanup_pending).toBe(true);
    expect(first.body.retry_required).toBe(true);
    expect(first.body.message).toMatch(/Retry Delete/i);
    expect(first.body.message).toMatch(/no automatic cleanup/i);
    const row = await env.DB.prepare('SELECT status FROM media_assets WHERE id=?').bind(id).first();
    expect(row.status).toBe('deleted');

    const deleteMock = vi.fn(async () => {});
    const okEnv = { ...env, MEDIA: { put: vi.fn(), get: vi.fn(), delete: deleteMock } };
    const retry = await musicUploadRoute(okEnv, delReq(owner, id), { session }, 'DELETE', '/media/music/' + id);
    expect(retry.status).toBe(200);
    expect(retry.body.cleanup_pending).toBe(false);
    expect(retry.body.cleanup_retry).toBe(true);
    expect(deleteMock).toHaveBeenCalledWith(key);
  });

  it('published assets cannot be deleted (409)', async () => {
    const owner = await newUser();
    const { id } = await seed(owner, { id: 'media_published_block', status: 'published' });
    const session = await sessionFor(owner);
    const deleteMock = vi.fn(async () => {});
    const fakeEnv = { ...env, MEDIA: { put: vi.fn(), get: vi.fn(), delete: deleteMock } };
    await expect(musicUploadRoute(fakeEnv, delReq(owner, id), { session }, 'DELETE', '/media/music/' + id))
      .rejects.toMatchObject({ status: 409, code: 'invalid_state' });
    expect(deleteMock).not.toHaveBeenCalled();
    expect((await env.DB.prepare('SELECT status FROM media_assets WHERE id=?').bind(id).first()).status).toBe('published');
  });

  it('invalid/cross-user storage_key refused without storage delete call', async () => {
    const owner = await newUser();
    const victim = await newUser();
    const evilKey = musicKey(victim.id, 'media_evil_target');
    const { id } = await seed(owner, { id: 'media_tamper_key', key: evilKey });
    const session = await sessionFor(owner);
    const deleteMock = vi.fn(async () => {});
    const fakeEnv = { ...env, MEDIA: { put: vi.fn(), get: vi.fn(), delete: deleteMock } };
    const result = await musicUploadRoute(fakeEnv, delReq(owner, id), { session }, 'DELETE', '/media/music/' + id);
    expect(result.status).toBe(422);
    expect(result.body.cleanup_pending).toBe(false);
    expect(result.body.error?.code).toBe('storage_key_refused');
    expect(deleteMock).not.toHaveBeenCalled();
    expect((await env.DB.prepare('SELECT status FROM media_assets WHERE id=?').bind(id).first()).status).toBe('deleted');
  });

  it('audit failure after successful storage delete still returns 200', async () => {
    const owner = await newUser();
    const { id } = await seed(owner, { id: 'media_audit_fail' });
    const session = await sessionFor(owner);
    const db = new Proxy(env.DB, {
      get(t, k) {
        if (k === 'prepare') {
          return (sql) => (/audit_log/i.test(sql)
            ? { bind: () => ({ run: async () => { throw new Error('audit down'); } }) }
            : t.prepare(sql));
        }
        const v = t[k];
        return typeof v === 'function' ? v.bind(t) : v;
      },
    });
    const deleteMock = vi.fn(async () => {});
    const result = await musicUploadRoute(
      { ...env, DB: db, MEDIA: { put: vi.fn(), get: vi.fn(), delete: deleteMock } },
      delReq(owner, id),
      { session },
      'DELETE',
      '/media/music/' + id,
    );
    expect(result.status).toBe(200);
    expect(result.body.cleanup_pending).toBe(false);
    expect(result.body.audit_failed).toBe(true);
    expect(deleteMock).toHaveBeenCalledTimes(1);
  });
});

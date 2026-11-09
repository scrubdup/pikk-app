import { describe, it, expect } from 'vitest';
import { env, SELF } from 'cloudflare:test';
import { call, newUser, ORIGIN, freshIp } from './helpers.js';
import { musicKey } from '../src/music-keys.js';
import { musicUploadRoute } from '../src/music-upload.js';
import { loadSession } from '../src/auth.js';

let n = 0;
async function seed(owner, { status = 'draft', key } = {}) {
  const id = `media_w_${++n}_${Date.now()}`;
  const k = key || musicKey(owner.id, id);
  await env.DB.batch([
    env.DB.prepare(
      `INSERT INTO media_assets(id,owner_id,kind,storage_key,original_name,mime_type,size_bytes,status,created_at,published_at)
       VALUES (?,?,'music',?,'d.mp3','audio/mpeg',4,?,?,?)`
    ).bind(id, owner.id, k, status, new Date().toISOString(), status === 'published' ? new Date().toISOString() : null),
    env.DB.prepare(
      `INSERT INTO music_tracks(media_id,title,artist_name,rights_certified,explicit_content) VALUES (?,'T','A',1,0)`
    ).bind(id),
  ]);
  if (!key) await env.MEDIA.put(k, 'abcd');
  return { id, key: k };
}
const row = (id) => env.DB.prepare('SELECT status,deleted_at FROM media_assets WHERE id=?').bind(id).first();
const audits = async (id) => (await env.DB.prepare(
  `SELECT COUNT(*) c FROM audit_log WHERE target=? AND action='music.upload_deleted'`
).bind(id).first()).c;
const del = (u, id, o = {}) => call('DELETE', `/media/music/${id}`, { cookie: u.cookie, ...o });

describe('music draft delete via Worker + Miniflare R2', () => {
  it('D1 happy path: object gone, file 404, 1 audit, retry 404', async () => {
    const u = await newUser();
    const { id, key } = await seed(u);
    const r = await del(u, id);
    expect(r.status).toBe(200);
    expect((await call('GET', `/media/music/${id}/file`, { cookie: u.cookie })).status).toBe(404);
    expect(await env.MEDIA.head(key)).toBeNull();
    expect((await row(id)).status).toBe('deleted');
    expect(await audits(id)).toBe(1);
    expect((await del(u, id)).status).toBe(200); // cleanup retry no-op success when object already gone
  });

  it('D2 auth/CSRF/cross-user/traversal leave row+object', async () => {
    const u = await newUser();
    const v = await newUser();
    const { id, key } = await seed(u);
    expect((await call('DELETE', `/media/music/${id}`, {})).status).toBe(401);
    expect((await del(u, id, { origin: 'https://evil.example' })).status).toBe(403);
    expect((await del(v, id)).status).toBe(404);
    expect((await row(id)).status).toBe('draft');
    expect(await env.MEDIA.head(key)).toBeTruthy();
  });

  it('D3 concurrent deletes: one claim audit', async () => {
    const u = await newUser();
    const { id } = await seed(u);
    const rs = await Promise.all(Array.from({ length: 5 }, () => del(u, id)));
    const statuses = rs.map((r) => r.status).sort();
    expect(statuses.filter((s) => s === 200 || s === 202).length).toBeGreaterThanOrEqual(1);
    expect(await audits(id)).toBe(1);
  });

  it('D4 published cannot be deleted', async () => {
    const u = await newUser();
    const { id, key } = await seed(u, { status: 'published' });
    const r = await del(u, id);
    expect(r.status).toBe(409);
    expect((await row(id)).status).toBe('published');
    expect(await env.MEDIA.head(key)).toBeTruthy();
  });

  it('D5 storage fail → 202; owner retry recovers bytes', async () => {
    const u = await newUser();
    const { id, key } = await seed(u);
    const session = await loadSession(env, new Request('https://api.test/x', {
      headers: { Origin: ORIGIN, Cookie: u.cookie, 'CF-Connecting-IP': freshIp() },
    }));
    const failing = {
      ...env,
      MEDIA: {
        put: env.MEDIA.put.bind(env.MEDIA),
        get: env.MEDIA.get.bind(env.MEDIA),
        head: env.MEDIA.head.bind(env.MEDIA),
        delete: async () => { throw new Error('R2 503'); },
      },
    };
    const r = await musicUploadRoute(
      failing,
      new Request(`https://api.test/media/music/${id}`, {
        method: 'DELETE',
        headers: { Origin: ORIGIN, Cookie: u.cookie, 'CF-Connecting-IP': freshIp() },
      }),
      { session },
      'DELETE',
      `/media/music/${id}`,
    );
    expect(r.status).toBe(202);
    expect(r.body.retry_required).toBe(true);
    expect(await env.MEDIA.head(key)).toBeTruthy();
    const retry = await del(u, id);
    expect(retry.status).toBe(200);
    expect(await env.MEDIA.head(key)).toBeNull();
    expect(await audits(id)).toBe(1);
  });

  it('D6 tampered key: victim object untouched; not reported as cleanup_pending', async () => {
    const u = await newUser();
    const v = await newUser();
    const victim = await seed(v);
    const evil = musicKey(v.id, `evil_${Date.now()}`);
    await env.MEDIA.put(evil, 'x');
    const { id } = await seed(u, { key: evil });
    const r = await del(u, id);
    expect([422, 200]).toContain(r.status); // 422 key refused after claim
    if (r.status === 422) {
      expect(r.json?.cleanup_pending || r.json?.error?.code).toBeTruthy();
      expect(r.json?.cleanup_pending).not.toBe(true);
    }
    expect(await env.MEDIA.head(victim.key)).toBeTruthy();
    expect(await env.MEDIA.head(evil)).toBeTruthy(); // never deleted foreign/wrong key via assert
  });

  it('D8 unbound storage 503 before claim', async () => {
    const u = await newUser();
    const { id } = await seed(u);
    const session = await loadSession(env, new Request('https://api.test/x', {
      headers: { Origin: ORIGIN, Cookie: u.cookie, 'CF-Connecting-IP': freshIp() },
    }));
    await expect(
      musicUploadRoute({ ...env, MEDIA: undefined }, new Request('https://api.test/'), { session }, 'DELETE', `/media/music/${id}`),
    ).rejects.toMatchObject({ status: 503, code: 'media_storage_not_configured' });
    expect((await row(id)).status).toBe('draft');
  });
});

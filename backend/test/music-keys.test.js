import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { newUser, freshIp, ORIGIN } from './helpers.js';
import { assertMusicKey, isMusicKey, musicKey, MusicKeyError } from '../src/music-keys.js';
import { musicUploadRoute } from '../src/music-upload.js';
import { loadSession } from '../src/auth.js';

describe('assertMusicKey', () => {
  it('accepts only music/<owner>/<id>', () => {
    expect(assertMusicKey('music/usr_abc/media_123')).toBe('music/usr_abc/media_123');
    expect(musicKey('usr_abc', 'media_123')).toBe('music/usr_abc/media_123');
    for (const bad of [
      'music/usr_abc/media_123/song.mp3', 'music/usr_abc', 'music//media_1', 'music/usr_abc/',
      'music/../vault/x', 'music/usr_abc/..', 'music/usr..abc/m', 'vault/audio/usr_abc/m', '/music/u/m',
      'music/u/m?x', 'music/u/m%2F..', 'music/u/m\\x', '', null, undefined, 42,
    ]) {
      expect(() => assertMusicKey(bad), String(bad)).toThrow(MusicKeyError);
      expect(isMusicKey(bad)).toBe(false);
    }
  });
  it('enforces the expected owner when given', () => {
    expect(assertMusicKey('music/usr_a/m1', 'usr_a')).toBe('music/usr_a/m1');
    expect(() => assertMusicKey('music/usr_b/m1', 'usr_a')).toThrow(MusicKeyError);
  });
});

function fakeBucket({ failPut = false } = {}) {
  const calls = []; const store = new Map();
  return {
    calls, store,
    async put(k, body) { calls.push(['put', k]); if (failPut) throw new Error('boom'); store.set(k, await new Response(body).arrayBuffer()); },
    async get(k) { calls.push(['get', k]); const v = store.get(k); return v ? { body: new Blob([v]).stream(), writeHttpMetadata() {} } : null; },
    async delete(k) { calls.push(['delete', k]); store.delete(k); },
  };
}

async function creatorCtx() {
  const u = await newUser();
  await env.DB.prepare("INSERT OR IGNORE INTO user_signup_roles(user_id,role,status,declared_at) VALUES (?, 'artist', 'declared', ?)").bind(u.id, new Date().toISOString()).run();
  const req = new Request('https://api.test/', { headers: { Cookie: u.cookie } });
  return { u, ctx: { session: await loadSession(env, req) } };
}

function uploadReq() {
  const form = new FormData();
  form.set('title', 'Key Track'); form.set('artist_name', 'PIKK Creator'); form.set('rights_certified', 'true');
  form.set('audio', new File([new Uint8Array([1, 2, 3, 4])], '../../vault/evil name.mp3', { type: 'audio/mpeg' }));
  return new Request('https://api.test/media/music', { method: 'POST', headers: { Origin: ORIGIN, 'CF-Connecting-IP': freshIp() }, body: form });
}

describe('music R2 calls go through assertMusicKey', () => {
  it('upload puts music/<owner>/<id> (filename not in key) and download gets the same key', async () => {
    const { u, ctx } = await creatorCtx();
    const MEDIA = fakeBucket(); const e = { ...env, MEDIA };
    const r = await musicUploadRoute(e, uploadReq(), ctx, 'POST', '/media/music');
    expect(r.status).toBe(201);
    const id = r.body.upload.id;
    expect(MEDIA.calls).toEqual([['put', `music/${u.id}/${id}`]]);
    const row = await env.DB.prepare('SELECT storage_key, original_name FROM media_assets WHERE id = ?').bind(id).first();
    expect(row.storage_key).toBe(`music/${u.id}/${id}`);
    expect(row.original_name).not.toContain('/');
    const dl = await musicUploadRoute(e, new Request('https://api.test/x'), ctx, 'GET', `/media/music/${id}/file`);
    expect(dl.status).toBe(200);
    expect(MEDIA.calls.at(-1)).toEqual(['get', `music/${u.id}/${id}`]);
  });

  it('refuses to read a stored key that is not a valid music key for this owner', async () => {
    const { u, ctx } = await creatorCtx();
    const MEDIA = fakeBucket(); const e = { ...env, MEDIA };
    for (const [i, bad] of ['vault/audio/x/y', `music/${u.id}/m/../../vault/a`, 'music/someone_else/m1', `music/${u.id}/m/extra`].entries()) {
      const id = `media_badkey_${u.id}_${i}`;
      await env.DB.prepare(`INSERT INTO media_assets(id,owner_id,kind,storage_key,original_name,mime_type,size_bytes,status,created_at) VALUES (?,?, 'music', ?, 'a.mp3', 'audio/mpeg', 4, 'draft', ?)`).bind(id, u.id, bad, new Date().toISOString()).run();
      await expect(musicUploadRoute(e, new Request('https://api.test/x'), ctx, 'GET', `/media/music/${id}/file`)).rejects.toMatchObject({ status: 404, code: 'media_missing' });
    }
    expect(MEDIA.calls).toEqual([]);
  });

  it('cleanup delete after a failed D1 write uses the guarded key', async () => {
    const { u, ctx } = await creatorCtx();
    const MEDIA = fakeBucket(); const e = { ...env, MEDIA, DB: { ...env.DB, batch: async () => { throw new Error('d1 down'); }, prepare: env.DB.prepare.bind(env.DB) } };
    await expect(musicUploadRoute(e, uploadReq(), ctx, 'POST', '/media/music')).rejects.toThrow('d1 down');
    expect(MEDIA.calls.map((c) => c[0])).toEqual(['put', 'delete']);
    expect(MEDIA.calls[1][1]).toMatch(new RegExp(`^music/${u.id}/media_[A-Za-z0-9_-]+$`));
  });
});

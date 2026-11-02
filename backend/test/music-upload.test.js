import { describe, it, expect } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { newUser, freshIp, ORIGIN } from './helpers.js';

async function postMultipart(cookie) {
  const form = new FormData();
  form.set('title', 'Draft Track');
  form.set('artist_name', 'PIKK Creator');
  form.set('rights_certified', 'true');
  form.set('audio', new File([new Uint8Array([1,2,3,4])], 'draft.mp3', { type: 'audio/mpeg' }));
  return SELF.fetch('https://api.test/media/music', {
    method: 'POST',
    headers: { Origin: ORIGIN, Cookie: cookie, 'CF-Connecting-IP': freshIp() },
    body: form,
  });
}

describe('music uploads', () => {
  it('creates the D1 music upload metadata tables', async () => {
    const tables = await env.DB.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('media_assets','music_tracks') ORDER BY name"
    ).all();
    expect(tables.results.map(r => r.name)).toEqual(['media_assets','music_tracks']);
  });

  it('does not allow a normal member account to upload creator music', async () => {
    const u = await newUser();
    const res = await postMultipart(u.cookie);
    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.error.code).toBe('creator_role_required');
  });

  it('fails honestly when creator media object storage is not configured', async () => {
    const u = await newUser();
    await env.DB.prepare(
      "INSERT OR IGNORE INTO user_signup_roles(user_id,role,status,declared_at) VALUES (?, 'artist', 'declared', ?)"
    ).bind(u.id, new Date().toISOString()).run();
    // Vault's local-placeholder MEDIA binding exists in wrangler.jsonc; simulate an unprovisioned bucket.
    const saved = env.MEDIA;
    let res;
    try { env.MEDIA = undefined; res = await postMultipart(u.cookie); } finally { env.MEDIA = saved; }
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.error.code).toBe('media_storage_not_configured');
  });

  it('lists no fake uploads before real storage succeeds', async () => {
    const u = await newUser();
    const res = await SELF.fetch('https://api.test/media/music', {
      method: 'GET',
      headers: { Origin: ORIGIN, Cookie: u.cookie, 'CF-Connecting-IP': freshIp() },
    });
    expect(res.status).toBe(200);
    expect((await res.json()).uploads).toEqual([]);
  });
});

import { describe, it, expect } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, newUser, makeAdmin, ORIGIN } from './helpers.js';
import { MEDIA_LIMITS } from '../src/media-config.js';
import { sanitizeFilename } from '../src/media.js';

const pad = (head, n = 256) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = i & 0xff; return b; };
const ascii = (s) => [...s].map(c => c.charCodeAt(0));
const JPEG = pad([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, ...ascii('JFIF')]);
const MP3 = pad([...ascii('ID3'), 4, 0, 0, 0, 0, 0, 0, 0, 0]);
const MP4 = pad([0, 0, 0, 0x20, ...ascii('ftypisom'), 0, 0, 2, 0]);
const EXE = pad([...ascii('MZ'), 0x90, 0, 3, 0, 0, 0, 4, 0, 0, 0]);

async function put(u, url, bytes, len = bytes.length) {
  const res = await SELF.fetch(`https://api.test${url}`, { method: 'PUT', body: bytes,
    headers: { Origin: ORIGIN, Cookie: u.cookie, 'Content-Length': String(len), 'Content-Type': 'application/octet-stream', 'CF-Connecting-IP': '10.9.9.9' } });
  return { status: res.status, json: await res.json() };
}
async function upload(u, { type, content_type, bytes, filename = 'f.bin', access = 'private', story } ) {
  const c = await call('POST', '/media/uploads', { cookie: u.cookie, body: { type, content_type, filename, size: bytes.length, access, story } });
  expect(c.status).toBe(201);
  const id = c.json.upload.id;
  expect((await put(u, c.json.upload.upload_url, bytes)).status).toBe(200);
  const done = await call('POST', `/media/${id}/complete`, { cookie: u.cookie });
  return { id, done };
}
async function sha(b) { return [...new Uint8Array(await crypto.subtle.digest('SHA-256', b))].map(x => x.toString(16).padStart(2, '0')).join(''); }

describe('PIKK Vault media', () => {
  it.each([
    ['photo', 'image/jpeg', JPEG],
    ['audio', 'audio/mpeg', MP3],
    ['video', 'video/mp4', MP4],
  ])('%s: upload -> PUT to R2 -> complete sets ready with sha256', async (type, content_type, bytes) => {
    const u = await newUser();
    const { id, done } = await upload(u, { type, content_type, bytes, filename: `../../etc/${type}<x>.bin` });
    expect(done.status).toBe(200);
    expect(done.json.media.state).toBe('ready');
    expect(done.json.media.content_type).toBe(content_type);
    expect(done.json.media.checksum_sha256).toBe(await sha(bytes));
    expect(done.json.media.filename).not.toMatch(/[\/<>]/);
    const row = await env.DB.prepare('SELECT object_key, owner_id FROM media WHERE id=?').bind(id).first();
    expect(row.object_key).toBe(`u/${u.id}/${id}`);
    expect(await env.MEDIA.head(row.object_key)).not.toBeNull();
    const g = await call('GET', `/media/${id}`, { cookie: u.cookie });
    expect(g.status).toBe(200); expect(g.json.media.state).toBe('ready');
  });

  it('enforces limits from config and requires auth + verified email', async () => {
    const u = await newUser();
    const big = await call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 'a.jpg', size: MEDIA_LIMITS.photo.maxBytes + 1 } });
    expect(big.status).toBe(413);
    expect(MEDIA_LIMITS.photo.maxBytes).toBe(20 * 1024 * 1024);
    expect(MEDIA_LIMITS.video.maxBytes).toBe(500 * 1024 * 1024);
    expect(MEDIA_LIMITS.audio.maxBytes).toBe(50 * 1024 * 1024);
    const badType = await call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'application/x-msdownload', filename: 'a.exe', size: 10 } });
    expect(badType.status).toBe(422);
    expect((await call('POST', '/media/uploads', { body: { type: 'photo', content_type: 'image/jpeg', filename: 'a', size: 10 } })).status).toBe(401);
    const unv = await newUser({ verify: false });
    expect((await call('POST', '/media/uploads', { cookie: unv.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 'a', size: 10 } })).status).toBe(403);
    const c = await call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 'a.jpg', size: JPEG.length } });
    expect((await put(u, c.json.upload.upload_url, pad([0xff, 0xd8, 0xff], JPEG.length + 10))).status).toBe(413);
  });

  it('stories get a 24h expiry', async () => {
    const u = await newUser();
    const c = await call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 's.jpg', size: 10, story: true } });
    const h = (Date.parse(c.json.upload.expires_at) - Date.now()) / 3600e3;
    expect(h).toBeGreaterThan(23.9); expect(h).toBeLessThanOrEqual(24);
  });

  it.each([
    ['exe declared as jpeg', 'photo', 'image/jpeg', EXE],
    ['mp3 declared as image', 'photo', 'image/png', MP3],
    ['jpeg declared as video', 'video', 'video/mp4', JPEG],
  ])('rejects spoofed file type: %s', async (_n, type, content_type, bytes) => {
    const u = await newUser();
    const { id, done } = await upload(u, { type, content_type, bytes });
    expect(done.status).toBe(422); expect(done.json.error.code).toBe('content_mismatch');
    const row = await env.DB.prepare('SELECT state, object_key FROM media WHERE id=?').bind(id).first();
    expect(row.state).toBe('rejected');
    expect(await env.MEDIA.head(row.object_key)).toBeNull();
  });

  it('cross-user: others cannot PUT, complete or read private media (404); audience rules apply', async () => {
    const a = await newUser(); const b = await newUser();
    const c = await call('POST', '/media/uploads', { cookie: a.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 'x.jpg', size: JPEG.length } });
    expect((await put(b, c.json.upload.upload_url, JPEG)).status).toBe(404);
    expect((await put(a, c.json.upload.upload_url, JPEG)).status).toBe(200);
    expect((await call('POST', `/media/${c.json.upload.id}/complete`, { cookie: b.cookie })).status).toBe(404);
    expect((await call('POST', `/media/${c.json.upload.id}/complete`, { cookie: a.cookie })).status).toBe(200);
    expect((await call('GET', `/media/${c.json.upload.id}`, { cookie: b.cookie })).status).toBe(404);
    expect((await call('GET', `/media/med_doesnotexist123`, { cookie: b.cookie })).status).toBe(404);

    const fol = await upload(a, { type: 'photo', content_type: 'image/jpeg', bytes: JPEG, access: 'followers' });
    expect((await call('GET', `/media/${fol.id}`, { cookie: b.cookie })).status).toBe(404);
    await call('POST', '/follows', { cookie: b.cookie, body: { handle: a.handle } });
    const seen = await call('GET', `/media/${fol.id}`, { cookie: b.cookie });
    expect(seen.status).toBe(200); expect(seen.json.media.checksum_sha256).toBeUndefined();

    const ent = await upload(a, { type: 'audio', content_type: 'audio/mpeg', bytes: MP3, access: 'entitled' });
    expect((await call('GET', `/media/${ent.id}`, { cookie: b.cookie })).status).toBe(404);
    await env.DB.prepare(`INSERT INTO media_entitlements(media_id,user_id,source,created_at) VALUES (?,?, 'grant', ?)`).bind(ent.id, b.id, new Date().toISOString()).run();
    expect((await call('GET', `/media/${ent.id}`, { cookie: b.cookie })).status).toBe(200);

    const pub = await upload(a, { type: 'video', content_type: 'video/mp4', bytes: MP4, access: 'public' });
    expect((await call('GET', `/media/${pub.id}`, { cookie: b.cookie })).status).toBe(200);
    await call('POST', '/blocks', { cookie: a.cookie, body: { handle: b.handle } });
    expect((await call('GET', `/media/${pub.id}`, { cookie: b.cookie })).status).toBe(404);
    expect((await call('GET', `/media/${pub.id}`)).status).toBe(401);
  });

  it('GET /vault/health: admin only, read-only shape', async () => {
    expect((await call('GET', '/vault/health')).status).toBe(401);
    const u = await newUser();
    expect((await call('GET', '/vault/health', { cookie: u.cookie })).status).toBe(403);
    const adm = await newUser(); await makeAdmin(adm.id);
    await upload(adm, { type: 'photo', content_type: 'image/jpeg', bytes: EXE });
    const h = await call('GET', '/vault/health', { cookie: adm.cookie });
    expect(h.status).toBe(200);
    expect(h.json).toMatchObject({ status: 'ok', version: expect.any(String), storage: { binding: 'MEDIA', reachable: true, error: null } });
    expect(Object.keys(h.json.counts_by_state).sort()).toEqual(['deleted', 'failed', 'pending_upload', 'ready', 'rejected', 'uploaded']);
    expect(h.json.counts_by_state.rejected).toBeGreaterThanOrEqual(1);
    expect(h.json.last_error).toMatchObject({ state: 'rejected', message: expect.any(String) });
    expect((await call('POST', '/vault/health', { cookie: adm.cookie })).status).toBe(404);
  });

  it('sanitizes filenames', () => {
    expect(sanitizeFilename('../../a/b\\c<script>.jpg')).toBe('c_script_.jpg');
    expect(sanitizeFilename('...')).toBe('file');
  });
});

import { describe, it, expect } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, newUser, ORIGIN } from './helpers.js';
import { parseRange } from '../src/media-content.js';

const pad = (head, n = 256) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = i & 0xff; return b; };
const ascii = (s) => [...s].map(c => c.charCodeAt(0));
const JPEG = pad([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, ...ascii('JFIF')]);
const MP3 = pad([...ascii('ID3'), 4, 0, 0, 0, 0, 0, 0, 0, 0], 1000);
const MP4 = pad([0, 0, 0, 0x20, ...ascii('ftypisom'), 0, 0, 2, 0], 2000);

async function raw(path, { cookie, headers = {}, method = 'GET' } = {}) {
  const h = { 'CF-Connecting-IP': `10.77.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`, ...headers };
  if (cookie) h.Cookie = cookie;
  const res = await SELF.fetch(`https://api.test${path}`, { method, headers: h });
  return { res, status: res.status, bytes: new Uint8Array(await res.arrayBuffer()) };
}
async function upload(u, { type, content_type, bytes, filename = 'f.bin', access = 'private', complete = true }) {
  const c = await call('POST', '/media/uploads', { cookie: u.cookie, body: { type, content_type, filename, size: bytes.length, access } });
  const id = c.json.upload.id;
  const p = await SELF.fetch(`https://api.test${c.json.upload.upload_url}`, { method: 'PUT', body: bytes,
    headers: { Origin: ORIGIN, Cookie: u.cookie, 'Content-Length': String(bytes.length), 'CF-Connecting-IP': '10.9.9.8' } });
  expect(p.status).toBe(200);
  if (complete) expect((await call('POST', `/media/${id}/complete`, { cookie: u.cookie })).status).toBe(200);
  return id;
}
const eq = (a, b) => expect(Array.from(a)).toEqual(Array.from(b));

describe('PIKK Vault slice 2: content + signed URLs', () => {
  it('owner streams with detected type, inline disposition, private no-store', async () => {
    const u = await newUser();
    const id = await upload(u, { type: 'audio', content_type: 'audio/mpeg', bytes: MP3, filename: '../My "Song"<1>.mp3' });
    const r = await raw(`/media/${id}/content`, { cookie: u.cookie });
    expect(r.status).toBe(200); eq(r.bytes, MP3);
    expect(r.res.headers.get('Content-Type')).toBe('audio/mpeg');
    expect(r.res.headers.get('Cache-Control')).toBe('private, no-store');
    expect(r.res.headers.get('Accept-Ranges')).toBe('bytes');
    expect(r.res.headers.get('Content-Length')).toBe(String(MP3.length));
    const cd = r.res.headers.get('Content-Disposition');
    expect(cd).toMatch(/^inline; filename="My _Song__1_.mp3"/);
    const d = await raw(`/media/${id}/content?download=1`, { cookie: u.cookie });
    expect(d.res.headers.get('Content-Disposition')).toMatch(/^attachment; filename="My _Song__1_.mp3"/);
  });

  it('followers, entitled and public access work; strangers and anonymous get 404/401', async () => {
    const a = await newUser(); const b = await newUser(); const c = await newUser();
    const fol = await upload(a, { type: 'photo', content_type: 'image/jpeg', bytes: JPEG, access: 'followers' });
    expect((await raw(`/media/${fol}/content`, { cookie: b.cookie })).status).toBe(404);
    await call('POST', '/follows', { cookie: b.cookie, body: { handle: a.handle } });
    expect((await raw(`/media/${fol}/content`, { cookie: b.cookie })).status).toBe(200);
    const ent = await upload(a, { type: 'audio', content_type: 'audio/mpeg', bytes: MP3, access: 'entitled' });
    expect((await raw(`/media/${ent}/content`, { cookie: c.cookie })).status).toBe(404);
    await env.DB.prepare(`INSERT INTO media_entitlements(media_id,user_id,source,created_at) VALUES (?,?,'grant',?)`).bind(ent, c.id, new Date().toISOString()).run();
    expect((await raw(`/media/${ent}/content`, { cookie: c.cookie })).status).toBe(200);
    const pub = await upload(a, { type: 'video', content_type: 'video/mp4', bytes: MP4, access: 'public' });
    const p = await raw(`/media/${pub}/content`, { cookie: c.cookie });
    expect(p.status).toBe(200); expect(p.res.headers.get('Cache-Control')).toBe('private, max-age=300');
    expect(p.res.headers.get('Cache-Control')).not.toMatch(/public/);
    const priv = await upload(a, { type: 'photo', content_type: 'image/jpeg', bytes: JPEG });
    expect((await raw(`/media/${priv}/content`, { cookie: c.cookie })).status).toBe(404);
    expect((await raw(`/media/med_doesnotexist123/content`, { cookie: c.cookie })).status).toBe(404);
    expect((await raw(`/media/${priv}/content`)).status).toBe(401);
    await call('POST', '/blocks', { cookie: a.cookie, body: { handle: c.handle } });
    expect((await raw(`/media/${pub}/content`, { cookie: c.cookie })).status).toBe(404);
  });

  it('range requests return 206 with correct bytes and headers', async () => {
    const u = await newUser();
    const id = await upload(u, { type: 'video', content_type: 'video/mp4', bytes: MP4 });
    const cases = [['bytes=0-99', 0, 99], ['bytes=1500-', 1500, 1999], ['bytes=-300', 1700, 1999], ['bytes=1990-5000', 1990, 1999]];
    for (const [h, s, e] of cases) {
      const r = await raw(`/media/${id}/content`, { cookie: u.cookie, headers: { Range: h } });
      expect(r.status).toBe(206);
      expect(r.res.headers.get('Content-Range')).toBe(`bytes ${s}-${e}/${MP4.length}`);
      expect(r.res.headers.get('Content-Length')).toBe(String(e - s + 1));
      expect(r.res.headers.get('Content-Type')).toBe('video/mp4');
      eq(r.bytes, MP4.slice(s, e + 1));
    }
  });

  it('unsatisfiable ranges return 416 with Content-Range */size', async () => {
    const u = await newUser();
    const id = await upload(u, { type: 'video', content_type: 'video/mp4', bytes: MP4 });
    for (const h of ['bytes=2000-', 'bytes=500-100', 'bytes=-0', 'bytes=abc']) {
      const r = await raw(`/media/${id}/content`, { cookie: u.cookie, headers: { Range: h } });
      expect(r.status, h).toBe(416);
      expect(r.res.headers.get('Content-Range')).toBe(`bytes */${MP4.length}`);
    }
    expect(parseRange('bytes=0-1,4-5', 10)).toBeNull();
    expect(parseRange(null, 10)).toBeNull();
  });

  it('non-ready media is 404 even for the owner', async () => {
    const u = await newUser();
    const id = await upload(u, { type: 'photo', content_type: 'image/jpeg', bytes: JPEG, complete: false });
    expect((await raw(`/media/${id}/content`, { cookie: u.cookie })).status).toBe(404);
    expect((await call('POST', `/media/${id}/access-url`, { cookie: u.cookie })).status).toBe(404);
  });

  it('signed URL works without a session; expiry and tampering are rejected', async () => {
    const a = await newUser(); const b = await newUser();
    const id = await upload(a, { type: 'audio', content_type: 'audio/mpeg', bytes: MP3 });
    expect((await call('POST', `/media/${id}/access-url`, { cookie: b.cookie })).status).toBe(404);
    expect((await call('POST', `/media/${id}/access-url`)).status).toBe(401);
    const s = await call('POST', `/media/${id}/access-url`, { cookie: a.cookie });
    expect(s.status).toBe(200);
    const ttl = (Date.parse(s.json.expires_at) - Date.now()) / 1000;
    expect(ttl).toBeGreaterThan(290); expect(ttl).toBeLessThanOrEqual(300);
    const ok = await raw(s.json.url, { headers: { Range: 'bytes=0-9' } });
    expect(ok.status).toBe(206); eq(ok.bytes, MP3.slice(0, 10));
    expect(ok.res.headers.get('Cache-Control')).toBe('private, no-store');

    const u = new URL(s.json.url, 'https://x');
    const tamper = (k, v) => { const t = new URL(u); t.searchParams.set(k, v); return t.pathname + t.search; };
    const sig = u.searchParams.get('sig');
    expect((await raw(tamper('sig', (sig[0] === 'a' ? 'b' : 'a') + sig.slice(1)))).status).toBe(403);
    expect((await raw(tamper('exp', String(Number(u.searchParams.get('exp')) + 3600)))).status).toBe(403);
    expect((await raw(tamper('uid', b.id))).status).toBe(403);
    expect((await raw(tamper('download', '1'))).status).toBe(403);
    const other = await upload(a, { type: 'audio', content_type: 'audio/mpeg', bytes: MP3 });
    expect((await raw(`/media/${other}/content${u.search}`)).status).toBe(403);

    // expired: sign with real key but past exp
    const { signAccess } = await import('../src/media-content.js');
    const past = Math.floor(Date.now() / 1000) - 1;
    const esig = await signAccess(env, id, a.id, past, false);
    expect((await raw(`/media/${id}/content?exp=${past}&uid=${a.id}&sig=${esig}`)).status).toBe(403);

    // signed URLs are never stored
    const leaked = await env.DB.prepare(`SELECT COUNT(*) AS n FROM audit_log WHERE instr(COALESCE(meta,''), ?) > 0`).bind(sig).first();
    expect(leaked.n).toBe(0);
  });

  it('signed URL is re-checked against current access (revocation -> 404)', async () => {
    const a = await newUser(); const b = await newUser();
    const id = await upload(a, { type: 'photo', content_type: 'image/jpeg', bytes: JPEG, access: 'followers' });
    await call('POST', '/follows', { cookie: b.cookie, body: { handle: a.handle } });
    const s = await call('POST', `/media/${id}/access-url`, { cookie: b.cookie });
    expect((await raw(s.json.url)).status).toBe(200);
    await call('POST', '/blocks', { cookie: a.cookie, body: { handle: b.handle } });
    expect((await raw(s.json.url)).status).toBe(404);
  });

  it('downloads are audited (session and signed), plain playback is not', async () => {
    const u = await newUser();
    const id = await upload(u, { type: 'photo', content_type: 'image/jpeg', bytes: JPEG });
    await raw(`/media/${id}/content`, { cookie: u.cookie });
    await raw(`/media/${id}/content?download=1`, { cookie: u.cookie });
    const s = await call('POST', `/media/${id}/access-url?download=1`, { cookie: u.cookie });
    const d = await raw(s.json.url);
    expect(d.res.headers.get('Content-Disposition')).toMatch(/^attachment/);
    const rows = await env.DB.prepare(`SELECT actor_id, meta FROM audit_log WHERE action='media.download' AND target=? ORDER BY created_at`).bind(id).all();
    expect(rows.results.length).toBe(2);
    expect(rows.results.map(r => JSON.parse(r.meta).via).sort()).toEqual(['session', 'signature']);
    expect(rows.results.every(r => r.actor_id === u.id)).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, newUser, freshIp, ORIGIN, settle } from './helpers.js';
import { quarantineReport, cleanupAbandonedUploads } from '../src/processing.js';
import { CANCEL_R2_PENDING_ERR } from '../src/media-config.js';
import worker from '../src/index.js';

const pad = (head, n = 256) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = i & 0xff; return b; };
const JPEG = pad([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46]);

async function put(u, url, bytes) {
  const res = await SELF.fetch(`https://api.test${url}`, {
    method: 'PUT', body: bytes,
    headers: { Origin: ORIGIN, Cookie: u.cookie, 'Content-Length': String(bytes.length), 'Content-Type': 'application/octet-stream', 'CF-Connecting-IP': freshIp() },
  });
  return res.status;
}

describe('vault list + two-identity isolation + cancel audit', () => {
  it('GET /media lists only the caller\'s non-deleted media', async () => {
    const a = await newUser();
    const b = await newUser();
    const ca = await call('POST', '/media/uploads', {
      cookie: a.cookie,
      body: { type: 'photo', content_type: 'image/jpeg', filename: 'a.jpg', size: JPEG.length, access: 'private' },
      ip: freshIp(),
    });
    expect(ca.status).toBe(201);
    expect((await put(a, ca.json.upload.upload_url, JPEG))).toBe(200);
    await call('POST', `/media/${ca.json.upload.id}/complete`, { cookie: a.cookie, ip: freshIp() });
    await settle(ca.json.upload.id);

    const cb = await call('POST', '/media/uploads', {
      cookie: b.cookie,
      body: { type: 'photo', content_type: 'image/jpeg', filename: 'b.jpg', size: JPEG.length, access: 'private' },
      ip: freshIp(),
    });
    expect(cb.status).toBe(201);

    const la = await call('GET', '/media', { cookie: a.cookie, ip: freshIp() });
    expect(la.status).toBe(200);
    expect(la.json.media.every((m) => m.filename === 'a.jpg' || m.id === ca.json.upload.id)).toBe(true);
    expect(la.json.media.some((m) => m.id === cb.json.upload.id)).toBe(false);

    const lb = await call('GET', '/media', { cookie: b.cookie, ip: freshIp() });
    expect(lb.status).toBe(200);
    expect(lb.json.media.some((m) => m.id === ca.json.upload.id)).toBe(false);
    expect(lb.json.media.some((m) => m.id === cb.json.upload.id)).toBe(true);
  });

  it('B cannot access-url or get A\'s private ready media', async () => {
    const a = await newUser();
    const b = await newUser();
    const c = await call('POST', '/media/uploads', {
      cookie: a.cookie,
      body: { type: 'photo', content_type: 'image/jpeg', filename: 'priv.jpg', size: JPEG.length, access: 'private' },
      ip: freshIp(),
    });
    expect((await put(a, c.json.upload.upload_url, JPEG))).toBe(200);
    await call('POST', `/media/${c.json.upload.id}/complete`, { cookie: a.cookie, ip: freshIp() });
    await settle(c.json.upload.id);

    const getB = await call('GET', `/media/${c.json.upload.id}`, { cookie: b.cookie, ip: freshIp() });
    expect(getB.status).toBe(404);
    const urlB = await call('POST', `/media/${c.json.upload.id}/access-url`, { cookie: b.cookie, ip: freshIp() });
    expect(urlB.status).toBe(404);
    const urlA = await call('POST', `/media/${c.json.upload.id}/access-url`, { cookie: a.cookie, ip: freshIp() });
    expect(urlA.status).toBe(200);
    expect(urlA.json.url).toMatch(/\/media\/.+\/content/);
  });

  it('cancel R2 failure heals with upload_cancelled audit not abandoned', async () => {
    const a = await newUser();
    const c = await call('POST', '/media/uploads', {
      cookie: a.cookie,
      body: { type: 'photo', content_type: 'image/jpeg', filename: 'c.jpg', size: JPEG.length, access: 'private' },
      ip: freshIp(),
    });
    const id = c.json.upload.id;
    expect((await put(a, c.json.upload.upload_url, JPEG))).toBe(200);
    const key = (await env.DB.prepare('SELECT object_key FROM media WHERE id=?').bind(id).first()).object_key;
    const bad = new Proxy(env.MEDIA, {
      get(t, k) {
        if (k === 'delete') return async () => { throw new Error('R2 503'); };
        const v = t[k]; return typeof v === 'function' ? v.bind(t) : v;
      },
    });
    const req = new Request(`https://api.test/media/uploads/${id}`, {
      method: 'DELETE',
      headers: { Origin: ORIGIN, Cookie: a.cookie, 'CF-Connecting-IP': freshIp() },
    });
    const res = await worker.fetch(req, { ...env, MEDIA: bad }, { waitUntil() {} });
    expect([202, 200]).toContain(res.status);
    const cancelBody = await res.json();
    expect(cancelBody.media.cleanup_pending).toBe(true);
    const mid = await env.DB.prepare('SELECT last_error FROM media WHERE id=?').bind(id).first();
    expect(mid.last_error).toBe(CANCEL_R2_PENDING_ERR);
    await cleanupAbandonedUploads(env);
    expect(await env.MEDIA.head(key)).toBeNull();
    const abandoned = (await env.DB.prepare("SELECT COUNT(*) n FROM audit_log WHERE action='media.upload_abandoned' AND target=?").bind(id).first()).n;
    const cancelled = (await env.DB.prepare("SELECT COUNT(*) n FROM audit_log WHERE action='media.upload_cancelled' AND target=?").bind(id).first()).n;
    expect(abandoned).toBe(0);
    expect(cancelled).toBe(1);
  });

  it('quarantineReport lists quarantined rows for local operators', async () => {
    const u = await newUser();
    const id = 'med_q_' + u.id.slice(-8);
    const t = new Date().toISOString();
    await env.DB.prepare(
      `INSERT INTO media(id,owner_id,media_type,is_story,object_key,filename,declared_content_type,size_bytes,access_policy,state,deleted_at,last_error,created_at,updated_at)
       VALUES (?,?, 'photo',0,?,?, 'image/jpeg',10,'private','deleted',?,?,?,?)`
    ).bind(id, u.id, `vault/photo/${u.id}/${id}`, 'q.jpg', t, 'cleanup: quarantined: vault key refused', t, t).run();
    const rep = await quarantineReport(env);
    expect(rep.quarantined.some((r) => r.id === id)).toBe(true);
  });
});

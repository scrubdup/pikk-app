import { describe, it, expect } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, newUser, freshIp, ORIGIN, settle } from './helpers.js';
import { cleanupAbandonedUploads } from '../src/processing.js';
import { R2_PENDING_ERR } from '../src/media-config.js';
import { isNoSuchUpload } from '../src/vault-keys.js';
import worker from '../src/index.js';

const pad = (head, n = 256) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = i & 0xff; return b; };
const JPEG = pad([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46]);
const OLD = () => new Date(Date.now() - 30 * 3600e3).toISOString();
const put = async (u, url, bytes) => (await SELF.fetch(`https://api.test${url}`, {
  method: 'PUT', body: bytes,
  headers: { Origin: ORIGIN, Cookie: u.cookie, 'Content-Length': String(bytes.length), 'Content-Type': 'application/octet-stream', 'CF-Connecting-IP': freshIp() },
})).status;
async function pending(u) {
  const c = await call('POST', '/media/uploads', {
    cookie: u.cookie,
    body: { type: 'photo', content_type: 'image/jpeg', filename: 'a.jpg', size: JPEG.length, access: 'private' },
    ip: freshIp(),
  });
  expect(c.status).toBe(201);
  return c.json.upload;
}
const row = (id) => env.DB.prepare('SELECT state, deleted_at, last_error, object_key FROM media WHERE id=?').bind(id).first();
const backdate = (id) => env.DB.prepare('UPDATE media SET created_at=? WHERE id=?').bind(OLD(), id).run();
const audits = async (id, a = 'media.upload_abandoned') => (await env.DB.prepare('SELECT COUNT(*) n FROM audit_log WHERE action=? AND target=?').bind(a, id).first()).n;
const jobs = async (id) => (await env.DB.prepare('SELECT COUNT(*) n FROM processing_jobs WHERE media_id=?').bind(id).first()).n;
function proxyWith(obj, k, fn) {
  return new Proxy(obj, {
    get(t, kk) {
      if (kk === k) return fn(t);
      const v = t[kk];
      return typeof v === 'function' ? v.bind(t) : v;
    },
  });
}
function dbGate(re, method) {
  let rel, hit;
  const g = new Promise((r) => { rel = r; });
  const h = new Promise((r) => { hit = r; });
  const proxy = proxyWith(env.DB, 'prepare', (t) => (sql) => {
    const st = t.prepare(sql);
    if (!re.test(sql)) return st;
    return {
      bind: (...a) => {
        const b = st.bind(...a);
        return proxyWith(b, method, (bb) => async (...x) => {
          const r = await bb[method](...x);
          hit();
          await g;
          return r;
        });
      },
    };
  });
  return { proxy, release: rel, hit: h };
}
const req = (u, path, method = 'POST') => new Request(`https://api.test${path}`, {
  method, headers: { Origin: ORIGIN, Cookie: u.cookie, 'CF-Connecting-IP': freshIp() },
});

describe('vault re-review fixes (B1/B2/B6 + quarantine + NoSuchUpload)', () => {
  it('B1: cleanup between complete reads and batch → 409, no orphan job/audit', async () => {
    const a = await newUser();
    const s = await pending(a);
    await put(a, s.upload_url, JPEG);
    await backdate(s.id);
    const key = (await row(s.id)).object_key;
    let n = 0, rel, hit;
    const g = new Promise((r) => { rel = r; });
    const h = new Promise((r) => { hit = r; });
    const media = proxyWith(env.MEDIA, 'get', (t) => async (...x) => {
      const r = await t.get(...x);
      if (++n === 2) { hit(); await g; }
      return r;
    });
    const cp = worker.fetch(req(a, `/media/${s.id}/complete`), { ...env, MEDIA: media }, { waitUntil() {} });
    await h;
    const c = await cleanupAbandonedUploads(env);
    rel();
    const res = await cp;
    const after = await row(s.id);
    expect(res.status).toBe(409);
    expect(after.state).toBe('deleted');
    expect(after.deleted_at).toBeTruthy();
    expect(await env.MEDIA.head(key)).toBeNull();
    expect(await jobs(s.id)).toBe(0);
    expect(await audits(s.id, 'media.processing')).toBe(0);
    expect(c.deleted).toBeGreaterThanOrEqual(1);
  });

  it('B2: object-missing setState does not overwrite deleted row', async () => {
    const a = await newUser();
    const s = await pending(a);
    await put(a, s.upload_url, JPEG);
    await backdate(s.id);
    const g = dbGate(/SELECT \* FROM media WHERE id=\? AND owner_id=\? AND deleted_at IS NULL/, 'first');
    const cp = worker.fetch(req(a, `/media/${s.id}/complete`), { ...env, DB: g.proxy }, { waitUntil() {} });
    await g.hit;
    const c = await cleanupAbandonedUploads(env);
    g.release();
    const res = await cp;
    const after = await row(s.id);
    expect(res.status).toBe(409);
    expect(c.deleted).toBeGreaterThanOrEqual(1);
    expect(after.state).toBe('deleted');
    expect(after.deleted_at).toBeTruthy();
    // Must not be overwritten to failed/object missing
    expect(after.last_error).not.toBe('object missing');
    expect(after.last_error).toMatch(/abandoned|r2 delete pending|cleanup/i);
  });

  it('B6a: cancel R2 delete failure is retried by sweeper and object removed', async () => {
    const a = await newUser();
    const s = await pending(a);
    await put(a, s.upload_url, JPEG);
    const key = (await row(s.id)).object_key;
    const bad = proxyWith(env.MEDIA, 'delete', () => async () => { throw new Error('R2 503'); });
    const res = await worker.fetch(req(a, `/media/uploads/${s.id}`, 'DELETE'), { ...env, MEDIA: bad }, { waitUntil() {} });
    expect(res.status).toBe(500);
    const r1 = await row(s.id);
    expect(r1.state).toBe('deleted');
    expect(r1.last_error).toContain('r2 delete pending');
    expect(await env.MEDIA.head(key)).toBeTruthy();
    const c = await cleanupAbandonedUploads(env);
    expect(c.retried).toBeGreaterThanOrEqual(1);
    expect(await env.MEDIA.head(key)).toBeNull();
    const r2 = await row(s.id);
    expect(r2.last_error).toBe('abandoned upload cleanup');
    expect(await audits(s.id)).toBe(1);
  });

  it('B6b: cancel multipart abort failure sets shared marker; sweeper aborts', async () => {
    const a = await newUser();
    const m = await call('POST', '/media/uploads', {
      cookie: a.cookie,
      body: { type: 'video', content_type: 'video/mp4', filename: 'v.mp4', size: 6 * 1024 * 1024, access: 'private', multipart: true },
      ip: freshIp(),
    });
    expect(m.status).toBe(201);
    const id = m.json.upload.id;
    const key = (await row(id)).object_key;
    const ses = await env.DB.prepare('SELECT r2_upload_id FROM media_multipart WHERE media_id=?').bind(id).first();
    const bad = proxyWith(env.MEDIA, 'resumeMultipartUpload', (t) => (...x) => {
      const u = t.resumeMultipartUpload(...x);
      return { uploadId: u.uploadId, abort: async () => { throw new Error('R2 500 on abort'); } };
    });
    const res = await worker.fetch(req(a, `/media/uploads/${id}`, 'DELETE'), { ...env, MEDIA: bad }, { waitUntil() {} });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.media.multipart_aborted).toBe(false);
    expect(body.media.r2_retry_pending).toBe(true);
    const r1 = await row(id);
    expect(r1.last_error).toBe(R2_PENDING_ERR);
    const db1 = (await env.DB.prepare('SELECT state FROM media_multipart WHERE media_id=?').bind(id).first()).state;
    expect(db1).toBe('active');
    // Object delete succeeded; multipart still active until sweeper
    const c = await cleanupAbandonedUploads(env);
    expect(c.retried).toBeGreaterThanOrEqual(1);
    const db2 = (await env.DB.prepare('SELECT state FROM media_multipart WHERE media_id=?').bind(id).first()).state;
    expect(db2).toBe('aborted');
    let stillActive = false;
    try {
      await env.MEDIA.resumeMultipartUpload(key, ses.r2_upload_id).uploadPart(1, new Uint8Array(5 * 1024 * 1024));
      stillActive = true;
    } catch {
      stillActive = false;
    }
    expect(stillActive).toBe(false);
  });

  it('tampered key quarantines instead of starving retries forever', async () => {
    const a = await newUser();
    const s = await pending(a);
    await put(a, s.upload_url, JPEG);
    await backdate(s.id);
    // Point at a music/ key — vaultDeleteFor throws VaultKeyError
    await env.DB.prepare(`UPDATE media SET object_key=? WHERE id=?`).bind(`music/${a.id}/stolen`, s.id).run();
    const c1 = await cleanupAbandonedUploads(env);
    expect(c1.errors).toBeGreaterThanOrEqual(1);
    const r1 = await row(s.id);
    expect(r1.state).toBe('deleted');
    expect(r1.last_error).toMatch(/quarantined|vault key/i);
    // Next sweep must not keep retrying quarantined rows
    const c2 = await cleanupAbandonedUploads(env);
    expect(c2.retried).toBe(0);
    expect((await row(s.id)).last_error).toMatch(/quarantined/i);
  });

  it('isNoSuchUpload only matches provider code/name, not arbitrary 404 text', () => {
    expect(isNoSuchUpload({ name: 'NoSuchUpload' })).toBe(true);
    expect(isNoSuchUpload({ code: 'NoSuchUpload' })).toBe(true);
    expect(isNoSuchUpload({ message: 'NoSuchUpload: upload id missing' })).toBe(true);
    expect(isNoSuchUpload(new Error('R2 500 on abort'))).toBe(false);
    expect(isNoSuchUpload(new Error('not found'))).toBe(false);
    expect(isNoSuchUpload(new Error('HTTP 404'))).toBe(false);
    expect(isNoSuchUpload({ message: 'something 404 something' })).toBe(false);
  });
});

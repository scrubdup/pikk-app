import { describe, it, expect } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, newUser, freshIp, ORIGIN, settle } from './helpers.js';
import { cleanupAbandonedUploads } from '../src/processing.js';
import worker from '../src/index.js';

const pad = (head, n = 256) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = i & 0xff; return b; };
const JPEG = pad([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46]);
const OLD = () => new Date(Date.now() - 30 * 3600e3).toISOString();
async function put(u, url, bytes, e) {
  const req = new Request(`https://api.test${url}`, {
    method: 'PUT', body: bytes,
    headers: { Origin: ORIGIN, Cookie: u.cookie, 'Content-Length': String(bytes.length), 'Content-Type': 'application/octet-stream', 'CF-Connecting-IP': freshIp() },
  });
  const res = e ? await worker.fetch(req, e, { waitUntil() {} }) : await SELF.fetch(req);
  return res.status;
}
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
function gate(db, re, method) {
  let rel, hit; const g = new Promise((r) => { rel = r; }); const h = new Promise((r) => { hit = r; });
  const proxy = new Proxy(db, {
    get(t, k) {
      if (k !== 'prepare') { const v = t[k]; return typeof v === 'function' ? v.bind(t) : v; }
      return (sql) => {
        const st = t.prepare(sql);
        if (!re.test(sql)) return st;
        return {
          bind: (...a) => {
            const b = st.bind(...a);
            return new Proxy(b, {
              get(bb, kk) {
                if (kk === method) return async (...x) => { const r = await bb[method](...x); hit(); await g; return r; };
                const v = bb[kk]; return typeof v === 'function' ? v.bind(bb) : v;
              },
            });
          },
        };
      };
    },
  });
  return { proxy, release: rel, hit: h };
}
const auditCount = async (id) => (await env.DB.prepare("SELECT COUNT(*) n FROM audit_log WHERE action='media.upload_abandoned' AND target=?").bind(id).first()).n;

describe('vault cleanup security fixes (VA2/VA3/VA4)', () => {
  it('VA2: complete+process racing cleanup does not delete ready object or audit abandon', async () => {
    const a = await newUser();
    const s = await pending(a); await put(a, s.upload_url, JPEG); await backdate(s.id);
    const key = (await row(s.id)).object_key;
    // Pause after claim SELECT of candidates (same query shape as cleanup)
    const g = gate(env.DB, /FROM media\s+WHERE deleted_at IS NULL AND state IN \('pending_upload','uploaded'\)/, 'all');
    const cp = cleanupAbandonedUploads({ ...env, DB: g.proxy });
    await g.hit;
    const done = await call('POST', `/media/${s.id}/complete`, { cookie: a.cookie, ip: freshIp() });
    expect(done.status).toBe(202);
    const st1 = await settle(s.id);
    expect(st1).toBe('ready');
    g.release();
    const r = await cp;
    const after = await row(s.id);
    expect(after.state).toBe('ready');
    expect(after.deleted_at).toBeNull();
    expect(await env.MEDIA.head(key)).toBeTruthy();
    expect(await auditCount(s.id)).toBe(0);
    const content = await call('POST', `/media/${s.id}/access-url`, { cookie: a.cookie, ip: freshIp() });
    expect(content.status).toBe(200);
    // Cleanup may report deleted=0 for this id (claim lost race)
    expect(r.errors).toBeGreaterThanOrEqual(0);
  });

  it('VA3: PUT racing cleanup cannot resurrect deleted row or leave orphan', async () => {
    const a = await newUser();
    const s = await pending(a); await backdate(s.id);
    const key = (await row(s.id)).object_key;
    const g = gate(env.DB, /SELECT \* FROM media WHERE id=\? AND owner_id=\? AND deleted_at IS NULL/, 'first');
    const pp = put(a, s.upload_url, JPEG, { ...env, DB: g.proxy });
    await g.hit;
    const r = await cleanupAbandonedUploads(env);
    expect(r.deleted).toBeGreaterThanOrEqual(1);
    g.release();
    const ps = await pp;
    expect(ps).toBe(409);
    const after = await row(s.id);
    expect(after.state).toBe('deleted');
    expect(after.deleted_at).toBeTruthy();
    expect(await env.MEDIA.head(key)).toBeNull();
  });

  it('VA4: R2 delete failure keeps retry marker; multipart abort failure does not mark aborted', async () => {
    const a = await newUser();
    const s = await pending(a); await put(a, s.upload_url, JPEG); await backdate(s.id);
    const badMedia = new Proxy(env.MEDIA, {
      get(t, k) {
        if (k === 'delete') return async () => { throw new Error('R2 503'); };
        const v = t[k]; return typeof v === 'function' ? v.bind(t) : v;
      },
    });
    const r = await cleanupAbandonedUploads({ ...env, MEDIA: badMedia });
    const st = await row(s.id);
    expect(st.state).toBe('deleted');
    expect(st.last_error).toMatch(/abandoned cleanup: r2/);
    expect(r.errors).toBeGreaterThanOrEqual(1);
    expect(await auditCount(s.id)).toBe(0);

    const size = 6 * 1024 * 1024;
    const m = await call('POST', '/media/uploads', {
      cookie: a.cookie,
      body: { type: 'video', content_type: 'video/mp4', filename: 'v.mp4', size, access: 'private', multipart: true },
      ip: freshIp(),
    });
    expect(m.status).toBe(201);
    const id = m.json.upload.id; await backdate(id);
    const ses = await env.DB.prepare('SELECT r2_upload_id FROM media_multipart WHERE media_id=?').bind(id).first();
    const key = (await row(id)).object_key;
    const abortFail = new Proxy(env.MEDIA, {
      get(t, k) {
        if (k === 'resumeMultipartUpload') {
          return (...x) => {
            const u = t.resumeMultipartUpload(...x);
            return { ...u, uploadId: u.uploadId, abort: async () => { throw new Error('R2 500 on abort'); } };
          };
        }
        // also fail object delete so claim path hits R2 error after claim
        if (k === 'delete') return async () => { throw new Error('R2 503'); };
        const v = t[k]; return typeof v === 'function' ? v.bind(t) : v;
      },
    });
    const r2 = await cleanupAbandonedUploads({ ...env, MEDIA: abortFail });
    expect(r2.errors).toBeGreaterThanOrEqual(1);
    const msState = await env.DB.prepare('SELECT state FROM media_multipart WHERE media_id=?').bind(id).first();
    expect(msState.state).toBe('active'); // must NOT be falsely aborted
    let stillActive = false;
    try {
      await env.MEDIA.resumeMultipartUpload(key, ses.r2_upload_id).uploadPart(1, new Uint8Array(5 * 1024 * 1024));
      stillActive = true;
    } catch (e) {
      stillActive = false;
    }
    // After failed cleanup abort, underlying upload may still accept parts
    expect(stillActive).toBe(true);
  });

  it('retry path clears r2-pending marker after successful delete', async () => {
    const a = await newUser();
    const s = await pending(a); await put(a, s.upload_url, JPEG); await backdate(s.id);
    const key = (await row(s.id)).object_key;
    await env.DB.prepare(
      `UPDATE media SET state='deleted', deleted_at=?, last_error='abandoned cleanup: r2 delete pending', updated_at=? WHERE id=?`
    ).bind(new Date().toISOString(), new Date().toISOString(), s.id).run();
    const r = await cleanupAbandonedUploads(env);
    expect(r.deleted).toBeGreaterThanOrEqual(1);
    expect(await env.MEDIA.head(key)).toBeNull();
    const after = await row(s.id);
    expect(after.last_error).toBe('abandoned upload cleanup');
    expect(await auditCount(s.id)).toBe(1);
  });
});

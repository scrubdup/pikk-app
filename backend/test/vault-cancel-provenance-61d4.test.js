import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { call, newUser, freshIp, ORIGIN } from './helpers.js';
import { cleanupAbandonedUploads } from '../src/processing.js';
import { CANCEL_R2_PENDING_ERR } from '../src/media-config.js';
import worker from '../src/index.js';

const pad = (head, n = 256) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = i & 0xff; return b; };
const JPEG = pad([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46]);
const put = async (u, url, bytes) => (await (await import('cloudflare:test')).SELF.fetch(`https://api.test${url}`, {
  method: 'PUT', body: bytes,
  headers: { Origin: ORIGIN, Cookie: u.cookie, 'Content-Length': String(bytes.length), 'Content-Type': 'application/octet-stream', 'CF-Connecting-IP': freshIp() },
})).status;
const row = (id) => env.DB.prepare('SELECT state, deleted_at, last_error, object_key FROM media WHERE id=?').bind(id).first();
const audits = async (id, a) => (await env.DB.prepare('SELECT COUNT(*) n FROM audit_log WHERE action=? AND target=?').bind(a, id).first()).n;
function proxyWith(obj, k, fn) {
  return new Proxy(obj, {
    get(t, kk) {
      if (kk === k) return fn(t);
      const v = t[kk];
      return typeof v === 'function' ? v.bind(t) : v;
    },
  });
}

describe('REPORT-61d4c43 B1 cancel provenance across R2 retries', () => {
  it('E1: cancel fail → retry fail → retry success => exactly 1 upload_cancelled, 0 abandoned', async () => {
    const a = await newUser();
    const c = await call('POST', '/media/uploads', {
      cookie: a.cookie,
      body: { type: 'photo', content_type: 'image/jpeg', filename: 'e1.jpg', size: JPEG.length, access: 'private' },
      ip: freshIp(),
    });
    expect(c.status).toBe(201);
    const id = c.json.upload.id;
    expect(await put(a, c.json.upload.upload_url, JPEG)).toBe(200);

    const failDelete = proxyWith(env.MEDIA, 'delete', () => async () => { throw new Error('R2 503'); });
    const req = new Request(`https://api.test/media/uploads/${id}`, {
      method: 'DELETE',
      headers: { Origin: ORIGIN, Cookie: a.cookie, 'CF-Connecting-IP': freshIp() },
    });
    const res = await worker.fetch(req, { ...env, MEDIA: failDelete }, { waitUntil() {} });
    expect([202, 200]).toContain(res.status);
    const body = await res.json();
    expect(body.media.cleanup_pending).toBe(true);
    expect(body.media.cancelled).toBe(true);

    const afterCancel = await row(id);
    expect(afterCancel.state).toBe('deleted');
    expect(afterCancel.last_error).toBe(CANCEL_R2_PENDING_ERR);

    // First sweep retry fails — must KEEP cancel prefix (not rewrite to abandoned).
    await cleanupAbandonedUploads({ ...env, MEDIA: failDelete });
    const afterFailRetry = await row(id);
    expect(afterFailRetry.last_error).toMatch(/cancel/i);
    expect(afterFailRetry.last_error).toMatch(/r2 delete pending/);
    expect(afterFailRetry.last_error).toMatch(/;n=1$/);
    expect(afterFailRetry.last_error).not.toMatch(/^abandoned/i);

    // Second sweep succeeds.
    await cleanupAbandonedUploads(env);
    const final = await row(id);
    expect(final.last_error).toBe('cancelled by owner');
    expect(await audits(id, 'media.upload_cancelled')).toBe(1);
    expect(await audits(id, 'media.upload_abandoned')).toBe(0);
  });
});

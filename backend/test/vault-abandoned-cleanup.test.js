import { describe, it, expect } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, newUser, freshIp, ORIGIN, settle } from './helpers.js';
import { cleanupAbandonedUploads, scheduledTick } from '../src/processing.js';
import { PENDING_UPLOAD_TTL_HOURS } from '../src/media-config.js';

const pad = (head, n = 256) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = i & 0xff; return b; };
const JPEG = pad([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, ...[...'JFIF'].map((c) => c.charCodeAt(0))]);

async function put(u, url, bytes) {
  const res = await SELF.fetch(`https://api.test${url}`, {
    method: 'PUT',
    body: bytes,
    headers: {
      Origin: ORIGIN,
      Cookie: u.cookie,
      'Content-Length': String(bytes.length),
      'Content-Type': 'application/octet-stream',
      'CF-Connecting-IP': freshIp(),
    },
  });
  return { status: res.status, json: await res.json().catch(() => null) };
}

async function createPending(u) {
  const c = await call('POST', '/media/uploads', {
    cookie: u.cookie,
    body: { type: 'photo', content_type: 'image/jpeg', filename: 'a.jpg', size: JPEG.length, access: 'private' },
    ip: freshIp(),
  });
  expect(c.status).toBe(201);
  return c.json.upload;
}

describe('abandoned upload cleanup (failed / unfinished lifecycle)', () => {
  it('soft-deletes stale unfinished uploads, removes R2 object; leaves ready media and other users alone', async () => {
    const a = await newUser();
    const b = await newUser();

    const stale = await createPending(a);
    expect((await put(a, stale.upload_url, JPEG)).status).toBe(200); // state → uploaded
    const old = new Date(Date.now() - (PENDING_UPLOAD_TTL_HOURS + 1) * 3600e3).toISOString();
    await env.DB.prepare(`UPDATE media SET created_at=?, updated_at=? WHERE id=?`).bind(old, old, stale.id).run();
    const keyRow = await env.DB.prepare(`SELECT object_key FROM media WHERE id=?`).bind(stale.id).first();

    const fresh = await createPending(b);

    // Ready media for A must survive cleanup
    const readyUp = await createPending(a);
    expect((await put(a, readyUp.upload_url, JPEG)).status).toBe(200);
    const done = await call('POST', `/media/${readyUp.id}/complete`, { cookie: a.cookie, ip: freshIp() });
    expect(done.status).toBe(202);
    await settle(readyUp.id);
    const readyState = await env.DB.prepare(`SELECT state FROM media WHERE id=?`).bind(readyUp.id).first();
    expect(readyState.state).toBe('ready');

    const result = await cleanupAbandonedUploads(env);
    expect(result.deleted).toBeGreaterThanOrEqual(1);

    const afterStale = await env.DB.prepare(`SELECT state, deleted_at, last_error FROM media WHERE id=?`).bind(stale.id).first();
    expect(afterStale.state).toBe('deleted');
    expect(afterStale.deleted_at).toBeTruthy();
    expect(afterStale.last_error).toMatch(/abandoned/i);

    const afterFresh = await env.DB.prepare(`SELECT state, deleted_at FROM media WHERE id=?`).bind(fresh.id).first();
    expect(afterFresh.state).toBe('pending_upload');
    expect(afterFresh.deleted_at).toBeNull();

    const afterReady = await env.DB.prepare(`SELECT state, deleted_at FROM media WHERE id=?`).bind(readyUp.id).first();
    expect(afterReady.state).toBe('ready');
    expect(afterReady.deleted_at).toBeNull();

    expect(await env.MEDIA.head(keyRow.object_key)).toBeNull();

    const cancel = await call('DELETE', `/media/uploads/${fresh.id}`, { cookie: b.cookie, ip: freshIp() });
    expect(cancel.status).toBe(200);
  });

  it('scheduledTick includes abandoned cleanup', async () => {
    const u = await newUser();
    const up = await createPending(u);
    const old = new Date(Date.now() - (PENDING_UPLOAD_TTL_HOURS + 2) * 3600e3).toISOString();
    await env.DB.prepare(`UPDATE media SET created_at=? WHERE id=?`).bind(old, up.id).run();
    const tick = await scheduledTick(env);
    expect(tick.abandoned.deleted).toBeGreaterThanOrEqual(1);
    const row = await env.DB.prepare(`SELECT state FROM media WHERE id=?`).bind(up.id).first();
    expect(row.state).toBe('deleted');
  });

  it('cross-user: B cannot cancel A upload (404); owner can', async () => {
    const a = await newUser();
    const b = await newUser();
    const up = await createPending(a);
    expect((await call('DELETE', `/media/uploads/${up.id}`, { cookie: b.cookie, ip: freshIp() })).status).toBe(404);
    expect((await call('DELETE', `/media/uploads/${up.id}`, { cookie: a.cookie, ip: freshIp() })).status).toBe(200);
  });
});

import { describe, it, expect } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, newUser, freshIp, ORIGIN, settle } from './helpers.js';
import { cleanupAbandonedUploads } from '../src/processing.js';
import { DELETE_R2_PENDING_ERR } from '../src/media-config.js';
import worker from '../src/index.js';

const pad = (head, n = 256) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = i & 0xff; return b; };
const JPEG = pad([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, 0x4a, 0x46, 0x49, 0x46]);

async function put(u, url, bytes) {
  return (await SELF.fetch(`https://api.test${url}`, {
    method: 'PUT', body: bytes,
    headers: { Origin: ORIGIN, Cookie: u.cookie, 'Content-Length': String(bytes.length), 'Content-Type': 'application/octet-stream', 'CF-Connecting-IP': freshIp() },
  })).status;
}

async function readyPhoto(u, name = 'shot.jpg') {
  const c = await call('POST', '/media/uploads', {
    cookie: u.cookie,
    body: { type: 'photo', content_type: 'image/jpeg', filename: name, size: JPEG.length, access: 'private' },
    ip: freshIp(),
  });
  expect(c.status).toBe(201);
  expect(await put(u, c.json.upload.upload_url, JPEG)).toBe(200);
  await call('POST', `/media/${c.json.upload.id}/complete`, { cookie: u.cookie, ip: freshIp() });
  expect(await settle(c.json.upload.id)).toBe('ready');
  return c.json.upload.id;
}

function proxyWith(obj, k, fn) {
  return new Proxy(obj, {
    get(t, kk) {
      if (kk === k) return fn(t);
      const v = t[kk];
      return typeof v === 'function' ? v.bind(t) : v;
    },
  });
}

const row = (id) => env.DB.prepare('SELECT state, deleted_at, last_error, object_key, owner_id FROM media WHERE id=?').bind(id).first();
const audits = async (id, a) => (await env.DB.prepare('SELECT COUNT(*) n FROM audit_log WHERE action=? AND target=?').bind(a, id).first()).n;

describe('ready-media owner delete + signed-link invalidation', () => {
  it('owner deletes ready media; cross-user 404; signed content stops', async () => {
    const a = await newUser();
    const b = await newUser();
    const id = await readyPhoto(a, 'keep-mine.jpg');
    const key = (await row(id)).object_key;

    const urlA = await call('POST', `/media/${id}/access-url`, { cookie: a.cookie, ip: freshIp() });
    expect(urlA.status).toBe(200);
    const signedPath = urlA.json.url;
    const before = await SELF.fetch(`https://api.test${signedPath}`, { method: 'GET' });
    expect(before.status).toBe(200);

    const cross = await call('DELETE', `/media/${id}`, { cookie: b.cookie, ip: freshIp() });
    expect(cross.status).toBe(404);
    expect((await row(id)).state).toBe('ready');

    const del = await call('DELETE', `/media/${id}`, { cookie: a.cookie, ip: freshIp() });
    expect([200, 202]).toContain(del.status);
    expect(del.json.media.deleted).toBe(true);
    expect(del.json.media.state).toBe('deleted');
    expect(await audits(id, 'media.deleted')).toBe(1);
    expect(await audits(id, 'media.upload_abandoned')).toBe(0);

    const after = await row(id);
    expect(after.state).toBe('deleted');
    expect(after.deleted_at).toBeTruthy();
    expect(await env.MEDIA.head(key)).toBeNull();

    expect((await call('GET', `/media/${id}`, { cookie: a.cookie, ip: freshIp() })).status).toBe(404);
    expect((await call('POST', `/media/${id}/access-url`, { cookie: a.cookie, ip: freshIp() })).status).toBe(404);
    const afterSigned = await SELF.fetch(`https://api.test${signedPath}`, { method: 'GET' });
    expect(afterSigned.status).toBe(404);

    // Unfinished cancel path still distinct — pending not deletable via ready-delete
    const pend = await call('POST', '/media/uploads', {
      cookie: a.cookie,
      body: { type: 'photo', content_type: 'image/jpeg', filename: 'p.jpg', size: JPEG.length, access: 'private' },
      ip: freshIp(),
    });
    const bad = await call('DELETE', `/media/${pend.json.upload.id}`, { cookie: a.cookie, ip: freshIp() });
    expect(bad.status).toBe(409);
  });

  it('R2 delete failure → 202 cleanup_pending; retry preserves owner-delete provenance (no abandoned)', async () => {
    const a = await newUser();
    const id = await readyPhoto(a, 'retry-del.jpg');
    const key = (await row(id)).object_key;
    const failDelete = proxyWith(env.MEDIA, 'delete', () => async () => { throw new Error('R2 503'); });
    const req = new Request(`https://api.test/media/${id}`, {
      method: 'DELETE',
      headers: { Origin: ORIGIN, Cookie: a.cookie, 'CF-Connecting-IP': freshIp() },
    });
    const res = await worker.fetch(req, { ...env, MEDIA: failDelete }, { waitUntil() {} });
    expect([202, 200]).toContain(res.status);
    const body = await res.json();
    expect(body.media.cleanup_pending).toBe(true);
    expect((await row(id)).last_error).toBe(DELETE_R2_PENDING_ERR);
    expect(await env.MEDIA.head(key)).toBeTruthy();
    expect(await audits(id, 'media.deleted')).toBe(1);

    await cleanupAbandonedUploads({ ...env, MEDIA: failDelete });
    const mid = await row(id);
    expect(mid.last_error).toMatch(/owner delete/i);
    expect(mid.last_error).toMatch(/r2 delete pending/);
    expect(mid.last_error).toMatch(/;n=1$/);
    expect(mid.last_error).not.toMatch(/^abandoned/i);

    await cleanupAbandonedUploads(env);
    expect(await env.MEDIA.head(key)).toBeNull();
    expect((await row(id)).last_error).toBe('deleted by owner');
    expect(await audits(id, 'media.deleted')).toBe(1);
    expect(await audits(id, 'media.upload_abandoned')).toBe(0);
    expect(await audits(id, 'media.upload_cancelled')).toBe(0);
  });
});

describe('GET /media cursor pagination', () => {
  it('pages past newest 100 with stable ties; invalid/foreign cursors safe', async () => {
    const a = await newUser();
    const b = await newUser();
    const ids = [];
    // Create 5 ready items for A (enough to page with limit=2)
    for (let i = 0; i < 5; i++) {
      ids.push(await readyPhoto(a, `page-${i}.jpg`));
    }
    // Force identical created_at on two rows to exercise id tie-break
    const t = '2026-01-15T12:00:00.000Z';
    await env.DB.prepare('UPDATE media SET created_at=? WHERE id IN (?, ?)').bind(t, ids[0], ids[1]).run();

    const p1 = await call('GET', '/media?limit=2', { cookie: a.cookie, ip: freshIp() });
    expect(p1.status).toBe(200);
    expect(p1.json.count).toBe(2);
    expect(p1.json.next_cursor).toBeTruthy();
    const seen = new Set(p1.json.media.map((m) => m.id));

    const p2 = await call('GET', `/media?limit=2&cursor=${encodeURIComponent(p1.json.next_cursor)}`, { cookie: a.cookie, ip: freshIp() });
    expect(p2.status).toBe(200);
    expect(p2.json.count).toBe(2);
    for (const m of p2.json.media) {
      expect(seen.has(m.id)).toBe(false);
      seen.add(m.id);
    }

    const p3 = await call('GET', `/media?limit=2&cursor=${encodeURIComponent(p2.json.next_cursor)}`, { cookie: a.cookie, ip: freshIp() });
    expect(p3.status).toBe(200);
    expect(p3.json.count).toBe(1);
    expect(p3.json.next_cursor).toBeNull();
    seen.add(p3.json.media[0].id);
    expect(seen.size).toBe(5);

    // Invalid cursor
    const bad = await call('GET', '/media?cursor=!!!not-b64!!!', { cookie: a.cookie, ip: freshIp() });
    expect(bad.status).toBe(400);
    expect(bad.json.error.code).toBe('invalid_cursor');

    const junk = await call('GET', '/media?cursor=YWJj', { cookie: a.cookie, ip: freshIp() }); // "abc"
    expect(junk.status).toBe(400);

    // Foreign cursor: encode B's media timestamp — A gets only A's remaining page (no leak of B ids)
    const bId = await readyPhoto(b, 'b-only.jpg');
    const brow = await env.DB.prepare('SELECT created_at, id FROM media WHERE id=?').bind(bId).first();
    const foreign = btoa(`${brow.created_at}\n${brow.id}`).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
    const fx = await call('GET', `/media?limit=50&cursor=${foreign}`, { cookie: a.cookie, ip: freshIp() });
    expect(fx.status).toBe(200);
    expect(fx.json.media.every((m) => m.id !== bId)).toBe(true);
    expect(fx.json.media.every((m) => !String(JSON.stringify(m)).includes(b.id))).toBe(true);

    // owner_id query ignored
    const leak = await call('GET', `/media?owner_id=${a.id}`, { cookie: b.cookie, ip: freshIp() });
    expect(leak.status).toBe(200);
    expect(leak.json.media.every((m) => m.id === bId || m.filename === 'b-only.jpg')).toBe(true);
    expect(leak.json.media.some((m) => ids.includes(m.id))).toBe(false);

    // limit clamps
    for (const q of ['0', '-5', '101', '1000', 'abc']) {
      const r = await call('GET', `/media?limit=${q}`, { cookie: a.cookie, ip: freshIp() });
      expect(r.status).toBe(200);
      expect(r.json.count).toBeLessThanOrEqual(100);
    }
  });
});

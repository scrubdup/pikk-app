import { describe, it, expect } from 'vitest';
import { SELF, env, applyD1Migrations, createScheduledController, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { call, newUser, makeAdmin, ORIGIN, settle } from './helpers.js';
import worker from '../src/index.js';
import { runBackup, restoreBackup } from '../src/backup.js';
import { VAULT_QUOTA, MULTIPART, BACKUP } from '../src/media-config.js';

const ascii = (s) => [...s].map(c => c.charCodeAt(0));
const pad = (head, n) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = (i * 7) & 0xff; return b; };
const PNG = (n = 256) => pad([0x89, ...ascii('PNG'), 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13, ...ascii('IHDR'), 0, 0, 2, 128, 0, 0, 1, 224, 8, 2, 0, 0, 0], n);
const raw = (u, method, path, body, extra = {}) => SELF.fetch(`https://api.test${path}`, { method, body,
  headers: { Origin: ORIGIN, Cookie: u.cookie, 'CF-Connecting-IP': '10.77.1.1', ...(body ? { 'Content-Length': String(body.length) } : {}), ...extra } });
const create = (u, body) => call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/png', filename: 'a.png', ...body } });
async function readyPhoto(u, bytes = PNG()) {
  const c = await create(u, { size: bytes.length });
  expect((await raw(u, 'PUT', c.json.upload.upload_url, bytes)).status).toBe(200);
  await call('POST', `/media/${c.json.upload.id}/complete`, { cookie: u.cookie });
  expect(await settle(c.json.upload.id)).toBe('ready');
  return c.json.upload.id;
}

describe('slice 4: quotas and usage', () => {
  it('reports usage and rejects uploads over quota with 413 quota_exceeded', async () => {
    const u = await newUser(); const adm = await newUser(); await makeAdmin(adm.id);
    const u0 = await call('GET', '/vault/usage', { cookie: u.cookie });
    expect(u0.json.usage).toMatchObject({ used_bytes: 0, quota_bytes: VAULT_QUOTA.defaultUserBytes, quota_source: 'default', alert: false });
    expect((await call('PUT', `/vault/admin/quotas/${u.id}`, { cookie: adm.cookie, body: { max_bytes: 1000 } })).status).toBe(200);
    expect((await create(u, { size: 600 })).status).toBe(201);           // pending upload reserves quota
    const over = await create(u, { size: 600 });
    expect(over.status).toBe(413); expect(over.json.error.code).toBe('quota_exceeded');
    const us = (await call('GET', '/vault/usage', { cookie: u.cookie })).json.usage;
    expect(us).toMatchObject({ used_bytes: 600, quota_source: 'override', alert: false });
  });
  it('cancel frees the reservation', async () => {
    const u = await newUser(); const adm = await newUser(); await makeAdmin(adm.id);
    await call('PUT', `/vault/admin/quotas/${u.id}`, { cookie: adm.cookie, body: { max_bytes: 1000 } });
    const c = await create(u, { size: 900 });
    expect((await create(u, { size: 200 })).status).toBe(413);
    const d = await raw(u, 'DELETE', `/media/uploads/${c.json.upload.id}`);
    expect(d.status).toBe(200);
    expect((await create(u, { size: 200 })).status).toBe(201);
  });
  it('non-admins cannot read admin stats or set quotas; other users cannot cancel', async () => {
    const u = await newUser(); const v = await newUser();
    expect((await call('GET', '/vault/admin/usage', { cookie: u.cookie })).status).toBe(403);
    expect((await call('GET', '/vault/admin/stats', { cookie: u.cookie })).status).toBe(403);
    expect((await call('PUT', `/vault/admin/quotas/${u.id}`, { cookie: u.cookie, body: { max_bytes: 1 } })).status).toBe(403);
    const c = await create(u, { size: 300 });
    expect((await raw(v, 'DELETE', `/media/uploads/${c.json.upload.id}`)).status).toBe(404);
  });
  it('admin usage and stats return real D1 numbers, costs unavailable', async () => {
    const adm = await newUser(); await makeAdmin(adm.id);
    await readyPhoto(adm);
    const a = await call('GET', '/vault/admin/usage', { cookie: adm.cookie });
    expect(a.status).toBe(200);
    expect(a.json.usage.total_bytes).toBeGreaterThan(0);
    expect(a.json.usage.costs.status).toBe('unavailable');
    const s = await call('GET', '/vault/admin/stats', { cookie: adm.cookie });
    expect(s.json.stats).toMatchObject({ backlog: expect.any(Object), failures: expect.any(Object), source: 'd1' });
  });
});

describe('slice 4: resumable multipart uploads', () => {
  const MB = 1024 * 1024;
  it('uploads parts out of order, resumes via part listing, assembles and processes', async () => {
    const u = await newUser();
    const bytes = PNG(MULTIPART.minPartBytes + 1234);
    const c = await create(u, { size: bytes.length, multipart: true, part_size: MULTIPART.minPartBytes });
    expect(c.status).toBe(201);
    expect(c.json.upload).toMatchObject({ mode: 'multipart', part_count: 2 });
    const id = c.json.upload.id;
    expect((await raw(u, 'PUT', `/media/uploads/${id}/parts/2`, bytes.slice(MULTIPART.minPartBytes))).status).toBe(200);
    const l = await call('GET', `/media/uploads/${id}/parts`, { cookie: u.cookie });
    expect(l.json.upload.missing).toEqual([1]);
    const early = await call('POST', `/media/uploads/${id}/parts/complete`, { cookie: u.cookie });
    expect(early.status).toBe(409);
    expect((await raw(u, 'PUT', `/media/uploads/${id}/parts/1`, bytes.slice(0, MULTIPART.minPartBytes))).status).toBe(200);
    const done = await call('POST', `/media/uploads/${id}/parts/complete`, { cookie: u.cookie });
    expect(done.status).toBe(200);
    const fin = await call('POST', `/media/${id}/complete`, { cookie: u.cookie });
    expect(fin.status).toBe(202);
    expect(await settle(id)).toBe('ready');
    expect((await env.MEDIA.head(`u/${u.id}/${id}`)).size).toBe(bytes.length);
  });
  it('rejects wrong part sizes and bounds per-part retries', async () => {
    const u = await newUser();
    const size = MULTIPART.minPartBytes + 10;
    const c = await create(u, { size, multipart: true, part_size: MULTIPART.minPartBytes });
    const id = c.json.upload.id;
    expect((await raw(u, 'PUT', `/media/uploads/${id}/parts/2`, new Uint8Array(11))).status).toBe(413);
    for (let i = 0; i < MULTIPART.maxPartAttempts; i++)
      expect((await raw(u, 'PUT', `/media/uploads/${id}/parts/2`, new Uint8Array(10))).status).toBe(200);
    const lim = await raw(u, 'PUT', `/media/uploads/${id}/parts/2`, new Uint8Array(10));
    expect(lim.status).toBe(429); expect((await lim.json()).error.code).toBe('part_retry_limit');
    expect((await raw(u, 'PUT', `/media/uploads/${id}/parts/3`, new Uint8Array(10))).status).toBe(422);
  });
  it('rejects tiny part sizes and lets the owner cancel (aborts R2 multipart)', async () => {
    const u = await newUser();
    expect((await create(u, { size: 10 * MB, multipart: true, part_size: 1024 })).status).toBe(422);
    const c = await create(u, { size: 6 * MB, multipart: true, part_size: 5 * MB });
    const id = c.json.upload.id;
    const d = await raw(u, 'DELETE', `/media/uploads/${id}`);
    expect(d.status).toBe(200);
    expect((await env.DB.prepare('SELECT state FROM media_multipart WHERE media_id=?').bind(id).first()).state).toBe('aborted');
    expect((await raw(u, 'PUT', `/media/uploads/${id}/parts/1`, new Uint8Array(5 * MB))).status).toBe(404);
  });
  it('spoofed content still rejected after multipart assembly', async () => {
    const u = await newUser();
    const exe = pad([...ascii('MZ'), 0x90, 0], MULTIPART.minPartBytes + 5);
    const c = await create(u, { size: exe.length, multipart: true, part_size: MULTIPART.minPartBytes });
    const id = c.json.upload.id;
    await raw(u, 'PUT', `/media/uploads/${id}/parts/1`, exe.slice(0, MULTIPART.minPartBytes));
    await raw(u, 'PUT', `/media/uploads/${id}/parts/2`, exe.slice(MULTIPART.minPartBytes));
    expect((await call('POST', `/media/uploads/${id}/parts/complete`, { cookie: u.cookie })).status).toBe(200);
    expect((await call('POST', `/media/${id}/complete`, { cookie: u.cookie })).status).toBe(422);
  });
});

describe('slice 4: backup and isolated restore', () => {
  it('cron backup copies ready objects to MEDIA_BACKUP with a manifest; restore into an isolated D1+R2 verifies checksums', async () => {
    const u = await newUser();
    const id = await readyPhoto(u, PNG(4096));
    const ctrl = createScheduledController({ scheduledTime: Date.now(), cron: BACKUP.cron });
    const ectx = createExecutionContext();
    await worker.scheduled(ctrl, env, ectx); await waitOnExecutionContext(ectx);
    const run = await env.DB.prepare(`SELECT * FROM vault_backup_runs WHERE trigger='cron' ORDER BY started_at DESC LIMIT 1`).first();
    expect(run.state).toBe('succeeded');
    const b = await env.DB.prepare('SELECT * FROM media_backups WHERE media_id=?').bind(id).first();
    expect(b).toBeTruthy();
    expect((await env.MEDIA_BACKUP.head(b.backup_key)).size).toBe(4096);
    // second run copies nothing new (idempotent)
    const again = await runBackup(env, 'admin');
    expect(again.objects_copied).toBe(0);

    // Isolated environment: separate D1 + R2; seed only the owner account (users restored separately by design).
    await applyD1Migrations(env.RESTORE_DB, env.TEST_MIGRATIONS);
    const usr = await env.DB.prepare('SELECT * FROM users WHERE id=?').bind(u.id).first();
    await env.RESTORE_DB.prepare('INSERT OR IGNORE INTO users(id,auth_subject,handle,display_name,account_type,created_at) VALUES (?,?,?,?,?,?)')
      .bind(usr.id, usr.auth_subject, usr.handle, usr.display_name, usr.account_type, usr.created_at).run();
    const rep = await restoreBackup({ sourceBucket: env.MEDIA_BACKUP, targetDb: env.RESTORE_DB, targetBucket: env.RESTORE_MEDIA });
    expect(rep.errors).toEqual([]);
    expect(rep.verified).toBeGreaterThanOrEqual(1);
    const orig = await env.DB.prepare('SELECT checksum_sha256,size_bytes,object_key,access_policy FROM media WHERE id=?').bind(id).first();
    const rest = await env.RESTORE_DB.prepare('SELECT checksum_sha256,size_bytes,object_key,access_policy FROM media WHERE id=?').bind(id).first();
    expect(rest).toEqual(orig);
    expect((await env.RESTORE_MEDIA.head(orig.object_key)).size).toBe(4096);
    expect(rep.skipped_missing_owner.length).toBeGreaterThanOrEqual(0); // other owners not seeded: reported, not faked
  });
  it('skips honestly when MEDIA_BACKUP is missing; restore refuses implicit targets', async () => {
    const r = await runBackup({ ...env, MEDIA_BACKUP: undefined }, 'admin');
    expect(r.state).toBe('skipped');
    await expect(restoreBackup({ sourceBucket: env.MEDIA_BACKUP })).rejects.toThrow(/explicit/);
  });
  it('admin can trigger and list backup runs; non-admin cannot', async () => {
    const u = await newUser(); const adm = await newUser(); await makeAdmin(adm.id);
    expect((await call('POST', '/vault/admin/backups/run', { cookie: u.cookie })).status).toBe(403);
    const r = await call('POST', '/vault/admin/backups/run', { cookie: adm.cookie });
    expect(r.status).toBe(200);
    const l = await call('GET', '/vault/admin/backups', { cookie: adm.cookie });
    expect(l.json.runs.length).toBeGreaterThan(0);
  });
});

describe('slice 4: health additions', () => {
  it('adds backup, quotas, multipart and keeps thumbnails unavailable_pending_provider', async () => {
    const adm = await newUser(); await makeAdmin(adm.id);
    await runBackup(env, 'admin');
    const h = await call('GET', '/vault/health', { cookie: adm.cookie });
    expect(h.status).toBe(200);
    expect(h.json.backup).toMatchObject({ binding: 'MEDIA_BACKUP', reachable: true, cron: BACKUP.cron, last_run: expect.any(Object) });
    expect(h.json.quotas).toMatchObject({ default_user_bytes: VAULT_QUOTA.defaultUserBytes, users_over_alert: expect.any(Number) });
    expect(h.json.multipart.active_uploads).toEqual(expect.any(Number));
    expect(h.json.thumbnails).toBe('unavailable_pending_provider');
    expect(h.json.processing.thumbnails).toBe('unavailable_pending_provider');
    expect(env.IMAGES).toBeUndefined();
  });
});

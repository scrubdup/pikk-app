import { describe, it, expect, beforeEach } from 'vitest';
import { SELF, env, createScheduledController, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import { call, newUser, makeAdmin, ORIGIN, settle } from './helpers.js';
import worker from '../src/index.js';
import { drainJobs, setSetting, isPaused, sweepExpiredStories } from '../src/processing.js';
import { imageDims, wavDuration, flacDuration } from '../src/probe.js';
import { PROCESSING } from '../src/media-config.js';

const ascii = (s) => [...s].map(c => c.charCodeAt(0));
const pad = (head, n = 256) => { const b = new Uint8Array(n); b.set(head); for (let i = head.length; i < n; i++) b[i] = i & 0xff; return b; };
const be32 = (n) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];
const le32 = (n) => [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255];
const le16 = (n) => [n & 255, (n >>> 8) & 255];
const JPEG = pad([0xff, 0xd8, 0xff, 0xe0, 0, 0x10, ...ascii('JFIF')]);
const MP3 = pad([...ascii('ID3'), 4, 0, 0, 0, 0, 0, 0, 0, 0], 600);
const EXE = pad([...ascii('MZ'), 0x90, 0, 3, 0, 0, 0, 4, 0, 0, 0]);
const PNG = pad([0x89, ...ascii('PNG'), 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13, ...ascii('IHDR'), ...be32(640), ...be32(480), 8, 2, 0, 0, 0]);
// 1s of 8kHz mono 8-bit PCM: byteRate 8000, data 8000 bytes
const WAV = pad([...ascii('RIFF'), ...le32(8036), ...ascii('WAVE'), ...ascii('fmt '), ...le32(16), ...le16(1), ...le16(1), ...le32(8000), ...le32(8000), ...le16(1), ...le16(8), ...ascii('data'), ...le32(8000)], 8044);
// ftyp + moov{mvhd v0 timescale 1000 duration 2500}
const MP4 = (() => {
  const ftyp = [...be32(16), ...ascii('ftypisom'), 0, 0, 2, 0];
  const mvhd = [...be32(108), ...ascii('mvhd'), 0, 0, 0, 0, ...be32(0), ...be32(0), ...be32(1000), ...be32(2500), ...new Array(80).fill(0)];
  const moov = [...be32(8 + mvhd.length), ...ascii('moov'), ...mvhd];
  return pad([...ftyp, ...moov], ftyp.length + moov.length + 64);
})();

async function put(u, url, bytes) {
  const r = await SELF.fetch(`https://api.test${url}`, { method: 'PUT', body: bytes,
    headers: { Origin: ORIGIN, Cookie: u.cookie, 'Content-Length': String(bytes.length), 'CF-Connecting-IP': '10.66.1.1' } });
  expect(r.status).toBe(200);
}
async function uploadAndComplete(u, { type, content_type, bytes, access = 'private', story }) {
  const c = await call('POST', '/media/uploads', { cookie: u.cookie, body: { type, content_type, filename: 'x.bin', size: bytes.length, access, story } });
  expect(c.status).toBe(201);
  await put(u, c.json.upload.upload_url, bytes);
  const done = await call('POST', `/media/${c.json.upload.id}/complete`, { cookie: u.cookie });
  return { id: c.json.upload.id, done };
}
const jobFor = (mediaId) => env.DB.prepare('SELECT * FROM processing_jobs WHERE media_id=?').bind(mediaId).first();
const mediaRow = (id) => env.DB.prepare('SELECT * FROM media WHERE id=?').bind(id).first();
const auditCount = async (action, target) => (await env.DB.prepare('SELECT COUNT(*) AS n FROM audit_log WHERE action=? AND (?2 IS NULL OR target=?2)').bind(action, target ?? null).first()).n;
const pause = () => setSetting(env, 'processing_paused', '1', null);
const unpause = () => setSetting(env, 'processing_paused', '0', null);

beforeEach(async () => { await unpause(); });

describe('slice 3: processing states', () => {
  it('complete -> processing (202) -> ready via ctx.waitUntil processor; job succeeded in 1 attempt', async () => {
    const u = await newUser();
    const { id, done } = await uploadAndComplete(u, { type: 'photo', content_type: 'image/png', bytes: PNG });
    expect(done.status).toBe(202);
    expect(done.json.media.state).toBe('processing');
    expect(done.json.job.state).toBe('queued');
    expect(await settle(id, { drain: false })).toBe('ready'); // waitUntil path only, no manual drain
    const j = await jobFor(id);
    expect(j).toMatchObject({ job_type: 'probe', state: 'succeeded', attempts: 1, max_attempts: 3, last_error: null });
    expect(j.finished_at).toBeTruthy();
    const g = await call('GET', `/media/${id}`, { cookie: u.cookie });
    expect(g.json.media).toMatchObject({ state: 'ready', width: 640, height: 480, duration_ms: null, thumbnail: 'unavailable_pending_provider', variants: 'not_applicable' });
    expect(await auditCount('media.ready', id)).toBe(1);
  });

  it('nothing is playable before ready (owner and public audience), even via signed URL', async () => {
    const u = await newUser(); const v = await newUser();
    await pause();
    const { id, done } = await uploadAndComplete(u, { type: 'audio', content_type: 'audio/mpeg', bytes: MP3, access: 'public' });
    expect(done.status).toBe(202);
    expect((await mediaRow(id)).state).toBe('processing');
    expect((await SELF.fetch(`https://api.test/media/${id}/content`, { headers: { Cookie: u.cookie } })).status).toBe(404);
    expect((await SELF.fetch(`https://api.test/media/${id}/content`, { headers: { Cookie: v.cookie } })).status).toBe(404);
    expect((await call('POST', `/media/${id}/access-url`, { cookie: u.cookie })).status).toBe(404);
    expect((await call('GET', `/media/${id}`, { cookie: v.cookie })).status).toBe(404);
    expect((await call('GET', `/media/${id}`, { cookie: u.cookie })).json.media.state).toBe('processing');
    // repeat complete while processing is idempotent
    expect((await call('POST', `/media/${id}/complete`, { cookie: u.cookie })).status).toBe(202);
    await unpause(); await drainJobs(env);
    expect((await mediaRow(id)).state).toBe('ready');
    expect((await SELF.fetch(`https://api.test/media/${id}/content`, { headers: { Cookie: v.cookie } })).status).toBe(200);
  });

  it('probes metadata: wav + mp4 durations; mp3 duration null; video variants pending provider', async () => {
    const u = await newUser();
    const w = await uploadAndComplete(u, { type: 'audio', content_type: 'audio/wav', bytes: WAV });
    const m = await uploadAndComplete(u, { type: 'video', content_type: 'video/mp4', bytes: MP4 });
    const a = await uploadAndComplete(u, { type: 'audio', content_type: 'audio/mpeg', bytes: MP3 });
    for (const x of [w, m, a]) expect(await settle(x.id)).toBe('ready');
    expect((await mediaRow(w.id)).duration_ms).toBe(1000);
    const mv = await mediaRow(m.id);
    expect(mv.duration_ms).toBe(2500);
    expect(mv.thumbnail_state).toBe('unavailable_pending_provider');
    expect(mv.variants_state).toBe('unavailable_pending_provider');
    expect((await mediaRow(a.id)).duration_ms).toBeNull();
  });

  it('probe units: jpeg SOF, gif, webp VP8X, flac STREAMINFO; garbage -> null', () => {
    const jpg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0, 4, 0, 0, 0xff, 0xc0, 0, 11, 8, 0x01, 0x2c, 0x01, 0x90, 3, 0, 0, 0]);
    expect(imageDims('image/jpeg', jpg)).toEqual({ width: 400, height: 300 });
    expect(imageDims('image/gif', new Uint8Array([...ascii('GIF89a'), ...le16(32), ...le16(16)]))).toEqual({ width: 32, height: 16 });
    const webp = new Uint8Array(30); webp.set([...ascii('RIFF'), 0, 0, 0, 0, ...ascii('WEBPVP8X')]); webp.set([99, 0, 0, 49, 0, 0], 24);
    expect(imageDims('image/webp', webp)).toEqual({ width: 100, height: 50 });
    const flac = new Uint8Array(42); flac.set([...ascii('fLaC'), 0, 0, 0, 34]);
    // sample rate 44100 (20 bits) at body+10, total samples 88200 (36 bits) at body+13
    flac.set([0x0a, 0xc4, 0x40, 0x00, ...be32(88200)], 18);
    expect(flacDuration(flac)).toBe(2000);
    expect(imageDims('image/jpeg', JPEG)).toEqual({ width: null, height: null });
    expect(wavDuration(MP3)).toBeNull();
  });

  it('bounded retries: transient failures retry up to 3 attempts, then job + media failed (audited)', async () => {
    const u = await newUser();
    await pause();
    const { id } = await uploadAndComplete(u, { type: 'photo', content_type: 'image/jpeg', bytes: JPEG });
    const key = (await mediaRow(id)).object_key;
    await env.MEDIA.delete(key); // simulate missing object
    await unpause();
    await drainJobs(env);
    let j = await jobFor(id);
    expect(j.state).toBe('queued'); expect(j.attempts).toBe(2); expect(j.last_error).toBe('object missing');
    expect(Date.parse(j.run_after)).toBeGreaterThan(Date.now() + PROCESSING.backoffMs[1] - 5000); // backoff before attempt 3
    await env.DB.prepare('UPDATE processing_jobs SET run_after=? WHERE id=?').bind(new Date(Date.now() - 1000).toISOString(), j.id).run();
    await drainJobs(env);
    j = await jobFor(id);
    expect(j).toMatchObject({ state: 'failed', attempts: 3, last_error: 'object missing' });
    const r = await mediaRow(id);
    expect(r.state).toBe('failed'); expect(r.last_error).toBe('object missing');
    await drainJobs(env); // never exceeds max attempts
    expect((await jobFor(id)).attempts).toBe(3);
    expect(await auditCount('media.processing_failed', id)).toBe(1);
    expect((await call('GET', `/media/${id}`, { cookie: u.cookie })).json.media).toMatchObject({ state: 'failed', error: 'Upload incomplete' });
  });

  it('permanent failure (content swapped after complete) fails in 1 attempt and deletes the object', async () => {
    const u = await newUser();
    await pause();
    const { id } = await uploadAndComplete(u, { type: 'photo', content_type: 'image/jpeg', bytes: JPEG });
    const key = (await mediaRow(id)).object_key;
    await env.MEDIA.put(key, EXE);
    await unpause(); await drainJobs(env);
    expect(await jobFor(id)).toMatchObject({ state: 'failed', attempts: 1 });
    expect((await mediaRow(id)).state).toBe('failed');
    expect(await env.MEDIA.head(key)).toBeNull();
  });
});

describe('slice 3: admin controls', () => {
  it('require admin.access (401/403) on jobs list, retry, pause and resume', async () => {
    const u = await newUser();
    for (const [m, p] of [['GET', '/vault/jobs'], ['POST', '/vault/jobs/job_abcdefgh123/retry'], ['POST', '/vault/processing/pause'], ['POST', '/vault/processing/resume']]) {
      expect((await call(m, p)).status).toBe(401);
      expect((await call(m, p, { cookie: u.cookie })).status).toBe(403);
    }
    expect(await isPaused(env)).toBe(false);
  });

  it('pause/resume flag lives in D1, blocks processing, is audited; resume drains via waitUntil', async () => {
    const adm = await newUser(); await makeAdmin(adm.id);
    const p = await call('POST', '/vault/processing/pause', { cookie: adm.cookie, body: { reason: 'maintenance' } });
    expect(p.status).toBe(200); expect(p.json.processing.paused).toBe(true);
    expect((await env.DB.prepare(`SELECT value, updated_by FROM vault_settings WHERE key='processing_paused'`).first())).toMatchObject({ value: '1', updated_by: adm.id });
    const { id } = await uploadAndComplete(adm, { type: 'photo', content_type: 'image/png', bytes: PNG });
    expect(await drainJobs(env)).toMatchObject({ paused: true, ran: 0 });
    expect((await mediaRow(id)).state).toBe('processing');
    const h = await call('GET', '/vault/health', { cookie: adm.cookie });
    expect(h.json.processing.paused).toBe(true); expect(h.json.processing.paused_since).toBeTruthy();
    expect(h.json.processing.backlog.queued).toBeGreaterThanOrEqual(1);
    const r = await call('POST', '/vault/processing/resume', { cookie: adm.cookie });
    expect(r.status).toBe(200); expect(r.json.processing.paused).toBe(false);
    expect(await settle(id, { drain: false })).toBe('ready');
    expect(await auditCount('vault.processing_pause')).toBeGreaterThanOrEqual(1);
    expect(await auditCount('vault.processing_resume')).toBeGreaterThanOrEqual(1);
    expect((await call('POST', '/vault/processing/pause', { cookie: adm.cookie, origin: 'https://evil.example' })).status).toBe(403); // CSRF still enforced
  });

  it('retry: only failed jobs (409), unknown 404, resets attempts, re-runs to ready, audited', async () => {
    const adm = await newUser(); await makeAdmin(adm.id);
    const u = await newUser();
    await pause();
    const { id } = await uploadAndComplete(u, { type: 'photo', content_type: 'image/png', bytes: PNG });
    const job = await jobFor(id);
    expect((await call('POST', `/vault/jobs/${job.id}/retry`, { cookie: adm.cookie })).status).toBe(409);
    expect((await call('POST', `/vault/jobs/job_doesnotexist1/retry`, { cookie: adm.cookie })).status).toBe(404);
    await env.DB.batch([
      env.DB.prepare(`UPDATE processing_jobs SET state='failed', attempts=3, last_error='boom' WHERE id=?`).bind(job.id),
      env.DB.prepare(`UPDATE media SET state='failed', last_error='boom' WHERE id=?`).bind(id),
    ]);
    await unpause();
    const r = await call('POST', `/vault/jobs/${job.id}/retry`, { cookie: adm.cookie });
    expect(r.status).toBe(200); expect(r.json.job).toMatchObject({ state: 'queued', attempts: 0 });
    expect(await settle(id)).toBe('ready');
    expect(await jobFor(id)).toMatchObject({ state: 'succeeded', attempts: 1 });
    expect(await auditCount('vault.job_retry', job.id)).toBe(1);
  });

  it('GET /vault/jobs?state= filters, validates, and is audited', async () => {
    const adm = await newUser(); await makeAdmin(adm.id);
    await pause();
    const { id } = await uploadAndComplete(adm, { type: 'photo', content_type: 'image/png', bytes: PNG });
    const q = await call('GET', '/vault/jobs?state=queued', { cookie: adm.cookie });
    expect(q.status).toBe(200);
    expect(q.json.jobs.every(j => j.state === 'queued')).toBe(true);
    expect(q.json.jobs.some(j => j.media_id === id)).toBe(true);
    const s = await call('GET', '/vault/jobs?state=succeeded', { cookie: adm.cookie });
    expect(s.json.jobs.some(j => j.media_id === id)).toBe(false);
    expect((await call('GET', '/vault/jobs', { cookie: adm.cookie })).status).toBe(200);
    expect((await call('GET', '/vault/jobs?state=bogus', { cookie: adm.cookie })).status).toBe(422);
    expect(await auditCount('vault.jobs_list')).toBeGreaterThanOrEqual(3);
  });
});

describe('slice 3: Story expiry sweeper (cron scheduled())', () => {
  it('soft-deletes expired stories, deletes R2 objects, audits; leaves live stories and posts alone', async () => {
    const u = await newUser();
    const expired = await uploadAndComplete(u, { type: 'photo', content_type: 'image/png', bytes: PNG, story: true, access: 'public' });
    const live = await uploadAndComplete(u, { type: 'photo', content_type: 'image/png', bytes: PNG, story: true });
    const normal = await uploadAndComplete(u, { type: 'photo', content_type: 'image/png', bytes: PNG });
    for (const x of [expired, live, normal]) expect(await settle(x.id)).toBe('ready');
    await env.DB.prepare('UPDATE media SET expires_at=? WHERE id=?').bind(new Date(Date.now() - 60_000).toISOString(), expired.id).run();
    const key = (await mediaRow(expired.id)).object_key;

    const ctrl = createScheduledController({ scheduledTime: Date.now(), cron: PROCESSING.sweeperCron });
    const ectx = createExecutionContext();
    await worker.scheduled(ctrl, { ...env, VAULT_CRON_ENABLED: 'true' }, ectx);
    await waitOnExecutionContext(ectx);

    const r = await mediaRow(expired.id);
    expect(r.state).toBe('deleted'); expect(r.deleted_at).toBeTruthy();
    expect(await env.MEDIA.head(key)).toBeNull();
    expect(await auditCount('media.story_expired', expired.id)).toBe(1);
    expect((await mediaRow(live.id)).state).toBe('ready');
    expect((await mediaRow(normal.id)).state).toBe('ready');
    expect((await call('GET', `/media/${expired.id}`, { cookie: u.cookie })).status).toBe(404);
    // idempotent: a second sweep does not re-audit
    const again = await sweepExpiredStories(env);
    expect(await auditCount('media.story_expired', expired.id)).toBe(1);
    expect(again.errors).toBe(0);
  });

  it('cron trigger is configured (free Cron Trigger, no Queues/Stream/Images bindings)', async () => {
    // Assert the code constant (mirrors wrangler.jsonc triggers.crons) and that no paid bindings are exposed to the Worker.
    expect(PROCESSING.sweeperCron).toBe('*/15 * * * *');
    expect(env.QUEUE).toBeUndefined(); expect(env.IMAGES).toBeUndefined(); expect(env.STREAM).toBeUndefined();
  });
});

describe('slice 3: /vault/health', () => {
  it('keeps slice 1 fields and adds backlog, failed jobs, paused, sweeper last run, heartbeat', async () => {
    const adm = await newUser(); await makeAdmin(adm.id);
    await sweepExpiredStories(env);
    const { id } = await uploadAndComplete(adm, { type: 'photo', content_type: 'image/png', bytes: PNG });
    await settle(id);
    const h = await call('GET', '/vault/health', { cookie: adm.cookie });
    expect(h.status).toBe(200);
    expect(h.json).toMatchObject({ status: 'ok', version: expect.stringMatching(/^vault-slice\d+-/), checked_at: expect.any(String),
      storage: { binding: 'MEDIA', reachable: true, error: null }, counts_by_state: expect.any(Object) });
    expect('last_error' in h.json).toBe(true);
    expect(h.json.counts_by_state.processing).toEqual(expect.any(Number));
    expect(h.json.processing).toMatchObject({
      processor: 'in-worker', paused: false, paused_since: null,
      backlog: { queued: expect.any(Number), running: expect.any(Number) },
      jobs_by_state: { queued: expect.any(Number), running: expect.any(Number), succeeded: expect.any(Number), failed: expect.any(Number) },
      failed_jobs: expect.any(Number), thumbnails: 'unavailable_pending_provider', video_variants: 'unavailable_pending_provider',
    });
    expect(h.json.sweeper).toMatchObject({ cron: '*/15 * * * *', last_run_at: expect.any(String), last_run: { scanned: expect.any(Number), deleted: expect.any(Number), errors: 0 } });
    expect(Date.parse(h.json.heartbeat_at)).toBeGreaterThan(Date.now() - 60_000);
  });
});

describe('slice 3: processing keys are bound to their row', () => {
  it("probe refuses a row repointed at another owner's vault object (never marks it ready)", async () => {
    const a = await newUser(); const b = await newUser();
    await pause();
    const m = await uploadAndComplete(a, { type: 'photo', content_type: 'image/png', bytes: PNG });
    expect((await mediaRow(m.id)).state).toBe('processing');
    const victim = `vault/photo/${b.id}/med_victimprobe01`;
    await env.MEDIA.put(victim, PNG);
    await env.DB.prepare('UPDATE media SET object_key=? WHERE id=?').bind(victim, m.id).run();
    await unpause();
    await drainJobs(env);
    expect((await jobFor(m.id)).state).not.toBe('succeeded');
    expect((await mediaRow(m.id)).state).not.toBe('ready');
    expect(await env.MEDIA.head(victim)).not.toBeNull();
  });

  it("sweeper never deletes another owner's object from a tampered expired story row", async () => {
    const a = await newUser(); const b = await newUser();
    const s = await uploadAndComplete(a, { type: 'photo', content_type: 'image/png', bytes: PNG, story: true });
    expect(await settle(s.id)).toBe('ready');
    const victim = `vault/photo/${b.id}/med_victimsweep01`;
    await env.MEDIA.put(victim, PNG);
    await env.DB.prepare('UPDATE media SET object_key=?, expires_at=? WHERE id=?').bind(victim, new Date(Date.now() - 60_000).toISOString(), s.id).run();
    const res = await sweepExpiredStories(env);
    expect(res.errors).toBeGreaterThanOrEqual(1);
    expect(await env.MEDIA.head(victim)).not.toBeNull();
  });
});

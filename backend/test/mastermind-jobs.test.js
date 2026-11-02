import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { call, newUser, makeAdmin, staff, grantRole } from './helpers.js';
import { enqueue, claim, complete, fail, runJob, backoffSec, jobsPanel, cleanCode } from '../src/jobs.js';
import { runScheduled, dbCheckKey, DB_CHECK_KIND } from '../src/heartbeat.js';
import opsSource from '../src/ops.js?raw';

const T = Date.parse('2026-11-02T16:00:00.000Z');
const clear = () => env.DB.prepare(`DELETE FROM jobs`).run();
const get = (id) => env.DB.prepare(`SELECT * FROM jobs WHERE id=?`).bind(id).first();
const count = async () => (await env.DB.prepare(`SELECT COUNT(*) AS n FROM jobs`).first()).n;
async function owner() { const u = await newUser(); await env.DB.prepare(`DELETE FROM user_roles WHERE role='owner'`).run(); await grantRole(u.id, 'owner'); return u; }

describe('job library', () => {
  it('enqueue is idempotent by key', async () => {
    await clear();
    const a = await enqueue(env, { kind: 'k', key: 'same', now: T });
    const b = await enqueue(env, { kind: 'k', key: 'same', now: T + 1000 });
    expect(b.id).toBe(a.id); expect(await count()).toBe(1);
  });
  it('scheduled(): one job per 5-minute window; duplicate delivery does not re-run', async () => {
    await clear();
    expect(dbCheckKey(T)).toBe(dbCheckKey(T + 299_000)); expect(dbCheckKey(T)).not.toBe(dbCheckKey(T + 300_000));
    const r1 = await runScheduled(env, () => T + 10_000);
    const r2 = await runScheduled(env, () => T + 20_000);
    expect(r1.ran).toBe(1); expect(r2.ran).toBe(0);
    const j = await env.DB.prepare(`SELECT * FROM jobs WHERE idempotency_key=?`).bind(dbCheckKey(T)).first();
    expect(j).toMatchObject({ kind: DB_CHECK_KIND, state: 'succeeded', attempts: 1 });
    await runScheduled(env, () => T + 310_000);
    expect(await count()).toBe(2);
  });
  it('claim only takes due jobs, once', async () => {
    await clear();
    const j = await enqueue(env, { kind: 'k', key: 'c', now: T });
    expect(await claim(env, j.id, T - 1)).toBeNull();
    expect((await claim(env, j.id, T)).attempts).toBe(1);
    expect(await claim(env, j.id, T)).toBeNull(); // already running
  });
  it('fail uses exponential backoff, then dead after max_attempts', async () => {
    await clear();
    expect([1, 2, 3, 10].map(backoffSec)).toEqual([60, 120, 240, 3600]);
    const j = await enqueue(env, { kind: 'k', key: 'b', maxAttempts: 3, now: T });
    let now = T;
    for (const [attempt, expectState] of [[1, 'failed'], [2, 'failed'], [3, 'dead']]) {
      expect(await runJob(env, j.id, async () => 'db_query_failed', () => now)).toBe(expectState);
      const row = await get(j.id);
      expect(row.attempts).toBe(attempt);
      if (expectState === 'failed') {
        expect(Date.parse(row.next_run_at) - now).toBe(backoffSec(attempt) * 1000);
        expect(await claim(env, j.id, now + backoffSec(attempt) * 1000 - 1)).toBeNull(); // not due yet
        now += backoffSec(attempt) * 1000;
      }
    }
    expect(await claim(env, j.id, now + 1e9)).toBeNull(); // dead is never retried automatically
  });
  it('a handler that throws counts as a failure; success clears the error', async () => {
    await clear();
    const j = await enqueue(env, { kind: 'k', key: 't', now: T });
    expect(await runJob(env, j.id, async () => { throw new Error('jane@example.com'); }, () => T)).toBe('failed');
    expect((await get(j.id)).last_error_code).toBe('handler_threw');
    expect(await runJob(env, j.id, async () => null, () => T + 60_000)).toBe('succeeded');
    expect((await get(j.id)).last_error_code).toBeNull();
  });
  it('error codes are sanitized (no PII)', () => {
    expect(cleanCode('db_query_failed')).toBe('db_query_failed');
    expect(cleanCode('User Jane jane@example.com failed')).toBe('job_failed');
    expect(cleanCode('x'.repeat(65))).toBe('job_failed');
  });
});

describe('jobs panel', () => {
  it('no records => unknown', async () => { await clear(); expect((await jobsPanel(env, T)).status).toBe('unknown'); });
  it('succeeded only => healthy; dead>0 => degraded with view-only entries', async () => {
    await clear();
    const a = await enqueue(env, { kind: 'k', key: 'ok', now: T }); await runJob(env, a.id, async () => null, () => T);
    expect((await jobsPanel(env, T)).status).toBe('healthy');
    const d = await enqueue(env, { kind: 'k', key: 'dead', maxAttempts: 1, now: T });
    await runJob(env, d.id, async () => 'db_query_failed', () => T);
    const p = await jobsPanel(env, T);
    expect(p.status).toBe('degraded'); expect(p.detail.counts.dead).toBe(1); expect(p.detail.review).toBe('view-only');
    expect(p.detail.recentFailures[0]).toEqual({ kind: 'k', state: 'dead', attempts: 1, error_code: 'db_query_failed', at: new Date(T).toISOString() });
  });
  it('queued backlog older than 30 min => stale', async () => {
    await clear();
    await enqueue(env, { kind: 'k', key: 'old', now: T - 31 * 60_000 });
    const p = await jobsPanel(env, T);
    expect(p.status).toBe('stale'); expect(p.detail.oldestQueuedAgeSec).toBe(31 * 60);
    expect((await jobsPanel(env, T - 2 * 60_000)).status).toBe('healthy');
  });
});

describe('jobs panel via /admin/ops/summary', () => {
  it('owner sees it; the summary writes nothing; no PII or keys/ids', async () => {
    await clear(); const o = await owner();
    const d = await enqueue(env, { kind: 'k', key: 'pii-check', maxAttempts: 1 });
    await runJob(env, d.id, async () => 'some user@example.com', () => Date.now());
    const before = await count();
    const snap = JSON.stringify((await env.DB.prepare(`SELECT * FROM jobs ORDER BY id`).all()).results);
    const r = await call('GET', '/admin/ops/summary', { cookie: o.cookie });
    expect(r.status).toBe(200);
    expect(await count()).toBe(before);
    expect(JSON.stringify((await env.DB.prepare(`SELECT * FROM jobs ORDER BY id`).all()).results)).toBe(snap);
    const s = JSON.stringify(r.json.panels.jobs);
    expect(r.json.panels.jobs.status).toBe('degraded');
    for (const bad of ['example.com', d.id, 'pii-check', 'idempotency_key']) expect(s).not.toContain(bad);
    expect(opsSource).not.toMatch(/\b(INSERT|UPDATE|DELETE|REPLACE)\b/);
  });
  it('non-owners get 403; anonymous 401', async () => {
    const admin = await newUser(); await makeAdmin(admin.id);
    for (const u of [admin, await staff('moderator'), await staff('support_agent'), await staff('dmca'), await newUser()])
      expect((await call('GET', '/admin/ops/summary', { cookie: u.cookie })).status).toBe(403);
    expect((await call('GET', '/admin/ops/summary')).status).toBe(401);
  });
});

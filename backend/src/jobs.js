/**
 * PIKK Master Mind phase 2 (slice 2): internal durable job library.
 * enqueue (idempotent by key) -> claim -> complete | fail (bounded retries, exponential backoff, dead after max_attempts).
 * 'failed' = attempt failed, retry scheduled at next_run_at. 'dead' = gave up. Failed-job review is view-only (no controls).
 */
import { newId } from './crypto.js';

export const BACKOFF_BASE_SEC = 60;
export const BACKOFF_MAX_SEC = 3600;
const CODE = /^[a-z0-9_.:-]{1,64}$/;
export const cleanCode = (c) => (CODE.test(String(c)) ? String(c) : 'job_failed');
export const backoffSec = (attempts) => Math.min(BACKOFF_MAX_SEC, BACKOFF_BASE_SEC * 2 ** Math.max(0, attempts - 1));
const iso = (ms) => new Date(ms).toISOString();

export async function enqueue(env, { kind, key, maxAttempts = 3, now = Date.now() }) {
  const t = iso(now);
  await env.DB.prepare(`INSERT INTO jobs(id,kind,idempotency_key,state,attempts,max_attempts,next_run_at,created_at,updated_at)
      VALUES (?,?,?,'queued',0,?,?,?,?) ON CONFLICT(idempotency_key) DO NOTHING`)
    .bind(newId('job'), kind, key, maxAttempts, t, t, t).run();
  return env.DB.prepare(`SELECT * FROM jobs WHERE idempotency_key = ?`).bind(key).first();
}

/** Atomically moves a due queued/failed job to running and counts the attempt. Returns the row or null. */
export async function claim(env, id, now = Date.now()) {
  return env.DB.prepare(`UPDATE jobs SET state='running', attempts=attempts+1, updated_at=?1
      WHERE id=?2 AND state IN ('queued','failed') AND next_run_at <= ?1 RETURNING *`).bind(iso(now), id).first();
}

/**
 * Claim token: the row returned by claim() — {attempts, updated_at, max_attempts}. A transition out of 'running'
 * only applies while the job is still in exactly that claim (same attempt number and claim time), so a late
 * complete/fail from a worker whose lease was reclaimed (or a second reclaimer) is a no-op.
 */
const validToken = (t) => t && typeof t === 'object' && Number.isInteger(t.attempts) && typeof t.updated_at === 'string' && Number.isInteger(t.max_attempts);

/** Returns true only if this call moved the job running -> succeeded. */
export async function complete(env, id, token, now = Date.now()) {
  if (!validToken(token)) return false;
  const r = await env.DB.prepare(`UPDATE jobs SET state='succeeded', last_error_code=NULL, updated_at=?1
      WHERE id=?2 AND state='running' AND attempts=?3 AND updated_at=?4 RETURNING id`)
    .bind(iso(now), id, token.attempts, token.updated_at).first();
  return !!r;
}

/** Single guarded UPDATE. Returns 'failed' | 'dead' if this call made the transition, else null. */
export async function fail(env, id, token, code, now = Date.now(), { cutoff = null } = {}) {
  if (!validToken(token)) return null;
  const dead = token.attempts >= token.max_attempts;
  const next = dead ? iso(now) : iso(now + backoffSec(token.attempts) * 1000);
  const r = await env.DB.prepare(`UPDATE jobs SET state=?1, last_error_code=?2, next_run_at=?3, updated_at=?4
      WHERE id=?5 AND state='running' AND attempts=?6 AND updated_at=?7 AND (?8 IS NULL OR updated_at <= ?8) RETURNING state`)
    .bind(dead ? 'dead' : 'failed', cleanCode(code), next, iso(now), id, token.attempts, token.updated_at, cutoff).first();
  return r ? r.state : null;
}

/** Lease: a job's claim time is its updated_at while state='running' (set by claim; only a guarded complete/fail
 *  changes a running job). A job running longer than LEASE_SEC is assumed crashed. */
export const LEASE_SEC = 600;

/** Reclaims expired leases as failed attempts ('lease_expired', normal backoff / dead-after-max). Each reclaim is one
 *  guarded UPDATE (state='running' AND same claim AND updated_at <= cutoff); only rows this call changed are returned. */
export async function reclaimExpired(env, now = Date.now(), leaseSec = LEASE_SEC) {
  const cutoff = iso(now - leaseSec * 1000);
  const stuck = (await env.DB.prepare(`SELECT id, attempts, max_attempts, updated_at FROM jobs WHERE state='running' AND updated_at <= ? ORDER BY updated_at LIMIT 50`)
    .bind(cutoff).all()).results;
  const out = [];
  for (const row of stuck) {
    const r = await fail(env, row.id, row, 'lease_expired', now, { cutoff });
    if (r) out.push(r);
  }
  return out;
}

/** Due jobs of a kind (current + scheduled retries), bounded. */
export async function dueJobs(env, kind, now = Date.now(), limit = 5) {
  return (await env.DB.prepare(`SELECT id FROM jobs WHERE kind=? AND state IN ('queued','failed') AND next_run_at <= ? ORDER BY next_run_at LIMIT ?`)
    .bind(kind, iso(now), limit).all()).results;
}

/** Run one claimed job with a handler returning null (ok) or an error code. Never throws. */
export async function runJob(env, id, handler, now = () => Date.now()) {
  const j = await claim(env, id, now());
  if (!j) return 'skipped';
  let err;
  try { err = await handler(j); } catch { err = 'handler_threw'; }
  if (err) return (await fail(env, id, j, err, now())) ?? 'lost_lease';
  return (await complete(env, id, j, now())) ? 'succeeded' : 'lost_lease';
}

export const STALE_BACKLOG_SEC = 1800;
const STATES = ['queued', 'running', 'succeeded', 'failed', 'dead'];

/** Read-only jobs panel. no records => unknown; dead>0 => degraded; oldest queued > 30 min => stale; else healthy. */
export async function jobsPanel(env, now = Date.now()) {
  const counts = Object.fromEntries(STATES.map(s => [s, 0]));
  for (const r of (await env.DB.prepare(`SELECT state, COUNT(*) AS n FROM jobs GROUP BY state`).all()).results) counts[r.state] = Number(r.n);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const oldest = await env.DB.prepare(`SELECT MIN(created_at) AS t FROM jobs WHERE state IN ('queued','failed')`).first();
  const oldestQueuedAgeSec = oldest?.t ? Math.max(0, Math.round((now - Date.parse(oldest.t)) / 1000)) : null;
  const recentFailures = (await env.DB.prepare(`SELECT kind, state, attempts, last_error_code, updated_at FROM jobs
      WHERE state IN ('failed','dead') ORDER BY updated_at DESC LIMIT 20`).all()).results
    .map(r => ({ kind: r.kind, state: r.state, attempts: r.attempts, error_code: r.last_error_code, at: r.updated_at }));
  const latest = await env.DB.prepare(`SELECT MAX(updated_at) AS t FROM jobs`).first();
  const stuckRunning = Number((await env.DB.prepare(`SELECT COUNT(*) AS n FROM jobs WHERE state='running' AND updated_at <= ?`)
    .bind(new Date(now - LEASE_SEC * 1000).toISOString()).first()).n);
  let status = 'healthy';
  if (!total) status = 'unknown';
  else if (counts.dead > 0 || stuckRunning > 0) status = 'degraded';
  else if (oldestQueuedAgeSec !== null && oldestQueuedAgeSec > STALE_BACKLOG_SEC) status = 'stale';
  return { status, checkedAt: latest?.t ?? null, source: 'D1 jobs (read-only)', freshnessLimitSec: STALE_BACKLOG_SEC,
    detail: { counts, stuckRunning, leaseSec: LEASE_SEC, oldestQueuedAgeSec, recentFailures, review: 'view-only' } };
}

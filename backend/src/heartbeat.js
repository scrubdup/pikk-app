import { enqueue, dueJobs, runJob, reclaimExpired } from './jobs.js';
/**
 * PIKK Master Mind phase 2 (slice 1): durable worker heartbeats.
 * The scheduled() handler records its own heartbeat after running read-only checks.
 * Heartbeat writes happen ONLY in the cron path; GET /admin/ops/summary only reads them.
 */
export const CRON_WORKER = 'pikk-api-cron';
/** Known workers and their expected interval. A worker with no row is "unknown" (never ran / not deployed). */
export const WORKER_REGISTRY = Object.freeze({
  [CRON_WORKER]: { intervalSec: 300, description: 'pikk-api scheduled self-check (cron trigger not enabled until owner deploys)' },
});
// Age thresholds as multiples of the expected interval.
export const STALE_AFTER = 2; // > 2 missed intervals => stale
export const DOWN_AFTER = 6;  // > 6 missed intervals => down

const ERROR_CODE = /^[a-z0-9_.:-]{1,64}$/;

export async function recordHeartbeat(env, worker, { status, durationMs = 0, error = null, at = new Date().toISOString() }) {
  if (!WORKER_REGISTRY[worker]) throw new Error(`unregistered worker ${worker}`);
  if (!['ok', 'error'].includes(status)) throw new Error('bad heartbeat status');
  const code = status === 'error' ? (ERROR_CODE.test(String(error)) ? String(error) : 'check_failed') : null;
  await env.DB.prepare(`INSERT INTO worker_heartbeats(worker,last_beat_at,last_status,last_duration_ms,last_error,last_ok_at,run_count)
      VALUES (?1,?2,?3,?4,?5,CASE WHEN ?3='ok' THEN ?2 END,1)
      ON CONFLICT(worker) DO UPDATE SET last_beat_at=?2, last_status=?3, last_duration_ms=?4, last_error=?5,
        last_ok_at=CASE WHEN ?3='ok' THEN ?2 ELSE last_ok_at END, run_count=run_count+1`)
    .bind(worker, at, status, Math.max(0, Math.round(durationMs)), code).run();
}

/** Read-only checks the cron runs (same as the ops summary's DB check). Returns an error code or null. */
export async function runChecks(env) {
  try {
    const r = await env.DB.prepare('SELECT 1 AS ok').first();
    return r && r.ok === 1 ? null : 'db_unexpected_result';
  } catch { return 'db_query_failed'; }
}

export const DB_CHECK_KIND = 'db-check';
export const WINDOW_MS = 5 * 60 * 1000;
/** Deterministic per-5-minute-window key: duplicate cron deliveries in one window share one job record. */
export const dbCheckKey = (nowMs) => `${DB_CHECK_KIND}:${new Date(Math.floor(nowMs / WINDOW_MS) * WINDOW_MS).toISOString()}`;

export async function runScheduled(env, now = () => Date.now()) {
  const t0 = now();
  await reclaimExpired(env, t0); // crashed workers: expired leases become failed attempts before new claims
  await enqueue(env, { kind: DB_CHECK_KIND, key: dbCheckKey(t0), maxAttempts: 3, now: t0 });
  let err = null; let ran = 0;
  for (const { id } of await dueJobs(env, DB_CHECK_KIND, t0)) {
    let jobErr = null;
    const r = await runJob(env, id, async () => (jobErr = await runChecks(env)), now);
    if (r !== 'skipped') { ran++; if (jobErr) err = jobErr; }
  }
  await recordHeartbeat(env, CRON_WORKER, { status: err ? 'error' : 'ok', durationMs: now() - t0, error: err, at: new Date(now()).toISOString() });
  return { ok: !err, error: err, ran };
}

/** Maps a heartbeat row to a panel-style entry. missing => unknown; fresh => healthy (degraded if last run errored);
 *  older than STALE_AFTER intervals => stale; older than DOWN_AFTER intervals => down. */
export function heartbeatStatus(row, intervalSec, now = Date.now()) {
  if (!row || !row.last_beat_at || Number.isNaN(Date.parse(row.last_beat_at))) return { status: 'unknown', ageSec: null };
  const ageSec = Math.max(0, Math.round((now - Date.parse(row.last_beat_at)) / 1000));
  if (ageSec > intervalSec * DOWN_AFTER) return { status: 'down', ageSec };
  if (ageSec > intervalSec * STALE_AFTER) return { status: 'stale', ageSec };
  return { status: row.last_status === 'ok' ? 'healthy' : 'degraded', ageSec };
}

const RANK = { down: 5, degraded: 4, stale: 3, unknown: 2, healthy: 1 };
export async function workersPanel(env, now = Date.now()) {
  const rows = (await env.DB.prepare(`SELECT worker,last_beat_at,last_status,last_duration_ms,last_error,last_ok_at,run_count FROM worker_heartbeats`).all()).results;
  const byName = Object.fromEntries(rows.map(r => [r.worker, r]));
  const workers = Object.entries(WORKER_REGISTRY).map(([name, cfg]) => {
    const r = byName[name]; const s = heartbeatStatus(r, cfg.intervalSec, now);
    return { worker: name, status: s.status, ageSec: s.ageSec, intervalSec: cfg.intervalSec,
      lastBeatAt: r?.last_beat_at ?? null, lastOkAt: r?.last_ok_at ?? null, lastDurationMs: r?.last_duration_ms ?? null,
      lastError: r?.last_error ?? null, runCount: r?.run_count ?? 0 };
  });
  const worst = workers.reduce((a, w) => (RANK[w.status] > RANK[a] ? w.status : a), 'healthy');
  const latest = workers.map(w => w.lastBeatAt).filter(Boolean).sort().pop() ?? null;
  return { status: workers.length ? worst : 'unknown', checkedAt: latest, source: 'D1 worker_heartbeats',
    freshnessLimitSec: Math.min(...Object.values(WORKER_REGISTRY).map(c => c.intervalSec * STALE_AFTER)),
    detail: { workers, thresholds: { staleAfterIntervals: STALE_AFTER, downAfterIntervals: DOWN_AFTER } } };
}

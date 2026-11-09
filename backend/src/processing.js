import { vaultDeleteFor, assertVaultKeyFor, isNoSuchUpload, VaultKeyError } from './vault-keys.js';
import { purgeBackupForMedia } from './backup.js';
// PIKK Vault slice 3: processing pipeline, Story expiry sweeper, admin controls.
// Processor runs in-Worker via ctx.waitUntil behind a pluggable interface so Cloudflare Queues can replace it later
// (owner approval + paid plan required for Queues; not used here).
import { ApiError, json, readJson, clientIp } from './http.js';
import { requirePermission } from './permissions.js';
import { auditStmt, audit } from './audit.js';
import { newId } from './crypto.js';
import { sniff } from './magic.js';
import { probe } from './probe.js';
import { MEDIA_LIMITS, PROCESSING, PENDING_UPLOAD_TTL_HOURS, R2_PENDING_ERR, CANCEL_R2_PENDING_ERR, DELETE_R2_PENDING_ERR } from './media-config.js';

const now = () => new Date().toISOString();
export const JOB_STATES = ['queued', 'running', 'succeeded', 'failed'];

// ---- settings (D1 key/value) ----
export async function getSetting(env, key) {
  const r = await env.DB.prepare(`SELECT value, updated_at FROM vault_settings WHERE key=?`).bind(key).first();
  return r || null;
}
const setStmt = (env, key, value, by = null) => env.DB.prepare(
  `INSERT INTO vault_settings(key,value,updated_at,updated_by) VALUES (?,?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at, updated_by=excluded.updated_by`)
  .bind(key, value, now(), by);
export async function setSetting(env, key, value, by) { await setStmt(env, key, value, by).run(); }
export async function isPaused(env) { return (await getSetting(env, 'processing_paused'))?.value === '1'; }
const heartbeat = (env) => setSetting(env, 'heartbeat_at', now());

// ---- processor interface ----
/** @typedef {{ name: string, enqueue(env, jobId: string, ctx: {waitUntil?: Function}): void }} Processor */
/** In-Worker processor: drains due jobs in the background of the request that created them. */
export const inWorkerProcessor = {
  name: 'in-worker',
  enqueue(env, _jobId, ctx) {
    const p = drainJobs(env).catch((e) => console.error('vault drain failed', e && e.stack || e));
    if (ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(p);
    return p;
  },
};
let processor = inWorkerProcessor;
/** Swap point for a future Queues-backed processor (producer.send(jobId)). */
export function setProcessor(p) { processor = p || inWorkerProcessor; }
export function getProcessor() { return processor; }

/** Called from POST /media/:id/complete. Returns the statement batch to atomically move media -> processing + create job. */
/** CAS: only transition uploaded → processing when still live. Caller must check meta.changes === 1. */
export function enqueueStmts(env, mediaId, { checksum = null, contentType = null } = {}) {
  const id = newId('job'); const t = now();
  // Job row is inserted only if the CAS UPDATE actually moved the media row (EXISTS state=processing).
  return { id, stmts: [
    env.DB.prepare(
      `UPDATE media SET state='processing', checksum_sha256=COALESCE(?, checksum_sha256), detected_content_type=COALESCE(?, detected_content_type), updated_at=?, last_error=NULL
        WHERE id=? AND state='uploaded' AND deleted_at IS NULL`
    ).bind(checksum, contentType, t, mediaId),
    env.DB.prepare(
      `INSERT INTO processing_jobs(id,media_id,job_type,state,attempts,max_attempts,run_after,created_at,updated_at)
       SELECT ?,?,'probe','queued',0,?,?,?,? WHERE EXISTS (
         SELECT 1 FROM media WHERE id=? AND state='processing' AND deleted_at IS NULL
       )`
    ).bind(id, mediaId, PROCESSING.maxAttempts, t, t, t, mediaId),
  ] };
}

class PermanentError extends Error {}

async function runProbe(env, media) {
  if (!env.MEDIA) throw new Error('storage binding MEDIA missing');
  assertVaultKeyFor(media.object_key, media); // key must belong to this row
  const head = await env.MEDIA.get(media.object_key, { range: { offset: 0, length: 64 } });
  if (!head) throw new Error('object missing');
  const found = sniff(new Uint8Array(await head.arrayBuffer()));
  const lim = MEDIA_LIMITS[media.media_type];
  if (!found || found.type !== media.media_type || !lim.contentTypes.includes(found.contentType)) throw new PermanentError('content does not match declared type');
  let meta = { width: null, height: null, duration_ms: null };
  try { meta = await probe(env.MEDIA, media.object_key, found.contentType, media.size_bytes); } catch { /* metadata stays null */ }
  return { contentType: found.contentType, ...meta };
}

/** Claim and run one job. Returns final job state or null if not claimable. */
export async function runJob(env, jobId) {
  const t = now();
  const job = await env.DB.prepare(`UPDATE processing_jobs SET state='running', attempts=attempts+1, started_at=?, updated_at=?
    WHERE id=? AND state='queued' AND attempts < max_attempts RETURNING *`).bind(t, t, jobId).first();
  if (!job) return null;
  const media = await env.DB.prepare(`SELECT * FROM media WHERE id=?`).bind(job.media_id).first();
  try {
    if (!media || media.deleted_at || media.state !== 'processing') throw new PermanentError('media not in processing state');
    const r = await runProbe(env, media);
    const done = now();
    const thumb = 'unavailable_pending_provider';
    const variants = media.media_type === 'video' ? 'unavailable_pending_provider' : 'not_applicable';
    await env.DB.batch([
      env.DB.prepare(`UPDATE media SET state='ready', detected_content_type=?, width=?, height=?, duration_ms=?, thumbnail_state=?, variants_state=?, ready_at=?, updated_at=?, last_error=NULL WHERE id=? AND state='processing'`)
        .bind(r.contentType, r.width, r.height, r.duration_ms, thumb, variants, done, done, media.id),
      env.DB.prepare(`UPDATE processing_jobs SET state='succeeded', last_error=NULL, finished_at=?, updated_at=? WHERE id=?`).bind(done, done, job.id),
      auditStmt(env, { action: 'media.ready', target: media.id, meta: { job: job.id, attempts: job.attempts, sha256: media.checksum_sha256 } }),
    ]);
    return 'succeeded';
  } catch (e) {
    const msg = String(e && e.message || e).slice(0, 300);
    const done = now();
    const final = e instanceof PermanentError || job.attempts >= job.max_attempts;
    if (final) {
      const stmts = [
        env.DB.prepare(`UPDATE processing_jobs SET state='failed', last_error=?, finished_at=?, updated_at=? WHERE id=?`).bind(msg, done, done, job.id),
        auditStmt(env, { action: 'media.processing_failed', target: job.media_id, meta: { job: job.id, attempts: job.attempts, error: msg } }),
      ];
      if (media && !media.deleted_at && media.state === 'processing') {
        stmts.push(env.DB.prepare(`UPDATE media SET state='failed', last_error=?, updated_at=? WHERE id=? AND state='processing'`).bind(msg, done, media.id));
        if (e instanceof PermanentError && media.object_key && env.MEDIA && msg.startsWith('content')) await vaultDeleteFor(env.MEDIA, media.object_key, media);
      }
      await env.DB.batch(stmts);
      return 'failed';
    }
    const delay = PROCESSING.backoffMs[Math.min(job.attempts - 1, PROCESSING.backoffMs.length - 1)];
    await env.DB.prepare(`UPDATE processing_jobs SET state='queued', last_error=?, run_after=?, updated_at=? WHERE id=?`)
      .bind(msg, new Date(Date.now() + delay).toISOString(), done, job.id).run();
    return 'queued';
  }
}

/** Run due queued jobs (bounded). No-op while paused. */
export async function drainJobs(env, { limit = PROCESSING.drainLimit } = {}) {
  if (await isPaused(env)) return { paused: true, ran: 0 };
  let ran = 0;
  for (let i = 0; i < limit; i++) {
    const j = await env.DB.prepare(`SELECT id FROM processing_jobs WHERE state='queued' AND attempts < max_attempts AND run_after <= ? ORDER BY run_after LIMIT 1`).bind(now()).first();
    if (!j) break;
    await runJob(env, j.id); ran++;
    if (await isPaused(env)) break;
  }
  await heartbeat(env);
  return { paused: false, ran };
}

/** Requeue jobs stuck in 'running' (isolate died mid-job). */
async function reclaimStuck(env) {
  const cutoff = new Date(Date.now() - PROCESSING.stuckAfterMs).toISOString();
  const t = now();
  await env.DB.batch([
    env.DB.prepare(`UPDATE processing_jobs SET state='queued', last_error='reclaimed after timeout', updated_at=? WHERE state='running' AND started_at < ? AND attempts < max_attempts`).bind(t, cutoff),
    env.DB.prepare(`UPDATE processing_jobs SET state='failed', last_error='timed out', finished_at=?, updated_at=? WHERE state='running' AND started_at < ? AND attempts >= max_attempts`).bind(t, t, cutoff),
  ]);
}


const R2_DONE_ERR = 'abandoned upload cleanup';
const R2_QUARANTINE_PREFIX = 'cleanup: quarantined:';
const R2_RETRY_MAX = 5;

function parseR2RetryCount(lastError) {
  const m = String(lastError || '').match(/;n=(\d+)\s*$/);
  return m ? Number(m[1]) : 0;
}
function isCancelProvenance(lastError) {
  return /cancel/i.test(String(lastError || ''));
}
function isOwnerDeleteProvenance(lastError) {
  const s = String(lastError || '');
  return /owner delete/i.test(s) || /^deleted by owner/i.test(s);
}
/** Preserve cancel vs owner-delete vs abandoned prefix across retries. */
function r2PendingMarker(lastError, n = 0) {
  let base = R2_PENDING_ERR;
  if (isCancelProvenance(lastError)) base = CANCEL_R2_PENDING_ERR;
  else if (isOwnerDeleteProvenance(lastError)) base = DELETE_R2_PENDING_ERR;
  return n > 0 ? `${base};n=${n}` : base;
}
function r2Quarantine(reason, lastError) {
  let src = '';
  if (isCancelProvenance(lastError)) src = 'cancel: ';
  else if (isOwnerDeleteProvenance(lastError)) src = 'delete: ';
  return `${R2_QUARANTINE_PREFIX}${src}${String(reason || 'permanent').slice(0, 100)}`;
}

async function abortMultipartSafe(env, r) {
  const ses = await env.DB.prepare(`SELECT r2_upload_id, state FROM media_multipart WHERE media_id=?`).bind(r.id).first();
  if (!ses || ses.state !== 'active' || !env.MEDIA) return { aborted: false, session: ses };
  try {
    await env.MEDIA.resumeMultipartUpload(r.object_key, ses.r2_upload_id).abort();
    return { aborted: true, session: ses };
  } catch (e) {
    if (isNoSuchUpload(e)) return { aborted: true, session: ses, gone: true };
    throw e;
  }
}

async function finishAbandonedR2(env, r, t) {
  if (env.MEDIA) await vaultDeleteFor(env.MEDIA, r.object_key, r);
  const mp = await abortMultipartSafe(env, r);
  if (mp.session && mp.session.state === 'active') {
    await env.DB.prepare(`UPDATE media_multipart SET state='aborted', updated_at=? WHERE media_id=? AND state='active'`).bind(t, r.id).run();
  }
  const err = String(r.last_error || '');
  const fromCancel = /cancel/i.test(err);
  const fromOwnerDelete = /owner delete/i.test(err) || /^deleted by owner/i.test(err);
  // Owner-delete retries also purge MEDIA_BACKUP object + media_backups row (same row only).
  if (fromOwnerDelete) await purgeBackupForMedia(env, r);
  let doneErr = R2_DONE_ERR;
  if (fromCancel) doneErr = 'cancelled by owner';
  else if (fromOwnerDelete) doneErr = 'deleted by owner';
  await env.DB.prepare(`UPDATE media SET last_error=? WHERE id=? AND state='deleted'`).bind(doneErr, r.id).run();
  // Cancel / owner-delete already audited at soft-delete time (incl. 202 cleanup_pending).
  // Do not double-audit on successful R2 retry — keep exact 1 owner audit, 0 abandoned.
  if (fromCancel || fromOwnerDelete) return;
  await audit(env, {
    action: 'media.upload_abandoned',
    target: r.id,
    meta: {
      owner: r.owner_id,
      prior_state: r.prior_state || null,
      object_deleted: !!env.MEDIA,
      from_r2_retry: true,
      source: 'abandoned',
    },
  });
}

async function markR2RetryOrQuarantine(env, r, t, err) {
  if (err instanceof VaultKeyError || (err && err.name === 'VaultKeyError')) {
    await env.DB.prepare(`UPDATE media SET last_error=?, updated_at=? WHERE id=? AND state='deleted'`)
      .bind(r2Quarantine('vault key refused', r.last_error), t, r.id).run();
    return 'quarantined';
  }
  const n = parseR2RetryCount(r.last_error) + 1;
  if (n >= R2_RETRY_MAX) {
    await env.DB.prepare(`UPDATE media SET last_error=?, updated_at=? WHERE id=? AND state='deleted'`)
      .bind(r2Quarantine('r2 retries exhausted', r.last_error), t, r.id).run();
    return 'quarantined';
  }
  await env.DB.prepare(`UPDATE media SET last_error=?, updated_at=? WHERE id=? AND state='deleted'`)
    .bind(r2PendingMarker(r.last_error, n), t, r.id).run();
  return 'pending';
}

/**
 * Soft-delete abandoned unfinished uploads. CLAIM (conditional UPDATE) before any R2 delete,
 * so a concurrent complete/put cannot lose a ready object's bytes. R2 failures leave a retryable
 * last_error marker (shared with owner cancel) and are never audited as success.
 * Permanent failures (VaultKeyError / retry cap) quarantine via last_error without new schema.
 */

/** Local/operator quarantine listing (admin tooling / CLI). Not a user-facing API. */
export async function quarantineReport(env, { limit = 100 } = {}) {
  const lim = Math.min(Math.max(1, Number(limit) || 100), 500);
  const rows = (await env.DB.prepare(
    `SELECT id, owner_id, media_type, object_key, last_error, deleted_at, updated_at FROM media
      WHERE state='deleted' AND last_error LIKE 'cleanup: quarantined:%'
      ORDER BY updated_at DESC LIMIT ?`
  ).bind(lim).all()).results;
  const pending = (await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM media WHERE state='deleted' AND last_error LIKE '%r2 delete pending%'`
  ).first()).n;
  return { at: now(), quarantined: rows, quarantined_count: rows.length, r2_pending: pending };
}

export async function cleanupAbandonedUploads(env, { limit = PROCESSING.sweepLimit, nowMs = Date.now() } = {}) {
  const cutoff = new Date(nowMs - PENDING_UPLOAD_TTL_HOURS * 3600e3).toISOString();
  const t = now();
  let deleted = 0; let errors = 0; let retried = 0; let scanned = 0; let quarantined = 0;

  // Cap retry share so permanent/retry backlog cannot starve new claims.
  const retryLimit = Math.min(limit, Math.max(1, Math.floor(limit / 2)));
  // Shared marker with cancel: any last_error containing "r2 delete pending".
  const pendingR2 = (await env.DB.prepare(
    `SELECT id, object_key, owner_id, media_type, last_error FROM media
      WHERE state='deleted' AND deleted_at IS NOT NULL AND last_error LIKE '%r2 delete pending%'
      ORDER BY updated_at ASC LIMIT ?`
  ).bind(retryLimit).all()).results;
  for (const r of pendingR2) {
    scanned++;
    try {
      await finishAbandonedR2(env, r, t);
      deleted++; retried++;
    } catch (e) {
      errors++;
      console.error('abandoned r2 retry failed', r.id, e && e.message);
      const outcome = await markR2RetryOrQuarantine(env, r, t, e).catch(() => 'pending');
      if (outcome === 'quarantined') quarantined++;
    }
  }

  const remain = Math.max(0, limit - scanned);
  const rows = remain === 0 ? [] : (await env.DB.prepare(
    `SELECT id, object_key, owner_id, media_type, state FROM media
      WHERE deleted_at IS NULL AND state IN ('pending_upload','uploaded') AND created_at < ?
      ORDER BY created_at ASC LIMIT ?`
  ).bind(cutoff, remain).all()).results;
  scanned += rows.length;

  for (const r of rows) {
    try {
      // Claim first — never delete R2 for a row that already advanced (ready/processing) or was cancelled.
      const claim = await env.DB.prepare(
        `UPDATE media SET state='deleted', deleted_at=?, last_error=?, updated_at=?
          WHERE id=? AND deleted_at IS NULL AND state IN ('pending_upload','uploaded') AND created_at < ?`
      ).bind(t, R2_PENDING_ERR, t, r.id, cutoff).run();
      if ((claim?.meta?.changes ?? 0) !== 1) continue;

      try {
        await finishAbandonedR2(env, { ...r, prior_state: r.state, last_error: R2_PENDING_ERR }, t);
        deleted++;
      } catch (e) {
        errors++;
        console.error('abandoned r2 cleanup failed', r.id, e && e.message);
        const outcome = await markR2RetryOrQuarantine(env, { ...r, last_error: R2_PENDING_ERR }, t, e);
        if (outcome === 'quarantined') quarantined++;
        // Do NOT mark multipart aborted or write success audit.
      }
    } catch (e) {
      errors++;
      console.error('abandoned upload cleanup failed', r.id, e && e.message);
    }
  }
  return { at: t, scanned, deleted, errors, retried, quarantined, cutoff };
}

// ---- Story expiry sweeper (cron) ----
export async function sweepExpiredStories(env, { limit = PROCESSING.sweepLimit } = {}) {
  const t = now();
  const rows = (await env.DB.prepare(`SELECT id, object_key, owner_id, media_type FROM media WHERE is_story=1 AND deleted_at IS NULL AND expires_at IS NOT NULL AND expires_at <= ? LIMIT ?`).bind(t, limit).all()).results;
  let deleted = 0; let errors = 0;
  for (const r of rows) {
    try {
      if (env.MEDIA) await vaultDeleteFor(env.MEDIA, r.object_key, r);
      await env.DB.batch([
        env.DB.prepare(`UPDATE media SET state='deleted', deleted_at=?, updated_at=? WHERE id=? AND deleted_at IS NULL`).bind(t, t, r.id),
        env.DB.prepare(`UPDATE processing_jobs SET state='failed', last_error='story expired', finished_at=?, updated_at=? WHERE media_id=? AND state IN ('queued','running')`).bind(t, t, r.id),
        auditStmt(env, { action: 'media.story_expired', target: r.id, meta: { owner: r.owner_id, object_deleted: !!env.MEDIA } }),
      ]);
      deleted++;
    } catch (e) { errors++; console.error('sweep failed', r.id, e && e.message); }
  }
  const result = { at: t, scanned: rows.length, deleted, errors };
  await env.DB.batch([setStmt(env, 'sweeper_last_run', JSON.stringify(result)), setStmt(env, 'heartbeat_at', t)]);
  return result;
}

/** Cron entry point: sweep stories, reclaim stuck jobs, drain due jobs (retries with backoff). */
export async function scheduledTick(env) {
  const sweep = await sweepExpiredStories(env);
  const abandoned = await cleanupAbandonedUploads(env);
  await reclaimStuck(env);
  const drain = await drainJobs(env);
  return { sweep, abandoned, drain };
}

// ---- admin controls (admin.access, audited) ----
const jobView = (j) => ({ id: j.id, media_id: j.media_id, type: j.job_type, state: j.state, attempts: j.attempts, max_attempts: j.max_attempts,
  last_error: j.last_error, run_after: j.run_after, created_at: j.created_at, updated_at: j.updated_at, started_at: j.started_at, finished_at: j.finished_at });

async function listJobs(env, req, ctx) {
  const s = requirePermission(ctx, 'admin.access');
  const state = new URL(req.url).searchParams.get('state');
  if (state !== null && !JOB_STATES.includes(state)) throw new ApiError(422, 'validation_failed', 'Invalid input', { state: `one of ${JOB_STATES.join(', ')}` });
  const r = state
    ? await env.DB.prepare(`SELECT * FROM processing_jobs WHERE state=? ORDER BY updated_at DESC LIMIT 100`).bind(state).all()
    : await env.DB.prepare(`SELECT * FROM processing_jobs ORDER BY updated_at DESC LIMIT 100`).all();
  await audit(env, { actor: s.user.id, action: 'vault.jobs_list', ip: clientIp(req), meta: { state } });
  return json(200, { jobs: r.results.map(jobView) });
}

async function retryJob(env, req, ctx, id) {
  const s = requirePermission(ctx, 'admin.access');
  const job = await env.DB.prepare(`SELECT * FROM processing_jobs WHERE id=?`).bind(id).first();
  if (!job) throw new ApiError(404, 'not_found', 'Not found');
  if (job.state !== 'failed') throw new ApiError(409, 'invalid_state', 'Only failed jobs can be retried');
  const media = await env.DB.prepare(`SELECT state, deleted_at FROM media WHERE id=?`).bind(job.media_id).first();
  if (!media || media.deleted_at || !['failed', 'processing'].includes(media.state)) throw new ApiError(409, 'invalid_state', 'Media is not retryable');
  const t = now();
  await env.DB.batch([
    env.DB.prepare(`UPDATE processing_jobs SET state='queued', attempts=0, last_error=NULL, run_after=?, started_at=NULL, finished_at=NULL, updated_at=? WHERE id=? AND state='failed'`).bind(t, t, id),
    env.DB.prepare(`UPDATE media SET state='processing', last_error=NULL, updated_at=? WHERE id=?`).bind(t, job.media_id),
    auditStmt(env, { actor: s.user.id, action: 'vault.job_retry', target: id, ip: clientIp(req), meta: { media_id: job.media_id, previous_error: job.last_error } }),
  ]);
  processor.enqueue(env, id, ctx);
  return json(200, { job: jobView({ ...job, state: 'queued', attempts: 0, last_error: null, run_after: t, updated_at: t, started_at: null, finished_at: null }) });
}

async function setPaused(env, req, ctx, paused) {
  const s = requirePermission(ctx, 'admin.access');
  const ct = req.headers.get('Content-Type');
  const b = ct ? await readJson(req) : {};
  const reason = b.reason === undefined ? null : String(b.reason).slice(0, 500);
  await env.DB.batch([
    setStmt(env, 'processing_paused', paused ? '1' : '0', s.user.id),
    auditStmt(env, { actor: s.user.id, action: paused ? 'vault.processing_pause' : 'vault.processing_resume', ip: clientIp(req), meta: { reason } }),
  ]);
  if (!paused) processor.enqueue(env, null, ctx);
  return json(200, { processing: { paused } });
}

export async function processingRoute(env, req, ctx, m, p) {
  let mm;
  if (m === 'GET' && p === '/vault/jobs') return listJobs(env, req, ctx);
  if (m === 'POST' && (mm = p.match(/^\/vault\/jobs\/(job_[A-Za-z0-9_-]{8,64})\/retry$/))) return retryJob(env, req, ctx, mm[1]);
  if (m === 'POST' && p === '/vault/processing/pause') return setPaused(env, req, ctx, true);
  if (m === 'POST' && p === '/vault/processing/resume') return setPaused(env, req, ctx, false);
  return null;
}

/** Extra /vault/health fields (additive; slice 1/2 fields unchanged). */
export async function processingHealth(env) {
  const counts = (await env.DB.prepare(`SELECT state, COUNT(*) AS n FROM processing_jobs GROUP BY state`).all()).results;
  const by = { queued: 0, running: 0, succeeded: 0, failed: 0 };
  for (const c of counts) by[c.state] = c.n;
  const oldest = await env.DB.prepare(`SELECT MIN(created_at) AS t FROM processing_jobs WHERE state='queued'`).first();
  const lastFail = await env.DB.prepare(`SELECT id, media_id, last_error, updated_at FROM processing_jobs WHERE state='failed' ORDER BY updated_at DESC LIMIT 1`).first();
  const paused = await getSetting(env, 'processing_paused');
  const sweep = await getSetting(env, 'sweeper_last_run');
  const hb = await getSetting(env, 'heartbeat_at');
  let sweepVal = null; try { sweepVal = sweep ? JSON.parse(sweep.value) : null; } catch { /* ignore */ }
  return {
    processing: {
      processor: processor.name,
      paused: paused?.value === '1',
      paused_since: paused?.value === '1' ? paused.updated_at : null,
      backlog: { queued: by.queued, running: by.running, oldest_queued_at: oldest?.t || null },
      jobs_by_state: by,
      failed_jobs: by.failed,
      last_failed_job: lastFail ? { job_id: lastFail.id, media_id: lastFail.media_id, message: lastFail.last_error, at: lastFail.updated_at } : null,
      thumbnails: 'unavailable_pending_provider',
      video_variants: 'unavailable_pending_provider',
    },
    sweeper: { cron: PROCESSING.sweeperCron, last_run_at: sweepVal?.at || null, last_run: sweepVal },
    heartbeat_at: hb?.value || null,
  };
}

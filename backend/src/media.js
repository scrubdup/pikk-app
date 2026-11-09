import { ApiError, json, readJson, clientIp } from './http.js';
import { requireVerified, requireAuth } from './auth.js';
import { requirePermission } from './permissions.js';
import { rateLimit } from './ratelimit.js';
import { auditStmt, audit } from './audit.js';
import { newId, hex } from './crypto.js';
import { contentRoute } from './media-content.js';
import { NOT_BLOCKED_SQL } from './blocks.js';
import { MEDIA_LIMITS, STORY_TTL_HOURS, ACCESS_POLICIES, UPLOAD_RATE, VAULT_VERSION, DELETE_R2_PENDING_ERR } from './media-config.js';
import { sniff } from './magic.js';
import { assertQuota, userUsage, storageRoute, stats } from './storage.js';
import { startMultipart, multipartRoute } from './multipart.js';
import { backupRoute, backupHealth } from './backup.js';
import { VAULT_QUOTA } from './media-config.js';
import { enqueueStmts, getProcessor, processingRoute, processingHealth } from './processing.js';
import { vaultKey, vaultDeleteFor, vaultPutFor, assertVaultKeyFor } from './vault-keys.js';

const ID = '(med_[A-Za-z0-9_-]{8,64})';
const now = () => new Date().toISOString();
const notFound = () => new ApiError(404, 'not_found', 'Not found');

export function sanitizeFilename(name) {
  const base = String(name).split(/[\\/]/).pop().normalize('NFKC')
    .replace(/[\u0000-\u001f\u007f]/g, '').replace(/[^\w.\- ]/g, '_').replace(/\.{2,}/g, '.').replace(/^[.\s]+/, '').trim();
  return base.slice(-120) || 'file';
}

function storage(env) {
  if (!env.MEDIA) throw new ApiError(503, 'vault_storage_not_configured', 'Vault storage not configured');
  return env.MEDIA;
}

async function setState(env, id, state, err = null) {
  await env.DB.prepare(`UPDATE media SET state=?, last_error=?, updated_at=? WHERE id=? AND deleted_at IS NULL`).bind(state, err, now(), id).run();
}

/** Map internal last_error to a safe owner-facing message (no paths/keys/stacks). */
function safeOwnerError(lastError) {
  const msg = String(lastError || '');
  if (/size mismatch/i.test(msg)) return 'Stored size did not match';
  if (/content does not match/i.test(msg)) return 'File type did not match';
  if (/object missing/i.test(msg)) return 'Upload incomplete';
  return 'Processing failed';
}

function view(r) {
  return { id: r.id, type: r.media_type, story: r.is_story === 1, filename: r.filename, content_type: r.detected_content_type || r.declared_content_type,
    size: r.size_bytes, checksum_sha256: r.checksum_sha256, access: r.access_policy, state: r.state, expires_at: r.expires_at,
    created_at: r.created_at, ready_at: r.ready_at,
    width: r.width ?? null, height: r.height ?? null, duration_ms: r.duration_ms ?? null,
    thumbnail: r.thumbnail_state || 'unavailable_pending_provider', variants: r.variants_state || 'unavailable_pending_provider',
    error: r.state === 'failed' ? safeOwnerError(r.last_error) : undefined };
}

async function createUpload(env, req, ctx) {
  const s = requireVerified(ctx);
  storage(env); // fail fast (503) before creating a row when R2 isn't configured
  if (s.status.muted_until) throw new ApiError(403, 'account_muted', 'Account is muted', { until: s.status.muted_until });
  await rateLimit(env, `media:${s.user.id}`, UPLOAD_RATE.limit, UPLOAD_RATE.windowSec);
  const b = await readJson(req);
  const errs = {};
  const lim = MEDIA_LIMITS[b.type];
  if (!lim) errs.type = `one of ${Object.keys(MEDIA_LIMITS).join(', ')}`;
  if (typeof b.filename !== 'string' || !b.filename.trim() || b.filename.length > 255) errs.filename = 'required, max 255 chars';
  if (!Number.isSafeInteger(b.size) || b.size <= 0) errs.size = 'positive integer bytes';
  else if (lim && b.size > lim.maxBytes) throw new ApiError(413, 'payload_too_large', 'File exceeds limit', { max_bytes: lim.maxBytes });
  if (lim && !lim.contentTypes.includes(b.content_type)) errs.content_type = `one of ${lim.contentTypes.join(', ')}`;
  const access = b.access === undefined ? 'private' : b.access;
  if (!ACCESS_POLICIES.includes(access)) errs.access = `one of ${ACCESS_POLICIES.join(', ')}`;
  if (b.story !== undefined && typeof b.story !== 'boolean') errs.story = 'boolean';
  if (b.multipart !== undefined && typeof b.multipart !== 'boolean') errs.multipart = 'boolean';
  if (Object.keys(errs).length) throw new ApiError(422, 'validation_failed', 'Invalid input', errs);
  await assertQuota(env, s.user.id, b.size); // slice 4: 413 quota_exceeded
  const id = newId('med'); const t = now();
  const key = vaultKey(b.type, s.user.id, id);  // server-chosen vault/<type>/<owner>/<id>; client filename never used in key
  const expires = b.story ? new Date(Date.now() + STORY_TTL_HOURS * 3600e3).toISOString() : null;
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO media(id,owner_id,media_type,is_story,object_key,filename,declared_content_type,size_bytes,access_policy,state,expires_at,created_at,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,'pending_upload',?,?,?)`).bind(id, s.user.id, b.type, b.story ? 1 : 0, key, sanitizeFilename(b.filename), b.content_type, b.size, access, expires, t, t),
    auditStmt(env, { actor: s.user.id, action: 'media.upload_created', target: id, ip: clientIp(req), meta: { type: b.type, size: b.size } }),
  ]);
  if (b.multipart) {
    let mp;
    try { mp = await startMultipart(env, { id, owner_id: s.user.id, media_type: b.type }, key, b.size, b.part_size); }
    catch (e) { await env.DB.prepare(`UPDATE media SET state='deleted', deleted_at=?, last_error='multipart init failed', updated_at=? WHERE id=?`).bind(now(), now(), id).run(); throw e; }
    return json(201, { upload: { id, mode: 'multipart', ...mp, cancel_url: `/media/uploads/${id}`, expires_at: expires } });
  }
  return json(201, { upload: { id, mode: 'single', upload_url: `/media/uploads/${id}`, method: 'PUT', max_bytes: b.size, cancel_url: `/media/uploads/${id}`, expires_at: expires } });
}

async function ownedMedia(env, ctx, id) {
  const s = requireVerified(ctx);
  const r = await env.DB.prepare(`SELECT * FROM media WHERE id=? AND owner_id=? AND deleted_at IS NULL`).bind(id, s.user.id).first();
  if (!r) throw notFound(); // never reveal other users' uploads
  assertVaultKeyFor(r.object_key, r); // key must be vault/<media_type>/<owner_id>/<id> of THIS row
  return { s, r };
}

async function putUpload(env, req, ctx, id) {
  const { r } = await ownedMedia(env, ctx, id);
  if (r.state !== 'pending_upload') throw new ApiError(409, 'invalid_state', 'Upload already received');
  const len = Number(req.headers.get('Content-Length'));
  if (!Number.isSafeInteger(len) || len <= 0) throw new ApiError(411, 'length_required', 'Content-Length required');
  if (len !== r.size_bytes) throw new ApiError(len > r.size_bytes ? 413 : 422, len > r.size_bytes ? 'payload_too_large' : 'size_mismatch', 'Body size must equal declared size', { expected: r.size_bytes });
  const obj = await vaultPutFor(storage(env), r.object_key, r, req.body, { httpMetadata: { contentType: 'application/octet-stream' } });
  if (!obj || obj.size !== r.size_bytes) {
    await vaultDeleteFor(storage(env), r.object_key, r);
    await setState(env, id, 'failed', 'stored size mismatch');
    throw new ApiError(422, 'size_mismatch', 'Stored size mismatch');
  }
  const t = now();
  const claimed = await env.DB.prepare(
    `UPDATE media SET state='uploaded', uploaded_at=?, updated_at=? WHERE id=? AND state='pending_upload' AND deleted_at IS NULL`
  ).bind(t, t, id).run();
  if ((claimed?.meta?.changes ?? 0) !== 1) {
    // Lost race with cleanup/cancel — remove orphan object; do not resurrect the row.
    await vaultDeleteFor(storage(env), r.object_key, r);
    throw new ApiError(409, 'invalid_state', 'Upload is no longer accepting data');
  }
  return json(200, { media: { id, state: 'uploaded' } });
}

async function complete(env, req, ctx, id) {
  const { s, r } = await ownedMedia(env, ctx, id);
  if (r.state === 'ready') return json(200, { media: view(r) });
  if (r.state === 'processing') return json(202, { media: view(r) });
  if (r.state !== 'uploaded') throw new ApiError(409, 'invalid_state', 'Upload not received');
  const bucket = storage(env);
  const head = await bucket.get(r.object_key, { range: { offset: 0, length: 64 } });
  if (!head) { await setState(env, id, 'failed', 'object missing'); throw new ApiError(409, 'invalid_state', 'Upload not received'); }
  const bytes = new Uint8Array(await head.arrayBuffer());
  const found = sniff(bytes);
  const lim = MEDIA_LIMITS[r.media_type];
  if (!found || found.type !== r.media_type || !lim.contentTypes.includes(found.contentType)) {
    await vaultDeleteFor(bucket, r.object_key, r);
    await setState(env, id, 'rejected', 'content does not match declared type');
    await audit(env, { actor: s.user.id, action: 'media.rejected', target: id, ip: clientIp(req), meta: { declared: r.declared_content_type, detected: found && found.contentType } });
    throw new ApiError(422, 'content_mismatch', 'File content does not match its declared type');
  }
  const full = await bucket.get(r.object_key);
  const digest = new crypto.DigestStream('SHA-256');
  await full.body.pipeTo(digest);
  const checksum = hex(await digest.digest);
  const t = now();
  const job = enqueueStmts(env, id, { checksum, contentType: found.contentType });
  // CAS first; job INSERT is EXISTS-gated inside enqueueStmts. Audit only if CAS won.
  const results = await env.DB.batch(job.stmts);
  if ((results[0]?.meta?.changes ?? 0) !== 1 || (results[1]?.meta?.changes ?? 0) !== 1) {
    throw new ApiError(409, 'invalid_state', 'Upload is no longer completable');
  }
  await audit(env, { actor: s.user.id, action: 'media.processing', target: id, ip: clientIp(req), meta: { sha256: checksum, job: job.id } });
  getProcessor().enqueue(env, job.id, ctx); // in-Worker: ctx.waitUntil; never blocks the response
  // Not playable until the job marks it ready (content routes require state 'ready').
  return json(202, { media: view({ ...r, state: 'processing', checksum_sha256: checksum, detected_content_type: found.contentType }), job: { id: job.id, state: 'queued' } });
}

/** Slice 1 audience check, shared by GET /media/:id, /content and /access-url. Owner always; others only ready, unexpired, audience. */
export async function canView(env, userId, r) {
  if (r.owner_id === userId) return true;
  if (r.state !== 'ready' || (r.expires_at && r.expires_at <= now())) return false;
  const t = now();
  const ok = await env.DB.prepare(
    `SELECT 1 AS ok FROM media m JOIN users u ON u.id = m.owner_id
      WHERE m.id = ?2 AND u.banned_at IS NULL AND ${NOT_BLOCKED_SQL('m.owner_id')}
        AND ( m.access_policy = 'public'
          OR (m.access_policy = 'followers' AND EXISTS (SELECT 1 FROM follows f WHERE f.follower_id = ?1 AND f.followee_id = m.owner_id))
          OR (m.access_policy = 'entitled' AND EXISTS (SELECT 1 FROM media_entitlements e WHERE e.media_id = m.id AND e.user_id = ?1 AND (e.expires_at IS NULL OR e.expires_at > ?3))) )`)
    .bind(userId, r.id, t).first();
  return !!ok;
}

async function getMedia(env, ctx, id) {
  const s = requireAuth(ctx);
  const r = await env.DB.prepare(`SELECT * FROM media WHERE id=? AND deleted_at IS NULL`).bind(id).first();
  if (!r) throw notFound();
  if (r.owner_id === s.user.id) return json(200, { media: view(r) });
  if (!(await canView(env, s.user.id, r))) throw notFound(); // anyone outside the audience gets 404, not 403
  const { checksum_sha256, ...pub } = view(r);
  return json(200, { media: pub });
}

/** Opaque cursor: base64url("created_at\\nid"). Tie-break on id for identical timestamps. */
function encodeMediaCursor(row) {
  const raw = `${row.created_at}\n${row.id}`;
  const b64 = btoa(raw).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  return b64;
}
function decodeMediaCursor(raw) {
  if (raw == null || raw === '') return null;
  const s = String(raw);
  if (s.length > 256 || /[^A-Za-z0-9_-]/.test(s)) throw new ApiError(400, 'invalid_cursor', 'Invalid cursor');
  let decoded;
  try {
    const pad = '='.repeat((4 - (s.length % 4)) % 4);
    decoded = atob(s.replace(/-/g, '+').replace(/_/g, '/') + pad);
  } catch {
    throw new ApiError(400, 'invalid_cursor', 'Invalid cursor');
  }
  const i = decoded.indexOf('\n');
  if (i <= 0) throw new ApiError(400, 'invalid_cursor', 'Invalid cursor');
  const created_at = decoded.slice(0, i);
  const id = decoded.slice(i + 1);
  if (!/^\d{4}-\d{2}-\d{2}T/.test(created_at) || !/^med_/.test(id)) {
    throw new ApiError(400, 'invalid_cursor', 'Invalid cursor');
  }
  return { created_at, id };
}

async function listMine(env, req, ctx) {
  const s = requireVerified(ctx);
  const url = new URL(req.url);
  let limit = Number(url.searchParams.get('limit') || 50);
  if (!Number.isSafeInteger(limit) || limit < 1) limit = 50;
  if (limit > 100) limit = 100;
  // Ignore foreign owner_id query params — session owner only.
  const cursor = decodeMediaCursor(url.searchParams.get('cursor') || url.searchParams.get('before'));
  let rows;
  if (cursor) {
    rows = (await env.DB.prepare(
      `SELECT * FROM media WHERE owner_id=? AND deleted_at IS NULL
        AND (created_at < ? OR (created_at = ? AND id < ?))
        ORDER BY created_at DESC, id DESC LIMIT ?`
    ).bind(s.user.id, cursor.created_at, cursor.created_at, cursor.id, limit + 1).all()).results;
  } else {
    rows = (await env.DB.prepare(
      `SELECT * FROM media WHERE owner_id=? AND deleted_at IS NULL
        ORDER BY created_at DESC, id DESC LIMIT ?`
    ).bind(s.user.id, limit + 1).all()).results;
  }
  let next_cursor = null;
  if (rows.length > limit) {
    const last = rows[limit - 1];
    rows = rows.slice(0, limit);
    next_cursor = encodeMediaCursor(last);
  }
  return json(200, { media: rows.map(view), count: rows.length, next_cursor });
}

/**
 * Owner-only delete of READY media. Claim (CAS) before R2 delete.
 * Soft-delete succeeds even if R2 fails → 202 cleanup_pending with shared sweeper marker.
 * Unfinished uploads use DELETE /media/uploads/:id (cancel), not this route.
 */
async function deleteReady(env, req, ctx, id) {
  const s = requireVerified(ctx);
  const r = await env.DB.prepare(
    `SELECT * FROM media WHERE id=? AND owner_id=? AND deleted_at IS NULL`
  ).bind(id, s.user.id).first();
  if (!r) throw notFound();
  if (r.state !== 'ready') {
    throw new ApiError(409, 'invalid_state', 'Only ready media can be deleted here; cancel unfinished uploads instead');
  }
  const t = now();
  const claim = await env.DB.prepare(
    `UPDATE media SET state='deleted', deleted_at=?, last_error='deleted by owner', updated_at=?
      WHERE id=? AND owner_id=? AND deleted_at IS NULL AND state='ready'`
  ).bind(t, t, id, s.user.id).run();
  if ((claim?.meta?.changes ?? 0) !== 1) {
    throw new ApiError(409, 'invalid_state', 'Only ready media can be deleted here');
  }
  // Fail in-flight processing jobs if any race left one (ready normally has none).
  await env.DB.prepare(
    `UPDATE processing_jobs SET state='failed', last_error='media deleted', finished_at=?, updated_at=?
      WHERE media_id=? AND state IN ('queued','running')`
  ).bind(t, t, id).run();

  let cleanupPending = false;
  if (env.MEDIA) {
    try { await vaultDeleteFor(env.MEDIA, r.object_key, r); }
    catch (e) {
      await env.DB.prepare(`UPDATE media SET last_error=?, updated_at=? WHERE id=? AND state='deleted'`)
        .bind(DELETE_R2_PENDING_ERR, t, id).run();
      cleanupPending = true;
    }
  }
  await audit(env, {
    actor: s.user.id,
    action: 'media.deleted',
    target: id,
    ip: clientIp(req),
    meta: { prior_state: 'ready', cleanup_pending: cleanupPending, size_bytes: r.size_bytes },
  });
  if (cleanupPending) {
    return json(202, { media: { id, state: 'deleted', deleted: true, cleanup_pending: true } });
  }
  return json(200, { media: { id, state: 'deleted', deleted: true, cleanup_pending: false } });
}

async function usersOverAlert(env) {
  const r = await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM (SELECT m.owner_id, SUM(m.size_bytes) AS b, COALESCE(o.max_bytes, ?1) AS q FROM media m LEFT JOIN vault_quota_overrides o ON o.user_id=m.owner_id
      WHERE m.deleted_at IS NULL AND m.state IN ('pending_upload','uploaded','processing','ready') GROUP BY m.owner_id) WHERE b * 100 >= q * ?2`)
    .bind(VAULT_QUOTA.defaultUserBytes, VAULT_QUOTA.alertThresholdPct).first();
  return r.n;
}

async function health(env, ctx) {
  requirePermission(ctx, 'admin.access');
  let reachable = false; let storageError = null; const configured = !!env.MEDIA;
  try { if (env.MEDIA) { await env.MEDIA.head('__vault_health_probe'); reachable = true; } else storageError = 'vault storage not configured (binding MEDIA missing)'; }
  catch (e) { storageError = 'storage probe failed'; }
  const counts = await env.DB.prepare(`SELECT state, COUNT(*) AS n FROM media GROUP BY state`).all();
  const by = { pending_upload: 0, uploaded: 0, processing: 0, ready: 0, rejected: 0, failed: 0, deleted: 0 };
  for (const c of counts.results) by[c.state] = c.n;
  const last = await env.DB.prepare(`SELECT id, state, last_error, updated_at FROM media WHERE last_error IS NOT NULL ORDER BY updated_at DESC LIMIT 1`).first();
  const quarantined = (await env.DB.prepare(
    `SELECT id, owner_id, state, last_error, updated_at, object_key FROM media
      WHERE state='deleted' AND last_error LIKE 'cleanup: quarantined:%'
      ORDER BY updated_at DESC LIMIT 25`
  ).all()).results;
  const pendingR2 = (await env.DB.prepare(
    `SELECT COUNT(*) AS n FROM media WHERE state='deleted' AND last_error LIKE '%r2 delete pending%'`
  ).first()).n;
  return json(200, {
    status: reachable ? 'ok' : 'degraded',
    version: VAULT_VERSION,
    checked_at: now(),
    storage: { binding: 'MEDIA', configured, reachable, error: storageError },
    counts_by_state: by,
    cleanup: {
      r2_pending: pendingR2,
      quarantined_count: quarantined.length >= 25
        ? (await env.DB.prepare(`SELECT COUNT(*) AS n FROM media WHERE state='deleted' AND last_error LIKE 'cleanup: quarantined:%'`).first()).n
        : quarantined.length,
      quarantined_sample: quarantined.map((q) => ({
        id: q.id, owner_id: q.owner_id, last_error: q.last_error, updated_at: q.updated_at,
        // object_key for operator local tooling only — admin.access required for this route
        object_key: q.object_key,
      })),
    },
    last_error: last ? { media_id: last.id, state: last.state, message: last.last_error, at: last.updated_at } : null,
    ...(await processingHealth(env)), // slice 3, additive
    // slice 4, additive
    backup: await backupHealth(env),
    quotas: { default_user_bytes: VAULT_QUOTA.defaultUserBytes, alert_threshold_pct: VAULT_QUOTA.alertThresholdPct,
      users_over_alert: await usersOverAlert(env) },
    multipart: { active_uploads: (await stats(env)).backlog.active_multipart_uploads },
    thumbnails: 'unavailable_pending_provider',
  });
}

export async function mediaRoute(env, req, ctx, m, p) {
  let mm;
  if (m === 'GET' && p === '/vault/health') return health(env, ctx);
  if (m === 'GET' && p === '/media') return listMine(env, req, ctx);
  if (m === 'DELETE' && (mm = p.match(new RegExp(`^/media/${ID}$`)))) return deleteReady(env, req, ctx, mm[1]);
  if (m === 'POST' && p === '/media/uploads') return createUpload(env, req, ctx);
  if (m === 'PUT' && (mm = p.match(new RegExp(`^/media/uploads/${ID}$`)))) return putUpload(env, req, ctx, mm[1]);
  if (m === 'POST' && (mm = p.match(new RegExp(`^/media/${ID}/complete$`)))) return complete(env, req, ctx, mm[1]);
  if (m === 'GET' && (mm = p.match(new RegExp(`^/media/${ID}$`)))) return getMedia(env, ctx, mm[1]);
  const mp = await multipartRoute(env, req, ctx, m, p, ID);
  if (mp) return mp;
  const st = await storageRoute(env, req, ctx, m, p);
  if (st) return st;
  const bk = await backupRoute(env, req, ctx, m, p);
  if (bk) return bk;
  const j = await processingRoute(env, req, ctx, m, p);
  if (j) return j;
  const c = await contentRoute(env, req, ctx, m, p, ID);
  if (c) return c;
  return null;
}

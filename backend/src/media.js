import { ApiError, json, readJson, clientIp } from './http.js';
import { requireVerified, requireAuth } from './auth.js';
import { requirePermission } from './permissions.js';
import { rateLimit } from './ratelimit.js';
import { auditStmt, audit } from './audit.js';
import { newId, hex } from './crypto.js';
import { NOT_BLOCKED_SQL } from './blocks.js';
import { MEDIA_LIMITS, STORY_TTL_HOURS, ACCESS_POLICIES, UPLOAD_RATE, VAULT_VERSION } from './media-config.js';
import { sniff } from './magic.js';

const ID = '(med_[A-Za-z0-9_-]{8,64})';
const now = () => new Date().toISOString();
const notFound = () => new ApiError(404, 'not_found', 'Not found');

export function sanitizeFilename(name) {
  const base = String(name).split(/[\\/]/).pop().normalize('NFKC')
    .replace(/[\u0000-\u001f\u007f]/g, '').replace(/[^\w.\- ]/g, '_').replace(/\.{2,}/g, '.').replace(/^[.\s]+/, '').trim();
  return base.slice(-120) || 'file';
}

function storage(env) {
  if (!env.MEDIA) throw new ApiError(503, 'storage_unavailable', 'Media storage not configured');
  return env.MEDIA;
}

async function setState(env, id, state, err = null) {
  await env.DB.prepare(`UPDATE media SET state=?, last_error=?, updated_at=? WHERE id=?`).bind(state, err, now(), id).run();
}

function view(r) {
  return { id: r.id, type: r.media_type, story: r.is_story === 1, filename: r.filename, content_type: r.detected_content_type || r.declared_content_type,
    size: r.size_bytes, checksum_sha256: r.checksum_sha256, access: r.access_policy, state: r.state, expires_at: r.expires_at,
    created_at: r.created_at, ready_at: r.ready_at };
}

async function createUpload(env, req, ctx) {
  const s = requireVerified(ctx);
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
  if (Object.keys(errs).length) throw new ApiError(422, 'validation_failed', 'Invalid input', errs);
  const id = newId('med'); const t = now();
  const key = `u/${s.user.id}/${id}`;  // server-chosen key; client filename never used in key
  const expires = b.story ? new Date(Date.now() + STORY_TTL_HOURS * 3600e3).toISOString() : null;
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO media(id,owner_id,media_type,is_story,object_key,filename,declared_content_type,size_bytes,access_policy,state,expires_at,created_at,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,'pending_upload',?,?,?)`).bind(id, s.user.id, b.type, b.story ? 1 : 0, key, sanitizeFilename(b.filename), b.content_type, b.size, access, expires, t, t),
    auditStmt(env, { actor: s.user.id, action: 'media.upload_created', target: id, ip: clientIp(req), meta: { type: b.type, size: b.size } }),
  ]);
  return json(201, { upload: { id, upload_url: `/media/uploads/${id}`, method: 'PUT', max_bytes: b.size, expires_at: expires } });
}

async function ownedMedia(env, ctx, id) {
  const s = requireVerified(ctx);
  const r = await env.DB.prepare(`SELECT * FROM media WHERE id=? AND owner_id=? AND deleted_at IS NULL`).bind(id, s.user.id).first();
  if (!r) throw notFound(); // never reveal other users' uploads
  return { s, r };
}

async function putUpload(env, req, ctx, id) {
  const { r } = await ownedMedia(env, ctx, id);
  if (r.state !== 'pending_upload') throw new ApiError(409, 'invalid_state', 'Upload already received');
  const len = Number(req.headers.get('Content-Length'));
  if (!Number.isSafeInteger(len) || len <= 0) throw new ApiError(411, 'length_required', 'Content-Length required');
  if (len !== r.size_bytes) throw new ApiError(len > r.size_bytes ? 413 : 422, len > r.size_bytes ? 'payload_too_large' : 'size_mismatch', 'Body size must equal declared size', { expected: r.size_bytes });
  const obj = await storage(env).put(r.object_key, req.body, { httpMetadata: { contentType: 'application/octet-stream' } });
  if (!obj || obj.size !== r.size_bytes) {
    await storage(env).delete(r.object_key);
    await setState(env, id, 'failed', 'stored size mismatch');
    throw new ApiError(422, 'size_mismatch', 'Stored size mismatch');
  }
  const t = now();
  await env.DB.prepare(`UPDATE media SET state='uploaded', uploaded_at=?, updated_at=? WHERE id=?`).bind(t, t, id).run();
  return json(200, { media: { id, state: 'uploaded' } });
}

async function complete(env, req, ctx, id) {
  const { s, r } = await ownedMedia(env, ctx, id);
  if (r.state === 'ready') return json(200, { media: view(r) });
  if (r.state !== 'uploaded') throw new ApiError(409, 'invalid_state', 'Upload not received');
  const bucket = storage(env);
  const head = await bucket.get(r.object_key, { range: { offset: 0, length: 64 } });
  if (!head) { await setState(env, id, 'failed', 'object missing'); throw new ApiError(409, 'invalid_state', 'Upload not received'); }
  const bytes = new Uint8Array(await head.arrayBuffer());
  const found = sniff(bytes);
  const lim = MEDIA_LIMITS[r.media_type];
  if (!found || found.type !== r.media_type || !lim.contentTypes.includes(found.contentType)) {
    await bucket.delete(r.object_key);
    await setState(env, id, 'rejected', 'content does not match declared type');
    await audit(env, { actor: s.user.id, action: 'media.rejected', target: id, ip: clientIp(req), meta: { declared: r.declared_content_type, detected: found && found.contentType } });
    throw new ApiError(422, 'content_mismatch', 'File content does not match its declared type');
  }
  const full = await bucket.get(r.object_key);
  const digest = new crypto.DigestStream('SHA-256');
  await full.body.pipeTo(digest);
  const checksum = hex(await digest.digest);
  const t = now();
  await env.DB.batch([
    env.DB.prepare(`UPDATE media SET state='ready', checksum_sha256=?, detected_content_type=?, ready_at=?, updated_at=?, last_error=NULL WHERE id=?`).bind(checksum, found.contentType, t, t, id),
    auditStmt(env, { actor: s.user.id, action: 'media.ready', target: id, ip: clientIp(req), meta: { sha256: checksum } }),
  ]);
  return json(200, { media: view({ ...r, state: 'ready', checksum_sha256: checksum, detected_content_type: found.contentType, ready_at: t }) });
}

async function getMedia(env, ctx, id) {
  const s = requireAuth(ctx);
  const r = await env.DB.prepare(`SELECT * FROM media WHERE id=? AND deleted_at IS NULL`).bind(id).first();
  if (!r) throw notFound();
  if (r.owner_id === s.user.id) return json(200, { media: view(r) });
  if (r.state !== 'ready' || (r.expires_at && r.expires_at <= now())) throw notFound();
  const t = now();
  const ok = await env.DB.prepare(
    `SELECT 1 AS ok FROM media m JOIN users u ON u.id = m.owner_id
      WHERE m.id = ?2 AND u.banned_at IS NULL AND ${NOT_BLOCKED_SQL('m.owner_id')}
        AND ( m.access_policy = 'public'
          OR (m.access_policy = 'followers' AND EXISTS (SELECT 1 FROM follows f WHERE f.follower_id = ?1 AND f.followee_id = m.owner_id))
          OR (m.access_policy = 'entitled' AND EXISTS (SELECT 1 FROM media_entitlements e WHERE e.media_id = m.id AND e.user_id = ?1 AND (e.expires_at IS NULL OR e.expires_at > ?3))) )`)
    .bind(s.user.id, id, t).first();
  if (!ok) throw notFound(); // anyone outside the audience gets 404, not 403
  const { checksum_sha256, ...pub } = view(r);
  return json(200, { media: pub });
}

async function health(env, ctx) {
  requirePermission(ctx, 'admin.access');
  let reachable = false; let storageError = null;
  try { if (env.MEDIA) { await env.MEDIA.head('__vault_health_probe'); reachable = true; } else storageError = 'binding MEDIA missing'; }
  catch (e) { storageError = 'storage probe failed'; }
  const counts = await env.DB.prepare(`SELECT state, COUNT(*) AS n FROM media GROUP BY state`).all();
  const by = { pending_upload: 0, uploaded: 0, ready: 0, rejected: 0, failed: 0, deleted: 0 };
  for (const c of counts.results) by[c.state] = c.n;
  const last = await env.DB.prepare(`SELECT id, state, last_error, updated_at FROM media WHERE last_error IS NOT NULL ORDER BY updated_at DESC LIMIT 1`).first();
  return json(200, {
    status: reachable ? 'ok' : 'degraded',
    version: VAULT_VERSION,
    checked_at: now(),
    storage: { binding: 'MEDIA', reachable, error: storageError },
    counts_by_state: by,
    last_error: last ? { media_id: last.id, state: last.state, message: last.last_error, at: last.updated_at } : null,
  });
}

export async function mediaRoute(env, req, ctx, m, p) {
  let mm;
  if (m === 'GET' && p === '/vault/health') return health(env, ctx);
  if (m === 'POST' && p === '/media/uploads') return createUpload(env, req, ctx);
  if (m === 'PUT' && (mm = p.match(new RegExp(`^/media/uploads/${ID}$`)))) return putUpload(env, req, ctx, mm[1]);
  if (m === 'POST' && (mm = p.match(new RegExp(`^/media/${ID}/complete$`)))) return complete(env, req, ctx, mm[1]);
  if (m === 'GET' && (mm = p.match(new RegExp(`^/media/${ID}$`)))) return getMedia(env, ctx, mm[1]);
  return null;
}

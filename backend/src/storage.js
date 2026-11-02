// PIKK Vault slice 4: per-user usage + quotas, admin usage/backlog/failure stats.
import { ApiError, json, readJson, clientIp } from './http.js';
import { requireVerified } from './auth.js';
import { requirePermission } from './permissions.js';
import { audit } from './audit.js';
import { VAULT_QUOTA } from './media-config.js';

const now = () => new Date().toISOString();
const STATES_SQL = VAULT_QUOTA.countedStates.map(s => `'${s}'`).join(',');

export async function userUsage(env, userId) {
  const r = await env.DB.prepare(
    `SELECT COALESCE(SUM(size_bytes),0) AS bytes, COUNT(*) AS n FROM media WHERE owner_id=? AND deleted_at IS NULL AND state IN (${STATES_SQL})`
  ).bind(userId).first();
  const o = await env.DB.prepare(`SELECT max_bytes FROM vault_quota_overrides WHERE user_id=?`).bind(userId).first();
  const quota = o ? o.max_bytes : VAULT_QUOTA.defaultUserBytes;
  const pct = quota > 0 ? Math.round((r.bytes / quota) * 1000) / 10 : 100;
  return { used_bytes: r.bytes, objects: r.n, quota_bytes: quota, quota_source: o ? 'override' : 'default',
    remaining_bytes: Math.max(0, quota - r.bytes), used_pct: pct, alert: pct >= VAULT_QUOTA.alertThresholdPct,
    alert_threshold_pct: VAULT_QUOTA.alertThresholdPct, source: 'd1:media.size_bytes', as_of: now() };
}

/** Throws 413 quota_exceeded if adding `size` would exceed the user's quota. */
export async function assertQuota(env, userId, size) {
  const u = await userUsage(env, userId);
  if (u.used_bytes + size > u.quota_bytes)
    throw new ApiError(413, 'quota_exceeded', 'Storage quota exceeded', { quota_bytes: u.quota_bytes, used_bytes: u.used_bytes, requested_bytes: size });
}

async function myUsage(env, ctx) {
  const s = requireVerified(ctx);
  return json(200, { usage: await userUsage(env, s.user.id) });
}

async function adminUsage(env, req, ctx) {
  const s = requirePermission(ctx, 'admin.access');
  const byType = (await env.DB.prepare(
    `SELECT media_type, COUNT(*) AS n, COALESCE(SUM(size_bytes),0) AS bytes FROM media WHERE deleted_at IS NULL AND state IN (${STATES_SQL}) GROUP BY media_type`).all()).results;
  const top = (await env.DB.prepare(
    `SELECT owner_id, COUNT(*) AS n, SUM(size_bytes) AS bytes FROM media WHERE deleted_at IS NULL AND state IN (${STATES_SQL}) GROUP BY owner_id ORDER BY bytes DESC LIMIT 20`).all()).results;
  const overrides = (await env.DB.prepare(`SELECT user_id, max_bytes FROM vault_quota_overrides`).all()).results;
  const omap = Object.fromEntries(overrides.map(o => [o.user_id, o.max_bytes]));
  const total = byType.reduce((a, r) => a + r.bytes, 0);
  const users = top.map(t => {
    const q = omap[t.owner_id] ?? VAULT_QUOTA.defaultUserBytes;
    const pct = q > 0 ? Math.round((t.bytes / q) * 1000) / 10 : 100;
    return { user_id: t.owner_id, objects: t.n, used_bytes: t.bytes, quota_bytes: q, used_pct: pct, alert: pct >= VAULT_QUOTA.alertThresholdPct };
  });
  await audit(env, { actor: s.user.id, action: 'vault.admin_usage', ip: clientIp(req) });
  return json(200, { usage: { total_bytes: total, by_type: byType.map(r => ({ type: r.media_type, objects: r.n, bytes: r.bytes })), top_users: users,
    default_quota_bytes: VAULT_QUOTA.defaultUserBytes, alert_threshold_pct: VAULT_QUOTA.alertThresholdPct,
    costs: { status: 'unavailable', reason: 'no billing source connected (R2 not provisioned)' },
    source: 'd1:media.size_bytes', as_of: now() } });
}

export async function stats(env) {
  const since = new Date(Date.now() - 24 * 3600e3).toISOString();
  const jobs = (await env.DB.prepare(`SELECT state, COUNT(*) AS n FROM processing_jobs GROUP BY state`).all()).results;
  const jb = { queued: 0, running: 0, succeeded: 0, failed: 0 }; for (const j of jobs) jb[j.state] = j.n;
  const oldest = await env.DB.prepare(`SELECT MIN(created_at) AS t FROM processing_jobs WHERE state='queued'`).first();
  const f24 = await env.DB.prepare(`SELECT COUNT(*) AS n FROM media WHERE state IN ('failed','rejected') AND updated_at >= ?`).bind(since).first();
  const reasons = (await env.DB.prepare(
    `SELECT last_error AS reason, COUNT(*) AS n FROM media WHERE state IN ('failed','rejected') AND updated_at >= ? GROUP BY last_error ORDER BY n DESC LIMIT 10`).bind(since).all()).results;
  const mp = await env.DB.prepare(`SELECT COUNT(*) AS n FROM media_multipart WHERE state='active'`).first();
  const stale = await env.DB.prepare(`SELECT COUNT(*) AS n FROM media WHERE state='pending_upload' AND deleted_at IS NULL AND created_at < ?`).bind(since).first();
  return { backlog: { queued: jb.queued, running: jb.running, oldest_queued_at: oldest?.t || null,
      active_multipart_uploads: mp.n, stale_pending_uploads_24h: stale.n },
    failures: { failed_jobs: jb.failed, failed_or_rejected_media_24h: f24.n, top_reasons_24h: reasons },
    jobs_by_state: jb, window: { since, until: now() }, source: 'd1', as_of: now() };
}

async function adminStats(env, req, ctx) {
  const s = requirePermission(ctx, 'admin.access');
  await audit(env, { actor: s.user.id, action: 'vault.admin_stats', ip: clientIp(req) });
  return json(200, { stats: await stats(env) });
}

async function setQuota(env, req, ctx, userId) {
  const s = requirePermission(ctx, 'admin.access');
  const b = await readJson(req);
  if (b.max_bytes === null) {
    await env.DB.prepare(`DELETE FROM vault_quota_overrides WHERE user_id=?`).bind(userId).run();
  } else {
    if (!Number.isSafeInteger(b.max_bytes) || b.max_bytes < 0) throw new ApiError(422, 'validation_failed', 'Invalid input', { max_bytes: 'non-negative integer bytes or null' });
    const u = await env.DB.prepare(`SELECT id FROM users WHERE id=?`).bind(userId).first();
    if (!u) throw new ApiError(404, 'not_found', 'Not found');
    await env.DB.prepare(`INSERT INTO vault_quota_overrides(user_id,max_bytes,reason,updated_by,updated_at) VALUES (?,?,?,?,?)
      ON CONFLICT(user_id) DO UPDATE SET max_bytes=excluded.max_bytes, reason=excluded.reason, updated_by=excluded.updated_by, updated_at=excluded.updated_at`)
      .bind(userId, b.max_bytes, b.reason ? String(b.reason).slice(0, 500) : null, s.user.id, now()).run();
  }
  await audit(env, { actor: s.user.id, action: 'vault.quota_set', target: userId, ip: clientIp(req), meta: { max_bytes: b.max_bytes } });
  return json(200, { usage: await userUsage(env, userId) });
}

export async function storageRoute(env, req, ctx, m, p) {
  let mm;
  if (m === 'GET' && p === '/vault/usage') return myUsage(env, ctx);
  if (m === 'GET' && p === '/vault/admin/usage') return adminUsage(env, req, ctx);
  if (m === 'GET' && p === '/vault/admin/stats') return adminStats(env, req, ctx);
  if (m === 'PUT' && (mm = p.match(/^\/vault\/admin\/quotas\/([A-Za-z0-9_-]{1,80})$/))) return setQuota(env, req, ctx, mm[1]);
  return null;
}

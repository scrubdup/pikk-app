import { ApiError, json, errorResponse, corsHeaders, readJson, clientIp } from './http.js';
import { signup, login, logout, verifyEmail, loadSession, requireAuth, requireVerified, requireActive } from './auth.js';
import { requirePermission, GRANTABLE_ROLES, OWNER_ROLE } from './permissions.js';
import { opsSummary } from './ops.js';
import { bootstrapOwner } from './bootstrap.js';
import { assertNotBlocked, NOT_BLOCKED_SQL } from './blocks.js';
import { safetyRoute, ageVerificationWebhook } from './safety.js';
import { requireString, requirePositiveInt, validateSignupRoles } from './validate.js';
import { rateLimit } from './ratelimit.js';
import { balance, transfer } from './ledger.js';
import { stripeWebhook } from './webhook.js';
import { newId } from './crypto.js';
import { audit, auditStmt } from './audit.js';

const HANDLE = /^[a-zA-Z0-9_]{3,30}$/;

async function userByHandle(env, handle) {
  const u = await env.DB.prepare(`SELECT id, handle FROM users WHERE handle = ? AND disabled_at IS NULL`).bind(handle).first();
  if (!u) throw new ApiError(404, 'not_found', 'User not found');
  return u;
}

async function route(req, env, ctx) {
  const url = new URL(req.url);
  const { pathname: p } = url; const m = req.method;
  const ip = clientIp(req);

  if (m === 'POST' && p === '/webhooks/stripe') return stripeWebhook(env, req);
  if (m === 'POST' && p === '/webhooks/age-verification') return ageVerificationWebhook(env, req);

  // CSRF: every state-changing browser request must come from the allowed origin.
  if (m !== 'GET' && m !== 'HEAD' && req.headers.get('Origin') !== env.ALLOWED_ORIGIN)
    throw new ApiError(403, 'bad_origin', 'Origin not allowed');

  await rateLimit(env, `ip:${ip}`, 120, 60);
  ctx.session = await loadSession(env, req);

  const withCookie = (r) => json(r.status, r.body, { 'Set-Cookie': r.cookie });

  if (m === 'GET' && p === '/health') return json(200, { ok: true });

  if (p.startsWith('/auth/')) await rateLimit(env, `auth:${ip}`, 10, 60);
  if (m === 'POST' && p === '/auth/signup') return withCookie(await signup(env, req, await readJson(req)));
  if (m === 'POST' && p === '/auth/login') return withCookie(await login(env, req, await readJson(req)));
  if (m === 'POST' && p === '/auth/logout') return withCookie(await logout(env, req, ctx));
  if (m === 'POST' && p === '/auth/verify') return json(200, await verifyEmail(env, req, await readJson(req)));
  if (m === 'GET' && p === '/auth/me') { const s = requireAuth(ctx); return json(200, { user: s.user, roles: s.roles, signup_roles: s.signupRoles }); }
  if (m === 'POST' && p === '/account/signup-roles') {
    // PR #110: roles can be added or changed later. Declarations only; approval/monetization handled separately.
    const s = requireActive(ctx); const b = await readJson(req);
    const wanted = validateSignupRoles(b.signup_roles, { required: true });
    const t = new Date().toISOString();
    const placeholders = wanted.map(() => '?').join(',');
    await env.DB.batch([
      env.DB.prepare(`DELETE FROM user_signup_roles WHERE user_id = ? AND role NOT IN (${placeholders})`).bind(s.user.id, ...wanted),
      ...wanted.map(r => env.DB.prepare(`INSERT OR IGNORE INTO user_signup_roles(user_id,role,declared_at) VALUES (?,?,?)`).bind(s.user.id, r, t)),
      auditStmt(env, { actor: s.user.id, action: 'account.signup_roles', target: s.user.id, ip, meta: { signup_roles: wanted } }),
    ]);
    return json(200, { signup_roles: wanted });
  }

  if (m === 'POST' && p === '/posts') {
    const s = requireVerified(ctx);
    if (s.status.muted_until) throw new ApiError(403, 'account_muted', 'Account is muted', { until: s.status.muted_until });
    await rateLimit(env, `post:${s.user.id}`, 30, 3600);
    const b = await readJson(req);
    const kind = b.kind === undefined ? 'text' : b.kind;
    if (!['text', 'link'].includes(kind)) throw new ApiError(422, 'validation_failed', 'Invalid input', { kind: 'text or link (media upload not yet supported)' });
    const body = requireString(b, 'body', { max: 5000 });
    const id = newId('pst');
    await env.DB.prepare(`INSERT INTO posts(id,author_id,kind,body,created_at) VALUES (?,?,?,?,?)`).bind(id, s.user.id, kind, body, new Date().toISOString()).run();
    return json(201, { post: { id, kind, body, author: s.user.handle } });
  }

  if (m === 'POST' && (p === '/follows' || p === '/blocks')) {
    const s = requireVerified(ctx); const b = await readJson(req);
    const target = await userByHandle(env, requireString(b, 'handle', { max: 30, pattern: HANDLE }));
    if (target.id === s.user.id) throw new ApiError(422, 'validation_failed', 'Cannot target yourself');
    const t = new Date().toISOString();
    if (p === '/follows') {
      await assertNotBlocked(env, s.user.id, target.id);
      await env.DB.prepare(`INSERT OR IGNORE INTO follows(follower_id,followee_id,created_at) VALUES (?,?,?)`).bind(s.user.id, target.id, t).run();
    } else {
      await env.DB.batch([
        env.DB.prepare(`INSERT OR IGNORE INTO blocks(blocker_id,blocked_id,created_at) VALUES (?,?,?)`).bind(s.user.id, target.id, t),
        env.DB.prepare(`DELETE FROM follows WHERE (follower_id=?1 AND followee_id=?2) OR (follower_id=?2 AND followee_id=?1)`).bind(s.user.id, target.id),
      ]);
      await audit(env, { actor: s.user.id, action: 'social.block', target: target.id, ip });
    }
    return json(200, { ok: true });
  }

  if (m === 'GET' && p === '/feed') {
    const s = requireAuth(ctx);
    const r = await env.DB.prepare(
      `SELECT p.id, p.kind, p.body, p.created_at, u.handle AS author FROM posts p JOIN users u ON u.id = p.author_id
        WHERE p.deleted_at IS NULL AND u.banned_at IS NULL
          AND (p.author_id = ?1 OR p.author_id IN (SELECT followee_id FROM follows WHERE follower_id = ?1))
          AND ${NOT_BLOCKED_SQL('p.author_id')}
        ORDER BY p.created_at DESC LIMIT 50`).bind(s.user.id).all();
    return json(200, { posts: r.results });
  }
  let mm;
  if (m === 'GET' && (mm = p.match(/^\/posts\/([\w-]{1,64})$/))) {
    const s = requireAuth(ctx);
    const post = await env.DB.prepare(`SELECT p.id, p.kind, p.body, p.created_at, p.author_id, u.handle AS author FROM posts p JOIN users u ON u.id = p.author_id WHERE p.id = ? AND p.deleted_at IS NULL`).bind(mm[1]).first();
    if (!post) throw new ApiError(404, 'not_found', 'Not found');
    await assertNotBlocked(env, s.user.id, post.author_id, { silent: true });
    const { author_id, ...pub } = post;
    return json(200, { post: pub });
  }
  if (m === 'GET' && (mm = p.match(/^\/users\/([a-zA-Z0-9_]{3,30})$/))) {
    const s = requireAuth(ctx);
    const u = await env.DB.prepare(`SELECT id, handle, display_name, created_at FROM users WHERE handle = ? AND banned_at IS NULL AND disabled_at IS NULL`).bind(mm[1]).first();
    if (!u) throw new ApiError(404, 'not_found', 'Not found');
    await assertNotBlocked(env, s.user.id, u.id, { silent: true });
    return json(200, { user: { handle: u.handle, display_name: u.display_name, created_at: u.created_at } });
  }

  if (m === 'GET' && p === '/ledger/balance') { const s = requireAuth(ctx); return json(200, { balance: await balance(env, s.user.id), currency: 'pikk_coin' }); }
  if (m === 'POST' && p === '/ledger/transfer') {
    const s = requireVerified(ctx); const b = await readJson(req);
    await rateLimit(env, `xfer:${s.user.id}`, 20, 60);
    const to = requireString(b, 'to_handle', { max: 30, pattern: HANDLE });
    const amount = requirePositiveInt(b, 'amount');
    const memo = b.memo === undefined ? null : requireString(b, 'memo', { max: 200 });
    return json(200, await transfer(env, req, s.user, to, amount, memo));
  }

  if ((m === 'POST' || m === 'DELETE') && p === '/admin/roles') {
    const s = requirePermission(ctx, 'roles.grant'); const b = await readJson(req);
    const target = await userByHandle(env, requireString(b, 'handle', { max: 30, pattern: HANDLE }));
    const role = requireString(b, 'role', { max: 20 });
    if (role === OWNER_ROLE) throw new ApiError(403, 'forbidden', 'The owner role can only be assigned by the one-time server bootstrap');
    if (!GRANTABLE_ROLES.includes(role)) throw new ApiError(422, 'validation_failed', 'Invalid role');
    const reason = requireString(b, 'reason', { min: 3, max: 500 });
    const targetIsOwner = await env.DB.prepare(`SELECT 1 AS x FROM user_roles WHERE user_id = ? AND role = ?`).bind(target.id, OWNER_ROLE).first();
    if (targetIsOwner && !s.roles.includes(OWNER_ROLE)) throw new ApiError(403, 'forbidden', 'Only the owner can change the owner\'s roles');
    if (m === 'DELETE' && role === 'admin' && target.id === s.user.id) throw new ApiError(422, 'validation_failed', 'Cannot revoke your own admin role');
    const stmt = m === 'POST'
      ? env.DB.prepare(`INSERT OR IGNORE INTO user_roles(user_id,role,granted_by,granted_at) VALUES (?,?,?,?)`).bind(target.id, role, s.user.id, new Date().toISOString())
      : env.DB.prepare(`DELETE FROM user_roles WHERE user_id = ? AND role = ?`).bind(target.id, role);
    await env.DB.batch([stmt, auditStmt(env, { actor: s.user.id, action: m === 'POST' ? 'admin.grant_role' : 'admin.revoke_role', target: target.id, ip, meta: { role, reason } })]);
    return json(200, { ok: true });
  }
  if (m === 'POST' && p === '/bootstrap/owner') return json(200, await bootstrapOwner(env, req, ip));
  if (m === 'GET' && p === '/admin/ops/summary') { requirePermission(ctx, 'ops.view'); return json(200, await opsSummary(env)); }
  if (m === 'GET' && p === '/admin/audit') {
    requirePermission(ctx, 'admin.access');
    const r = await env.DB.prepare(`SELECT id, actor_id, action, target, created_at FROM audit_log ORDER BY created_at DESC LIMIT 100`).all();
    return json(200, { entries: r.results });
  }

  const safety = await safetyRoute(env, req, ctx, m, p);
  if (safety) return safety;

  throw new ApiError(404, 'not_found', 'Route not found');
}

export default {
  async fetch(req, env) {
    const requestId = crypto.randomUUID();
    const cors = corsHeaders(env, req);
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: cors['Access-Control-Allow-Origin'] ? 204 : 403, headers: cors });
    }
    let res;
    try { res = await route(req, env, {}); } catch (e) { res = errorResponse(e, requestId); }
    for (const [k, v] of Object.entries(cors)) res.headers.set(k, v);
    res.headers.set('X-Request-Id', requestId);
    return res;
  },
};

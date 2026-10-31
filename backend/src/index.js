import { ApiError, json, errorResponse, corsHeaders, readJson, clientIp } from './http.js';
import { signup, login, logout, verifyEmail, loadSession, requireAuth, requireVerified, requireRole } from './auth.js';
import { requireString, requirePositiveInt } from './validate.js';
import { rateLimit } from './ratelimit.js';
import { balance, transfer } from './ledger.js';
import { stripeWebhook } from './webhook.js';
import { newId } from './crypto.js';
import { audit } from './audit.js';

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
  if (m === 'GET' && p === '/auth/me') { const s = requireAuth(ctx); return json(200, { user: s.user, roles: s.roles }); }

  if (m === 'POST' && p === '/posts') {
    const s = requireVerified(ctx); const b = await readJson(req);
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
      const blocked = await env.DB.prepare(`SELECT 1 FROM blocks WHERE (blocker_id=?1 AND blocked_id=?2) OR (blocker_id=?2 AND blocked_id=?1)`).bind(s.user.id, target.id).first();
      if (blocked) throw new ApiError(403, 'blocked', 'Cannot follow this user');
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

  if (m === 'GET' && p === '/ledger/balance') { const s = requireAuth(ctx); return json(200, { balance: await balance(env, s.user.id), currency: 'pikk_coin' }); }
  if (m === 'POST' && p === '/ledger/transfer') {
    const s = requireVerified(ctx); const b = await readJson(req);
    await rateLimit(env, `xfer:${s.user.id}`, 20, 60);
    const to = requireString(b, 'to_handle', { max: 30, pattern: HANDLE });
    const amount = requirePositiveInt(b, 'amount');
    const memo = b.memo === undefined ? null : requireString(b, 'memo', { max: 200 });
    return json(200, await transfer(env, req, s.user, to, amount, memo));
  }

  if (m === 'POST' && p === '/admin/roles') {
    const s = requireRole(ctx, 'admin'); const b = await readJson(req);
    const target = await userByHandle(env, requireString(b, 'handle', { max: 30, pattern: HANDLE }));
    const role = requireString(b, 'role', { max: 20 });
    if (!['creator', 'moderator', 'admin'].includes(role)) throw new ApiError(422, 'validation_failed', 'Invalid role');
    await env.DB.prepare(`INSERT OR IGNORE INTO user_roles(user_id,role,granted_by,granted_at) VALUES (?,?,?,?)`).bind(target.id, role, s.user.id, new Date().toISOString()).run();
    await audit(env, { actor: s.user.id, action: 'admin.grant_role', target: target.id, ip, meta: { role } });
    return json(200, { ok: true });
  }
  if (m === 'GET' && p === '/admin/audit') {
    requireRole(ctx, 'admin', 'moderator');
    const r = await env.DB.prepare(`SELECT id, actor_id, action, target, created_at FROM audit_log ORDER BY created_at DESC LIMIT 100`).all();
    return json(200, { entries: r.results });
  }

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

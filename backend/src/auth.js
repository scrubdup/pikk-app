import { ApiError, clientIp } from './http.js';
import { hashPassword, verifyPassword, randomToken, sha256Hex, newId } from './crypto.js';
import { validateSignup, validateLogin, requireString } from './validate.js';
import { audit } from './audit.js';

export const SESSION_COOKIE = '__Host-pikk_session';
const nowIso = () => new Date().toISOString();
const DUMMY = { password_salt: 'AAAAAAAAAAAAAAAAAAAAAA==', password_iterations: 100000, password_hash: 'x' };

function sessionCookie(env, token, maxAgeSec) {
  const sameSite = ['Strict', 'Lax', 'None'].includes(env.COOKIE_SAMESITE) ? env.COOKIE_SAMESITE : 'Strict';
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=${sameSite}; Max-Age=${maxAgeSec}`;
}

function readCookie(req, name) {
  const raw = req.headers.get('Cookie') || '';
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return v.join('=');
  }
  return null;
}

async function createSession(env, req, userId) {
  const token = randomToken(32);
  const ttl = Math.max(1, Number(env.SESSION_TTL_HOURS || 720)) * 3600;
  await env.DB.prepare(`INSERT INTO sessions(id_hash,user_id,created_at,expires_at,ip,user_agent) VALUES (?,?,?,?,?,?)`)
    .bind(await sha256Hex(token), userId, nowIso(), new Date(Date.now() + ttl * 1000).toISOString(), clientIp(req), (req.headers.get('User-Agent') || '').slice(0, 200))
    .run();
  return sessionCookie(env, token, ttl);
}

/** Loads the session user + roles from D1. Returns null when absent/expired/revoked/disabled. */
export async function loadSession(env, req) {
  const token = readCookie(req, SESSION_COOKIE);
  if (!token || token.length > 100) return null;
  const idHash = await sha256Hex(token);
  const row = await env.DB.prepare(
    `SELECT s.id_hash, u.id, u.handle, u.display_name, u.disabled_at, c.email, c.email_verified_at
       FROM sessions s JOIN users u ON u.id = s.user_id JOIN credentials c ON c.user_id = u.id
      WHERE s.id_hash = ? AND s.revoked_at IS NULL AND s.expires_at > ?`).bind(idHash, nowIso()).first();
  if (!row || row.disabled_at) return null;
  const roles = await env.DB.prepare(`SELECT role FROM user_roles WHERE user_id = ? ORDER BY role`).bind(row.id).all();
  return {
    sessionIdHash: idHash,
    user: { id: row.id, handle: row.handle, display_name: row.display_name, email: row.email, email_verified: !!row.email_verified_at },
    roles: roles.results.map(r => r.role),
  };
}

export function requireAuth(ctx) {
  if (!ctx.session) throw new ApiError(401, 'unauthenticated', 'Sign in required');
  return ctx.session;
}
export function requireVerified(ctx) {
  const s = requireAuth(ctx);
  if (!s.user.email_verified) throw new ApiError(403, 'email_unverified', 'Verify your email first');
  return s;
}
export function requireRole(ctx, ...roles) {
  const s = requireAuth(ctx);
  if (!roles.some(r => s.roles.includes(r))) throw new ApiError(403, 'forbidden', 'Insufficient role');
  return s;
}

export async function signup(env, req, body) {
  const v = validateSignup(body);
  const exists = await env.DB.prepare(`SELECT 1 FROM credentials WHERE email = ? UNION ALL SELECT 1 FROM users WHERE handle = ?`).bind(v.email, v.handle).first();
  if (exists) throw new ApiError(409, 'account_exists', 'Email or handle already registered');
  const id = newId('usr');
  const pw = await hashPassword(v.password);
  const verifyToken = randomToken(32);
  const t = nowIso();
  try {
    await env.DB.batch([
      env.DB.prepare(`INSERT INTO users(id,auth_subject,handle,display_name,account_type,created_at) VALUES (?,?,?,?, 'member', ?)`).bind(id, `local:${id}`, v.handle, v.display_name, t),
      env.DB.prepare(`INSERT INTO credentials(user_id,email,password_hash,password_salt,password_iterations,updated_at) VALUES (?,?,?,?,?,?)`).bind(id, v.email, pw.hash, pw.salt, pw.iterations, t),
      env.DB.prepare(`INSERT INTO user_roles(user_id,role,granted_at) VALUES (?, 'member', ?)`).bind(id, t),
      env.DB.prepare(`INSERT INTO ledger_accounts(id,kind,user_id,created_at) VALUES (?, 'user', ?, ?)`).bind(`acct_${id}`, id, t),
      env.DB.prepare(`INSERT INTO email_verifications(token_hash,user_id,expires_at) VALUES (?,?,?)`).bind(await sha256Hex(verifyToken), id, new Date(Date.now() + 86400_000).toISOString()),
    ]);
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) throw new ApiError(409, 'account_exists', 'Email or handle already registered');
    throw e;
  }
  await audit(env, { actor: id, action: 'auth.signup', target: id, ip: clientIp(req) });
  const cookie = await createSession(env, req, id);
  // No email provider is configured: the token is NOT delivered anywhere. It is only echoed when
  // EXPOSE_VERIFY_TOKEN=true (local tests). Production must wire an email provider first.
  const verification = env.EXPOSE_VERIFY_TOKEN === 'true'
    ? { delivery: 'exposed_for_local_testing', token: verifyToken }
    : { delivery: 'email_provider_not_configured' };
  return { status: 201, cookie, body: { user: { id, handle: v.handle, display_name: v.display_name, email: v.email, email_verified: false }, roles: ['member'], verification } };
}

export async function login(env, req, body) {
  const v = validateLogin(body);
  const rec = await env.DB.prepare(
    `SELECT c.*, u.disabled_at FROM credentials c JOIN users u ON u.id = c.user_id WHERE c.email = ?`).bind(v.email).first();
  const ok = await verifyPassword(v.password, rec || DUMMY); // constant work either way
  if (!rec || !ok || rec.disabled_at) {
    await audit(env, { actor: rec ? rec.user_id : null, action: 'auth.login_failed', ip: clientIp(req) });
    throw new ApiError(401, 'invalid_credentials', 'Email or password is incorrect');
  }
  const cookie = await createSession(env, req, rec.user_id);
  await audit(env, { actor: rec.user_id, action: 'auth.login', ip: clientIp(req) });
  return { status: 200, cookie, body: { ok: true } };
}

export async function logout(env, req, ctx) {
  if (ctx.session) {
    await env.DB.prepare(`UPDATE sessions SET revoked_at = ? WHERE id_hash = ?`).bind(nowIso(), ctx.session.sessionIdHash).run();
    await audit(env, { actor: ctx.session.user.id, action: 'auth.logout', ip: clientIp(req) });
  }
  return { status: 200, cookie: sessionCookie(env, '', 0), body: { ok: true } };
}

export async function verifyEmail(env, req, body) {
  const token = requireString(body, 'token', { min: 20, max: 100 });
  const h = await sha256Hex(token);
  const row = await env.DB.prepare(`SELECT * FROM email_verifications WHERE token_hash = ?`).bind(h).first();
  if (!row || row.used_at || row.expires_at <= nowIso()) throw new ApiError(400, 'invalid_token', 'Verification link is invalid or expired');
  const t = nowIso();
  await env.DB.batch([
    env.DB.prepare(`UPDATE email_verifications SET used_at = ? WHERE token_hash = ? AND used_at IS NULL`).bind(t, h),
    env.DB.prepare(`UPDATE credentials SET email_verified_at = ?, updated_at = ? WHERE user_id = ?`).bind(t, t, row.user_id),
  ]);
  await audit(env, { actor: row.user_id, action: 'auth.email_verified', ip: clientIp(req) });
  return { ok: true };
}

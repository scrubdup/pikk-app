import { ApiError } from './http.js';
import { readJson } from './http.js';
import { requireString } from './validate.js';
import { timingSafeEqual, sha256Hex } from './crypto.js';
import { rateLimit } from './ratelimit.js';
import { auditStmt } from './audit.js';
import { OWNER_ROLE } from './permissions.js';

/**
 * One-time owner bootstrap. Disabled (404) unless the OWNER_BOOTSTRAP_TOKEN secret is set in the
 * Worker env (`wrangler secret put OWNER_BOOTSTRAP_TOKEN`; never committed). Refuses once any owner
 * exists, so it can only ever succeed once. Writes an append-only audit entry in the same batch.
 * Operator should delete the secret afterwards. Body: { handle }. Header: Authorization: Bearer <token>.
 */
export async function bootstrapOwner(env, req, ip) {
  const secret = env.OWNER_BOOTSTRAP_TOKEN;
  if (!secret || secret.length < 32) throw new ApiError(404, 'not_found', 'Route not found');
  await rateLimit(env, `bootstrap:${ip}`, 5, 3600);
  const given = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  // Compare fixed-length digests so length differences don't leak.
  if (!timingSafeEqual(await sha256Hex(given), await sha256Hex(secret))) throw new ApiError(403, 'forbidden', 'Invalid bootstrap token');
  const existing = await env.DB.prepare(`SELECT 1 AS x FROM user_roles WHERE role = ?`).bind(OWNER_ROLE).first();
  if (existing) throw new ApiError(409, 'already_bootstrapped', 'An owner already exists; bootstrap is one-time only');
  const b = await readJson(req);
  const handle = requireString(b, 'handle', { max: 30, pattern: /^[a-zA-Z0-9_]{3,30}$/ });
  const u = await env.DB.prepare(`SELECT id FROM users WHERE handle = ? AND disabled_at IS NULL AND banned_at IS NULL`).bind(handle).first();
  if (!u) throw new ApiError(404, 'not_found', 'User not found');
  const t = new Date().toISOString();
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO user_roles(user_id,role,granted_by,granted_at) VALUES (?,?,NULL,?)`).bind(u.id, OWNER_ROLE, t),
    auditStmt(env, { actor: null, action: 'bootstrap.owner', target: u.id, ip, meta: { via: 'OWNER_BOOTSTRAP_TOKEN' } }),
  ]);
  return { ok: true, owner: handle };
}

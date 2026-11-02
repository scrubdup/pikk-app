import { ApiError } from './http.js';

/** True if either user blocks the other. Export for DMs, profile, live, rooms, dating, roast invites. */
export async function isBlocked(env, a, b) {
  if (!a || !b || a === b) return false;
  const r = await env.DB.prepare(`SELECT 1 FROM blocks WHERE (blocker_id=?1 AND blocked_id=?2) OR (blocker_id=?2 AND blocked_id=?1) LIMIT 1`).bind(a, b).first();
  return !!r;
}

/** Throws 403 'blocked' (or 404 when `silent`, so the block isn't revealed). */
export async function assertNotBlocked(env, a, b, { silent = false } = {}) {
  if (await isBlocked(env, a, b)) {
    if (silent) throw new ApiError(404, 'not_found', 'Not found');
    throw new ApiError(403, 'blocked', 'Action not allowed');
  }
}

/** SQL fragment excluding rows whose `col` user is blocked by/with viewer (bind viewer as ?1). */
export const NOT_BLOCKED_SQL = (col) =>
  `NOT EXISTS (SELECT 1 FROM blocks b WHERE (b.blocker_id = ?1 AND b.blocked_id = ${col}) OR (b.blocker_id = ${col} AND b.blocked_id = ?1))`;

import { ApiError } from './http.js';

/** Single source of truth: permission -> roles allowed. Roles are always loaded from D1 per request. */
export const PERMISSIONS = Object.freeze({
  'admin.access': ['admin'],
  'roles.grant': ['admin'],
  'reports.create': ['*'],
  'reports.view': ['moderator', 'admin'],
  'reports.resolve': ['moderator', 'admin'],
  'moderation.action': ['moderator', 'admin'],
  'ban.permanent': ['admin'],
  'appeals.review': ['moderator', 'admin'], // + "not the original actor" rule unless admin (see safety.js)
  'tickets.create': ['*'],
  'tickets.view': ['support_agent', 'admin'],
  'tickets.reply': ['support_agent', 'admin'],
  'copyright.takedown.review': ['admin', 'dmca'],
});
export const STAFF_ROLES = ['moderator', 'support_agent', 'admin', 'dmca'];
export const GRANTABLE_ROLES = ['creator', ...STAFF_ROLES];

export function can(session, perm) {
  const allowed = PERMISSIONS[perm];
  if (!allowed) throw new Error(`unknown permission ${perm}`);
  if (!session) return false;
  return allowed.includes('*') || allowed.some(r => session.roles.includes(r));
}

export function requirePermission(ctx, perm) {
  if (!ctx.session) throw new ApiError(401, 'unauthenticated', 'Sign in required');
  if (!can(ctx.session, perm)) throw new ApiError(403, 'forbidden', `Missing permission ${perm}`);
  return ctx.session;
}

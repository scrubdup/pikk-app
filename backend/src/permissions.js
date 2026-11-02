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
  'ops.view': ['owner'], // PIKK Master Mind read-only monitoring; owner only
});
/** owner sits above admin: it holds every admin permission plus owner-only ones (ops.view).
 *  owner is NOT grantable via /admin/roles; only the env-gated one-time bootstrap assigns it. */
export const OWNER_ROLE = 'owner';
export const effectiveRoles = (roles) => roles.includes(OWNER_ROLE) && !roles.includes('admin') ? [...roles, 'admin'] : roles;
export const STAFF_ROLES = ['moderator', 'support_agent', 'admin', 'dmca'];
export const GRANTABLE_ROLES = ['creator', ...STAFF_ROLES];

export function can(session, perm) {
  const allowed = PERMISSIONS[perm];
  if (!allowed) throw new Error(`unknown permission ${perm}`);
  if (!session) return false;
  const roles = effectiveRoles(session.roles);
  return allowed.includes('*') || allowed.some(r => roles.includes(r));
}

export function requirePermission(ctx, perm) {
  if (!ctx.session) throw new ApiError(401, 'unauthenticated', 'Sign in required');
  if (!can(ctx.session, perm)) throw new ApiError(403, 'forbidden', `Missing permission ${perm}`);
  return ctx.session;
}

import { ApiError } from './http.js';

/**
 * Server-authoritative membership status.
 *
 * Does NOT invent plan catalogs, prices, trials, or free grants.
 * Approved commercial terms are still open: docs/owner-requirements/MASTER_FEATURES.md §13
 * marks Ad-Free pricing "not final"; frontend MEMBERSHIPS in src/data.js are UI preview / TEST MODE only.
 *
 * Until a paid-activation path exists (owner-approved plan IDs + verified payment webhook),
 * every account reports inactive. Clients must never treat localStorage membership as authority
 * when the API is configured.
 */
export async function membershipMe(env, session) {
  if (!session?.user?.id) throw new ApiError(401, 'unauthenticated', 'Sign in required');
  // Reserved for future: read active entitlement rows once an approved migration + plan catalog exist.
  // No free grants and no client-supplied tier acceptance here.
  return {
    status: 'inactive',
    plan: null,
    source: 'none',
    authoritative: true,
    billing_configured: !!env.STRIPE_WEBHOOK_SECRET,
    // Honest gate: paid membership activation is not live.
    activation: 'not_available',
  };
}

/** Reject any client attempt to self-assert a paid membership. */
export function rejectClientMembershipGrant() {
  throw new ApiError(403, 'forbidden', 'Membership cannot be granted by the client');
}

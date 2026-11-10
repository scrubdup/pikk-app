// Server membership lifecycle (read-only). GET /memberships/me runs only for an identity confirmed by a live
// GET /auth/me in this runtime, and its result is tied to that identity. Nothing here is persisted, nothing
// grants access locally, and nothing activates billing.
import { getLiveAuthMeUserId, onLiveAuthChange } from './auth/readiness.js';
import { setServerMembership, getServerMembership, isApiConfigured } from './store.js';
import { membershipApi } from './api/auth-client.js';

export const MEMBERSHIP_EVENT = 'pikk:membership-changed';
const PLAN_RE = /^[A-Za-z0-9][A-Za-z0-9_+.-]{0,63}$/;
const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d{1,3})?Z$/;
/** Strict UTC timestamp: well-formed AND a real calendar instant (no Feb 30, month 13, hour 24 rollover). */
export function isStrictIsoUtc(v) {
  if (typeof v !== 'string') return false;
  const m = ISO_RE.exec(v);
  if (!m) return false;
  const [y, mo, d, h, mi, s] = m.slice(1).map(Number);
  if (mo < 1 || mo > 12 || d < 1 || h > 23 || mi > 59 || s > 59) return false;
  const t = new Date(Date.UTC(y, mo - 1, d, h, mi, s));
  return t.getUTCFullYear() === y && t.getUTCMonth() === mo - 1 && t.getUTCDate() === d;
}

let generation = 0;
let phase = 'idle'; // idle | loading | ready | error | signed_out
let inflight = null; // { userId, gen, promise }

function emit() {
  try {
    const w = typeof window !== 'undefined' ? window : null;
    if (w && typeof w.dispatchEvent === 'function' && typeof w.CustomEvent === 'function') {
      w.dispatchEvent(new w.CustomEvent(MEMBERSHIP_EVENT, { detail: getMembershipView() }));
    }
  } catch (_) { /* UI refresh is best-effort */ }
}

/** Strictly validate the /memberships/me body. Returns the membership object or null (treated as an error). */
export function validateMembershipResponse(body) {
  const m = body && typeof body === 'object' ? body.membership : null;
  if (!m || typeof m !== 'object' || Array.isArray(m)) return null;
  if (m.authoritative !== true) return null;
  if (m.status !== 'active' && m.status !== 'inactive') return null;
  if (m.status === 'active' && (typeof m.plan !== 'string' || !PLAN_RE.test(m.plan))) return null;
  if (m.status === 'inactive' && m.plan !== null && m.plan !== undefined) return null;
  if (m.billing_configured !== undefined && typeof m.billing_configured !== 'boolean') return null;
  if (m.current_period_end !== undefined && m.current_period_end !== null
    && !isStrictIsoUtc(m.current_period_end)) return null;
  if (m.entitlements !== undefined && m.entitlements !== null && (typeof m.entitlements !== 'object' || Array.isArray(m.entitlements))) return null;
  return m;
}

/** Drop any membership state and invalidate in-flight responses (logout, account switch, 401, error). */
export function resetMembershipSync(nextPhase = 'idle') {
  generation += 1;
  inflight = null;
  setServerMembership(null);
  phase = nextPhase;
  emit();
}

/**
 * Fetch the membership for the live /auth/me identity. Concurrent calls for the same identity share one request.
 * A response that arrives after logout / account switch / a newer request is discarded.
 */
export function requestMembershipSync() {
  if (!isApiConfigured()) return Promise.resolve(null);
  const userId = getLiveAuthMeUserId();
  if (!userId) {
    if (phase !== 'signed_out' || getServerMembership().userId) resetMembershipSync('signed_out');
    return Promise.resolve(null);
  }
  if (inflight && inflight.userId === userId) return inflight.promise;
  const gen = ++generation;
  if (getServerMembership().userId !== userId) setServerMembership(null);
  phase = 'loading';
  emit();
  const current = () => gen === generation && getLiveAuthMeUserId() === userId;
  const promise = Promise.resolve()
    .then(() => membershipApi.me())
    .then((body) => {
      if (!current()) return null;
      const m = validateMembershipResponse(body);
      if (!m) { setServerMembership(null); phase = 'error'; emit(); return null; }
      setServerMembership(m, { userId });
      phase = 'ready';
      emit();
      return getServerMembership();
    }, (err) => {
      if (!current()) return null;
      setServerMembership(null);
      phase = err && err.status === 401 ? 'signed_out' : 'error';
      emit();
      return null;
    })
    .finally(() => { if (inflight && inflight.gen === gen) inflight = null; });
  inflight = { userId, gen, promise };
  return promise;
}

/** What the UI may show. Never reports active unless the stored result belongs to the current live identity. */
export function getMembershipView() {
  if (!isApiConfigured()) return { mode: 'demo' };
  const live = getLiveAuthMeUserId();
  if (!live) return { mode: 'api', phase: 'signed_out' };
  const m = getServerMembership();
  if (phase === 'loading') return { mode: 'api', phase: 'loading' };
  if (phase === 'error') return { mode: 'api', phase: 'error' };
  if (phase === 'signed_out') return { mode: 'api', phase: 'signed_out' }; // server said 401 for this session
  if (phase !== 'ready' || m.userId !== live) return { mode: 'api', phase: 'loading' };
  return {
    mode: 'api', phase: 'ready', status: m.status, plan: m.plan,
    billing_configured: m.billing_configured, current_period_end: m.current_period_end,
    cancel_at_period_end: m.cancel_at_period_end, entitlements: m.entitlements,
  };
}

export function getMembershipSyncPhase() { return phase; }

// Identity changed (logout, 401 handling, account switch): drop the old identity's membership immediately.
onLiveAuthChange(() => resetMembershipSync(getLiveAuthMeUserId() ? 'idle' : 'signed_out'));

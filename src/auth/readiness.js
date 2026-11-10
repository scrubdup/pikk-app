/** Auth readiness contract: never treat legacy local demo identities as authenticated users. */
export const AUTH_STATES = Object.freeze({
  GUEST: 'guest',
  DEMO: 'demo',
  AUTHENTICATED: 'authenticated',
});

/**
 * In-memory marker for a session confirmed by a live GET /auth/me in this runtime.
 * Never persisted to localStorage — forged client flags must not grant AUTHENTICATED.
 */
let liveAuthMeUserId = null;
const liveAuthListeners = new Set();

/**
 * Auth generation: every in-flight GET /auth/me probe (startup restore, Profile check, login, verify) captures it
 * and must re-check it before touching local identity. Bumped on sign-out (clearLiveAuthMe / invalidateAuthProbes)
 * and on any identity change, so a late response can never restore an identity after logout or switch.
 */
let authGeneration = 0;
export function currentAuthGeneration() { return authGeneration; }
export function isAuthGenerationCurrent(gen) { return gen === authGeneration; }
export function invalidateAuthProbes() { authGeneration += 1; return authGeneration; }

/** Subscribe to live-identity changes (prevId, nextId). Fires only when the id actually changes. */
export function onLiveAuthChange(fn) {
  liveAuthListeners.add(fn);
  return () => liveAuthListeners.delete(fn);
}
function setLiveAuthMeUserId(next) {
  const prev = liveAuthMeUserId;
  liveAuthMeUserId = next;
  if (prev !== null && prev !== next) authGeneration += 1; // switch or sign-out; first confirmation (null -> id) keeps concurrent probes valid
  if (prev !== next) for (const fn of [...liveAuthListeners]) { try { fn(prev, next); } catch (_) { /* listener errors never break auth */ } }
}

export function noteLiveAuthMe(user) {
  const id = user?.id ? String(user.id) : '';
  setLiveAuthMeUserId(id || null);
  return liveAuthMeUserId;
}

export function clearLiveAuthMe() {
  authGeneration += 1; // always: also invalidates probes started while no identity was noted yet
  setLiveAuthMeUserId(null);
}

export function getLiveAuthMeUserId() {
  return liveAuthMeUserId;
}

/**
 * Resolve client-facing auth state.
 * AUTHENTICATED only for a live /auth/me confirmation in this runtime
 * (session.liveFromAuthMe === true with user.id, or the in-memory noteLiveAuthMe id).
 * Persisted flags like verifiedByServer / authSource alone never authenticate.
 */
export function resolveAuthState({ demoUser = null, session = null } = {}) {
  const liveId = session?.liveFromAuthMe === true && session?.user?.id
    ? String(session.user.id)
    : liveAuthMeUserId;
  if (liveId) return AUTH_STATES.AUTHENTICATED;
  if (demoUser) return AUTH_STATES.DEMO;
  return AUTH_STATES.GUEST;
}

export function canAccessProtectedAction(authState) {
  return authState === AUTH_STATES.AUTHENTICATED;
}

export function authReadiness({ apiConfigured = false } = {}) {
  return {
    backendImplemented: true,
    productionAuthAvailable: !!apiConfigured,
    signupEnabled: !!apiConfigured,
    loginEnabled: !!apiConfigured,
    logoutEnabled: !!apiConfigured,
    serverSessionEnabled: !!apiConfigured,
    emailVerificationImplemented: true,
    passwordResetEnabled: !!apiConfigured,
    requiredBeforeLaunch: [
      'Configure the public Worker API endpoint in the frontend',
      'Verify signup/login/logout/session end to end in production',
      'Configure email delivery for verification and password-reset links',
      'Apply password-reset migration 0015 to production after owner approval',
      'Account deletion and legacy demo-data migration',
    ],
  };
}

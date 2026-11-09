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

export function noteLiveAuthMe(user) {
  const id = user?.id ? String(user.id) : '';
  liveAuthMeUserId = id || null;
  return liveAuthMeUserId;
}

export function clearLiveAuthMe() {
  liveAuthMeUserId = null;
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

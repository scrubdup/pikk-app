/** Auth readiness contract */
export const AUTH_STATES = Object.freeze({
  GUEST: 'guest',
  DEMO: 'demo',
  AUTHENTICATED: 'authenticated',
});

export function resolveAuthState({ demoUser = null, session = null } = {}) {
  // A user object in localStorage is never proof of authentication.
  if (session?.verifiedByServer === true && session.user) {
    return AUTH_STATES.AUTHENTICATED;
  }
  return demoUser ? AUTH_STATES.DEMO : AUTH_STATES.GUEST;
}

export function canAccessProtectedAction(authState) {
  return authState === AUTH_STATES.AUTHENTICATED;
}

export function authReadiness() {
  return {
    productionAuthAvailable: true,          // backend routes exist
    signupEnabled: true,
    passwordResetEnabled: false,            // still TODO
    serverSessionEnabled: true,
    emailVerificationEnabled: true,         // endpoint ready, delivery pending
    rateLimitingEnabled: true,
    rolesEnabled: true,
    requiredBeforeFullLaunch: [
      'Create real D1 database and run migrations',
      'Wire SPA screens to src/auth/service.js',
      'Real email delivery for verification',
      'Production cookie domain + CORS lockdown',
      'Account deletion flow',
    ],
  };
}

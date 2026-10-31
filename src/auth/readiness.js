/** Auth readiness contract: never treat legacy local demo identities as authenticated users. */
export const AUTH_STATES = Object.freeze({
  GUEST: 'guest',
  DEMO: 'demo',
  AUTHENTICATED: 'authenticated',
});

export function resolveAuthState({ demoUser = null, session = null } = {}) {
  // A user object in localStorage is never proof of authentication.
  if (session?.verifiedByServer === true && typeof session.userId === 'string' && session.userId.length > 0) {
    return AUTH_STATES.AUTHENTICATED;
  }
  return demoUser ? AUTH_STATES.DEMO : AUTH_STATES.GUEST;
}

export function canAccessProtectedAction(authState) {
  return authState === AUTH_STATES.AUTHENTICATED;
}

export function authReadiness() {
  return {
    productionAuthAvailable: false,
    signupEnabled: false,
    passwordResetEnabled: false,
    serverSessionEnabled: false,
    requiredBeforeLaunch: [
      'Backend identity provider with verified email',
      'Server-validated sessions and authorization',
      'Secure logout and account recovery',
      'Abuse prevention and rate limiting',
      'Account deletion and legacy demo-data migration',
    ],
  };
}

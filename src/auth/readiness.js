/** Auth readiness contract: never treat legacy local demo identities as authenticated users. */
export const AUTH_STATES = Object.freeze({
  GUEST: 'guest',
  DEMO: 'demo',
  AUTHENTICATED: 'authenticated',
});

export function resolveAuthState({ demoUser = null, session = null } = {}) {
  // Client-supplied session objects (even with verifiedByServer: true) are forgeable.
  // Authentication must be established through trusted server-side enforcement.
  // Until a backend exists, the frontend may only identify guest/demo states.
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

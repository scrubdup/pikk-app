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

export function authReadiness({ apiConfigured = false } = {}) {
  return {
    backendImplemented: true,
    productionAuthAvailable: !!apiConfigured,
    signupEnabled: !!apiConfigured,
    loginEnabled: !!apiConfigured,
    logoutEnabled: !!apiConfigured,
    serverSessionEnabled: !!apiConfigured,
    emailVerificationImplemented: true,
    passwordResetEnabled: false,
    requiredBeforeLaunch: [
      'Configure the public Worker API endpoint in the frontend',
      'Verify signup/login/logout/session end to end in production',
      'Configure email delivery for verification links',
      'Add secure account recovery/password reset',
      'Account deletion and legacy demo-data migration',
    ],
  };
}

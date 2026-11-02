import test from 'node:test';
import assert from 'node:assert/strict';
import { AUTH_STATES, resolveAuthState, canAccessProtectedAction, authReadiness } from '../src/auth/readiness.js';

test('guest without identity is not authenticated', () => {
  assert.equal(resolveAuthState(), AUTH_STATES.GUEST);
  assert.equal(canAccessProtectedAction(resolveAuthState()), false);
});
test('legacy local demo user is never treated as verified', () => {
  assert.equal(resolveAuthState({ demoUser: { id: 'u_demo', username: 'Fan' } }), AUTH_STATES.DEMO);
  assert.equal(canAccessProtectedAction(AUTH_STATES.DEMO), false);
});
test('forged or incomplete session is denied', () => {
  assert.equal(resolveAuthState({ session: { userId: 'user_1' } }), AUTH_STATES.GUEST);
  assert.equal(resolveAuthState({ session: { verifiedByServer: true } }), AUTH_STATES.GUEST);
});
test('a forged verifiedByServer flag never grants production identity', () => {
  assert.equal(resolveAuthState({ session: { verifiedByServer: true, userId: 'user_1' } }), AUTH_STATES.GUEST);
  assert.equal(canAccessProtectedAction(resolveAuthState({ session: { verifiedByServer: true, userId: 'user_1' } })), false);
});
test('backend auth is implemented but frontend stays gated until the API endpoint is configured', () => {
  const off = authReadiness();
  assert.equal(off.backendImplemented, true);
  assert.equal(off.productionAuthAvailable, false);
  assert.equal(off.signupEnabled, false);
  assert.equal(off.serverSessionEnabled, false);
  assert.equal(off.emailVerificationImplemented, true);
  assert.equal(off.passwordResetEnabled, false);
  const on = authReadiness({ apiConfigured: true });
  assert.equal(on.productionAuthAvailable, true);
  assert.equal(on.signupEnabled, true);
  assert.equal(on.loginEnabled, true);
  assert.equal(on.logoutEnabled, true);
  assert.equal(on.serverSessionEnabled, true);
});

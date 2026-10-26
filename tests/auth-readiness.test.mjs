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
test('real signup, sessions and recovery remain disabled until backend exists', () => {
  const readiness = authReadiness();
  assert.equal(readiness.productionAuthAvailable, false);
  assert.equal(readiness.signupEnabled, false);
  assert.equal(readiness.passwordResetEnabled, false);
  assert.equal(readiness.serverSessionEnabled, false);
});

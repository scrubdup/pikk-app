import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AUTH_STATES,
  resolveAuthState,
  canAccessProtectedAction,
  authReadiness,
  noteLiveAuthMe,
  clearLiveAuthMe,
  getLiveAuthMeUserId,
} from '../src/auth/readiness.js';

test('guest without identity is not authenticated', () => {
  clearLiveAuthMe();
  assert.equal(resolveAuthState(), AUTH_STATES.GUEST);
  assert.equal(canAccessProtectedAction(resolveAuthState()), false);
});

test('legacy local demo user is never treated as verified', () => {
  clearLiveAuthMe();
  assert.equal(resolveAuthState({ demoUser: { id: 'u_demo', username: 'Fan' } }), AUTH_STATES.DEMO);
  assert.equal(canAccessProtectedAction(AUTH_STATES.DEMO), false);
});

test('forged or incomplete session is denied', () => {
  clearLiveAuthMe();
  assert.equal(resolveAuthState({ session: { userId: 'user_1' } }), AUTH_STATES.GUEST);
  assert.equal(resolveAuthState({ session: { verifiedByServer: true } }), AUTH_STATES.GUEST);
});

test('a forged verifiedByServer flag never grants production identity', () => {
  clearLiveAuthMe();
  assert.equal(resolveAuthState({ session: { verifiedByServer: true, userId: 'user_1' } }), AUTH_STATES.GUEST);
  assert.equal(canAccessProtectedAction(resolveAuthState({ session: { verifiedByServer: true, userId: 'user_1' } })), false);
});

test('persisted authSource backend alone never authenticates', () => {
  clearLiveAuthMe();
  assert.equal(
    resolveAuthState({ session: { authSource: 'backend', user: { id: 'u1', handle: 'a' } } }),
    AUTH_STATES.GUEST,
  );
});

test('live /auth/me session marks AUTHENTICATED', () => {
  clearLiveAuthMe();
  const state = resolveAuthState({
    session: { liveFromAuthMe: true, user: { id: 'user_live', handle: 'live' } },
  });
  assert.equal(state, AUTH_STATES.AUTHENTICATED);
  assert.equal(canAccessProtectedAction(state), true);
});

test('noteLiveAuthMe grants AUTHENTICATED until cleared', () => {
  clearLiveAuthMe();
  noteLiveAuthMe({ id: 'user_live2', handle: 'live2' });
  assert.equal(getLiveAuthMeUserId(), 'user_live2');
  assert.equal(resolveAuthState(), AUTH_STATES.AUTHENTICATED);
  clearLiveAuthMe();
  assert.equal(resolveAuthState(), AUTH_STATES.GUEST);
});

test('backend auth is implemented but frontend stays gated until the API endpoint is configured', () => {
  const off = authReadiness();
  assert.equal(off.backendImplemented, true);
  assert.equal(off.productionAuthAvailable, false);
  assert.equal(off.signupEnabled, false);
  assert.equal(off.serverSessionEnabled, false);
  assert.equal(off.emailVerificationImplemented, true);
  assert.equal(off.passwordResetEnabled, false);
  // enabled only when API configured
  const on = authReadiness({ apiConfigured: true });
  assert.equal(on.productionAuthAvailable, true);
  assert.equal(on.signupEnabled, true);
  assert.equal(on.loginEnabled, true);
  assert.equal(on.logoutEnabled, true);
  assert.equal(on.serverSessionEnabled, true);
  assert.equal(on.passwordResetEnabled, true);
});

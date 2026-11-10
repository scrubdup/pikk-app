import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const profile = readFileSync(new URL('../src/pages/profile.js', import.meta.url), 'utf8');
const store = readFileSync(new URL('../src/store.js', import.meta.url), 'utf8');

test('Profile uses the real auth API for signup, login, current session and logout', () => {
  for (const token of ['authApi.signup', 'authApi.login', 'authApi.me']) assert.ok(profile.includes(token), token);
  // logout goes through the shared backend sign-out path (also used by Settings); behaviour is DOM-tested in pikk-auth-signout.test.mjs
  assert.ok(profile.includes('signOutBackendSession()'));
  assert.ok(readFileSync(new URL('../src/auth/sign-out.js', import.meta.url), 'utf8').includes('authApi.logout()'));
  assert.match(profile, /syncRemoteAuthUser\(result\.user\)/);
  assert.match(profile, /syncRemoteAuthUser\(session\.user\)/);
  assert.match(profile, /clearAuthenticatedUser\(\)/);
});

test('Profile exposes real email/password account fields and no normal username-only demo sign-in', () => {
  for (const id of ['signupDisplay','signupHandle','signupEmail','signupPassword','signupAccountBtn','loginEmail','loginPassword','loginAccountBtn']) {
    assert.ok(profile.includes(`id="${id}"`), id);
  }
  assert.doesNotMatch(profile, /id="signinName"/);
  assert.doesNotMatch(profile, /signInLocal\(/);
});

test('remote auth session user is bridged without storing password', () => {
  assert.match(store, /export function syncRemoteAuthUser/);
  assert.match(store, /authSource: 'backend'/);
  assert.match(store, /emailVerified: !!remoteUser\.email_verified/);
  assert.doesNotMatch(store, /password:/);
});


test('Profile restores and revalidates backend cookie sessions through /auth/me', () => {
  assert.match(profile, /if \(isPikkApiConfigured\(\)\)/);
  assert.match(profile, /cachedUser\.authSource === 'backend'/);
  assert.match(profile, /authApi\.me\(\)\.then/);
  assert.match(profile, /syncRemoteAuthUser\(session\.user\)/);
  assert.match(profile, /err\?\.status === 401/);
  assert.match(profile, /clearAuthenticatedUser\(\)/);
});


test('configured real API retires legacy browser-local demo identity', () => {
  assert.match(profile, /state\.user\.authSource !== 'backend' \? null : state\.user/);
  assert.match(profile, /cachedUser && cachedUser\.authSource !== 'backend'/);
  assert.match(profile, /clearAuthenticatedUser\(\)/);
});


test('unverified backend Profile can request another verification email', () => {
  assert.match(profile, /id="resendVerifyBtn"/);
  assert.match(profile, /authApi\.resendVerification\(\)/);
  assert.match(profile, /Verification email sent/);
  assert.match(profile, /Verification email service is not configured yet/);
});

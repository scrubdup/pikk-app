import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const profile = readFileSync(new URL('../src/pages/profile.js', import.meta.url), 'utf8');
const store = readFileSync(new URL('../src/store.js', import.meta.url), 'utf8');

test('Profile uses the real auth API for signup, login, current session and logout', () => {
  for (const token of ['authApi.signup', 'authApi.login', 'authApi.me', 'authApi.logout']) assert.ok(profile.includes(token), token);
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

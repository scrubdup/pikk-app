import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client = readFileSync(new URL('../src/api/auth-client.js', import.meta.url), 'utf8');
const forgot = readFileSync(new URL('../src/pages/forgot-password.js', import.meta.url), 'utf8');
const reset = readFileSync(new URL('../src/pages/reset-password.js', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const profile = readFileSync(new URL('../src/pages/profile.js', import.meta.url), 'utf8');
const readiness = readFileSync(new URL('../src/auth/readiness.js', import.meta.url), 'utf8');

test('auth client exposes forgot and reset password endpoints', () => {
  assert.match(client, /forgotPassword:\s*\(email\)\s*=>\s*request\('\/auth\/forgot-password'/);
  assert.match(client, /resetPassword:\s*\(\{\s*token,\s*password\s*\}\)/);
  assert.match(client, /'\/auth\/reset-password'/);
});

test('forgot/reset routes are registered and linked from Profile sign-in', () => {
  assert.match(main, /'\/forgot-password'/);
  assert.match(main, /'\/reset-password'/);
  assert.match(profile, /href="#\/forgot-password"/);
  assert.match(forgot, /If it matches a PIKK account/);
  assert.match(reset, /Choose a new password/);
  assert.match(reset, /clearAuthenticatedUser/);
});

test('readiness enables password reset only when API is configured', () => {
  assert.match(readiness, /passwordResetEnabled:\s*!!apiConfigured/);
  assert.match(readiness, /Apply password-reset migration 0015/);
});

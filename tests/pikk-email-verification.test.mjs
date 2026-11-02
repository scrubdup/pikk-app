import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page = readFileSync(new URL('../src/pages/verify-email.js', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');

test('email verification route is registered and calls the backend token endpoint', () => {
  assert.match(main, /'\/verify-email': \{ render: renderVerifyEmail, bind: bindVerifyEmail \}/);
  assert.match(page, /authApi\.verifyEmail\(token\)/);
  assert.match(page, /authApi\.me\(\)/);
  assert.match(page, /syncRemoteAuthUser\(session\.user\)/);
});

test('email verification route handles missing token and unconfigured API honestly', () => {
  assert.match(page, /Verification link missing/);
  assert.match(page, /Account service not connected/);
  assert.match(page, /invalid or expired/);
});

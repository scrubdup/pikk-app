import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const src = readFileSync(new URL('../src/api/auth-client.js', import.meta.url), 'utf8');

test('real auth client uses credentialed Cloudflare session requests', () => {
  assert.match(src, /credentials: 'include'/);
  assert.match(src, /'\/auth\/signup'/);
  assert.match(src, /'\/auth\/login'/);
  assert.match(src, /'\/auth\/logout'/);
  assert.match(src, /'\/auth\/me'/);
  assert.match(src, /'\/auth\/verify'/);
  assert.match(src, /'\/auth\/resend-verification'/);
});

test('real auth client does not hardcode an unverified Worker hostname', () => {
  assert.match(src, /VITE_PIKK_API_BASE/);
  assert.match(src, /__PIKK_API_BASE__/);
  assert.doesNotMatch(src, /workers\.dev/);
});

test('signup payload matches backend field names', () => {
  for (const field of ['email', 'handle', 'display_name', 'password', 'signup_roles']) assert.ok(src.includes(field), field);
});


test('Pages build receives the configured Worker API base', () => {
  const workflow = readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
  assert.match(workflow, /VITE_PIKK_API_BASE:\s*\$\{\{ vars\.PIKK_API_BASE \}\}/);
});

test('Pages workflow fails closed when PIKK_API_BASE is missing', () => {
  const workflow = readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
  assert.match(workflow, /assert-pikk-api-base\.mjs --required/);
  const script = readFileSync(new URL('../scripts/assert-pikk-api-base.mjs', import.meta.url), 'utf8');
  assert.match(script, /PIKK_API_BASE/);
  assert.doesNotMatch(script, /pikk-api\.pikk-0fa\.workers\.dev/);
});


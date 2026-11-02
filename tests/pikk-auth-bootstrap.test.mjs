import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');

test('app startup restores the backend session before routing', () => {
  assert.match(main, /async function restoreBackendSession\(\)/);
  assert.match(main, /if \(!isPikkApiConfigured\(\)\) return/);
  assert.match(main, /const session = await authApi\.me\(\)/);
  assert.match(main, /syncRemoteAuthUser\(session\.user\)/);
  assert.match(main, /if \(err\?\.status === 401\)/);
  assert.match(main, /clearAuthenticatedUser\(\)/);
  assert.ok(main.indexOf('await restoreBackendSession();') < main.indexOf('startRouter();'));
});

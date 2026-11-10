import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const restore = readFileSync(new URL('../src/auth/restore-session.js', import.meta.url), 'utf8');

test('app startup restores the backend session before routing', () => {
  // restore lives in src/auth/restore-session.js (real-module tested in pikk-auth-generation-guard.test.mjs)
  assert.match(main, /import \{ restoreBackendSession \} from '\.\/auth\/restore-session\.js';/);
  assert.match(restore, /export async function restoreBackendSession\(\)/);
  assert.match(restore, /if \(!isPikkApiConfigured\(\)\)/);
  assert.match(restore, /const session = await authApi\.me\(\)/);
  assert.match(restore, /syncRemoteAuthUser\(session\.user\)/);
  assert.match(restore, /noteLiveAuthMe\(session\.user\)/);
  assert.match(restore, /clearLiveAuthMe\(\)/);
  assert.match(restore, /if \(err\?\.status === 401\)/);
  assert.match(restore, /clearAuthenticatedUser\(\)/);
  assert.ok(main.indexOf('await restoreBackendSession();') < main.indexOf('startRouter();'));
});

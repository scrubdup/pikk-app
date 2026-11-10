import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/index.js', import.meta.url), 'utf8');

test('Master Mind uses the authenticated in-process Vault health route', () => {
  assert.match(source, /const vaultHealth = \(\) => mediaRoute\(env, req, ctx, 'GET', '\/vault\/health'\)/);
  assert.match(source, /opsSummary\(env, \{ vaultHealth \}\)/);
  assert.doesNotMatch(source, /vaultHealth: undefined/);
});

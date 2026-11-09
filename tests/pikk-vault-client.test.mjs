import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client = readFileSync(new URL('../src/api/vault-client.js', import.meta.url), 'utf8');
const music = readFileSync(new URL('../src/pages/music.js', import.meta.url), 'utf8');

test('vault client exposes secure upload/retrieval endpoints without localStorage fallback', () => {
  assert.match(client, /createUpload:\s*\(body\)\s*=>\s*request\('\/media\/uploads'/);
  assert.match(client, /putBytes:/);
  assert.match(client, /complete:\s*\(id\)/);
  assert.match(client, /cancel:\s*\(id\)/);
  assert.match(client, /accessUrl:/);
  assert.match(client, /usage:\s*\(\)\s*=>\s*request\('\/vault\/usage'\)/);
  assert.match(client, /no browser-store fallback/);
  assert.match(client, /credentials:\s*'include'/);
  assert.doesNotMatch(client, /localStorage\.(get|set)Item/);
  assert.doesNotMatch(client, /dbs_v1/);
});

test('Vault page labels demo vs API-connected accurately', () => {
  assert.match(music, /isVaultApiConfigured/);
  assert.match(music, /vaultApiStatus/);
  assert.match(music, /Demo · membership preview/);
  assert.match(music, /Vault media API connected/);
});

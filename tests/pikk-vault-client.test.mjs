import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client = readFileSync(new URL('../src/api/vault-client.js', import.meta.url), 'utf8');
const music = readFileSync(new URL('../src/pages/music.js', import.meta.url), 'utf8');

test('vault client is a library only: endpoints present, no browser-store fallback', () => {
  assert.match(client, /Not a complete Vault product UI/);
  assert.match(client, /createUpload:\s*\(body\)\s*=>\s*request\('\/media\/uploads'/);
  assert.match(client, /fetchVaultMediaStorageReady/);
  assert.match(client, /capabilities\.media_storage/);
  assert.match(client, /credentials:\s*'include'/);
  assert.doesNotMatch(client, /localStorage\.(get|set)Item/);
  assert.doesNotMatch(client, /dbs_v1/);
});

test('Vault page does not claim connected from API base alone; upload UI not built', () => {
  assert.match(music, /fetchVaultMediaStorageReady/);
  assert.match(music, /upload UI not built yet/i);
  assert.match(music, /media storage not ready|media storage ready/);
  assert.doesNotMatch(music, /Vault media API connected · secure upload\/retrieval/);
  // minimal palette: unlocked chip no longer uses banned green
  assert.doesNotMatch(music, /#8dffb0/);
});

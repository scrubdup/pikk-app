import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client = readFileSync(new URL('../src/api/vault-client.js', import.meta.url), 'utf8');
const music = readFileSync(new URL('../src/pages/music.js', import.meta.url), 'utf8');
const ui = readFileSync(new URL('../src/pages/vault-media-ui.js', import.meta.url), 'utf8');

test('vault client exposes list/upload/cancel/accessUrl and health readiness', () => {
  assert.match(client, /fetchVaultMediaStorageReady/);
  assert.match(client, /capabilities\.media_storage/);
  assert.match(client, /listMine:/);
  assert.match(client, /createUpload:/);
  assert.match(client, /uploadVaultFile/);
  assert.match(client, /credentials:\s*'include'/);
  assert.doesNotMatch(client, /localStorage\.(get|set)Item/);
  assert.doesNotMatch(client, /dbs_v1/);
  // Content-Length must not be forced (browsers set it for Blob bodies)
  assert.doesNotMatch(client, /'Content-Length'/);
});

test('Music Vault retains entry and wires real media panel (not library-only claim)', () => {
  assert.match(music, /renderVaultMediaPanelHtml/);
  assert.match(music, /bindVaultMediaPanel/);
  assert.match(music, /id="vault"/);
  assert.match(ui, /vaultMediaUploadForm/);
  assert.match(ui, /vaultApi\.listMine|vaultApi\.cancel|accessUrl/);
  assert.match(ui, /media_storage/);
  assert.match(ui, /No local upload fallback|No local fallback|nothing was saved locally/i);
  assert.match(ui, /Thumbnails/);
  assert.doesNotMatch(music, /upload UI not built yet/i);
  assert.doesNotMatch(ui, /localStorage\.(get|set)Item/);
});

test('vault client distinguishes unreachable vs media_storage false; honest stages; genuine slice', () => {
  assert.match(client, /reachable:\s*false/);
  assert.match(client, /reachable:\s*true/);
  assert.match(client, /Genuine slice|file\.slice\(start, end\)/);
  assert.doesNotMatch(client, /pct:\s*\d+/);
  assert.match(ui, /resolveSafeMediaUrl/);
  assert.match(ui, /cleanup_pending/);
  assert.match(ui, /bindGeneration|stillThisBind|sameUser/);
  assert.match(ui, /Could not reach API/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client = readFileSync(new URL('../src/api/music-upload-client.js', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/music.js', import.meta.url), 'utf8');
const route = readFileSync(new URL('../backend/src/music-upload.js', import.meta.url), 'utf8');

test('music draft client deletes through authenticated backend', () => {
  assert.match(client, /deleteDraft:async\(id\)/);
  assert.match(client, /method:'DELETE'/);
  assert.match(client, /credentials:'include'/);
});

test('My draft uploads expose an explicit owner delete action', () => {
  assert.match(page, /music-draft-delete/);
  assert.match(page, /Delete draft/);
  assert.match(page, /Delete this private music draft\?/ );
  assert.match(page, /musicUploadApi\.deleteDraft\(button\.dataset\.id\)/);
  assert.match(page, /Music draft deleted/);
});

test('DELETE handler claim soft-deletes before storage delete', () => {
  const start = route.indexOf("method === 'DELETE' && deleteMatch");
  assert.ok(start > 0, 'DELETE handler present');
  const body = route.slice(start, start + 1800);
  const claimAt = body.indexOf("UPDATE media_assets SET status='deleted'");
  const delAt = body.indexOf('await musicDelete(');
  assert.ok(claimAt > 0 && delAt > claimAt, 'claim must precede storage delete inside DELETE handler');
  assert.match(body, /cleanup_pending/);
});

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

test('My draft uploads expose delete and cleanup-retry recovery', () => {
  assert.match(page, /music-draft-delete/);
  assert.match(page, /music-draft-cleanup-retry/);
  assert.match(page, /pikk_music_cleanup_pending/);
  assert.match(page, /retry_required|cleanup_pending/);
  assert.match(page, /no automatic cleanup/i);
});

test('DELETE handler: draft-only claim, deleted-row cleanup retry, honest 202, key refuse', () => {
  const start = route.indexOf("method === 'DELETE' && deleteMatch");
  assert.ok(start > 0);
  const body = route.slice(start, start + 3500);
  assert.match(body, /status='draft'/);
  assert.match(body, /isCleanupRetry/);
  assert.match(body, /retry_required:\s*true/);
  assert.match(body, /no automatic cleanup sweeper/i);
  assert.match(body, /MusicKeyError/);
  assert.match(body, /storage_key_refused/);
  const claimAt = body.indexOf("status='draft'");
  const delAt = body.indexOf('await musicDelete(');
  assert.ok(claimAt > 0 && delAt > claimAt);
});

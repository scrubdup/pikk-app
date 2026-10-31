import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePikkVideoMetadata, PIKKUP_MAX_SECONDS } from '../src/pikk-video-policy.js';

test('PIKKUP Phase 1 accepts valid 20-minute video', () => {
  assert.equal(PIKKUP_MAX_SECONDS, 1200);
  assert.equal(validatePikkVideoMetadata({ duration: 1200, size: 1000, type: 'video/mp4' }), '');
});
test('PIKKUP rejects videos over 20 minutes', () => {
  assert.match(validatePikkVideoMetadata({ duration: 1200.1, size: 1000, type: 'video/mp4' }), /20 minutes/);
});
test('PIKKUP rejects invalid metadata, type and local storage size', () => {
  for (const item of [
    { duration: Infinity, size: 1000, type: 'video/mp4' },
    { duration: 10, size: 0, type: 'video/mp4' },
    { duration: 10, size: 300 * 1024 * 1024, type: 'video/mp4' },
    { duration: 10, size: 1000, type: 'audio/mp3' },
  ]) assert.notEqual(validatePikkVideoMetadata(item), '');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/store.js', import.meta.url), 'utf8');
const refresh = source.slice(
  source.indexOf('export function refreshHotFeed()'),
  source.indexOf('export function getHotPosts(', source.indexOf('export function refreshHotFeed()')),
);

test('engagement alerts use configurable post score and comment thresholds', () => {
  assert.match(refresh, /getEngagementAlertThresholds\(\)/);
  assert.match(refresh, /score < thresholds\.postScore && comments < thresholds\.commentCount/);
});

test('Hot Feed ranking cannot independently generate alerts below admin thresholds', () => {
  assert.equal((refresh.match(/alerts\.unshift\(/g) || []).length, 1);
  assert.match(refresh, /if \(alertedRefs\.has\(p\.id\)\) continue/);
  assert.match(refresh, /alertedRefs\.add\(p\.id\)/);
});

test('engagement threshold updates are admin-gated and validated', () => {
  const start = source.indexOf('export function setEngagementAlertThresholds(');
  const end = source.indexOf('export function refreshHotFeed()', start);
  const setter = source.slice(start, end);
  assert.ok(start >= 0);
  assert.match(setter, /if \(!isAdmin\(\)\)/);
  assert.match(setter, /Number\.isSafeInteger/);
  assert.match(setter, /refreshHotFeed\(\)/);
});

test('markEngagementAlertHandled is admin-gated (non-admin cannot handle)', () => {
  const start = source.indexOf('export function markEngagementAlertHandled(');
  const end = source.indexOf('export function markAlertHandled(', start);
  const body = source.slice(start, end > start ? end : start + 500);
  assert.ok(start >= 0);
  assert.match(body, /if \(!isAdmin\(\)\) return \{ error: 'admin' \}/);
});

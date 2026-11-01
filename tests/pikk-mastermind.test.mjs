import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { apiBase, loadOpsSummary, displayStatus } from '../src/mastermind.js';
const page = readFileSync(new URL('../src/pages/mastermind.js', import.meta.url), 'utf8');
const lib = readFileSync(new URL('../src/mastermind.js', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');

test('#/mastermind route is registered', () => { assert.match(main, /'\/mastermind': \{ render: renderMastermind, bind: bindMastermind \}/); });
test('no backend configured => not_connected, never mock data', async () => {
  assert.equal(apiBase({}), ''); assert.equal(apiBase({ VITE_PIKK_API_BASE: 'http://insecure' }), '');
  assert.deepEqual(await loadOpsSummary('', () => { throw new Error('must not fetch'); }), { state: 'not_connected' });
  assert.deepEqual(await loadOpsSummary('https://api.x', async () => { throw new TypeError('network'); }), { state: 'not_connected' });
});
test('401/403/500 map to truthful states', async () => {
  for (const [code, state] of [[401, 'unauthenticated'], [403, 'forbidden'], [500, 'error']])
    assert.equal((await loadOpsSummary('https://api.x', async () => ({ status: code, ok: false }))).state, state);
});
test('ok response passes server panels through; unknown/invalid statuses stay unknown; old checks become stale', async () => {
  const summary = { panels: { vault: { status: 'unknown', checkedAt: null } } };
  const r = await loadOpsSummary('https://api.x', async () => ({ status: 200, ok: true, json: async () => summary }));
  assert.equal(r.state, 'ok'); assert.equal(displayStatus(r.summary.panels.vault), 'unknown');
  assert.equal(displayStatus({ status: 'great' }), 'unknown');
  assert.equal(displayStatus({ status: 'healthy', checkedAt: new Date(0).toISOString(), freshnessLimitSec: 60 }), 'stale');
  assert.equal(displayStatus({ status: 'healthy', checkedAt: new Date().toISOString(), freshnessLimitSec: 60 }), 'healthy');
});
test('Master Mind does not use the unsafe client admin gate or local mock data', () => {
  for (const src of [page, lib]) {
    assert.ok(!/admin=1|setAdminRole|localStorage|indexedDB|media-db/i.test(src));
  }
  assert.ok(page.includes('brand/pikk-official-approved.jpg'), 'uses official PIKK logo asset');
  assert.ok(!/hida/i.test(page));
});

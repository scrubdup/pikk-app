import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('?admin=1 no longer grants admin', () => {
  const admin = read('src/pages/admin.js');
  assert.doesNotMatch(admin, /route\.query\?\.admin\s*===\s*'1'/);
  assert.doesNotMatch(admin, /href="#\/admin\?admin=1"/);
  assert.match(admin, /Staff only/);
  assert.doesNotMatch(read('src/pages/profile.js'), /#\/admin\?admin=1/);
});

test('isAdmin trusts server roles; local role only in dev demo', () => {
  const store = read('src/store.js');
  assert.match(store, /serverRoles\.includes\('admin'\)/);
  assert.match(store, /return isDemoAdminAllowed\(\) && !!\(state\.user && state\.user\.role === 'admin'\)/);
  assert.match(store, /env\.DEV === true && !apiBase/);
  assert.match(store, /if \(on && !isDemoAdminAllowed\(\)\) return \{ error: 'staff_only' \}/);
  assert.match(read('src/main.js'), /setServerRoles\(session\?\.roles \|\| \[\]\)/);
});

test('safety client maps to backend /reports and /blocks with honest fallback labels', async () => {
  globalThis.window = { __PIKK_API_BASE__: 'https://api.example' };
  const calls = [];
  globalThis.fetch = async (url, init) => { calls.push([url, init]); return { ok: true, json: async () => ({ ok: true }) }; };
  const m = await import('../src/api/safety-client.js');
  assert.equal(m.isSafetyApiConfigured(), true);
  await m.safetyApi.report({ targetType: 'user', targetId: 'bob', category: 'harassment', details: 'x' });
  await m.safetyApi.block('@bob');
  assert.equal(calls[0][0], 'https://api.example/reports');
  assert.deepEqual(JSON.parse(calls[0][1].body), { target_type: 'user', target_id: 'bob', category: 'harassment', details: 'x' });
  assert.equal(calls[0][1].credentials, 'include');
  assert.equal(calls[1][0], 'https://api.example/blocks');
  assert.deepEqual(JSON.parse(calls[1][1].body), { handle: 'bob' });
  await assert.rejects(m.safetyApi.report({ targetType: 'nope', targetId: 'x', category: 'spam' }));
  assert.equal(m.validateReport({ targetType: 'post', targetId: 'p1', category: 'made_up' }), 'invalid_category');
  assert.match(m.LOCAL_ONLY_REPORT_NOTE, /Not sent to PIKK moderators/);
  assert.match(m.LOCAL_ONLY_BLOCK_NOTE, /does not block them across PIKK/);
  assert.equal(m.safetyErrorMessage({ code: 'duplicate_report' }), 'You already have an open report on this.');
  delete globalThis.window;
});

test('Messages only claims server block/report on success', () => {
  const msg = read('src/pages/messages.js');
  assert.match(msg, /safetyApi\.block\(handle\)/);
  assert.match(msg, /Blocked across PIKK/);
  assert.match(msg, /LOCAL_ONLY_BLOCK_NOTE/);
  assert.match(msg, /Report sent to PIKK moderators/);
});

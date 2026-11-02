import test from 'node:test';
import assert from 'node:assert/strict';

// Browser-ish globals before importing app modules.
const mem = new Map();
globalThis.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
globalThis.window = { __PIKK_API_BASE__: 'https://api.example' };
globalThis.location = { hash: '#/messages' };
globalThis.document = { getElementById: () => null, querySelector: () => null };

const calls = [];
globalThis.fetch = async (url, init = {}) => {
  calls.push({ url, method: init.method || 'GET', body: init.body ? JSON.parse(init.body) : undefined });
  if (url.endsWith('/messages/conversations/cnv_1') && (init.method || 'GET') === 'GET') {
    return { ok: true, json: async () => ({ conversation: { id: 'cnv_1', peer: { id: 'u_bob', handle: 'bob_99', display_name: 'Bob' } }, messages: [] }) };
  }
  return { ok: true, json: async () => ({ ok: true }) };
};

const store = await import('../src/store.js');
const msgs = await import('../src/pages/messages.js');

function fakeButton(dataset) {
  const handlers = {};
  return { dataset, addEventListener: (ev, fn) => { handlers[ev] = fn; }, click: () => handlers.click?.() };
}
const flush = () => new Promise((r) => setTimeout(r, 0));

test('persistent Messages thread: clicking Report and Block sends POST /reports and /blocks with the peer handle', async () => {
  store.syncRemoteAuthUser({ id: 'u_me', handle: 'me_user', email: 'me@example.com', email_verified: true });
  assert.equal(store.getState().user.authSource, 'backend');
  const blockBtn = fakeButton({ remoteFlag: 'block' });
  const reportBtn = fakeButton({ remoteFlag: 'report' });
  const host = {
    dataset: { threadId: 'cnv_1' },
    innerHTML: '',
    querySelector: () => null,
    querySelectorAll: (sel) => (sel === '[data-remote-flag]' ? [blockBtn, reportBtn] : []),
  };
  const root = {
    querySelectorAll: () => [],
    querySelector: (sel) => (sel === '#persistentMessageThread' ? host : null),
  };
  msgs.bindMessages(root);
  for (let i = 0; i < 5; i++) await flush();
  assert.match(host.innerHTML, /data-remote-flag="block" data-peer-handle="bob_99"/);
  assert.match(host.innerHTML, /data-remote-flag="report"/);
  calls.length = 0;
  blockBtn.click();
  reportBtn.click();
  for (let i = 0; i < 5; i++) await flush();
  const block = calls.find((c) => c.url === 'https://api.example/blocks');
  const report = calls.find((c) => c.url === 'https://api.example/reports');
  assert.ok(block, 'POST /blocks went out');
  assert.equal(block.method, 'POST');
  assert.deepEqual(block.body, { handle: 'bob_99' });
  assert.ok(report, 'POST /reports went out');
  assert.equal(report.method, 'POST');
  assert.deepEqual(report.body, { target_type: 'user', target_id: 'bob_99', category: 'harassment', details: 'Reported from Messages' });
});

test('runPeerSafetyAction reports success text only after server confirms', async () => {
  const seen = [];
  calls.length = 0;
  assert.equal(await msgs.runPeerSafetyAction('block', '@bob_99', { notify: (m) => seen.push(m) }), 'Blocked across PIKK');
  assert.equal(await msgs.runPeerSafetyAction('report', 'bob_99', { notify: (m) => seen.push(m) }), 'Report sent to PIKK moderators');
  assert.equal(calls.length, 2);
});

test('device-only fallback: no handle or no API means no request and honest label', async () => {
  calls.length = 0;
  const seen = [];
  const b = await msgs.runPeerSafetyAction('block', '', { notify: (m) => seen.push(m) });
  assert.match(b, /does not block them across PIKK/);
  const saved = globalThis.window.__PIKK_API_BASE__;
  globalThis.window.__PIKK_API_BASE__ = '';
  const r = await msgs.runPeerSafetyAction('report', 'bob_99', { notify: (m) => seen.push(m) });
  globalThis.window.__PIKK_API_BASE__ = saved;
  assert.match(r, /Not sent to PIKK moderators/);
  assert.equal(calls.length, 0);
});

test('local DM threads carry a real peer handle from profile/backend data', () => {
  assert.equal(store.resolveThreadPeerHandle({ kind: 'dm', peerId: 'x', peerHandle: '@bob_99' }), 'bob_99');
  assert.equal(store.resolveThreadPeerHandle({ kind: 'group', peerId: 'g', peerHandle: 'bob_99' }), '');
  assert.equal(store.resolveThreadPeerHandle({ kind: 'dm', peerId: 'x', peerHandle: 'bad handle!' }), '');
  const t = store.getOrCreateThread('u_carol', 'Carol', { peerHandle: 'carol_c' });
  assert.equal(t.peerHandle, 'carol_c');
  assert.equal(store.getThread(t.id).peerHandle, 'carol_c');
});

const local = await import('../src/pages/messages.js');
const userPage = await import('../src/pages/user.js');

function fakeRoot(buttons) {
  return { querySelectorAll: (sel) => (sel === '[data-flag]' ? buttons : []), querySelector: () => null };
}

test('device-only view: Report/Block on a thread WITH a server handle send the requests', async () => {
  store.syncRemoteAuthUser({ id: 'u_me', handle: 'me_user', email: 'me@example.com', email_verified: true });
  const t = store.getOrCreateThread('u_dana', 'Dana', { peerHandle: 'dana_d' });
  const block = fakeButton({ flag: 'block' });
  const report = fakeButton({ flag: 'report' });
  local.bindLocalThreadFlags(fakeRoot([block, report]), store.getThread(t.id), { go: () => {} });
  calls.length = 0;
  block.click(); report.click();
  for (let i = 0; i < 5; i++) await flush();
  assert.deepEqual(calls.find((c) => c.url.endsWith('/blocks'))?.body, { handle: 'dana_d' });
  assert.deepEqual(calls.find((c) => c.url.endsWith('/reports'))?.body, { target_type: 'user', target_id: 'dana_d', category: 'harassment', details: 'Reported from Messages' });
});

test('device-only view: seeded demo contact WITHOUT a handle sends nothing and is labeled', async () => {
  const t = store.getOrCreateThread('maya', 'MayaBeats');
  assert.equal(store.resolveThreadPeerHandle(store.getThread(t.id)), '');
  const block = fakeButton({ flag: 'block' });
  const report = fakeButton({ flag: 'report' });
  local.bindLocalThreadFlags(fakeRoot([block, report]), store.getThread(t.id), { go: () => {} });
  calls.length = 0;
  block.click(); report.click();
  for (let i = 0; i < 5; i++) await flush();
  assert.equal(calls.length, 0);
  const src = (await import('node:fs')).readFileSync(new URL('../src/pages/messages.js', import.meta.url), 'utf8');
  assert.match(src, /Demo contact · Report and Block save on this device only/);
  assert.match(src, /Demo · device-only/);
});

test('server user profile: clicking Report and Block sends the requests with that handle', async () => {
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url, method: init.method || 'GET', body: init.body ? JSON.parse(init.body) : undefined });
    if (url.endsWith('/users/erin_e')) return { ok: true, json: async () => ({ user: { handle: 'erin_e', display_name: 'Erin', bio: '' } }) };
    return { ok: true, json: async () => ({ ok: true }) };
  };
  const btns = {};
  const host = {
    dataset: { handle: 'erin_e' },
    innerHTML: '',
    querySelectorAll: (sel) => {
      if (sel === '[data-user-flag]') return [btns.block, btns.report];
      return [];
    },
  };
  btns.block = fakeButton({ userFlag: 'block', peerHandle: 'erin_e' });
  btns.report = fakeButton({ userFlag: 'report', peerHandle: 'erin_e' });
  calls.length = 0;
  await userPage.bindUser({ querySelector: (s) => (s === '#serverUserHost' ? host : null) });
  assert.equal(calls[0].url, 'https://api.example/users/erin_e');
  assert.match(host.innerHTML, /data-user-flag="block" data-peer-handle="erin_e"/);
  assert.match(host.innerHTML, /data-user-flag="report" data-peer-handle="erin_e"/);
  calls.length = 0;
  btns.block.click(); btns.report.click();
  for (let i = 0; i < 5; i++) await flush();
  assert.deepEqual(calls.find((c) => c.url.endsWith('/blocks'))?.body, { handle: 'erin_e' });
  assert.deepEqual(calls.find((c) => c.url.endsWith('/reports'))?.body, { target_type: 'user', target_id: 'erin_e', category: 'harassment', details: 'Reported from profile' });
  assert.doesNotMatch(userPage.renderServerUserCard({ handle: 'me_user' }, { selfHandle: 'me_user' }), /data-user-flag/);
});

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

import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';

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
    querySelector: (sel) => (sel === '[data-report-category]' ? { value: 'harassment' } : null),
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
  assert.equal(await msgs.runPeerSafetyAction('report', 'bob_99', { notify: (m) => seen.push(m), category: 'spam' }), 'Report sent to PIKK moderators');
  assert.equal(calls.length, 2);
});

test('device-only fallback: no handle or no API means no request and honest label', async () => {
  calls.length = 0;
  const seen = [];
  const b = await msgs.runPeerSafetyAction('block', '', { notify: (m) => seen.push(m) });
  assert.match(b, /does not block them across PIKK/);
  const saved = globalThis.window.__PIKK_API_BASE__;
  globalThis.window.__PIKK_API_BASE__ = '';
  const r = await msgs.runPeerSafetyAction('report', 'bob_99', { notify: (m) => seen.push(m), category: 'spam' });
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

function fakeRoot(buttons, category = 'harassment') {
  return { querySelectorAll: (sel) => (sel === '[data-flag]' ? buttons : []), querySelector: (sel) => (sel === '[data-report-category]' ? { value: category } : null) };
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
  // Rendered page (DOM) shows the honest device-only label and no server claim.
  const saved = globalThis.window.__PIKK_API_BASE__;
  globalThis.window.__PIKK_API_BASE__ = '';
  try {
    const html = local.renderMessages({ query: { t: t.id } });
    const { document: doc } = parseHTML('<!doctype html><html><body>' + html + '</body></html>');
    const note = doc.querySelector('.msg-device-only-note');
    assert.ok(note, 'device-only note rendered');
    assert.match(note.textContent, /save on this device only/);
    const sel = doc.querySelector('select[data-report-category]');
    assert.ok(sel, 'category picker rendered');
    assert.equal(sel.value, '');
    const newChat = parseHTML('<!doctype html><html><body>' + local.renderMessages({ query: { view: 'new' } }) + '</body></html>').document;
    const demoBtn = [...newChat.querySelectorAll('[data-start-peer]')].find((b) => b.getAttribute('data-start-peer') !== 'dbs');
    assert.ok(demoBtn);
    assert.equal(demoBtn.getAttribute('data-peer-handle'), '');
    assert.match(demoBtn.closest('article').textContent, /Demo · device-only/);
  } finally {
    globalThis.window.__PIKK_API_BASE__ = saved;
  }
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
    querySelector: (sel) => (sel === '[data-report-category]' ? { value: 'impersonation' } : null),
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
  assert.deepEqual(calls.find((c) => c.url.endsWith('/reports'))?.body, { target_type: 'user', target_id: 'erin_e', category: 'impersonation', details: 'Reported from profile' });
  assert.match(host.innerHTML, /<select data-report-category[^>]*><option value="" selected>/);
  assert.doesNotMatch(userPage.renderServerUserCard({ handle: 'me_user' }, { selfHandle: 'me_user' }), /data-user-flag/);
});

test('new chat from a contact button carries data-peer-handle into the thread', async () => {
  const saved = globalThis.window.__PIKK_API_BASE__;
  globalThis.window.__PIKK_API_BASE__ = '';
  try {
    globalThis.location = { hash: '#/messages?view=new' };
    const btn = fakeButton({ startPeer: 'u_frank', peerName: 'Frank', peerHandle: 'frank_f' });
    const root = { querySelectorAll: (sel) => (sel === '[data-start-peer]' ? [btn] : []), querySelector: () => null, addEventListener: () => {} };
    local.bindMessages(root);
    btn.click();
    const t = store.listThreads().find((x) => x.peerId === 'u_frank') || Object.values(store.getState().threads).find((x) => x.peerId === 'u_frank');
    assert.ok(t, 'thread created');
    assert.equal(t.peerHandle, 'frank_f');
  } finally {
    globalThis.window.__PIKK_API_BASE__ = saved;
    globalThis.location = { hash: '#/messages' };
  }
});

test('Report requires a backend-allowed category: none selected sends nothing', async () => {
  const { REPORT_CATEGORIES } = await import('../src/api/safety-client.js');
  const { renderReportCategorySelect, REPORT_CATEGORY_REQUIRED } = await import('../src/safety-actions.js');
  const { document: doc } = parseHTML('<!doctype html><html><body>' + renderReportCategorySelect('data-report-category') + '</body></html>');
  const opts = [...doc.querySelectorAll('option')].map((o) => o.getAttribute('value'));
  assert.deepEqual(opts, ['', ...REPORT_CATEGORIES]);
  assert.equal(doc.querySelector('select').value, '');
  // profile, Messages local, Messages persistent: empty category => no request
  calls.length = 0;
  const t = store.getOrCreateThread('u_gus', 'Gus', { peerHandle: 'gus_g' });
  const rep = fakeButton({ flag: 'report' });
  local.bindLocalThreadFlags(fakeRoot([rep], ''), store.getThread(t.id), { go: () => {} });
  rep.click();
  assert.equal(store.getThread(t.id).reportedAt || null, null, 'thread must not be marked reported without a category');
  assert.equal(await msgs.runPeerSafetyAction('report', 'gus_g', { notify: () => {} }), REPORT_CATEGORY_REQUIRED);
  assert.equal(await msgs.runPeerSafetyAction('report', 'gus_g', { notify: () => {}, category: 'made_up' }), REPORT_CATEGORY_REQUIRED);
  const pBtn = fakeButton({ userFlag: 'report', peerHandle: 'gus_g' });
  userPage.bindServerUserActions({ querySelector: () => ({ value: '' }), querySelectorAll: (s) => (s === '[data-user-flag]' ? [pBtn] : []) });
  pBtn.click();
  for (let i = 0; i < 5; i++) await flush();
  assert.equal(calls.filter((c) => c.url.endsWith('/reports')).length, 0);
});

test('Block, Report and the category picker are 44px tap targets', async () => {
  const fs = await import('node:fs');
  const css = fs.readFileSync(new URL('../src/pikk-pages.css', import.meta.url), 'utf8');
  // Picker is a <select>, not .btn — require the non-btn rule (must not match only the .btn rule).
  assert.match(css, /html body \.pikk-safety-tap\{[^}]*min-height:44px/);
  assert.match(css, /html body \.page \.btn\.pikk-safety-tap\{[^}]*min-height:44px/);
  const { renderReportCategorySelect } = await import('../src/safety-actions.js');
  const { document: doc } = parseHTML('<!doctype html><html><body>' + renderReportCategorySelect('data-report-category') + '</body></html>');
  assert.ok(doc.querySelector('select').classList.contains('pikk-safety-tap'));
  for (const f of ['../src/pages/messages.js', '../src/pages/user.js']) {
    const src = fs.readFileSync(new URL(f, import.meta.url), 'utf8');
    const btns = src.match(/<button[^>]*data-(?:flag|remote-flag|user-flag)="(?:block|report)"[^>]*>/g) || [];
    assert.ok(btns.length >= 2, f);
    for (const b of btns) assert.match(b, /pikk-safety-tap/, f + ': ' + b);
  }
});

test('.btn.pikk-safety-tap rule out-specifies `.page .btn{min-height:37px}` and no !important override', async () => {
  const fs = await import('node:fs');
  const css = fs.readFileSync(new URL('../src/pikk-pages.css', import.meta.url), 'utf8');
  const styles = fs.readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
  assert.match(css, /html body \.page \.btn\.pikk-safety-tap\{[^}]*min-height:44px/);
  // specificity (ids, classes, types): .page .btn = (0,2,0); html body .page .btn.pikk-safety-tap = (0,3,2)
  const spec = (sel) => [0, (sel.match(/\.[\w-]+/g) || []).length, (sel.replace(/\.[\w-]+/g, '').match(/\b[a-z]+\b/g) || []).length];
  const cmp = (a, b) => a.findIndex((v, i) => v !== b[i]);
  const a = spec('html body .page .btn.pikk-safety-tap'), b = spec('.page .btn');
  const i = cmp(a, b);
  assert.ok(i >= 0 && a[i] > b[i], JSON.stringify({ a, b }));
  // !important on .page .btn min-height beats our higher-specificity rule — forbid it in app CSS.
  const adverse = /\.page\s+\.btn[^{]*\{[^}]*min-height\s*:\s*[^;}]+!important/;
  assert.doesNotMatch(css, adverse);
  assert.doesNotMatch(styles, adverse);
});

test('rendered 44px safety taps at 360/390/430 are checked in CI', async () => {
  const fs = await import('node:fs');
  const sc = fs.readFileSync(new URL('../scripts/measure-safety-tap-targets.mjs', import.meta.url), 'utf8');
  const wf = fs.readFileSync(new URL('../.github/workflows/pikk-safety-tap-visual.yml', import.meta.url), 'utf8');
  assert.match(sc, /getBoundingClientRect/);
  assert.match(sc, /\[360, 390, 430\]/);
  assert.match(sc, /h >= 44/);
  assert.match(sc, /picker|SELECT/);
  assert.match(wf, /measure-safety-tap-targets\.mjs/);
  assert.match(wf, /src\/\*\.css/);
  assert.match(wf, /playwright@1\.56\.1/);
});

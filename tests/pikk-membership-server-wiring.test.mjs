// Real-module DOM tests (linkedom) for GET /memberships/me wiring: auth sequence, identity tie, stale responses,
// duplicate fetches, failure/sign-out clearing, no local grant, no entitlement inference, honest read-only UI.
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';

const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => mem.set(k, String(v)),
  removeItem: (k) => mem.delete(k),
  clear: () => mem.clear(),
};
const { document, window } = parseHTML('<!doctype html><html><body><main id="app"></main></body></html>');
globalThis.document = document;
globalThis.window = window;
globalThis.CustomEvent = window.CustomEvent;
if (!globalThis.location) globalThis.location = window.location || { hash: '#/profile', href: 'https://app.test/#/profile' };
window.scrollTo = window.scrollTo || (() => {});
globalThis.confirm = () => false;

const API = 'https://api.test';
const FIXTURE_PLAN = 'testonly_plan'; // test-only plan id; not a real catalog entry

// ---- mock HTTP layer ----
const calls = [];
const routes = new Map(); // "METHOD path" -> handler(call) => {status, body} | Promise
function deferred() { let resolve; const p = new Promise((r) => { resolve = r; }); return { p, resolve }; }
function json(status, body) { return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }); }
globalThis.fetch = async (url, init = {}) => {
  const u = new URL(url); const method = init.method || 'GET';
  const call = { method, path: u.pathname, origin: u.origin, credentials: init.credentials, body: init.body ? JSON.parse(init.body) : undefined };
  calls.push(call);
  const h = routes.get(`${method} ${u.pathname}`);
  if (!h) return json(404, { error: { code: 'not_found', message: 'no route' } });
  const r = await h(call);
  return json(r.status, r.body);
};
const memberCalls = () => calls.filter((c) => c.path === '/memberships/me');
const inactiveBody = (over = {}) => ({ membership: { status: 'inactive', plan: null, source: 'none', authoritative: true, billing_configured: false, activation: 'not_available', billing_reason: 'billing_disabled', subscription_status: null, current_period_end: null, cancel_at_period_end: false, entitlements: null, entitlement_policy: 'unconfigured', ...over } });
const activeBody = (over = {}) => inactiveBody({ status: 'active', plan: FIXTURE_PLAN, source: 'stripe_subscription', billing_configured: true, activation: 'stripe_checkout', billing_reason: null, subscription_status: 'active', current_period_end: '2099-01-31T00:00:00.000Z', ...over });

window.__PIKK_API_BASE__ = API;
const store = await import('../src/store.js');
const readiness = await import('../src/auth/readiness.js');
const sync = await import('../src/membership-sync.js');
const view = await import('../src/membership-view.js');
const shells = await import('../src/pages/shells.js');
const profile = await import('../src/pages/profile.js');
const tick = () => new Promise((r) => setTimeout(r, 0));

function reset() {
  calls.length = 0; routes.clear(); mem.clear();
  window.__PIKK_API_BASE__ = API;
  readiness.clearLiveAuthMe();
  store.clearAuthenticatedUser();
  sync.resetMembershipSync('idle');
}

test('success: fetch only after live /auth/me identity, tied to that identity, credentials included', async () => {
  reset();
  routes.set('GET /memberships/me', () => ({ status: 200, body: activeBody() }));
  assert.equal(await sync.requestMembershipSync(), null, 'no live identity => no fetch');
  assert.equal(memberCalls().length, 0);
  readiness.noteLiveAuthMe({ id: 'u_a' });
  const m = await sync.requestMembershipSync();
  assert.equal(memberCalls().length, 1);
  assert.equal(memberCalls()[0].origin, API); assert.equal(memberCalls()[0].credentials, 'include');
  assert.equal(m.status, 'active'); assert.equal(m.userId, 'u_a'); assert.equal(m.plan, FIXTURE_PLAN);
  const v = sync.getMembershipView();
  assert.equal(v.phase, 'ready'); assert.equal(v.status, 'active');
  assert.match(view.membershipViewText(v), /Active membership · plan testonly_plan · current period ends 2099-01-31 · member perks are not enabled yet/);
});

test('entitlements null: an active plan never grants Vault tiers / perks by inference, even for tier-like plan ids', async () => {
  reset();
  for (const plan of ['inner', 'backstage', 'skeet+', FIXTURE_PLAN]) {
    routes.set('GET /memberships/me', () => ({ status: 200, body: activeBody({ plan }) }));
    readiness.noteLiveAuthMe({ id: `u_${plan.replace(/\W/g, '')}` });
    await sync.requestMembershipSync();
    assert.equal(store.getServerMembership().status, 'active');
    assert.equal(store.getMembership(), null, plan);
    for (const lvl of ['skeet', 'backstage', 'inner']) assert.equal(store.hasVaultAccess(lvl), false, `${plan}/${lvl}`);
  }
  const persisted = [...mem.values()].join('\n');
  assert.ok(!/testonly_plan|stripe_subscription|"inner"|backstage/.test(persisted), 'server membership never persisted to localStorage');
  assert.equal(mem.get('pikk.membership.v1'), undefined);
});

test('duplicate fetch: concurrent requests for the same identity share one HTTP call', async () => {
  reset();
  const d = deferred();
  routes.set('GET /memberships/me', () => d.p);
  readiness.noteLiveAuthMe({ id: 'u_a' });
  const p1 = sync.requestMembershipSync(); const p2 = sync.requestMembershipSync(); const p3 = sync.requestMembershipSync();
  assert.equal(p1, p2); assert.equal(p2, p3);
  await tick();
  assert.equal(memberCalls().length, 1);
  assert.equal(sync.getMembershipView().phase, 'loading');
  d.resolve({ status: 200, body: inactiveBody() });
  await p1;
  assert.equal(sync.getMembershipView().status, 'inactive');
});

test('stale response: a late A response never mutates B after an account switch', async () => {
  reset();
  const dA = deferred(); const dB = deferred(); let n = 0;
  routes.set('GET /memberships/me', () => (++n === 1 ? dA.p : dB.p));
  readiness.noteLiveAuthMe({ id: 'u_a' });
  const pA = sync.requestMembershipSync(); await tick();
  readiness.noteLiveAuthMe({ id: 'u_b' }); // account switch
  assert.equal(store.getServerMembership().userId, null, 'A state dropped at switch');
  const pB = sync.requestMembershipSync(); await tick();
  assert.notEqual(pA, pB); assert.equal(memberCalls().length, 2);
  dB.resolve({ status: 200, body: inactiveBody() }); await pB;
  dA.resolve({ status: 200, body: activeBody() }); assert.equal(await pA, null);
  const m = store.getServerMembership();
  assert.equal(m.userId, 'u_b'); assert.equal(m.status, 'inactive');
  assert.equal(sync.getMembershipView().status, 'inactive');
});

test('stale response: sign-out while in flight discards the late active response', async () => {
  reset();
  const d = deferred();
  routes.set('GET /memberships/me', () => d.p);
  readiness.noteLiveAuthMe({ id: 'u_a' });
  const p = sync.requestMembershipSync(); await tick();
  readiness.clearLiveAuthMe();
  d.resolve({ status: 200, body: activeBody() });
  assert.equal(await p, null);
  assert.equal(store.getServerMembership().status, 'inactive'); assert.equal(store.getServerMembership().userId, null);
  assert.equal(sync.getMembershipView().phase, 'signed_out');
});

test('failure: 401 / 5xx / network / malformed bodies clear membership (fail closed), never active', async () => {
  reset();
  readiness.noteLiveAuthMe({ id: 'u_a' });
  routes.set('GET /memberships/me', () => ({ status: 200, body: activeBody() }));
  await sync.requestMembershipSync(); assert.equal(store.getServerMembership().status, 'active');
  const cases = [
    [() => ({ status: 401, body: { error: { code: 'unauthenticated' } } }), 'signed_out'],
    [() => ({ status: 503, body: { error: { code: 'x' } } }), 'error'],
    [() => { throw new TypeError('network down'); }, 'error'],
    [() => ({ status: 200, body: { membership: { status: 'active', plan: FIXTURE_PLAN } } }), 'error'], // not authoritative
    [() => ({ status: 200, body: activeBody({ status: 'gold' }) }), 'error'],
    [() => ({ status: 200, body: activeBody({ plan: null }) }), 'error'],
    [() => ({ status: 200, body: activeBody({ plan: '<img src=x>' }) }), 'error'],
    [() => ({ status: 200, body: activeBody({ current_period_end: 'soon' }) }), 'error'],
    [() => ({ status: 200, body: { nope: true } }), 'error'],
  ];
  for (const [h, phase] of cases) {
    routes.set('GET /memberships/me', () => ({ status: 200, body: activeBody() }));
    await sync.requestMembershipSync(); assert.equal(store.getServerMembership().status, 'active');
    routes.set('GET /memberships/me', h);
    assert.equal(await sync.requestMembershipSync(), null);
    assert.equal(store.getServerMembership().status, 'inactive', phase);
    assert.equal(sync.getMembershipView().phase, phase);
    assert.equal(sync.getMembershipView().status, undefined);
  }
  assert.equal(view.membershipViewText({ mode: 'api', phase: 'error' }), 'Membership status is unavailable right now.');
});

test('no API configured (demo mode): no fetch, demo view, existing local behaviour untouched', async () => {
  reset();
  delete window.__PIKK_API_BASE__;
  routes.set('GET /memberships/me', () => ({ status: 200, body: activeBody() }));
  readiness.noteLiveAuthMe({ id: 'u_a' });
  assert.equal(await sync.requestMembershipSync(), null);
  assert.equal(memberCalls().length, 0);
  assert.deepEqual(sync.getMembershipView(), { mode: 'demo' });
  const html = shells.renderPricing();
  const root = document.createElement('div'); root.innerHTML = html;
  const btns = [...root.querySelectorAll('[data-join]')];
  assert.equal(btns.length, 3); assert.ok(btns.every((b) => !b.hasAttribute('disabled')));
  assert.equal(root.querySelector('[data-server-membership]'), null);
  assert.equal(root.querySelector('[data-membership-checkout-note]'), null);
  window.__PIKK_API_BASE__ = API;
});

test('Pricing (API mode): Join/Subscribe disabled, no local grant, honest read-only status painted from the server', async () => {
  reset();
  routes.set('GET /memberships/me', () => ({ status: 200, body: inactiveBody() }));
  const root = document.getElementById('app');
  // signed out
  root.innerHTML = shells.renderPricing(); shells.bindPricing(root);
  const st = () => root.querySelector('[data-server-membership="text"]');
  assert.equal(st().textContent, 'Sign in to see your membership status.');
  assert.equal(memberCalls().length, 0);
  const btns = [...root.querySelectorAll('[data-join]')];
  assert.equal(btns.length, 3);
  for (const b of btns) { assert.ok(b.hasAttribute('disabled')); assert.equal(b.getAttribute('aria-disabled'), 'true'); b.click(); }
  assert.equal(root.querySelector('[data-join-confirm]').hidden, true, 'no join dialog');
  assert.equal(mem.get('pikk.membership.v1'), undefined, 'no localStorage self-grant');
  assert.ok(root.querySelector('[data-membership-checkout-note]'));
  // tier names/prices preview preserved
  assert.deepEqual([...root.querySelectorAll('.pikk-tier strong')].map((e) => e.textContent).filter((t) => t.startsWith('$')), ['$3.99/mo', '$7.99/mo', '$12.99/mo']);
  // signed in (live /auth/me) => bind fetches and paints via the change event
  window.addEventListener(sync.MEMBERSHIP_EVENT, (e) => view.paintMembershipStatus(document, e.detail));
  readiness.noteLiveAuthMe({ id: 'u_a' });
  root.innerHTML = shells.renderPricing(); shells.bindPricing(root);
  assert.equal(st().textContent, 'Checking membership status…');
  await tick(); await tick();
  assert.equal(memberCalls().length, 1);
  assert.equal(st().textContent, 'No active membership · memberships are not available yet.');
  assert.equal(st().getAttribute('data-membership-status'), 'inactive');
  // active
  routes.set('GET /memberships/me', () => ({ status: 200, body: activeBody({ cancel_at_period_end: true }) }));
  await sync.requestMembershipSync();
  assert.equal(st().textContent, 'Active membership · plan testonly_plan · ends 2099-01-31 · member perks are not enabled yet');
  assert.ok([...root.querySelectorAll('[data-join]')].every((b) => b.hasAttribute('disabled')), 'still read-only when active');
  // sign out clears the painted status
  readiness.clearLiveAuthMe();
  assert.equal(st().textContent, 'Sign in to see your membership status.');
});

test('Profile auth sequence: login -> /auth/me -> /memberships/me for that user; switch; sign out clears; demo perks never leak', async () => {
  reset();
  const users = { a: { id: 'usr_a', handle: 'alpha', display_name: 'Alpha', email: 'a@example.test', email_verified: true }, b: { id: 'usr_b', handle: 'bravo', display_name: 'Bravo', email: 'b@example.test', email_verified: true } };
  let who = 'a'; let loggedIn = false; // signed out until the login click (so only the login path can trigger the fetch)
  routes.set('POST /auth/login', () => { loggedIn = true; return { status: 200, body: { user: users[who] } }; });
  routes.set('GET /auth/me', () => (loggedIn ? { status: 200, body: { user: users[who], roles: [] } } : { status: 401, body: { error: { code: 'unauthenticated' } } }));
  routes.set('POST /auth/logout', () => ({ status: 200, body: { ok: true } }));
  routes.set('GET /memberships/me', () => ({ status: 200, body: who === 'a' ? activeBody() : inactiveBody() }));
  window.addEventListener(sync.MEMBERSHIP_EVENT, (e) => view.paintMembershipStatus(document, e.detail));
  const root = document.getElementById('app');
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root);
  for (let i = 0; i < 4; i++) await tick();
  assert.equal(memberCalls().length, 0, 'signed out: no membership fetch');
  root.querySelector('#loginEmail').value = 'a@example.test'; root.querySelector('#loginPassword').value = 'x';
  root.querySelector('#loginAccountBtn').click();
  for (let i = 0; i < 6; i++) await tick();
  assert.equal(readiness.getLiveAuthMeUserId(), 'usr_a');
  const order = calls.map((c) => `${c.method} ${c.path}`);
  assert.ok(order.indexOf('GET /memberships/me') > order.indexOf('GET /auth/me'), order.join(','));
  assert.equal(store.getServerMembership().userId, 'usr_a'); assert.equal(store.getServerMembership().status, 'active');
  assert.equal(store.hasVaultAccess('skeet'), false);
  // render the signed-in profile: server chip, and a forged local demo perk flag does not show
  store.setState({ user: { ...store.getState().user, memberships: { innerCircle: true }, membership: 'inner' } });
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} });
  const chip = root.querySelector('[data-server-membership="chip"]');
  assert.ok(chip); assert.equal(chip.textContent, 'Member · plan testonly_plan');
  assert.ok(![...root.querySelectorAll('.chip')].some((c) => /Inner Circle|Backstage|PIKK\+/.test(c.textContent)), 'no demo tier chip in API mode');
  assert.equal(store.hasVaultAccess('inner'), false);
  // account switch to B
  who = 'b';
  readiness.noteLiveAuthMe(users.b);
  assert.equal(store.getServerMembership().userId, null);
  await sync.requestMembershipSync();
  assert.equal(store.getServerMembership().userId, 'usr_b'); assert.equal(store.getServerMembership().status, 'inactive');
  // sign out
  profile.bindProfile(root);
  const before = memberCalls().length;
  root.querySelector('#signoutBtn').click();
  for (let i = 0; i < 4; i++) await tick();
  assert.equal(readiness.getLiveAuthMeUserId(), null);
  assert.equal(store.getServerMembership().status, 'inactive'); assert.equal(store.getServerMembership().userId, null);
  assert.equal(sync.getMembershipView().phase, 'signed_out');
  assert.ok(memberCalls().length >= before);
});

test('residual 2: impossible calendar dates are rejected (not normalized); real dates incl. leap day accepted', async () => {
  reset();
  readiness.noteLiveAuthMe({ id: 'u_dates' });
  const bad = ['2026-02-30T00:00:00.000Z', '2026-13-01T00:00:00Z', '2027-02-29T00:00:00Z', '2026-04-31T00:00:00Z', '2026-01-00T00:00:00Z',
    '2026-01-01T24:00:00Z', '2026-01-01T23:60:00Z', '2026-01-01T23:59:60Z', '2026-01-01T10:60:00Z', '2026-01-01T10:00:60Z', '2026-00-10T00:00:00Z', '2026-01-01T00:00:00.1234Z', '2026-01-01T00:00:00+00:00'];
  for (const d of bad) {
    assert.equal(sync.isStrictIsoUtc(d), false, d);
    routes.set('GET /memberships/me', () => ({ status: 200, body: activeBody({ current_period_end: d }) }));
    await sync.requestMembershipSync();
    assert.equal(sync.getMembershipView().phase, 'error', d);
    assert.equal(store.getServerMembership().status, 'inactive', d);
  }
  for (const d of ['2028-02-29T00:00:00Z', '2026-12-31T23:59:59.999Z', '2026-02-28T12:00:00.5Z']) {
    assert.equal(sync.isStrictIsoUtc(d), true, d);
    routes.set('GET /memberships/me', () => ({ status: 200, body: activeBody({ current_period_end: d }) }));
    await sync.requestMembershipSync();
    assert.equal(sync.getMembershipView().phase, 'ready', d);
    assert.ok(view.membershipViewText(sync.getMembershipView()).includes(d.slice(0, 10)), d);
  }
});

test('residual 2: perks note never disappears on unknown entitlements; plan id shown verbatim, not mapped to demo tier names', async () => {
  reset();
  readiness.noteLiveAuthMe({ id: 'u_ent' });
  for (const ent of [null, {}, { vault: 'inner', ad_free: true, unknown_x: 1 }]) {
    routes.set('GET /memberships/me', () => ({ status: 200, body: activeBody({ plan: 'inner', entitlements: ent }) }));
    await sync.requestMembershipSync();
    const v = sync.getMembershipView();
    const t = view.membershipViewText(v);
    assert.ok(t.endsWith('· member perks are not enabled yet'), JSON.stringify(ent));
    assert.ok(t.includes('plan inner')); assert.ok(!/Inner Circle|Backstage|PIKK\+/.test(t));
    assert.equal(view.membershipChipText(v), 'Member · plan inner');
    assert.equal(store.getMembership(), null);
    for (const lvl of ['skeet', 'backstage', 'inner']) assert.equal(store.hasVaultAccess(lvl), false);
  }
});

test('residual 2: status copy is rendered as text (escaped), never parsed as markup', async () => {
  reset();
  readiness.noteLiveAuthMe({ id: 'u_esc' });
  routes.set('GET /memberships/me', () => ({ status: 200, body: activeBody({ plan: 'a.b+c_d-1' }) }));
  await sync.requestMembershipSync();
  const root = document.createElement('div');
  root.innerHTML = shells.renderPricing();
  const st = root.querySelector('[data-server-membership="text"]');
  assert.equal(st.children.length, 0);
  assert.equal(st.textContent, 'Active membership · plan a.b+c_d-1 · current period ends 2099-01-31 · member perks are not enabled yet');
  view.paintMembershipStatus(root, { mode: 'api', phase: 'ready', status: 'active', plan: '<img src=x onerror=1>', current_period_end: null, entitlements: null });
  assert.equal(st.children.length, 0, 'paint uses textContent'); assert.ok(st.textContent.includes('<img src=x onerror=1>'));
});

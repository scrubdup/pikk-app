// Real-module DOM tests (linkedom + mock HTTP): one backend sign-out path for Settings and Profile, and the
// signup probe guard (AG-1). A late /auth/me may never resurrect an identity after sign-out or a new signup.
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';

const mem = new Map();
globalThis.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k), clear: () => mem.clear() };
const { document, window } = parseHTML('<!doctype html><html><body><main id="app"></main><div id="toast"></div></body></html>');
globalThis.document = document; globalThis.window = window; globalThis.CustomEvent = window.CustomEvent;
if (!globalThis.location) globalThis.location = window.location || { hash: '#/settings', href: 'https://app.test/#/settings' };
window.scrollTo = window.scrollTo || (() => {});
globalThis.confirm = () => false;
const API = 'https://api.test';
window.__PIKK_API_BASE__ = API;

const calls = []; const routes = new Map();
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
globalThis.fetch = async (url, init = {}) => {
  const u = new URL(url); const method = init.method || 'GET';
  const key = `${method} ${u.pathname}`; calls.push(key);
  const h = routes.get(key);
  if (!h) return json(404, { error: { code: 'not_found' } });
  const r = await h(); if (r instanceof Error) throw r; return json(r.status, r.body);
};
const deferred = () => { let resolve; const p = new Promise((r) => { resolve = r; }); return { p, resolve }; };
const tick = async (n = 6) => { for (let i = 0; i < n; i++) await new Promise((r) => setTimeout(r, 0)); };

const store = await import('../src/store.js');
const readiness = await import('../src/auth/readiness.js');
const sync = await import('../src/membership-sync.js');
const profile = await import('../src/pages/profile.js');
const settings = await import('../src/pages/settings.js');
const signout = await import('../src/auth/sign-out.js');
const { restoreBackendSession } = await import('../src/auth/restore-session.js');

const A = { id: 'usr_a', handle: 'alpha', display_name: 'Alpha', email: 'a@example.test', email_verified: true };
const B = { id: 'usr_b', handle: 'bravo', display_name: 'Bravo', email: 'b@example.test', email_verified: false };
const activeA = { membership: { status: 'active', plan: 'testonly_plan', authoritative: true, billing_configured: true, current_period_end: '2099-01-31T00:00:00Z', entitlements: null } };
const toastText = () => document.getElementById('toast').textContent;
const count = (k) => calls.filter((c) => c === k).length;
function reset() {
  calls.length = 0; routes.clear(); mem.clear(); window.__PIKK_API_BASE__ = API;
  readiness.clearLiveAuthMe(); store.clearAuthenticatedUser(); sync.resetMembershipSync('idle');
  document.getElementById('toast').textContent = '';
  routes.set('GET /memberships/me', () => ({ status: 200, body: activeA }));
}
const signedOut = () => { assert.equal(readiness.getLiveAuthMeUserId(), null); assert.equal(store.getState().user, null); };
const signInA = async () => {
  routes.set('GET /auth/me', () => ({ status: 200, body: { user: A, roles: [] } }));
  await restoreBackendSession(); await tick();
  assert.equal(readiness.getLiveAuthMeUserId(), 'usr_a'); assert.equal(store.getServerMembership().status, 'active');
};

test('Settings (API mode): honest label, 1 POST /auth/logout, generation bumped BEFORE the POST, all state cleared, late probe ignored, reload stays out', async () => {
  reset();
  await signInA();
  const root = document.getElementById('app');
  root.innerHTML = settings.renderSettings(); settings.bindSettings(root);
  const who = root.querySelector('.pikk-set-who').textContent;
  assert.match(who, /PIKK account/); assert.doesNotMatch(who, /local demo account/);
  // an in-flight /auth/me probe (e.g. Profile) started before sign-out, still carrying the old cookie
  const late = deferred(); routes.set('GET /auth/me', () => late.p);
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root); await tick(2);
  root.innerHTML = settings.renderSettings(); settings.bindSettings(root);
  const g0 = readiness.currentAuthGeneration(); let genAtPost = null;
  routes.set('POST /auth/logout', () => { genAtPost = readiness.currentAuthGeneration(); return { status: 200, body: { ok: true } }; });
  const beforeMember = count('GET /memberships/me');
  root.querySelector('#setSignOut').click(); await tick();
  assert.equal(count('POST /auth/logout'), 1);
  assert.ok(genAtPost > g0, 'generation bumped before POST /auth/logout');
  signedOut();
  assert.equal(store.getServerMembership().status, 'inactive'); assert.equal(store.getServerMembership().userId, null);
  assert.equal(sync.getMembershipView().phase, 'signed_out');
  assert.equal(toastText(), 'Signed out');
  assert.ok(root.querySelector('#setSignIn'), 'settings re-rendered signed out');
  late.resolve({ status: 200, body: { user: A, roles: [] } }); await tick();
  signedOut();
  assert.equal(count('GET /memberships/me'), beforeMember, 'no membership fetch after sign-out');
  // reload: the server session is gone (logout succeeded), so startup restore gets 401 and stays signed out
  routes.set('GET /auth/me', () => ({ status: 401, body: { error: { code: 'unauthenticated' } } }));
  await restoreBackendSession(); await tick();
  signedOut();
});

test('Settings (API mode): server logout failure is reported truthfully; local state is still cleared', async () => {
  for (const fail of [() => ({ status: 500, body: { error: { code: 'x' } } }), () => new TypeError('network down')]) {
    reset();
    await signInA();
    const root = document.getElementById('app');
    root.innerHTML = settings.renderSettings(); settings.bindSettings(root);
    routes.set('POST /auth/logout', fail);
    root.querySelector('#setSignOut').click(); await tick();
    assert.equal(count('POST /auth/logout'), 1);
    signedOut();
    assert.equal(store.getServerMembership().status, 'inactive');
    assert.equal(toastText(), signout.SIGNED_OUT_LOCAL_ONLY_MESSAGE);
    assert.match(toastText(), /server did not confirm/); assert.doesNotMatch(toastText(), /^Signed out$/);
  }
});

test('Profile sign-out uses the same path: truthful failure message, generation bumped before POST', async () => {
  reset();
  await signInA();
  const root = document.getElementById('app');
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root); await tick();
  const g0 = readiness.currentAuthGeneration(); let genAtPost = null;
  routes.set('POST /auth/logout', () => { genAtPost = readiness.currentAuthGeneration(); return { status: 503, body: { error: { code: 'x' } } }; });
  root.querySelector('#signoutBtn').click(); await tick();
  assert.equal(count('POST /auth/logout'), 1); assert.ok(genAtPost > g0);
  signedOut();
  assert.equal(toastText(), signout.SIGNED_OUT_LOCAL_ONLY_MESSAGE);
});

test('Settings demo mode (no API) unchanged: local sign-out, no network, demo label', async () => {
  reset();
  delete window.__PIKK_API_BASE__;
  store.signInLocal('demo_fan');
  const root = document.getElementById('app');
  root.innerHTML = settings.renderSettings(); settings.bindSettings(root);
  assert.match(root.querySelector('.pikk-set-who').textContent, /local demo account/);
  root.querySelector('#setSignOut').click(); await tick();
  assert.equal(calls.length, 0);
  assert.equal(store.getState().user, null); assert.equal(toastText(), 'Signed out');
  window.__PIKK_API_BASE__ = API;
});

function fillSignup(root) {
  const sel = root.querySelector('#signupGender');
  for (const o of sel.querySelectorAll('option')) { if (o.value === 'undisclosed') o.setAttribute('selected', ''); else o.removeAttribute('selected'); }
  for (const [id, v] of [['signupDisplay', 'Bravo'], ['signupHandle', 'bravo'], ['signupEmail', 'b@example.test'], ['signupPassword', 'x']]) root.querySelector('#' + id).value = v;
}

test('AG-1 signup: stale A probes (before and during the pending signup) cannot override B', async () => {
  reset();
  const probe1 = deferred(); const probe2 = deferred(); const signup = deferred(); let n = 0;
  routes.set('GET /auth/me', () => (++n === 1 ? probe1.p : probe2.p));
  routes.set('POST /auth/signup', () => signup.p);
  const root = document.getElementById('app');
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root); await tick(2); // probe #1 (old cookie A)
  fillSignup(root);
  assert.equal(root.querySelector('#signupGender').value, 'undisclosed');
  root.querySelector('#signupAccountBtn').click(); await tick(2);
  assert.equal(count('POST /auth/signup'), 1);
  probe1.resolve({ status: 200, body: { user: A, roles: [] } }); await tick(); // resolves while signup pending
  assert.equal(readiness.getLiveAuthMeUserId(), null, 'stale A ignored during pending signup');
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root); await tick(2); // probe #2 started during pending signup
  // re-bind replaced the button; the original click handler still owns the pending signup
  signup.resolve({ status: 201, body: { user: B } }); await tick();
  assert.equal(readiness.getLiveAuthMeUserId(), 'usr_b'); assert.equal(store.getState().user?.id, 'usr_b');
  probe2.resolve({ status: 200, body: { user: A, roles: [] } }); await tick(); // late, old cookie
  assert.equal(readiness.getLiveAuthMeUserId(), 'usr_b'); assert.equal(store.getState().user?.id, 'usr_b');
});

test('AG-1 signup failure: an older stale A probe is not resurrected after the failed signup', async () => {
  reset();
  const probe = deferred();
  routes.set('GET /auth/me', () => probe.p);
  routes.set('POST /auth/signup', () => ({ status: 409, body: { error: { code: 'handle_taken', message: 'Handle taken' } } }));
  const root = document.getElementById('app');
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root); await tick(2);
  fillSignup(root);
  root.querySelector('#signupAccountBtn').click(); await tick();
  assert.equal(toastText(), 'Handle taken');
  probe.resolve({ status: 200, body: { user: A, roles: [] } }); await tick();
  signedOut();
});

test('AG-1 signup superseded: sign-out while the signup is pending => its result is not applied', async () => {
  reset();
  const signup = deferred();
  routes.set('GET /auth/me', () => ({ status: 401, body: { error: { code: 'unauthenticated' } } }));
  routes.set('POST /auth/signup', () => signup.p);
  routes.set('POST /auth/logout', () => ({ status: 200, body: { ok: true } }));
  const root = document.getElementById('app');
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root); await tick();
  fillSignup(root);
  root.querySelector('#signupAccountBtn').click(); await tick(2);
  await signout.signOutBackendSession();
  signup.resolve({ status: 201, body: { user: B } }); await tick();
  signedOut();
});

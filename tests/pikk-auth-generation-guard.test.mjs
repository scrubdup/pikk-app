// Real-module DOM regression (linkedom + mock HTTP): a late GET /auth/me must never restore a local identity
// after sign-out or an account switch (startup restore, Profile probe, login, verify-email).
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseHTML } from 'linkedom';

const mem = new Map();
globalThis.localStorage = { getItem: (k) => (mem.has(k) ? mem.get(k) : null), setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k), clear: () => mem.clear() };
const { document, window } = parseHTML('<!doctype html><html><body><main id="app"></main></body></html>');
globalThis.document = document; globalThis.window = window; globalThis.CustomEvent = window.CustomEvent;
if (!globalThis.location) globalThis.location = window.location || { hash: '#/profile', href: 'https://app.test/#/profile' };
window.scrollTo = window.scrollTo || (() => {});
globalThis.confirm = () => false;
const API = 'https://api.test';
window.__PIKK_API_BASE__ = API;

const calls = []; const routes = new Map();
const json = (status, body) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
globalThis.fetch = async (url, init = {}) => {
  const u = new URL(url); const method = init.method || 'GET';
  calls.push(`${method} ${u.pathname}`);
  const h = routes.get(`${method} ${u.pathname}`);
  if (!h) return json(404, { error: { code: 'not_found' } });
  const r = await h(); return json(r.status, r.body);
};
const deferred = () => { let resolve; const p = new Promise((r) => { resolve = r; }); return { p, resolve }; };
const tick = async (n = 6) => { for (let i = 0; i < n; i++) await new Promise((r) => setTimeout(r, 0)); };

const store = await import('../src/store.js');
const readiness = await import('../src/auth/readiness.js');
const sync = await import('../src/membership-sync.js');
const profile = await import('../src/pages/profile.js');
const { restoreBackendSession } = await import('../src/auth/restore-session.js');
const verify = await import('../src/pages/verify-email.js');

const A = { id: 'usr_a', handle: 'alpha', display_name: 'Alpha', email: 'a@example.test', email_verified: true };
const B = { id: 'usr_b', handle: 'bravo', display_name: 'Bravo', email: 'b@example.test', email_verified: true };
const inactive = { membership: { status: 'inactive', plan: null, authoritative: true, billing_configured: false, entitlements: null } };
function reset() {
  calls.length = 0; routes.clear(); mem.clear(); window.__PIKK_API_BASE__ = API;
  readiness.clearLiveAuthMe(); store.clearAuthenticatedUser(); sync.resetMembershipSync('idle');
  routes.set('POST /auth/logout', () => ({ status: 200, body: { ok: true } }));
  routes.set('GET /memberships/me', () => ({ status: 200, body: inactive }));
}
const signedOut = () => { assert.equal(readiness.getLiveAuthMeUserId(), null); assert.equal(store.getState().user, null); assert.equal(readiness.resolveAuthState({ demoUser: store.getState().user }), 'guest'); };

test('Profile probe: /auth/me resolving AFTER sign-out does not restore the identity', async () => {
  reset();
  store.syncRemoteAuthUser(A); // cached backend user from a previous visit
  const me = deferred(); routes.set('GET /auth/me', () => me.p);
  const root = document.getElementById('app');
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root);
  await tick(2);
  assert.ok(calls.includes('GET /auth/me'));
  root.querySelector('#signoutBtn').click();
  await tick();
  signedOut();
  me.resolve({ status: 200, body: { user: A, roles: [] } }); // late success from before logout
  await tick();
  signedOut();
  assert.equal(calls.filter((c) => c === 'GET /memberships/me').length, 0, 'no membership fetch for a signed-out identity');
});

test('Profile probe: /auth/me resolving WHILE the logout request is still pending does not re-note the identity', async () => {
  reset();
  store.syncRemoteAuthUser(A);
  const me = deferred(); const out = deferred();
  routes.set('GET /auth/me', () => me.p);
  routes.set('POST /auth/logout', () => out.p);
  const root = document.getElementById('app');
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root);
  await tick(2);
  root.querySelector('#signoutBtn').click(); await tick(2); // logout in flight
  me.resolve({ status: 200, body: { user: A, roles: [] } }); await tick();
  assert.equal(readiness.getLiveAuthMeUserId(), null, 'not re-noted during logout');
  assert.equal(calls.filter((c) => c === 'GET /memberships/me').length, 0);
  out.resolve({ status: 200, body: { ok: true } }); await tick();
  signedOut();
});

test('Profile probe: a late 401 from before a new sign-in does not sign the new user out', async () => {
  reset();
  store.syncRemoteAuthUser(A);
  const stale = deferred(); let n = 0; let who = A;
  routes.set('GET /auth/me', () => (++n === 1 ? stale.p : { status: 200, body: { user: who, roles: [] } }));
  routes.set('POST /auth/login', () => ({ status: 200, body: { user: B } }));
  const root = document.getElementById('app');
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root);
  await tick(2);
  root.querySelector('#signoutBtn').click(); await tick();
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root); // second probe => n=2 (A? no: signed out now)
  who = B;
  root.querySelector('#loginEmail').value = 'b@example.test'; root.querySelector('#loginPassword').value = 'x';
  root.querySelector('#loginAccountBtn').click(); await tick();
  assert.equal(readiness.getLiveAuthMeUserId(), 'usr_b');
  stale.resolve({ status: 401, body: { error: { code: 'unauthenticated' } } }); // very late, from the first probe
  await tick();
  assert.equal(readiness.getLiveAuthMeUserId(), 'usr_b'); assert.equal(store.getState().user?.id, 'usr_b');
});

test('Profile probe: account switch A->B (server session changed), then the late A response is ignored', async () => {
  reset();
  const stale = deferred(); let n = 0;
  routes.set('GET /auth/me', () => (++n === 1 ? stale.p : { status: 200, body: { user: B, roles: [] } }));
  const root = document.getElementById('app');
  store.syncRemoteAuthUser(A); readiness.noteLiveAuthMe(A);
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root); // probe #1 (slow, A)
  await tick(2);
  await restoreBackendSession(); // probe #2 sees B: identity switch
  assert.equal(readiness.getLiveAuthMeUserId(), 'usr_b');
  stale.resolve({ status: 200, body: { user: A, roles: [] } });
  await tick();
  assert.equal(readiness.getLiveAuthMeUserId(), 'usr_b'); assert.equal(store.getState().user?.id, 'usr_b');
  assert.equal(store.getServerMembership().userId === 'usr_a', false);
});

test('Startup restore: late /auth/me after sign-out is discarded; normal restore still works', async () => {
  reset();
  routes.set('GET /auth/me', () => ({ status: 200, body: { user: A, roles: ['member'] } }));
  await restoreBackendSession();
  assert.equal(readiness.getLiveAuthMeUserId(), 'usr_a'); assert.equal(store.getState().user?.id, 'usr_a');
  await tick();
  assert.ok(calls.includes('GET /memberships/me'), 'restore still triggers the membership read');
  // late case
  reset();
  const me = deferred(); routes.set('GET /auth/me', () => me.p);
  const p = restoreBackendSession(); await tick(2);
  const root = document.getElementById('app');
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} }); profile.bindProfile(root);
  // the profile page probe shares the same deferred; sign out now
  root.querySelector('#signoutBtn')?.click();
  readiness.clearLiveAuthMe(); // (signed-out view has no button; this is what any sign-out path does)
  me.resolve({ status: 200, body: { user: A, roles: ['admin'] } });
  await p; await tick();
  signedOut();
  assert.deepEqual(store.getServerRoles(), [], 'late roles not applied');
});

test('Startup restore + Profile probe running together on first load both stay valid (no false discard)', async () => {
  reset();
  routes.set('GET /auth/me', () => ({ status: 200, body: { user: A, roles: [] } }));
  const root = document.getElementById('app');
  root.innerHTML = profile.renderProfile({ path: '/profile', query: {} });
  const p = restoreBackendSession(); profile.bindProfile(root);
  await p; await tick();
  assert.equal(readiness.getLiveAuthMeUserId(), 'usr_a'); assert.equal(store.getState().user?.id, 'usr_a');
});

test('Verify-email: a late /auth/me after sign-out does not re-sync the local user', async () => {
  reset();
  const me = deferred();
  routes.set('POST /auth/verify', () => ({ status: 200, body: { ok: true } }));
  routes.set('GET /auth/me', () => me.p);
  const root = document.getElementById('app');
  root.innerHTML = verify.renderVerifyEmail({ query: { token: 'testonly_token' } }); verify.bindVerifyEmail(root);
  await tick(3);
  readiness.clearLiveAuthMe(); store.clearAuthenticatedUser();
  me.resolve({ status: 200, body: { user: A, roles: [] } });
  await tick();
  signedOut();
});

test('generation rules: clear always bumps; first confirmation does not; switch bumps', () => {
  reset();
  const g0 = readiness.currentAuthGeneration();
  readiness.noteLiveAuthMe(A); assert.equal(readiness.currentAuthGeneration(), g0, 'null -> A keeps probes valid');
  readiness.noteLiveAuthMe(A); assert.equal(readiness.currentAuthGeneration(), g0);
  readiness.noteLiveAuthMe(B); assert.equal(readiness.currentAuthGeneration(), g0 + 1, 'switch');
  readiness.clearLiveAuthMe(); assert.ok(readiness.currentAuthGeneration() > g0 + 1, 'sign-out');
  const g1 = readiness.currentAuthGeneration(); readiness.clearLiveAuthMe(); assert.ok(readiness.currentAuthGeneration() > g1, 'clear with no identity still bumps');
});

// Membership billing slice. ALL VALUES BELOW ARE TEST-ONLY FIXTURES: the price id, amount, currency and interval
// are arbitrary and are NOT a PIKK catalog (none is approved). Stripe is a local fake behind a stubbed fetch;
// no request leaves the test isolate. Keys/secrets are local placeholders, not real credentials.
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import worker from '../src/index.js';
import { stripeWebhook } from '../src/webhook.js';
import { ORIGIN, newUser, freshIp, grantRole } from './helpers.js';
import { hmacSha256Hex } from '../src/crypto.js';
import { membershipBillingConfig, parseCatalog } from '../src/membership-config.js';

const WHSEC = 'whsec_local_test_only_not_a_real_secret';
const TEST_PRICE = 'price_TESTONLYfixture001';
const TEST_PRICE_2 = 'price_TESTONLYfixture002';
const fixturePlan = (over = {}) => ({ plan_id: 'testonly_plan', stripe_price_id: TEST_PRICE, unit_amount: 101, currency: 'usd', interval: 'month', interval_count: 1, ...over });
const BILLING = (over = {}) => ({
  MEMBERSHIP_BILLING: 'enabled', MEMBERSHIP_STRIPE_MODE: 'test',
  STRIPE_SECRET_KEY: 'sk_test_LOCALTESTONLYnotarealkey0000',
  MEMBERSHIP_CHECKOUT_SUCCESS_URL: 'https://scrubdup.github.io/pikk-app/#/vault?checkout=success',
  MEMBERSHIP_CHECKOUT_CANCEL_URL: 'https://scrubdup.github.io/pikk-app/#/vault?checkout=cancel',
  MEMBERSHIP_CATALOG: JSON.stringify({ version: 1, plans: [fixturePlan(), fixturePlan({ plan_id: 'testonly_plan_b', stripe_price_id: TEST_PRICE_2, unit_amount: 202 })] }),
  ...over,
});

const TEST_ACCT = 'acct_TESTONLYfake0001';
// ---------------- fake Stripe ----------------
let fake;
function newFake() {
  let n = 0; const id = (p) => `${p}_${Date.now().toString(36)}${(++n).toString(36)}x`;
  const f = {
    calls: [], idem: new Map(), sessions: new Map(), subs: new Map(), failNext: null, delayFor: null, accountId: TEST_ACCT,
    prices: new Map([[TEST_PRICE, { id: TEST_PRICE, object: 'price', active: true, type: 'recurring', livemode: false, unit_amount: 101, currency: 'usd', recurring: { interval: 'month', interval_count: 1, usage_type: 'licensed' } }],
      [TEST_PRICE_2, { id: TEST_PRICE_2, object: 'price', active: true, type: 'recurring', livemode: false, unit_amount: 202, currency: 'usd', recurring: { interval: 'month', interval_count: 1, usage_type: 'licensed' } }]]),
    complete(sessionId, { status = 'active', periodEnd = Math.floor(Date.now() / 1000) + 30 * 86400, price, quantity = 1 } = {}) {
      const s = f.sessions.get(sessionId); const subId = id('sub'); const cus = id('cus');
      f.subs.set(subId, { id: subId, object: 'subscription', livemode: false, status, customer: cus, cancel_at_period_end: false,
        metadata: { ...s._subMeta }, items: { object: 'list', data: [{ id: id('si'), price: { id: price || s._price }, quantity, current_period_end: periodEnd }] } });
      Object.assign(s, { status: 'complete', subscription: subId, customer: cus, payment_status: 'paid' });
      return f.subs.get(subId);
    },
  };
  return f;
}
const parseForm = (b) => Object.fromEntries(new URLSearchParams(b));
async function fakeFetch(url, init = {}) {
  const u = new URL(url); const method = init.method || 'GET';
  const call = { method, path: u.pathname, headers: init.headers || {}, form: init.body ? parseForm(init.body) : null };
  fake.calls.push(call);
  if (u.origin !== 'https://api.stripe.com') throw new Error('unexpected outbound request ' + url);
  if (call.headers.Authorization !== `Bearer ${BILLING().STRIPE_SECRET_KEY}`) return new Response('{"error":{}}', { status: 401 });
  if (fake.failNext && fake.failNext(call)) { fake.failNext = null; return new Response('{"error":{"message":"boom"}}', { status: 500 }); }
  if (fake.delayFor) await fake.delayFor(call);
  const ok = (o) => new Response(JSON.stringify(o), { status: 200 });
  let m;
  if (method === 'GET' && u.pathname === '/v1/account') return ok({ id: fake.accountId, object: 'account' });
  if (method === 'GET' && (m = u.pathname.match(/^\/v1\/prices\/(.+)$/))) return fake.prices.has(m[1]) ? ok(fake.prices.get(m[1])) : new Response('{}', { status: 404 });
  if (method === 'POST' && u.pathname === '/v1/checkout/sessions') {
    const key = call.headers['Idempotency-Key'];
    if (key && fake.idem.has(key)) return ok(fake.idem.get(key));
    const fm = call.form; const sid = `cs_test_${Date.now().toString(36)}${fake.sessions.size}a`;
    const s = { id: sid, object: 'checkout.session', mode: fm.mode, livemode: false, status: 'open', client_reference_id: fm.client_reference_id,
      url: `https://checkout.stripe.com/c/pay/${sid}`, metadata: { pikk_checkout_id: fm['metadata[pikk_checkout_id]'], pikk_user_id: fm['metadata[pikk_user_id]'], pikk_plan_id: fm['metadata[pikk_plan_id]'] },
      subscription: null, customer: null, expires_at: Number(fm.expires_at),
      _price: fm['line_items[0][price]'],
      _subMeta: { pikk_checkout_id: fm['subscription_data[metadata][pikk_checkout_id]'], pikk_user_id: fm['subscription_data[metadata][pikk_user_id]'], pikk_plan_id: fm['subscription_data[metadata][pikk_plan_id]'] } };
    fake.sessions.set(sid, s); if (key) fake.idem.set(key, s);
    return ok(s);
  }
  if (method === 'GET' && (m = u.pathname.match(/^\/v1\/checkout\/sessions\/(.+)$/))) return fake.sessions.has(m[1]) ? ok(fake.sessions.get(m[1])) : new Response('{}', { status: 404 });
  if (method === 'GET' && (m = u.pathname.match(/^\/v1\/subscriptions\/(.+)$/))) return fake.subs.has(m[1]) ? ok(structuredClone(fake.subs.get(m[1]))) : new Response('{}', { status: 404 });
  return new Response('{}', { status: 404 });
}
beforeEach(() => { fake = newFake(); vi.stubGlobal('fetch', vi.fn(fakeFetch)); });
afterEach(() => vi.unstubAllGlobals());

// ---------------- worker helpers ----------------
async function api(method, path, { body, cookie, envOver = BILLING(), headers = {} } = {}) {
  const h = { 'CF-Connecting-IP': freshIp(), Origin: ORIGIN, ...headers };
  if (cookie) h.Cookie = cookie;
  if (body !== undefined) h['Content-Type'] = 'application/json';
  const ctx = createExecutionContext();
  const res = await worker.fetch(new Request(`https://api.test${path}`, { method, headers: h, body: body === undefined ? undefined : JSON.stringify(body) }), { ...env, ...envOver }, ctx);
  await waitOnExecutionContext(ctx);
  const t = await res.text(); return { status: res.status, json: t ? JSON.parse(t) : null };
}
let evSeq = 0;
const evt = (type, object, over = {}) => ({ id: `evt_testonly_${Date.now()}_${++evSeq}`, object: 'event', type, livemode: false, created: Math.floor(Date.now() / 1000), data: { object }, ...over });
async function deliver(e, { envOver = BILLING(), secret = WHSEC } = {}) {
  const t = Math.floor(Date.now() / 1000); const body = JSON.stringify(e);
  const sig = await hmacSha256Hex(secret, `${t}.${body}`);
  const ctx = createExecutionContext();
  const res = await worker.fetch(new Request('https://api.test/webhooks/stripe', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Stripe-Signature': `t=${t},v1=${sig}` }, body }), { ...env, ...envOver }, ctx);
  await waitOnExecutionContext(ctx);
  return { status: res.status, json: await res.json() };
}
const me = async (u, envOver) => (await api('GET', '/memberships/me', { cookie: u.cookie, envOver })).json.membership;
const subRows = (userId) => env.DB.prepare('SELECT * FROM membership_subscriptions WHERE user_id=?').bind(userId).all().then((r) => r.results);
async function checkoutAndPay(u, { plan = 'testonly_plan', ...opt } = {}) {
  const r = await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: plan } });
  expect(r.status, JSON.stringify(r.json)).toBe(200);
  const sid = r.json.checkout_url.split('/').pop();
  const sub = fake.complete(sid, opt);
  return { sid, sub, session: fake.sessions.get(sid) };
}
const sessionCompleted = (s) => evt('checkout.session.completed', { id: s.id, object: 'checkout.session', mode: 'subscription', status: 'complete', subscription: s.subscription });
const subEvent = (type, sub) => evt(type, structuredClone(sub));

// ---------------- tests ----------------
describe('config: deny by default, strict catalog', () => {
  it('every missing/invalid piece keeps billing off', () => {
    const base = { ...env, ...BILLING() };
    expect(membershipBillingConfig(base).ok).toBe(true);
    const cases = {
      billing_disabled: { MEMBERSHIP_BILLING: 'true' }, stripe_mode_missing: { MEMBERSHIP_STRIPE_MODE: undefined },
      // Non-credential fixtures only: a wrong-shaped value, and the test-mode fixture key paired with mode=live.
      stripe_key_missing: { STRIPE_SECRET_KEY: 'not-a-stripe-secret-key' }, stripe_mode_mismatch: { MEMBERSHIP_STRIPE_MODE: 'live' },
      webhook_secret_missing: { STRIPE_WEBHOOK_SECRET: '' }, success_url_invalid: { MEMBERSHIP_CHECKOUT_SUCCESS_URL: 'https://evil.example/x' },
      cancel_url_invalid: { MEMBERSHIP_CHECKOUT_CANCEL_URL: 'http://scrubdup.github.io/pikk-app/' }, catalog_missing: { MEMBERSHIP_CATALOG: undefined },
    };
    for (const [reason, over] of Object.entries(cases)) expect(membershipBillingConfig({ ...base, ...over }), reason).toEqual({ ok: false, reason });
    expect(membershipBillingConfig(env)).toEqual({ ok: false, reason: 'billing_disabled' }); // repo default
  });
  it('catalog rejects trials, unknown keys, bad ids, duplicates and non-integer amounts', () => {
    const cat = (plans, extra = {}) => JSON.stringify({ version: 1, plans, ...extra });
    expect(parseCatalog(cat([fixturePlan()])).ok).toBe(true);
    for (const bad of [cat([{ ...fixturePlan(), trial_period_days: 7 }]), cat([{ ...fixturePlan(), benefits: ['ad_free'] }]), cat([fixturePlan({ unit_amount: 3.99 })]),
      cat([fixturePlan({ stripe_price_id: 'prod_x' })]), cat([fixturePlan({ plan_id: 'Bad Id' })]), cat([fixturePlan(), fixturePlan()]),
      cat([fixturePlan({ interval: 'fortnight' })]), cat([]), cat([fixturePlan()], { default_trial: 1 }), JSON.stringify({ version: 2, plans: [fixturePlan()] }), '{', '[]']) {
      expect(parseCatalog(bad).ok, bad).toBe(false);
    }
  });
});

describe('billing OFF (repo default): honest, nothing granted, coins unaffected', () => {
  it('/me reports not configured; checkout 503; subscription events recorded but ignored', async () => {
    const u = await newUser();
    const m = await me(u, {});
    expect(m).toMatchObject({ status: 'inactive', plan: null, billing_configured: false, activation: 'not_available', billing_reason: 'billing_disabled', entitlements: null, entitlement_policy: 'unconfigured' });
    const c = await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' }, envOver: {} });
    expect(c.status).toBe(503); expect(c.json.error.code).toBe('membership_billing_not_configured');
    const e = evt('customer.subscription.updated', { id: 'sub_testonlyX1', object: 'subscription', status: 'active', metadata: { pikk_user_id: u.id } });
    expect((await deliver(e, { envOver: {} })).json.outcome).toBe('ignored_membership_billing_off');
    expect(fake.calls.length).toBe(0);
    expect(await subRows(u.id)).toEqual([]);
    const h = await api('GET', '/health', { envOver: {} });
    expect(h.json.capabilities.membership_billing).toBe(false);
  });
});

describe('checkout creation', () => {
  it('requires a verified, active account and a catalog plan; buyer/price come from the server', async () => {
    expect((await api('POST', '/memberships/checkout', { body: { plan_id: 'testonly_plan' } })).status).toBe(401);
    const unv = await newUser({ verify: false });
    expect((await api('POST', '/memberships/checkout', { cookie: unv.cookie, body: { plan_id: 'testonly_plan' } })).json.error.code).toBe('email_unverified');
    const banned = await newUser();
    await env.DB.prepare('UPDATE users SET banned_at=? WHERE id=?').bind(new Date().toISOString(), banned.id).run();
    expect((await api('POST', '/memberships/checkout', { cookie: banned.cookie, body: { plan_id: 'testonly_plan' } })).json.error.code).toBe('account_banned');
    const u = await newUser(); const v = await newUser();
    for (const plan_id of ['skeet', 'inner', 'elite', TEST_PRICE, undefined]) {
      expect((await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id } })).status).toBe(422);
    }
    expect(fake.calls.length).toBe(0);
    const r = await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan', price: 'price_attacker', user_id: v.id, trial_period_days: 30, quantity: 9 } });
    expect(r.status).toBe(200); expect(r.json.checkout_url).toMatch(/^https:\/\/checkout\.stripe\.com\//);
    const post = fake.calls.find((c) => c.method === 'POST');
    expect(post.headers['Stripe-Version']).toBeTruthy();
    expect(post.headers['Idempotency-Key']).toMatch(/^pikk-membership-checkout-mco_/);
    expect(post.form).toMatchObject({ mode: 'subscription', 'line_items[0][price]': TEST_PRICE, 'line_items[0][quantity]': '1',
      'metadata[pikk_user_id]': u.id, 'subscription_data[metadata][pikk_user_id]': u.id, 'subscription_data[metadata][pikk_plan_id]': 'testonly_plan' });
    expect(Object.keys(post.form).some((k) => /trial|price_data|discount|coupon/.test(k))).toBe(false);
    expect(Number(post.form.expires_at) - Date.now() / 1000).toBeGreaterThan(30 * 60);
    expect(Number(post.form.expires_at) - Date.now() / 1000).toBeLessThan(24 * 3600);
    expect((await me(u)).status).toBe('inactive'); // creating a checkout grants nothing
  });

  it('refuses when the live Stripe price drifts from the approved catalog entry; user can retry once fixed', async () => {
    const u = await newUser();
    for (const drift of [{ unit_amount: 100 }, { currency: 'eur' }, { active: false }, { recurring: { interval: 'year', interval_count: 1 } }, { livemode: true }, { type: 'one_time' }, { recurring: { interval: 'month', interval_count: 1, trial_period_days: 7 } }]) {
      const orig = fake.prices.get(TEST_PRICE); fake.prices.set(TEST_PRICE, { ...orig, ...drift });
      const r = await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' } });
      expect(r.status, JSON.stringify(drift)).toBe(503); expect(r.json.error.code).toBe('membership_catalog_mismatch');
      fake.prices.set(TEST_PRICE, orig);
    }
    expect(fake.calls.filter((c) => c.method === 'POST').length).toBe(0);
    fake.failNext = (c) => c.method === 'POST';
    expect((await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' } })).status).toBe(502);
    expect((await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' } })).status).toBe(200);
  });

  it('one open checkout per user: same plan reuses the URL, other plan 409, concurrent requests make one session', async () => {
    const u = await newUser();
    const rs = await Promise.all(Array.from({ length: 5 }, () => api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' } })));
    expect(fake.calls.filter((c) => c.method === 'POST').length).toBe(1);
    const okUrls = new Set(rs.filter((r) => r.status === 200).map((r) => r.json.checkout_url));
    expect(okUrls.size).toBe(1);
    expect(rs.every((r) => r.status === 200 || (r.status === 409 && r.json.error.code === 'checkout_in_progress'))).toBe(true);
    const again = await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' } });
    expect(again.json.reused).toBe(true);
    expect((await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan_b' } })).status).toBe(409);
    // provider-signalled expiry frees the slot
    const sid = [...okUrls][0].split('/').pop();
    expect((await deliver(evt('checkout.session.expired', { id: sid, object: 'checkout.session', mode: 'subscription' }))).json.outcome).toBe('membership_checkout_expired');
    expect((await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan_b' } })).status).toBe(200);
  });
});

describe('signed subscription lifecycle → authoritative entitlement', () => {
  it('checkout completed → active; replay is a duplicate; existing membership blocks a second checkout', async () => {
    const u = await newUser(); const { session } = await checkoutAndPay(u);
    const e = sessionCompleted(session);
    expect((await deliver(e)).json.outcome).toBe('membership_subscription_synced');
    expect(await me(u)).toMatchObject({ status: 'active', plan: 'testonly_plan', source: 'stripe_subscription', subscription_status: 'active', entitlements: null, entitlement_policy: 'unconfigured' });
    expect((await deliver(e)).json).toMatchObject({ duplicate: true, outcome: 'membership_subscription_synced' });
    expect((await subRows(u.id)).length).toBe(1);
    expect((await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan_b' } })).json.error.code).toBe('membership_exists');
  });

  it('out-of-order: subscription.created before checkout.session.completed; stale event payloads never override the Stripe read', async () => {
    const u = await newUser(); const { sub, session } = await checkoutAndPay(u);
    const staleActive = subEvent('customer.subscription.updated', sub);
    expect((await deliver(subEvent('customer.subscription.created', sub))).json.outcome).toBe('membership_subscription_synced');
    expect((await me(u)).status).toBe('active');
    expect((await deliver(sessionCompleted(session))).json.outcome).toBe('membership_subscription_synced');
    fake.subs.get(sub.id).status = 'canceled';
    expect((await deliver(subEvent('customer.subscription.deleted', fake.subs.get(sub.id)))).json.outcome).toBe('membership_subscription_synced');
    expect((await me(u)).status).toBe('inactive');
    // an older 'active' event delivered late: we re-read Stripe (canceled) — still inactive
    expect((await deliver(staleActive)).json.outcome).toBe('membership_subscription_synced');
    expect((await me(u))).toMatchObject({ status: 'inactive', subscription_status: 'canceled' });
  });

  it('terminal status never reverts even if a slower, older provider read lands last; DB trigger enforces it', async () => {
    const u = await newUser(); const { sub } = await checkoutAndPay(u);
    // read #1 (sees active) is slow; read #2 (sees canceled) is fast
    let release; const gate = new Promise((r) => (release = r)); let first = true;
    fake.delayFor = async (c) => { if (c.path.startsWith('/v1/subscriptions/') && first) { first = false; const snap = structuredClone(fake.subs.get(sub.id)); await gate; fake.subs.set(sub.id + '_snap', snap); } };
    const slow = deliver(subEvent('customer.subscription.updated', sub));
    await new Promise((r) => setTimeout(r, 20));
    fake.subs.get(sub.id).status = 'canceled'; fake.delayFor = null;
    expect((await deliver(subEvent('customer.subscription.deleted', fake.subs.get(sub.id)))).json.outcome).toBe('membership_subscription_synced');
    fake.subs.get(sub.id).status = 'active'; // what the slow read returns (it was taken before cancellation)
    release(); const sr = await slow;
    expect(sr.status).toBe(200); expect(sr.json.outcome).toBe('membership_subscription_synced');
    expect((await subRows(u.id))[0].status).toBe('canceled');
    expect((await me(u)).status).toBe('inactive');
    await expect(env.DB.prepare(`UPDATE membership_subscriptions SET status='active' WHERE stripe_subscription_id=?`).bind(sub.id).run()).rejects.toThrow(/immutable/);
    await expect(env.DB.prepare(`DELETE FROM membership_subscriptions WHERE stripe_subscription_id=?`).bind(sub.id).run()).rejects.toThrow(/update-only/);
  });

  it('no entitlement for trialing, past_due, unpaid, incomplete, ended period, price swap, quantity>1, plan removed, billing off', async () => {
    const cases = [{ status: 'trialing' }, { status: 'past_due' }, { status: 'unpaid' }, { status: 'incomplete' }, { status: 'paused' },
      { periodEnd: Math.floor(Date.now() / 1000) - 1 }, { price: TEST_PRICE_2 }, { quantity: 2 }];
    for (const c of cases) {
      const u = await newUser(); const { session } = await checkoutAndPay(u, c);
      expect((await deliver(sessionCompleted(session))).json.outcome).toBe('membership_subscription_synced');
      expect((await me(u)).status, JSON.stringify(c)).toBe('inactive');
    }
    const u = await newUser(); const { session } = await checkoutAndPay(u);
    await deliver(sessionCompleted(session));
    expect((await me(u)).status).toBe('active');
    expect((await me(u, BILLING({ MEMBERSHIP_CATALOG: JSON.stringify({ version: 1, plans: [fixturePlan({ plan_id: 'testonly_plan_b', stripe_price_id: TEST_PRICE_2 })] }) }))).status).toBe('inactive');
    expect((await me(u, {})).status).toBe('inactive');
  });

  it('expiry: an active row whose period end passes becomes inactive with no further events', async () => {
    const u = await newUser(); const { sub, session } = await checkoutAndPay(u);
    await deliver(sessionCompleted(session));
    expect((await me(u)).status).toBe('active');
    await env.DB.prepare('UPDATE membership_subscriptions SET current_period_end=? WHERE stripe_subscription_id=?').bind(Math.floor(Date.now() / 1000) - 5, sub.id).run();
    expect((await me(u)).status).toBe('inactive');
  });
});

describe('mapping, multi-user, replay and failure handling', () => {
  it('subscriptions not created by our checkout, or pointing at another user, grant nothing', async () => {
    const a = await newUser(); const b = await newUser();
    const { sub: subA } = await checkoutAndPay(a);
    // dashboard-made subscription with no metadata
    fake.subs.set('sub_testonlyNoMeta', { ...structuredClone(subA), id: 'sub_testonlyNoMeta', metadata: {} });
    expect((await deliver(evt('customer.subscription.created', { id: 'sub_testonlyNoMeta', object: 'subscription' }))).json.outcome).toBe('rejected_subscription_unmapped');
    // A's checkout id but claims user B
    fake.subs.set('sub_testonlyForged', { ...structuredClone(subA), id: 'sub_testonlyForged', metadata: { ...subA.metadata, pikk_user_id: b.id } });
    expect((await deliver(evt('customer.subscription.created', { id: 'sub_testonlyForged', object: 'subscription' }))).json.outcome).toBe('rejected_subscription_unmapped');
    // legit A
    expect((await deliver(subEvent('customer.subscription.created', subA))).json.outcome).toBe('membership_subscription_synced');
    // second subscription reusing A's checkout id (correct user) cannot bind
    fake.subs.set('sub_testonlySecond', { ...structuredClone(subA), id: 'sub_testonlySecond' });
    expect((await deliver(evt('customer.subscription.created', { id: 'sub_testonlySecond', object: 'subscription' }))).json.outcome).toBe('rejected_checkout_bound_elsewhere');
    expect((await me(a)).status).toBe('active');
    expect((await me(b)).status).toBe('inactive');
    expect((await subRows(b.id)).length).toBe(0);
    expect((await subRows(a.id)).length).toBe(1);
  });

  it('concurrent duplicate + distinct events for one subscription produce one row and stable state', async () => {
    const u = await newUser(); const { sub, session } = await checkoutAndPay(u);
    const same = subEvent('customer.subscription.updated', sub);
    const rs = await Promise.all([deliver(same), deliver(same), deliver(sessionCompleted(session)), deliver(subEvent('customer.subscription.created', sub)), deliver(subEvent('customer.subscription.updated', sub))]);
    expect(rs.every((r) => r.status === 200)).toBe(true);
    expect((await subRows(u.id)).length).toBe(1);
    expect((await me(u)).status).toBe('active');
  });

  it('provider read failure → 500, event left unprocessed, Stripe retry succeeds', async () => {
    const u = await newUser(); const { sub } = await checkoutAndPay(u);
    const e = subEvent('customer.subscription.created', sub);
    fake.failNext = (c) => c.path.startsWith('/v1/subscriptions/');
    expect((await deliver(e)).status).toBe(502);
    const row = await env.DB.prepare('SELECT processed_at FROM payment_events WHERE provider_event_id=?').bind(e.id).first();
    expect(row.processed_at).toBeNull();
    expect((await me(u)).status).toBe('inactive');
    expect((await deliver(e)).json.outcome).toBe('membership_subscription_synced');
    expect((await me(u)).status).toBe('active');
  });

  it('livemode mismatch and bad signatures are rejected without granting', async () => {
    const u = await newUser(); const { sub } = await checkoutAndPay(u);
    expect((await deliver({ ...subEvent('customer.subscription.created', sub), livemode: true })).json.outcome).toBe('rejected_livemode_mismatch');
    const bad = await deliver(subEvent('customer.subscription.created', sub), { secret: 'whsec_wrong_testonly' });
    expect(bad.status).toBe(400);
    expect((await me(u)).status).toBe('inactive');
  });

  it('checkout completed for a session we never created is rejected', async () => {
    const u = await newUser(); const { session } = await checkoutAndPay(u);
    const foreign = { ...structuredClone(session), id: 'cs_test_foreign1', client_reference_id: 'mco_not_ours', metadata: {} };
    fake.sessions.set(foreign.id, foreign);
    expect((await deliver(sessionCompleted(foreign))).json.outcome).toBe('rejected_unknown_checkout');
    expect((await me(u)).status).toBe('inactive');
  });

  it('client self-grant routes stay 403 with billing ON', async () => {
    const u = await newUser();
    for (const p of ['/memberships/join', '/memberships/activate', '/memberships/grant']) expect((await api('POST', p, { cookie: u.cookie, body: { plan: 'testonly_plan' } })).status).toBe(403);
    expect((await me(u)).status).toBe('inactive');
  });
});

describe('review 980375d fixes (ported R6/R7 + variants)', () => {
  const expireLocally = (sid) => env.DB.prepare(`UPDATE membership_checkouts SET expires_at=? WHERE stripe_session_id=?`).bind(new Date(Date.now() - 1000).toISOString(), sid).run();

  it('MB-1/R7: paid session whose webhook is late past our local expiry → no 2nd checkout, exactly one subscription', async () => {
    const a = await newUser(); const { sid, session } = await checkoutAndPay(a);
    await expireLocally(sid);
    const posts = () => fake.calls.filter((c) => c.method === 'POST').length;
    const before = posts();
    const second = await api('POST', '/memberships/checkout', { cookie: a.cookie, body: { plan_id: 'testonly_plan' } });
    expect(second.status).toBe(409); expect(second.json.error.code).toBe('membership_exists');
    expect(posts()).toBe(before); // no new Stripe session
    expect((await me(a)).status).toBe('active'); // synced during the check
    expect((await deliver(sessionCompleted(session))).json.outcome).toBe('membership_subscription_synced'); // late webhook
    expect((await subRows(a.id)).map((r) => r.status)).toEqual(['active']);
    expect((await api('POST', '/memberships/checkout', { cookie: a.cookie, body: { plan_id: 'testonly_plan_b' } })).json.error.code).toBe('membership_exists');
  });

  it('MB-1: Stripe says open → 409, provider error → 502 (row kept), Stripe says expired → new checkout allowed', async () => {
    const a = await newUser();
    const r = await api('POST', '/memberships/checkout', { cookie: a.cookie, body: { plan_id: 'testonly_plan' } });
    const sid = r.json.checkout_url.split('/').pop();
    await expireLocally(sid);
    const posts = () => fake.calls.filter((c) => c.method === 'POST').length; const p0 = posts();
    const open = await api('POST', '/memberships/checkout', { cookie: a.cookie, body: { plan_id: 'testonly_plan' } });
    expect(open.status).toBe(409); expect(open.json.error.code).toBe('checkout_in_progress');
    fake.failNext = (c) => c.path.startsWith('/v1/checkout/sessions/');
    expect((await api('POST', '/memberships/checkout', { cookie: a.cookie, body: { plan_id: 'testonly_plan' } })).status).toBe(502);
    const row = await env.DB.prepare('SELECT status FROM membership_checkouts WHERE stripe_session_id=?').bind(sid).first();
    expect(row.status).toBe('open');
    expect(posts()).toBe(p0);
    fake.sessions.get(sid).status = 'expired';
    const ok = await api('POST', '/memberships/checkout', { cookie: a.cookie, body: { plan_id: 'testonly_plan_b' } });
    expect(ok.status).toBe(200); expect(posts()).toBe(p0 + 1);
    expect((await env.DB.prepare('SELECT status FROM membership_checkouts WHERE stripe_session_id=?').bind(sid).first()).status).toBe('expired');
  });

  it('MB-1: concurrent requests against a locally-expired paid session never create a session', async () => {
    const a = await newUser(); const { sid } = await checkoutAndPay(a);
    await expireLocally(sid);
    const p0 = fake.calls.filter((c) => c.method === 'POST').length;
    const rs = await Promise.all(Array.from({ length: 4 }, () => api('POST', '/memberships/checkout', { cookie: a.cookie, body: { plan_id: 'testonly_plan' } })));
    expect(rs.every((x) => x.status === 409)).toBe(true);
    expect(fake.calls.filter((c) => c.method === 'POST').length).toBe(p0);
    expect((await subRows(a.id)).length).toBe(1);
  });

  it('MB-2/R6: an older read that started first but returns last cannot undo a newer past_due', async () => {
    const a = await newUser(); const { sub, session } = await checkoutAndPay(a);
    await deliver(sessionCompleted(session));
    expect((await me(a)).status).toBe('active');
    const oldSnap = structuredClone(fake.subs.get(sub.id)); fake.subs.get(sub.id).status = 'past_due';
    let first = true;
    fake.delayFor = async (c) => { if (c.path.startsWith('/v1/subscriptions/') && first) { first = false; await new Promise((r) => setTimeout(r, 60)); throw Object.assign(new Error('use-old'), { old: true }); } };
    const realFake = fakeFetch;
    vi.stubGlobal('fetch', vi.fn(async (url, init) => {
      try { return await realFake(url, init); } catch (e) { if (e.old) return new Response(JSON.stringify(oldSnap), { status: 200 }); throw e; }
    }));
    const [x, y] = await Promise.all([
      deliver(subEvent('customer.subscription.updated', oldSnap)),
      (async () => { await new Promise((r) => setTimeout(r, 10)); return deliver(subEvent('customer.subscription.updated', fake.subs.get(sub.id))); })(),
    ]);
    expect([x.status, y.status]).toEqual([200, 200]);
    expect((await subRows(a.id))[0].status).toBe('past_due');
    expect((await me(a)).status).toBe('inactive');
  });

  it('R8 (documented, owner policy unresolved): a banned account keeps its synced status in /me; checkout is refused', async () => {
    const a = await newUser(); const { session } = await checkoutAndPay(a);
    await deliver(sessionCompleted(session));
    await env.DB.prepare('UPDATE users SET banned_at=? WHERE id=?').bind(new Date().toISOString(), a.id).run();
    expect((await me(a)).status).toBe('active'); // current behaviour, NOT a policy decision
    expect((await api('POST', '/memberships/checkout', { cookie: a.cookie, body: { plan_id: 'testonly_plan_b' } })).status).toBe(403);
  });
});

describe('review d6d79cf fixes (ported S1/S2/S3 + variants)', () => {
  const OFF = () => BILLING({ MEMBERSHIP_BILLING: 'off' });
  let ownerUser; // DB allows a single owner (uq_single_owner): one per test file
  const getOwner = async () => { if (!ownerUser) { ownerUser = await newUser(); await grantRole(ownerUser.id, 'owner'); } return ownerUser; };
  const peRow = (id) => env.DB.prepare('SELECT outcome, processed_at FROM payment_events WHERE provider_event_id=?').bind(id).first();
  async function signed(e) { const t0 = Math.floor(Date.now() / 1000); const body = JSON.stringify(e); const sig = await hmacSha256Hex(WHSEC, `${t0}.${body}`); return new Request('https://api.test/webhooks/stripe', { method: 'POST', headers: { 'Stripe-Signature': `t=${t0},v1=${sig}` }, body }); }
  // Resync is global; the fake Stripe is reset per test, so retire rows left by EARLIER tests (test-only isolation).
  const isolateResync = async (subIds, sessionIds, { clearDeferred = false } = {}) => {
    const q = (n) => n.map(() => '?').join(',') || "''";
    await env.DB.prepare(`UPDATE membership_subscriptions SET status='canceled' WHERE status NOT IN ('canceled','incomplete_expired') AND stripe_subscription_id NOT IN (${q(subIds)})`).bind(...subIds).run();
    await env.DB.prepare(`UPDATE membership_checkouts SET status='expired' WHERE status='open' AND (stripe_session_id IS NULL OR stripe_session_id NOT IN (${q(sessionIds)}))`).bind(...sessionIds).run();
    if (clearDeferred) await env.DB.prepare(`UPDATE payment_events SET processed_at=?, outcome='testonly_isolated' WHERE processed_at IS NULL AND outcome='deferred_membership_billing_off'`).bind(new Date().toISOString()).run();
  };
  const probeFailsOnce = () => { let tripped = false; return new Proxy(env.DB, { get(t, k) { if (k === 'prepare') return (sql) => { if (!tripped && /sqlite_master/.test(sql)) { tripped = true; return { bind: () => ({ first: async () => { throw new Error('D1 transient'); } }) }; } return t.prepare(sql); }; const v = t[k]; return typeof v === 'function' ? v.bind(t) : v; } }); };

  it('MB-3/S3: transient schema-probe failure → 5xx, event left unprocessed; Stripe retry activates the buyer', async () => {
    const a = await newUser(); const { session } = await checkoutAndPay(a);
    const e = sessionCompleted(session);
    let first; try { first = (await stripeWebhook({ ...env, ...BILLING(), DB: probeFailsOnce() }, await signed(e))).status; } catch (x) { first = x.status; }
    expect(first).toBe(503);
    expect((await peRow(e.id)).processed_at).toBeNull();
    expect((await me(a)).status).toBe('inactive');
    const retry = await deliver(e);
    expect(retry.json).toMatchObject({ outcome: 'membership_subscription_synced' }); expect(retry.json.duplicate).toBeUndefined();
    expect((await me(a)).status).toBe('active');
  });

  it('MB-3: transient probe failure while billing is OFF also 5xx (not silently ignored)', async () => {
    const a = await newUser(); const { sub, session } = await checkoutAndPay(a);
    await deliver(sessionCompleted(session));
    const e = subEvent('customer.subscription.updated', sub);
    let st; try { st = (await stripeWebhook({ ...env, ...OFF(), DB: probeFailsOnce() }, await signed(e))).status; } catch (x) { st = x.status; }
    expect(st).toBe(503); expect((await peRow(e.id)).processed_at).toBeNull();
  });

  it('S2: subscription.deleted during billing OFF → revoked immediately (never grants), deferred, replay after re-enable is processed', async () => {
    const a = await newUser(); const { sub, session } = await checkoutAndPay(a);
    await deliver(sessionCompleted(session));
    expect((await me(a)).status).toBe('active');
    fake.subs.get(sub.id).status = 'canceled';
    const calls0 = fake.calls.length;
    const cancelEvt = subEvent('customer.subscription.deleted', fake.subs.get(sub.id));
    const r1 = await deliver(cancelEvt, { envOver: OFF() });
    expect(r1.status).toBe(200); expect(r1.json).toMatchObject({ outcome: 'deferred_membership_billing_off', deferred: true });
    expect(fake.calls.length).toBe(calls0); // no provider call while off
    expect((await subRows(a.id))[0].status).toBe('canceled');
    expect((await me(a, OFF())).status).toBe('inactive');
    expect((await peRow(cancelEvt.id)).processed_at).toBeNull();
    const replay = await deliver(cancelEvt); // billing back ON
    expect(replay.json.duplicate).toBeUndefined(); expect(replay.json.outcome).toBe('membership_subscription_synced');
    expect((await me(a))).toMatchObject({ status: 'inactive', subscription_status: 'canceled' });
  });

  it('S2: non-terminal change during OFF is deferred; owner resync after re-enable applies it and resolves the deferred event', async () => {
    const a = await newUser(); const { sub, session } = await checkoutAndPay(a);
    await deliver(sessionCompleted(session));
    // a second user paid during the off window (checkout created while on)
    const b = await newUser(); const pb = await checkoutAndPay(b);
    fake.subs.get(sub.id).status = 'past_due';
    const upd = subEvent('customer.subscription.updated', fake.subs.get(sub.id));
    const bDone = sessionCompleted(pb.session);
    expect((await deliver(upd, { envOver: OFF() })).json.outcome).toBe('deferred_membership_billing_off');
    expect((await deliver(bDone, { envOver: OFF() })).json.outcome).toBe('deferred_membership_billing_off');
    expect((await me(b, OFF())).status).toBe('inactive'); expect((await subRows(b.id)).length).toBe(0); // never grants while off
    // unknown objects while off are still just ignored
    expect((await deliver(evt('customer.subscription.updated', { id: 'sub_testonlyUnknownOff', object: 'subscription', metadata: {} }), { envOver: OFF() })).json.outcome).toBe('ignored_membership_billing_off');
    // resync: owner only, billing must be ready
    const owner = await getOwner();
    await isolateResync([sub.id], [pb.session.id]);
    expect((await api('POST', '/admin/memberships/resync', { cookie: a.cookie })).status).toBe(403);
    expect((await api('POST', '/admin/memberships/resync', { cookie: owner.cookie, envOver: OFF() })).status).toBe(503);
    const rs = await api('POST', '/admin/memberships/resync', { cookie: owner.cookie });
    expect(rs.status).toBe(200); expect(rs.json.resync.errors).toBe(0); expect(rs.json.resync.deferred_resolved).toBeGreaterThanOrEqual(2);
    expect((await me(a))).toMatchObject({ status: 'inactive', subscription_status: 'past_due' });
    expect((await me(b)).status).toBe('active');
    expect((await peRow(upd.id))).toMatchObject({ outcome: 'resolved_by_membership_resync' });
    expect((await deliver(upd)).json.duplicate).toBe(true);
  });

  it('S2: resync with a provider error does not resolve deferred events', async () => {
    const a = await newUser(); const { sub, session } = await checkoutAndPay(a);
    await deliver(sessionCompleted(session));
    const upd = subEvent('customer.subscription.updated', fake.subs.get(sub.id));
    await deliver(upd, { envOver: OFF() });
    const owner = await getOwner();
    await isolateResync([sub.id], []);
    fake.failNext = (c) => c.path.startsWith('/v1/subscriptions/');
    const rs = await api('POST', '/admin/memberships/resync', { cookie: owner.cookie });
    expect(rs.status, JSON.stringify(rs.json)).toBe(200);
    expect(rs.json.resync.errors).toBeGreaterThan(0); expect(rs.json.resync.deferred_resolved).toBe(0);
    expect((await peRow(upd.id)).processed_at).toBeNull();
  });

  it('S1 low: Stripe-complete session that cannot be mapped to a subscription → clear operator error, no new session', async () => {
    const u = await newUser();
    const r = await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' } });
    const sid = r.json.checkout_url.split('/').pop();
    Object.assign(fake.sessions.get(sid), { status: 'complete', subscription: null });
    await env.DB.prepare(`UPDATE membership_checkouts SET expires_at=? WHERE stripe_session_id=?`).bind(new Date(Date.now() - 1000).toISOString(), sid).run();
    const p0 = fake.calls.filter((c) => c.method === 'POST').length;
    for (let i = 0; i < 2; i++) {
      const x = await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' } });
      expect(x.status).toBe(409); expect(x.json.error.code).toBe('membership_checkout_needs_review');
    }
    expect(fake.calls.filter((c) => c.method === 'POST').length).toBe(p0);
  });

  // ---------------- MB-4 (review 86f5728): resync rotation, cross-pass completion, 404, livemode ----------------
  const clearRl = () => env.DB.prepare(`DELETE FROM rate_limits`).run();
  const resync = async (envOver = BILLING()) => { await clearRl(); const r = await api('POST', '/admin/memberships/resync', { cookie: (await getOwner()).cookie, envOver }); expect(r.status, JSON.stringify(r.json)).toBe(200); return r.json.resync; };
  const ACCT = () => BILLING({ MEMBERSHIP_STRIPE_ACCOUNT_ID: TEST_ACCT });
  async function paidUsers(n) {
    const out = [];
    for (let i = 0; i < n; i++) { const u = await newUser(); const p = await checkoutAndPay(u); await deliver(sessionCompleted(p.session)); out.push({ u, sub: p.sub.id }); }
    return out;
  }

  it('MB-4/T5: >50 eligible subscriptions converge and the deferred event resolves on pass 2 (not never)', { timeout: 60_000 }, async () => {
    const xs = await paidUsers(55); const ids = xs.map((x) => x.sub);
    await isolateResync(ids, [], { clearDeferred: true });
    for (const id of ids) fake.subs.get(id).status = 'past_due';
    const d = subEvent('customer.subscription.updated', fake.subs.get(ids[54]));
    expect((await deliver(d, { envOver: OFF() })).json.outcome).toBe('deferred_membership_billing_off');
    const p1 = await resync();
    expect(p1).toMatchObject({ complete: false, deferred_resolved: 0, errors: 0 }); expect(p1.pending).toBe(5);
    expect((await peRow(d.id)).processed_at).toBeNull();
    const p2 = await resync();
    expect(p2).toMatchObject({ complete: true, pending: 0, errors: 0, deferred_resolved: 1 });
    expect((await peRow(d.id)).outcome).toBe('resolved_by_membership_resync');
    const stillActive = (await env.DB.prepare(`SELECT COUNT(*) n FROM membership_subscriptions WHERE status='active' AND stripe_subscription_id IN (${ids.map(() => '?').join(',')})`).bind(...ids).first()).n;
    expect(stillActive).toBe(0);
    for (const x of [xs[0], xs[54]]) expect((await me(x.u)).status).toBe('inactive');
  });

  it('MB-4/T6: a Stripe-404 row is marked needs_review (never entitled) instead of blocking forever; transient errors rotate; other-mode rows skipped', async () => {
    const [a, b, c] = await paidUsers(3);
    await isolateResync([a.sub, b.sub, c.sub], [], { clearDeferred: true });
    fake.subs.get(a.sub).status = 'past_due';
    const d = subEvent('customer.subscription.updated', fake.subs.get(a.sub));
    await deliver(d, { envOver: OFF() });
    fake.subs.delete(c.sub); // gone at Stripe / unreadable with the current key
    // a leftover LIVE-mode row while we run in TEST mode (inserted directly; identity columns are immutable)
    const t = new Date().toISOString(); const liveSub = `sub_testonlyLIVE${Date.now()}`; const liveCo = `mco_testonly_live_${Date.now()}`;
    await env.DB.prepare(`INSERT INTO membership_checkouts(id,user_id,plan_id,stripe_price_id,livemode,status,created_at,expires_at,stripe_subscription_id,stripe_customer_id) VALUES (?,?,?,?,1,'completed',?,?,?,'cus_testonlyLIVE')`).bind(liveCo, b.u.id, 'testonly_plan', TEST_PRICE, t, t, liveSub).run();
    await env.DB.prepare(`INSERT INTO membership_subscriptions(stripe_subscription_id,user_id,checkout_id,plan_id,stripe_price_id,current_price_id,current_quantity,stripe_customer_id,livemode,status,current_period_end,synced_at_ms,created_at,updated_at) VALUES (?,?,?,?,?,?,1,'cus_testonlyLIVE',1,'active',?,1,?,?)`).bind(liveSub, b.u.id, liveCo, 'testonly_plan', TEST_PRICE, TEST_PRICE, Math.floor(Date.now() / 1000) + 86400, t, t).run();
    // pass 1: b's read fails transiently
    let failed = false; fake.failNext = (x) => { if (!failed && x.path === `/v1/subscriptions/${b.sub}`) { failed = true; return true; } return false; };
    const p1 = await resync();
    expect(p1.errors).toBe(1); expect(p1.needs_review).toBe(1); expect(p1.complete).toBe(false); expect(p1.deferred_resolved).toBe(0);
    expect(p1.other_mode_skipped).toBeGreaterThanOrEqual(1);
    expect(fake.calls.some((x) => x.path.includes(liveSub))).toBe(false);
    expect((await subRows(c.u.id))[0].needs_review).toBe('stripe_not_found');
    expect((await me(c.u)).status).toBe('inactive'); // never granted from an unreadable row
    const p2 = await resync();
    expect(p2).toMatchObject({ errors: 0, complete: true, deferred_resolved: 1 });
    expect((await me(a.u)).status).toBe('inactive'); expect((await me(b.u)).status).toBe('active');
    const p3 = await resync(); // stable: needs_review rows are not retried forever
    expect(p3).toMatchObject({ errors: 0, needs_review: 0, complete: true });
  });

  it('MB-4/T8: 51 unreadable rows (404 or persistent 5xx) cannot starve a good row', { timeout: 60_000 }, async () => {
    for (const mode of ['404', '5xx']) {
      const bad = (await paidUsers(51)).map((x) => x.sub);
      const [g] = await paidUsers(1);
      await isolateResync([...bad, g.sub], [], { clearDeferred: true });
      if (mode === '404') for (const id of bad) fake.subs.delete(id);
      else { const badSet = new Set(bad.map((id) => `/v1/subscriptions/${id}`)); fake.delayFor = async (x) => { if (badSet.has(x.path)) throw new Error('persistent provider failure'); }; }
      fake.subs.get(g.sub).status = 'past_due';
      const d = subEvent('customer.subscription.updated', fake.subs.get(g.sub));
      await deliver(d, { envOver: OFF() });
      let goodFixedAt = null;
      const E = mode === '404' ? ACCT() : BILLING(); // MB-5: 404s are definitive only with a verified account
      for (let i = 1; i <= 3 && !goodFixedAt; i++) { await resync(E); if ((await subRows(g.u.id))[0].status === 'past_due') goodFixedAt = i; }
      expect(goodFixedAt, mode).not.toBeNull(); expect(goodFixedAt, mode).toBeLessThanOrEqual(2);
      expect((await me(g.u)).status).toBe('inactive');
      if (mode === '404') {
        const p = await resync(E); expect(p.complete).toBe(true);
        expect((await peRow(d.id)).outcome).toBe('resolved_by_membership_resync');
      } else {
        expect((await peRow(d.id)).processed_at).toBeNull(); // unreadable rows still eligible: not falsely resolved
        fake.delayFor = null;
        const p = await resync(); const p2 = p.complete ? p : await resync();
        expect(p2.complete).toBe(true); expect((await peRow(d.id)).outcome).toBe('resolved_by_membership_resync');
      }
    }
  });

  it('refused resync (billing off) is audited', async () => {
    const owner = await getOwner(); await clearRl();
    expect((await api('POST', '/admin/memberships/resync', { cookie: owner.cookie, envOver: OFF() })).status).toBe(503);
    const a = await env.DB.prepare(`SELECT meta FROM audit_log WHERE action='membership.resync_refused' AND actor_id=? ORDER BY created_at DESC LIMIT 1`).bind(owner.id).first();
    expect(JSON.parse(a.meta).reason).toBe('billing_disabled');
  });
  // ---------------- MB-5 (review bd42468) ----------------
  const nr = async (u) => (await subRows(u.id))[0].needs_review;
  const accountCalls = () => fake.calls.filter((c) => c.path === '/v1/account').length;

  it('MB-5/A1: wrong-account key (configured account mismatch) aborts the pass; nothing marked, nobody loses entitlement', async () => {
    const xs = await paidUsers(4); await isolateResync(xs.map((x) => x.sub), [], { clearDeferred: true });
    const d = subEvent('customer.subscription.updated', fake.subs.get(xs[0].sub)); await deliver(d, { envOver: OFF() });
    fake.subs.clear(); fake.accountId = 'acct_TESTONLYotherAcct9'; // key now sees a different account: every object 404s
    const p = await resync(ACCT());
    expect(p).toMatchObject({ aborted: 'stripe_account_mismatch', needs_review: 0, complete: false, deferred_resolved: 0, account_verified: false });
    for (const x of xs) { expect(await nr(x.u)).toBeNull(); expect((await me(x.u)).status).toBe('active'); }
    expect((await peRow(d.id)).processed_at).toBeNull();
    expect(accountCalls()).toBe(1);
  });

  it('MB-5/A2: no account configured: N consecutive 404s abort without marking; <N 404s with no successful read stay unmarked', async () => {
    const xs = await paidUsers(4); await isolateResync(xs.map((x) => x.sub), [], { clearDeferred: true });
    fake.subs.clear();
    const p = await resync();
    expect(p).toMatchObject({ aborted: 'stripe_not_found_streak', needs_review: 0, complete: false });
    for (const x of xs) { expect(await nr(x.u)).toBeNull(); expect((await me(x.u)).status).toBe('active'); }
    const ys = await paidUsers(2); await isolateResync(ys.map((x) => x.sub), [], { clearDeferred: true });
    for (const y of ys) fake.subs.delete(y.sub);
    const q = await resync();
    expect(q).toMatchObject({ aborted: null, needs_review: 0, unverified_not_found: 2 });
    for (const y of ys) { expect(await nr(y.u)).toBeNull(); expect((await me(y.u)).status).toBe('active'); }
    expect(accountCalls()).toBe(0);
  });

  it('MB-5/A3: verified account: 404 rows are marked needs_review (never entitled), /v1/account read once per pass', async () => {
    const [a, b, c] = await paidUsers(3); await isolateResync([a.sub, b.sub, c.sub], [], { clearDeferred: true });
    fake.subs.delete(a.sub); fake.subs.delete(b.sub); fake.subs.delete(c.sub);
    const p = await resync(ACCT());
    expect(p).toMatchObject({ aborted: null, needs_review: 3, account_verified: true });
    expect(accountCalls()).toBe(1);
    for (const x of [a, b, c]) { expect(await nr(x.u)).toBe('stripe_not_found'); expect((await me(x.u)).status).toBe('inactive'); }
  });

  it('MB-5/A4: account check unreadable => abort, nothing marked', async () => {
    const [a] = await paidUsers(1); await isolateResync([a.sub], [], { clearDeferred: true });
    fake.subs.delete(a.sub); fake.failNext = (c) => c.path === '/v1/account';
    const p = await resync(ACCT());
    expect(p).toMatchObject({ aborted: 'stripe_account_unverified', needs_review: 0, complete: false });
    expect(await nr(a.u)).toBeNull();
  });

  it('MB-5/R1: owner retry re-includes needs_review rows without granting; next successful read clears them; audited', async () => {
    const [a, b] = await paidUsers(2); await isolateResync([a.sub, b.sub], [], { clearDeferred: true });
    const keepA = fake.subs.get(a.sub);
    fake.subs.delete(a.sub); fake.subs.delete(b.sub);
    await resync(ACCT());
    expect(await nr(a.u)).toBe('stripe_not_found'); expect(await nr(b.u)).toBe('stripe_not_found');
    const owner = await getOwner();
    const call = async (body, { cookie = owner.cookie, envOver = BILLING(), headers = {} } = {}) => { await clearRl(); return api('POST', '/admin/memberships/needs-review/retry', { cookie, envOver, body, headers }); };
    expect((await call({ all: true }, { cookie: a.u.cookie })).status).toBe(403); // not owner
    expect((await call({ all: true }, { headers: { Origin: 'https://evil.example' } })).status).toBe(403); // bad origin
    expect((await call({})).status).toBe(422);
    expect((await call({ subscription_ids: ['nope'] })).status).toBe(422);
    expect((await call({ all: true, subscription_ids: [a.sub] })).status).toBe(422);
    // billing off => 503, refused call audited, nothing changed
    expect((await call({ subscription_ids: [a.sub] }, { envOver: OFF() })).status).toBe(503);
    expect(await env.DB.prepare(`SELECT 1 FROM audit_log WHERE action='membership.needs_review_retry_refused' AND actor_id=?`).bind(owner.id).first()).toBeTruthy();
    expect(await nr(a.u)).toBe('stripe_not_found');
    const r = await call({ subscription_ids: [a.sub] });
    expect(r.status).toBe(200); expect(r.json.retry).toMatchObject({ subscriptions: 1, checkouts: 0 });
    expect(await nr(a.u)).toBe('owner_retry_pending');
    expect((await me(a.u)).status).toBe('inactive'); // re-included, NOT granted
    const au = await env.DB.prepare(`SELECT meta FROM audit_log WHERE action='membership.needs_review_retry' AND actor_id=? ORDER BY created_at DESC LIMIT 1`).bind(owner.id).first();
    expect(JSON.parse(au.meta)).toMatchObject({ subscriptions: 1, subscription_ids: [a.sub] });
    fake.subs.set(a.sub, keepA); // readable again
    const p = await resync(ACCT());
    expect(p.subscriptions.membership_subscription_synced).toBeGreaterThanOrEqual(1);
    expect(await nr(a.u)).toBeNull(); expect((await me(a.u)).status).toBe('active');
    expect(await nr(b.u)).toBe('stripe_not_found'); // not re-included: untouched
    // still 404 after retry => re-marked (no grant)
    expect((await call({ all: true })).json.retry.subscriptions).toBeGreaterThanOrEqual(1); // all:true also re-includes leftovers from earlier tests
    expect(await nr(b.u)).toBe('owner_retry_pending'); expect((await me(b.u)).status).toBe('inactive');
    await resync(ACCT()); expect(await nr(b.u)).toBe('stripe_not_found'); expect((await me(b.u)).status).toBe('inactive');
  });

  it('MB-5/C1: a needs_review open checkout URL is never reused; Stripe-expired one is retired and a new checkout starts', async () => {
    const u = await newUser();
    const r1 = await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' } });
    expect(r1.status).toBe(200);
    const sid = r1.json.checkout_url.split('/').pop();
    await env.DB.prepare(`UPDATE membership_checkouts SET needs_review='stripe_not_found' WHERE stripe_session_id=?`).bind(sid).run();
    const saved = fake.sessions.get(sid); fake.sessions.delete(sid); // 404 at Stripe
    const r2 = await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' } });
    expect(r2.status).toBe(409); expect(r2.json.error.code).toBe('membership_checkout_needs_review'); expect(JSON.stringify(r2.json)).not.toContain('checkout.stripe.com');
    fake.sessions.set(sid, saved); // still open at Stripe => still not reused
    const r3 = await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' } });
    expect(r3.status).toBe(409); expect(r3.json.error.code).toBe('membership_checkout_needs_review'); expect(JSON.stringify(r3.json)).not.toContain('checkout.stripe.com');
    saved.status = 'expired'; // expired at Stripe => retired, fresh session
    const r4 = await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' } });
    expect(r4.status, JSON.stringify(r4.json)).toBe(200); expect(r4.json.reused).toBe(false); expect(r4.json.checkout_url).not.toContain(sid);
  });

  it('MB-5/AF: audit write failure after a committed resync returns 200 with audit_failed (not 500)', async () => {
    await isolateResync([], [], { clearDeferred: true });
    await env.DB.prepare(`CREATE TRIGGER testonly_fail_audit BEFORE INSERT ON audit_log WHEN NEW.action = 'membership.resync' BEGIN SELECT RAISE(ABORT, 'testonly audit failure'); END`).run();
    try {
      await clearRl();
      const r = await api('POST', '/admin/memberships/resync', { cookie: (await getOwner()).cookie });
      expect(r.status).toBe(200); expect(r.json.audit_failed).toBe(true); expect(r.json.resync).toBeTruthy();
    } finally { await env.DB.prepare(`DROP TRIGGER testonly_fail_audit`).run(); }
  });

  it('MB-5/CFG: a malformed MEMBERSHIP_STRIPE_ACCOUNT_ID keeps billing off', () => {
    expect(membershipBillingConfig({ ...env, ...BILLING({ MEMBERSHIP_STRIPE_ACCOUNT_ID: 'not-an-account' }) })).toMatchObject({ ok: false, reason: 'stripe_account_invalid' });
    expect(membershipBillingConfig({ ...env, ...ACCT() })).toMatchObject({ ok: true, expectedAccount: TEST_ACCT });
  });
});

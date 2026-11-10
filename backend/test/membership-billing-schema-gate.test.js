// Membership billing schema gate (separate file: it DROPS the 0016 tables in its own isolated storage).
// Membership billing slice. ALL VALUES BELOW ARE TEST-ONLY FIXTURES: the price id, amount, currency and interval
// are arbitrary and are NOT a PIKK catalog (none is approved). Stripe is a local fake behind a stubbed fetch;
// no request leaves the test isolate. Keys/secrets are local placeholders, not real credentials.
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import worker from '../src/index.js';
import { ORIGIN, newUser, freshIp } from './helpers.js';
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

// ---------------- fake Stripe ----------------
let fake;
function newFake() {
  let n = 0; const id = (p) => `${p}_${Date.now().toString(36)}${(++n).toString(36)}x`;
  const f = {
    calls: [], idem: new Map(), sessions: new Map(), subs: new Map(), failNext: null, delayFor: null,
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

// ---------------- schema gate (0016 tables ABSENT) ----------------
const dropTables = async () => { for (const t of ['membership_subscriptions', 'membership_checkouts']) await env.DB.prepare(`DROP TABLE IF EXISTS ${t}`).run(); };
const coinOrder = async (u, amt) => { const id = `ord_testonly_gate_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`; await env.DB.prepare(`INSERT INTO payment_orders(id,buyer_id,kind,amount_cents) VALUES (?,?,'coins',?)`).bind(id, u.id, amt).run(); return id; };
const coinEvt = (o, amt) => evt('checkout.session.completed', { id: 'cs_coin_' + o, object: 'checkout.session', mode: 'payment', payment_status: 'paid', amount_total: amt, currency: 'usd', metadata: { order_id: o } });
const bal = async (u) => (await env.DB.prepare(`SELECT COALESCE(SUM(amount),0) b FROM ledger_entries WHERE account_id=?`).bind(`acct_${u.id}`).first()).b;

describe('schema gate: billing configured but 0016 not applied fails closed (no 5xx loops)', () => {
  it('R2: /health reason schema_missing, /me inactive 200, checkout 503, events finished as ignored, 0 Stripe calls; coins still credit', async () => {
    await dropTables();
    const u = await newUser();
    const h = await api('GET', '/health');
    expect(h.json.capabilities.membership_billing).toBe(false);
    expect(h.json.membership_billing_reason).toBe('schema_missing');
    const m = await api('GET', '/memberships/me', { cookie: u.cookie });
    expect(m.status).toBe(200);
    expect(m.json.membership).toMatchObject({ status: 'inactive', billing_configured: false, billing_reason: 'schema_missing', activation: 'not_available' });
    const c = await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' } });
    expect(c.status).toBe(503); expect(c.json.error.details.reason).toBe('schema_missing');
    const e = evt('customer.subscription.updated', { id: 'sub_testonlyGate1', object: 'subscription' });
    const d = await deliver(e);
    expect(d.status).toBe(200); expect(d.json.outcome).toBe('ignored_membership_schema_missing');
    expect((await deliver(e)).json.duplicate).toBe(true); // finished, not retried forever
    expect(fake.calls.length).toBe(0);
    const o = await coinOrder(u, 300);
    expect((await deliver(coinEvt(o, 300))).json.outcome).toBe('credited');
    expect(await bal(u)).toBe(300);
  });

  it('R1: billing OFF with tables absent: reason billing_disabled, nothing touches the tables', async () => {
    await dropTables();
    const u = await newUser();
    const h = await api('GET', '/health', { envOver: {} });
    expect(h.json.capabilities.membership_billing).toBe(false); expect(h.json.membership_billing_reason).toBe('billing_disabled');
    expect((await api('GET', '/memberships/me', { cookie: u.cookie, envOver: {} })).status).toBe(200);
    expect((await api('POST', '/memberships/checkout', { cookie: u.cookie, body: { plan_id: 'testonly_plan' }, envOver: {} })).status).toBe(503);
    expect((await deliver(evt('customer.subscription.updated', { id: 'sub_testonlyGate2', object: 'subscription' }), { envOver: {} })).json.outcome).toBe('ignored_membership_billing_off');
    expect(fake.calls.length).toBe(0);
  });
});

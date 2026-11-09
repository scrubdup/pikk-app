// Payment settlement atomicity/idempotency (PAY-1 / PAY-2 fix). All fixtures are TEST-ONLY:
// amounts are arbitrary integers, the secret is the local test secret, no Stripe calls are made.
import { describe, it, expect } from 'vitest';
import { env, SELF } from 'cloudflare:test';
import { newUser } from './helpers.js';
import { hmacSha256Hex } from '../src/crypto.js';
import { stripeWebhook, orderCreditIds } from '../src/webhook.js';

const SECRET = 'whsec_local_test_only_not_a_real_secret';
let seq = 0;
const uid = () => `${++seq}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
async function createOrder(buyerId, amount, { kind = 'coins', status = 'pending', ppid = null, currency = 'usd' } = {}) {
  const id = `ord_testonly_${uid()}`;
  await env.DB.prepare(`INSERT INTO payment_orders(id,buyer_id,kind,amount_cents,currency,status,provider_payment_id,paid_at) VALUES (?,?,?,?,?,?,?,?)`)
    .bind(id, buyerId, kind, amount, currency, status, ppid, status === 'paid' ? new Date().toISOString() : null).run();
  return id;
}
const event = (orderId, amount, { id = `evt_testonly_${uid()}`, cs = `cs_testonly_${orderId}`, currency = 'usd', extra = {} } = {}) =>
  ({ id, type: 'checkout.session.completed', data: { object: { id: cs, payment_status: 'paid', amount_total: amount, currency, metadata: { order_id: orderId, ...extra } } } });
async function signedReq(evt, secret = SECRET) {
  const t = Math.floor(Date.now() / 1000); const body = JSON.stringify(evt);
  const sig = await hmacSha256Hex(secret, `${t}.${body}`);
  return new Request('https://api.test/webhooks/stripe', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Stripe-Signature': `t=${t},v1=${sig}` }, body });
}
const deliver = async (evt, secret) => { const r = await SELF.fetch(await signedReq(evt, secret)); return { status: r.status, json: await r.json() }; };
const direct = async (db, evt) => { try { const r = await stripeWebhook({ ...env, DB: db }, await signedReq(evt)); return { status: r.status, json: await r.json() }; } catch (e) { return { threw: e.message }; } };
const bal = async (userId) => (await env.DB.prepare(`SELECT COALESCE(SUM(amount),0) b FROM ledger_entries WHERE account_id = ?`).bind(`acct_${userId}`).first()).b;
const ord = (id) => env.DB.prepare('SELECT status, provider_payment_id, paid_at FROM payment_orders WHERE id=?').bind(id).first();
const pe = (id) => env.DB.prepare(`SELECT id, outcome, processed_at, order_id FROM payment_events WHERE provider_event_id=?`).bind(id).first();
const orderTxns = async (o) => (await env.DB.prepare(
  `SELECT COUNT(*) c FROM ledger_transactions WHERE id = ?1 OR payment_event_id IN (SELECT id FROM payment_events WHERE order_id = ?2)`)
  .bind(orderCreditIds(o).txn, o).first()).c;
// Mode-agnostic: counts entries of ANY purchase txn for the order (deterministic id or legacy event-bound id).
const orderEntries = async (o) => (await env.DB.prepare(`SELECT COUNT(*) c, COALESCE(SUM(amount),0) s FROM ledger_entries WHERE transaction_id IN
  (SELECT id FROM ledger_transactions WHERE id = ?1 OR payment_event_id IN (SELECT id FROM payment_events WHERE order_id = ?2))`).bind(orderCreditIds(o).txn, o).first());
const deterministicTxn = async (o) => (await env.DB.prepare(`SELECT COUNT(*) c FROM ledger_transactions WHERE id = ?`).bind(orderCreditIds(o).txn).first()).c;
const creditAudits = async (o) => (await env.DB.prepare(`SELECT COUNT(*) c FROM audit_log WHERE action='payment.credited' AND json_extract(meta,'$.order') = ?`).bind(o).first()).c;
const globalSum = async () => (await env.DB.prepare('SELECT COALESCE(SUM(amount),0) s FROM ledger_entries').first()).s;
const unbalanced = async () => (await env.DB.prepare('SELECT COUNT(*) c FROM (SELECT transaction_id FROM ledger_entries GROUP BY transaction_id HAVING SUM(amount) <> 0)').first()).c;
function dbProxy(over) { return new Proxy(env.DB, { get(t, k) { if (k in over) return over[k](t); const v = t[k]; return typeof v === 'function' ? v.bind(t) : v; } }); }

// Crash injector: the Nth DB round-trip (run/first/all/batch) either throws BEFORE executing (isolate died before the
// request reached D1: nothing applied) or AFTER executing (D1 committed, the caller never saw the result). No
// compensating code gets a chance to run after the crash because every later call also throws (isolate is gone).
function crashAt(n, when) {
  let i = 0; let dead = false; const real = new WeakMap();
  const tick = async (fn) => {
    if (dead) throw new Error('isolate gone');
    if (++i === n) { dead = true; if (when === 'before') throw new Error('crash before'); await fn(); throw new Error('crash after commit'); }
    return fn();
  };
  const wrap = (stmt) => {
    const p = new Proxy(stmt, { get(t, k) {
      if (k === 'bind') return (...a) => wrap(t.bind(...a));
      if (k === 'run' || k === 'first' || k === 'all' || k === 'raw') return (...a) => tick(() => t[k](...a));
      const v = t[k]; return typeof v === 'function' ? v.bind(t) : v; } });
    real.set(p, stmt); return p;
  };
  const db = new Proxy(env.DB, { get(t, k) {
    if (k === 'prepare') return (sql) => wrap(t.prepare(sql));
    if (k === 'batch') return (stmts) => tick(() => t.batch(stmts.map((s) => real.get(s) || s)));
    const v = t[k]; return typeof v === 'function' ? v.bind(t) : v; } });
  return { db, calls: () => i };
}

async function expectCreditedOnce(o, userId, amount) {
  expect(await bal(userId)).toBe(amount);
  expect(await orderTxns(o)).toBe(1);
  const en = await orderEntries(o); expect(en.c).toBe(2); expect(en.s).toBe(0);
  expect(await creditAudits(o)).toBe(1);
  expect((await ord(o)).status).toBe('paid');
  expect(await unbalanced()).toBe(0);
  expect(await globalSum()).toBe(0);
}

describe('PAY-1: failure/crash before commit leaves nothing applied and is retryable', () => {
  it('isolate dies before the batch is sent: event stays unprocessed, order untouched; same-event retry credits once', async () => {
    const u = await newUser(); const o = await createOrder(u.id, 500); const e = event(o, 500);
    const crash = dbProxy({ batch: () => async () => { throw new Error('isolate crash'); } });
    expect((await direct(crash, e)).threw).toBe('isolate crash');
    expect(await ord(o)).toMatchObject({ status: 'pending', provider_payment_id: null });
    expect((await pe(e.id)).processed_at).toBeNull();
    expect(await bal(u.id)).toBe(0);
    expect((await deliver(e)).json.outcome).toBe('credited');
    expect((await deliver(e)).json).toMatchObject({ duplicate: true, outcome: 'credited' });
    expect((await deliver(event(o, 500))).json.outcome).toBe('rejected_order_not_pending');
    await expectCreditedOnce(o, u.id, 500);
  });

  it('real mid-transaction failure (statements already executed, then a later statement aborts) rolls back everything', async () => {
    const u = await newUser(); const o = await createOrder(u.id, 410); const e = event(o, 410);
    // Appends a statement that violates a PK AFTER all settlement statements ran inside the same D1 transaction.
    const midFail = dbProxy({ batch: (t) => async (stmts) => t.batch([...stmts,
      t.prepare(`INSERT INTO ledger_accounts(id,kind,currency,created_at) VALUES ('acct_external_stripe','external','pikk_coin','x')`)]) });
    expect((await direct(midFail, e)).threw).toMatch(/UNIQUE|constraint/i);
    expect(await ord(o)).toMatchObject({ status: 'pending', provider_payment_id: null });
    expect((await pe(e.id)).processed_at).toBeNull();
    expect(await orderTxns(o)).toBe(0); expect((await orderEntries(o)).c).toBe(0); expect(await creditAudits(o)).toBe(0);
    // a DIFFERENT event may legitimately settle after a rolled-back attempt; then A's retry must not double-credit
    expect((await deliver(event(o, 410))).json.outcome).toBe('credited');
    expect((await deliver(e)).json.outcome).toBe('rejected_order_not_pending');
    await expectCreditedOnce(o, u.id, 410);
  });

  it('repairs a pre-fix corrupt state (order paid, 0 ledger, event unprocessed) on SAME-event retry', async () => {
    const u = await newUser(); const e0 = event('placeholder', 520);
    const o = await createOrder(u.id, 520, { status: 'paid', ppid: e0.data.object.id.replace('placeholder', 'x') });
    const e = event(o, 520, { cs: e0.data.object.id.replace('placeholder', 'x') });
    // what the old code left behind: event row inserted, never finished
    await env.DB.prepare(`INSERT INTO payment_events(id,provider,provider_event_id,event_type,order_id,payload_sha256,signature_verified,received_at)
      VALUES (?, 'stripe', ?, 'checkout.session.completed', ?, 'h', 1, ?)`).bind(`pe_testonly_${uid()}`, e.id, o, new Date().toISOString()).run();
    expect(await bal(u.id)).toBe(0);
    // a distinct event carrying a DIFFERENT checkout session id must not take over the paid order
    expect((await deliver(event(o, 520, { cs: 'cs_testonly_other_session' }))).json.outcome).toBe('rejected_order_not_pending');
    expect(await bal(u.id)).toBe(0);
    // wrong amount on the repair path is rejected
    expect((await deliver(event(o, 521, { cs: e.data.object.id }))).json.outcome).toBe('rejected_amount_mismatch');
    const r = await deliver(e);
    expect(r.json.outcome).toBe('credited');
    expect((await ord(o)).provider_payment_id).toBe(e.data.object.id);
    expect((await deliver(e)).json.duplicate).toBe(true);
    expect((await deliver(event(o, 520, { cs: e.data.object.id }))).json.outcome).toBe('rejected_order_not_pending');
    await expectCreditedOnce(o, u.id, 520);
  });

  it('repairs a paid-uncredited order via a distinct event for the SAME checkout session, exactly once under concurrency', async () => {
    const u = await newUser(); const cs = `cs_testonly_${uid()}`; const o = await createOrder(u.id, 530, { status: 'paid', ppid: cs });
    const rs = await Promise.all(Array.from({ length: 5 }, () => deliver(event(o, 530, { cs }))));
    expect(rs.map((r) => r.json.outcome).sort()).toEqual(['credited', ...Array(4).fill('rejected_order_not_pending')]);
    await expectCreditedOnce(o, u.id, 530);
  });
});

describe('crash at EVERY DB round-trip, before and after commit, then provider retries', () => {
  it('always converges to exactly one credit for one order (same-event retry, then a distinct event)', async () => {
    // how many round-trips a clean settlement takes
    const probe = crashAt(1e9, 'before'); const u0 = await newUser(); const o0 = await createOrder(u0.id, 11);
    expect((await direct(probe.db, event(o0, 11))).json.outcome).toBe('credited');
    const total = probe.calls(); expect(total).toBeGreaterThan(1); console.log('PAYATOMIC round-trips per clean settlement:', total);
    for (const when of ['before', 'after']) {
      for (let n = 1; n <= total; n++) {
        const u = await newUser(); const o = await createOrder(u.id, 100 + n); const e = event(o, 100 + n);
        const r = await direct(crashAt(n, when).db, e);
        expect(r.threw, `${when}#${n}`).toMatch(/crash|isolate gone/);
        expect(await bal(u.id), `${when}#${n} mid`).toBeLessThanOrEqual(100 + n);
        // provider retries the same event (Stripe does until 2xx), then a distinct event for the same order arrives
        const r1 = await deliver(e); expect(r1.status).toBe(200);
        expect(r1.json.outcome, `${when}#${n}`).toBe('credited');
        expect((await deliver(e)).json.duplicate).toBe(true);
        expect((await deliver(event(o, 100 + n))).json.outcome).toBe('rejected_order_not_pending');
        await expectCreditedOnce(o, u.id, 100 + n);
      }
    }
  });

  it('same, but a DISTINCT event arrives before the crashed event is retried', async () => {
    const total = 4; // = round-trips of a clean settlement (logged by the previous test)
    for (const when of ['before', 'after']) {
      for (let n = 1; n <= total; n++) {
        const u = await newUser(); const o = await createOrder(u.id, 200 + n); const e = event(o, 200 + n);
        await direct(crashAt(n, when).db, e);
        const d = await deliver(event(o, 200 + n, { cs: e.data.object.id }));
        expect(d.status).toBe(200);
        await deliver(e); await deliver(e);
        await expectCreditedOnce(o, u.id, 200 + n);
      }
    }
  });
});

describe('PAY-2: commit succeeded but the caller saw an error (uncertain outcome)', () => {
  it('batch commits then the call throws: no revert, same-event retries are duplicates, distinct events never re-credit', async () => {
    const u = await newUser(); const o = await createOrder(u.id, 700); const e = event(o, 700);
    const lateThrow = dbProxy({ batch: (t) => async (s) => { await t.batch(s); throw new Error('network error after commit'); } });
    expect((await direct(lateThrow, e)).threw).toBe('network error after commit');
    expect(await ord(o)).toMatchObject({ status: 'paid', provider_payment_id: e.data.object.id });
    expect(await pe(e.id)).toMatchObject({ outcome: 'credited' });
    for (let i = 0; i < 3; i++) expect((await deliver(e)).json).toMatchObject({ duplicate: true, outcome: 'credited' });
    for (let i = 0; i < 3; i++) expect((await deliver(event(o, 700))).json.outcome).toBe('rejected_order_not_pending');
    // repeated uncertain-outcome failures on distinct events also never credit
    expect((await direct(lateThrow, event(o, 700))).threw).toBe('network error after commit');
    await expectCreditedOnce(o, u.id, 700);
  });

  it('uncertain commit racing concurrent same + distinct retries settles once', async () => {
    const u = await newUser(); const o = await createOrder(u.id, 710); const e = event(o, 710);
    const lateThrow = dbProxy({ batch: (t) => async (s) => { await t.batch(s); throw new Error('response lost'); } });
    const rs = await Promise.all([direct(lateThrow, e), deliver(e), deliver(e), deliver(event(o, 710)), deliver(event(o, 710)), direct(lateThrow, e)]);
    expect(rs.filter((r) => r.json && r.json.outcome === 'credited').length + rs.filter((r) => r.threw).length).toBeGreaterThan(0);
    await expectCreditedOnce(o, u.id, 710);
    expect((await pe(e.id)).processed_at).not.toBeNull();
  });

  it('pre-fix corrupt PAY-2 state (order reverted to pending but already credited by a legacy txn) never double-credits', async () => {
    const u = await newUser(); const o = await createOrder(u.id, 720); const t = new Date().toISOString();
    const legacyPe = `pe_testonly_${uid()}`; const legacyTxn = `txn_testonly_legacy_${uid()}`;
    await env.DB.batch([
      env.DB.prepare(`INSERT INTO payment_events(id,provider,provider_event_id,event_type,order_id,payload_sha256,signature_verified,received_at,processed_at,outcome)
        VALUES (?, 'stripe', ?, 'checkout.session.completed', ?, 'h', 1, ?, ?, 'credited')`).bind(legacyPe, `evt_testonly_legacy_${uid()}`, o, t, t),
      env.DB.prepare(`INSERT INTO ledger_transactions(id,kind,payment_event_id,initiated_by,memo,created_at) VALUES (?, 'purchase', ?, ?, 'coin purchase', ?)`).bind(legacyTxn, legacyPe, u.id, t),
      env.DB.prepare(`INSERT INTO ledger_entries(id,transaction_id,account_id,amount,created_at) VALUES (?, ?, 'acct_external_stripe', -720, ?)`).bind(`le_testonly_${uid()}`, legacyTxn, t),
      env.DB.prepare(`INSERT INTO ledger_entries(id,transaction_id,account_id,amount,created_at) VALUES (?, ?, ?, 720, ?)`).bind(`le_testonly_${uid()}`, legacyTxn, `acct_${u.id}`, t),
    ]);
    expect(await bal(u.id)).toBe(720);
    const rs = await Promise.all([deliver(event(o, 720)), deliver(event(o, 720)), deliver(event(o, 720))]);
    expect(rs.map((r) => r.json.outcome)).toEqual(Array(3).fill('rejected_order_not_pending'));
    expect(await bal(u.id)).toBe(720);
    expect(await orderTxns(o)).toBe(1);
    expect((await orderEntries(o)).c).toBe(2); // only the legacy pair
    expect(await deterministicTxn(o)).toBe(0); // no new credit was added
  });
});

describe('concurrency, mapping and policy', () => {
  it('many concurrent same-event and distinct-event deliveries: exactly one credit, one audit, every event finished', async () => {
    const u = await newUser(); const o = await createOrder(u.id, 300); const e = event(o, 300);
    const distinct = Array.from({ length: 4 }, () => event(o, 300));
    const rs = await Promise.all([...Array(4).fill(e).map((x) => deliver(x)), ...distinct.map((x) => deliver(x))]);
    expect(rs.every((r) => r.status === 200)).toBe(true);
    await expectCreditedOnce(o, u.id, 300);
    const rows = (await env.DB.prepare(`SELECT outcome, processed_at FROM payment_events WHERE order_id = ?`).bind(o).all()).results;
    expect(rows.length).toBe(5);
    expect(rows.every((r) => r.processed_at)).toBe(true);
    expect(rows.filter((r) => r.outcome === 'credited').length).toBe(1);
  });

  it('DB itself refuses a second purchase txn for the same order id (deterministic PK)', async () => {
    const u = await newUser(); const o = await createOrder(u.id, 120);
    expect((await deliver(event(o, 120))).json.outcome).toBe('credited');
    expect(await deterministicTxn(o)).toBe(1);
    const e2 = event(o, 120);
    expect((await deliver(e2)).json.outcome).toBe('rejected_order_not_pending');
    const other = await pe(e2.id);
    await expect(env.DB.prepare(`INSERT INTO ledger_transactions(id,kind,payment_event_id,initiated_by,created_at) VALUES (?, 'purchase', ?, ?, ?)`)
      .bind(orderCreditIds(o).txn, other.id, u.id, new Date().toISOString()).run()).rejects.toThrow(/UNIQUE|constraint/i);
    await expectCreditedOnce(o, u.id, 120);
  });

  it('buyer comes from the server order row; currency/amount/kind/status are enforced', async () => {
    const u = await newUser(); const v = await newUser();
    const o = await createOrder(u.id, 250);
    expect((await deliver(event(o, 250, { extra: { user_id: v.id, buyer_id: v.id } }))).json.outcome).toBe('credited');
    expect(await bal(v.id)).toBe(0); await expectCreditedOnce(o, u.id, 250);
    const o2 = await createOrder(u.id, 250);
    expect((await deliver(event(o2, 250, { currency: 'eur' }))).json.outcome).toBe('rejected_amount_mismatch');
    expect((await deliver(event(o2, 249))).json.outcome).toBe('rejected_amount_mismatch');
    expect((await ord(o2)).status).toBe('pending');
    const sub = await createOrder(u.id, 250, { kind: 'subscription', status: 'paid', ppid: `cs_testonly_${uid()}` });
    expect((await deliver(event(sub, 250))).json.outcome).toBe('ignored_unsupported_kind');
    for (const status of ['refunded', 'cancelled', 'failed']) {
      const x = await createOrder(u.id, 250, { status });
      expect((await deliver(event(x, 250))).json.outcome).toBe('rejected_order_not_pending');
      expect((await ord(x)).status).toBe(status);
    }
    expect(await bal(u.id)).toBe(250);
  });

  it('a bad signature on a retry of an unprocessed event does not settle it', async () => {
    const u = await newUser(); const o = await createOrder(u.id, 90); const e = event(o, 90);
    await direct(dbProxy({ batch: () => async () => { throw new Error('isolate crash'); } }), e);
    expect((await deliver(e, 'whsec_wrong_testonly')).status).toBe(400);
    expect((await pe(e.id)).processed_at).toBeNull();
    expect(await bal(u.id)).toBe(0);
    expect((await deliver(e)).json.outcome).toBe('credited');
    await expectCreditedOnce(o, u.id, 90);
  });

  it('disabled buyer: preserves the EXISTING behaviour (credit follows the paid order). Policy is an owner decision, unchanged here', async () => {
    const u = await newUser(); const o = await createOrder(u.id, 60);
    await env.DB.prepare(`UPDATE users SET disabled_at = ? WHERE id = ?`).bind(new Date().toISOString(), u.id).run();
    expect((await deliver(event(o, 60))).json.outcome).toBe('credited');
    await expectCreditedOnce(o, u.id, 60);
  });
});

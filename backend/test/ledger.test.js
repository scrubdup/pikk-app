import { describe, it, expect } from 'vitest';
import { env, SELF } from 'cloudflare:test';
import { call, newUser } from './helpers.js';
import { hmacSha256Hex } from '../src/crypto.js';

const SECRET = 'whsec_local_test_only_not_a_real_secret';
let seq = 0;

async function createOrder(buyerId, amount, kind = 'coins') {
  const id = `ord_test_${++seq}_${Date.now()}`;
  await env.DB.prepare(`INSERT INTO payment_orders(id,buyer_id,kind,amount_cents) VALUES (?,?,?,?)`).bind(id, buyerId, kind, amount).run();
  return id;
}
function event(orderId, amount, { id = `evt_${++seq}`, paid = 'paid', type = 'checkout.session.completed' } = {}) {
  return { id, type, data: { object: { id: `cs_${seq}`, payment_status: paid, amount_total: amount, currency: 'usd', metadata: { order_id: orderId } } } };
}
async function deliver(evt, { secret = SECRET, t = Math.floor(Date.now() / 1000), raw } = {}) {
  const body = raw ?? JSON.stringify(evt);
  const sig = await hmacSha256Hex(secret, `${t}.${body}`);
  const res = await SELF.fetch('https://api.test/webhooks/stripe', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Stripe-Signature': `t=${t},v1=${sig}` }, body });
  return { status: res.status, json: await res.json() };
}
const bal = async (u) => (await call('GET', '/ledger/balance', { cookie: u.cookie })).json.balance;
const globalSum = async () => (await env.DB.prepare('SELECT COALESCE(SUM(amount),0) s FROM ledger_entries').first()).s;
const unbalancedTxns = async () => (await env.DB.prepare('SELECT COUNT(*) c FROM (SELECT transaction_id FROM ledger_entries GROUP BY transaction_id HAVING SUM(amount) <> 0)').first()).c;

describe('payments webhook', () => {
  it('credits coins only for a valid signed event, exactly once', async () => {
    const u = await newUser();
    expect(await bal(u)).toBe(0);
    const ord = await createOrder(u.id, 500);
    const evt = event(ord, 500);
    const r1 = await deliver(evt);
    expect(r1.status).toBe(200); expect(r1.json.outcome).toBe('credited');
    expect(await bal(u)).toBe(500);
    const r2 = await deliver(evt); // provider retry
    expect(r2.status).toBe(200); expect(r2.json.duplicate).toBe(true);
    expect(await bal(u)).toBe(500);
    const order = await env.DB.prepare('SELECT status FROM payment_orders WHERE id=?').bind(ord).first();
    expect(order.status).toBe('paid');
    // a second, distinct event for the same already-paid order does not double-credit
    const r3 = await deliver(event(ord, 500));
    expect(r3.json.outcome).toBe('rejected_order_not_pending');
    expect(await bal(u)).toBe(500);
  });

  it('rejects bad signatures, wrong secret, tampered body and stale timestamps without recording', async () => {
    const u = await newUser(); const ord = await createOrder(u.id, 300);
    const evt = event(ord, 300);
    expect((await deliver(evt, { secret: 'whsec_wrong' })).status).toBe(400);
    expect((await deliver(evt, { t: Math.floor(Date.now() / 1000) - 3600 })).status).toBe(400);
    const t = Math.floor(Date.now() / 1000);
    const sig = await hmacSha256Hex(SECRET, `${t}.${JSON.stringify(evt)}`);
    const tampered = JSON.stringify({ ...evt, data: { object: { ...evt.data.object, amount_total: 999999 } } });
    const res = await SELF.fetch('https://api.test/webhooks/stripe', { method: 'POST', headers: { 'Stripe-Signature': `t=${t},v1=${sig}` }, body: tampered });
    expect(res.status).toBe(400);
    const noSig = await SELF.fetch('https://api.test/webhooks/stripe', { method: 'POST', body: JSON.stringify(evt) });
    expect(noSig.status).toBe(400);
    const cnt = await env.DB.prepare('SELECT COUNT(*) c FROM payment_events WHERE provider_event_id = ?').bind(evt.id).first();
    expect(cnt.c).toBe(0);
    expect(await bal(u)).toBe(0);
  });

  it('does not credit on amount mismatch, unpaid sessions or unknown orders', async () => {
    const u = await newUser(); const ord = await createOrder(u.id, 1000);
    expect((await deliver(event(ord, 1))).json.outcome).toBe('rejected_amount_mismatch');
    expect((await deliver(event(ord, 1000, { paid: 'unpaid' }))).json.outcome).toBe('ignored_not_paid');
    expect((await deliver(event('ord_missing', 1000))).json.outcome).toBe('rejected_unknown_order');
    expect((await deliver(event(ord, 1000, { type: 'customer.created' }))).json.outcome).toBe('ignored_event_type');
    expect(await bal(u)).toBe(0);
  });
});

describe('ledger invariants', () => {
  it('transfers move funds atomically and never allow negative balances', async () => {
    const a = await newUser(); const b = await newUser();
    await deliver(event(await createOrder(a.id, 200), 200));
    const over = await call('POST', '/ledger/transfer', { cookie: a.cookie, body: { to_handle: b.handle, amount: 201 } });
    expect(over.status).toBe(409); expect(over.json.error.code).toBe('insufficient_funds');
    expect(await bal(a)).toBe(200); expect(await bal(b)).toBe(0);
    const ok = await call('POST', '/ledger/transfer', { cookie: a.cookie, body: { to_handle: b.handle, amount: 150, memo: 'gift' } });
    expect(ok.status).toBe(200); expect(ok.json.balance).toBe(50);
    expect(await bal(b)).toBe(150);
    const zeroFromEmpty = await call('POST', '/ledger/transfer', { cookie: (await newUser()).cookie, body: { to_handle: b.handle, amount: 1 } });
    expect(zeroFromEmpty.status).toBe(409);
    for (const amount of [0, -5, 1.5, '10']) {
      expect((await call('POST', '/ledger/transfer', { cookie: a.cookie, body: { to_handle: b.handle, amount } })).status).toBe(422);
    }
    expect(await unbalancedTxns()).toBe(0);
    expect(await globalSum()).toBe(0);
  });

  it('there is no API path that credits coins from the client', async () => {
    const u = await newUser();
    for (const p of ['/ledger/credit', '/ledger/deposit', '/wallet/topup', '/payments/confirm']) {
      expect((await call('POST', p, { cookie: u.cookie, body: { amount: 1000 } })).status).toBe(404);
    }
    const self = await call('POST', '/ledger/transfer', { cookie: u.cookie, body: { to_handle: u.handle, amount: 1 } });
    expect(self.status).toBe(422);
    expect(await bal(u)).toBe(0);
  });

  it('DB rejects external (new-money) entries not bound to a verified payment event', async () => {
    const u = await newUser(); const t = new Date().toISOString();
    await env.DB.prepare(`INSERT INTO ledger_transactions(id,kind,created_at) VALUES ('txn_forge','transfer',?)`).bind(t).run();
    await expect(env.DB.batch([
      env.DB.prepare(`INSERT INTO ledger_entries(id,transaction_id,account_id,amount,created_at) VALUES ('le_f1','txn_forge','acct_external_stripe',-999,?)`).bind(t),
      env.DB.prepare(`INSERT INTO ledger_entries(id,transaction_id,account_id,amount,created_at) VALUES ('le_f2','txn_forge',?,999,?)`).bind(`acct_${u.id}`, t),
    ])).rejects.toThrow(/external_entry_requires_verified_payment_event/);
    await expect(env.DB.prepare(`INSERT INTO ledger_transactions(id,kind,created_at) VALUES ('txn_p','purchase',?)`).bind(t).run()).rejects.toThrow(/CHECK/);
    expect(await bal(u)).toBe(0);
  });

  it('DB enforces non-negative user balances even outside the API', async () => {
    const u = await newUser(); const t = new Date().toISOString();
    await env.DB.prepare(`INSERT INTO ledger_transactions(id,kind,created_at) VALUES ('txn_neg','transfer',?)`).bind(t).run();
    await expect(env.DB.prepare(`INSERT INTO ledger_entries(id,transaction_id,account_id,amount,created_at) VALUES ('le_n','txn_neg',?,-1,?)`).bind(`acct_${u.id}`, t).run()).rejects.toThrow(/insufficient_funds/);
  });

  it('ledger entries, transactions and audit log are append-only', async () => {
    const u = await newUser();
    await deliver(event(await createOrder(u.id, 50), 50));
    await expect(env.DB.prepare('UPDATE ledger_entries SET amount = 999999').run()).rejects.toThrow(/append-only/);
    await expect(env.DB.prepare('DELETE FROM ledger_entries').run()).rejects.toThrow(/append-only/);
    await expect(env.DB.prepare("UPDATE ledger_transactions SET memo = 'x'").run()).rejects.toThrow(/append-only/);
    await expect(env.DB.prepare('DELETE FROM audit_log').run()).rejects.toThrow(/append-only/);
    const dup = await env.DB.prepare(`SELECT COUNT(*) c FROM payment_events GROUP BY provider, provider_event_id HAVING c > 1`).all();
    expect(dup.results.length).toBe(0);
    expect(await bal(u)).toBe(50);
  });
});

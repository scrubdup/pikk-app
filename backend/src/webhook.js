import { ApiError, json } from './http.js';
import { hmacSha256Hex, timingSafeEqual, sha256Hex, newId } from './crypto.js';
import { isMembershipEvent, handleMembershipEvent, DEFERRED_BILLING_OFF } from './memberships.js';

const TOLERANCE_SEC = 300;

/** Verifies a Stripe-format signature header: "t=<unix>,v1=<hex hmac of `${t}.${rawBody}`>". */
export async function verifyStripeSignature(secret, header, rawBody, nowSec = Math.floor(Date.now() / 1000)) {
  if (!header) return false;
  const parts = Object.create(null); const v1 = [];
  for (const p of header.split(',')) {
    const [k, v] = p.split('=');
    if (k === 'v1') v1.push(v); else parts[k] = v;
  }
  const t = Number(parts.t);
  if (!Number.isInteger(t) || Math.abs(nowSec - t) > TOLERANCE_SEC || !v1.length) return false;
  const expected = await hmacSha256Hex(secret, `${t}.${rawBody}`);
  return v1.some(sig => timingSafeEqual(sig || '', expected));
}

/** Deterministic per-order ledger ids. ledger_transactions.id / ledger_entries.id / audit_log.id are PRIMARY KEYs
 *  in the existing schema (0002), so these ids give a DB-level "at most one purchase credit per order" guarantee
 *  without a new migration. Exported for tests. */
export const orderCreditIds = (orderId) => ({
  txn: `txn_order_${orderId}`,
  extEntry: `le_order_${orderId}_ext`,
  buyerEntry: `le_order_${orderId}_buyer`,
  audit: `aud_order_credit_${orderId}`,
});

/**
 * Builds ONE D1 batch (a single SQLite transaction: all statements commit or none do) that settles a coins order
 * for one payment event. Nothing is written outside this batch, so there is no compensating revert and no
 * partially-applied state: a crash/error before commit leaves the DB unchanged (event stays unprocessed and
 * retryable); a commit followed by a client-side error is resolved on retry by reading committed state.
 *
 * Every statement re-derives its precondition from committed rows inside the transaction (no changes(), no stale
 * JS reads): later statements see earlier writes in the same transaction, and D1 serialises writers, so a second
 * concurrent batch sees the first batch's committed rows.
 *
 * "Already credited" for an order means either the deterministic txn row exists, or (pre-fix legacy rows with random
 * ids) any purchase txn bound to a payment_event whose order_id is this order.
 */
function settlementBatch(env, { peId, order, providerPaymentId, amount, currency, t }) {
  const ids = orderCreditIds(order.id);
  const db = env.DB;
  const NOT_CREDITED = `NOT EXISTS (SELECT 1 FROM ledger_transactions WHERE id = ?1)
    AND NOT EXISTS (SELECT 1 FROM ledger_transactions lt JOIN payment_events le ON le.id = lt.payment_event_id
                     WHERE lt.kind = 'purchase' AND le.order_id = ?2)`;
  const OWN_TXN = `EXISTS (SELECT 1 FROM ledger_transactions WHERE id = ?1 AND payment_event_id = ?3)`;
  return [
    // 0. Bind the event to the order if an earlier attempt recorded it before the order was resolvable.
    db.prepare(`UPDATE payment_events SET order_id = ?2 WHERE id = ?3 AND order_id IS NULL AND processed_at IS NULL`)
      .bind(ids.txn, order.id, peId),
    // 1. pending→paid, or keep/repair a paid-but-never-credited order (pre-fix crash state) for the SAME payment.
    db.prepare(`UPDATE payment_orders SET status = 'paid', paid_at = COALESCE(paid_at, ?4),
                       provider_payment_id = COALESCE(provider_payment_id, ?5)
                 WHERE id = ?2 AND kind = 'coins' AND amount_cents = ?6 AND currency = ?7
                   AND (status = 'pending' OR (status = 'paid' AND (provider_payment_id IS NULL OR provider_payment_id = ?5)))
                   AND ${NOT_CREDITED}
                   AND EXISTS (SELECT 1 FROM payment_events WHERE id = ?3 AND processed_at IS NULL)`)
      .bind(ids.txn, order.id, peId, t, providerPaymentId, amount, currency),
    // 2. The credit transaction. Full predicate repeated against post-step-1 state; PK on ?1 makes a 2nd row impossible.
    db.prepare(`INSERT INTO ledger_transactions(id,kind,payment_event_id,initiated_by,memo,created_at)
                SELECT ?1, 'purchase', ?3, o.buyer_id, 'coin purchase', ?4 FROM payment_orders o
                 WHERE o.id = ?2 AND o.kind = 'coins' AND o.status = 'paid' AND o.amount_cents = ?6 AND o.currency = ?7
                   AND o.provider_payment_id IS ?5
                   AND ${NOT_CREDITED}
                   AND EXISTS (SELECT 1 FROM payment_events WHERE id = ?3 AND processed_at IS NULL)`)
      .bind(ids.txn, order.id, peId, t, providerPaymentId, amount, currency),
    // 3/4. Entries only if THIS event owns the txn; per-entry guard keeps a concurrent same-event batch a no-op.
    db.prepare(`INSERT INTO ledger_entries(id,transaction_id,account_id,amount,created_at)
                SELECT ?8, ?1, 'acct_external_stripe', -o.amount_cents, ?4 FROM payment_orders o
                 WHERE o.id = ?2 AND ${OWN_TXN} AND NOT EXISTS (SELECT 1 FROM ledger_entries WHERE id = ?8)`)
      .bind(ids.txn, order.id, peId, t, null, null, null, ids.extEntry),
    db.prepare(`INSERT INTO ledger_entries(id,transaction_id,account_id,amount,created_at)
                SELECT ?8, ?1, 'acct_' || o.buyer_id, o.amount_cents, ?4 FROM payment_orders o
                 WHERE o.id = ?2 AND ${OWN_TXN} AND NOT EXISTS (SELECT 1 FROM ledger_entries WHERE id = ?8)`)
      .bind(ids.txn, order.id, peId, t, null, null, null, ids.buyerEntry),
    // 5. Audit exactly once per order credit (deterministic id).
    db.prepare(`INSERT INTO audit_log(id,actor_id,action,target,ip,meta,created_at)
                SELECT ?8, NULL, 'payment.credited', o.buyer_id, NULL,
                       json_object('order', o.id, 'event', (SELECT provider_event_id FROM payment_events WHERE id = ?3), 'amount', o.amount_cents), ?4
                  FROM payment_orders o
                 WHERE o.id = ?2 AND ${OWN_TXN} AND NOT EXISTS (SELECT 1 FROM audit_log WHERE id = ?8)`)
      .bind(ids.txn, order.id, peId, t, null, null, null, ids.audit),
    // 6. Finish the event from committed state; never overwrites a finished event.
    db.prepare(`UPDATE payment_events SET processed_at = ?4,
                       outcome = CASE WHEN ${OWN_TXN} THEN 'credited' ELSE 'rejected_order_not_pending' END
                 WHERE id = ?3 AND processed_at IS NULL`)
      .bind(ids.txn, order.id, peId, t),
  ];
}

/**
 * Stripe webhook. Stubbed integration: no Stripe API calls and no checkout creation yet.
 * It only processes events whose signature verifies against STRIPE_WEBHOOK_SECRET.
 * Coins are credited ONLY here, ONLY for checkout.session.completed + payment_status=paid matching a
 * 'coins' payment_order of identical amount/currency, at most once per order (see settlementBatch).
 * Event-id dedupe handles provider retries; unfinished events (no processed_at) may be retried safely.
 */
export async function stripeWebhook(env, req) {
  if (!env.STRIPE_WEBHOOK_SECRET) throw new ApiError(503, 'payments_not_configured', 'Payment webhooks are not configured');
  const raw = await req.text();
  if (raw.length > 256 * 1024) throw new ApiError(413, 'payload_too_large', 'Body too large');
  if (!(await verifyStripeSignature(env.STRIPE_WEBHOOK_SECRET, req.headers.get('Stripe-Signature'), raw)))
    throw new ApiError(400, 'invalid_signature', 'Webhook signature verification failed');
  let evt;
  try { evt = JSON.parse(raw); } catch { throw new ApiError(400, 'invalid_json', 'Invalid event JSON'); }
  if (typeof evt.id !== 'string' || typeof evt.type !== 'string') throw new ApiError(400, 'invalid_event', 'Missing id/type');

  const obj = evt.data && evt.data.object || {};
  const orderId = obj.metadata && typeof obj.metadata.order_id === 'string' ? obj.metadata.order_id : null;
  const order = orderId ? await env.DB.prepare(`SELECT * FROM payment_orders WHERE id = ?`).bind(orderId).first() : null;
  const peIdNew = newId('pe'); const t = new Date().toISOString();
  const payloadHash = await sha256Hex(raw);

  // Atomic dedupe insert; unfinished prior attempt (no processed_at) is eligible for retry.
  const ins = await env.DB.prepare(
    `INSERT INTO payment_events(id,provider,provider_event_id,event_type,order_id,payload_sha256,signature_verified,received_at)
     VALUES (?, 'stripe', ?, ?, ?, ?, 1, ?) ON CONFLICT(provider, provider_event_id) DO NOTHING RETURNING id`)
    .bind(peIdNew, evt.id, evt.type, order ? order.id : null, payloadHash, t).first();

  let peId;
  if (ins) {
    peId = ins.id;
  } else {
    const existing = await env.DB.prepare(
      `SELECT id, outcome, processed_at FROM payment_events WHERE provider = 'stripe' AND provider_event_id = ?`
    ).bind(evt.id).first();
    if (!existing) return json(200, { received: true, duplicate: true });
    if (existing.processed_at) return json(200, { received: true, duplicate: true, outcome: existing.outcome });
    peId = existing.id;
  }

  const finish = (outcome) => env.DB.prepare(`UPDATE payment_events SET processed_at = ?, outcome = ? WHERE id = ? AND processed_at IS NULL`).bind(new Date().toISOString(), outcome, peId);
  const settledOutcome = async () => {
    const row = await env.DB.prepare(`SELECT outcome, processed_at FROM payment_events WHERE id = ?`).bind(peId).first();
    if (!row || !row.processed_at) throw new ApiError(500, 'payment_not_settled', 'Payment event not settled; retry');
    return row.outcome;
  };

  // Membership subscription lifecycle (subscription-mode sessions + customer.subscription.*). Coins handling below is
  // unchanged: coin orders never use mode=subscription. Billing-off => recorded and ignored, nothing granted.
  // A throw (e.g. provider read failed) leaves the event unprocessed so the provider retries it.
  if (isMembershipEvent(evt)) {
    const mOutcome = await handleMembershipEvent(env, evt);
    if (mOutcome === DEFERRED_BILLING_OFF) {
      // Acknowledge (no endless provider retries) but leave unprocessed so a resend or owner resync still applies it.
      await env.DB.prepare(`UPDATE payment_events SET outcome = ? WHERE id = ? AND processed_at IS NULL`).bind(mOutcome, peId).run();
      return json(200, { received: true, outcome: mOutcome, deferred: true });
    }
    await finish(mOutcome).run();
    return json(200, { received: true, outcome: await settledOutcome() });
  }

  let outcome = 'ignored_event_type';
  if (evt.type === 'checkout.session.completed') {
    const currency = String(obj.currency || '').toLowerCase();
    if (obj.payment_status !== 'paid') outcome = 'ignored_not_paid';
    else if (!order) outcome = 'rejected_unknown_order';
    // 'paid' is allowed through: the batch either repairs a paid-but-uncredited order or rejects. Others never credit.
    else if (order.status !== 'pending' && order.status !== 'paid') outcome = 'rejected_order_not_pending';
    else if (order.kind !== 'coins') outcome = 'ignored_unsupported_kind';
    else if (obj.amount_total !== order.amount_cents || currency !== order.currency) outcome = 'rejected_amount_mismatch';
    else {
      const providerPaymentId = typeof obj.id === 'string' ? obj.id : null;
      // No try/catch: on any error nothing in the batch committed OR all of it did; either way a retry of this
      // event converges (unprocessed → re-run; processed → duplicate). Never revert committed state here.
      await env.DB.batch(settlementBatch(env, { peId, order, providerPaymentId, amount: order.amount_cents, currency, t }));
      return json(200, { received: true, outcome: await settledOutcome() });
    }
  }
  await finish(outcome).run();
  return json(200, { received: true, outcome: await settledOutcome() });
}

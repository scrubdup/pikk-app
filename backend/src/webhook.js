import { ApiError, json } from './http.js';
import { hmacSha256Hex, timingSafeEqual, sha256Hex, newId } from './crypto.js';
import { auditStmt } from './audit.js';

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

/**
 * Stripe webhook. Stubbed integration: no Stripe API calls and no checkout creation yet.
 * It only processes events whose signature verifies against STRIPE_WEBHOOK_SECRET.
 * Coins are credited ONLY here, ONLY for checkout.session.completed + payment_status=paid matching a
 * pending 'coins' payment_order of identical amount/currency.
 *
 * Concurrency: order transition pending→paid is claimed with UPDATE…RETURNING before ledger writes,
 * so two distinct events for the same order cannot both credit. Event-id dedupe remains for retries.
 * Unfinished events (inserted, not yet outcome/processed_at) may be retried safely.
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

  const finish = (outcome) => env.DB.prepare(`UPDATE payment_events SET processed_at = ?, outcome = ? WHERE id = ?`).bind(new Date().toISOString(), outcome, peId);

  let outcome = 'ignored_event_type';
  if (evt.type === 'checkout.session.completed') {
    if (obj.payment_status !== 'paid') outcome = 'ignored_not_paid';
    else if (!order) outcome = 'rejected_unknown_order';
    else if (order.status !== 'pending') outcome = 'rejected_order_not_pending';
    else if (order.kind !== 'coins') outcome = 'ignored_unsupported_kind';
    else if (obj.amount_total !== order.amount_cents || String(obj.currency || '').toLowerCase() !== order.currency) outcome = 'rejected_amount_mismatch';
    else {
      const providerPaymentId = typeof obj.id === 'string' ? obj.id : null;
      // Claim the order before writing ledger entries so concurrent distinct events cannot double-credit.
      const claimed = await env.DB.prepare(
        `UPDATE payment_orders SET status = 'paid', paid_at = ?, provider_payment_id = ?
          WHERE id = ? AND status = 'pending' RETURNING id`
      ).bind(t, providerPaymentId, order.id).first();
      if (!claimed) {
        await finish('rejected_order_not_pending').run();
        return json(200, { received: true, outcome: 'rejected_order_not_pending' });
      }
      const txn = newId('txn');
      try {
        await env.DB.batch([
          env.DB.prepare(`INSERT INTO ledger_transactions(id,kind,payment_event_id,initiated_by,memo,created_at) VALUES (?, 'purchase', ?, ?, 'coin purchase', ?)`).bind(txn, peId, order.buyer_id, t),
          env.DB.prepare(`INSERT INTO ledger_entries(id,transaction_id,account_id,amount,created_at) VALUES (?,?, 'acct_external_stripe', ?, ?)`).bind(newId('le'), txn, -order.amount_cents, t),
          env.DB.prepare(`INSERT INTO ledger_entries(id,transaction_id,account_id,amount,created_at) VALUES (?,?,?,?,?)`).bind(newId('le'), txn, `acct_${order.buyer_id}`, order.amount_cents, t),
          auditStmt(env, { actor: null, action: 'payment.credited', target: order.buyer_id, meta: { order: order.id, event: evt.id, amount: order.amount_cents } }),
          finish('credited'),
        ]);
      } catch (e) {
        // Revert claim so a later delivery can credit; leave event unprocessed (no finish) for retry path.
        await env.DB.prepare(
          `UPDATE payment_orders SET status = 'pending', paid_at = NULL, provider_payment_id = NULL
            WHERE id = ? AND status = 'paid' AND (provider_payment_id IS ? OR (? IS NULL AND provider_payment_id IS NULL))`
        ).bind(order.id, providerPaymentId, providerPaymentId).run();
        throw e;
      }
      return json(200, { received: true, outcome: 'credited' });
    }
  }
  await finish(outcome).run();
  return json(200, { received: true, outcome });
}

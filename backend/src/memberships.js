import { ApiError } from './http.js';
import { newId } from './crypto.js';
import { auditStmt } from './audit.js';
import { membershipBillingReady, membershipSchemaState, billingSummary } from './membership-config.js';
import { stripeRequest } from './stripe-api.js';

/**
 * Server-authoritative membership.
 *
 * Commercial terms are NOT decided (docs/owner-requirements/MASTER_FEATURES.md §13 "not final";
 * docs/phase1-progress-meter/memberships-payments/COMMERCIAL-HOLDS.md). The UI preview prices in src/data.js are
 * TEST MODE only and are NOT a catalog. So:
 *  - billing is OFF unless the owner supplies a complete, strictly validated config (src/membership-config.js);
 *  - no plan, price, interval, trial, grace period or benefit is defined in code;
 *  - "active" means exactly: a Stripe subscription created from a server-made Checkout for this user, synced from
 *    a Stripe API read after a signature-verified webhook, status === 'active', single item on the catalog price,
 *    quantity 1, current period not ended, plan still in the catalog, mode matches. Everything else is inactive
 *    (trialing / past_due grace are business policy and deliberately NOT entitled);
 *  - which features a plan unlocks is unconfigured: entitlements is reported as null.
 *  Requires LOCAL-ONLY pending migration 0016 (backend/migrations-pending/). No table is read while billing is off.
 */
const TERMINAL = ['canceled', 'incomplete_expired'];
const SUB_STATUSES = new Set(['incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused']);
const CHECKOUT_TTL_SEC = 3600; // Stripe allows 30 min – 24 h; our open-checkout row expires at the same instant.

function inactive(summary, extra = {}) {
  return {
    status: 'inactive', plan: null, source: 'none', authoritative: true,
    billing_configured: summary.configured,
    activation: summary.configured ? 'stripe_checkout' : 'not_available',
    billing_reason: summary.reason,
    subscription_status: null, current_period_end: null, cancel_at_period_end: false,
    entitlements: null, entitlement_policy: 'unconfigured',
    ...extra,
  };
}

export function isEntitled(cfg, sub, nowMs = Date.now()) {
  const plan = cfg.plans.get(sub.plan_id);
  return !!plan && !sub.needs_review && sub.status === 'active' && sub.livemode === (cfg.livemode ? 1 : 0)
    && plan.stripe_price_id === sub.stripe_price_id && sub.current_price_id === sub.stripe_price_id
    && sub.current_quantity === 1 && Number.isInteger(sub.current_period_end) && sub.current_period_end * 1000 > nowMs;
}

export async function membershipMe(env, session) {
  if (!session?.user?.id) throw new ApiError(401, 'unauthenticated', 'Sign in required');
  const cfg = await membershipBillingReady(env);
  const summary = cfg.ok ? { configured: true, reason: null } : { configured: false, reason: cfg.reason };
  if (!cfg.ok) return inactive(summary);
  const rows = (await env.DB.prepare(
    `SELECT * FROM membership_subscriptions WHERE user_id = ? ORDER BY updated_at DESC, stripe_subscription_id LIMIT 20`
  ).bind(session.user.id).all()).results || [];
  const now = Date.now();
  const active = rows.find((r) => isEntitled(cfg, r, now));
  const shown = active || rows[0];
  const detail = shown ? {
    subscription_status: shown.status,
    current_period_end: Number.isInteger(shown.current_period_end) ? new Date(shown.current_period_end * 1000).toISOString() : null,
    cancel_at_period_end: !!shown.cancel_at_period_end,
  } : {};
  if (!active) return inactive(summary, detail);
  return { ...inactive(summary, detail), status: 'active', plan: active.plan_id, source: 'stripe_subscription' };
}

/** Reject any client attempt to self-assert a paid membership. */
export function rejectClientMembershipGrant() {
  throw new ApiError(403, 'forbidden', 'Membership cannot be granted by the client');
}

/**
 * MB-1: an open checkout past its local expiry is NOT retired by our clock if Stripe knows the session: the buyer may
 * have paid in the last seconds and the webhook may be late (outage, retries for days). Ask Stripe first:
 *  - complete → sync the subscription now and refuse a new checkout (409 membership_exists);
 *  - expired  → retire the row, a new checkout may proceed;
 *  - open / anything else / provider error → fail closed (409 / 502), no new session.
 * Rows with no Stripe session id were never shown to the buyer (no URL), so the clock may retire them.
 */
const NEEDS_REVIEW_ERR = (extra) => new ApiError(409, 'membership_checkout_needs_review',
  'A membership checkout for this account needs support review before a new one can start', extra);
async function resolveStaleOpenCheckout(env, cfg, userId, nowIso) {
  await env.DB.prepare(`UPDATE membership_checkouts SET status = 'expired'
      WHERE user_id = ? AND status = 'open' AND expires_at <= ? AND stripe_session_id IS NULL`).bind(userId, nowIso).run();
  // MB-5: a needs_review open checkout is always re-checked with Stripe (never reused, never retired by clock).
  const stale = await env.DB.prepare(`SELECT id, stripe_session_id, needs_review FROM membership_checkouts
      WHERE user_id = ? AND status = 'open' AND stripe_session_id IS NOT NULL AND (expires_at <= ? OR needs_review IS NOT NULL)`).bind(userId, nowIso).first();
  if (!stale) return;
  let s;
  try {
    s = await stripeRequest(cfg, 'GET', `/v1/checkout/sessions/${encodeURIComponent(stale.stripe_session_id)}`); // throws 502
  } catch (e) {
    if (stale.needs_review && e instanceof ApiError && e.details && e.details.provider_status === 404) throw NEEDS_REVIEW_ERR({ reason: stale.needs_review });
    throw e;
  }
  if (s.id !== stale.stripe_session_id || s.livemode !== cfg.livemode)
    throw new ApiError(502, 'payment_provider_error', 'Unexpected payment provider response');
  if (s.status === 'expired') {
    await env.DB.prepare(`UPDATE membership_checkouts SET status = 'expired' WHERE id = ? AND status = 'open'`).bind(stale.id).run();
    return;
  }
  if (s.status === 'complete') {
    const outcome = await completeCheckout(env, cfg, { id: s.id });
    if (outcome === 'membership_subscription_synced')
      throw new ApiError(409, 'membership_exists', 'A membership checkout for this account was already completed');
    // Paid/complete at Stripe but not mappable to a subscription here: fail closed, needs an operator.
    throw new ApiError(409, 'membership_checkout_needs_review', 'A completed membership checkout needs support review before a new one can start', { outcome });
  }
  if (stale.needs_review) throw NEEDS_REVIEW_ERR({ reason: stale.needs_review }); // still open at Stripe: operator decides, URL not reused
  throw new ApiError(409, 'checkout_in_progress', 'A membership checkout is still open with the payment provider');
}

/** POST /memberships/checkout { plan_id } — verified, active account only. Returns a Stripe-hosted Checkout URL. */
export async function createMembershipCheckout(env, session, body) {
  const cfg = await membershipBillingReady(env);
  if (!cfg.ok) throw new ApiError(503, 'membership_billing_not_configured', 'Membership billing is not available', { reason: cfg.reason });
  const planId = body && typeof body.plan_id === 'string' ? body.plan_id : null;
  const plan = planId && cfg.plans.get(planId);
  if (!plan) throw new ApiError(422, 'validation_failed', 'Unknown plan');
  const userId = session.user.id;

  const live = await env.DB.prepare(
    `SELECT 1 FROM membership_subscriptions WHERE user_id = ? AND status NOT IN ('canceled','incomplete_expired') LIMIT 1`
  ).bind(userId).first();
  // Plan changes / multiple concurrent memberships are business policy (undecided): refuse rather than double-bill.
  if (live) throw new ApiError(409, 'membership_exists', 'A membership subscription already exists for this account');

  const now = new Date(); const nowIso = now.toISOString();
  const expiresSec = Math.floor(now.getTime() / 1000) + CHECKOUT_TTL_SEC;
  const id = newId('mco');
  await resolveStaleOpenCheckout(env, cfg, userId, nowIso);
  try {
    await env.DB.prepare(`INSERT INTO membership_checkouts(id,user_id,plan_id,stripe_price_id,livemode,status,created_at,expires_at)
      VALUES (?,?,?,?,?,'open',?,?)`).bind(id, userId, plan.plan_id, plan.stripe_price_id, cfg.livemode ? 1 : 0, nowIso,
      new Date(expiresSec * 1000).toISOString()).run();
  } catch (e) {
    if (!/UNIQUE/i.test(String(e.message))) throw e;
    const open = await env.DB.prepare(`SELECT plan_id, checkout_url, expires_at, needs_review FROM membership_checkouts WHERE user_id = ? AND status = 'open'`).bind(userId).first();
    if (open && open.needs_review) throw NEEDS_REVIEW_ERR({ reason: open.needs_review });
    if (open && open.plan_id === plan.plan_id && open.checkout_url) return { checkout_url: open.checkout_url, expires_at: open.expires_at, reused: true };
    throw new ApiError(409, 'checkout_in_progress', 'A membership checkout is already in progress');
  }
  const markFailed = () => env.DB.prepare(`UPDATE membership_checkouts SET status = 'failed' WHERE id = ? AND status = 'open' AND stripe_session_id IS NULL`).bind(id).run();

  try {
    // Cross-check the owner-approved catalog entry against the live Stripe Price; any drift = no checkout.
    const price = await stripeRequest(cfg, 'GET', `/v1/prices/${encodeURIComponent(plan.stripe_price_id)}`);
    const r = price.recurring || {};
    if (price.id !== plan.stripe_price_id || price.object !== 'price' || price.active !== true || price.type !== 'recurring'
      || price.livemode !== cfg.livemode || price.unit_amount !== plan.unit_amount || price.currency !== plan.currency
      || r.interval !== plan.interval || r.interval_count !== plan.interval_count || (r.usage_type && r.usage_type !== 'licensed')
      || r.trial_period_days) {
      throw new ApiError(503, 'membership_catalog_mismatch', 'Membership plan configuration does not match the payment provider');
    }
    const cs = await stripeRequest(cfg, 'POST', '/v1/checkout/sessions', {
      idempotencyKey: `pikk-membership-checkout-${id}`,
      form: {
        mode: 'subscription',
        line_items: { 0: { price: plan.stripe_price_id, quantity: 1 } },
        success_url: cfg.successUrl, cancel_url: cfg.cancelUrl,
        client_reference_id: id, expires_at: expiresSec,
        metadata: { pikk_checkout_id: id, pikk_user_id: userId, pikk_plan_id: plan.plan_id },
        subscription_data: { metadata: { pikk_checkout_id: id, pikk_user_id: userId, pikk_plan_id: plan.plan_id } },
      },
    });
    if (typeof cs.id !== 'string' || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(cs.id) || cs.mode !== 'subscription'
      || cs.livemode !== cfg.livemode || cs.client_reference_id !== id
      || typeof cs.url !== 'string' || !cs.url.startsWith('https://checkout.stripe.com/')) {
      throw new ApiError(502, 'payment_provider_error', 'Unexpected payment provider response');
    }
    await env.DB.batch([
      env.DB.prepare(`UPDATE membership_checkouts SET stripe_session_id = ?, checkout_url = ? WHERE id = ? AND stripe_session_id IS NULL`).bind(cs.id, cs.url, id),
      auditStmt(env, { actor: userId, action: 'membership.checkout_created', target: userId, meta: { checkout: id, plan: plan.plan_id, session: cs.id } }),
    ]);
    return { checkout_url: cs.url, expires_at: new Date(expiresSec * 1000).toISOString(), reused: false };
  } catch (e) {
    await markFailed();
    throw e;
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Signed webhook handling. Called by stripeWebhook AFTER signature verification and event-id dedupe.
// The event only tells us WHICH object changed; state is always taken from a fresh Stripe API read (Stripe does not
// guarantee event order and says not to order by `created`). A newer read never gets overwritten by an older one
// (synced_at_ms guard) and terminal statuses never revert. Throwing leaves the event unprocessed so Stripe retries.
// ---------------------------------------------------------------------------------------------------------------
export const MEMBERSHIP_EVENT_TYPES = new Set(['customer.subscription.created', 'customer.subscription.updated', 'customer.subscription.deleted']);
export function isMembershipEvent(evt) {
  const o = evt && evt.data && evt.data.object || {};
  return MEMBERSHIP_EVENT_TYPES.has(evt.type)
    || ((evt.type === 'checkout.session.completed' || evt.type === 'checkout.session.expired') && o.mode === 'subscription');
}

export const DEFERRED_BILLING_OFF = 'deferred_membership_billing_off';

export async function handleMembershipEvent(env, evt) {
  const cfg = await membershipBillingReady(env);
  if (!cfg.ok) {
    // MB-3: a failed schema probe is transient. Never finish the event on it: 5xx so Stripe retries.
    if (cfg.reason === 'schema_unknown') throw new ApiError(503, 'membership_schema_check_failed', 'Membership schema check failed; retry');
    // 0016 never applied => no PIKK checkout can exist (checkout is 503). Ignoring is safe.
    // RUNBOOK: never drop/rename the 0016 tables once any checkout session exists (events would be ignored).
    if (cfg.reason === 'schema_missing') return 'ignored_membership_schema_missing';
    return billingOffEvent(env, evt);
  }
  if (evt.livemode !== cfg.livemode) return 'rejected_livemode_mismatch';
  const obj = evt.data.object;
  if (evt.type === 'checkout.session.expired') {
    if (typeof obj.id !== 'string') return 'rejected_invalid_object';
    await env.DB.prepare(`UPDATE membership_checkouts SET status = 'expired' WHERE stripe_session_id = ? AND status = 'open'`).bind(obj.id).run();
    return 'membership_checkout_expired';
  }
  if (evt.type === 'checkout.session.completed') return completeCheckout(env, cfg, obj);
  if (typeof obj.id !== 'string') return 'rejected_invalid_object';
  return syncSubscription(env, cfg, obj.id);
}

/**
 * S2: billing OFF (or misconfigured) while 0016 exists. Never grants. If the event concerns a subscription/checkout we
 * know about, it is DEFERRED: answered 200 but left unprocessed, so a Stripe resend or the owner resync
 * (POST /admin/memberships/resync after re-enabling) still applies it. A signed customer.subscription.deleted carrying a
 * terminal status is applied immediately (revocation only: terminal in Stripe, so it can never be stale).
 * While billing is off /memberships/me reports inactive for everyone anyway.
 */
async function billingOffEvent(env, evt) {
  const st = await membershipSchemaState(env);
  if (st === 'unknown') throw new ApiError(503, 'membership_schema_check_failed', 'Membership schema check failed; retry');
  if (st === 'missing') return 'ignored_membership_billing_off';
  const o = evt.data && evt.data.object || {};
  if (typeof o.id !== 'string') return 'ignored_membership_billing_off';
  const lm = evt.livemode === true ? 1 : 0;
  if (evt.type.startsWith('customer.subscription.')) {
    const row = await env.DB.prepare(`SELECT status, livemode FROM membership_subscriptions WHERE stripe_subscription_id = ?`).bind(o.id).first();
    if (row) {
      if (row.livemode !== lm || TERMINAL.includes(row.status)) return 'ignored_membership_billing_off';
      if (evt.type === 'customer.subscription.deleted' && TERMINAL.includes(o.status)) {
        await env.DB.prepare(`UPDATE membership_subscriptions SET status = ?, updated_at = ? WHERE stripe_subscription_id = ? AND status NOT IN ('canceled','incomplete_expired')`)
          .bind(o.status, new Date().toISOString(), o.id).run();
      }
      return DEFERRED_BILLING_OFF;
    }
    const md = o.metadata || {};
    const co = typeof md.pikk_checkout_id === 'string'
      ? await env.DB.prepare(`SELECT livemode FROM membership_checkouts WHERE id = ?`).bind(md.pikk_checkout_id).first() : null;
    return co && co.livemode === lm ? DEFERRED_BILLING_OFF : 'ignored_membership_billing_off';
  }
  const co = await env.DB.prepare(`SELECT livemode FROM membership_checkouts WHERE stripe_session_id = ? OR id = ?`)
    .bind(o.id, typeof o.client_reference_id === 'string' ? o.client_reference_id : '').first();
  return co && co.livemode === lm ? DEFERRED_BILLING_OFF : 'ignored_membership_billing_off';
}

/**
 * Owner-only operator resync (POST /admin/memberships/resync). Requires billing ready. MB-4 design:
 *  - Eligible = non-terminal subscriptions / open checkouts with a Stripe session, in the CURRENT mode, not needs_review.
 *  - Each pass reads up to `limit` of each, least-recently-ATTEMPTED first; the attempt time is written before the read,
 *    so failing rows rotate to the back and can never pin the page.
 *  - A successful read records resync_ok_at_ms = the read's start time. Stripe 404 / unmappable => needs_review
 *    (never entitled, excluded from completion, reported for an operator). Transient errors just rotate.
 *  - Deferred events are resolved across passes: an event is resolved once EVERY eligible row has a successful read that
 *    started after the event was received (min eligible resync_ok_at_ms > received_at). Never grants anything itself.
 */
export const OWNER_RETRY = 'owner_retry_pending';
export const NOT_FOUND_STREAK_LIMIT = 3;
export async function resyncMemberships(env, { limit = 50 } = {}) {
  const cfg = await membershipBillingReady(env);
  if (!cfg.ok) throw new ApiError(503, 'membership_billing_not_configured', 'Membership billing is not available', { reason: cfg.reason });
  const lm = cfg.livemode ? 1 : 0;
  const passStartMs = Date.now();
  const out = { subscriptions: {}, checkouts: {}, errors: 0, needs_review: 0, pending: 0, complete: false, more: false, deferred_resolved: 0,
    deferred_remaining: 0, other_mode_skipped: 0, aborted: null, account_verified: false, unverified_not_found: 0 };
  const bump = (o, k) => { o[k] = (o[k] || 0) + 1; };
  const is404 = (e) => e instanceof ApiError && e.details && e.details.provider_status === 404;
  const RE = `(needs_review IS NULL OR needs_review = '${OWNER_RETRY}')`;
  const SUB_ELIGIBLE = `status NOT IN ('canceled','incomplete_expired') AND livemode = ?1 AND ${RE}`;
  const CO_ELIGIBLE = `status = 'open' AND stripe_session_id IS NOT NULL AND livemode = ?1 AND ${RE}`;

  // MB-5: a Stripe 404 is only definitive once the key is known to belong to the right account.
  //  - MEMBERSHIP_STRIPE_ACCOUNT_ID set: GET /v1/account once (on the first 404); mismatch/unreadable => abort, mark nothing.
  //  - not set: 404s are held; they are marked only if this pass also read some object successfully (proves the key
  //    sees this account), and NOT_FOUND_STREAK_LIMIT consecutive 404s abort the pass with nothing marked.
  let anySuccess = false; let streak = 0; const held = []; // [{table, key, id}]
  const markNR = (table, key, id, why) => env.DB.prepare(`UPDATE ${table} SET needs_review = ? WHERE ${key} = ?`).bind(why, id).run();
  const onSuccess = () => { anySuccess = true; streak = 0; };
  const on404 = async (table, key, id, bucket) => {
    streak++;
    if (cfg.expectedAccount) {
      if (!out.account_verified) {
        let a = null;
        try { a = await stripeRequest(cfg, 'GET', '/v1/account'); } catch { out.aborted = 'stripe_account_unverified'; return; }
        if (!a || a.id !== cfg.expectedAccount) { out.aborted = 'stripe_account_mismatch'; return; }
        out.account_verified = true;
      }
      await markNR(table, key, id, 'stripe_not_found'); bump(bucket, 'stripe_not_found'); out.needs_review++;
      return;
    }
    if (streak >= NOT_FOUND_STREAK_LIMIT) { out.aborted = 'stripe_not_found_streak'; return; }
    held.push({ table, key, id, bucket });
  };

  const subs = (await env.DB.prepare(`SELECT stripe_subscription_id id FROM membership_subscriptions WHERE ${SUB_ELIGIBLE}
      ORDER BY COALESCE(resync_attempted_at_ms, 0), stripe_subscription_id LIMIT ?2`).bind(lm, limit).all()).results;
  for (const r of subs) {
    if (out.aborted) break;
    const t0 = Date.now();
    await env.DB.prepare(`UPDATE membership_subscriptions SET resync_attempted_at_ms = ? WHERE stripe_subscription_id = ?`).bind(t0, r.id).run();
    try {
      const o = await syncSubscription(env, cfg, r.id);
      bump(out.subscriptions, o); onSuccess();
      if (o === 'membership_subscription_synced') {
        await env.DB.prepare(`UPDATE membership_subscriptions SET resync_ok_at_ms = ?, needs_review = NULL WHERE stripe_subscription_id = ?`).bind(t0, r.id).run();
      } else { await markNR('membership_subscriptions', 'stripe_subscription_id', r.id, o); out.needs_review++; }
    } catch (e) {
      if (is404(e)) await on404('membership_subscriptions', 'stripe_subscription_id', r.id, out.subscriptions);
      else { out.errors++; streak = 0; }
    }
  }

  const cos = out.aborted ? [] : (await env.DB.prepare(`SELECT id, stripe_session_id FROM membership_checkouts WHERE ${CO_ELIGIBLE}
      ORDER BY COALESCE(resync_attempted_at_ms, 0), id LIMIT ?2`).bind(lm, limit).all()).results;
  for (const r of cos) {
    if (out.aborted) break;
    const t0 = Date.now();
    await env.DB.prepare(`UPDATE membership_checkouts SET resync_attempted_at_ms = ? WHERE id = ?`).bind(t0, r.id).run();
    const ok = () => env.DB.prepare(`UPDATE membership_checkouts SET resync_ok_at_ms = ?, needs_review = NULL WHERE id = ?`).bind(t0, r.id).run();
    try {
      const s = await stripeRequest(cfg, 'GET', `/v1/checkout/sessions/${encodeURIComponent(r.stripe_session_id)}`);
      onSuccess();
      if (s.id !== r.stripe_session_id || s.livemode !== cfg.livemode) { await markNR('membership_checkouts', 'id', r.id, 'rejected_session_mismatch'); out.needs_review++; bump(out.checkouts, 'rejected_session_mismatch'); continue; }
      if (s.status === 'complete') {
        const o = await completeCheckout(env, cfg, { id: s.id });
        bump(out.checkouts, o);
        if (o === 'membership_subscription_synced') await ok();
        else { await markNR('membership_checkouts', 'id', r.id, o); out.needs_review++; }
      } else if (s.status === 'expired') {
        await env.DB.prepare(`UPDATE membership_checkouts SET status = 'expired', resync_ok_at_ms = ?, needs_review = NULL WHERE id = ? AND status = 'open'`).bind(t0, r.id).run();
        bump(out.checkouts, 'membership_checkout_expired');
      } else { await ok(); bump(out.checkouts, 'still_open'); }
    } catch (e) {
      if (is404(e)) await on404('membership_checkouts', 'id', r.id, out.checkouts);
      else { out.errors++; streak = 0; }
    }
  }

  if (!out.aborted && held.length) {
    if (anySuccess) for (const h of held) { await markNR(h.table, h.key, h.id, 'stripe_not_found'); bump(h.bucket, 'stripe_not_found'); out.needs_review++; }
    else out.unverified_not_found = held.length; // left eligible and unmarked: configure MEMBERSHIP_STRIPE_ACCOUNT_ID
  }

  out.other_mode_skipped = (await env.DB.prepare(`SELECT
      (SELECT COUNT(*) FROM membership_subscriptions WHERE status NOT IN ('canceled','incomplete_expired') AND livemode <> ?1)
    + (SELECT COUNT(*) FROM membership_checkouts WHERE status = 'open' AND stripe_session_id IS NOT NULL AND livemode <> ?1) AS n`).bind(lm).first()).n;
  if (!out.aborted) {
    // Cross-pass completion: the oldest successful read among ALL still-eligible rows bounds what is resolved.
    const minSub = await env.DB.prepare(`SELECT COUNT(*) n, MIN(COALESCE(resync_ok_at_ms, 0)) m FROM membership_subscriptions WHERE ${SUB_ELIGIBLE}`).bind(lm).first();
    const minCo = await env.DB.prepare(`SELECT COUNT(*) n, MIN(COALESCE(resync_ok_at_ms, 0)) m FROM membership_checkouts WHERE ${CO_ELIGIBLE}`).bind(lm).first();
    const mins = [minSub, minCo].filter((x) => x && x.n > 0).map((x) => x.m);
    const coveredMs = mins.length ? Math.min(...mins) : passStartMs; // no eligible rows: everything received before this pass
    if (coveredMs > 0) {
      const r = await env.DB.prepare(`UPDATE payment_events SET processed_at = ?, outcome = 'resolved_by_membership_resync'
          WHERE processed_at IS NULL AND outcome = ? AND received_at < ?`)
        .bind(new Date().toISOString(), DEFERRED_BILLING_OFF, new Date(Math.min(coveredMs, passStartMs)).toISOString()).run();
      out.deferred_resolved = r.meta && r.meta.changes || 0;
    }
  }
  // Remaining work = eligible rows not yet successfully read since the OLDEST still-deferred event.
  const oldest = await env.DB.prepare(`SELECT MIN(received_at) r FROM payment_events WHERE processed_at IS NULL AND outcome = ?`).bind(DEFERRED_BILLING_OFF).first();
  out.deferred_remaining = (await env.DB.prepare(`SELECT COUNT(*) n FROM payment_events WHERE processed_at IS NULL AND outcome = ?`).bind(DEFERRED_BILLING_OFF).first()).n;
  if (oldest && oldest.r) {
    const oMs = Date.parse(oldest.r);
    out.pending = (await env.DB.prepare(`SELECT
        (SELECT COUNT(*) FROM membership_subscriptions WHERE ${SUB_ELIGIBLE} AND COALESCE(resync_ok_at_ms, 0) <= ?2)
      + (SELECT COUNT(*) FROM membership_checkouts WHERE ${CO_ELIGIBLE} AND COALESCE(resync_ok_at_ms, 0) <= ?2) AS n`).bind(lm, oMs).first()).n;
  }
  out.complete = !out.aborted && out.deferred_remaining === 0; out.more = !out.complete;
  return out;
}

/** MB-5: owner re-includes needs_review rows (current mode) in resync. Never grants: they stay non-entitled
 *  (needs_review = owner_retry_pending) until a later successful Stripe read clears the flag. */
export async function retryNeedsReview(env, body) {
  const cfg = await membershipBillingReady(env);
  if (!cfg.ok) throw new ApiError(503, 'membership_billing_not_configured', 'Membership billing is not available', { reason: cfg.reason });
  const lm = cfg.livemode ? 1 : 0;
  const all = body && body.all === true;
  const ids = (k, re) => {
    const v = body && body[k];
    if (v === undefined) return [];
    if (!Array.isArray(v) || v.length > 50 || !v.every((x) => typeof x === 'string' && re.test(x))) throw new ApiError(422, 'validation_failed', `Invalid ${k}`);
    return [...new Set(v)];
  };
  const subIds = ids('subscription_ids', /^sub_[A-Za-z0-9]{1,255}$/); const coIds = ids('checkout_ids', /^mco_[A-Za-z0-9_-]{1,255}$/);
  if (!all && !subIds.length && !coIds.length) throw new ApiError(422, 'validation_failed', 'Specify all:true, subscription_ids or checkout_ids');
  if (all && (subIds.length || coIds.length)) throw new ApiError(422, 'validation_failed', 'Use either all:true or explicit ids');
  const base = `SET needs_review = '${OWNER_RETRY}', resync_attempted_at_ms = NULL WHERE needs_review IS NOT NULL AND needs_review <> '${OWNER_RETRY}' AND livemode = ?`;
  const q = (n) => Array(n).fill('?').join(',');
  const run = async (table, key, list) => {
    if (!all && !list.length) return 0;
    const r = all ? await env.DB.prepare(`UPDATE ${table} ${base}`).bind(lm).run()
      : await env.DB.prepare(`UPDATE ${table} ${base} AND ${key} IN (${q(list.length)})`).bind(lm, ...list).run();
    return r.meta && r.meta.changes || 0;
  };
  return { subscriptions: await run('membership_subscriptions', 'stripe_subscription_id', subIds),
    checkouts: await run('membership_checkouts', 'id', coIds), all, subscription_ids: subIds, checkout_ids: coIds };
}

async function completeCheckout(env, cfg, obj) {
  if (typeof obj.id !== 'string' || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(obj.id)) return 'rejected_invalid_object';
  const s = await stripeRequest(cfg, 'GET', `/v1/checkout/sessions/${encodeURIComponent(obj.id)}`);
  if (s.id !== obj.id || s.mode !== 'subscription' || s.livemode !== cfg.livemode) return 'rejected_session_mismatch';
  let row = await env.DB.prepare(`SELECT * FROM membership_checkouts WHERE stripe_session_id = ?`).bind(s.id).first();
  if (!row && typeof s.client_reference_id === 'string') {
    // Crash between Stripe creating the session and our write of its id: accept only an unbound row whose user matches.
    row = await env.DB.prepare(`SELECT * FROM membership_checkouts WHERE id = ? AND stripe_session_id IS NULL`).bind(s.client_reference_id).first();
  }
  if (!row) return 'rejected_unknown_checkout';
  const md = s.metadata || {};
  if (s.client_reference_id !== row.id || md.pikk_checkout_id !== row.id || md.pikk_user_id !== row.user_id || row.livemode !== (cfg.livemode ? 1 : 0))
    return 'rejected_checkout_mismatch';
  if (s.status !== 'complete' || typeof s.subscription !== 'string' || typeof s.customer !== 'string') return 'ignored_checkout_not_complete';
  await env.DB.prepare(`UPDATE membership_checkouts SET stripe_session_id = COALESCE(stripe_session_id, ?1)
      WHERE id = ?2 AND (stripe_session_id IS NULL OR stripe_session_id = ?1)`).bind(s.id, row.id).run();
  return syncSubscription(env, cfg, s.subscription);
}

async function syncSubscription(env, cfg, subId) {
  if (!/^sub_[A-Za-z0-9]+$/.test(subId)) return 'rejected_invalid_object';
  // MB-2: ordering stamp taken BEFORE the provider read ("last-started read wins"), so an older read that started
  // earlier but returns later can never overwrite a newer one. Equal stamps: the non-active status wins (fail closed).
  const syncedAtMs = Date.now();
  const sub = await stripeRequest(cfg, 'GET', `/v1/subscriptions/${encodeURIComponent(subId)}`);
  if (sub.id !== subId || sub.object !== 'subscription' || sub.livemode !== cfg.livemode || !SUB_STATUSES.has(sub.status)
    || typeof sub.customer !== 'string' || !/^cus_[A-Za-z0-9]+$/.test(sub.customer)) return 'rejected_subscription_invalid';
  const md = sub.metadata || {};
  const row = typeof md.pikk_checkout_id === 'string'
    ? await env.DB.prepare(`SELECT * FROM membership_checkouts WHERE id = ?`).bind(md.pikk_checkout_id).first() : null;
  if (!row || md.pikk_user_id !== row.user_id || row.livemode !== (cfg.livemode ? 1 : 0)) return 'rejected_subscription_unmapped';
  if (row.stripe_subscription_id && row.stripe_subscription_id !== subId) return 'rejected_checkout_bound_elsewhere';
  if (row.stripe_customer_id && row.stripe_customer_id !== sub.customer) return 'rejected_customer_mismatch';
  const items = sub.items && Array.isArray(sub.items.data) ? sub.items.data : [];
  const item = items.length === 1 ? items[0] : null;
  const priceId = item && item.price && typeof item.price.id === 'string' ? item.price.id : null;
  const qty = item && Number.isInteger(item.quantity) ? item.quantity : null;
  // Basil+: period on the item; older API versions: on the subscription.
  const pe = item && Number.isInteger(item.current_period_end) ? item.current_period_end
    : (Number.isInteger(sub.current_period_end) ? sub.current_period_end : null);
  const t = new Date().toISOString();

  await env.DB.batch([
    env.DB.prepare(`UPDATE membership_checkouts SET stripe_subscription_id = ?1, stripe_customer_id = COALESCE(stripe_customer_id, ?2),
        status = 'completed', completed_at = COALESCE(completed_at, ?4)
      WHERE id = ?3 AND (stripe_subscription_id IS NULL OR stripe_subscription_id = ?1) AND (stripe_customer_id IS NULL OR stripe_customer_id = ?2)`)
      .bind(subId, sub.customer, row.id, t),
    env.DB.prepare(`INSERT INTO membership_subscriptions(stripe_subscription_id,user_id,checkout_id,plan_id,stripe_price_id,current_price_id,
        current_quantity,stripe_customer_id,livemode,status,current_period_end,cancel_at_period_end,synced_at_ms,created_at,updated_at,resync_ok_at_ms)
      SELECT ?1, c.user_id, c.id, c.plan_id, c.stripe_price_id, ?2, ?3, ?4, c.livemode, ?5, ?6, ?7, ?8, ?9, ?9, ?8
        FROM membership_checkouts c WHERE c.id = ?10 AND c.stripe_subscription_id = ?1 AND c.stripe_customer_id = ?4
      ON CONFLICT(stripe_subscription_id) DO UPDATE SET status = excluded.status, current_price_id = excluded.current_price_id,
        current_quantity = excluded.current_quantity, current_period_end = excluded.current_period_end,
        cancel_at_period_end = excluded.cancel_at_period_end, synced_at_ms = excluded.synced_at_ms, updated_at = excluded.updated_at,
        needs_review = NULL, resync_ok_at_ms = MAX(COALESCE(membership_subscriptions.resync_ok_at_ms, 0), excluded.synced_at_ms)
      WHERE (excluded.synced_at_ms > membership_subscriptions.synced_at_ms
             OR (excluded.synced_at_ms = membership_subscriptions.synced_at_ms AND excluded.status <> 'active'))
        AND membership_subscriptions.status NOT IN ('canceled','incomplete_expired')`)
      .bind(subId, priceId, qty, sub.customer, sub.status, pe, sub.cancel_at_period_end ? 1 : 0, syncedAtMs, t, row.id),
  ]);
  const saved = await env.DB.prepare(`SELECT user_id, checkout_id FROM membership_subscriptions WHERE stripe_subscription_id = ?`).bind(subId).first();
  if (!saved || saved.user_id !== row.user_id || saved.checkout_id !== row.id) return 'rejected_subscription_unmapped';
  return 'membership_subscription_synced';
}

export { billingSummary, TERMINAL };

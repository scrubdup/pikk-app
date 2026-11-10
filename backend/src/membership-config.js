/**
 * Membership billing configuration. DENY BY DEFAULT.
 *
 * Paid membership activation is possible only when EVERY item below is present and valid. Anything missing,
 * malformed or inconsistent returns { ok:false, reason } and the Worker exposes no checkout and grants nothing.
 * This module contains NO prices, intervals, trials or benefits: all commercial values come from the owner-approved
 * MEMBERSHIP_CATALOG var and are cross-checked against the live Stripe Price before any Checkout is created.
 *
 *   MEMBERSHIP_BILLING      = "enabled"                       (exact; any other value = off)
 *   MEMBERSHIP_STRIPE_MODE  = "test" | "live"                 (must match the key prefix and every Stripe object)
 *   STRIPE_SECRET_KEY       = sk_test_… | sk_live_… | rk_…    (Wrangler secret; never logged or returned)
 *   STRIPE_WEBHOOK_SECRET   = whsec_…                         (Wrangler secret)
 *   MEMBERSHIP_CHECKOUT_SUCCESS_URL / _CANCEL_URL             (https, same origin as PUBLIC_APP_URL)
 *   MEMBERSHIP_CATALOG      = {"version":1,"plans":[{"plan_id","stripe_price_id","unit_amount","currency",
 *                              "interval","interval_count"}]}  (strict: unknown keys, e.g. trials, are rejected)
 */
const PLAN_KEYS = ['plan_id', 'stripe_price_id', 'unit_amount', 'currency', 'interval', 'interval_count'];
const INTERVALS = new Set(['day', 'week', 'month', 'year']);

function fail(reason) { return { ok: false, reason }; }

export function parseCatalog(raw) {
  if (typeof raw !== 'string' || !raw.trim()) return fail('catalog_missing');
  if (raw.length > 8192) return fail('catalog_invalid');
  let c; try { c = JSON.parse(raw); } catch { return fail('catalog_invalid'); }
  if (!c || typeof c !== 'object' || Array.isArray(c)) return fail('catalog_invalid');
  if (Object.keys(c).some((k) => k !== 'version' && k !== 'plans') || c.version !== 1) return fail('catalog_invalid');
  if (!Array.isArray(c.plans) || c.plans.length < 1 || c.plans.length > 10) return fail('catalog_invalid');
  const plans = new Map(); const prices = new Set();
  for (const p of c.plans) {
    if (!p || typeof p !== 'object' || Array.isArray(p)) return fail('catalog_invalid');
    const keys = Object.keys(p);
    if (keys.length !== PLAN_KEYS.length || !PLAN_KEYS.every((k) => keys.includes(k))) return fail('catalog_invalid');
    if (typeof p.plan_id !== 'string' || !/^[a-z][a-z0-9_]{1,31}$/.test(p.plan_id)) return fail('catalog_invalid');
    if (typeof p.stripe_price_id !== 'string' || !/^price_[A-Za-z0-9]{6,64}$/.test(p.stripe_price_id)) return fail('catalog_invalid');
    if (!Number.isInteger(p.unit_amount) || p.unit_amount < 1 || p.unit_amount > 10_000_000) return fail('catalog_invalid');
    if (typeof p.currency !== 'string' || !/^[a-z]{3}$/.test(p.currency)) return fail('catalog_invalid');
    if (!INTERVALS.has(p.interval)) return fail('catalog_invalid');
    if (!Number.isInteger(p.interval_count) || p.interval_count < 1 || p.interval_count > 12) return fail('catalog_invalid');
    if (plans.has(p.plan_id) || prices.has(p.stripe_price_id)) return fail('catalog_invalid');
    plans.set(p.plan_id, Object.freeze({ ...p })); prices.add(p.stripe_price_id);
  }
  return { ok: true, plans };
}

function sameOriginHttps(u, appUrl) {
  try {
    const a = new URL(u); const b = new URL(appUrl);
    return a.protocol === 'https:' && a.origin === b.origin && !a.username && !a.password;
  } catch { return false; }
}

/** Returns { ok:true, mode, livemode, plans, secretKey, successUrl, cancelUrl } or { ok:false, reason }. */
export function membershipBillingConfig(env) {
  if (env.MEMBERSHIP_BILLING !== 'enabled') return fail('billing_disabled');
  const mode = env.MEMBERSHIP_STRIPE_MODE;
  if (mode !== 'test' && mode !== 'live') return fail('stripe_mode_missing');
  const key = env.STRIPE_SECRET_KEY;
  const km = typeof key === 'string' ? /^(?:sk|rk)_(test|live)_[A-Za-z0-9]{10,255}$/.exec(key) : null;
  if (!km) return fail('stripe_key_missing');
  if (km[1] !== mode) return fail('stripe_mode_mismatch');
  if (typeof env.STRIPE_WEBHOOK_SECRET !== 'string' || !env.STRIPE_WEBHOOK_SECRET) return fail('webhook_secret_missing');
  if (!env.PUBLIC_APP_URL) return fail('app_url_missing');
  if (!sameOriginHttps(env.MEMBERSHIP_CHECKOUT_SUCCESS_URL, env.PUBLIC_APP_URL)) return fail('success_url_invalid');
  if (!sameOriginHttps(env.MEMBERSHIP_CHECKOUT_CANCEL_URL, env.PUBLIC_APP_URL)) return fail('cancel_url_invalid');
  // Optional (MB-5): the expected Stripe account. When set it must be well-formed; resync then verifies
  // GET /v1/account matches before treating any 404 as definitive.
  const acct = env.MEMBERSHIP_STRIPE_ACCOUNT_ID;
  if (acct !== undefined && acct !== '' && (typeof acct !== 'string' || !/^acct_[A-Za-z0-9]{6,64}$/.test(acct))) return fail('stripe_account_invalid');
  const cat = parseCatalog(env.MEMBERSHIP_CATALOG);
  if (!cat.ok) return cat;
  return {
    ok: true, mode, livemode: mode === 'live', plans: cat.plans, secretKey: key, expectedAccount: acct || null,
    successUrl: env.MEMBERSHIP_CHECKOUT_SUCCESS_URL, cancelUrl: env.MEMBERSHIP_CHECKOUT_CANCEL_URL,
  };
}

export const MEMBERSHIP_TABLES = ['membership_checkouts', 'membership_subscriptions'];

/**
 * Config AND schema gate. Billing is "ready" only if the config is valid AND the pending 0016 tables exist.
 * If 0016 has not been promoted/applied, billing stays off (reason 'schema_missing') instead of 5xx/retry loops.
 * The schema probe runs only after the config passes, so billing-off requests never touch the DB here.
 */
export async function membershipSchemaState(env) {
  try {
    const r = await env.DB.prepare(`SELECT COUNT(*) AS n FROM sqlite_master WHERE type = 'table' AND name IN (?, ?)`)
      .bind(...MEMBERSHIP_TABLES).first();
    return r && r.n === MEMBERSHIP_TABLES.length ? 'present' : 'missing';
  } catch { return 'unknown'; }
}

export async function membershipBillingReady(env) {
  const cfg = membershipBillingConfig(env);
  if (!cfg.ok) return cfg;
  const st = await membershipSchemaState(env);
  if (st === 'unknown') return fail('schema_unknown'); // transient: callers must NOT treat this as "absent"
  if (st === 'missing') return fail('schema_missing');
  return cfg;
}

/** Non-secret summary safe for /health and /memberships/me. */
export async function billingSummary(env) {
  const c = await membershipBillingReady(env);
  return c.ok ? { configured: true, reason: null } : { configured: false, reason: c.reason };
}

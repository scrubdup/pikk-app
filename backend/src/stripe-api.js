import { ApiError } from './http.js';

/** Minimal Stripe REST client (no SDK). Tests stub global fetch; no real provider request is made in this repo's tests. */
export const STRIPE_API = 'https://api.stripe.com';
// Pinned so object shapes are stable (Basil+: subscription periods live on subscription items).
export const STRIPE_VERSION = '2025-03-31.basil';

export function formEncode(obj, prefix = '', out = []) {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === 'object') formEncode(v, key, out);
    else out.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
  }
  return out.join('&');
}

export async function stripeRequest(cfg, method, path, { form, idempotencyKey } = {}) {
  const headers = { Authorization: `Bearer ${cfg.secretKey}`, 'Stripe-Version': STRIPE_VERSION };
  if (form) headers['Content-Type'] = 'application/x-www-form-urlencoded';
  if (idempotencyKey) headers['Idempotency-Key'] = idempotencyKey;
  let res;
  try {
    res = await fetch(`${STRIPE_API}${path}`, { method, headers, body: form ? formEncode(form) : undefined, signal: AbortSignal.timeout(10_000) });
  } catch {
    throw new ApiError(502, 'payment_provider_unavailable', 'Payment provider unavailable');
  }
  const text = await res.text();
  if (text.length > 512 * 1024) throw new ApiError(502, 'payment_provider_error', 'Payment provider response too large');
  let body = null; try { body = JSON.parse(text); } catch { /* handled below */ }
  if (!res.ok || !body || typeof body !== 'object') {
    // Never echo provider error bodies (may contain request details) to clients.
    throw new ApiError(502, 'payment_provider_error', 'Payment provider error', { provider_status: res.status });
  }
  return body;
}

/**
 * Public-safe activation requirement codes for GET /health.
 *
 * These helpers report only whether required Worker bindings or credentials are
 * present in a form the consuming code would treat as configured. They do not
 * call providers, resolve DNS, or claim that email, R2, Stripe, or vault
 * signing is live or available. Provider formats (Resend key prefix, From
 * address shape, webhook secret prefix) are not validated here.
 *
 * Responses never include secret or env names, or secret values.
 */

/**
 * Meaningful required string for email/webhook credentials.
 * Restores the pre-existing capability intent (`!!env.X`) for false / 0 / null / ''
 * (those are missing, matching `email.js` and `webhook.js`) and also requires a
 * real string so Wrangler JSON booleans/numbers and accidental arrays/objects
 * are not reported as configured. Whitespace-only strings are still present
 * (the mailer would attempt a send).
 */
function requiredString(v) {
  return typeof v === 'string' && v !== '';
}

/** Binding presence — same intent as the pre-existing `!!env.MEDIA` capability. */
function bindingPresent(v) {
  return !!v;
}

/** Same rule as `signingKey()` in media-content.js: string of length >= 32. */
function vaultSigningKeyOk(v) {
  return typeof v === 'string' && v.length >= 32;
}

function status(env, reqs) {
  const missing = [];
  for (const { key, code, ok } of reqs) {
    if (!ok(env && env[key])) missing.push(code);
  }
  return { configured: missing.length === 0, missing };
}

/** Matches consuming `email.js` (`!env.RESEND_API_KEY || !env.EMAIL_FROM`) plus required strings. */
export function emailDeliveryConfigured(env) {
  return requiredString(env && env.RESEND_API_KEY) && requiredString(env && env.EMAIL_FROM);
}

/** Same predicate as the pre-existing /health media_storage capability (`!!env.MEDIA`). */
export function mediaStorageConfigured(env) {
  return bindingPresent(env && env.MEDIA);
}

export function mediaBackupConfigured(env) {
  return bindingPresent(env && env.MEDIA_BACKUP);
}

export function vaultSigningConfigured(env) {
  return vaultSigningKeyOk(env && env.VAULT_SIGNING_KEY);
}

/** Matches consuming `webhook.js` (`!env.STRIPE_WEBHOOK_SECRET`) plus required string. */
export function paymentsWebhookConfigured(env) {
  return requiredString(env && env.STRIPE_WEBHOOK_SECRET);
}

/**
 * Structured requirement block for /health.
 * `billing` must be the result of billingSummary() from membership-config.js
 * (authoritative membership billing readiness — this module does not re-parse billing config).
 */
export function activationReadiness(env, billing) {
  const membership_billing = {
    configured: !!(billing && billing.configured),
    reason: billing && billing.reason != null ? billing.reason : null,
  };
  return {
    email_delivery: status(env, [
      { key: 'RESEND_API_KEY', code: 'email_delivery_credential', ok: requiredString },
      { key: 'EMAIL_FROM', code: 'email_from_address', ok: requiredString },
    ]),
    media_storage: status(env, [{ key: 'MEDIA', code: 'media_binding', ok: bindingPresent }]),
    media_backup: status(env, [{ key: 'MEDIA_BACKUP', code: 'media_backup_binding', ok: bindingPresent }]),
    vault_signing: status(env, [{ key: 'VAULT_SIGNING_KEY', code: 'vault_signing_credential', ok: vaultSigningKeyOk }]),
    payments_webhook: status(env, [{ key: 'STRIPE_WEBHOOK_SECRET', code: 'payments_webhook_credential', ok: requiredString }]),
    membership_billing,
  };
}

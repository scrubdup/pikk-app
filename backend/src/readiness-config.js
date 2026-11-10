/**
 * Public-safe activation requirement codes for GET /health.
 *
 * These helpers report only whether required Worker bindings or credentials are
 * *present* in the env. They do not call providers, resolve DNS, or claim that
 * email, R2, Stripe, or vault signing is live or available.
 *
 * Responses never include secret or env names, or secret values.
 */

function present(env, key) {
  const v = env && env[key];
  return v != null && v !== '';
}

function status(env, reqs) {
  const missing = [];
  for (const { key, code } of reqs) {
    if (!present(env, key)) missing.push(code);
  }
  return { configured: missing.length === 0, missing };
}

/** Same predicate as the pre-existing /health email_delivery capability. */
export function emailDeliveryConfigured(env) {
  return present(env, 'RESEND_API_KEY') && present(env, 'EMAIL_FROM');
}

/** Same predicate as the pre-existing /health media_storage capability. */
export function mediaStorageConfigured(env) {
  return present(env, 'MEDIA');
}

export function mediaBackupConfigured(env) {
  return present(env, 'MEDIA_BACKUP');
}

export function vaultSigningConfigured(env) {
  return present(env, 'VAULT_SIGNING_KEY');
}

/** Same predicate as the pre-existing /health payments_webhook capability. */
export function paymentsWebhookConfigured(env) {
  return present(env, 'STRIPE_WEBHOOK_SECRET');
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
      { key: 'RESEND_API_KEY', code: 'email_delivery_credential' },
      { key: 'EMAIL_FROM', code: 'email_from_address' },
    ]),
    media_storage: status(env, [{ key: 'MEDIA', code: 'media_binding' }]),
    media_backup: status(env, [{ key: 'MEDIA_BACKUP', code: 'media_backup_binding' }]),
    vault_signing: status(env, [{ key: 'VAULT_SIGNING_KEY', code: 'vault_signing_credential' }]),
    payments_webhook: status(env, [{ key: 'STRIPE_WEBHOOK_SECRET', code: 'payments_webhook_credential' }]),
    membership_billing,
  };
}

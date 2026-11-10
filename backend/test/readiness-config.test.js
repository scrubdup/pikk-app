import { describe, it, expect } from 'vitest';
import { env, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import worker from '../src/index.js';
import {
  emailDeliveryConfigured,
  mediaStorageConfigured,
  mediaBackupConfigured,
  vaultSigningConfigured,
  paymentsWebhookConfigured,
  activationReadiness,
} from '../src/readiness-config.js';
import { billingSummary } from '../src/membership-config.js';
import { ORIGIN, freshIp } from './helpers.js';

const ENV_NAMES = [
  'RESEND_API_KEY',
  'EMAIL_FROM',
  'STRIPE_WEBHOOK_SECRET',
  'STRIPE_SECRET_KEY',
  'VAULT_SIGNING_KEY',
  'MEMBERSHIP_STRIPE_ACCOUNT_ID',
  'MEMBERSHIP_CATALOG',
  'OWNER_BOOTSTRAP_TOKEN',
  'MEDIA_BACKUP',
];

function assertNoSecretsOrEnvNames(payload) {
  const s = JSON.stringify(payload);
  expect(s).not.toMatch(/api[_-]?key|secret|token/i);
  for (const name of ENV_NAMES) {
    expect(s).not.toContain(name);
  }
  // Binding name MEDIA must not appear as a public token (media_storage / media_binding are ok).
  expect(s).not.toMatch(/\bMEDIA\b/);
}

describe('readiness-config helpers (presence only, public codes)', () => {
  it('reports configured=false and public missing codes when requirements are absent', () => {
    const empty = {};
    expect(emailDeliveryConfigured(empty)).toBe(false);
    expect(mediaStorageConfigured(empty)).toBe(false);
    expect(mediaBackupConfigured(empty)).toBe(false);
    expect(vaultSigningConfigured(empty)).toBe(false);
    expect(paymentsWebhookConfigured(empty)).toBe(false);

    const r = activationReadiness(empty, { configured: false, reason: 'billing_disabled' });
    expect(r.email_delivery).toEqual({
      configured: false,
      missing: ['email_delivery_credential', 'email_from_address'],
    });
    expect(r.media_storage).toEqual({ configured: false, missing: ['media_binding'] });
    expect(r.media_backup).toEqual({ configured: false, missing: ['media_backup_binding'] });
    expect(r.vault_signing).toEqual({ configured: false, missing: ['vault_signing_credential'] });
    expect(r.payments_webhook).toEqual({ configured: false, missing: ['payments_webhook_credential'] });
    expect(r.membership_billing).toEqual({ configured: false, reason: 'billing_disabled' });
    assertNoSecretsOrEnvNames(r);
    expect(r).not.toHaveProperty('ui_preview');
    expect(r).not.toHaveProperty('missing_policy');
  });

  it('treats empty-string values as missing and does not invent partial email configured=true', () => {
    const r = activationReadiness({
      RESEND_API_KEY: '',
      EMAIL_FROM: 'PIKK <x@example.com>',
      MEDIA: '',
      VAULT_SIGNING_KEY: '',
      STRIPE_WEBHOOK_SECRET: '',
    }, { configured: false, reason: 'billing_disabled' });
    expect(r.email_delivery.configured).toBe(false);
    expect(r.email_delivery.missing).toEqual(['email_delivery_credential']);
    expect(r.media_storage.missing).toEqual(['media_binding']);
    expect(r.payments_webhook.missing).toEqual(['payments_webhook_credential']);
    assertNoSecretsOrEnvNames(r);
  });

  it('reports configured=true and empty missing when requirements are present (not a live provider check)', () => {
    const full = {
      RESEND_API_KEY: 're_test',
      EMAIL_FROM: 'PIKK <x@example.com>',
      MEDIA: { put() {} },
      MEDIA_BACKUP: { put() {} },
      VAULT_SIGNING_KEY: 'x'.repeat(32),
      STRIPE_WEBHOOK_SECRET: 'whsec_test',
    };
    expect(emailDeliveryConfigured(full)).toBe(true);
    expect(mediaStorageConfigured(full)).toBe(true);
    expect(mediaBackupConfigured(full)).toBe(true);
    expect(vaultSigningConfigured(full)).toBe(true);
    expect(paymentsWebhookConfigured(full)).toBe(true);
    const r = activationReadiness(full, { configured: false, reason: 'billing_disabled' });
    expect(r.email_delivery).toEqual({ configured: true, missing: [] });
    expect(r.media_storage).toEqual({ configured: true, missing: [] });
    expect(r.media_backup).toEqual({ configured: true, missing: [] });
    expect(r.vault_signing).toEqual({ configured: true, missing: [] });
    expect(r.payments_webhook).toEqual({ configured: true, missing: [] });
    // Billing stays authoritative from the membership helper result, not from webhook presence.
    expect(r.membership_billing).toEqual({ configured: false, reason: 'billing_disabled' });
    assertNoSecretsOrEnvNames(r);
  });

  it('passes through billingSummary reason without re-parsing membership config', async () => {
    const mb = await billingSummary({ ...env, MEMBERSHIP_BILLING: undefined });
    expect(mb.configured).toBe(false);
    const r = activationReadiness(env, mb);
    expect(r.membership_billing.configured).toBe(mb.configured);
    expect(r.membership_billing.reason).toBe(mb.reason);
  });
});

describe('GET /health activation_readiness (preserves billing fields)', () => {
  async function health(envOver = {}) {
    const ctx = createExecutionContext();
    const res = await worker.fetch(new Request('https://api.test/health', {
      headers: { Origin: ORIGIN, 'CF-Connecting-IP': freshIp() },
    }), { ...env, ...envOver }, ctx);
    await waitOnExecutionContext(ctx);
    return { status: res.status, json: await res.json() };
  }

  it('adds public-safe activation_readiness and keeps membership billing fields', async () => {
    const h = await health({
      RESEND_API_KEY: undefined,
      EMAIL_FROM: undefined,
      STRIPE_WEBHOOK_SECRET: undefined,
      VAULT_SIGNING_KEY: undefined,
      MEMBERSHIP_BILLING: undefined,
    });
    expect(h.status).toBe(200);
    expect(h.json.ok).toBe(true);
    expect(h.json.capabilities.membership_status).toBe(true);
    expect(h.json.capabilities.membership_billing).toBe(false);
    expect(h.json.membership_billing_reason).toBe('billing_disabled');
    expect(h.json.capabilities.email_delivery).toBe(false);
    expect(h.json.capabilities.payments_webhook).toBe(false);
    expect(h.json.activation_readiness.email_delivery.missing).toEqual([
      'email_delivery_credential',
      'email_from_address',
    ]);
    expect(h.json.activation_readiness.payments_webhook.missing).toEqual(['payments_webhook_credential']);
    expect(h.json.activation_readiness.vault_signing.missing).toEqual(['vault_signing_credential']);
    expect(h.json.activation_readiness.membership_billing).toEqual({
      configured: false,
      reason: 'billing_disabled',
    });
    expect(h.json.capabilities.membership_billing).toBe(h.json.activation_readiness.membership_billing.configured);
    expect(h.json.membership_billing_reason).toBe(h.json.activation_readiness.membership_billing.reason);
    expect(h.json.activation_readiness).not.toHaveProperty('ui_preview');
    expect(h.json.activation_readiness).not.toHaveProperty('missing_policy');
    assertNoSecretsOrEnvNames(h.json);
  });

  it('capability booleans match configured flags when email/media/webhook are present; billing stays off', async () => {
    const h = await health({
      RESEND_API_KEY: 're_test',
      EMAIL_FROM: 'PIKK <x@example.com>',
      STRIPE_WEBHOOK_SECRET: 'whsec_test',
      VAULT_SIGNING_KEY: 'v'.repeat(32),
      MEMBERSHIP_BILLING: undefined,
    });
    expect(h.status).toBe(200);
    expect(h.json.capabilities.email_delivery).toBe(true);
    expect(h.json.activation_readiness.email_delivery).toEqual({ configured: true, missing: [] });
    expect(h.json.capabilities.payments_webhook).toBe(true);
    expect(h.json.activation_readiness.payments_webhook).toEqual({ configured: true, missing: [] });
    expect(h.json.activation_readiness.vault_signing.configured).toBe(true);
    // Test env supplies MEDIA via Miniflare; capability must stay consistent with the helper.
    expect(h.json.capabilities.media_storage).toBe(h.json.activation_readiness.media_storage.configured);
    expect(h.json.capabilities.membership_billing).toBe(false);
    expect(h.json.membership_billing_reason).toBe('billing_disabled');
    assertNoSecretsOrEnvNames(h.json);
  });
});

import { describe, it, expect } from 'vitest';
import { SELF } from 'cloudflare:test';
import { ORIGIN, freshIp } from './helpers.js';

describe('backend readiness health', () => {
  it('reports non-secret capability readiness', async () => {
    const res = await SELF.fetch('https://api.test/health', {
      headers: { Origin: ORIGIN, 'CF-Connecting-IP': freshIp() },
    });
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.service).toBe('pikk-api');
    expect(body.capabilities.database).toBe(true);
    expect(body.capabilities.auth).toBe(true);
    expect(body.capabilities.email_verification).toBe(true);
    expect(typeof body.capabilities.email_delivery).toBe('boolean');
    expect(typeof body.capabilities.media_storage).toBe('boolean');
    expect(typeof body.capabilities.payments_webhook).toBe('boolean');
    expect(body.capabilities.membership_status).toBe(true);
    expect(body).toHaveProperty('membership_billing_reason');
    expect(body.activation_readiness.membership_billing.configured).toBe(body.capabilities.membership_billing);
    expect(body.activation_readiness.membership_billing.reason).toBe(body.membership_billing_reason ?? null);
    expect(JSON.stringify(body)).not.toMatch(/api[_-]?key|secret|token/i);
  });
});

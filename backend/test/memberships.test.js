import { describe, it, expect } from 'vitest';
import { call, newUser } from './helpers.js';

describe('membership status (server-authoritative)', () => {
  it('requires authentication', async () => {
    const r = await call('GET', '/memberships/me');
    expect(r.status).toBe(401);
    expect(r.json.error.code).toBe('unauthenticated');
  });

  it('returns inactive authoritative status with no free grant and no plan invention', async () => {
    const u = await newUser();
    const r = await call('GET', '/memberships/me', { cookie: u.cookie });
    expect(r.status).toBe(200);
    expect(r.json.membership).toMatchObject({
      status: 'inactive',
      plan: null,
      source: 'none',
      authoritative: true,
      activation: 'not_available',
    });
    expect(typeof r.json.membership.billing_configured).toBe('boolean');
    // No prices, tiers, trials, or free entitlements in the payload.
    expect(r.json.membership).not.toHaveProperty('price');
    expect(r.json.membership).not.toHaveProperty('trial');
    expect(r.json.membership).not.toHaveProperty('tiers');
  });

  it('rejects client self-grant of membership while authenticated', async () => {
    const u = await newUser();
    for (const path of ['/memberships/join', '/memberships/activate', '/memberships/grant']) {
      const r = await call('POST', path, { cookie: u.cookie, body: { plan: 'inner', price: 0 } });
      expect(r.status).toBe(403);
      expect(r.json.error.code).toBe('forbidden');
    }
    const me = await call('GET', '/memberships/me', { cookie: u.cookie });
    expect(me.json.membership.status).toBe('inactive');
    expect(me.json.membership.plan).toBe(null);
  });

  it('another user cannot read membership via forged body identity fields', async () => {
    const a = await newUser();
    const b = await newUser();
    const r = await call('GET', '/memberships/me', {
      cookie: a.cookie,
      headers: { 'X-User-Id': b.id, 'X-User-Handle': b.handle },
    });
    expect(r.status).toBe(200);
    // Status is session-bound; response never echoes another user's id as owner of an active plan.
    expect(r.json.membership.status).toBe('inactive');
    expect(r.json.user_id).toBeUndefined();
  });
});

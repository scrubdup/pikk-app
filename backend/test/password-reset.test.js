import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { call, newUser, freshIp } from './helpers.js';
import { sha256Hex } from '../src/crypto.js';

const NEW_PW = 'brand new pass 99';

describe('password recovery', () => {
  it('returns a generic non-enumerating response for unknown and known emails', async () => {
    const u = await newUser();
    const unknown = await call('POST', '/auth/forgot-password', {
      body: { email: 'nobody-exists@example.com' },
      ip: freshIp(),
    });
    expect(unknown.status).toBe(200);
    expect(unknown.json.message).toMatch(/if an account exists/i);
    expect(unknown.json.recovery?.token).toBeUndefined();

    const known = await call('POST', '/auth/forgot-password', {
      body: { email: u.email },
      ip: freshIp(),
    });
    expect(known.status).toBe(200);
    expect(known.json.message).toBe(unknown.json.message);
    // Local tests expose token via EXPOSE_VERIFY_TOKEN — never include a delivery discriminator.
    expect(known.json.recovery?.delivery).toBeUndefined();
    expect(typeof known.json.recovery.token).toBe('string');
    expect(known.json.recovery.token.length).toBeGreaterThan(20);
    // Unknown must not gain a recovery object; known may only add recovery.token
    expect(unknown.json.recovery).toBeUndefined();
  });

  it('stores only a hash of the reset token', async () => {
    const u = await newUser();
    const r = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    const token = r.json.recovery.token;
    const hash = await sha256Hex(token);
    const row = await env.DB.prepare('SELECT token_hash, user_id, used_at FROM password_reset_tokens WHERE token_hash = ?').bind(hash).first();
    expect(row).toBeTruthy();
    expect(row.user_id).toBe(u.id);
    expect(row.used_at).toBeNull();
    const rawLeak = await env.DB.prepare('SELECT * FROM password_reset_tokens').all();
    for (const t of rawLeak.results || []) {
      expect(JSON.stringify(t)).not.toContain(token);
    }
  });

  it('resets password, rejects replay and old sessions, allows login with new password', async () => {
    const u = await newUser();
    // Establish a live session cookie
    const login1 = await call('POST', '/auth/login', { body: { email: u.email, password: u.password }, ip: freshIp() });
    expect(login1.status).toBe(200);
    const oldCookie = login1.cookie;
    const me1 = await call('GET', '/auth/me', { cookie: oldCookie, ip: freshIp() });
    expect(me1.status).toBe(200);

    const forgot = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    const token = forgot.json.recovery.token;

    const reset = await call('POST', '/auth/reset-password', {
      body: { token, password: NEW_PW },
      ip: freshIp(),
    });
    expect(reset.status).toBe(200);
    expect(reset.json.ok).toBe(true);

    // Old session revoked
    const meOld = await call('GET', '/auth/me', { cookie: oldCookie, ip: freshIp() });
    expect(meOld.status).toBe(401);

    // Replay token fails
    const replay = await call('POST', '/auth/reset-password', {
      body: { token, password: 'another pass 11' },
      ip: freshIp(),
    });
    expect(replay.status).toBe(400);
    expect(replay.json.error.code).toBe('invalid_token');

    // Old password rejected; new password works
    const bad = await call('POST', '/auth/login', { body: { email: u.email, password: u.password }, ip: freshIp() });
    expect(bad.status).toBe(401);
    const ok = await call('POST', '/auth/login', { body: { email: u.email, password: NEW_PW }, ip: freshIp() });
    expect(ok.status).toBe(200);
    const me2 = await call('GET', '/auth/me', { cookie: ok.cookie, ip: freshIp() });
    expect(me2.status).toBe(200);
    expect(me2.json.user.handle).toBe(u.handle);
  });

  it('rejects expired tokens and cross-account reuse of another users token', async () => {
    const a = await newUser();
    const b = await newUser();
    const forgotA = await call('POST', '/auth/forgot-password', { body: { email: a.email }, ip: freshIp() });
    const tokenA = forgotA.json.recovery.token;
    const hash = await sha256Hex(tokenA);

    // Expire A's token
    await env.DB.prepare(`UPDATE password_reset_tokens SET expires_at = ? WHERE token_hash = ?`)
      .bind(new Date(Date.now() - 1000).toISOString(), hash).run();
    const expired = await call('POST', '/auth/reset-password', {
      body: { token: tokenA, password: NEW_PW },
      ip: freshIp(),
    });
    expect(expired.status).toBe(400);

    // Fresh token for A cannot change B (token is bound to user_id in DB — verify B password still works after A reset attempt with B email confusion)
    const forgotA2 = await call('POST', '/auth/forgot-password', { body: { email: a.email }, ip: freshIp() });
    const tokenA2 = forgotA2.json.recovery.token;
    await call('POST', '/auth/reset-password', { body: { token: tokenA2, password: NEW_PW }, ip: freshIp() });
    const bStill = await call('POST', '/auth/login', { body: { email: b.email, password: b.password }, ip: freshIp() });
    expect(bStill.status).toBe(200);
  });

  it('rejects weak passwords on reset', async () => {
    const u = await newUser();
    const forgot = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    const weak = await call('POST', '/auth/reset-password', {
      body: { token: forgot.json.recovery.token, password: 'short' },
      ip: freshIp(),
    });
    expect(weak.status).toBe(422);
    expect(weak.json.error.code).toBe('validation_failed');
  });

  it('rate limits forgot-password per IP', async () => {
    const ip = freshIp();
    let last;
    for (let i = 0; i < 6; i++) {
      last = await call('POST', '/auth/forgot-password', {
        body: { email: `rate${i}@example.com` },
        ip,
      });
    }
    expect(last.status).toBe(429);
  });
});

  it('refuses reset when the account is disabled', async () => {
    const u = await newUser();
    const forgot = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    await env.DB.prepare('UPDATE users SET disabled_at=? WHERE id=?').bind(new Date().toISOString(), u.id).run();
    const r = await call('POST', '/auth/reset-password', {
      body: { token: forgot.json.recovery.token, password: 'disabled pass 1' },
      ip: freshIp(),
    });
    expect(r.status).toBe(400);
    expect(r.json.error.code).toBe('invalid_token');
  });

  it('a failed provider send keeps the previous live token usable', async () => {
    const u = await newUser();
    const first = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    const prior = first.json.recovery.token;
    // Simulate production delivery path with failing provider after a prior expose-mode token
    const { requestPasswordReset } = await import('../src/auth.js');
    const { vi } = await import('vitest');
    vi.stubGlobal('fetch', async () => new Response('nope', { status: 500 }));
    const prod = { ...env, EXPOSE_VERIFY_TOKEN: 'false', RESEND_API_KEY: 're_test', EMAIL_FROM: 'PIKK <x@example.com>' };
    await requestPasswordReset(prod, new Request('https://api.test/', { headers: { 'CF-Connecting-IP': freshIp() } }), { email: u.email }, { waitUntil() {} });
    vi.unstubAllGlobals();
    const still = await call('POST', '/auth/reset-password', { body: { token: prior, password: 'still works 42' }, ip: freshIp() });
    expect(still.status).toBe(200);
  });

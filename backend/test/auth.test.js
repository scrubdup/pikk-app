import { describe, it, expect, vi } from 'vitest';
import { env } from 'cloudflare:test';
import { call, newUser, freshIp, ORIGIN } from './helpers.js';

describe('auth', () => {
  it('signup sets a hardened session cookie and stores only a PBKDF2 hash', async () => {
    const r = await call('POST', '/auth/signup', { body: { email: 'A@Example.com', password: 'longpassword1', handle: 'alice_1', display_name: 'Alice', gender: 'female' }, ip: freshIp() });
    expect(r.status).toBe(201);
    const sc = r.res.headers.get('Set-Cookie');
    expect(sc).toMatch(/^__Host-pikk_session=/);
    expect(sc).toMatch(/HttpOnly/); expect(sc).toMatch(/Secure/); expect(sc).toMatch(/SameSite=(None|Lax|Strict)/); expect(sc).toMatch(/Path=\//); expect(sc).toMatch(/Partitioned/);
    expect(r.json.user.email).toBe('a@example.com');
    const cred = await env.DB.prepare('SELECT * FROM credentials WHERE email = ?').bind('a@example.com').first();
    expect(cred.password_hash).not.toContain('longpassword1');
    expect(cred.password_iterations).toBeGreaterThanOrEqual(100000);
    const sess = await env.DB.prepare('SELECT id_hash FROM sessions WHERE user_id = ?').bind(r.json.user.id).first();
    expect(sess.id_hash).not.toBe(r.cookie.split('=')[1]); // token stored hashed
  });

  it('rejects invalid input with standard JSON errors', async () => {
    const r = await call('POST', '/auth/signup', { body: { email: 'nope', password: 'short', handle: 'x', display_name: '', gender: 'female' }, ip: freshIp() });
    expect(r.status).toBe(422);
    expect(r.json.error.code).toBe('validation_failed');
    expect(Object.keys(r.json.error.details).sort()).toEqual(['display_name', 'email', 'handle', 'password']);
    expect(r.json.request_id).toBeTruthy();
    const bad = await call('POST', '/auth/login', { body: undefined, headers: { 'Content-Type': 'text/plain' }, ip: freshIp() });
    expect(bad.status).toBe(415);
  });

  it('rejects duplicate email/handle', async () => {
    const u = await newUser();
    const r = await call('POST', '/auth/signup', { body: { email: u.email, password: 'another pass 9', handle: 'other_handle', display_name: 'X', gender: 'female' }, ip: freshIp() });
    expect(r.status).toBe(409);
  });

  it('login / me / logout lifecycle; revoked session is rejected', async () => {
    const u = await newUser();
    const bad = await call('POST', '/auth/login', { body: { email: u.email, password: 'wrong password 1' }, ip: freshIp() });
    expect(bad.status).toBe(401); expect(bad.json.error.code).toBe('invalid_credentials');
    const unknown = await call('POST', '/auth/login', { body: { email: 'ghost@example.com', password: 'whatever 123' }, ip: freshIp() });
    expect(unknown.status).toBe(401);
    const ok = await call('POST', '/auth/login', { body: { email: u.email, password: u.password }, ip: freshIp() });
    expect(ok.status).toBe(200);
    const me = await call('GET', '/auth/me', { cookie: ok.cookie });
    expect(me.status).toBe(200); expect(me.json.user.handle).toBe(u.handle); expect(me.json.roles).toEqual(['user']);
    expect(me.json.user.email_verified).toBe(true);
    const out = await call('POST', '/auth/logout', { cookie: ok.cookie });
    expect(out.status).toBe(200); expect(out.res.headers.get('Set-Cookie')).toMatch(/Max-Age=0/);
    expect((await call('GET', '/auth/me', { cookie: ok.cookie })).status).toBe(401);
    expect((await call('GET', '/auth/me', { cookie: '__Host-pikk_session=forged' })).status).toBe(401);
    expect((await call('GET', '/auth/me')).status).toBe(401);
  });

  it('expired sessions are rejected', async () => {
    const u = await newUser();
    await env.DB.prepare(`UPDATE sessions SET expires_at = '2000-01-01T00:00:00Z' WHERE user_id = ?`).bind(u.id).run();
    expect((await call('GET', '/auth/me', { cookie: u.cookie })).status).toBe(401);
  });

  it('verification tokens are single-use', async () => {
    const r = await call('POST', '/auth/signup', { body: { email: 'v@example.com', password: 'verify me 123', handle: 'verify_me', display_name: 'V', gender: 'female' }, ip: freshIp() });
    const t = r.json.verification.token;
    expect((await call('POST', '/auth/verify', { body: { token: t }, ip: freshIp() })).status).toBe(200);
    const again = await call('POST', '/auth/verify', { body: { token: t }, ip: freshIp() });
    expect(again.status).toBe(400); expect(again.json.error.code).toBe('invalid_token');
  });

  it('concurrent verification attempts cannot both consume the same token', async () => {
    const r = await call('POST', '/auth/signup', {
      body: { email: 'verify-race@example.com', password: 'verify me 123', handle: 'verify_race', display_name: 'Race', gender: 'female' },
      ip: freshIp(),
    });
    expect(r.status).toBe(201);
    const token = r.json.verification.token;
    const results = await Promise.all([
      call('POST', '/auth/verify', { body: { token }, ip: freshIp() }),
      call('POST', '/auth/verify', { body: { token }, ip: freshIp() }),
    ]);
    expect(results.map(x => x.status).sort()).toEqual([200, 400]);
    expect(results.find(x => x.status === 400).json.error.code).toBe('invalid_token');
    const cred = await env.DB.prepare('SELECT email_verified_at FROM credentials WHERE user_id = ?').bind(r.json.user.id).first();
    expect(cred.email_verified_at).toBeTruthy();
  });

  it('per-IP auth rate limit returns 429', async () => {
    const ip = '203.0.113.77'; let last;
    // Fixed 60s windows: pin the clock mid-window so the 11 calls can't straddle a boundary (CI flake).
    const t0 = Date.now(); const pinned = t0 - (t0 % 60000) + 30000;
    const spy = vi.spyOn(Date, 'now').mockReturnValue(pinned);
    try {
      for (let i = 0; i < 11; i++) last = await call('POST', '/auth/login', { body: { email: 'x@example.com', password: 'nope nope 1' }, ip });
    } finally { spy.mockRestore(); }
    expect(last.status).toBe(429); expect(last.json.error.code).toBe('rate_limited');
  });

  it('CORS is locked to the PIKK origin and CSRF origin check blocks foreign POSTs', async () => {
    const pre = await call('OPTIONS', '/auth/login', { origin: ORIGIN });
    expect(pre.status).toBe(204);
    expect(pre.res.headers.get('Access-Control-Allow-Origin')).toBe(ORIGIN);
    expect(pre.res.headers.get('Access-Control-Allow-Credentials')).toBe('true');
    const evilPre = await call('OPTIONS', '/auth/login', { origin: 'https://evil.example' });
    expect(evilPre.status).toBe(403); expect(evilPre.res.headers.get('Access-Control-Allow-Origin')).toBeNull();
    const evil = await call('POST', '/auth/login', { origin: 'https://evil.example', body: { email: 'a@b.co', password: 'x' }, ip: freshIp() });
    expect(evil.status).toBe(403); expect(evil.json.error.code).toBe('bad_origin');
    const none = await call('POST', '/auth/login', { origin: null, body: { email: 'a@b.co', password: 'x' }, ip: freshIp() });
    expect(none.status).toBe(403);
  });

  it('unknown routes return JSON 404', async () => {
    const r = await call('GET', '/nope');
    expect(r.status).toBe(404); expect(r.json.error.code).toBe('not_found');
  });
  it('session lifetime never exceeds 30 days', async () => {
    const u = await newUser();
    const row = await env.DB.prepare('SELECT created_at, expires_at FROM sessions WHERE user_id = ?').bind(u.id).first();
    const duration = Date.parse(row.expires_at) - Date.parse(row.created_at);
    expect(duration).toBeGreaterThan(0);
    expect(duration).toBeLessThanOrEqual(720 * 3600 * 1000);
  });


  it('resends verification for an authenticated unverified user and invalidates the old token', async () => {
    const signup = await call('POST', '/auth/signup', {
      body: { email: 'resend@example.com', password: 'resend pass 123', handle: 'resend_user', display_name: 'Resend User', gender: 'female' },
      ip: freshIp(),
    });
    expect(signup.status).toBe(201);
    const oldToken = signup.json.verification.token;

    const resend = await call('POST', '/auth/resend-verification', {
      cookie: signup.cookie,
      body: {},
      ip: freshIp(),
    });
    expect(resend.status).toBe(200);
    expect(resend.json.verification.delivery).toBe('exposed_for_local_testing');
    const newToken = resend.json.verification.token;
    expect(newToken).toBeTruthy();
    expect(newToken).not.toBe(oldToken);

    const oldAttempt = await call('POST', '/auth/verify', { body: { token: oldToken }, ip: freshIp() });
    expect(oldAttempt.status).toBe(400);

    const freshAttempt = await call('POST', '/auth/verify', { body: { token: newToken }, ip: freshIp() });
    expect(freshAttempt.status).toBe(200);
  });

  it('resend verification requires authentication and returns already_verified for verified users', async () => {
    expect((await call('POST', '/auth/resend-verification', { body: {}, ip: freshIp() })).status).toBe(401);
    const u = await newUser();
    const r = await call('POST', '/auth/resend-verification', { cookie: u.cookie, body: {}, ip: freshIp() });
    expect(r.status).toBe(200);
    expect(r.json.verification.delivery).toBe('already_verified');
  });

});

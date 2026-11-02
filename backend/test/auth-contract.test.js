// Contract tests: real Worker (Miniflare/workerd) for signup -> me -> logout, Set-Cookie attributes,
// resend-verification, and the frontend auth client (src/api/auth-client.js) against real routes.
import { describe, it, expect, afterEach } from 'vitest';
import { SELF, env } from 'cloudflare:test';
import { call, freshIp, ORIGIN } from './helpers.js';
import { resendVerification } from '../src/auth.js';
import { authApi } from '../../src/api/auth-client.js';

let seq = 0;
const uniq = () => `ct_${Date.now().toString(36)}_${++seq}`;
const signup = (h = uniq()) => call('POST', '/auth/signup', { body: { email: `${h}@example.com`, password: 'contract pass 123', handle: h, display_name: 'Contract' }, ip: freshIp() });
const attrs = (sc) => sc.split(';').slice(1).map((s) => s.trim());

describe('auth contract: signup -> me -> logout against the Worker', () => {
  it('end to end, with exact Set-Cookie attributes', async () => {
    const s = await signup();
    expect(s.status).toBe(201);
    const sc = s.res.headers.get('Set-Cookie');
    // Recorded actual value (test config uses wrangler.jsonc COOKIE_SAMESITE=None):
    // __Host-pikk_session=<token>; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=<n>; Partitioned
    expect(sc).toMatch(/^__Host-pikk_session=[^;]{20,};/);
    const a = attrs(sc);
    expect(a).toContain('Path=/');
    expect(a).toContain('HttpOnly');
    expect(a).toContain('Secure');
    expect(a).toContain('SameSite=None');
    expect(a).toContain('Partitioned');
    expect(a.some((x) => /^Max-Age=\d+$/.test(x) && Number(x.split('=')[1]) > 0)).toBe(true);
    expect(a.some((x) => /^domain=/i.test(x))).toBe(false); // __Host- forbids Domain

    const me = await call('GET', '/auth/me', { cookie: s.cookie, ip: freshIp() });
    expect(me.status).toBe(200);
    expect(me.json.user.id).toBe(s.json.user.id);

    const out = await call('POST', '/auth/logout', { cookie: s.cookie, body: {}, ip: freshIp() });
    expect(out.status).toBe(200);
    const clear = out.res.headers.get('Set-Cookie');
    expect(clear).toMatch(/^__Host-pikk_session=;/);
    expect(attrs(clear)).toContain('Max-Age=0');
    expect(attrs(clear)).toContain('Path=/');
    expect(attrs(clear).some((x) => /^domain=/i.test(x))).toBe(false);

    const after = await call('GET', '/auth/me', { cookie: s.cookie, ip: freshIp() });
    expect(after.status).toBe(401);
    const row = await env.DB.prepare('SELECT revoked_at FROM sessions WHERE user_id = ?').bind(s.json.user.id).first();
    expect(row.revoked_at).toBeTruthy();
  });

  it('no cookie => 401 on /auth/me', async () => {
    expect((await call('GET', '/auth/me', { ip: freshIp() })).status).toBe(401);
  });
});

describe('auth contract: resend-verification', () => {
  it('requires a session (401 without one; no email-only path, so no enumeration surface)', async () => {
    const r = await call('POST', '/auth/resend-verification', { body: { email: 'someone@example.com' }, ip: freshIp() });
    expect(r.status).toBe(401);
  });

  it('invalidates the previous token, is audited, and is rate-limited per user (3/hour)', async () => {
    const s = await signup();
    const oldToken = s.json.verification.token;
    const r1 = await call('POST', '/auth/resend-verification', { cookie: s.cookie, body: {}, ip: freshIp() });
    expect(r1.status).toBe(200);
    expect(r1.json.ok).toBe(true);
    expect((await call('POST', '/auth/verify', { body: { token: oldToken }, ip: freshIp() })).status).toBe(400);
    const audit = await env.DB.prepare(`SELECT action FROM audit_log WHERE action = 'auth.verification_resent' AND actor_id = ?`).bind(s.json.user.id).first();
    expect(audit).toBeTruthy();
    expect((await call('POST', '/auth/resend-verification', { cookie: s.cookie, body: {}, ip: freshIp() })).status).toBe(200);
    expect((await call('POST', '/auth/resend-verification', { cookie: s.cookie, body: {}, ip: freshIp() })).status).toBe(200);
    const r4 = await call('POST', '/auth/resend-verification', { cookie: s.cookie, body: {}, ip: freshIp() });
    expect(r4.status).toBe(429);
  });

  it('returns email_provider_not_configured with no provider, matching signup', async () => {
    const s = await signup();
    const me = await call('GET', '/auth/me', { cookie: s.cookie, ip: freshIp() });
    const noProvider = { ...env, EXPOSE_VERIFY_TOKEN: undefined, RESEND_API_KEY: undefined, EMAIL_FROM: undefined };
    const req = new Request('https://api.test/auth/resend-verification', { method: 'POST', headers: { 'CF-Connecting-IP': freshIp() } });
    const r = await resendVerification(noProvider, req, { user: me.json.user });
    expect(r).toEqual({ ok: true, verification: { delivery: 'email_provider_not_configured' } });
    expect(JSON.stringify(r)).not.toMatch(/token/);
  });
});

describe('auth contract: frontend client paths hit real backend routes', () => {
  const origFetch = globalThis.fetch; const origWindow = globalThis.window;
  afterEach(() => { globalThis.fetch = origFetch; if (origWindow === undefined) delete globalThis.window; else globalThis.window = origWindow; });

  it('authApi signup/me/resend/verify/logout/login all resolve against the Worker', async () => {
    globalThis.window = { __PIKK_API_BASE__: 'https://api.test/' };
    let jar = ''; const seen = [];
    globalThis.fetch = async (url, opts = {}) => {
      seen.push({ path: new URL(url).pathname, method: opts.method || 'GET', credentials: opts.credentials });
      const headers = { ...(opts.headers || {}), Origin: ORIGIN, 'CF-Connecting-IP': freshIp() };
      if (jar) headers.Cookie = jar;
      const res = await SELF.fetch(url, { method: opts.method, headers, body: opts.body });
      const sc = res.headers.get('Set-Cookie'); if (sc) jar = sc.split(';')[0];
      return res;
    };
    const h = uniq();
    const su = await authApi.signup({ email: `${h}@example.com`, handle: h, displayName: 'Client', password: 'client pass 123' });
    expect(su.user.handle).toBe(h);
    expect((await authApi.me()).user.handle).toBe(h);
    const rs = await authApi.resendVerification();
    await authApi.verifyEmail(rs.verification.token);
    expect((await authApi.me()).user.email_verified).toBe(true);
    await authApi.logout();
    await expect(authApi.me()).rejects.toMatchObject({ status: 401 });
    await authApi.login({ email: `${h}@example.com`, password: 'client pass 123' });
    expect((await authApi.me()).user.handle).toBe(h);
    expect(seen.map((x) => `${x.method} ${x.path}`)).toEqual([
      'POST /auth/signup', 'GET /auth/me', 'POST /auth/resend-verification', 'POST /auth/verify',
      'GET /auth/me', 'POST /auth/logout', 'GET /auth/me', 'POST /auth/login', 'GET /auth/me',
    ]);
    for (const x of seen) expect(x.credentials).toBe('include');
  });
});

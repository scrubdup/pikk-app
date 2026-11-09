import { describe, it, expect, vi, afterEach } from 'vitest';
import { env } from 'cloudflare:test';
import worker from '../src/index.js';
import { login, resetPassword, resendVerification } from '../src/auth.js';
import { call, newUser, freshIp, ORIGIN } from './helpers.js';
import { sha256Hex } from '../src/crypto.js';

afterEach(() => vi.unstubAllGlobals());
const log = (k, v) => console.log('SECREVIEW2', k, JSON.stringify(v));
const PROD = (x = {}) => ({ ...env, EXPOSE_VERIFY_TOKEN: 'false', RESEND_API_KEY: 're_test', EMAIL_FROM: 'PIKK <x@example.com>', ...x });
async function raw(e, path, body, { cookie } = {}) {
  const bg = []; const h = { 'Content-Type': 'application/json', Origin: ORIGIN, 'CF-Connecting-IP': freshIp() };
  if (cookie) h.Cookie = cookie;
  const t0 = Date.now();
  const res = await worker.fetch(new Request('https://api.test' + path, { method: 'POST', headers: h, body: JSON.stringify(body) }), e, { waitUntil: (p) => bg.push(p) });
  const ms = Date.now() - t0; const txt = await res.text();
  await Promise.allSettled(bg);
  return { status: res.status, text: txt, ms, cookie: (res.headers.get('Set-Cookie') || '').split(';')[0] };
}
const live = async (uid) => (await env.DB.prepare('SELECT COUNT(*) n FROM password_reset_tokens WHERE user_id=? AND used_at IS NULL').bind(uid).first()).n;
function gateDB(db, re, onHit) {
  return new Proxy(db, { get(t, k) {
    if (k !== 'prepare') { const v = t[k]; return typeof v === 'function' ? v.bind(t) : v; }
    return (sql) => { const st = t.prepare(sql); if (!re.test(sql)) return st;
      return new Proxy(st, { get(s, kk) { if (kk !== 'bind') { const v = s[kk]; return typeof v === 'function' ? v.bind(s) : v; }
        return (...a) => { const b = s.bind(...a); return new Proxy(b, { get(bb, k3) { const v = bb[k3];
          if (k3 === 'first') return async (...x) => { const r = await bb.first(...x); await onHit(); return r; };
          return typeof v === 'function' ? v.bind(bb) : v; } }); }; } }); };
  } });
}

describe('re-review 57ace96', () => {
  it('V1 enumeration under provider states', async () => {
    const u = await newUser(); const out = {};
    const modes = {
      missing: [PROD({ RESEND_API_KEY: undefined }), null],
      http500: [PROD(), async () => new Response('{}', { status: 500 })],
      throws: [PROD(), async () => { throw new Error('down'); }],
      slow300: [PROD(), async () => { await new Promise(r => setTimeout(r, 300)); return new Response('{"id":"m"}'); }],
    };
    for (const [k, [e, f]] of Object.entries(modes)) {
      if (f) vi.stubGlobal('fetch', f);
      const kn = await raw(e, '/auth/forgot-password', { email: u.email });
      const un = await raw(e, '/auth/forgot-password', { email: `ghost-${k}-${Date.now()}@example.com` });
      out[k] = { equal: kn.status === un.status && kn.text === un.text, known: [kn.status, kn.text, kn.ms], unknownMs: un.ms };
    }
    log('V1', out);
  });

  it('V2 hung provider aborts at 5s; failed send deletes new token, keeps prior link', async () => {
    const u = await newUser();
    vi.stubGlobal('fetch', async () => new Response('{"id":"ok"}'));
    let captured = [];
    vi.stubGlobal('fetch', async (url, init) => { captured.push(init.headers['Idempotency-Key']); return new Response('{"id":"ok"}'); });
    await raw(PROD(), '/auth/forgot-password', { email: u.email });
    const before = await live(u.id);
    vi.stubGlobal('fetch', (url, init) => new Promise((_, rej) => init.signal.addEventListener('abort', () => rej(init.signal.reason))));
    const t0 = Date.now(); const r = await raw(PROD(), '/auth/forgot-password', { email: u.email }); const bgMs = Date.now() - t0;
    const after = await live(u.id);
    log('V2', { liveAfterSuccess: before, respMs: r.ms, bgSettledMs: bgMs, liveAfterHungFailure: after, idemKeyShape: captured[0]?.replace(/[0-9a-f]{64}/, '<sha256>') });
  }, 20000);

  it('V3 distinct idempotency keys: two resets and two verification resends', async () => {
    const u = await newUser({ verify: false }); const keys = [];
    vi.stubGlobal('fetch', async (url, init) => { keys.push(init.headers['Idempotency-Key']); return new Response('{"id":"x"}'); });
    await raw(PROD(), '/auth/forgot-password', { email: u.email });
    await raw(PROD(), '/auth/forgot-password', { email: u.email });
    const me = await call('GET', '/auth/me', { cookie: u.cookie, ip: freshIp() });
    const req = () => new Request('https://api.test/x', { method: 'POST', headers: { 'CF-Connecting-IP': freshIp() } });
    await resendVerification(PROD(), req(), { user: me.json.user });
    await resendVerification(PROD(), req(), { user: me.json.user });
    log('V3', { count: keys.length, distinct: new Set(keys).size, liveTokens: await live(u.id) });
  });

  it('V4 missing table: forgot generic, reset 400', async () => {
    const u = await newUser();
    await env.DB.prepare('ALTER TABLE password_reset_tokens RENAME TO prt_hidden').run();
    try {
      vi.stubGlobal('fetch', async () => new Response('{"id":"x"}'));
      const kn = await raw(PROD(), '/auth/forgot-password', { email: u.email });
      const un = await raw(PROD(), '/auth/forgot-password', { email: 'ghost-mt@example.com' });
      const rs = await raw(PROD(), '/auth/reset-password', { token: 'a'.repeat(43), password: 'missing tbl 123' });
      log('V4', { known: [kn.status, kn.text], equal: kn.text === un.text, reset: [rs.status, rs.text] });
    } finally { await env.DB.prepare('ALTER TABLE prt_hidden RENAME TO password_reset_tokens').run(); }
  });

  it('V5 forced interleave double consume', async () => {
    const u = await newUser();
    const f = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    const token = f.json.recovery.token;
    let n = 0, rel; const gate = new Promise(r => (rel = r));
    const e = { ...env, DB: gateDB(env.DB, /UPDATE password_reset_tokens SET used_at = \?1/, async () => { if (++n >= 2) rel(); await gate; }) };
    const req = () => new Request('https://api.test/x', { method: 'POST', headers: { 'CF-Connecting-IP': freshIp() } });
    const rs = await Promise.allSettled([resetPassword(e, req(), { token, password: 'interleave pass A1' }), resetPassword(e, req(), { token, password: 'interleave pass B2' })]);
    log('V5', { results: rs.map(r => r.status === 'fulfilled' ? r.value.status : r.reason?.status) });
  });

  it('V6 login with OLD password straddling reset commit', async () => {
    const u = await newUser();
    const f = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    let rel; const gate = new Promise(r => (rel = r)); let hit;
    const hitP = new Promise(r => (hit = r));
    const e = { ...env, DB: gateDB(env.DB, /FROM credentials c JOIN users u/, async () => { hit(); await gate; }) };
    const req = (b) => new Request('https://api.test/auth/login', { method: 'POST', headers: { 'CF-Connecting-IP': freshIp() } });
    const loginP = login(e, req(), { email: u.email, password: u.password });
    await hitP; // login has read old credentials
    const rr = await resetPassword(env, req(), { token: f.json.recovery.token, password: 'fresh reset pass 9' });
    rel();
    const lg = await loginP.then(r => r, err => ({ status: err.status }));
    let me = null;
    if (lg.cookie) me = (await call('GET', '/auth/me', { cookie: lg.cookie.split(';')[0], ip: freshIp() })).status;
    log('V6', { reset: rr.status, oldPwLogin: lg.status, meWithOldPwSessionAfterReset: me });
    expect(rr.status).toBe(200);
    expect(lg.status).toBe(401);
    expect(me).toBeNull();
  });

  it('V6b unforced parallel login/reset (20 tries)', async () => {
    let survived = 0;
    for (let i = 0; i < 20; i++) {
      const u = await newUser();
      const f = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
      const [lg, rs] = await Promise.all([
        call('POST', '/auth/login', { body: { email: u.email, password: u.password }, ip: freshIp() }),
        call('POST', '/auth/reset-password', { body: { token: f.json.recovery.token, password: 'race pass 1234' }, ip: freshIp() })]);
      if (lg.status === 200 && rs.status === 200 && (await call('GET', '/auth/me', { cookie: lg.cookie, ip: freshIp() })).status === 200) survived++;
    }
    log('V6b', { survived });
  });

  it('V7 claim ok but batch fails', async () => {
    const u = await newUser();
    const f = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    const e = { ...env, DB: new Proxy(env.DB, { get(t, k) { if (k === 'batch') return async () => { throw new Error('D1 batch failure'); }; const v = t[k]; return typeof v === 'function' ? v.bind(t) : v; } }) };
    const r = await raw(e, '/auth/reset-password', { token: f.json.recovery.token, password: 'batch fail pass 1' });
    const oldSess = (await call('GET', '/auth/me', { cookie: u.cookie, ip: freshIp() })).status;
    const oldPw = (await call('POST', '/auth/login', { body: { email: u.email, password: u.password }, ip: freshIp() })).status;
    const retry = (await call('POST', '/auth/reset-password', { body: { token: f.json.recovery.token, password: 'batch fail pass 2' }, ip: freshIp() })).status;
    log('V7', { status: r.status, body: r.text.slice(0, 80), oldSessionStillValid: oldSess, oldPasswordStillWorks: oldPw, tokenRetry: retry });
  });

  it('V8 two concurrent successful requests', async () => {
    const u = await newUser();
    const fs = await Promise.all([1, 2].map(() => call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() })));
    const usable = [];
    for (const f of fs) usable.push(!!(await env.DB.prepare('SELECT 1 FROM password_reset_tokens WHERE token_hash=? AND used_at IS NULL').bind(await sha256Hex(f.json.recovery.token)).first()));
    log('V8', { tokensReturned: fs.map(f => !!f.json?.recovery?.token), usable });
  });

  it('V9 exposure flag and banned', async () => {
    const u = await newUser();
    const kn = await raw({ ...env, EXPOSE_VERIFY_TOKEN: 'true' }, '/auth/forgot-password', { email: u.email });
    const un = await raw({ ...env, EXPOSE_VERIFY_TOKEN: 'true' }, '/auth/forgot-password', { email: 'ghost-x@example.com' });
    const variants = {};
    for (const v of ['TRUE', '1', 'yes', ' true']) { vi.stubGlobal('fetch', async () => new Response('{"id":"x"}')); variants[v] = (await raw(PROD({ EXPOSE_VERIFY_TOKEN: v }), '/auth/forgot-password', { email: u.email })).text.includes('token'); }
    const f = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    await env.DB.prepare('UPDATE users SET banned_at=? WHERE id=?').bind(new Date().toISOString(), u.id).run();
    const br = await call('POST', '/auth/reset-password', { body: { token: f.json.recovery.token, password: 'banned pass 123' }, ip: freshIp() });
    log('V9', { exposeTrueKnownHasToken: kn.text.includes('token'), exposeTrueUnknownHasToken: un.text.includes('token'), nonExactTrueLeaks: variants, bannedReset: br.status });
  });
});

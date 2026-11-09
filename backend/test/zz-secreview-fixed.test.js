import { describe, it, expect, vi, afterEach } from 'vitest';
import { env } from 'cloudflare:test';
import worker from '../src/index.js';
import { call, newUser, freshIp, ORIGIN } from './helpers.js';
import { resetPassword } from '../src/auth.js';

afterEach(() => vi.unstubAllGlobals());

const waitUntilJobs = [];
const raw = async (e, path, body, ip = freshIp(), cookie) => {
  const h = { 'Content-Type': 'application/json', Origin: ORIGIN, 'CF-Connecting-IP': ip };
  if (cookie) h.Cookie = cookie;
  waitUntilJobs.length = 0;
  const res = await worker.fetch(
    new Request('https://api.test' + path, { method: 'POST', headers: h, body: JSON.stringify(body) }),
    e,
    { waitUntil(p) { waitUntilJobs.push(Promise.resolve(p)); } },
  );
  await Promise.all(waitUntilJobs);
  const t = await res.text();
  return { status: res.status, json: t ? JSON.parse(t) : null, cookie: (res.headers.get('Set-Cookie') || '').split(';')[0] };
};

describe('password recovery security fixes (secreview B1–B5)', () => {
  it('A1: known and unknown bodies are deep-equal under prod-like env (no provider)', async () => {
    const u = await newUser();
    const prod = { ...env, EXPOSE_VERIFY_TOKEN: 'false', RESEND_API_KEY: undefined, EMAIL_FROM: undefined };
    const unk = await raw(prod, '/auth/forgot-password', { email: 'ghost-' + Date.now() + '@example.com' });
    const kn = await raw(prod, '/auth/forgot-password', { email: u.email });
    expect(kn.status).toBe(200);
    expect(unk.status).toBe(200);
    expect(kn.json).toEqual(unk.json);
    expect(kn.json).toEqual({ ok: true, message: expect.stringMatching(/if an account exists/i) });
    expect(kn.json.recovery).toBeUndefined();
  });

  it('A2: provider 500/throw still returns generic 200; no unused token left; prior link kept', async () => {
    const u = await newUser();
    // Seed a prior working token under expose mode
    const seed = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    const priorToken = seed.json.recovery.token;
    const priorHashRow = await env.DB.prepare('SELECT COUNT(*) n FROM password_reset_tokens WHERE user_id=? AND used_at IS NULL').bind(u.id).first();
    expect(priorHashRow.n).toBe(1);

    const prod = { ...env, EXPOSE_VERIFY_TOKEN: 'false', RESEND_API_KEY: 're_test', EMAIL_FROM: 'PIKK <x@example.com>' };
    vi.stubGlobal('fetch', async () => new Response('{}', { status: 500 }));
    const fail500 = await raw(prod, '/auth/forgot-password', { email: u.email });
    vi.stubGlobal('fetch', async () => { throw new Error('network down'); });
    const thrown = await raw(prod, '/auth/forgot-password', { email: u.email });
    const unk = await raw(prod, '/auth/forgot-password', { email: 'ghost2-' + Date.now() + '@example.com' });

    expect(fail500.status).toBe(200);
    expect(thrown.status).toBe(200);
    expect(unk.status).toBe(200);
    expect(fail500.json).toEqual(unk.json);
    expect(thrown.json).toEqual(unk.json);

    const pending = await env.DB.prepare('SELECT COUNT(*) n FROM password_reset_tokens WHERE user_id=? AND used_at IS NULL').bind(u.id).first();
    // Prior seed token remains; failed sends did not leave extra undeliverable tokens
    expect(pending.n).toBe(1);

    // Prior link still works
    const still = await call('POST', '/auth/reset-password', { body: { token: priorToken, password: 'kept prior 99' }, ip: freshIp() });
    expect(still.status).toBe(200);
  });

  it('A3: response timing does not await provider (waitUntil)', async () => {
    const u = await newUser();
    const prod = { ...env, EXPOSE_VERIFY_TOKEN: 'false', RESEND_API_KEY: 're_test', EMAIL_FROM: 'PIKK <x@example.com>' };
    let resolveFetch;
    const fetchGate = new Promise((r) => { resolveFetch = r; });
    vi.stubGlobal('fetch', async () => {
      await fetchGate;
      return new Response('{"id":"m1"}', { status: 200 });
    });
    const h = { 'Content-Type': 'application/json', Origin: ORIGIN, 'CF-Connecting-IP': freshIp() };
    const jobs = [];
    const t0 = Date.now();
    const res = await worker.fetch(
      new Request('https://api.test/auth/forgot-password', { method: 'POST', headers: h, body: JSON.stringify({ email: u.email }) }),
      prod,
      { waitUntil(p) { jobs.push(Promise.resolve(p)); } },
    );
    const elapsed = Date.now() - t0;
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.recovery).toBeUndefined();
    expect(elapsed).toBeLessThan(200); // must not wait for 300ms+ provider
    resolveFetch();
    await Promise.all(jobs);
  });

  it('A4/R1: forced interleave claim — exactly one reset succeeds', async () => {
    const u = await newUser();
    const f = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    const token = f.json.recovery.token;

    // Barrier on the atomic claim UPDATE…RETURNING (not a SELECT)
    function barrierDB(db, parties) {
      let waiting = 0; let release; const gate = new Promise((r) => { release = r; });
      return new Proxy(db, {
        get(t, k) {
          if (k !== 'prepare') {
            const v = t[k];
            return typeof v === 'function' ? v.bind(t) : v;
          }
          return (sql) => {
            const st = t.prepare(sql);
            if (!/UPDATE password_reset_tokens SET used_at/.test(sql) || !/RETURNING user_id/.test(sql)) return st;
            return {
              bind: (...a) => {
                const b = st.bind(...a);
                return {
                  first: async () => {
                    if (++waiting >= parties) release();
                    await gate;
                    return b.first();
                  },
                };
              },
            };
          };
        },
      });
    }

    const e = { ...env, DB: barrierDB(env.DB, 2) };
    const req = () => new Request('https://api.test/auth/reset-password', { method: 'POST', headers: { 'CF-Connecting-IP': freshIp() } });
    const rs = await Promise.allSettled([
      resetPassword(e, req(), { token, password: 'interleave pass A1' }),
      resetPassword(e, req(), { token, password: 'interleave pass B2' }),
    ]);
    const statuses = rs.map((r) => (r.status === 'fulfilled' ? r.value.status : (r.reason?.status || 500)));
    const okCount = statuses.filter((s) => s === 200).length;
    const failCount = statuses.filter((s) => s === 400).length;
    expect(okCount).toBe(1);
    expect(failCount).toBe(1);

    const loginA = await call('POST', '/auth/login', { body: { email: u.email, password: 'interleave pass A1' }, ip: freshIp() });
    const loginB = await call('POST', '/auth/login', { body: { email: u.email, password: 'interleave pass B2' }, ip: freshIp() });
    const winners = [loginA.status, loginB.status].filter((s) => s === 200).length;
    expect(winners).toBe(1);

    const audits = await env.DB.prepare(
      "SELECT COUNT(*) n FROM audit_log WHERE action='auth.password_reset_completed' AND target=?"
    ).bind(u.id).first();
    expect(audits.n).toBe(1);
  });

  it('A8: missing migration table returns generic 200 for known and unknown', async () => {
    const u = await newUser();
    const prod = { ...env, EXPOSE_VERIFY_TOKEN: 'false', RESEND_API_KEY: undefined, EMAIL_FROM: undefined };
    await env.DB.prepare('ALTER TABLE password_reset_tokens RENAME TO prt_hidden').run();
    try {
      const kn = await raw(prod, '/auth/forgot-password', { email: u.email });
      const un = await raw(prod, '/auth/forgot-password', { email: 'ghost4-' + Date.now() + '@example.com' });
      expect(kn.status).toBe(200);
      expect(un.status).toBe(200);
      expect(kn.json).toEqual(un.json);
      expect(kn.json.recovery).toBeUndefined();
    } finally {
      await env.DB.prepare('ALTER TABLE prt_hidden RENAME TO password_reset_tokens').run();
    }
  });

  it('A9: reset refused for banned/disabled; token not in audit', async () => {
    const u = await newUser();
    const f = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    const token = f.json.recovery.token;
    await env.DB.prepare('UPDATE users SET banned_at=? WHERE id=?').bind(new Date().toISOString(), u.id).run();
    const r = await call('POST', '/auth/reset-password', { body: { token, password: 'banned pass 123' }, ip: freshIp() });
    expect(r.status).toBe(400);
    expect(r.json.error.code).toBe('invalid_token');
    const auditRows = await env.DB.prepare("SELECT * FROM audit_log WHERE action LIKE 'auth.password_reset%'").all();
    expect(JSON.stringify(auditRows.results)).not.toContain(token);
  });

  it('idempotency keys differ across consecutive reset emails for same user', async () => {
    const u = await newUser();
    const keys = [];
    const prod = { ...env, EXPOSE_VERIFY_TOKEN: 'false', RESEND_API_KEY: 're_test', EMAIL_FROM: 'PIKK <x@example.com>' };
    vi.stubGlobal('fetch', async (_url, init) => {
      keys.push(init.headers['Idempotency-Key']);
      return new Response('{"id":"ok"}', { status: 200 });
    });
    await raw(prod, '/auth/forgot-password', { email: u.email });
    await raw(prod, '/auth/forgot-password', { email: u.email });
    expect(keys.length).toBe(2);
    expect(keys[0]).not.toBe(keys[1]);
    expect(keys[0]).toMatch(/^pikk-pwreset\//);
  });

  it('requested_ip is hashed, not raw', async () => {
    const u = await newUser();
    const ip = '203.0.113.50';
    await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip });
    const row = await env.DB.prepare(
      'SELECT requested_ip FROM password_reset_tokens WHERE user_id=? ORDER BY created_at DESC LIMIT 1'
    ).bind(u.id).first();
    expect(row.requested_ip).toBeTruthy();
    expect(row.requested_ip).not.toBe(ip);
    expect(row.requested_ip).toMatch(/^[a-f0-9]{64}$/);
  });
});

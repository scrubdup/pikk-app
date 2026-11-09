import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { login, resetPassword } from '../src/auth.js';
import { call, newUser, freshIp } from './helpers.js';

/** Hold after a matching prepare().first() so callers can interleave. */
function gateDB(db, re, onHit) {
  return new Proxy(db, {
    get(t, k) {
      if (k !== 'prepare') {
        const v = t[k];
        return typeof v === 'function' ? v.bind(t) : v;
      }
      return (sql) => {
        const st = t.prepare(sql);
        if (!re.test(sql)) return st;
        return new Proxy(st, {
          get(s, kk) {
            if (kk !== 'bind') {
              const v = s[kk];
              return typeof v === 'function' ? v.bind(s) : v;
            }
            return (...a) => {
              const b = s.bind(...a);
              return new Proxy(b, {
                get(bb, k3) {
                  const v = bb[k3];
                  if (k3 === 'first') {
                    return async (...x) => {
                      const r = await bb.first(...x);
                      await onHit();
                      return r;
                    };
                  }
                  return typeof v === 'function' ? v.bind(bb) : v;
                },
              });
            };
          },
        });
      };
    },
  });
}

describe('login-vs-reset race (secreview V6 fix)', () => {
  it('old-password login paused after credentials read cannot mint a live session after reset', async () => {
    const u = await newUser();
    const f = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    let release;
    const gate = new Promise((r) => { release = r; });
    let hitDone;
    const hitP = new Promise((r) => { hitDone = r; });

    const e = {
      ...env,
      DB: gateDB(env.DB, /FROM credentials c JOIN users u/, async () => {
        hitDone();
        await gate;
      }),
    };
    const req = () => new Request('https://api.test/auth/login', {
      method: 'POST',
      headers: { 'CF-Connecting-IP': freshIp() },
    });

    const loginP = login(e, req(), { email: u.email, password: u.password });
    await hitP; // login has read the pre-reset password_hash
    const rr = await resetPassword(env, req(), {
      token: f.json.recovery.token,
      password: 'fresh reset pass 9',
    });
    expect(rr.status).toBe(200);
    release();
    const lg = await loginP.then((r) => r, (err) => ({ status: err.status, cookie: null }));
    expect(lg.status).toBe(401);

    if (lg.cookie) {
      const me = await call('GET', '/auth/me', { cookie: String(lg.cookie).split(';')[0], ip: freshIp() });
      expect(me.status).toBe(401);
    }

    // New password works; old password does not.
    const oldPw = await call('POST', '/auth/login', { body: { email: u.email, password: u.password }, ip: freshIp() });
    expect(oldPw.status).toBe(401);
    const newPw = await call('POST', '/auth/login', { body: { email: u.email, password: 'fresh reset pass 9' }, ip: freshIp() });
    expect(newPw.status).toBe(200);
    const meNew = await call('GET', '/auth/me', { cookie: newPw.cookie, ip: freshIp() });
    expect(meNew.status).toBe(200);
  });

  it('ordinary login still issues a session when the password is unchanged', async () => {
    const u = await newUser();
    const lg = await call('POST', '/auth/login', { body: { email: u.email, password: u.password }, ip: freshIp() });
    expect(lg.status).toBe(200);
    expect(lg.cookie).toMatch(/__Host-pikk_session=/);
    const me = await call('GET', '/auth/me', { cookie: lg.cookie, ip: freshIp() });
    expect(me.status).toBe(200);
    expect(me.json.user.handle).toBe(u.handle);
  });

  it('verify-email still works and does not break the signup session', async () => {
    const u = await newUser({ verify: false });
    expect(u.cookie).toBeTruthy();
    const me1 = await call('GET', '/auth/me', { cookie: u.cookie, ip: freshIp() });
    expect(me1.status).toBe(200);
    expect(me1.json.user.email_verified).toBe(false);

    // newUser without verify leaves verification token in signup response — fetch from DB via resend expose path
    const signup = await call('POST', '/auth/signup', {
      body: {
        email: `vemail_${Date.now()}@example.com`,
        password: 'verify email 42',
        handle: `vh_${Date.now().toString(36).slice(-6)}`,
        display_name: 'Verify Me',
        gender: 'undisclosed',
      },
      ip: freshIp(),
    });
    expect(signup.status).toBe(201);
    expect(signup.json.verification.token).toBeTruthy();
    const v = await call('POST', '/auth/verify', {
      body: { token: signup.json.verification.token },
      ip: freshIp(),
    });
    expect(v.status).toBe(200);
    const me2 = await call('GET', '/auth/me', { cookie: signup.cookie, ip: freshIp() });
    expect(me2.status).toBe(200);
    expect(me2.json.user.email_verified).toBe(true);

    // Login still works after verify (password unchanged; updated_at bumped)
    const lg = await call('POST', '/auth/login', {
      body: { email: signup.json.user.email, password: 'verify email 42' },
      ip: freshIp(),
    });
    expect(lg.status).toBe(200);
  });

  it('session inserted before reset is revoked by the reset batch', async () => {
    const u = await newUser();
    const lg = await call('POST', '/auth/login', { body: { email: u.email, password: u.password }, ip: freshIp() });
    expect(lg.status).toBe(200);
    const f = await call('POST', '/auth/forgot-password', { body: { email: u.email }, ip: freshIp() });
    const rs = await call('POST', '/auth/reset-password', {
      body: { token: f.json.recovery.token, password: 'after revoke 99' },
      ip: freshIp(),
    });
    expect(rs.status).toBe(200);
    const me = await call('GET', '/auth/me', { cookie: lg.cookie, ip: freshIp() });
    expect(me.status).toBe(401);
  });
});

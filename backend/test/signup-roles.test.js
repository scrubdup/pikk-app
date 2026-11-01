import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { call, freshIp, newUser } from './helpers.js';

const base = (h) => ({ email: `${h}@example.com`, password: 'password 1234', handle: h, display_name: h });

describe('signup roles (aligned to PR #110)', () => {
  it('accepts the nine approved roles, always keeps member, and grants no permissions', async () => {
    const r = await call('POST', '/auth/signup', { body: { ...base('multi_role'), signup_roles: ['artist', 'streamer', 'seller'] }, ip: freshIp() });
    expect(r.status).toBe(201);
    expect(r.json.signup_roles.sort()).toEqual(['artist', 'member', 'seller', 'streamer']);
    const me = await call('GET', '/auth/me', { cookie: r.cookie });
    expect(me.json.roles).toEqual(['user']); // declarations are not permissions
    expect(me.json.signup_roles.every(x => x.status === 'declared')).toBe(true);
    expect((await call('GET', '/admin/audit', { cookie: r.cookie })).status).toBe(403);
  });

  it('rejects unknown or staff roles in signup_roles', async () => {
    for (const bad of [['admin'], ['moderator'], ['dmca'], 'artist', ['artist', 'nope']]) {
      const r = await call('POST', '/auth/signup', { body: { ...base(`bad_${Math.random().toString(36).slice(2, 8)}`), signup_roles: bad }, ip: freshIp() });
      expect(r.status).toBe(422);
    }
  });

  it('ignores forged privilege fields at signup (cf. PR #29 forged-flag guard)', async () => {
    const r = await call('POST', '/auth/signup', { body: { ...base('forger_1'), roles: ['admin'], role: 'admin', email_verified: true, verifiedByServer: true, age_verified_18: 1 }, ip: freshIp() });
    expect(r.status).toBe(201);
    const me = await call('GET', '/auth/me', { cookie: r.cookie });
    expect(me.json.roles).toEqual(['user']);
    expect(me.json.user.email_verified).toBe(false);
    expect(me.json.user.age_verified_18).toBe(false);
  });

  it('roles can be changed later, member is permanent, changes audited', async () => {
    const u = await newUser();
    const r = await call('POST', '/account/signup-roles', { cookie: u.cookie, body: { signup_roles: ['producer', 'clipper'] } });
    expect(r.status).toBe(200); expect(r.json.signup_roles.sort()).toEqual(['clipper', 'member', 'producer']);
    const r2 = await call('POST', '/account/signup-roles', { cookie: u.cookie, body: { signup_roles: [] } });
    expect(r2.json.signup_roles).toEqual(['member']);
    await expect(env.DB.prepare(`DELETE FROM user_signup_roles WHERE user_id = ? AND role = 'member'`).bind(u.id).run()).rejects.toThrow(/member_role_is_permanent/);
    expect((await call('POST', '/account/signup-roles', { body: { signup_roles: [] } })).status).toBe(401);
    const a = await env.DB.prepare(`SELECT COUNT(*) c FROM audit_log WHERE action = 'account.signup_roles' AND actor_id = ?`).bind(u.id).first();
    expect(a.c).toBe(2);
  });
});

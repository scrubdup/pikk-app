import { describe, it, expect } from 'vitest';
import { call, newUser, makeAdmin } from './helpers.js';

describe('permissions', () => {
  it('unverified users cannot post; verified can', async () => {
    const u = await newUser({ verify: false });
    const r = await call('POST', '/posts', { cookie: u.cookie, body: { body: 'hi' } });
    expect(r.status).toBe(403); expect(r.json.error.code).toBe('email_unverified');
    const v = await newUser();
    const ok = await call('POST', '/posts', { cookie: v.cookie, body: { body: 'hello PIKK' } });
    expect(ok.status).toBe(201); expect(ok.json.post.author).toBe(v.handle);
    expect((await call('POST', '/posts', { body: { body: 'anon' } })).status).toBe(401);
  });

  it('admin routes require a DB-loaded admin role', async () => {
    const member = await newUser(); const other = await newUser();
    const denied = await call('POST', '/admin/roles', { cookie: member.cookie, body: { handle: other.handle, role: 'admin' } });
    expect(denied.status).toBe(403); expect(denied.json.error.code).toBe('forbidden');
    expect((await call('GET', '/admin/audit', { cookie: member.cookie })).status).toBe(403);
    await makeAdmin(member.id); // role change in DB takes effect on next request (no client trust)
    const granted = await call('POST', '/admin/roles', { cookie: member.cookie, body: { handle: other.handle, role: 'moderator' } });
    expect(granted.status).toBe(200);
    const me = await call('GET', '/auth/me', { cookie: other.cookie });
    expect(me.json.roles).toEqual(['member', 'moderator']);
    const audit = await call('GET', '/admin/audit', { cookie: other.cookie });
    expect(audit.status).toBe(200);
    expect(audit.json.entries.some(e => e.action === 'admin.grant_role' && e.target === other.id)).toBe(true);
  });

  it('blocks prevent follows in both directions', async () => {
    const a = await newUser(); const b = await newUser();
    expect((await call('POST', '/follows', { cookie: a.cookie, body: { handle: b.handle } })).status).toBe(200);
    expect((await call('POST', '/blocks', { cookie: b.cookie, body: { handle: a.handle } })).status).toBe(200);
    const f = await call('POST', '/follows', { cookie: a.cookie, body: { handle: b.handle } });
    expect(f.status).toBe(403); expect(f.json.error.code).toBe('blocked');
    expect((await call('POST', '/follows', { cookie: b.cookie, body: { handle: a.handle } })).status).toBe(403);
  });
});

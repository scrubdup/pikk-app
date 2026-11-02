import { describe, it, expect } from 'vitest';
import { call, newUser, staff, freshIp } from './helpers.js';

describe('creator role review', () => {
  it('lets admin list declared creator roles and approve them with a reason', async () => {
    const creator = await newUser();
    const admin = await staff('admin');

    const declared = await call('POST', '/account/signup-roles', {
      cookie: creator.cookie,
      ip: freshIp(),
      body: { signup_roles: ['artist'] },
    });
    expect(declared.status).toBe(200);

    const list = await call('GET', '/admin/signup-roles', {
      cookie: admin.cookie,
      ip: freshIp(),
    });
    expect(list.status).toBe(200);
    const row = list.json.roles.find(r => r.handle === creator.handle && r.role === 'artist');
    expect(row).toBeTruthy();
    expect(row.status).toBe('declared');

    const reviewed = await call('POST', '/admin/signup-roles/review', {
      cookie: admin.cookie,
      ip: freshIp(),
      body: { handle: creator.handle, role: 'artist', status: 'approved', reason: 'Rights and account review completed.' },
    });
    expect(reviewed.status).toBe(200);
    expect(reviewed.json.role).toEqual({ handle: creator.handle, role: 'artist', status: 'approved' });

    const filtered = await call('GET', '/admin/signup-roles?status=approved', {
      cookie: admin.cookie,
      ip: freshIp(),
    });
    expect(filtered.status).toBe(200);
    expect(filtered.json.roles.some(r => r.handle === creator.handle && r.role === 'artist' && r.status === 'approved')).toBe(true);
  });

  it('does not allow non-admin accounts to review creator roles', async () => {
    const creator = await newUser();
    const normal = await newUser();
    await call('POST', '/account/signup-roles', {
      cookie: creator.cookie, ip: freshIp(), body: { signup_roles: ['creator'] },
    });

    expect((await call('GET', '/admin/signup-roles', { cookie: normal.cookie, ip: freshIp() })).status).toBe(403);
    expect((await call('POST', '/admin/signup-roles/review', {
      cookie: normal.cookie,
      ip: freshIp(),
      body: { handle: creator.handle, role: 'creator', status: 'approved', reason: 'Should not work.' },
    })).status).toBe(403);
  });

  it('requires an existing declaration, valid status and review reason', async () => {
    const creator = await newUser();
    const admin = await staff('admin');

    const missing = await call('POST', '/admin/signup-roles/review', {
      cookie: admin.cookie, ip: freshIp(),
      body: { handle: creator.handle, role: 'artist', status: 'approved', reason: 'No declaration exists.' },
    });
    expect(missing.status).toBe(404);

    await call('POST', '/account/signup-roles', {
      cookie: creator.cookie, ip: freshIp(), body: { signup_roles: ['artist'] },
    });

    const invalid = await call('POST', '/admin/signup-roles/review', {
      cookie: admin.cookie, ip: freshIp(),
      body: { handle: creator.handle, role: 'artist', status: 'magic', reason: 'Invalid state.' },
    });
    expect(invalid.status).toBe(422);

    const shortReason = await call('POST', '/admin/signup-roles/review', {
      cookie: admin.cookie, ip: freshIp(),
      body: { handle: creator.handle, role: 'artist', status: 'rejected', reason: 'no' },
    });
    expect(shortReason.status).toBe(422);
  });
});

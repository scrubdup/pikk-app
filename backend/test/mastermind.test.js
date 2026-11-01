import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { call, newUser, makeAdmin, staff, grantRole } from './helpers.js';
import opsSource from '../src/ops.js?raw';

const TOKEN = 'owner_bootstrap_local_test_only_not_a_real_secret_0123456789';
const STATUSES = ['healthy', 'degraded', 'down', 'stale', 'unknown', 'demo'];
const counts = async () => {
  const tables = ['audit_log', 'user_roles', 'reports', 'appeals', 'takedowns', 'tickets', 'users', 'posts'];
  const out = {};
  for (const t of tables) out[t] = (await env.DB.prepare(`SELECT COUNT(*) AS n FROM ${t}`).first()).n;
  return out;
};
async function owner() { const u = await newUser(); await env.DB.prepare(`DELETE FROM user_roles WHERE role='owner'`).run(); await grantRole(u.id, 'owner'); return u; }

describe('PIKK Master Mind: GET /admin/ops/summary', () => {
  it('owner gets 200 with every panel in the expected shape', async () => {
    const o = await owner();
    const r = await call('GET', '/admin/ops/summary', { cookie: o.cookie });
    expect(r.status).toBe(200);
    expect(r.json.readOnly).toBe(true);
    const names = ['api', 'database', 'shield', 'support', 'audit', 'ledger', 'vault', 'live', 'broadcast', 'costs', 'backups'];
    expect(Object.keys(r.json.panels).sort()).toEqual([...names].sort());
    for (const n of names) {
      const p = r.json.panels[n];
      expect(STATUSES).toContain(p.status);
      for (const k of ['checkedAt', 'source', 'freshnessLimitSec', 'detail']) expect(p).toHaveProperty(k);
    }
    expect(r.json.panels.database.status).toBe('healthy');
    expect(typeof r.json.panels.shield.detail.openReports).toBe('number');
    expect(typeof r.json.panels.support.detail.openTickets).toBe('number');
    expect(r.json.panels.ledger.status).toBe('demo');
    expect(r.json.panels.ledger.detail.reason).toMatch(/Stripe is stubbed/);
  });

  it('unknown panels really say unknown and never claim healthy', async () => {
    const o = await owner();
    const { panels } = (await call('GET', '/admin/ops/summary', { cookie: o.cookie })).json;
    for (const n of ['vault', 'live', 'broadcast', 'costs', 'backups']) {
      expect(panels[n].status).toBe('unknown'); expect(panels[n].checkedAt).toBeNull();
    }
    expect(panels.vault.detail.reason).toMatch(/Vault health isn't available/);
  });

  it('admin, moderator, support_agent, dmca, user get 403; anonymous gets 401', async () => {
    const admin = await newUser(); await makeAdmin(admin.id);
    for (const u of [admin, await staff('moderator'), await staff('support_agent'), await staff('dmca'), await newUser()]) {
      const r = await call('GET', '/admin/ops/summary', { cookie: u.cookie });
      expect(r.status).toBe(403); expect(r.json.error.code).toBe('forbidden');
    }
    expect((await call('GET', '/admin/ops/summary')).status).toBe(401);
  });

  it('is read-only (no row changes) and returns no PII', async () => {
    const o = await owner();
    await call('POST', '/follows', { cookie: o.cookie, body: { handle: (await newUser()).handle } });
    const before = await counts();
    const r = await call('GET', '/admin/ops/summary', { cookie: o.cookie });
    expect(await counts()).toEqual(before);
    const body = JSON.stringify(r.json);
    expect(body).not.toContain('@example.com');
    expect(body).not.toContain(o.handle);
    expect(body).not.toContain(o.id);
    expect(body).not.toMatch(/"(email|display_name|actor_id|target|ip|meta)"/);
    for (const e of r.json.panels.audit.detail.recent) expect(Object.keys(e).sort()).toEqual(['action', 'at']);
    // Static guard: the endpoint source issues no writes.
    expect(opsSource).not.toMatch(/\b(INSERT|UPDATE|DELETE|REPLACE|CREATE|DROP|ALTER)\b/i);
  });
});

describe('owner role protection', () => {
  it('owner inherits admin permissions', async () => {
    const o = await owner();
    expect((await call('GET', '/admin/audit', { cookie: o.cookie })).status).toBe(200);
  });

  it('admin cannot grant or revoke owner; admin cannot change an owner\'s roles', async () => {
    const o = await owner(); const admin = await newUser(); await makeAdmin(admin.id); const x = await newUser();
    const g = await call('POST', '/admin/roles', { cookie: admin.cookie, body: { handle: x.handle, role: 'owner', reason: 'promote' } });
    expect(g.status).toBe(403);
    const rv = await call('DELETE', '/admin/roles', { cookie: admin.cookie, body: { handle: o.handle, role: 'owner', reason: 'demote' } });
    expect(rv.status).toBe(403);
    const other = await call('POST', '/admin/roles', { cookie: admin.cookie, body: { handle: o.handle, role: 'moderator', reason: 'touch owner' } });
    expect(other.status).toBe(403);
    const self = await call('POST', '/admin/roles', { cookie: o.cookie, body: { handle: x.handle, role: 'owner', reason: 'second owner' } });
    expect(self.status).toBe(403); // even owner cannot hand out owner via the API
    expect((await env.DB.prepare(`SELECT COUNT(*) AS n FROM user_roles WHERE role='owner'`).first()).n).toBe(1);
  });

  it('moderators (and admins) cannot moderate the owner', async () => {
    const o = await owner(); const mod = await staff('moderator'); const admin = await newUser(); await makeAdmin(admin.id);
    for (const actor of [mod, admin]) {
      const r = await call('POST', '/moderation/actions', { cookie: actor.cookie, body: { action: 'mute', target_handle: o.handle, reason: 'testing' } });
      expect(r.status).toBe(403);
    }
  });
});

describe('one-time owner bootstrap', () => {
  it('rejects a bad token, assigns owner once with an audit entry, then refuses', async () => {
    await env.DB.prepare(`DELETE FROM user_roles WHERE role='owner'`).run();
    const u = await newUser();
    expect((await call('POST', '/bootstrap/owner', { body: { handle: u.handle }, headers: { Authorization: 'Bearer wrong' } })).status).toBe(403);
    const ok = await call('POST', '/bootstrap/owner', { body: { handle: u.handle }, headers: { Authorization: `Bearer ${TOKEN}` } });
    expect(ok.status).toBe(200);
    const a = await env.DB.prepare(`SELECT actor_id, target FROM audit_log WHERE action='bootstrap.owner' AND target=?`).bind(u.id).first();
    expect(a).toBeTruthy(); expect(a.actor_id).toBeNull();
    expect((await call('GET', '/admin/ops/summary', { cookie: u.cookie })).status).toBe(200);
    const again = await call('POST', '/bootstrap/owner', { body: { handle: (await newUser()).handle }, headers: { Authorization: `Bearer ${TOKEN}` } });
    expect(again.status).toBe(409);
  });
});

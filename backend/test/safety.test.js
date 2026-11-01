import { describe, it, expect } from 'vitest';
import { env, SELF } from 'cloudflare:test';
import { call, newUser, staff, grantRole, post, freshIp } from './helpers.js';
import { hmacSha256Hex } from '../src/crypto.js';
import { isBlocked, assertNotBlocked } from '../src/blocks.js';
import { PERMISSIONS, can } from '../src/permissions.js';

const auditFor = async (action, target) => (await env.DB.prepare(`SELECT * FROM audit_log WHERE action = ? AND target = ?`).bind(action, target).all()).results;

describe('roles + admin.access', () => {
  it('admin.access is admin-only', async () => {
    for (const role of [null, 'moderator', 'support_agent', 'dmca', 'creator']) {
      const u = role ? await staff(role) : await newUser();
      expect((await call('GET', '/admin/audit', { cookie: u.cookie })).status).toBe(403);
    }
    expect((await call('GET', '/admin/audit', { cookie: (await staff('admin')).cookie })).status).toBe(200);
    expect((await call('GET', '/admin/audit')).status).toBe(401);
  });

  it('staff roles are granted/revoked only by admin and every change is audited', async () => {
    const mod = await staff('moderator'); const admin = await staff('admin'); const u = await newUser();
    expect((await call('POST', '/admin/roles', { cookie: mod.cookie, body: { handle: u.handle, role: 'moderator', reason: 'try' } })).status).toBe(403);
    expect((await call('POST', '/admin/roles', { cookie: admin.cookie, body: { handle: u.handle, role: 'superuser', reason: 'x y' } })).status).toBe(422);
    expect((await call('POST', '/admin/roles', { cookie: admin.cookie, body: { handle: u.handle, role: 'dmca' } })).status).toBe(422); // reason required
    for (const role of ['moderator', 'support_agent', 'admin', 'dmca']) {
      expect((await call('POST', '/admin/roles', { cookie: admin.cookie, body: { handle: u.handle, role, reason: 'staffing' } })).status).toBe(200);
    }
    expect((await call('GET', '/auth/me', { cookie: u.cookie })).json.roles).toEqual(['admin', 'dmca', 'moderator', 'support_agent', 'user']);
    const grants = await auditFor('admin.grant_role', u.id);
    expect(grants.length).toBe(4);
    expect(grants.every(g => g.actor_id === admin.id && g.created_at && JSON.parse(g.meta).reason === 'staffing')).toBe(true);
    expect((await call('DELETE', '/admin/roles', { cookie: admin.cookie, body: { handle: u.handle, role: 'admin', reason: 'offboard' } })).status).toBe(200);
    expect((await auditFor('admin.revoke_role', u.id)).length).toBe(1);
    expect((await call('GET', '/admin/audit', { cookie: u.cookie })).status).toBe(403); // revocation is immediate
  });

  it('permission map matches the Safety spec', () => {
    expect(PERMISSIONS['ban.permanent']).toEqual(['admin']);
    expect(PERMISSIONS['copyright.takedown.review'].sort()).toEqual(['admin', 'dmca']);
    expect(can({ roles: ['support_agent'] }, 'moderation.action')).toBe(false);
    expect(can(null, 'reports.create')).toBe(false);
  });
});

describe('reports', () => {
  it('reports.create: any signed-in user, deduped, rate limited, reporter hidden in queue', async () => {
    const body = { target_type: 'user', target_id: 'usr_x', category: 'harassment', details: 'mean' };
    expect((await call('POST', '/reports', { body })).status).toBe(401);
    const u = await newUser();
    const r = await call('POST', '/reports', { cookie: u.cookie, body });
    expect(r.status).toBe(201); expect(r.json.report.priority).toBe(2);
    expect((await call('POST', '/reports', { cookie: u.cookie, body })).status).toBe(409);
    expect((await call('POST', '/reports', { cookie: u.cookie, body: { ...body, category: 'nope' } })).status).toBe(422);
    let last;
    for (let i = 0; i < 10; i++) last = await call('POST', '/reports', { cookie: u.cookie, body: { ...body, target_id: `t${i}` } });
    expect(last.status).toBe(429);
    const mod = await staff('moderator');
    const q = await call('GET', '/reports', { cookie: mod.cookie });
    expect(q.status).toBe(200);
    expect(q.json.reports.length).toBeGreaterThan(0);
    expect(q.json.reports.every(x => !('reporter_id' in x))).toBe(true);
  });

  it('reports.view/resolve: moderator + admin only, audited', async () => {
    const u = await newUser();
    const id = (await call('POST', '/reports', { cookie: u.cookie, body: { target_type: 'post', target_id: 'pst_1', category: 'csam' } })).json.report.id;
    for (const role of [null, 'support_agent', 'dmca']) {
      const x = role ? await staff(role) : await newUser();
      expect((await call('GET', '/reports', { cookie: x.cookie })).status).toBe(403);
      expect((await call('POST', `/reports/${id}/resolve`, { cookie: x.cookie, body: { status: 'resolved', resolution: 'done' } })).status).toBe(403);
    }
    const admin = await staff('admin');
    const q = await call('GET', '/reports', { cookie: admin.cookie });
    expect(q.json.reports[0].priority).toBe(0); // CSAM first
    const mod = await staff('moderator');
    expect((await call('POST', `/reports/${id}/resolve`, { cookie: mod.cookie, body: { status: 'resolved', resolution: 'escalated' } })).status).toBe(200);
    expect((await call('POST', `/reports/${id}/resolve`, { cookie: mod.cookie, body: { status: 'resolved', resolution: 'again' } })).status).toBe(404);
    const a = await auditFor('report.resolved', id);
    expect(a.length).toBe(1); expect(a[0].actor_id).toBe(mod.id);
  });
});

describe('moderation.action + ban.permanent', () => {
  it('only moderator/admin may act; each action audited with actor/target/reason/timestamp', async () => {
    const target = await newUser(); const pid = await post(target, 'bad post');
    for (const role of [null, 'support_agent', 'dmca', 'creator']) {
      const x = role ? await staff(role) : await newUser();
      expect((await call('POST', '/moderation/actions', { cookie: x.cookie, body: { action: 'mute', target_handle: target.handle, reason: 'spam', duration_hours: 1 } })).status).toBe(403);
    }
    const mod = await staff('moderator');
    expect((await call('POST', '/moderation/actions', { cookie: mod.cookie, body: { action: 'mute', target_handle: target.handle, duration_hours: 1 } })).status).toBe(422); // reason required
    const rm = await call('POST', '/moderation/actions', { cookie: mod.cookie, body: { action: 'remove_content', target_handle: target.handle, content_type: 'post', content_id: pid, reason: 'harassment' } });
    expect(rm.status).toBe(201);
    expect((await call('GET', `/posts/${pid}`, { cookie: target.cookie })).status).toBe(404);
    const row = await env.DB.prepare(`SELECT * FROM moderation_actions WHERE id = ?`).bind(rm.json.action.id).first();
    expect(row.actor_id).toBe(mod.id); expect(row.target_user_id).toBe(target.id); expect(row.reason).toBe('harassment'); expect(row.created_at).toBeTruthy();
    const au = await auditFor('moderation.remove_content', target.id);
    expect(au.length).toBe(1); expect(au[0].actor_id).toBe(mod.id); expect(JSON.parse(au[0].meta).reason).toBe('harassment');
    await expect(env.DB.prepare(`DELETE FROM moderation_actions`).run()).rejects.toThrow(/append-only/);

    expect((await call('POST', '/moderation/actions', { cookie: mod.cookie, body: { action: 'mute', target_handle: target.handle, reason: 'spam', duration_hours: 2 } })).status).toBe(201);
    const muted = await call('POST', '/posts', { cookie: target.cookie, body: { body: 'x' } });
    expect(muted.status).toBe(403); expect(muted.json.error.code).toBe('account_muted');

    const t2 = await newUser();
    expect((await call('POST', '/moderation/actions', { cookie: mod.cookie, body: { action: 'suspend', target_handle: t2.handle, reason: 'threats', duration_hours: 24 } })).status).toBe(201);
    expect((await call('POST', '/follows', { cookie: t2.cookie, body: { handle: target.handle } })).json.error.code).toBe('account_suspended');
  });

  it('ban.permanent is admin only; moderators cannot act on admins', async () => {
    const mod = await staff('moderator'); const admin = await staff('admin'); const target = await newUser();
    const m = await call('POST', '/moderation/actions', { cookie: mod.cookie, body: { action: 'ban_permanent', target_handle: target.handle, reason: 'repeat abuse' } });
    expect(m.status).toBe(403);
    expect((await call('POST', '/moderation/actions', { cookie: mod.cookie, body: { action: 'ban', target_handle: admin.handle, reason: 'nope', duration_hours: 1 } })).status).toBe(403);
    expect((await call('POST', '/moderation/actions', { cookie: mod.cookie, body: { action: 'ban', target_handle: target.handle, reason: 'temp ban', duration_hours: 48 } })).status).toBe(201);
    const a = await call('POST', '/moderation/actions', { cookie: admin.cookie, body: { action: 'ban_permanent', target_handle: target.handle, reason: 'repeat abuse' } });
    expect(a.status).toBe(201);
    const r = await call('POST', '/posts', { cookie: target.cookie, body: { body: 'x' } });
    expect(r.status).toBe(403); expect(r.json.error.code).toBe('account_banned');
    expect((await auditFor('moderation.ban_permanent', target.id))[0].actor_id).toBe(admin.id);
  });
});

describe('appeals.review', () => {
  async function actionOn(mod, target, extra = {}) {
    const pid = await post(target);
    const r = await call('POST', '/moderation/actions', { cookie: mod.cookie, body: { action: 'remove_content', target_handle: target.handle, content_type: 'post', content_id: pid, reason: 'spam', ...extra } });
    return { actionId: r.json.action.id, pid };
  }

  it('target can appeal (even suspended); original actor cannot review; another moderator can overturn and content is restored', async () => {
    const mod1 = await staff('moderator'); const mod2 = await staff('moderator'); const target = await newUser(); const other = await newUser();
    const { actionId, pid } = await actionOn(mod1, target);
    await call('POST', '/moderation/actions', { cookie: mod1.cookie, body: { action: 'suspend', target_handle: target.handle, reason: 'cooldown', duration_hours: 1 } });
    expect((await call('POST', '/appeals', { cookie: other.cookie, body: { action_id: actionId, body: 'not mine' } })).status).toBe(404);
    const ap = await call('POST', '/appeals', { cookie: target.cookie, body: { action_id: actionId, body: 'This was not spam' } });
    expect(ap.status).toBe(201);
    expect((await call('POST', '/appeals', { cookie: target.cookie, body: { action_id: actionId, body: 'again' } })).status).toBe(409);
    const id = ap.json.appeal.id;
    expect((await call('POST', `/appeals/${id}/decide`, { cookie: other.cookie, body: { decision: 'overturned', reason: 'x y z' } })).status).toBe(403);
    expect((await call('POST', `/appeals/${id}/decide`, { cookie: (await staff('support_agent')).cookie, body: { decision: 'overturned', reason: 'x y z' } })).status).toBe(403);
    const self = await call('POST', `/appeals/${id}/decide`, { cookie: mod1.cookie, body: { decision: 'upheld', reason: 'I was right' } });
    expect(self.status).toBe(403); expect(self.json.error.code).toBe('conflict_of_interest');
    const ok = await call('POST', `/appeals/${id}/decide`, { cookie: mod2.cookie, body: { decision: 'overturned', reason: 'context shows satire' } });
    expect(ok.status).toBe(200);
    const restored = await env.DB.prepare(`SELECT deleted_at FROM posts WHERE id = ?`).bind(pid).first();
    expect(restored.deleted_at).toBeNull();
    const restore = await env.DB.prepare(`SELECT * FROM moderation_actions WHERE reverses_action_id = ?`).bind(actionId).first();
    expect(restore.action).toBe('restore'); expect(restore.actor_id).toBe(mod2.id);
    expect((await auditFor('appeal.overturned', target.id)).length).toBe(1);
    expect((await call('POST', `/appeals/${id}/decide`, { cookie: mod2.cookie, body: { decision: 'upheld', reason: 'flip' } })).status).toBe(409);
  });

  it('admin may review an appeal of their own action', async () => {
    const admin = await staff('admin'); const target = await newUser();
    const { actionId } = await actionOn(admin, target);
    const id = (await call('POST', '/appeals', { cookie: target.cookie, body: { action_id: actionId, body: 'please' } })).json.appeal.id;
    expect((await call('POST', `/appeals/${id}/decide`, { cookie: admin.cookie, body: { decision: 'upheld', reason: 'confirmed spam' } })).status).toBe(200);
  });
});

describe('blocks enforcement', () => {
  it('blocked users disappear from feed, post, profile; follow/transfer/roast invites refused', async () => {
    const a = await newUser(); const b = await newUser();
    await call('POST', '/follows', { cookie: a.cookie, body: { handle: b.handle } });
    const pid = await post(b, 'from b');
    expect((await call('GET', '/feed', { cookie: a.cookie })).json.posts.map(p => p.id)).toContain(pid);
    expect((await call('GET', `/users/${b.handle}`, { cookie: a.cookie })).status).toBe(200);
    expect(await isBlocked(env, a.id, b.id)).toBe(false);
    await call('POST', '/blocks', { cookie: b.cookie, body: { handle: a.handle } });
    expect(await isBlocked(env, a.id, b.id)).toBe(true);
    expect(await isBlocked(env, b.id, a.id)).toBe(true);
    await expect(assertNotBlocked(env, a.id, b.id)).rejects.toMatchObject({ status: 403 });
    await call('POST', '/follows', { cookie: a.cookie, body: { handle: b.handle } }); // refused
    await env.DB.prepare(`INSERT OR IGNORE INTO follows(follower_id,followee_id,created_at) VALUES (?,?,?)`).bind(a.id, b.id, new Date().toISOString()).run(); // even if a stale follow row exists
    expect((await call('GET', '/feed', { cookie: a.cookie })).json.posts.map(p => p.id)).not.toContain(pid);
    expect((await call('GET', `/posts/${pid}`, { cookie: a.cookie })).status).toBe(404);
    expect((await call('GET', `/users/${b.handle}`, { cookie: a.cookie })).status).toBe(404);
    expect((await call('POST', '/follows', { cookie: a.cookie, body: { handle: b.handle } })).status).toBe(403);
    expect((await call('POST', '/ledger/transfer', { cookie: a.cookie, body: { to_handle: b.handle, amount: 1 } })).status).toBe(403);
    expect((await call('POST', '/roast/invites', { cookie: a.cookie, body: { invitee_handle: b.handle, mode: 'roast_1v1', consent_accepted: true } })).status).toBe(404);
  });
});

describe('dating.access (age_verified_18)', () => {
  const SECRET = 'agev_local_test_only_not_a_real_secret';
  async function vendor(evt, secret = SECRET) {
    const raw = JSON.stringify(evt); const t = Math.floor(Date.now() / 1000);
    const sig = await hmacSha256Hex(secret, `${t}.${raw}`);
    const res = await SELF.fetch('https://api.test/webhooks/age-verification', { method: 'POST', headers: { 'X-Signature': `t=${t},v1=${sig}` }, body: raw });
    return { status: res.status, json: await res.json() };
  }

  it('requires server/vendor-set verification; no client path can set it', async () => {
    const u = await newUser();
    const r = await call('GET', '/dating/eligibility', { cookie: u.cookie });
    expect(r.status).toBe(403); expect(r.json.error.code).toBe('age_verification_required');
    expect((await call('GET', '/dating/eligibility')).status).toBe(401);
    for (const [m, p] of [['POST', '/auth/me'], ['POST', '/users/me'], ['POST', '/dating/verify'], ['POST', '/age-verification'], ['DELETE', '/auth/me']]) {
      expect((await call(m, p, { cookie: u.cookie, body: { age_verified_18: true } })).status).toBe(404);
    }
    // signup ignores client-supplied flag
    const s = await call('POST', '/auth/signup', { body: { email: 'teen@example.com', password: 'password 1234', handle: 'teen_one', display_name: 'T', age_verified_18: true }, ip: freshIp() });
    const row = await env.DB.prepare(`SELECT age_verified_18 FROM users WHERE id = ?`).bind(s.json.user.id).first();
    expect(row.age_verified_18).toBe(0);
    // forged vendor call
    expect((await vendor({ vendor: 'v', event_id: 'e0', user_id: u.id, method: 'doc_selfie', result: 'verified_adult', verified_at: '2026-10-31T00:00:00Z' }, 'wrong')).status).toBe(400);
    expect((await call('GET', '/dating/eligibility', { cookie: u.cookie })).status).toBe(403);
    await expect(env.DB.prepare(`UPDATE users SET age_verified_18 = 1 WHERE id = ?`).bind(u.id).run()).rejects.toThrow(/age_verification_requires_method_and_date/);
  });

  it('signed vendor result sets flag with method+date only, idempotently', async () => {
    const u = await newUser();
    const evt = { vendor: 'persona', event_id: 'evt_1', user_id: u.id, method: 'doc_selfie_liveness', result: 'verified_adult', verified_at: '2026-10-31T12:00:00Z' };
    expect((await vendor(evt)).json.result).toBe('verified_adult');
    expect((await vendor(evt)).json.duplicate).toBe(true);
    expect((await call('GET', '/dating/eligibility', { cookie: u.cookie })).status).toBe(200);
    const me = (await call('GET', '/auth/me', { cookie: u.cookie })).json.user;
    expect(me.age_verified_18).toBe(true); expect(me.age_verification_method).toBe('persona:doc_selfie_liveness'); expect(me.age_verified_at).toBe('2026-10-31T12:00:00Z');
    const cols = (await env.DB.prepare(`PRAGMA table_info(users)`).all()).results.map(c => c.name);
    expect(cols.some(c => /image|photo|document|id_number/.test(c))).toBe(false);
    const n = await newUser();
    await vendor({ ...evt, event_id: 'evt_2', user_id: n.id, result: 'not_verified' });
    expect((await call('GET', '/dating/eligibility', { cookie: n.cookie })).status).toBe(403);
  });
});

describe('roast/battle consent', () => {
  it('invite and acceptance both require consent_accepted', async () => {
    const a = await newUser(); const b = await newUser();
    const no = await call('POST', '/roast/invites', { cookie: a.cookie, body: { invitee_handle: b.handle, mode: 'roast_1v1' } });
    expect(no.status).toBe(422); expect(no.json.error.code).toBe('consent_required');
    expect((await call('POST', '/roast/invites', { cookie: a.cookie, body: { invitee_handle: b.handle, mode: 'roast_1v1', consent_accepted: 'yes' } })).status).toBe(422);
    const inv = await call('POST', '/roast/invites', { cookie: a.cookie, body: { invitee_handle: b.handle, mode: 'battle', consent_accepted: true } });
    expect(inv.status).toBe(201);
    const id = inv.json.invite.id;
    expect((await call('POST', `/roast/invites/${id}/accept`, { cookie: a.cookie, body: { consent_accepted: true } })).status).toBe(404); // inviter can't accept for invitee
    expect((await call('POST', `/roast/invites/${id}/accept`, { cookie: b.cookie, body: {} })).status).toBe(422);
    expect((await call('POST', `/roast/invites/${id}/accept`, { cookie: b.cookie, body: { consent_accepted: true } })).json.invite.status).toBe('accepted');
    await expect(env.DB.prepare(`UPDATE roast_invites SET status='accepted', invitee_consent_at=NULL WHERE id=?`).bind(id).run()).rejects.toThrow(/CHECK/);
  });
});

describe('tickets', () => {
  it('tickets.create any user (rate limited); view/reply support_agent + admin only', async () => {
    expect((await call('POST', '/tickets', { body: { category: 'account', subject: 's', body: 'b' } })).status).toBe(401);
    const u = await newUser();
    const t = await call('POST', '/tickets', { cookie: u.cookie, body: { category: 'payments', subject: 'Refund', body: 'Charged twice' } });
    expect(t.status).toBe(201);
    const id = t.json.ticket.id;
    expect((await call('GET', '/tickets/mine', { cookie: u.cookie })).json.tickets.map(x => x.id)).toContain(id);
    for (const role of [null, 'moderator', 'dmca']) {
      const x = role ? await staff(role) : await newUser();
      expect((await call('GET', '/tickets', { cookie: x.cookie })).status).toBe(403);
      expect((await call('POST', `/tickets/${id}/reply`, { cookie: x.cookie, body: { body: 'hi' } })).status).toBe(403);
    }
    const agent = await staff('support_agent');
    expect((await call('GET', '/tickets', { cookie: agent.cookie })).json.tickets.map(x => x.id)).toContain(id);
    expect((await call('POST', `/tickets/${id}/reply`, { cookie: agent.cookie, body: { body: 'Looking into it' } })).status).toBe(200);
    expect((await call('GET', '/tickets', { cookie: (await staff('admin')).cookie })).status).toBe(200);
    let last;
    for (let i = 0; i < 5; i++) last = await call('POST', '/tickets', { cookie: u.cookie, body: { category: 'other', subject: `s${i}`, body: 'b' } });
    expect(last.status).toBe(429);
  });
});

describe('copyright.takedown.review', () => {
  it('anyone can file a complete notice; only admin or dmca can review; actioned removes content', async () => {
    const owner = await newUser(); const pid = await post(owner, 'reupload');
    const notice = { claimant_name: 'Label LLC', claimant_email: 'legal@label.example', work_description: 'Song X', target_type: 'post', target_id: pid, signature: '/s/ Jane', good_faith_statement: true, accuracy_statement: true };
    expect((await call('POST', '/takedowns', { body: { ...notice, accuracy_statement: false }, ip: freshIp() })).status).toBe(422);
    const td = await call('POST', '/takedowns', { body: notice, ip: freshIp() });
    expect(td.status).toBe(201);
    for (const role of [null, 'moderator', 'support_agent']) {
      const x = role ? await staff(role) : await newUser();
      expect((await call('GET', '/takedowns', { cookie: x.cookie })).status).toBe(403);
      expect((await call('POST', `/takedowns/${td.json.takedown.id}/decide`, { cookie: x.cookie, body: { decision: 'actioned', reason: 'valid' } })).status).toBe(403);
    }
    expect((await call('GET', '/takedowns', { cookie: (await staff('admin')).cookie })).status).toBe(200);
    const agent = await staff('dmca');
    expect((await call('POST', `/takedowns/${td.json.takedown.id}/decide`, { cookie: agent.cookie, body: { decision: 'actioned', reason: 'valid notice' } })).status).toBe(200);
    expect((await call('GET', `/posts/${pid}`, { cookie: owner.cookie })).status).toBe(404);
    expect((await auditFor('copyright.takedown.actioned', pid))[0].actor_id).toBe(agent.id);
  });
});

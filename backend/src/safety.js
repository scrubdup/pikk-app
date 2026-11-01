import { ApiError, json, readJson, clientIp } from './http.js';
import { requireAuth, requireActive, requireVerified } from './auth.js';
import { requirePermission, can } from './permissions.js';
import { assertNotBlocked } from './blocks.js';
import { rateLimit } from './ratelimit.js';
import { requireString } from './validate.js';
import { newId, sha256Hex } from './crypto.js';
import { auditStmt } from './audit.js';
import { verifyStripeSignature as verifyHmacSignature } from './webhook.js';

const HANDLE = /^[a-zA-Z0-9_]{3,30}$/;
const nowIso = () => new Date().toISOString();
const PRIORITY = { csam: 0, ncii: 0, self_harm: 0, threat: 0, underage: 1, harassment: 2, hate: 2, sexual: 2, violence: 2, impersonation: 3, fraud: 3, copyright: 3, spam: 4, other: 4 };
const REPORT_TARGETS = ['user', 'post', 'message', 'live', 'room', 'listing', 'dating_profile', 'roast'];
const enumOf = (b, field, list) => {
  if (!list.includes(b[field])) throw new ApiError(422, 'validation_failed', 'Invalid input', { [field]: `one of ${list.join(', ')}` });
  return b[field];
};
const userByHandle = async (env, handle) => {
  const u = await env.DB.prepare(`SELECT id, handle FROM users WHERE handle = ?`).bind(handle).first();
  if (!u) throw new ApiError(404, 'not_found', 'User not found');
  return u;
};
const rolesOf = async (env, userId) => (await env.DB.prepare(`SELECT role FROM user_roles WHERE user_id = ?`).bind(userId).all()).results.map(r => r.role);

// ---------- Age verification (server/vendor only) ----------
/** The ONLY code path that sets age_verified_18. Stores method + date; never ID images. */
export function setAgeVerifiedStmt(env, userId, method, verifiedAt) {
  return env.DB.prepare(`UPDATE users SET age_verified_18 = 1, age_verification_method = ?, age_verified_at = ? WHERE id = ?`).bind(method, verifiedAt, userId);
}

/** Vendor webhook stub: HMAC-signed (t=,v1=) with AGE_VERIFY_WEBHOOK_SECRET; vendor not yet chosen. */
async function ageVerificationWebhook(env, req) {
  if (!env.AGE_VERIFY_WEBHOOK_SECRET) throw new ApiError(503, 'age_verification_not_configured', 'Age verification vendor not configured');
  const raw = await req.text();
  if (raw.length > 32 * 1024) throw new ApiError(413, 'payload_too_large', 'Body too large');
  if (!(await verifyHmacSignature(env.AGE_VERIFY_WEBHOOK_SECRET, req.headers.get('X-Signature'), raw)))
    throw new ApiError(400, 'invalid_signature', 'Webhook signature verification failed');
  let e; try { e = JSON.parse(raw); } catch { throw new ApiError(400, 'invalid_json', 'Invalid JSON'); }
  for (const f of ['vendor', 'event_id', 'user_id', 'method', 'result', 'verified_at']) if (typeof e[f] !== 'string') throw new ApiError(400, 'invalid_event', `missing ${f}`);
  if (!['verified_adult', 'not_verified'].includes(e.result)) throw new ApiError(400, 'invalid_event', 'bad result');
  const u = await env.DB.prepare(`SELECT id FROM users WHERE id = ?`).bind(e.user_id).first();
  if (!u) throw new ApiError(404, 'not_found', 'Unknown user');
  const ins = await env.DB.prepare(`INSERT INTO age_verification_events(id,vendor,vendor_event_id,user_id,method,result,received_at) VALUES (?,?,?,?,?,?,?)
    ON CONFLICT(vendor, vendor_event_id) DO NOTHING RETURNING id`).bind(newId('ave'), e.vendor, e.event_id, u.id, e.method, e.result, nowIso()).first();
  if (!ins) return json(200, { received: true, duplicate: true });
  if (e.result === 'verified_adult') {
    await env.DB.batch([setAgeVerifiedStmt(env, u.id, `${e.vendor}:${e.method}`.slice(0, 80), e.verified_at),
      auditStmt(env, { action: 'safety.age_verified', target: u.id, meta: { vendor: e.vendor, method: e.method } })]);
  }
  return json(200, { received: true, result: e.result });
}

export function requireAdult(ctx) {
  const s = requireVerified(ctx);
  if (!s.user.age_verified_18) throw new ApiError(403, 'age_verification_required', 'Verified 18+ required');
  return s;
}

// ---------- Moderation effects ----------
function effectStmts(env, a, { reverse = false } = {}) {
  const until = reverse ? null : a.expires_at;
  switch (a.action) {
    case 'remove_content': return [env.DB.prepare(`UPDATE posts SET deleted_at = ? WHERE id = ?`).bind(reverse ? null : a.created_at, a.content_id)];
    case 'mute': return [env.DB.prepare(`UPDATE users SET muted_until = ? WHERE id = ?`).bind(until, a.target_user_id)];
    case 'suspend':
    case 'ban': return [env.DB.prepare(`UPDATE users SET suspended_until = ? WHERE id = ?`).bind(until, a.target_user_id)];
    case 'ban_permanent': return [env.DB.prepare(`UPDATE users SET banned_at = ? WHERE id = ?`).bind(reverse ? null : a.created_at, a.target_user_id)];
    default: return [];
  }
}

async function moderationAction(env, req, ctx) {
  const s = requirePermission(ctx, 'moderation.action');
  requireActive(ctx);
  const b = await readJson(req);
  const action = enumOf(b, 'action', ['remove_content', 'mute', 'suspend', 'ban', 'ban_permanent']);
  if (action === 'ban_permanent') requirePermission(ctx, 'ban.permanent');
  const reason = requireString(b, 'reason', { min: 3, max: 1000 });
  const target = await userByHandle(env, requireString(b, 'target_handle', { max: 30, pattern: HANDLE }));
  if (target.id === s.user.id) throw new ApiError(422, 'validation_failed', 'Cannot moderate yourself');
  const targetRoles = await rolesOf(env, target.id);
  if (targetRoles.includes('admin') && !s.roles.includes('admin')) throw new ApiError(403, 'forbidden', 'Only admins can act on admins');
  const t = nowIso();
  const a = { id: newId('mod'), actor_id: s.user.id, target_user_id: target.id, action, content_type: null, content_id: null, reason, report_id: null, expires_at: null, created_at: t };
  if (action === 'remove_content') {
    a.content_type = enumOf(b, 'content_type', ['post']);
    a.content_id = requireString(b, 'content_id', { max: 64 });
    const post = await env.DB.prepare(`SELECT id FROM posts WHERE id = ? AND author_id = ?`).bind(a.content_id, target.id).first();
    if (!post) throw new ApiError(404, 'not_found', 'Content not found for target');
  } else if (action !== 'ban_permanent') {
    const h = b.duration_hours;
    if (!Number.isInteger(h) || h < 1 || h > 24 * 365) throw new ApiError(422, 'validation_failed', 'Invalid input', { duration_hours: '1-8760' });
    a.expires_at = new Date(Date.now() + h * 3600_000).toISOString();
  }
  if (b.report_id !== undefined) {
    a.report_id = requireString(b, 'report_id', { max: 64 });
    if (!(await env.DB.prepare(`SELECT 1 FROM reports WHERE id = ?`).bind(a.report_id).first())) throw new ApiError(404, 'not_found', 'Report not found');
  }
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO moderation_actions(id,actor_id,target_user_id,action,content_type,content_id,reason,report_id,expires_at,created_at) VALUES (?,?,?,?,?,?,?,?,?,?)`)
      .bind(a.id, a.actor_id, a.target_user_id, a.action, a.content_type, a.content_id, a.reason, a.report_id, a.expires_at, a.created_at),
    ...effectStmts(env, a),
    auditStmt(env, { actor: s.user.id, action: `moderation.${action}`, target: target.id, ip: clientIp(req), meta: { action_id: a.id, reason, content_id: a.content_id, expires_at: a.expires_at } }),
  ]);
  return json(201, { action: a });
}

// ---------- Appeals ----------
async function createAppeal(env, req, ctx) {
  const s = requireAuth(ctx); // suspended/banned users must still be able to appeal
  const b = await readJson(req);
  await rateLimit(env, `appeal:${s.user.id}`, 5, 3600);
  const actionId = requireString(b, 'action_id', { max: 64 });
  const body = requireString(b, 'body', { max: 2000 });
  const a = await env.DB.prepare(`SELECT * FROM moderation_actions WHERE id = ?`).bind(actionId).first();
  if (!a || a.target_user_id !== s.user.id || a.action === 'restore') throw new ApiError(404, 'not_found', 'Action not found');
  const id = newId('apl');
  try {
    await env.DB.batch([
      env.DB.prepare(`INSERT INTO appeals(id,action_id,appellant_id,body,created_at) VALUES (?,?,?,?,?)`).bind(id, actionId, s.user.id, body, nowIso()),
      auditStmt(env, { actor: s.user.id, action: 'appeal.create', target: actionId, ip: clientIp(req) }),
    ]);
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) throw new ApiError(409, 'appeal_exists', 'This action was already appealed');
    throw e;
  }
  return json(201, { appeal: { id, action_id: actionId, status: 'pending' } });
}

async function decideAppeal(env, req, ctx, appealId) {
  const s = requirePermission(ctx, 'appeals.review');
  const b = await readJson(req);
  const decision = enumOf(b, 'decision', ['upheld', 'overturned']);
  const reason = requireString(b, 'reason', { min: 3, max: 1000 });
  const ap = await env.DB.prepare(`SELECT ap.*, ma.actor_id, ma.action, ma.target_user_id, ma.content_id, ma.created_at AS action_created_at
    FROM appeals ap JOIN moderation_actions ma ON ma.id = ap.action_id WHERE ap.id = ?`).bind(appealId).first();
  if (!ap) throw new ApiError(404, 'not_found', 'Appeal not found');
  if (ap.status !== 'pending') throw new ApiError(409, 'already_decided', 'Appeal already decided');
  if (!s.roles.includes('admin') && ap.actor_id === s.user.id) throw new ApiError(403, 'conflict_of_interest', 'Original actor cannot review this appeal');
  if (ap.appellant_id === s.user.id) throw new ApiError(403, 'conflict_of_interest', 'Cannot review your own appeal');
  const t = nowIso();
  const stmts = [
    env.DB.prepare(`UPDATE appeals SET status = ?, reviewer_id = ?, decision_reason = ?, decided_at = ? WHERE id = ? AND status = 'pending'`).bind(decision, s.user.id, reason, t, appealId),
    auditStmt(env, { actor: s.user.id, action: `appeal.${decision}`, target: ap.target_user_id, ip: clientIp(req), meta: { appeal: appealId, action_id: ap.action_id, reason } }),
  ];
  if (decision === 'overturned') {
    const restoreId = newId('mod');
    stmts.push(env.DB.prepare(`INSERT INTO moderation_actions(id,actor_id,target_user_id,action,content_type,content_id,reason,reverses_action_id,created_at) VALUES (?,?,?,'restore',?,?,?,?,?)`)
      .bind(restoreId, s.user.id, ap.target_user_id, ap.content_id ? 'post' : null, ap.content_id, `appeal overturned: ${reason}`.slice(0, 1000), ap.action_id, t));
    stmts.push(...effectStmts(env, { action: ap.action, target_user_id: ap.target_user_id, content_id: ap.content_id, created_at: ap.action_created_at }, { reverse: true }));
  }
  await env.DB.batch(stmts);
  return json(200, { appeal: { id: appealId, status: decision } });
}

// ---------- Reports ----------
async function createReport(env, req, ctx) {
  const s = requirePermission(ctx, 'reports.create');
  await rateLimit(env, `report:user:${s.user.id}`, 10, 3600);
  await rateLimit(env, `report:ip:${clientIp(req)}`, 30, 3600);
  const b = await readJson(req);
  const target_type = enumOf(b, 'target_type', REPORT_TARGETS);
  const target_id = requireString(b, 'target_id', { max: 64 });
  const category = enumOf(b, 'category', Object.keys(PRIORITY));
  const details = b.details === undefined ? null : requireString(b, 'details', { max: 2000 });
  const id = newId('rep');
  try {
    await env.DB.prepare(`INSERT INTO reports(id,reporter_id,target_type,target_id,category,details,priority,created_at) VALUES (?,?,?,?,?,?,?,?)`)
      .bind(id, s.user.id, target_type, target_id, category, details, PRIORITY[category], nowIso()).run();
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) throw new ApiError(409, 'duplicate_report', 'You already have an open report on this');
    throw e;
  }
  return json(201, { report: { id, status: 'open', priority: PRIORITY[category] } });
}

async function listReports(env, ctx) {
  requirePermission(ctx, 'reports.view');
  const r = await env.DB.prepare(`SELECT id, target_type, target_id, category, details, priority, status, created_at FROM reports WHERE status = 'open' ORDER BY priority, created_at LIMIT 100`).all();
  return json(200, { reports: r.results }); // reporter identity intentionally omitted
}

async function resolveReport(env, req, ctx, id) {
  const s = requirePermission(ctx, 'reports.resolve');
  const b = await readJson(req);
  const status = enumOf(b, 'status', ['resolved', 'dismissed']);
  const resolution = requireString(b, 'resolution', { min: 3, max: 1000 });
  const upd = await env.DB.prepare(`UPDATE reports SET status = ?, resolution = ?, resolved_by = ?, resolved_at = ? WHERE id = ? AND status = 'open'`).bind(status, resolution, s.user.id, nowIso(), id).run();
  if (!upd.meta.changes) throw new ApiError(404, 'not_found', 'Open report not found');
  await auditStmt(env, { actor: s.user.id, action: `report.${status}`, target: id, ip: clientIp(req), meta: { resolution } }).run();
  return json(200, { report: { id, status } });
}

// ---------- Tickets ----------
async function createTicket(env, req, ctx) {
  const s = requirePermission(ctx, 'tickets.create');
  await rateLimit(env, `ticket:user:${s.user.id}`, 5, 3600);
  await rateLimit(env, `ticket:ip:${clientIp(req)}`, 20, 3600);
  const b = await readJson(req);
  const category = enumOf(b, 'category', ['account', 'payments', 'safety', 'technical', 'other']);
  const subject = requireString(b, 'subject', { max: 200 });
  const body = requireString(b, 'body', { max: 5000 });
  const id = newId('tkt'); const t = nowIso();
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO tickets(id,user_id,category,subject,created_at) VALUES (?,?,?,?,?)`).bind(id, s.user.id, category, subject, t),
    env.DB.prepare(`INSERT INTO ticket_messages(id,ticket_id,author_id,is_staff,body,created_at) VALUES (?,?,?,0,?,?)`).bind(newId('tm'), id, s.user.id, body, t),
  ]);
  return json(201, { ticket: { id, status: 'open' } });
}

async function listTickets(env, ctx, mine) {
  const s = mine ? requireAuth(ctx) : requirePermission(ctx, 'tickets.view');
  const q = mine
    ? env.DB.prepare(`SELECT id, category, subject, status, created_at FROM tickets WHERE user_id = ? ORDER BY created_at DESC LIMIT 100`).bind(s.user.id)
    : env.DB.prepare(`SELECT id, user_id, category, subject, status, created_at FROM tickets WHERE status <> 'closed' ORDER BY created_at LIMIT 100`);
  return json(200, { tickets: (await q.all()).results });
}

async function replyTicket(env, req, ctx, id) {
  const s = requirePermission(ctx, 'tickets.reply');
  const b = await readJson(req);
  const body = requireString(b, 'body', { max: 5000 });
  const status = b.status === undefined ? 'pending_user' : enumOf(b, 'status', ['open', 'pending_user', 'closed']);
  const tk = await env.DB.prepare(`SELECT id FROM tickets WHERE id = ?`).bind(id).first();
  if (!tk) throw new ApiError(404, 'not_found', 'Ticket not found');
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO ticket_messages(id,ticket_id,author_id,is_staff,body,created_at) VALUES (?,?,?,1,?,?)`).bind(newId('tm'), id, s.user.id, body, nowIso()),
    env.DB.prepare(`UPDATE tickets SET status = ? WHERE id = ?`).bind(status, id),
    auditStmt(env, { actor: s.user.id, action: 'ticket.reply', target: id, ip: clientIp(req) }),
  ]);
  return json(200, { ticket: { id, status } });
}

// ---------- Copyright takedowns ----------
async function createTakedown(env, req, ctx) {
  await rateLimit(env, `takedown:ip:${clientIp(req)}`, 5, 3600);
  const b = await readJson(req);
  const claimant_name = requireString(b, 'claimant_name', { max: 200 });
  const claimant_email = requireString(b, 'claimant_email', { max: 254, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ });
  const work = requireString(b, 'work_description', { max: 4000 });
  const target_type = enumOf(b, 'target_type', ['post']);
  const target_id = requireString(b, 'target_id', { max: 64 });
  const signature = requireString(b, 'signature', { max: 200 });
  if (b.good_faith_statement !== true || b.accuracy_statement !== true)
    throw new ApiError(422, 'validation_failed', 'Required statements must be affirmed', { good_faith_statement: 'true required', accuracy_statement: 'true required' });
  const id = newId('tdn');
  await env.DB.prepare(`INSERT INTO takedowns(id,submitted_by,claimant_name,claimant_email,work_description,target_type,target_id,good_faith_statement,accuracy_statement,signature,created_at) VALUES (?,?,?,?,?,?,?,1,1,?,?)`)
    .bind(id, ctx.session ? ctx.session.user.id : null, claimant_name, claimant_email, work, target_type, target_id, signature, nowIso()).run();
  return json(201, { takedown: { id, status: 'received' } });
}

async function listTakedowns(env, ctx) {
  requirePermission(ctx, 'copyright.takedown.review');
  const r = await env.DB.prepare(`SELECT * FROM takedowns WHERE status = 'received' ORDER BY created_at LIMIT 100`).all();
  return json(200, { takedowns: r.results });
}

async function decideTakedown(env, req, ctx, id) {
  const s = requirePermission(ctx, 'copyright.takedown.review');
  const b = await readJson(req);
  const decision = enumOf(b, 'decision', ['actioned', 'rejected']);
  const reason = requireString(b, 'reason', { min: 3, max: 1000 });
  const td = await env.DB.prepare(`SELECT * FROM takedowns WHERE id = ? AND status = 'received'`).bind(id).first();
  if (!td) throw new ApiError(404, 'not_found', 'Pending takedown not found');
  const t = nowIso();
  const stmts = [
    env.DB.prepare(`UPDATE takedowns SET status = ?, reviewer_id = ?, decision_reason = ?, decided_at = ? WHERE id = ?`).bind(decision, s.user.id, reason, t, id),
    auditStmt(env, { actor: s.user.id, action: `copyright.takedown.${decision}`, target: td.target_id, ip: clientIp(req), meta: { takedown: id, reason } }),
  ];
  if (decision === 'actioned') {
    const post = await env.DB.prepare(`SELECT id, author_id FROM posts WHERE id = ?`).bind(td.target_id).first();
    if (post) {
      stmts.push(env.DB.prepare(`UPDATE posts SET deleted_at = ? WHERE id = ?`).bind(t, post.id));
      stmts.push(env.DB.prepare(`INSERT INTO moderation_actions(id,actor_id,target_user_id,action,content_type,content_id,reason,created_at) VALUES (?,?,?,'remove_content','post',?,?,?)`)
        .bind(newId('mod'), s.user.id, post.author_id, post.id, `DMCA takedown ${id}: ${reason}`.slice(0, 1000), t));
    }
  }
  await env.DB.batch(stmts);
  return json(200, { takedown: { id, status: decision } });
}

// ---------- Roast / battle invites (consent) ----------
async function createRoastInvite(env, req, ctx) {
  const s = requireVerified(ctx);
  const b = await readJson(req);
  if (b.consent_accepted !== true) throw new ApiError(422, 'consent_required', 'You must accept the Roast Arena rules and consent terms');
  const mode = enumOf(b, 'mode', ['roast_1v1', 'battle']);
  const invitee = await userByHandle(env, requireString(b, 'invitee_handle', { max: 30, pattern: HANDLE }));
  if (invitee.id === s.user.id) throw new ApiError(422, 'validation_failed', 'Cannot invite yourself');
  await assertNotBlocked(env, s.user.id, invitee.id, { silent: true });
  const id = newId('rvi'); const t = nowIso();
  await env.DB.prepare(`INSERT INTO roast_invites(id,inviter_id,invitee_id,mode,inviter_consent_at,created_at) VALUES (?,?,?,?,?,?)`).bind(id, s.user.id, invitee.id, mode, t, t).run();
  return json(201, { invite: { id, status: 'pending', mode } });
}

async function respondRoastInvite(env, req, ctx, id, accept) {
  const s = requireVerified(ctx);
  const b = await readJson(req);
  const inv = await env.DB.prepare(`SELECT * FROM roast_invites WHERE id = ? AND invitee_id = ? AND status = 'pending'`).bind(id, s.user.id).first();
  if (!inv) throw new ApiError(404, 'not_found', 'Invite not found');
  await assertNotBlocked(env, s.user.id, inv.inviter_id, { silent: true });
  if (accept) {
    if (b.consent_accepted !== true) throw new ApiError(422, 'consent_required', 'You must accept the Roast Arena rules and consent terms');
    await env.DB.prepare(`UPDATE roast_invites SET status = 'accepted', invitee_consent_at = ? WHERE id = ?`).bind(nowIso(), id).run();
  } else {
    await env.DB.prepare(`UPDATE roast_invites SET status = 'declined' WHERE id = ?`).bind(id).run();
  }
  return json(200, { invite: { id, status: accept ? 'accepted' : 'declined' } });
}

/** Returns a Response if the route is a safety route, else null. */
export async function safetyRoute(env, req, ctx, m, p) {
  let mm;
  if (m === 'POST' && p === '/reports') return createReport(env, req, ctx);
  if (m === 'GET' && p === '/reports') return listReports(env, ctx);
  if (m === 'POST' && (mm = p.match(/^\/reports\/([\w-]{1,64})\/resolve$/))) return resolveReport(env, req, ctx, mm[1]);
  if (m === 'POST' && p === '/moderation/actions') return moderationAction(env, req, ctx);
  if (m === 'POST' && p === '/appeals') return createAppeal(env, req, ctx);
  if (m === 'POST' && (mm = p.match(/^\/appeals\/([\w-]{1,64})\/decide$/))) return decideAppeal(env, req, ctx, mm[1]);
  if (m === 'POST' && p === '/tickets') return createTicket(env, req, ctx);
  if (m === 'GET' && p === '/tickets') return listTickets(env, ctx, false);
  if (m === 'GET' && p === '/tickets/mine') return listTickets(env, ctx, true);
  if (m === 'POST' && (mm = p.match(/^\/tickets\/([\w-]{1,64})\/reply$/))) return replyTicket(env, req, ctx, mm[1]);
  if (m === 'POST' && p === '/takedowns') return createTakedown(env, req, ctx);
  if (m === 'GET' && p === '/takedowns') return listTakedowns(env, ctx);
  if (m === 'POST' && (mm = p.match(/^\/takedowns\/([\w-]{1,64})\/decide$/))) return decideTakedown(env, req, ctx, mm[1]);
  if (m === 'GET' && p === '/dating/eligibility') { requireAdult(ctx); return json(200, { eligible: true }); }
  if (m === 'POST' && p === '/roast/invites') return createRoastInvite(env, req, ctx);
  if (m === 'POST' && (mm = p.match(/^\/roast\/invites\/([\w-]{1,64})\/(accept|decline)$/))) return respondRoastInvite(env, req, ctx, mm[1], mm[2] === 'accept');
  return null;
}

export { ageVerificationWebhook };

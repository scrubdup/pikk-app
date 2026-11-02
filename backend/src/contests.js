// Contests. Owner rule: the Twerk Contest is women-only. CONTESTANTS (upload or live entry) need
// server age_verified_18 AND account gender 'female' (self-declared on the account, server-stored,
// never read from an ID document). Viewers and voters need neither.
import { ApiError, json, readJson } from './http.js';
import { requireVerified } from './auth.js';
import { requirePermission } from './permissions.js';
import { rateLimit } from './ratelimit.js';
import { newId } from './crypto.js';

/** audit_log INSERT that only writes if the immediately preceding statement in the batch changed a row. */
const auditIfChanged = (env, { actor, action, target, meta }) => env.DB.prepare(
  `INSERT INTO audit_log(id,actor_id,action,target,ip,meta,created_at) SELECT ?,?,?,?,NULL,?,? WHERE changes() = 1`)
  .bind(newId('aud'), actor, action, target, JSON.stringify(meta), new Date().toISOString());
import { auditStmt } from './audit.js';
import { requireString } from './validate.js';

// Owner ruling: Twerk Contest entries are LIVE and SOLO only.
export const CONTESTS = Object.freeze({ twerk: { adultContestantsOnly: true, contestantGenders: ['female'], liveOnly: true, soloOnly: true } });
// Strict whitelist: any key outside this set (coHost, guestIds, with, participantCount, ...) is 422 solo_only.
const SOLO_ALLOWED_KEYS = new Set(['title', 'mode', 'participant_count']);
function assertSolo(b) {
  const extra = Object.keys(b || {}).filter((k) => !SOLO_ALLOWED_KEYS.has(k));
  if (extra.length || (b.mode !== undefined && b.mode !== 'solo') || (b.participant_count !== undefined && b.participant_count !== 1))
    throw new ApiError(422, 'solo_only', 'Twerk Contest entries are live and solo only: one verified contestant, no co-hosts or guests.', { fields: extra });
}
import { GENDERS } from './genders.js';
export { GENDERS };

/** Owner rule: once an account has a gender (set at signup, or the one-time legacy set) it is locked forever.
 *  Only staff can correct genuine data-entry mistakes (POST /admin/account/gender, reason + audit). */
export async function isGenderLocked(env, userId) {
  const r = await env.DB.prepare(`SELECT gender FROM users WHERE id = ?`).bind(userId).first();
  return !!(r && r.gender);
}

/** Atomic set-once: the UPDATE only applies while gender IS NULL. If another request set it between
 *  the lock check and this UPDATE (meta.changes === 0), refuse with 409 and write NO audit row. */
export async function setOwnGenderOnce(env, userId, gender) {
  const t = new Date().toISOString();
  // One atomic batch: the audit row is inserted only if the UPDATE changed a row (changes() = 1).
  const [r] = await env.DB.batch([
    env.DB.prepare(`UPDATE users SET gender = ?, gender_set_at = ? WHERE id = ? AND gender IS NULL`).bind(gender, t, userId),
    auditIfChanged(env, { actor: userId, action: 'account.gender_set', target: userId, meta: { gender } }),
  ]);
  if (!r?.meta?.changes) throw new ApiError(409, 'gender_locked', 'Account gender is set at signup and cannot be changed. Contact Support if it was entered by mistake.');
}

/** Owner rule: ONE staff correction per account, then permanently locked (even for admins).
 *  Atomic via WHERE gender_corrected_at IS NULL; audit only on success. */
export async function staffCorrectGenderOnce(env, actorId, user, gender, reason) {
  const t = new Date().toISOString();
  const [r] = await env.DB.batch([
    env.DB.prepare(`UPDATE users SET gender = ?, gender_set_at = ?, gender_corrected_at = ? WHERE id = ? AND gender_corrected_at IS NULL`).bind(gender, t, t, user.id),
    auditIfChanged(env, { actor: actorId, action: 'admin.gender_changed', target: user.id, meta: { from: user.gender, to: gender, reason } }),
  ]);
  if (!r?.meta?.changes) throw new ApiError(409, 'gender_correction_used', 'This account already used its one gender correction. It is permanently locked.');
}

export async function contestEligibility(env, userId, contest) {
  const c = CONTESTS[contest];
  const u = await env.DB.prepare(`SELECT age_verified_18, gender FROM users WHERE id = ?`).bind(userId).first();
  const genderOk = !c?.contestantGenders || c.contestantGenders.includes(u?.gender);
  const ageOk = !c?.adultContestantsOnly || u?.age_verified_18 === 1;
  return { can_enter: genderOk && ageOk, gender_ok: genderOk, gender_set: !!u?.gender, age_verified: u?.age_verified_18 === 1 };
}

export async function requireContestant(env, ctx, contest) {
  const s = requireVerified(ctx);
  const e = await contestEligibility(env, s.user.id, contest);
  if (!e.gender_ok) throw new ApiError(403, 'contestant_not_eligible', 'This contest is open to women contestants only. You can still watch and vote.');
  if (!e.age_verified) throw new ApiError(403, 'age_verification_required', 'Contestants must complete ID/age verification', { verify: '#/verify-age' });
  return s;
}

export async function contestRoute(env, req, ctx, m, p) {
  if (m === 'POST' && p === '/account/gender') {
    const s = requireVerified(ctx);
    await rateLimit(env, `gender:${s.user.id}`, 5, 86400);
    const b = await readJson(req);
    if (!GENDERS.includes(b.gender)) throw new ApiError(422, 'validation_failed', 'Invalid input', { gender: GENDERS.join(', ') });
    if (await isGenderLocked(env, s.user.id)) throw new ApiError(409, 'gender_locked', 'Account gender is set at signup and cannot be changed. Contact Support if it was entered by mistake.');
    await setOwnGenderOnce(env, s.user.id, b.gender);
    return json(200, { gender: b.gender });
  }
  if (m === 'GET' && p === '/account/gender') {
    const s = requireVerified(ctx);
    const u = await env.DB.prepare(`SELECT gender FROM users WHERE id = ?`).bind(s.user.id).first();
    return json(200, { gender: u?.gender || null, locked: await isGenderLocked(env, s.user.id) });
  }
  if (m === 'POST' && p === '/admin/account/gender') {
    const s = requirePermission(ctx, 'moderation.action'); // moderator or admin
    const b = await readJson(req);
    const handle = requireString(b, 'handle', { max: 30 });
    if (!GENDERS.includes(b.gender)) throw new ApiError(422, 'validation_failed', 'Invalid input', { gender: GENDERS.join(', ') });
    const reason = requireString(b, 'reason', { min: 5, max: 500 });
    const u = await env.DB.prepare(`SELECT id, gender FROM users WHERE handle = ?`).bind(handle).first();
    if (!u) throw new ApiError(404, 'not_found', 'User not found');
    await staffCorrectGenderOnce(env, s.user.id, u, b.gender, reason);
    return json(200, { gender: b.gender });
  }
  let em;
  if (m === 'GET' && (em = p.match(/^\/contests\/([a-z]{2,20})\/eligibility$/))) {
    if (!CONTESTS[em[1]]) throw new ApiError(404, 'not_found', 'Unknown contest');
    const s = requireVerified(ctx);
    return json(200, await contestEligibility(env, s.user.id, em[1]));
  }
  const gm = p.match(/^\/contests\/([a-z]{2,20})\/live\/[\w-]{1,64}\/(guests|cohosts|invites)$/);
  if (gm && m === 'POST') {
    if (!CONTESTS[gm[1]]) throw new ApiError(404, 'not_found', 'Unknown contest');
    requireVerified(ctx);
    if (CONTESTS[gm[1]].soloOnly) throw new ApiError(422, 'solo_only', 'Twerk Contest lives are solo only. Guests and co-hosts cannot be invited.');
    throw new ApiError(404, 'not_found', 'Not found');
  }
  const mm = p.match(/^\/contests\/([a-z]{2,20})\/(entries|live|votes)$/);
  if (!mm || m !== 'POST') return null;
  const [, contest, action] = mm;
  if (!CONTESTS[contest]) throw new ApiError(404, 'not_found', 'Unknown contest');
  if (action === 'votes') {
    const s = requireVerified(ctx); // no ID verification for voters
    await rateLimit(env, `contest:vote:${s.user.id}`, 200, 3600);
    const b = await readJson(req); const entryId = requireString(b, 'entry_id', { max: 64 });
    const e = await env.DB.prepare(`SELECT id, user_id FROM contest_entries WHERE id = ? AND contest = ? AND status = 'approved'`).bind(entryId, contest).first();
    if (!e) throw new ApiError(404, 'not_found', 'Entry not found');
    if (e.user_id === s.user.id) throw new ApiError(422, 'validation_failed', 'You cannot vote for your own entry');
    await env.DB.prepare(`INSERT INTO contest_votes(entry_id,voter_id,created_at) VALUES (?,?,?) ON CONFLICT DO NOTHING`).bind(e.id, s.user.id, new Date().toISOString()).run();
    return json(200, { voted: true });
  }
  if (action === 'entries' && CONTESTS[contest].liveOnly)
    throw new ApiError(410, 'recorded_entries_disabled', 'Recorded entries are disabled. Twerk Contest entries are live and solo only: use Go live.');
  const s = await requireContestant(env, ctx, contest);
  await rateLimit(env, `contest:entry:${s.user.id}`, 10, 86400);
  const b = await readJson(req);
  if (CONTESTS[contest].soloOnly) assertSolo(b);
  const title = requireString(b, 'title', { min: 1, max: 120 });
  const kind = action === 'live' ? 'live' : 'upload';
  const id = newId('ce'); const t = new Date().toISOString();
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO contest_entries(id,contest,user_id,kind,title,created_at) VALUES (?,?,?,?,?,?)`).bind(id, contest, s.user.id, kind, title, t),
    auditStmt(env, { actor: s.user.id, action: `contest.${kind}`, target: id, meta: { contest } }),
  ]);
  return json(201, { entry: { id, contest, kind, status: 'pending_review' } });
}

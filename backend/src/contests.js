// Contests. Owner rule: the Twerk Contest is women-only. CONTESTANTS (upload or live entry) need
// server age_verified_18 AND account gender 'female' (self-declared on the account, server-stored,
// never read from an ID document). Viewers and voters need neither.
import { ApiError, json, readJson } from './http.js';
import { requireVerified } from './auth.js';
import { rateLimit } from './ratelimit.js';
import { newId } from './crypto.js';
import { auditStmt } from './audit.js';
import { requireString } from './validate.js';

export const CONTESTS = Object.freeze({ twerk: { adultContestantsOnly: true, contestantGenders: ['female'] } });
export const GENDERS = ['female', 'male', 'nonbinary', 'undisclosed'];

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
    const t = new Date().toISOString();
    await env.DB.batch([
      env.DB.prepare(`UPDATE users SET gender = ?, gender_set_at = ? WHERE id = ?`).bind(b.gender, t, s.user.id),
      auditStmt(env, { actor: s.user.id, action: 'account.gender_set', target: s.user.id, meta: { gender: b.gender } }),
    ]);
    return json(200, { gender: b.gender });
  }
  let em;
  if (m === 'GET' && (em = p.match(/^\/contests\/([a-z]{2,20})\/eligibility$/))) {
    if (!CONTESTS[em[1]]) throw new ApiError(404, 'not_found', 'Unknown contest');
    const s = requireVerified(ctx);
    return json(200, await contestEligibility(env, s.user.id, em[1]));
  }
  const mm = p.match(/^\/contests\/([a-z]{2,20})\/(entries|live|votes)$/);
  if (!mm || m !== 'POST') return null;
  const [, contest, action] = mm;
  if (!CONTESTS[contest]) throw new ApiError(404, 'not_found', 'Unknown contest');
  if (action === 'votes') {
    const s = requireVerified(ctx); // no ID verification for voters
    await rateLimit(env, `contest:vote:${s.user.id}`, 200, 3600);
    const b = await readJson(req); const entryId = requireString(b, 'entry_id', { max: 64 });
    const e = await env.DB.prepare(`SELECT id, user_id FROM contest_entries WHERE id = ? AND contest = ?`).bind(entryId, contest).first();
    if (!e) throw new ApiError(404, 'not_found', 'Entry not found');
    if (e.user_id === s.user.id) throw new ApiError(422, 'validation_failed', 'You cannot vote for your own entry');
    await env.DB.prepare(`INSERT INTO contest_votes(entry_id,voter_id,created_at) VALUES (?,?,?) ON CONFLICT DO NOTHING`).bind(e.id, s.user.id, new Date().toISOString()).run();
    return json(200, { voted: true });
  }
  const s = await requireContestant(env, ctx, contest);
  await rateLimit(env, `contest:entry:${s.user.id}`, 10, 86400);
  const b = await readJson(req);
  const title = requireString(b, 'title', { min: 1, max: 120 });
  const kind = action === 'live' ? 'live' : 'upload';
  const id = newId('ce'); const t = new Date().toISOString();
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO contest_entries(id,contest,user_id,kind,title,created_at) VALUES (?,?,?,?,?,?)`).bind(id, contest, s.user.id, kind, title, t),
    auditStmt(env, { actor: s.user.id, action: `contest.${kind}`, target: id, meta: { contest } }),
  ]);
  return json(201, { entry: { id, contest, kind, status: 'pending_review' } });
}

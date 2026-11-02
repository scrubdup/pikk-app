// Pluggable ID/age verification. Adapter interface:
//   id, method, isConfigured(env), createSession(env,{userId,redirectUri},fetchImpl) -> {providerRef, hostedUrl},
//   verifyWebhook(env, req, raw) -> bool, parseEvent(json) -> {eventId, providerRef, status, occurredAt} | null
// status ∈ pending | verified | declined | needs_review | expired.
// Only the 18+ result, method, date and provider reference are ever stored. No images, no DOB.
import { ApiError, json } from '../http.js';
import { requireVerified } from '../auth.js';
import { rateLimit } from '../ratelimit.js';
import { newId } from '../crypto.js';
import { auditStmt, audit } from '../audit.js';
import { setAgeVerifiedStmt } from '../safety.js';
import { personaAdapter } from './persona.js';
import { diditAdapter } from './didit.js';

export const ADAPTERS = { persona: personaAdapter, didit: diditAdapter };
const nowIso = () => new Date().toISOString();

export function activeAdapter(env) {
  const a = ADAPTERS[env.ID_VERIFICATION_PROVIDER || 'persona'];
  return a && a.isConfigured(env) ? a : null;
}

export async function idvStatus(env, ctx) {
  const s = requireVerified(ctx);
  const a = activeAdapter(env);
  const u = await env.DB.prepare(`SELECT age_verified_18, age_verification_method, age_verified_at FROM users WHERE id = ?`).bind(s.user.id).first();
  if (u?.age_verified_18 === 1) return json(200, { status: 'verified', connected: !!a, method: u.age_verification_method, verified_at: u.age_verified_at });
  if (!a) return json(200, { status: 'not_connected', connected: false });
  const last = await env.DB.prepare(`SELECT status FROM id_verification_sessions WHERE user_id = ? AND provider = ? ORDER BY created_at DESC LIMIT 1`).bind(s.user.id, a.id).first();
  return json(200, { status: last ? last.status : 'not_started', connected: true, provider: a.id });
}

export async function startIdv(env, req, ctx, fetchImpl = fetch) {
  const s = requireVerified(ctx);
  const a = activeAdapter(env);
  if (!a) throw new ApiError(503, 'provider_not_connected', 'ID verification provider not connected');
  if (s.user.age_verified_18) throw new ApiError(409, 'already_verified', 'Already verified');
  await rateLimit(env, `idv:start:${s.user.id}`, 5, 86400);
  const redirectUri = env.PUBLIC_APP_URL ? `${String(env.PUBLIC_APP_URL).replace(/\/$/, '')}/#/verify-age?return=1` : undefined;
  let session;
  try { session = await a.createSession(env, { userId: s.user.id, redirectUri }, fetchImpl); }
  catch { throw new ApiError(502, 'provider_error', 'Could not start verification with the provider'); }
  const t = nowIso();
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO id_verification_sessions(id,user_id,provider,provider_ref,status,created_at,updated_at) VALUES (?,?,?,?, 'pending', ?, ?)`)
      .bind(newId('idv'), s.user.id, a.id, session.providerRef, t, t),
    auditStmt(env, { actor: s.user.id, action: 'idv.started', target: s.user.id, meta: { provider: a.id, ref: session.providerRef } }),
  ]);
  return json(201, { status: 'pending', provider: a.id, hosted_url: session.hostedUrl });
}

export async function idvWebhook(env, req, providerId, ip) {
  const a = ADAPTERS[providerId];
  if (!a || !a.isConfigured(env)) throw new ApiError(503, 'provider_not_connected', 'ID verification provider not connected');
  await rateLimit(env, `idv:webhook:${providerId}:${ip}`, 300, 60);
  const raw = await req.text();
  if (raw.length > 512 * 1024) throw new ApiError(413, 'payload_too_large', 'Body too large');
  if (!(await a.verifyWebhook(env, req, raw))) throw new ApiError(400, 'invalid_signature', 'Webhook signature verification failed');
  let evt; try { evt = JSON.parse(raw); } catch { throw new ApiError(400, 'invalid_json', 'Invalid JSON'); }
  const e = a.parseEvent(evt); // PII in the payload is discarded here; nothing raw is stored.
  if (!e) return json(200, { received: true, ignored: true });
  const ins = await env.DB.prepare(`INSERT INTO id_verification_events(provider,event_id,received_at) VALUES (?,?,?) ON CONFLICT DO NOTHING RETURNING event_id`)
    .bind(a.id, e.eventId, nowIso()).first();
  if (!ins) return json(200, { received: true, duplicate: true });
  const sess = await env.DB.prepare(`SELECT * FROM id_verification_sessions WHERE provider = ? AND provider_ref = ?`).bind(a.id, e.providerRef).first();
  if (!sess) { await audit(env, { action: 'idv.unknown_session', meta: { provider: a.id, ref: e.providerRef } }); return json(200, { received: true, ignored: true }); }
  if (sess.status === 'verified' || e.status === 'pending') return json(200, { received: true, status: sess.status });
  const t = nowIso();
  const stmts = [
    env.DB.prepare(`UPDATE id_verification_sessions SET status = ?, updated_at = ? WHERE id = ?`).bind(e.status, t, sess.id),
    auditStmt(env, { action: `idv.${e.status}`, target: sess.user_id, meta: { provider: a.id, ref: e.providerRef, event: e.eventId } }),
  ];
  if (e.status === 'verified') {
    stmts.push(setAgeVerifiedStmt(env, sess.user_id, `${a.id}:${a.method}`, e.occurredAt || t));
    stmts.push(env.DB.prepare(`UPDATE users SET age_verification_ref = ? WHERE id = ?`).bind(`${a.id}:${e.providerRef}`, sess.user_id));
  }
  await env.DB.batch(stmts);
  return json(200, { received: true, status: e.status });
}

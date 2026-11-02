// Biometric notice + written consent. DRAFT — LAWYER REVIEW REQUIRED before production use.
import { ApiError, json, readJson, clientIp } from '../http.js';
import { requireVerified } from '../auth.js';
import { rateLimit } from '../ratelimit.js';
import { newId, sha256Hex } from '../crypto.js';
import { auditStmt } from '../audit.js';
import { requireString } from '../validate.js';

import { CONSENT_VERSION, CONSENT_TEXT } from './consent-text.js';
export { CONSENT_VERSION, CONSENT_TEXT };

let hashCache = null;
export async function consentHash() { return hashCache || (hashCache = await sha256Hex(CONSENT_TEXT)); }

export async function hasCurrentConsent(env, userId) {
  return !!(await env.DB.prepare(`SELECT 1 FROM biometric_consents WHERE user_id = ? AND consent_version = ?`).bind(userId, CONSENT_VERSION).first());
}

export async function getConsent(env, ctx) {
  const s = requireVerified(ctx);
  return json(200, { version: CONSENT_VERSION, text: CONSENT_TEXT, sha256: await consentHash(), draft: true, consented: await hasCurrentConsent(env, s.user.id) });
}

export async function postConsent(env, req, ctx) {
  const s = requireVerified(ctx);
  await rateLimit(env, `idv:consent:${s.user.id}`, 10, 3600);
  const b = await readJson(req);
  if (b.agree !== true) throw new ApiError(422, 'consent_required', 'You must check the consent box');
  if (b.version !== CONSENT_VERSION) throw new ApiError(409, 'consent_outdated', 'Consent text has changed; please re-read it');
  if (b.sha256 !== await consentHash()) throw new ApiError(409, 'consent_outdated', 'Consent text has changed; please re-read it');
  const name = requireString(b, 'full_name', { min: 3, max: 120 }).trim();
  if (!/\S+\s+\S+/.test(name)) throw new ApiError(422, 'validation_failed', 'Type your full name (first and last)');
  const salt = env.IP_HASH_SALT || (env.EXPOSE_VERIFY_TOKEN === 'true' ? 'dev-only-ip-salt' : null);
  if (!salt) throw new ApiError(503, 'consent_not_configured', 'Consent recording is not configured (IP_HASH_SALT missing)');
  const ipHash = await sha256Hex(`${salt}:${clientIp(req)}`);
  const t = new Date().toISOString(); const id = newId('bc');
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO biometric_consents(id,user_id,consent_version,consent_sha256,signature_name,ip_sha256,consented_at) VALUES (?,?,?,?,?,?,?)
      ON CONFLICT(user_id, consent_version) DO NOTHING`).bind(id, s.user.id, CONSENT_VERSION, await consentHash(), name, ipHash, t),
    auditStmt(env, { actor: s.user.id, action: 'idv.biometric_consent', target: s.user.id, meta: { version: CONSENT_VERSION } }),
  ]);
  return json(201, { consented: true, version: CONSENT_VERSION, consented_at: t });
}

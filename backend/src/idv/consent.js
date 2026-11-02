// Biometric notice + written consent. DRAFT — LAWYER REVIEW REQUIRED before production use.
import { ApiError, json, readJson, clientIp } from '../http.js';
import { requireVerified } from '../auth.js';
import { rateLimit } from '../ratelimit.js';
import { newId, sha256Hex } from '../crypto.js';
import { auditStmt } from '../audit.js';
import { requireString } from '../validate.js';

export const CONSENT_VERSION = '2026-11-02.draft1';
export const CONSENT_TEXT = `PIKK Biometric Information Notice and Written Consent (DRAFT — lawyer review required)

1. What is collected. To verify that you are 18 or older, our vendor Persona Identities, Inc. ("Persona") collects a photo of your government ID and a selfie/liveness video, and creates face geometry (a biometric identifier) from them to compare your face with your ID photo.
2. Purpose. This is used only to verify your age (18+) and identity for PIKK Dating and as a contestant in 18+ contests. It is not used for advertising, profiling or any other purpose.
3. Who processes it. Persona processes this data as PIKK's vendor. PIKK itself never receives or stores your ID images, selfie, face geometry or date of birth. PIKK stores only: whether you are verified 18+, the method, the date and Persona's reference number.
4. Retention and destruction. Persona keeps the data only under the retention policy PIKK configures and destroys it when the verification purpose is satisfied, and in all cases no later than the earlier of (a) when the purpose is satisfied or (b) 3 years after your last interaction with PIKK (Illinois), or within the time required by Texas and Washington law, whichever is sooner. See the PIKK Biometric Retention Policy at #/biometric-policy.
5. No sale. PIKK and Persona will not sell, lease, trade or otherwise profit from your biometric data.
6. Your choice. You may decline. If you decline, you can still use PIKK, view and vote in contests, but you cannot use Dating or enter 18+ contests as a contestant.

By checking the box and typing your full legal name, you give written consent (electronic signature) to the collection, storage and use of your biometric identifiers and information as described above.`;

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
  const ipHash = await sha256Hex(`${env.IP_HASH_SALT || 'pikk'}:${clientIp(req)}`);
  const t = new Date().toISOString(); const id = newId('bc');
  await env.DB.batch([
    env.DB.prepare(`INSERT INTO biometric_consents(id,user_id,consent_version,consent_sha256,signature_name,ip_sha256,consented_at) VALUES (?,?,?,?,?,?,?)
      ON CONFLICT(user_id, consent_version) DO NOTHING`).bind(id, s.user.id, CONSENT_VERSION, await consentHash(), name, ipHash, t),
    auditStmt(env, { actor: s.user.id, action: 'idv.biometric_consent', target: s.user.id, meta: { version: CONSENT_VERSION } }),
  ]);
  return json(201, { consented: true, version: CONSENT_VERSION, consented_at: t });
}

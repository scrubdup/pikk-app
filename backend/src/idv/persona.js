// Persona adapter. Docs checked 2026-11-02:
//  - Create inquiry: POST https://api.withpersona.com/api/v1/inquiries (Bearer API key),
//    data.attributes.inquiry-template-id (itmpl_…) or template-id (tmpl_…), redirect-uri;
//    meta.auto-create-account-reference-id, meta.auto-create-one-time-link -> meta.one-time-link (hosted URL).
//  - Webhook header `Persona-Signature`: space-separated sets "t=<unix>,v1=<hex HMAC-SHA256(secret, `${t}.${rawBody}`)>";
//    accept if ANY v1 matches (secret rotation). Event: data.id (evt_), data.attributes.name (e.g. inquiry.approved),
//    data.attributes.payload.data = inquiry {id, attributes.status, attributes.reference-id}.
import { hmacSha256Hex, timingSafeEqual } from '../crypto.js';

const API = 'https://api.withpersona.com/api/v1';
const TOLERANCE_SEC = 300;

export async function verifyPersonaSignature(secret, header, raw, nowSec = Math.floor(Date.now() / 1000)) {
  if (!secret || !header) return false;
  const expectedFor = new Map();
  let ok = false;
  for (const set of header.trim().split(/\s+/)) {
    const kv = Object.fromEntries(set.split(',').map(p => { const i = p.indexOf('='); return i < 0 ? [p, ''] : [p.slice(0, i), p.slice(i + 1)]; }));
    const t = Number(kv.t);
    if (!Number.isInteger(t) || !kv.v1 || Math.abs(nowSec - t) > TOLERANCE_SEC) continue;
    if (!expectedFor.has(t)) expectedFor.set(t, await hmacSha256Hex(secret, `${t}.${raw}`));
    if (timingSafeEqual(kv.v1, expectedFor.get(t))) ok = true;
  }
  return ok;
}

/** Map Persona inquiry status / event name -> PIKK status. Unknown values are never "verified". */
export function mapPersonaStatus(eventName, inquiryStatus) {
  if (eventName === 'inquiry.approved' || inquiryStatus === 'approved') return 'verified';
  if (eventName === 'inquiry.declined' || inquiryStatus === 'declined') return 'declined';
  if (eventName === 'inquiry.marked-for-review' || inquiryStatus === 'needs_review') return 'needs_review';
  if (eventName === 'inquiry.expired' || inquiryStatus === 'expired') return 'expired';
  if (eventName === 'inquiry.failed' || inquiryStatus === 'failed') return 'declined';
  return 'pending';
}

export const personaAdapter = {
  id: 'persona',
  method: 'government_id+selfie',
  signatureHeader: 'Persona-Signature',
  isConfigured: (env) => !!(env.PERSONA_API_KEY && env.PERSONA_TEMPLATE_ID && env.PERSONA_WEBHOOK_SECRET),

  async createSession(env, { userId, redirectUri }, fetchImpl = fetch) {
    const tmpl = env.PERSONA_TEMPLATE_ID;
    const attributes = tmpl.startsWith('itmpl_') ? { 'inquiry-template-id': tmpl } : { 'template-id': tmpl };
    if (redirectUri) attributes['redirect-uri'] = redirectUri;
    const res = await fetchImpl(`${env.PERSONA_API_BASE || API}/inquiries`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.PERSONA_API_KEY}`, 'Content-Type': 'application/json', Accept: 'application/json', 'Key-Inflection': 'kebab' },
      body: JSON.stringify({ data: { attributes }, meta: { 'auto-create-account-reference-id': userId, 'auto-create-one-time-link': true } }),
    });
    if (!res.ok) { const e = new Error(`persona_create_failed_${res.status}`); e.providerStatus = res.status; throw e; }
    const body = await res.json();
    const ref = body?.data?.id; const url = body?.meta?.['one-time-link'];
    if (typeof ref !== 'string' || typeof url !== 'string' || !url.startsWith('https://')) throw new Error('persona_bad_response');
    return { providerRef: ref, hostedUrl: url };
  },

  async verifyWebhook(env, req, raw) {
    return verifyPersonaSignature(env.PERSONA_WEBHOOK_SECRET, req.headers.get('Persona-Signature'), raw);
  },

  /** Returns only what PIKK keeps: event id, provider ref, account reference, status. Drops all PII. */
  parseEvent(evt) {
    const d = evt?.data; const inq = d?.attributes?.payload?.data;
    if (typeof d?.id !== 'string' || typeof d?.attributes?.name !== 'string' || typeof inq?.id !== 'string') return null;
    return {
      eventId: d.id,
      providerRef: inq.id,
      status: mapPersonaStatus(d.attributes.name, inq.attributes?.status),
      occurredAt: typeof d.attributes['created-at'] === 'string' ? d.attributes['created-at'] : null,
    };
  },
};

import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { call, newUser } from './helpers.js';
import { hmacSha256Hex } from '../src/crypto.js';
import { loadSession } from '../src/auth.js';
import { startIdv, idvWebhook, idvStatus } from '../src/idv/index.js';
import { verifyPersonaSignature, mapPersonaStatus, personaAdapter } from '../src/idv/persona.js';
import { diditAdapter } from '../src/idv/didit.js';

const SECRET = 'wbhsec_test_only';
const penv = () => ({ ...env, PERSONA_API_KEY: 'persona_sandbox_test', PERSONA_TEMPLATE_ID: 'itmpl_test', PERSONA_WEBHOOK_SECRET: SECRET });
const ctxFor = async (e, u) => ({ session: await loadSession(e, new Request('https://api.test/', { headers: { Cookie: u.cookie } })) });
const fakeFetch = (calls, ref = 'inq_' + Math.random().toString(36).slice(2)) => async (url, init) => {
  calls.push({ url, init });
  return new Response(JSON.stringify({ data: { id: ref, type: 'inquiry', attributes: { status: 'created', birthdate: '1990-01-01' } }, meta: { 'one-time-link': 'https://withpersona.com/verify?code=abc' } }), { status: 201 });
};
async function signed(body, secret = SECRET, t = Math.floor(Date.now() / 1000)) {
  const raw = JSON.stringify(body);
  return new Request('https://api.test/webhooks/idv/persona', { method: 'POST', headers: { 'Persona-Signature': `t=${t},v1=${await hmacSha256Hex(secret, `${t}.${raw}`)}` }, body: raw });
}
const event = (name, ref, status, id = 'evt_' + Math.random().toString(36).slice(2)) => ({ data: { type: 'event', id, attributes: { name, 'created-at': '2026-11-02T16:00:00.000Z', payload: { data: { type: 'inquiry', id: ref, attributes: { status, 'name-first': 'Jane', birthdate: '1990-01-01' } } } } } });
const userRow = (id) => env.DB.prepare(`SELECT * FROM users WHERE id = ?`).bind(id).first();
const resJson = async (r) => ({ status: r.status, json: await r.json() });

describe('fail closed with no provider secrets', () => {
  it('status reports not_connected, start returns 503, webhook returns 503, dating stays gated', async () => {
    const u = await newUser();
    expect((await call('GET', '/verification/age', { cookie: u.cookie })).json.status).toBe('not_connected');
    const s = await call('POST', '/verification/age/start', { cookie: u.cookie, body: {} });
    expect(s.status).toBe(503); expect(s.json.error.code).toBe('provider_not_connected');
    expect((await call('POST', '/webhooks/idv/persona', { body: event('inquiry.approved', 'inq_x', 'approved'), origin: null })).status).toBe(503);
    expect((await call('POST', '/webhooks/idv/didit', { body: {}, origin: null })).status).toBe(503);
    expect((await call('GET', '/dating/eligibility', { cookie: u.cookie })).status).toBe(403);
    expect((await userRow(u.id)).age_verified_18).toBe(0);
  });
  it('requires sign-in', async () => { expect((await call('GET', '/verification/age')).status).toBe(401); });
  it('Didit is a stub that never connects', () => { expect(diditAdapter.isConfigured({ DIDIT_API_KEY: 'x' })).toBe(false); });
});

describe('Persona adapter', () => {
  it('signature: accepts any matching v1 (rotation), rejects bad/stale/unsigned', async () => {
    const t = Math.floor(Date.now() / 1000); const raw = '{"a":1}';
    const good = await hmacSha256Hex(SECRET, `${t}.${raw}`);
    expect(await verifyPersonaSignature(SECRET, `t=${t},v1=deadbeef t=${t},v1=${good}`, raw)).toBe(true);
    expect(await verifyPersonaSignature(SECRET, `t=${t},v1=${good}`, raw + ' ')).toBe(false);
    expect(await verifyPersonaSignature(SECRET, `t=${t - 1000},v1=${await hmacSha256Hex(SECRET, `${t - 1000}.${raw}`)}`, raw)).toBe(false);
    expect(await verifyPersonaSignature(SECRET, null, raw)).toBe(false);
  });
  it('status mapping never treats unknown as verified', () => {
    expect(mapPersonaStatus('inquiry.approved')).toBe('verified');
    expect(mapPersonaStatus('inquiry.declined')).toBe('declined');
    expect(mapPersonaStatus('inquiry.marked-for-review')).toBe('needs_review');
    expect(mapPersonaStatus('inquiry.completed', 'completed')).toBe('pending');
    expect(mapPersonaStatus('inquiry.something-new', 'weird')).toBe('pending');
  });
  it('createSession posts the documented request', async () => {
    const calls = [];
    const r = await personaAdapter.createSession(penv(), { userId: 'usr_1', redirectUri: 'https://x/#/verify-age' }, fakeFetch(calls, 'inq_1'));
    expect(r).toEqual({ providerRef: 'inq_1', hostedUrl: 'https://withpersona.com/verify?code=abc' });
    expect(calls[0].url).toBe('https://api.withpersona.com/api/v1/inquiries');
    expect(calls[0].init.headers.Authorization).toBe('Bearer persona_sandbox_test');
    const b = JSON.parse(calls[0].init.body);
    expect(b.data.attributes['inquiry-template-id']).toBe('itmpl_test');
    expect(b.meta['auto-create-account-reference-id']).toBe('usr_1');
    expect(b.meta['auto-create-one-time-link']).toBe(true);
  });
});

describe('start + webhook flow (mocked Persona)', () => {
  async function started() {
    const e = penv(); const u = await newUser(); const ref = 'inq_' + Math.random().toString(36).slice(2);
    const r = await resJson(await startIdv(e, new Request('https://api.test/verification/age/start', { method: 'POST' }), await ctxFor(e, u), fakeFetch([], ref)));
    expect(r.status).toBe(201); expect(r.json.hosted_url).toMatch(/^https:\/\//); expect(r.json.status).toBe('pending');
    return { e, u, ref };
  }

  it('approved sets age_verified_18 + method/date/ref only, idempotent, audited', async () => {
    const { e, u, ref } = await started();
    expect((await resJson(await idvStatus(e, await ctxFor(e, u)))).json.status).toBe('pending');
    const ev = event('inquiry.approved', ref, 'approved');
    const r1 = await resJson(await idvWebhook(e, await signed(ev), 'persona', '1.2.3.4'));
    expect(r1.json.status).toBe('verified');
    const r2 = await resJson(await idvWebhook(e, await signed(ev), 'persona', '1.2.3.4'));
    expect(r2.json.duplicate).toBe(true);
    const row = await userRow(u.id);
    expect(row.age_verified_18).toBe(1);
    expect(row.age_verification_method).toBe('persona:government_id+selfie');
    expect(row.age_verified_at).toBe('2026-11-02T16:00:00.000Z');
    expect(row.age_verification_ref).toBe(`persona:${ref}`);
    expect(JSON.stringify(row)).not.toMatch(/1990-01-01|Jane/);
    const aud = (await env.DB.prepare(`SELECT * FROM audit_log WHERE action = 'idv.verified' AND target = ?`).bind(u.id).all()).results;
    expect(aud.length).toBe(1);
    expect((await call('GET', '/dating/eligibility', { cookie: u.cookie })).status).toBe(200);
    // a later decline cannot undo an approved result silently
    await idvWebhook(e, await signed(event('inquiry.declined', ref, 'declined')), 'persona', '1.2.3.4');
    expect((await userRow(u.id)).age_verified_18).toBe(1);
  });

  it('declined and needs_review do not verify', async () => {
    for (const [name, st, want] of [['inquiry.declined', 'declined', 'declined'], ['inquiry.marked-for-review', 'needs_review', 'needs_review']]) {
      const { e, u, ref } = await started();
      await idvWebhook(e, await signed(event(name, ref, st)), 'persona', '1.2.3.4');
      expect((await userRow(u.id)).age_verified_18).toBe(0);
      expect((await resJson(await idvStatus(e, await ctxFor(e, u)))).json.status).toBe(want);
    }
  });

  it('unsigned / wrong-secret webhooks are rejected', async () => {
    const { e, u, ref } = await started();
    const ev = event('inquiry.approved', ref, 'approved');
    await expect(idvWebhook(e, new Request('https://api.test/x', { method: 'POST', body: JSON.stringify(ev) }), 'persona', '1.2.3.4')).rejects.toMatchObject({ status: 400 });
    await expect(idvWebhook(e, await signed(ev, 'wrong'), 'persona', '1.2.3.4')).rejects.toMatchObject({ status: 400 });
    expect((await userRow(u.id)).age_verified_18).toBe(0);
  });

  it('events for unknown inquiries are ignored', async () => {
    const r = await resJson(await idvWebhook(penv(), await signed(event('inquiry.approved', 'inq_unknown', 'approved')), 'persona', '1.2.3.4'));
    expect(r.json.ignored).toBe(true);
  });

  it('provider errors fail closed', async () => {
    const e = penv(); const u = await newUser();
    const bad = async () => new Response('{}', { status: 500 });
    await expect(startIdv(e, new Request('https://api.test/', { method: 'POST' }), await ctxFor(e, u), bad)).rejects.toMatchObject({ status: 502 });
  });
});

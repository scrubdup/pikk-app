import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { call, newUser, staff } from './helpers.js';
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
import { CONSENT_VERSION, consentHash } from '../src/idv/consent.js';
async function consent(u, over = {}) {
  return call('POST', '/verification/age/consent', { cookie: u.cookie, body: { agree: true, version: CONSENT_VERSION, sha256: await consentHash(), full_name: 'Test Person', ...over } });
}
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
    await consent(u);
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
    await expect(idvWebhook(e, new Request('https://api.test/x', { method: 'POST', body: JSON.stringify(ev) }), 'persona', '1.2.3.4')).rejects.toMatchObject({ status: 401 });
    await expect(idvWebhook(e, await signed(ev, 'wrong'), 'persona', '1.2.3.4')).rejects.toMatchObject({ status: 401 });
    expect((await userRow(u.id)).age_verified_18).toBe(0);
  });

  it('events for unknown inquiries are ignored', async () => {
    const r = await resJson(await idvWebhook(penv(), await signed(event('inquiry.approved', 'inq_unknown', 'approved')), 'persona', '1.2.3.4'));
    expect(r.json.ignored).toBe(true);
  });

  it('provider errors fail closed', async () => {
    const e = penv(); const u = await newUser(); await consent(u);
    const bad = async () => new Response('{}', { status: 500 });
    await expect(startIdv(e, new Request('https://api.test/', { method: 'POST' }), await ctxFor(e, u), bad)).rejects.toMatchObject({ status: 502 });
  });
});

describe('biometric consent (BIPA/CUBI) gates start', () => {
  it('start returns 403 without current consent; consent recorded with hash, ip hash, signature + audit', async () => {
    const e = penv(); const u = await newUser();
    await expect(startIdv(e, new Request('https://api.test/', { method: 'POST' }), await ctxFor(e, u), fakeFetch([]))).rejects.toMatchObject({ status: 403, code: 'biometric_consent_required' });
    const g = await call('GET', '/verification/age/consent', { cookie: u.cookie });
    expect(g.json.draft).toBe(true); expect(g.json.text).toMatch(/lawyer review required/); expect(g.json.consented).toBe(false);
    expect((await consent(u, { agree: false })).status).toBe(422);
    expect((await consent(u, { full_name: 'X' })).status).toBe(422);
    expect((await consent(u, { version: 'old' })).status).toBe(409);
    expect((await consent(u, { sha256: 'deadbeef' })).status).toBe(409);
    expect((await consent(u)).status).toBe(201);
    const row = await env.DB.prepare(`SELECT * FROM biometric_consents WHERE user_id = ?`).bind(u.id).first();
    expect(row.consent_version).toBe(CONSENT_VERSION); expect(row.consent_sha256).toBe(await consentHash());
    expect(row.signature_name).toBe('Test Person'); expect(row.ip_sha256).toMatch(/^[0-9a-f]{64}$/);
    expect((await env.DB.prepare(`SELECT COUNT(*) n FROM audit_log WHERE action='idv.biometric_consent' AND target=?`).bind(u.id).first()).n).toBe(1);
    const r = await startIdv(e, new Request('https://api.test/', { method: 'POST' }), await ctxFor(e, u), fakeFetch([]));
    expect(r.status).toBe(201);
  });
  it('consent requires sign-in', async () => { expect((await call('POST', '/verification/age/consent', { body: { agree: true } })).status).toBe(401); });
});

describe('webhook secret rotation (PIKK side)', () => {
  it('accepts either of comma-separated secrets, 401 on others', async () => {
    const e = { ...penv(), PERSONA_WEBHOOK_SECRET: `old_secret, ${SECRET}` };
    const u = await newUser(); await consent(u); const ref = 'inq_rot' + Math.random().toString(36).slice(2);
    await startIdv(e, new Request('https://api.test/', { method: 'POST' }), await ctxFor(e, u), fakeFetch([], ref));
    expect((await idvWebhook(e, await signed(event('inquiry.declined', ref, 'declined'), 'old_secret'), 'persona', '1.1.1.1')).status).toBe(200);
    await expect(idvWebhook(e, await signed(event('inquiry.approved', ref, 'approved'), 'nope'), 'persona', '1.1.1.1')).rejects.toMatchObject({ status: 401 });
  });
});

describe('Twerk Contest: women-only contestants, open viewing/voting', () => {
  const verify = (id) => env.DB.prepare(`UPDATE users SET age_verified_18=1, age_verification_method='test', age_verified_at='2026-11-02T00:00:00Z' WHERE id=?`).bind(id).run();
  const enter = (u, path = 'entries') => call('POST', `/contests/twerk/${path}`, { cookie: u.cookie, body: { title: 'My entry' } });

  it('verified female can submit and go live', async () => {
    const u = await newUser();
    expect((await call('POST', '/account/gender', { cookie: u.cookie, body: { gender: 'female' } })).status).toBe(200);
    await verify(u.id);
    expect((await call('GET', '/contests/twerk/eligibility', { cookie: u.cookie })).json.can_enter).toBe(true);
    expect((await enter(u)).status).toBe(201);
    expect((await enter(u, 'live')).json.entry.kind).toBe('live');
  });
  it('break: female without ID verification gets 403 age_verification_required', async () => {
    const u = await newUser(); await call('POST', '/account/gender', { cookie: u.cookie, body: { gender: 'female' } });
    const r = await enter(u); expect(r.status).toBe(403); expect(r.json.error.code).toBe('age_verification_required');
  });
  it('break: verified male / nonbinary / unset gender get 403 contestant_not_eligible', async () => {
    for (const g of ['male', 'nonbinary', 'undisclosed', null]) {
      const u = await newUser();
      if (g) await call('POST', '/account/gender', { cookie: u.cookie, body: { gender: g } });
      await verify(u.id);
      const r = await enter(u); expect(r.status).toBe(403); expect(r.json.error.code).toBe('contestant_not_eligible');
      expect((await enter(u, 'live')).status).toBe(403);
    }
  });
  it('break: client cannot smuggle gender/age into entry body or set invalid gender', async () => {
    const u = await newUser();
    const r = await call('POST', '/contests/twerk/entries', { cookie: u.cookie, body: { title: 't', gender: 'female', age_verified_18: true } });
    expect(r.status).toBe(403);
    expect((await call('POST', '/account/gender', { cookie: u.cookie, body: { gender: 'woman!' } })).status).toBe(422);
    expect((await call('POST', '/contests/twerk/entries', { body: { title: 't' } })).status).toBe(401);
    expect((await call('POST', '/contests/nope/entries', { cookie: u.cookie, body: { title: 't' } })).status).toBe(404);
  });
  it('voting needs no ID verification or gender; any signed-in male voter can vote once, not for self', async () => {
    const c = await newUser(); await call('POST', '/account/gender', { cookie: c.cookie, body: { gender: 'female' } }); await verify(c.id);
    const entry = (await enter(c)).json.entry.id;
    const v = await newUser();
    await call('POST', '/account/gender', { cookie: v.cookie, body: { gender: 'male' } });
    expect((await call('POST', '/contests/twerk/votes', { cookie: v.cookie, body: { entry_id: entry } })).status).toBe(404); // pending moderation
    await env.DB.prepare(`UPDATE contest_entries SET status='approved' WHERE id=?`).bind(entry).run(); await call('POST', '/account/gender', { cookie: v.cookie, body: { gender: 'male' } });
    expect((await call('POST', '/contests/twerk/votes', { cookie: v.cookie, body: { entry_id: entry } })).status).toBe(200);
    expect((await call('POST', '/contests/twerk/votes', { cookie: v.cookie, body: { entry_id: entry } })).status).toBe(200);
    expect((await env.DB.prepare(`SELECT COUNT(*) n FROM contest_votes WHERE entry_id=?`).bind(entry).first()).n).toBe(1);
    expect((await call('POST', '/contests/twerk/votes', { cookie: c.cookie, body: { entry_id: entry } })).status).toBe(422);
  });
});

describe('gender lock (audit must-fix)', () => {
  const verify = (id) => env.DB.prepare(`UPDATE users SET age_verified_18=1, age_verification_method='test', age_verified_at='2026-11-02T00:00:00Z' WHERE id=?`).bind(id).run();
  it('probe: verified male tries to switch to female, then enter -> still 403', async () => {
    const u = await newUser();
    await call('POST', '/account/gender', { cookie: u.cookie, body: { gender: 'male' } });
    await verify(u.id);
    for (let i = 0; i < 6; i++) {
      const r = await call('POST', '/account/gender', { cookie: u.cookie, body: { gender: 'female' } });
      expect([409, 429]).toContain(r.status);
      if (r.status === 409) expect(r.json.error.code).toBe('gender_locked');
    }
    expect((await env.DB.prepare(`SELECT gender FROM users WHERE id=?`).bind(u.id).first()).gender).toBe('male');
    const e = await call('POST', '/contests/twerk/entries', { cookie: u.cookie, body: { title: 'x' } });
    expect(e.status).toBe(403); expect(e.json.error.code).toBe('contestant_not_eligible');
    expect((await call('GET', '/account/gender', { cookie: u.cookie })).json.locked).toBe(true);
  });
  it('unverified account with an entry is locked too; unset+unverified can set', async () => {
    const u = await newUser();
    expect((await call('GET', '/account/gender', { cookie: u.cookie })).json.locked).toBe(false);
    await call('POST', '/account/gender', { cookie: u.cookie, body: { gender: 'female' } }); await verify(u.id);
    await call('POST', '/contests/twerk/entries', { cookie: u.cookie, body: { title: 'x' } });
    await env.DB.prepare(`UPDATE users SET age_verified_18=0 WHERE id=?`).bind(u.id).run();
    expect((await call('POST', '/account/gender', { cookie: u.cookie, body: { gender: 'male' } })).status).toBe(409);
  });
  it('only moderator/admin can change a locked gender, with reason + audit', async () => {
    const u = await newUser(); await call('POST', '/account/gender', { cookie: u.cookie, body: { gender: 'male' } }); await verify(u.id);
    const body = { handle: u.handle, gender: 'female', reason: 'support ticket 123' };
    expect((await call('POST', '/admin/account/gender', { cookie: u.cookie, body })).status).toBe(403);
    expect((await call('POST', '/admin/account/gender', { cookie: (await staff('support_agent')).cookie, body })).status).toBe(403);
    const mod = await staff('moderator');
    expect((await call('POST', '/admin/account/gender', { cookie: mod.cookie, body: { ...body, reason: '' } })).status).toBe(422);
    expect((await call('POST', '/admin/account/gender', { cookie: mod.cookie, body })).status).toBe(200);
    const a = await env.DB.prepare(`SELECT * FROM audit_log WHERE action='admin.gender_changed' AND target=?`).bind(u.id).first();
    expect(a.actor_id).toBe(mod.id); expect(JSON.parse(a.meta)).toMatchObject({ from: 'male', to: 'female', reason: 'support ticket 123' });
  });
});

describe('consent IP salt fails closed outside dev', () => {
  it('returns 503 when IP_HASH_SALT missing and not in dev mode', async () => {
    const { postConsent } = await import('../src/idv/consent.js');
    const e = { ...env, EXPOSE_VERIFY_TOKEN: 'false', IP_HASH_SALT: undefined }; const u = await newUser();
    const req = new Request('https://api.test/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ agree: true, version: CONSENT_VERSION, sha256: await consentHash(), full_name: 'Test Person' }) });
    await expect(postConsent(e, req, await ctxFor(e, u))).rejects.toMatchObject({ status: 503, code: 'consent_not_configured' });
  });
});

describe('owner rule: gender chosen at signup, never self-changed', () => {
  const signupWith = async (gender) => {
    const h = 'g_' + Math.random().toString(36).slice(2, 10);
    return call('POST', '/auth/signup', { body: { email: `${h}@example.com`, password: 'correct horse 42', handle: h, display_name: 'G', gender }, ip: `10.9.${Math.floor(Math.random()*250)}.${Math.floor(Math.random()*250)}` });
  };
  it('signup stores gender server-side and it is locked immediately', async () => {
    const r = await signupWith('female');
    expect(r.status).toBe(201); expect(r.json.gender).toBe('female');
    const row = await env.DB.prepare(`SELECT gender, gender_set_at FROM users WHERE id=?`).bind(r.json.user.id).first();
    expect(row.gender).toBe('female'); expect(row.gender_set_at).toBeTruthy();
    await call('POST', '/auth/verify', { body: { token: r.json.verification.token } });
    for (const g of ['male', 'female', 'undisclosed']) {
      const x = await call('POST', '/account/gender', { cookie: r.cookie, body: { gender: g } });
      expect(x.status).toBe(409); expect(x.json.error.code).toBe('gender_locked');
    }
    expect((await call('GET', '/account/gender', { cookie: r.cookie })).json).toEqual({ gender: 'female', locked: true });
  });
  it('signup rejects an invalid or missing gender with 422', async () => {
    for (const g of ['robot', undefined, null, '']) {
      const r = await signupWith(g); expect(r.status).toBe(422); expect(r.json.error.details.gender).toMatch(/required/);
    }
  });
  it('legacy null account can set once, then locked (no verification needed)', async () => {
    const u = await newUser();
    expect((await call('GET', '/account/gender', { cookie: u.cookie })).json).toEqual({ gender: null, locked: false });
    expect((await call('POST', '/account/gender', { cookie: u.cookie, body: { gender: 'male' } })).status).toBe(200);
    const again = await call('POST', '/account/gender', { cookie: u.cookie, body: { gender: 'female' } });
    expect(again.status).toBe(409); expect(again.json.error.code).toBe('gender_locked');
    expect((await env.DB.prepare(`SELECT gender FROM users WHERE id=?`).bind(u.id).first()).gender).toBe('male');
  });
});

describe('set-once race (meta.changes)', () => {
  it('if gender gets set between the read and the UPDATE, returns 409 gender_locked with no audit row', async () => {
    const { setOwnGenderOnce, isGenderLocked } = await import('../src/contests.js');
    const u = await newUser(); // legacy: gender NULL
    expect(await isGenderLocked(env, u.id)).toBe(false); // handler's read passes...
    await env.DB.prepare(`UPDATE users SET gender='female', gender_set_at='x' WHERE id=?`).bind(u.id).run(); // ...concurrent request wins
    await expect(setOwnGenderOnce(env, u.id, 'male')).rejects.toMatchObject({ status: 409, code: 'gender_locked' });
    expect((await env.DB.prepare(`SELECT gender FROM users WHERE id=?`).bind(u.id).first()).gender).toBe('female');
    expect((await env.DB.prepare(`SELECT COUNT(*) n FROM audit_log WHERE action='account.gender_set' AND target=?`).bind(u.id).first()).n).toBe(0);
  });
  it('normal set-once writes exactly one audit row', async () => {
    const u = await newUser();
    expect((await call('POST', '/account/gender', { cookie: u.cookie, body: { gender: 'male' } })).status).toBe(200);
    expect((await env.DB.prepare(`SELECT COUNT(*) n FROM audit_log WHERE action='account.gender_set' AND target=?`).bind(u.id).first()).n).toBe(1);
  });
});

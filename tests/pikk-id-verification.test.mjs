import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('verification client fails closed without API and never fakes success', async () => {
  delete globalThis.window;
  const m = await import('../src/api/verification-client.js');
  assert.equal(m.isVerificationApiConfigured(), false);
  await assert.rejects(m.verificationApi.status(), { code: 'api_not_configured' });
  assert.equal(m.statusFromError({ code: 'api_not_configured' }), 'not_connected');
  assert.equal(m.statusFromError({ code: 'provider_not_connected' }), 'not_connected');
  assert.equal(m.statusFromError({ status: 401 }), 'signin');
  assert.equal(m.statusFromError(new Error('x')), 'not_connected');
  assert.match(m.STATUS_COPY.not_connected.text, /not connected/);
  for (const k of ['not_connected', 'not_started', 'pending', 'verified', 'declined']) assert.ok(m.STATUS_COPY[k]);
  assert.equal(m.safeHostedUrl('javascript:alert(1)'), null);
  assert.equal(m.safeHostedUrl('http://x'), null);
  assert.equal(m.safeHostedUrl('https://withpersona.com/verify?code=1'), 'https://withpersona.com/verify?code=1');
});

test('verify-age route is reachable from Dating and the Twerk gate', () => {
  assert.match(read('src/main.js'), /'\/verify-age': \{ render: renderVerifyAge, bind: bindVerifyAge \}/);
  assert.match(read('src/pages/dating.js'), /href="#\/verify-age"/);
  assert.match(read('src/pages/contest.js'), /href="#\/verify-age"/);
  const page = read('src/pages/verify-age.js');
  assert.doesNotMatch(page, /localStorage|setItem/);
  assert.match(page, /never stores your ID images or date of birth/);
});

test('written consent: checkbox + typed full name required; consent screen and policy route exist', async () => {
  const m = await import('../src/api/verification-client.js');
  assert.equal(m.validConsentSignature(false, 'Jane Doe'), false);
  assert.equal(m.validConsentSignature(true, 'Jane'), false);
  assert.equal(m.validConsentSignature(true, '  '), false);
  assert.equal(m.validConsentSignature(true, 'Jane Doe'), true);
  const page = read('src/pages/verify-age.js');
  assert.match(page, /Biometric notice &amp; written consent/); assert.match(page, /lawyer review required/); assert.match(page, /I decline/);
  assert.match(read('src/main.js'), /'\/biometric-policy': \{ render: renderBiometricPolicy, bind: bindBiometricPolicy \}/);
  const pol = read('src/pages/biometric-policy.js');
  for (const re of [/740 ILCS 14\/15/, /503\.001/, /3 years after your last interaction/, /not sell/, /lawyer review required/]) assert.match(pol, re);
  assert.match(read('src/pages/profile.js'), /id="accountGender"/);
});

test('policy page version comes from the shared consent-text source; profile shows lock', async () => {
  const shared = await import('../backend/src/idv/consent-text.js');
  assert.match(read('src/pages/biometric-policy.js'), /from '..\/..\/backend\/src\/idv\/consent-text.js'/);
  assert.match(read('backend/src/idv/consent.js'), /from '.\/consent-text.js'/);
  assert.doesNotMatch(read('backend/src/idv/consent.js'), /CONSENT_TEXT = `/);
  assert.ok(shared.CONSENT_VERSION && shared.CONSENT_TEXT.includes('lawyer review required'));
  const prof = read('src/pages/profile.js');
  assert.match(prof, /id="accountGenderLocked"/); assert.match(prof, /gender_locked/);
});

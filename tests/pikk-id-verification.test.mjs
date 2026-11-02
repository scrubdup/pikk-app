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

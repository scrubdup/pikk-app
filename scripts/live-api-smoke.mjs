// Run against an explicitly provided deployment, never localhost by default.
// Usage: PIKK_API_URL=https://your-api.example node scripts/live-api-smoke.mjs
// Read-only checks: no accounts, uploads, or billing are created.
import assert from 'node:assert/strict';

const raw = process.env.PIKK_API_URL;
if (!raw) {
  console.error('Set PIKK_API_URL to the deployed API origin; no request was sent.');
  process.exit(2);
}
let base;
try {
  base = new URL(raw);
} catch {
  console.error('PIKK_API_URL is not a valid URL; no request was sent.');
  process.exit(2);
}
if (base.protocol !== 'https:' || base.username || base.password || base.search || base.hash || base.pathname !== '/') {
  console.error('PIKK_API_URL must be an HTTPS origin ending in /, without credentials or query parameters.');
  process.exit(2);
}
const timeout = 10000;
async function check(label, path, expected, options = {}) {
  const response = await fetch(new URL(path, base), {
    ...options,
    redirect: 'manual',
    signal: AbortSignal.timeout(timeout),
    headers: { Accept: 'application/json', ...options.headers },
  });
  const type = response.headers.get('content-type') || '';
  assert.match(type, /application\/json/i, label + ': expected JSON response');
  const body = await response.json();
  assert.equal(response.status, expected, label + ': unexpected status: ' + JSON.stringify(body).slice(0, 250));
  console.log('PASS', label, response.status);
  return body;
}

try {
  const health = await check('public health', '/health', 200);
  assert.equal(health.ok, true);
  assert.equal(health.service, 'pikk-api');
  assert.equal(health.capabilities?.auth, true, 'auth capability not configured');
  console.log('PASS API identity and configured auth capability (not a login test)');
  const me = await check('unauthenticated session denied', '/auth/me', 401);
  assert.equal(me.error?.code, 'unauthenticated');
  const forged = await check('forged session cookie denied', '/auth/me', 401, {
    headers: { Cookie: '__Host-pikk_session=not-a-valid-session-token' },
  });
  assert.equal(forged.error?.code, 'unauthenticated');
  const invalidJson = await check('malformed login JSON rejected', '/auth/login', 400, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{"email":',
  });
  assert.equal(invalidJson.error?.code, 'invalid_json');
  const wrongContentType = await check('login requires JSON content type', '/auth/login', 415, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: '{"email":"test@example.invalid"}',
  });
  assert.equal(wrongContentType.error?.code, 'unsupported_media_type');
  const oversized = await check('oversized login JSON rejected', '/auth/login', 413, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'oversized@example.invalid', password: 'x'.repeat(20 * 1024) }),
  });
  assert.equal(oversized.error?.code, 'payload_too_large');
  const profile = await check('profile changes require a session', '/account/profile', 401, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ display_name: 'Unauthorized change' }),
  });
  assert.equal(profile.error?.code, 'unauthenticated');
  const login = await check('invalid login rejected', '/auth/login', 401, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'smoke-nonexistent-' + Date.now() + '@example.invalid', password: 'invalid-smoke-password' }),
  });
  assert.equal(login.error?.code, 'invalid_credentials');
  console.log('PASS read-only live smoke checks. Signup, real login, email delivery, Vault uploads and logout NOT verified.');
} catch (error) {
  console.error('FAIL live API smoke:', error.message);
  process.exitCode = 1;
}

import test from 'node:test';
import assert from 'node:assert/strict';
import { authApi, isPikkApiConfigured } from '../src/api/auth-client.js';

test('auth endpoints use credentialed cookie sessions and correct methods', async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;
  const requests = [];
  globalThis.window = { __PIKK_API_BASE__: 'https://api.example.test/' };
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    return { ok: true, json: async () => ({ user: { id: 'member-1' } }) };
  };
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  });
  assert.equal(isPikkApiConfigured(), true);
  await authApi.signup({ email: 'member@example.test', handle: 'member', displayName: 'Member', password: 'example-only' });
  await authApi.login({ email: 'member@example.test', password: 'example-only' });
  await authApi.me();
  await authApi.verifyEmail('verification-token');
  await authApi.resendVerification();
  await authApi.logout();
  assert.deepEqual(requests.map(({ url }) => new URL(url).pathname), [
    '/auth/signup', '/auth/login', '/auth/me', '/auth/verify', '/auth/resend-verification', '/auth/logout',
  ]);
  assert.deepEqual(requests.map(({ options }) => options.method), ['POST', 'POST', 'GET', 'POST', 'POST', 'POST']);
  for (const { options } of requests) assert.equal(options.credentials, 'include');
  assert.equal(JSON.parse(requests[0].options.body).signup_roles[0], 'member');
  assert.equal(requests[2].options.body, undefined);
});

test('auth API returns backend 401 without silently treating it as signed in', async (t) => {
  const originalFetch = globalThis.fetch;
  const originalWindow = globalThis.window;
  globalThis.window = { __PIKK_API_BASE__: 'https://api.example.test' };
  globalThis.fetch = async () => ({
    ok: false,
    status: 401,
    json: async () => ({ error: { code: 'unauthorized', message: 'Sign in required' } }),
  });
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalWindow === undefined) delete globalThis.window;
    else globalThis.window = originalWindow;
  });
  await assert.rejects(authApi.me(), (error) => error.status === 401 && error.code === 'unauthorized');
});

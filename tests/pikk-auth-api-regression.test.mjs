import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { authApi, isPikkApiConfigured, getPikkApiBase } from '../src/api/auth-client.js';
import {
  AUTH_STATES,
  resolveAuthState,
  noteLiveAuthMe,
  clearLiveAuthMe,
} from '../src/auth/readiness.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function withApiBase(base, fn) {
  return async (t) => {
    const originalFetch = globalThis.fetch;
    const originalWindow = globalThis.window;
    globalThis.window = { __PIKK_API_BASE__: base };
    clearLiveAuthMe();
    t.after(() => {
      globalThis.fetch = originalFetch;
      clearLiveAuthMe();
      if (originalWindow === undefined) delete globalThis.window;
      else globalThis.window = originalWindow;
    });
    await fn(t);
  };
}

test('unconfigured auth client throws api_not_configured and reports empty base', withApiBase('', async () => {
  assert.equal(isPikkApiConfigured(), false);
  assert.equal(getPikkApiBase(), '');
  await assert.rejects(authApi.me(), (err) => err.code === 'api_not_configured');
  await assert.rejects(authApi.login({ email: 'a@b.test', password: 'x' }), (err) => err.code === 'api_not_configured');
}));

test('configured auth signup/login/me/logout send credentials and map errors', withApiBase('https://api.example.test', async (t) => {
  const requests = [];
  globalThis.fetch = async (url, options = {}) => {
    requests.push({ url: String(url), options });
    const path = new URL(url).pathname;
    if (path === '/auth/signup') {
      return { ok: true, status: 201, json: async () => ({ user: { id: 'u1', handle: 'one', email_verified: false } }) };
    }
    if (path === '/auth/login') {
      return { ok: true, status: 200, json: async () => ({ user: { id: 'u1', handle: 'one' } }) };
    }
    if (path === '/auth/me') {
      return { ok: true, status: 200, json: async () => ({ user: { id: 'u1', handle: 'one', email_verified: false }, roles: ['user'] }) };
    }
    if (path === '/auth/logout') {
      return { ok: true, status: 200, json: async () => ({ ok: true }) };
    }
    return { ok: false, status: 500, json: async () => ({ error: { code: 'server_error', message: 'boom' } }) };
  };

  assert.equal(isPikkApiConfigured(), true);
  assert.equal(getPikkApiBase(), 'https://api.example.test');

  const signed = await authApi.signup({
    email: 'one@example.test', handle: 'one', displayName: 'One', password: 'example-only', gender: 'male',
  });
  assert.equal(signed.user.id, 'u1');
  await authApi.login({ email: 'one@example.test', password: 'example-only' });
  const me = await authApi.me();
  noteLiveAuthMe(me.user);
  assert.equal(resolveAuthState(), AUTH_STATES.AUTHENTICATED);
  await authApi.logout();
  clearLiveAuthMe();
  assert.equal(resolveAuthState(), AUTH_STATES.GUEST);

  assert.deepEqual(requests.map((r) => new URL(r.url).pathname), [
    '/auth/signup', '/auth/login', '/auth/me', '/auth/logout',
  ]);
  for (const r of requests) assert.equal(r.options.credentials, 'include');
  assert.equal(JSON.parse(requests[0].options.body).gender, 'male');

  globalThis.fetch = async () => ({
    ok: false,
    status: 403,
    json: async () => ({ error: { code: 'forbidden', message: 'No access', details: { reason: 'role' } }, request_id: 'req_1' }),
  });
  await assert.rejects(authApi.me(), (err) => (
    err.status === 403 && err.code === 'forbidden' && err.requestId === 'req_1' && err.details?.reason === 'role'
  ));
}));

test('two isolated simulated clients keep separate cookie jars and identities', withApiBase('https://api.example.test', async () => {
  /** @type {Map<string, {cookie: string, user: object}>} */
  const jars = new Map([
    ['clientA', { cookie: '', user: null }],
    ['clientB', { cookie: '', user: null }],
  ]);

  function installClient(name) {
    const jar = jars.get(name);
    globalThis.fetch = async (url, options = {}) => {
      const path = new URL(url).pathname;
      const headers = options.headers || {};
      // Simulate browser cookie jar isolation: only this client's cookie is sent.
      const sentCookie = jar.cookie;
      assert.equal(options.credentials, 'include');

      if (path === '/auth/signup' || path === '/auth/login') {
        const body = JSON.parse(options.body);
        const id = path === '/auth/signup'
          ? `u_${body.handle}`
          : (body.email.startsWith('a@') ? 'u_alpha' : 'u_beta');
        const handle = path === '/auth/signup' ? body.handle : (id === 'u_alpha' ? 'alpha' : 'beta');
        jar.cookie = `session=${id}`;
        jar.user = { id, handle, email: body.email, email_verified: false };
        return { ok: true, status: path === '/auth/signup' ? 201 : 200, json: async () => ({ user: jar.user }) };
      }
      if (path === '/auth/me') {
        if (!sentCookie || !jar.user) {
          return { ok: false, status: 401, json: async () => ({ error: { code: 'unauthorized', message: 'Sign in required' } }) };
        }
        assert.equal(sentCookie, jar.cookie, `${name} must present its own cookie`);
        return { ok: true, status: 200, json: async () => ({ user: jar.user, roles: ['user'] }) };
      }
      if (path === '/auth/logout') {
        jar.cookie = '';
        jar.user = null;
        return { ok: true, status: 200, json: async () => ({ ok: true }) };
      }
      return { ok: false, status: 404, json: async () => ({ error: { code: 'not_found', message: 'missing' } }) };
    };
  }

  // Client A signs up and is authenticated
  installClient('clientA');
  await authApi.signup({
    email: 'a@example.test', handle: 'alpha', displayName: 'Alpha', password: 'example-a',
  });
  const meA = await authApi.me();
  assert.equal(meA.user.handle, 'alpha');
  noteLiveAuthMe(meA.user);
  assert.equal(resolveAuthState(), AUTH_STATES.AUTHENTICATED);

  // Switch to client B — empty jar must 401 (no shared cookie)
  clearLiveAuthMe();
  installClient('clientB');
  await assert.rejects(authApi.me(), (err) => err.status === 401);
  assert.equal(resolveAuthState(), AUTH_STATES.GUEST);

  await authApi.login({ email: 'b@example.test', password: 'example-b' });
  const meB = await authApi.me();
  assert.equal(meB.user.handle, 'beta');
  noteLiveAuthMe(meB.user);
  assert.equal(resolveAuthState(), AUTH_STATES.AUTHENTICATED);

  // Back to A — still has its own cookie/user, not B's
  clearLiveAuthMe();
  installClient('clientA');
  const meA2 = await authApi.me();
  assert.equal(meA2.user.id, 'u_alpha');
  assert.notEqual(meA2.user.id, meB.user.id);
  await authApi.logout();
  await assert.rejects(authApi.me(), (err) => err.status === 401);
}));

test('production Pages workflow requires PIKK_API_BASE before build (no hardcoded host fallback)', () => {
  const workflow = readFileSync(join(root, '.github/workflows/pages.yml'), 'utf8');
  assert.match(workflow, /assert-pikk-api-base\.mjs --required/);
  assert.match(workflow, /PIKK_API_BASE:\s*\$\{\{\s*vars\.PIKK_API_BASE\s*\}\}/);
  assert.match(workflow, /VITE_PIKK_API_BASE:\s*\$\{\{\s*vars\.PIKK_API_BASE\s*\}\}/);
  assert.doesNotMatch(workflow, /pikk-api\.pikk-0fa\.workers\.dev/);
  assert.doesNotMatch(workflow, /VITE_PIKK_API_BASE:\s*['\"]https?:\/\//);
});

test('assert-pikk-api-base --required fails when unset and accepts https origin', () => {
  const script = join(root, 'scripts/assert-pikk-api-base.mjs');
  const fail = spawnSync(process.execPath, [script, '--required'], {
    env: { ...process.env, PIKK_API_BASE: '', VITE_PIKK_API_BASE: '' },
    encoding: 'utf8',
  });
  assert.notEqual(fail.status, 0);
  assert.match(fail.stderr + fail.stdout, /not configured|PIKK API base/i);

  const badPath = spawnSync(process.execPath, [script, '--required'], {
    env: { ...process.env, PIKK_API_BASE: 'https://api.example.test/v1' },
    encoding: 'utf8',
  });
  assert.notEqual(badPath.status, 0);

  const ok = spawnSync(process.execPath, [script, '--required'], {
    env: { ...process.env, PIKK_API_BASE: 'https://api.example.test' },
    encoding: 'utf8',
  });
  assert.equal(ok.status, 0, ok.stderr + ok.stdout);
  assert.match(ok.stdout, /api\.example\.test/);
});

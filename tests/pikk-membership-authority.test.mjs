import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const mem = {};
globalThis.localStorage = {
  getItem: (k) => mem[k] ?? null,
  setItem: (k, v) => { mem[k] = String(v); },
  removeItem: (k) => { delete mem[k]; },
};
globalThis.window = globalThis.window || globalThis;

const storePath = new URL('../src/store.js', import.meta.url);
const src = readFileSync(storePath, 'utf8');

test('store exports server membership authority helpers', () => {
  assert.match(src, /export function isApiConfigured/);
  assert.match(src, /export function setServerMembership/);
  assert.match(src, /export function getServerMembership/);
  assert.match(src, /server_authoritative/);
  assert.match(src, /When API is configured, localStorage \/ demo user\.membership is not authority/);
});

test('settings-store refuses local membership grant when API base is set', () => {
  const s = readFileSync(new URL('../src/settings-store.js', import.meta.url), 'utf8');
  assert.match(s, /never local-grant when API is live/);
  assert.match(s, /apiConfigured\(\)/);
});

test('runtime: API-configured path ignores local setMembership', async () => {
  globalThis.window.__PIKK_API_BASE__ = 'https://api.test';
  const mod = await import(`${storePath.href}?authority=${Date.now()}`);
  mod.signInLocal('authority_tester');
  const denied = mod.setMembership('inner', true);
  assert.equal(denied.error, 'server_authoritative');
  assert.equal(mod.getMembership(), null);
  assert.equal(mod.hasVaultAccess('skeet'), false);
  mod.setServerMembership({ status: 'inactive', plan: null });
  assert.equal(mod.getServerMembership().status, 'inactive');
  assert.equal(mod.getMembership(), null);
  delete globalThis.window.__PIKK_API_BASE__;
});

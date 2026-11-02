import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { call, newUser, makeAdmin } from './helpers.js';
import cfg from '../wrangler.jsonc?raw';
import pkg from '../package.json';

const strip = (s) => s.replace(/("(?:[^"\\]|\\.)*")|\/\/[^\n]*|\/\*[\s\S]*?\*\//g, (m, str) => str ?? '');

describe('deploy config', () => {
  it('declares no top-level r2_buckets (R2 not provisioned/approved)', () => {
    const c = JSON.parse(strip(cfg).replace(/,(\s*[}\]])/g, '$1'));
    expect(c.r2_buckets).toBeUndefined();
    expect(c.d1_databases?.[0]?.binding).toBe('DB');
  });
  it('has no build block and no script that auto-applies remote migrations', () => {
    const c = JSON.parse(strip(cfg).replace(/,(\s*[}\]])/g, '$1'));
    // A wrangler.jsonc build.command runs on EVERY Workers Builds run, including PR branches.
    expect(c.build).toBeUndefined();
    expect(migrateViolations(pkg.scripts || {})).toEqual([]);
  });
});

// --- remote-migration guard -------------------------------------------------
const HOOKS = ['preinstall', 'install', 'postinstall', 'prepare', 'pretest', 'test', 'posttest',
  'prebuild', 'build', 'postbuild', 'predeploy', 'deploy', 'postdeploy', 'prestart', 'start'];
// Splits on && || ; | and checks each command for `migrations apply` with --remote / -r anywhere.
const isRemoteMigrate = (cmd) => cmd.split(/&&|\|\||;|\|/).some((part) =>
  /\bmigrations\s+apply\b/.test(part) && /(^|\s)(--remote(=\S*)?|-r)(\s|$)/.test(part));
const runsScript = (cmd, name) => new RegExp(`\\b(npm|pnpm|yarn)\\s+(run(-script)?\\s+)?${name.replace(/[:.]/g, '\\$&')}(\\s|$|&|;|\\|)`).test(cmd);
export function migrateViolations(scripts) {
  const out = [];
  for (const [name, cmd] of Object.entries(scripts)) {
    if (name === 'migrate:ci') {
      if (!/^node\s+scripts\/migrate-if-main\.mjs\s*$/.test(cmd.trim())) out.push(`${name}: must only run node scripts/migrate-if-main.mjs`);
      continue;
    }
    if (name !== 'migrate:remote' && isRemoteMigrate(cmd)) out.push(`${name}: remote migrate`);
    if (HOOKS.includes(name) && /migrat/.test(cmd)) out.push(`${name}: hook mentions migration`);
    for (const target of ['migrate:remote', 'migrate:ci']) {
      if (name !== target && runsScript(cmd, target)) out.push(`${name}: invokes ${target}`);
    }
  }
  return out;
}

describe('remote-migration guard catches', () => {
  const ok = { 'migrate:remote': 'wrangler d1 migrations apply DB --remote', 'migrate:ci': 'node scripts/migrate-if-main.mjs', test: 'vitest run', deploy: 'wrangler deploy' };
  const bad = (extra) => migrateViolations({ ...ok, ...extra });
  it('accepts the real layout', () => expect(migrateViolations(ok)).toEqual([]));
  it('--remote after apply', () => expect(bad({ x: 'wrangler d1 migrations apply DB --remote' })).not.toEqual([]));
  it('--remote before migrations apply', () => expect(bad({ x: 'wrangler d1 --remote migrations apply DB' })).not.toEqual([]));
  it('--remote right after wrangler', () => expect(bad({ x: 'npx wrangler --remote d1 migrations apply DB' })).not.toEqual([]));
  it('-r short flag', () => expect(bad({ x: 'wrangler d1 migrations apply DB -r' })).not.toEqual([]));
  it('--remote=true form', () => expect(bad({ x: 'wrangler d1 migrations apply DB --remote=true' })).not.toEqual([]));
  it('chained after another command', () => expect(bad({ x: 'echo hi && wrangler d1 migrations apply DB --remote' })).not.toEqual([]));
  it('npm run migrate:remote from another script', () => expect(bad({ x: 'npm run migrate:remote' })).not.toEqual([]));
  it('npm run migrate:remote from a deploy hook', () => expect(bad({ deploy: 'npm run migrate:remote && wrangler deploy' })).not.toEqual([]));
  it('yarn/pnpm invoking migrate:remote', () => { expect(bad({ x: 'yarn migrate:remote' })).not.toEqual([]); expect(bad({ x: 'pnpm run migrate:remote' })).not.toEqual([]); });
  it('pretest hook migrating', () => expect(bad({ pretest: 'wrangler d1 migrations apply pikk-db --local' })).not.toEqual([]));
  it('postinstall hook migrating', () => expect(bad({ postinstall: 'npm run migrate:local' })).not.toEqual([]));
  it('migrate:ci doing anything but migrate-if-main.mjs', () => {
    expect(bad({ 'migrate:ci': 'wrangler d1 migrations apply DB --remote' })).not.toEqual([]);
    expect(bad({ 'migrate:ci': 'node scripts/migrate-if-main.mjs && wrangler d1 migrations apply DB --remote' })).not.toEqual([]);
  });
  it('another script invoking migrate:ci', () => expect(bad({ deploy: 'npm run migrate:ci && wrangler deploy' })).not.toEqual([]));
  it('does not flag local migrations', () => expect(bad({ 'migrate:local': 'wrangler d1 migrations apply pikk-db --local' })).toEqual([]));
});

async function withoutMedia(fn) { const s = env.MEDIA; try { env.MEDIA = undefined; return await fn(); } finally { env.MEDIA = s; } }

describe('Vault with no MEDIA binding', () => {
  it('upload create returns 503 vault_storage_not_configured', async () => {
    const u = await newUser();
    const r = await withoutMedia(() => call('POST', '/media/uploads', { cookie: u.cookie, body: { type: 'photo', content_type: 'image/jpeg', filename: 'a.jpg', size: 256, access: 'private' } }));
    expect(r.status).toBe(503);
    expect(r.json.error.code).toBe('vault_storage_not_configured');
  });
  it('/vault/health reports storage not configured', async () => {
    const adm = await newUser(); await makeAdmin(adm.id);
    const h = await withoutMedia(() => call('GET', '/vault/health', { cookie: adm.cookie }));
    expect(h.status).toBe(200);
    expect(h.json.status).toBe('degraded');
    expect(h.json.storage.configured).toBe(false);
    expect(h.json.storage.error).toMatch(/not configured/);
  });
});

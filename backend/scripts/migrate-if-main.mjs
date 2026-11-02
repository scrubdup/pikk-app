#!/usr/bin/env node
// Applies D1 migrations to the remote (production) database ONLY when running in
// Cloudflare Workers Builds on the production branch. Every other context is a no-op.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const PRODUCTION_BRANCH = 'main';

export function shouldMigrate(env = process.env) {
  const branch = env.WORKERS_CI_BRANCH;
  if (env.WORKERS_CI !== '1') return { ok: false, reason: 'not running in Workers Builds (WORKERS_CI!=1)' };
  if (typeof branch !== 'string' || branch !== PRODUCTION_BRANCH) {
    return { ok: false, reason: `branch "${branch ?? ''}" is not "${PRODUCTION_BRANCH}"` };
  }
  return { ok: true, reason: `production branch "${PRODUCTION_BRANCH}"` };
}

export function main(env = process.env, run = spawnSync) {
  const decision = shouldMigrate(env);
  if (!decision.ok) {
    console.log(`[migrate-if-main] skipping remote D1 migrations: ${decision.reason}`);
    return 0;
  }
  console.log(`[migrate-if-main] applying remote D1 migrations: ${decision.reason}`);
  const r = run('npx', ['wrangler', 'd1', 'migrations', 'apply', 'DB', '--remote'], { stdio: 'inherit' });
  return r.status ?? 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exit(main());

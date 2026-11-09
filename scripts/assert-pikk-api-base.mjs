#!/usr/bin/env node
/**
 * Fail production Pages builds when the Worker API base is missing.
 * Reads PIKK_API_BASE or VITE_PIKK_API_BASE. Never embeds a default hostname —
 * the owner sets the GitHub Actions variable PIKK_API_BASE per environment.
 *
 * Usage:
 *   node scripts/assert-pikk-api-base.mjs            # report only (exit 0 if empty)
 *   node scripts/assert-pikk-api-base.mjs --required  # exit 1 if empty/invalid
 */
const required = process.argv.includes('--required');
const raw = String(process.env.PIKK_API_BASE ?? process.env.VITE_PIKK_API_BASE ?? '').trim();
const base = raw.replace(/\/$/, '');

function parseOrigin(value) {
  try {
    const u = new URL(value);
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    if (!u.host) return null;
    // Origin only: reject path/query/hash beyond empty or "/"
    if ((u.pathname && u.pathname !== '/') || u.search || u.hash) return null;
    return u;
  } catch {
    return null;
  }
}

function fail(msg) {
  console.error(`::error::${msg}`);
  process.exit(1);
}

if (!base) {
  const msg = [
    'PIKK API base is not configured.',
    'Set the GitHub Actions repository variable PIKK_API_BASE to the Worker origin',
    '(https://host with no path), then re-run the Pages deploy.',
    'Leaving it empty ships the public app in localStorage-only demo auth mode.',
  ].join(' ');
  if (required) fail(msg);
  console.log(msg);
  process.exit(0);
}

const origin = parseOrigin(base);
if (!origin) {
  const msg = 'PIKK API base must be an http(s) origin with no path or query.';
  if (required) fail(msg);
  console.log(msg);
  process.exit(0);
}

const localHost = /^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin.host);
if (required && origin.protocol === 'http:' && !localHost) {
  fail('Production PIKK_API_BASE must use https (http is only allowed for localhost).');
}

console.log(`PIKK API base OK (host ${origin.host}).`);
process.exit(0);

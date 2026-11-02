import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
// Owner ruling t461u: there is NO Tag-Team (or team battle) anywhere in PIKK. Roast is 1v1 only.
// Repo-wide: src/**, scripts, docs, tests, prototype-ref, .github.
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SELF = 'tests/roast-1v1-only-guard.test.mjs';
const DIRS = ['src', 'scripts', 'docs', 'tests', 'prototype-ref', '.github'];
const EXT = new Set(['.js', '.mjs', '.cjs', '.ts', '.css', '.html', '.md', '.json', '.yml', '.yaml', '.txt']);
// '2v2' only as a standalone token, so SVG path data like "M19.5 12v2" (a known false positive) is not flagged.
export const TAG = /tag[\s_-]*teams?|(?<![\d.])2v2(?![\d.])|roast_tag|team[\s_-]*battle|into teams|data-bmode=['"]?teams|mode\s*===?\s*['"]teams['"]/i;
const walk = (d) => readdirSync(d).flatMap((n) => { const p = join(d, n); if (n === 'node_modules' || n === 'fixtures') return []; return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = DIRS.flatMap((d) => { try { return walk(join(ROOT, d)); } catch { return []; } })
  .map((p) => relative(ROOT, p).split('\\').join('/'))
  .filter((f) => f !== SELF && EXT.has(extname(f)));

test('guard scans the whole repo, including giftbattles and prototype-ref', () => {
  for (const f of ['src/pages/giftbattles.js', 'src/pages/roast-arena.js', 'src/roast-engine.js', 'prototype-ref/core.js']) assert.ok(files.includes(f), f);
  assert.ok(files.length > 100, String(files.length));
});
test('no Tag-Team / team-battle text anywhere in the repo', () => {
  const hits = files.flatMap((f) => readFileSync(join(ROOT, f), 'utf8').split('\n').map((l, i) => [f, i + 1, l]).filter(([, , l]) => TAG.test(l))).map(([f, n, l]) => `${f}:${n}: ${l.match(TAG)[0]}`);
  assert.deepEqual(hits, []);
});
test('pattern catches Tag-Team labels but not SVG false positives', () => {
  for (const s of ['Tag-Team', 'Tag Team', 'tagteam', 'tag_team', '2v2', 'Team battle', 'Split chat into teams', 'mode==="teams"']) assert.match(s, TAG, s);
  for (const s of ['M19.5 12v2', 'M17 12v3M19.5 12v2', 'Team accounts are read-only', 'artist team']) assert.doesNotMatch(s, TAG, s);
});
test('roast engine exports no team API', async () => {
  const e = await import('../src/roast-engine.js');
  for (const k of Object.keys(e)) assert.doesNotMatch(k, /tag|team/i, k);
});

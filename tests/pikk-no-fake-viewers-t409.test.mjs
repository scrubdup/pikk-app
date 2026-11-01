import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
const walk = (u) => readdirSync(u).flatMap((f) => { const p = new URL(f, u); return statSync(p).isDirectory() ? walk(new URL(f + '/', u)) : f.endsWith('.js') ? [p] : []; });
const files = walk(new URL('../src/', import.meta.url)).map((u) => [u.pathname.split('/src/')[1], readFileSync(u, 'utf8')]);
const WORD = '(viewers|watching|watchers|listeners|listening|viewerCount|onlineCount)';
test('t409: no numeric viewers/watching/listeners values in seed data', () => {
  const bad = [];
  for (const [f, s] of files) for (const m of s.matchAll(new RegExp(`\\b${WORD}\\s*:\\s*[1-9][0-9]*`, 'g'))) bad.push(`${f}: ${m[0]}`);
  assert.deepEqual(bad, []);
});
test('t409: no Math.random-based viewer/watching/listener counts anywhere in src', () => {
  const bad = [];
  for (const [f, s] of files) for (const line of s.split('\n')) if (/Math\.random/.test(line) && new RegExp(WORD, 'i').test(line)) bad.push(`${f}: ${line.trim().slice(0, 90)}`);
  for (const [f, s] of files) { const m = s.match(/const bumpViewers\s*=/); if (m) bad.push(`${f}: bumpViewers`); }
  assert.deepEqual(bad, []);
});
test('t409: Home and Live render the honest label instead of viewer numbers', () => {
  const home = files.find(([f]) => f === 'pages/home.js')[1], live = files.find(([f]) => f === 'pages/live.js')[1], store = files.find(([f]) => f === 'store.js')[1];
  assert.match(home, /function fmtViewers\(\) \{ return NO_VIEWERS; \}/); assert.match(home, /'Demo · no real viewers'/);
  assert.ok(!/fmtCount\(live\.viewers\)/.test(live)); assert.ok(!/\$\{esc\(viewersLabel\)\} watching/.test(home));
  assert.match(store, /const viewers = 0;\n  const giftsTotal = Math\.max/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
const walk = (u) => readdirSync(u).flatMap((f) => { const p = new URL(f, u); return statSync(p).isDirectory() ? walk(new URL(f + '/', u)) : f.endsWith('.js') ? [p] : []; });
const files = walk(new URL('../src/', import.meta.url)).map((u) => [u.pathname.split('/src/')[1], readFileSync(u, 'utf8')]);
const get = (f) => files.find(([n]) => n === f)[1];
const WORD = '(viewers|watching|watchers|listeners|listening|viewerCount|onlineCount)';
test('t409/t208u: no Math.random-based viewer/watching/listener counts anywhere in src', () => {
  const bad = [];
  for (const [f, s] of files) for (const line of s.split('\n')) if (/Math\.random/.test(line) && new RegExp(WORD, 'i').test(line)) bad.push(`${f}: ${line.trim().slice(0, 90)}`);
  for (const [f, s] of files) if (/const bumpViewers\s*=/.test(s)) bad.push(`${f}: bumpViewers`);
  const store = get('store.js'); const i = store.indexOf('export function bumpLiveViewers'); assert.ok(!/Math\.random/.test(store.slice(i, store.indexOf('\n}', i))));
  assert.deepEqual(bad, []);
});
test('t208u: numeric viewer seeds only exist in the tagged example seed list', () => {
  const bad = [];
  for (const [f, s] of files) for (const m of s.matchAll(new RegExp(`\\b${WORD}\\s*:\\s*[1-9][0-9]*`, 'g'))) {
    const ctx = s.slice(Math.max(0, m.index - 8000), m.index);
    if (!(f === 'store.js' && ctx.includes("seeded viewer numbers are EXAMPLE data"))) bad.push(`${f}: ${m[0]}`);
  }
  assert.deepEqual(bad, []);
  assert.match(get('store.js'), /house: !!raw\.house,\n    example: true,/);
});
test("t208u: every place a seeded count renders carries the 'Example' label", () => {
  const home = get('pages/home.js'), live = get('pages/live.js');
  const lines = [...home.split('\n'), ...live.split('\n')].filter((l) => /(viewersLabel|fmtCount\(live\.viewers\))/.test(l) && !/const viewersLabel/.test(l));
  assert.ok(lines.length >= 6);
  for (const l of lines) assert.ok(/EXAMPLE_TAG|pikk-example-tag|\(example\)|· Example|example data|· example/i.test(l), l.trim().slice(0, 100));
  assert.match(home, /export const EXAMPLE_TAG = '<span class="chip pikk-example-tag"[^>]*>Example<\/span>'/);
  // the user's own demo stream never shows a number
  assert.match(home, /live-hoodie-viewers">Demo · no real viewers/);
  assert.match(live, /Demo · no real viewers/);
});

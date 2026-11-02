import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { MEMBERSHIPS } from '../src/data.js';
const walk = (u) => readdirSync(u).flatMap((f) => { const p = new URL(f, u); return statSync(p).isDirectory() ? walk(new URL(f + '/', u)) : /\.(js|css|html|mjs)$/.test(f) ? [p] : []; });
const files = [...walk(new URL('../src/', import.meta.url)), new URL('../index.html', import.meta.url)];
test('t400u: tier 1 is PIKK+ (id kept for saved data), Inner Circle $12.99, Backstage $7.99', () => {
  assert.deepEqual(MEMBERSHIPS.map((m) => [m.id, m.name, m.price]), [['skeet', 'PIKK+', 3.99], ['backstage', 'Backstage', 7.99], ['inner', 'Inner Circle', 12.99]]);
  assert.equal(MEMBERSHIPS[0].blurb, 'Early releases · basic Vault');
});
test("t400u: no 'Skeet+' display text and no Inner Circle 14.99 anywhere in src", () => {
  const bad = [];
  for (const f of files) {
    const s = readFileSync(f, 'utf8');
    if (s.includes('Skeet+')) bad.push(`${f.pathname}: Skeet+`);
    for (const m of s.matchAll(/[^\n]*14\.99[^\n]*/g)) if (/inner|circle|membership|tier/i.test(m[0])) bad.push(`${f.pathname}: ${m[0].trim().slice(0, 80)}`);
  }
  assert.deepEqual(bad, []);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
globalThis.location = { hash: '#/promote' };
const { PROMOTE_SECTIONS } = await import('../src/promote-data.js');
const { drawerGroups } = await import('../src/nav-sections.js');
const { renderPromote } = await import('../src/pages/promote.js');
const html = renderPromote();
test('Promote page lists every promotable group with the existing tiers and honest Coming soon', () => {
  assert.deepEqual(PROMOTE_SECTIONS.map((s) => s.title), ['Music', 'Videos and Clips', 'Live', 'Shop', 'Posts and Stories', 'Profiles', 'Events', 'Battles and Roast', 'Communities', 'Dating boost']);
  for (const s of PROMOTE_SECTIONS) assert.ok(html.includes(`id="promote-${s.id}"`), s.id);
  for (const t of ['PIKK Music Player spotlight', 'Pre-live boost', 'Live boost', 'Roast Arena matchups', 'Open Mic', 'Stores']) assert.ok(html.includes(t), t);
  for (const p of ['$199', '$99', '$49', 'Premium Spotlight', 'Featured Box', 'Promo Box']) assert.ok(html.includes(p), p);
  assert.match(html, /Coming soon/); assert.match(html, /18\+ only/);
  assert.doesNotMatch(html, /stripe\.com|checkout\.session|card number/i);
});
test('every Promote drawer entry resolves to an existing #/promote section', () => {
  const g = drawerGroups(); const i = g.findIndex((x) => x.id === 'promote');
  assert.equal(i, 8, 'after the 7 tab groups, before utilities'); assert.equal(g[i + 1].label, 'Explore');
  assert.equal(g[i].links.length, PROMOTE_SECTIONS.length);
  for (const l of g[i].links) { const s = l.href.match(/^#\/promote\?s=([\w-]+)$/)[1]; assert.ok(html.includes(`id="promote-${s}"`), l.href); }
});
test('Home top chip row ends with Promote → #/promote; route registered', () => {
  const idx = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(idx, /<a href="#\/community">Communities<\/a>\s*<a class="pikk-explore-promote" href="#\/promote">Promote<\/a>\s*<\/nav>/);
  assert.match(readFileSync(new URL('../src/pages/home.js', import.meta.url), 'utf8'), /<a href="#\/dating">Dating<\/a>\s*<a class="pikk-home-promote" href="#\/promote">Promote<\/a>\s*<\/nav>/);
  assert.match(readFileSync(new URL('../src/main.js', import.meta.url), 'utf8'), /'\/promote': \{ render: renderPromote, bind: bindPromote \}/);
});

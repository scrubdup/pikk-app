import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
globalThis.location = { hash: '#/promote' };
const { PROMOTE_SECTIONS } = await import('../src/promote-data.js');
const { drawerGroups } = await import('../src/nav-sections.js');
const { renderPromote } = await import('../src/pages/promote.js');
const html = renderPromote();
test('Promote page lists every promotable group with the existing tiers and honest Coming soon', () => {
  assert.deepEqual(PROMOTE_SECTIONS.map((s) => s.title), ['Featured placements', 'Music Player placement', 'Story rail placement', 'Music', 'Videos and Clips', 'Live', 'Shop', 'Posts and Stories', 'Profiles', 'Events', 'Battles and Roast', 'Communities', 'Dating boost']);
  for (const s of PROMOTE_SECTIONS) assert.ok(html.includes(`id="promote-${s.id}"`), s.id);
  for (const t of ['Top PIKK Music Player', 'pre-live + during the live', 'Roast Arena matchup', 'Open Mic', 'Store spotlight']) assert.ok(html.includes(t), t);
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
  assert.match(idx, /<a href="#\/communities">Communities<\/a>\s*<a class="pikk-explore-promote" href="#\/promote">Promote<\/a>\s*<\/nav>/);
  assert.match(readFileSync(new URL('../src/pages/home.js', import.meta.url), 'utf8'), /<a href="#\/dating">Dating<\/a>\s*<a class="pikk-home-promote" href="#\/promote">Promote<\/a>\s*<\/nav>/);
  assert.match(readFileSync(new URL('../src/main.js', import.meta.url), 'utf8'), /'\/promote': \{ render: renderPromote, bind: bindPromote \}/);
});
test('t342u: player and story-rail placements on Promote/drawer; honest tags', async () => {
  const { placementTag } = await import('../src/promote-data.js');
  assert.ok(html.includes('id="promote-player"') && html.includes('id="promote-storyrail"'));
  const links = drawerGroups().find((g) => g.id === 'promote').links.map((l) => l.href);
  assert.ok(links.includes('#/promote?s=player') && links.includes('#/promote?s=storyrail'));
  assert.equal(placementTag({}), 'House pick');
  assert.equal(placementTag({ promoted: true }), 'House pick', 'never Promoted without a house/demo label');
  assert.equal(placementTag({ promoted: true, house: true }), 'Promoted · House demo');
  assert.equal(placementTag({ trending: true }), 'Trending');
  const idx = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(idx, /<span class="sp-tag" id="spTag"[^>]*>House pick<\/span>/);
  const home = readFileSync(new URL('../src/pages/home.js', import.meta.url), 'utf8');
  assert.match(home, /<small class="pikk-rail-tag">\$\{esc\(placementTag\(c\)\)\}<\/small>/);
  assert.doesNotMatch(idx + home, />Promoted</);
});

test('t343u: every Promote option has a price; owner prices exact', async () => {
  const { PROMOTE_SECTIONS: S, priceLabels } = await import('../src/promote-pricing.js');
  const all = S.flatMap((s) => s.items);
  for (const i of all) assert.ok(priceLabels(i).length > 0, i.name);
  assert.equal((html.match(/data-promote-option/g) || []).length, all.length);
  const L = Object.fromEntries(all.map((i) => [i.name.split(' (')[0], priceLabels(i).join(' | ')]));
  const exp = { 'Premium Spotlight': '$199 / 24h | $999 / 7 days', 'Featured Box': '$99 / 24h | $499 / 7 days', 'Promo Box': '$49 / 24h | $249 / 7 days',
    'Top PIKK Music Player on Home': '$149 / 24h | $699 / 7 days', 'Home story rail': '$49 / 24h | $229 / 7 days', 'Trending Music boost': '$29 / 24h | $129 / 7 days',
    'Video / Clip boost': '$19 / 24h | $89 / 7 days', 'Live stream boost': '$25 per stream', 'Shop product boost': '$15 / 24h | $69 / 7 days', 'Store spotlight': '$59 / 7 days',
    'Post / Story boost': '$9 / 24h | $39 / 7 days', 'Profile / Creator boost': '$19 / 24h | $89 / 7 days', 'Event / Open Mic listing': '$25 per event',
    'Battles / Roast Arena matchup feature': '$35 per match', 'Community spotlight': '$29 / 7 days', 'Dating profile boost': '$4.99 / hour | $14.99 / 24h' };
  for (const [k, v] of Object.entries(exp)) assert.equal(L[k], v, k);
});

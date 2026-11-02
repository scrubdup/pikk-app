import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const store = {}; globalThis.localStorage = { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); } };
const m = await import('../src/circle-store.js');
const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('Crew list editor adds, dedupes, validates and removes handles', () => {
  assert.equal(m.crew.add('@Skeet_Fan'), true); m.crew.add('skeet_fan');
  assert.equal(m.crew.add('x'), false); assert.equal(m.crew.add('<script>'), false);
  m.crew.add('bestie'); assert.deepEqual(m.crew.list(), ['skeet_fan', 'bestie']);
  m.crew.remove('@bestie'); assert.deepEqual(m.crew.list(), ['skeet_fan']);
});
test('Crew stories are visible only to the poster and listed people', () => {
  const s = m.addStory({ text: 'private', audience: 'crew', author: 'me' });
  assert.equal(s.audience, 'crew');
  assert.ok(m.canView(s, 'me')); assert.ok(m.canView(s, '@skeet_fan')); assert.ok(!m.canView(s, 'stranger'));
  const pub = m.addStory({ text: 'public', audience: 'everyone', author: 'me' }); assert.ok(m.canView(pub, 'stranger'));
  assert.equal(m.addStory({ text: '   ' }), null);
  assert.equal(m.addStory({ text: 'x', audience: 'bogus' }).audience, 'everyone');
});
test('Favorites rank first in favorite order, then newest', () => {
  m.favorites.add('zed'); m.favorites.add('amy');
  const items = [{ author: 'bob', at: 5 }, { author: 'amy', at: 1 }, { author: 'cat', at: 9 }, { author: 'zed', at: 2 }];
  assert.deepEqual(m.rankByFavorites(items).map((x) => x.author), ['zed', 'amy', 'cat', 'bob']);
  assert.equal(m.favorites.toggle('zed'), false); assert.ok(!m.favorites.has('zed'));
});
test('routes, Create, tab sheets and drawer are wired; branding is PIKK, not Instagram', () => {
  const main = read('src/main.js');
  for (const r of ['/story', '/crew', '/favorites']) assert.match(main, new RegExp(`'${r}': \\{ render:`));
  assert.match(read('src/create-menu.js'), /title: 'Story', href: '#\/story'/);
  assert.match(read('src/create-menu.js'), /href: '#\/crew'/);
  const sec = read('src/section-menus.js'); assert.match(sec, /'#\/crew'/); assert.match(sec, /'#\/favorites'/); assert.match(sec, /title: 'Stories', href: '#\/story'/);
  const page = read('src/pages/circle.js'), css = read('src/circle.css');
  assert.match(page, /Everyone/); assert.match(page, /Crew/); assert.match(page, /TEST MODE/);
  for (const src of [page, css, main]) assert.ok(!/close friends/i.test(src), 'no "Close Friends" wording');
  for (const [, h] of css.matchAll(/#([0-9a-f]{6})/gi)) { const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); assert.ok(!(g > r + 40 && g > b + 40), `no green ring ${h}`); }
  assert.match(css, /\.pikk-story-ring\.circle\{border:3px solid #2f6bff/);
  assert.match(css, /\.pikk-fav-star\{color:#e6e9ee;text-shadow:0 0 6px #2f6bff/);
});

test('PIKK Crew naming (not Inner Circle), red/blue ring, favorites reorder', async () => {
  const { readFileSync } = await import('node:fs');
  for (const f of ['src/pages/circle.js','src/circle-store.js','src/create-menu.js','src/section-menus.js']) assert.doesNotMatch(readFileSync(new URL('../' + f, import.meta.url), 'utf8'), /Inner Circle|Close Friends/i, f);
  const css = readFileSync(new URL('../src/circle.css', import.meta.url), 'utf8'); assert.match(css, /#2f6bff/); assert.match(css, /#ff3137/);
  const m = await import('../src/circle-store.js');
  for (const h of ['aa','bb','cc']) m.favorites.add(h);
  assert.deepEqual(m.favorites.moveUp('cc').slice(-2), ['cc','bb']);
});

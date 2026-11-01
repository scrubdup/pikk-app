import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const store = {}; globalThis.localStorage = { getItem: (k) => store[k] ?? null, setItem: (k, v) => { store[k] = String(v); } };
const m = await import('../src/circle-store.js');
const read = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('Inner Circle list editor adds, dedupes, validates and removes handles', () => {
  assert.equal(m.innerCircle.add('@Skeet_Fan'), true); m.innerCircle.add('skeet_fan');
  assert.equal(m.innerCircle.add('x'), false); assert.equal(m.innerCircle.add('<script>'), false);
  m.innerCircle.add('bestie'); assert.deepEqual(m.innerCircle.list(), ['skeet_fan', 'bestie']);
  m.innerCircle.remove('@bestie'); assert.deepEqual(m.innerCircle.list(), ['skeet_fan']);
});
test('Inner Circle stories are visible only to the poster and listed people', () => {
  const s = m.addStory({ text: 'private', audience: 'circle', author: 'me' });
  assert.equal(s.audience, 'circle');
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
  for (const r of ['/story', '/inner-circle', '/favorites']) assert.match(main, new RegExp(`'${r}': \\{ render:`));
  assert.match(read('src/create-menu.js'), /title: 'Story', href: '#\/story'/);
  assert.match(read('src/create-menu.js'), /href: '#\/inner-circle'/);
  const sec = read('src/section-menus.js'); assert.match(sec, /'#\/inner-circle'/); assert.match(sec, /'#\/favorites'/); assert.match(sec, /title: 'Stories', href: '#\/story'/);
  const page = read('src/pages/circle.js'), css = read('src/circle.css');
  assert.match(page, /Everyone/); assert.match(page, /Inner Circle/); assert.match(page, /TEST MODE/);
  for (const src of [page, css, main]) assert.ok(!/close friends/i.test(src), 'no "Close Friends" wording');
  for (const [, h] of css.matchAll(/#([0-9a-f]{6})/gi)) { const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); assert.ok(!(g > r + 40 && g > b + 40), `no green ring ${h}`); }
  assert.match(css, /\.pikk-story-ring\.circle\{border:3px solid #2f6bff/);
  assert.match(css, /\.pikk-fav-star\{color:#e6e9ee;text-shadow:0 0 6px #2f6bff/);
});

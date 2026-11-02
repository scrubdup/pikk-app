import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const rd = (f) => readFileSync(new URL('../src/' + f, import.meta.url), 'utf8');
const home = rd('pages/home.js'), main = rd('main.js'), mu = rd('home-matchup.js'), css = rd('pikk-pages.css');
const body = home.slice(home.indexOf('const body = `'), home.indexOf("return shellPage('Home'"));
const { renderHomeMatchUp, MATCHUP_SECONDS } = await import('../src/home-matchup.js');
const { renderHomeShowcase, SHOWCASE_ORDER, HOME_MORE } = await import('../src/home-showcase.js');

test('t383u: lower Posts/Shorts/Videos slideshow removed; upper showcase kept', () => {
  assert.ok(!body.includes('renderHomeMediaSlideshow()'));
  assert.ok(body.includes('${renderHomeShowcase()}'));
  assert.ok(SHOWCASE_ORDER.includes('posts') && SHOWCASE_ORDER.includes('videos'));
});
test('t383u: PIKK Match Up has every element, TEST MODE, 18+', () => {
  const h = renderHomeMatchUp();
  for (const x of ['PIKK Match Up', 'Start matching', 'data-mu-tag', 'Skip / Next', '+15s Add time', 'Add friend', 'Report', 'Block', '18+', 'TEST MODE', 'Safety:']) assert.ok(h.includes(x), x);
  assert.equal(MATCHUP_SECONDS, 15);
  assert.match(home, /bindHomeMatchUp\(root\)/);
});
test('t383u: no camera access anywhere on Home', () => {
  for (const s of [mu, home, rd('home-showcase.js')]) assert.ok(!/getUserMedia|mediaDevices/.test(s));
});
test('t383u: palette — no pink/magenta/purple in Match Up CSS; selected chip uses shared glossy token (t388u)', () => {
  const block = css.slice(css.indexOf('/* t383u Match Up'));
  assert.ok(!/pink|magenta|purple|#ff00ff|#f0f/i.test(block));
  assert.match(block, /aria-pressed="true"\]\{background:var\(--pikk-chip-selected-bg\);color:#fff/);
});
test('t384u/t389u: Dating → Twerk Contest → Match Up', () => {
  const i = SHOWCASE_ORDER.indexOf('dating');
  assert.deepEqual(SHOWCASE_ORDER.slice(i, i + 3), ['dating', 'contest', 'matchup']);
  const h = renderHomeShowcase();
  assert.ok(h.indexOf('id="hs-dating"') < h.indexOf('id="hs-contest"') && h.indexOf('id="hs-contest"') < h.indexOf('id="homeMatchUp"'));
});
test('t384u: every missing feature has a Home card linking to a real route; no dupes', () => {
  const h = renderHomeShowcase();
  for (const [href, t] of HOME_MORE) {
    assert.ok(h.includes(t), t);
    if (href) assert.ok(main.includes(`'/${href.slice(2)}': {`), href);
  }
  const hrefs = HOME_MORE.map(([x]) => x).filter(Boolean);
  assert.equal(new Set(hrefs).size, hrefs.length);
  for (const x of ['#/pricing', '#/promote', '#/live', '#/giftbattles', '#/roast-arena', '#/contest/twerk']) assert.ok((home + h).includes(`href="${x}`), x);
});
test('t384u: bottom order unchanged', () => {
  const at = (k) => body.indexOf(k);
  assert.ok(at('id="homeArcade"') < at('${renderHomeCommunityHub()}') && at('${renderHomeCommunityHub()}') < at('id="home-live-activity"'));
  assert.ok(at('id="home-live-activity"') > at('id="homeArcade"'));
});
test('t385u: ranked feed stage comes immediately after the official-video grid (visualFeed)', () => {
  const v = body.indexOf('${visualFeed}'), st = body.indexOf('${stageBlock}');
  assert.ok(v >= 0 && st > v);
  assert.equal(body.slice(v + '${visualFeed}'.length, st).trim(), '');
  for (const k of ['${renderHomeShowcase()}', '${sellPromo}', 'id="homeArcade"']) assert.ok(body.indexOf(k) > st, k);
  assert.ok(home.indexOf('View all videos') < home.indexOf('id="homeFeaturedStage"') || body.indexOf('${visualFeed}') < st);
});
test('t389u: no leftover "Official DatBoiSkeet MVs" text on Home', () => {
  const data = rd('data.js');
  for (const s of [home, rd('home-showcase.js'), rd('home-hub.js'), data, renderHomeShowcase()]) assert.ok(!s.includes('Official DatBoiSkeet MVs'));
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { PIKK_GAMES } from '../src/games/arcade-catalog.js';
import { readFileSync } from 'node:fs';
const { renderHomeShowcase, SHOWCASE_ORDER, SHOWCASE_SEE_ALL } = await import('../src/home-showcase.js');
const html = renderHomeShowcase();
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const routeExists = (h) => { const p = '/' + h.replace(/^#\/?/, '').split(/[?#]/)[0]; return main.includes(`'${p}': {`); };
test('showcase sections render in owner order', () => {
  const order = [...html.matchAll(/data-hs="([\w-]+)"/g)].map((m) => m[1]);
  assert.deepEqual(order, SHOWCASE_ORDER);
  const core = order.filter((k) => !['live', 'battles', 'contest', 'matchup', 'more'].includes(k));
  assert.deepEqual(core, ['connect', 'posts', 'videos', 'music', 'dating', 'shop']);
});
test('every See all and every card link resolves to a real route', () => {
  for (const [k, h] of Object.entries(SHOWCASE_SEE_ALL)) assert.ok(routeExists(h), `${k} ${h}`);
  for (const [, h] of html.matchAll(/href="(#\/[^"]+)"/g)) assert.ok(routeExists(h), h);
});
test('t392u single Games area (#homeArcade carousel, Block Wars first); Dating 18+; lazy images; no promote/pink/YouTube branding', () => {
  // t392u: ONE Games area on Home = the #homeArcade carousel (Block Wars first); showcase Games row removed.
  const home = readFileSync(new URL('../src/pages/home.js', import.meta.url), 'utf8');
  assert.ok(!html.includes('data-hs="games"'));
  assert.equal((home.match(/id="homeArcade"/g) || []).length, 1);
  assert.equal((home.match(/home-blockwars-preview"/g) || []).length, 1, 'bwPreview defined once');
  assert.ok(!home.slice(home.indexOf('const body = `'), home.indexOf("return shellPage('Home'")).includes('${bwPreview}'));
  assert.equal(PIKK_GAMES[0].name, 'Block Wars');
  assert.match(html, /18\+ · safety-gated/); assert.match(html, /No profiles shown/);
  for (const m of html.matchAll(/<img [^>]*>/g)) assert.match(m[0], /loading="lazy"/);
  assert.doesNotMatch(html, /Sponsored|Promoted|pikk-ad-slot|YouTube/);
});
test("Home renders visual feed, then ranked stage (t385u), then showcase", () => {
  assert.match(readFileSync(new URL("../src/pages/home.js", import.meta.url), "utf8"), /\$\{visualFeed\}\n    \$\{stageBlock\}\n    \$\{renderHomeShowcase\(\)\}/);
});
test('t391u/t392u: showcase starts Live → Connect → Posts → Videos → Music', () => {
  assert.deepEqual(SHOWCASE_ORDER.slice(0, 5), ['live', 'connect', 'posts', 'videos', 'music']);
  const h = renderHomeShowcase();
  assert.ok(h.indexOf('id="hs-posts"') < h.indexOf('id="hs-videos"') && h.indexOf('id="hs-videos"') < h.indexOf('id="hs-music"'));
});
test('t395: all 15 games render inside the single #homeArcade, Block Wars first with its preview', async () => {
  const home = readFileSync(new URL('../src/pages/home.js', import.meta.url), 'utf8');
  assert.equal((home.match(/id="homeArcade"/g) || []).length, 1);
  const a = home.indexOf('id="homeArcade"'), b = home.indexOf('</section>', a);
  const arcadeTpl = home.slice(a, b);
  assert.match(arcadeTpl, /\$\{PIKK_GAMES\.map\(/);
  assert.match(arcadeTpl, /data-game-slide="\$\{index\}"/);
  assert.match(arcadeTpl, /GAME \$\{index\+1\} OF 15/);
  assert.equal(PIKK_GAMES.length, 15);
  assert.equal(PIKK_GAMES[0].name, 'Block Wars');
  assert.ok(PIKK_GAMES[0].artwork, 'Block Wars preview art');
  // render the slides exactly as Home does and check every game appears, Block Wars first
  const esc = (x) => String(x);
  const slides = PIKK_GAMES.map((g, i) => `<article data-game-slide="${i}"><h3>${esc(g.name)}</h3></article>`).join('');
  const names = [...slides.matchAll(/<h3>([^<]+)<\/h3>/g)].map((m) => m[1]);
  assert.equal(names.length, 15); assert.equal(names[0], 'Block Wars');
  assert.match(home, /<h3>\$\{esc\(game\.name\)\}<\/h3>/);
  assert.match(home, /arcadeArtSrc\(game\)/);
  assert.ok(!home.slice(home.indexOf('const body = `'), home.indexOf("return shellPage('Home'")).includes('${bwPreview}'));
});

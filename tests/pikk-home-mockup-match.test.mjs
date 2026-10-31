import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const r = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const html = r('index.html'), css = r('src/pikk-mockup.css'), home = r('src/pages/home.js'), player = r('src/player.js'), main = r('src/main.js');

test('magenta token defined and stylesheet loaded', () => {
  assert.match(css, /--pikk-magenta:\s*#ff2bd6/);
  assert.match(main, /import '\.\/pikk-mockup\.css'/);
});
test('header: search left, logo centered, bell + messages right; profile and menu still present', () => {
  assert.match(css, /#exploreSearchBtn \{ order: -1/);
  assert.match(css, /\.logo \{ order: 0; flex: 1 1 auto;[^}]*justify-content: center/);
  for (const id of ['headerProfile', 'headerMsg', 'notifBtn', 'menuBtn', 'exploreSearchBtn']) assert.match(html, new RegExp(`id="${id}"`));
});
test('PIKK Music Player card has honest progress, volume and cast', () => {
  assert.match(html, /id="spSeek"[^>]*disabled/);
  assert.match(html, /id="spTimeCur">--:--</);
  assert.match(html, /id="spVol"[^>]*aria-label="Volume"/);
  assert.match(html, /id="spCast"[^>]*aria-disabled="true"/);
  assert.match(player, /getDuration\?\.\(\)/);
  assert.match(player, /setVolume\?\.\(/);
  assert.doesNotMatch(html, /1:24|3:08/);
});
test('story rail labels and filter chips match mockup, using real artwork only', () => {
  for (const l of ['For You', 'Following', 'Music', 'Nearby', 'Live']) assert.ok(home.includes(`label: '${l}'`), l);
  assert.match(home, /STREAMING_RELEASES\.map\(\(r\) => r\.cover\)/);
  for (const c of ['All', 'Videos', 'Music', 'Photos', 'Live', 'Shop', 'Dating']) assert.ok(home.includes(`>${c}</a>`), c);
  assert.ok(home.indexOf('${visualFeed}') < home.indexOf('class="pikk-home-discover"'));
});
test('fmtTime never fabricates a time', async () => {
  const src = player.match(/export function fmtTime[\s\S]*?\n}/)[0].replace('export ', '');
  const fmtTime = new Function(src + '; return fmtTime;')();
  assert.equal(fmtTime(0), '--:--'); assert.equal(fmtTime(NaN), '--:--'); assert.equal(fmtTime(84), '1:24');
});

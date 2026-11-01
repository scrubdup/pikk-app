import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const home = readFileSync(new URL('../src/pages/home.js', import.meta.url), 'utf8');
const css = ['pikk-duotone.css','pikk-pages.css','pikk-mockup.css'].map((f) => readFileSync(new URL('../src/' + f, import.meta.url), 'utf8')).join('\n');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const { renderHomeCommunityHub, renderHomeMediaSlideshow, HOME_HUB_ORDER } = await import('../src/home-hub.js');
const body = home.slice(home.indexOf('const body = `'), home.indexOf("return shellPage('Home'"));
test('t372u removals: Stories card, Mix, MV list, separate Block Wars card', () => {
  for (const x of ["renderStoriesAndPromotions('home')", '${mixHome}', 'Official DatBoiSkeet MVs', '${bwPreview}']) assert.ok(!body.includes(x), x);
  assert.equal((body.match(/id="homeArcade"/g) || []).length, 1, 'one Games carousel');
});
test('t372u order: slideshow → sell promo higher → arcade → hub (Party Line, board, live chat, servers) → live activity last', () => {
  const at = (k) => { const i = body.indexOf(k); assert.ok(i >= 0, k); return i; };
  const seq = ['${stageBlock}', '${renderHomeMediaSlideshow()}', '${sellPromo}', 'id="homeArcade"', '${renderHomeCommunityHub()}', 'id="home-live-activity"'];
  for (let i = 1; i < seq.length; i++) assert.ok(at(seq[i - 1]) < at(seq[i]), seq[i]);
  assert.deepEqual(HOME_HUB_ORDER, ['partyline', 'board', 'livechat', 'servers']);
  const hub = renderHomeCommunityHub();
  for (const [, h] of hub.matchAll(/href="(#\/[^"]+)"/g)) assert.ok(main.includes(`'/${h.slice(2).split(/[?#]/)[0]}': {`), h);
  assert.match(hub, /id="home-partyline"[^>]*data-coming-soon/);
  assert.match(hub, /href="#\/community"/);
  assert.match(renderHomeMediaSlideshow(), /href="#\/posts".*href="#\/shorts".*href="#\/videos"/s);
});
test('t372u style: chips selected solid red no ring; goal bar red+blue edge; Create ring blue+red blue interior', () => {
  assert.match(css, /t372u chips/); assert.match(css, /t372u goal/); assert.match(css, /t372u create/);
});

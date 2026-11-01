// t351u guard: at 390x844 Home shows the slim goal bar (44–56px) directly under the player and the story rail fully visible.
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const B = process.env.PIKK_BASE_URL || 'http://127.0.0.1:5173/';
const b = await chromium.launch(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : { args: ['--no-sandbox'] });
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto(B + '#/home'); await p.waitForSelector('#home-app-goal', { timeout: 20000 }); await p.waitForTimeout(1500);
const r = await p.evaluate(() => {
  const pl = document.querySelector('#dbs-sticky-player .sp-row').getBoundingClientRect();
  const g = document.querySelector('#home-app-goal').getBoundingClientRect();
  const s = document.querySelector('.pikk-home-circle-strip').getBoundingClientRect();
  const t = document.querySelector('#tabbar').getBoundingClientRect();
  const first = document.querySelector('main').firstElementChild?.querySelector?.('#home-app-goal') || document.querySelector('main #home-app-goal');
  return { pl: [pl.top, pl.bottom, pl.height], g: [g.top, g.bottom, g.height], s: [s.top, s.bottom], t: t.top, first: !!first };
});
console.log(JSON.stringify(r));
assert.ok(r.g[2] >= 44 && r.g[2] <= 56, 'goal bar 44–56px');
assert.ok(r.g[0] >= r.pl[1] && r.g[0] - r.pl[1] <= 28, 'goal bar directly under the player');
assert.ok(r.pl[2] <= 86, 'player card shortened');
assert.ok(r.s[0] >= r.g[1] && r.s[1] <= r.t, 'story rail fully visible without scrolling');
await b.close(); console.log('PASS home goal bar + story rail visible');

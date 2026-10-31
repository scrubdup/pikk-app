import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR } from '../src/data.js';
const page=readFileSync(new URL('../src/pages/loyalty.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/loyalty-premium.css',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('Loyalty Studio retains real browser-local demo actions and privacy binding',()=>{
  for(const id of ['loyListen','loyLive','loyClub','loyHelp','loyReset','loyPublic']) assert.ok(page.includes(id),id);
  for(const fn of ['getLoyalty()','listLoyaltyBadges()','recordLoyaltyAction(','setLoyaltyVisibility(','resetLoyaltyDemo()']) assert.ok(page.includes(fn),fn);
  assert.match(page,/getMissionRankings|joinFanClub/);
  assert.match(page,/Anti-farming cooldowns \+ daily caps/);
  assert.match(page,/TEST MODE/);
});
test('Loyalty Studio is a scoped premium layout with mobile grid and visible real data',()=>{
  for(const name of ['pikk-loyalty-studio','pikk-loyalty-hero','pikk-loyalty-points','pikk-loyalty-badge-grid','pikk-loyalty-privacy','pikk-loyalty-actions']) assert.ok(page.includes(name),name);
  assert.match(page,/\$\{L\.points\}/);
  assert.match(page,/\$\{badgeCards\}/);
  assert.match(page,/\$\{history\}/);
  assert.match(css,/#app:has\(\.pikk-loyalty-studio\)/);
  assert.match(css,/@media\(max-width:640px\)/);
  assert.match(css,/:focus-visible/);
  assert.match(main,/import '\.\/loyalty-premium\.css';/);
  assert.match(main,/'\/loyalty': \{ render: renderLoyalty, bind: bindLoyalty \}/);
  assert.deepEqual(TABBAR.map(t=>t.label),['Music','Videos','Connect','Create','Dating','Games','Shop']);
});

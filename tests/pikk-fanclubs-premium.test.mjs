import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {TABBAR} from '../src/data.js';
const page=readFileSync(new URL('../src/pages/fanclubs.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/fanclubs-premium.css',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('Fan Clubs directory displays real demo club totals and accurate public/gated counts',()=>{
  for(const token of ['fanclubs-studio','fanclubs-hero','fanclubs-stats','fanclubs-grid','fanclubs-discover','fcSearchStatus','fcNoResults','TEST MODE']) assert.ok(page.includes(token),token);
  assert.match(page,/publicCount = clubs.filter/);
  assert.match(page,/gatedCount = clubs.length - publicCount/);
  assert.match(page,/\$\{clubs.length\}/);
});
test('Fan Clubs preserves club creation, joining, following, discussion and moderation',()=>{
  for(const token of ['fcCreateForm','fcName','fcPrivacy','data-open-club','data-join','data-leave','data-follow','data-unfollow','fcPostForm','data-pin','data-remove','fcUnlockSkeet','setMembership']) assert.ok(page.includes(token),token);
  assert.match(main,/'\/fanclubs': \{ render: renderFanClubs, bind: bindFanClubs \}/);
});
test('Fan Clubs search is accessible and never changes hash route for in-page jumps',()=>{
  assert.match(page,/type="search" autocomplete="off"/);
  assert.match(page,/role="status" aria-live="polite"/);
  assert.match(page,/data-fc-jump="fcDiscover"/);
  assert.match(page,/data-fc-jump="fcCreateCard"/);
  assert.match(page,/scrollIntoView/);
  assert.match(page,/card.hidden = !match/);
  assert.match(page,/data-search=/);
  assert.doesNotMatch(page,/href="#fcDiscover"/);
});
test('Fan Clubs styles are scoped and maintain seven approved tabs',()=>{
  assert.match(main,/import '\.\/fanclubs-premium\.css';/);
  assert.match(css,/\.fanclubs-studio/);
  assert.match(css,/@media\(max-width:650px\)/);
  assert.match(css,/:focus-visible/);
  assert.match(css,/\[hidden\]/);
  assert.deepEqual(TABBAR.map(t=>t.label),['Music','Videos','Connect','Create','Dating','Games','Shop']);
});

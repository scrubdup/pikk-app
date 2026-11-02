import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {TABBAR} from '../src/data.js';
const page=readFileSync(new URL('../src/pages/missions.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/missions-premium.css',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('Missions Studio renders real demo campaign summaries without fictional live earnings',()=>{
  for(const token of ['pikk-missions-studio','pikk-missions-hero','pikk-missions-stats','pikk-missions-stat','TEST MODE · NO REAL PAYOUTS']) assert.ok(page.includes(token),token);
  for(const token of ['listMissions().sort','uniqueCreators','proofCount','${active.length}','${uniqueCreators}','${proofCount}']) assert.ok(page.includes(token),token);
  assert.match(page,/not real earnings/);
  assert.match(page,/20% management fee/);
});
test('Missions retains demo create, join, proof, status and ranking actions',()=>{
  for(const token of ['msnSeed','msnSignIn','msnCreate','msnTitle','data-join','data-bump','data-status','msn-proof','getMissionRankings','submitMissionProof','seedDemoMissions','createMission','setMissionStatus']) assert.ok(page.includes(token),token);
  assert.equal((page.match(/id="msnSeed"/g)||[]).length,1,'only one seed control in the rendered template');
  assert.match(main,/'\/missions': \{ render: renderMissions, bind: bindMissions \}/);
});
test('Missions visual CSS stays scoped and preserves approved navigation',()=>{
  assert.match(main,/import '\.\/missions-premium\.css';/);
  assert.match(css,/#app:has\(\.pikk-missions-studio\)/);
  assert.match(css,/@media\(max-width:640px\)/);
  assert.match(css,/:focus-visible/);
  assert.deepEqual(TABBAR.map(t=>t.label),['Music','Videos','Connect','Create','Dating','Games','Shop']);
});

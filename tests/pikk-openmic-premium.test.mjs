import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {TABBAR} from '../src/data.js';
const page=readFileSync(new URL('../src/pages/openmic.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/openmic-premium.css',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('Open Mic premium hero uses actual showcase and local application counts',()=>{
  for(const token of ['openmic-studio','openmic-hero','openmic-stats','omApplyCard','omShowcaseCard','minePending','TEST MODE'])assert.ok(page.includes(token),token);
  assert.match(page,/showcase\.length/);
  assert.match(page,/mine\.length/);
  assert.match(page,/mine\.filter\(\(a\) => a\.status === 'pending'\)/);
  assert.match(page,/No real live stream, uploads or paid placements/);
});
test('Open Mic retains original house media, application, rights and moderation actions',()=>{
  for(const token of ['renderOpenMicHouse','omNextHouse','omForm','omTalent','omTitle','omNote','omRights','omSignIn','omSeed','omAdmin','data-om-approve','data-om-reject','submitOpenMicApplication','setOpenMicStatus','listOpenMicShowcase','ytEmbedSrc'])assert.ok(page.includes(token),token);
  assert.match(main,/'\/openmic': \{ render: renderOpenMic, bind: bindOpenMic \}/);
});
test('Open Mic in-page jump avoids hash router changes and keeps all approved tabs',()=>{
  assert.match(page,/data-om-jump="omApplyCard"/);
  assert.match(page,/data-om-jump="omShowcaseCard"/);
  assert.match(page,/scrollIntoView/);
  assert.match(main,/import '\.\/openmic-premium\.css';/);
  assert.match(css,/\.openmic-studio/);
  assert.match(css,/@media\(max-width:640px\)/);
  assert.match(css,/:focus-visible/);
  assert.deepEqual(TABBAR.map(t=>t.label),['Music','Videos','Connect','Create','Dating','Games','Shop']);
});

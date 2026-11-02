import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const page=readFileSync(new URL('../src/pages/clippers.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/clippers-premium.css',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
test('Clipper Creator Studio shows actual local application counts and honest demo labels',()=>{
  for(const token of ['clippers-studio','clippers-hero','clippers-stats','clipper-application','clipper-submissions','TEST MODE','clipperApps.filter','clipperApps.length'])assert.ok(page.includes(token),token);
  assert.match(page,/No paid campaigns or payouts active/);
  assert.match(page,/total = clipperApps.length/);
  assert.match(page,/a.status === 'approved'/);
  assert.match(page,/a.status === 'pending'/);
});
test('Clipper existing submit and admin demo actions remain available',()=>{
  for(const token of ['cSubmit','submitClipperApp','setClipperStatus','clip-status','cName','cEmail','cTiktok','cIg','cYt','cSamples','cAnalytics','Coming Soon'])assert.ok(page.includes(token),token);
  assert.match(main,/'\/clippers': \{ render: renderClippers, bind: bindClippers \}/);
});
test('Clipper styling is responsive, scoped and imported without replacing player or tabs',()=>{
  assert.match(main,/import '\.\/clippers-premium\.css';/);
  assert.match(css,/@media\(max-width:580px\)/);
  assert.match(css,/\.clippers-hero/);
  assert.match(css,/\.clippers-stats/);
  assert.match(main,/initDbsPlayer/);
  assert.match(main,/TABBAR/);
});

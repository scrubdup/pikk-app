import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR } from '../src/data.js';
const css=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');
const ui=readFileSync(new URL('../src/ui.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('all route pages share one premium style foundation',()=>{
 assert.match(ui,/section class="page"/);
 for(const selector of ['.page > .page-head','.page > .card','.page .card h2','.page .btn.primary','.page .btn.ghost','.page .shop-chip','.pikk-create-sheet','.pikk-create-options a']) assert.ok(css.includes(selector),selector);
 assert.match(css,/@media\(max-width:520px\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css,/focus-visible/);
});
test('branding, player, navigation and test-mode content remain intact',()=>{
 assert.match(html,/brand\/pikk-logo-official\.png/);
 for(const id of ['dbs-sticky-player','spPlay','spQueueBtn','headerProfile','headerMsg','notifBtn','exploreSearchBtn','menuBtn']) assert.ok(html.includes('id="'+id+'"'),id);
 assert.deepEqual(TABBAR.map(t=>t.label),['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
 assert.match(css,/\.pikk-create-overlay\[hidden\]/);
 assert.match(css,/\.sticky-player#dbs-sticky-player/);
});


test('owner mobile home polish keeps media blue/red with white titles and lower tabbar',()=>{
 const css=readFileSync(new URL('../src/styles.css', import.meta.url),'utf8');
 for(const token of [
  '.pikk-home-media-card {',
  'border-color: rgba(47,107,255,.88)',
  '.pikk-home-media-badge {',
  'border: 1px solid #2f6bff',
  '.pikk-home-media-title {',
  'color: #fff',
  'padding-bottom: 4px'
 ]) assert.ok(css.includes(token), token);
});


test('home official-video cards use strong blue chrome and bright white titles',()=>{
 const css=readFileSync(new URL('../src/styles.css', import.meta.url),'utf8');
 for(const token of [
  'border: 2px solid #2f6bff !important',
  '0 0 18px rgba(47,107,255,.58)',
  'background: #ef252c !important',
  '0 0 12px rgba(47,107,255,.72)',
  'color: #fff !important',
  'font-weight: 900'
 ]) assert.ok(css.includes(token), token);
});

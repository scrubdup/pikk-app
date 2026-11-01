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
 assert.match(html,/brand\/pikk-official-approved\.jpg/);
 for(const id of ['dbs-sticky-player','spPlay','spQueueBtn','headerProfile','headerMsg','notifBtn','exploreSearchBtn','menuBtn']) assert.ok(html.includes('id="'+id+'"'),id);
 assert.deepEqual(TABBAR.map(t=>t.label),['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
 assert.match(css,/\.pikk-create-overlay\[hidden\]/);
 assert.match(css,/\.sticky-player#dbs-sticky-player/);
});

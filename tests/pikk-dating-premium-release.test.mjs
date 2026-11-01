import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {renderDating} from '../src/pages/dating.js';
import {TABBAR} from '../src/data.js';
const css=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const html=renderDating();

test('premium Dating screen keeps original prelaunch information and safety promises',()=>{
  for(const marker of ['pikk-dating-hero','pikk-dating-tabs','pikk-dating-experience-grid','dating-live','dating-safety'])assert.ok(html.includes(marker),marker);
  for(const phrase of ['No real matches are being created here','verified adult eligibility','Camera and microphone permissions are never requested','Random Chat never automatically creates a dating match'])assert.ok(html.includes(phrase),phrase);
  assert.match(html,/18\+ · Pre-launch/);
  assert.doesNotMatch(html,/data-real-match|startCamera\(/);
});
test('Dating discovery links navigate only to existing PIKK routes',()=>{
  for(const route of ['#/dating','#/community','#/connect#connect-random-chat','#/messages','#/profile','#/live'])assert.ok(html.includes('href="'+route+'"'),route);
  assert.match(main,/'\/dating': \{ render: renderDating(?:, bind: bindDating)? \}/);
});
test('premium Dating layout works at mobile widths and keyboard focus',()=>{
  for(const selector of ['.pikk-dating-hero','.pikk-dating-tabs','.pikk-dating-experience-grid','.pikk-dating-experience:focus-visible'])assert.ok(css.includes(selector),selector);
  assert.match(css,/@media\(max-width:520px\)/);
  assert.match(css,/@media\(max-width:360px\)/);
  assert.match(css,/@media\(min-width:900px\)/);
  assert.match(css,/#app:has\(\.pikk-dating-hero\)/);
});
test('existing app shell, player, and all seven navigation tabs are preserved',()=>{
  assert.equal(TABBAR.length,7);
  assert.deepEqual(TABBAR.map(t=>t.label),['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
  assert.match(main,/initDbsPlayer/);
  assert.match(readFileSync(new URL('../index.html',import.meta.url),'utf8'),/pikk-official-approved/);
});

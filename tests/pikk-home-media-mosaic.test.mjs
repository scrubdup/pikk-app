import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { VIDEOS, COMING_SOON } from '../src/data.js';
const home=readFileSync(new URL('../src/pages/home.js',import.meta.url),'utf8');
const styles=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('premium home media grid comes from verified catalog rather than fictitious creators',()=>{
 assert.match(home,/carouselMVs\.slice\(0, 6\)/);
 assert.match(home,/new URL\(v\.youtube\)\.searchParams\.get\('v'\)/);
 assert.match(home,/i\.ytimg\.com\/vi\//);
 assert.match(home,/COMING_SOON\.slice\(0, 4\)/);
 assert.ok(VIDEOS.filter(v=>v.featured && v.youtube).length >= 4);
 assert.ok(COMING_SOON.length >= 1);
 assert.doesNotMatch(home,/12\.4K/);
});
test('new layout uses real existing routes and keeps Home live/player/game modules',()=>{
 for(const route of ['explore','videos','music','posts','live','shop','dating']) {
  assert.ok(home.includes('href="#/'+route+'"'),route);
  assert.ok(main.includes("'/"+route+"':"),route);
 }
 for(const s of ['\u0024{visualFeed}','\u0024{stageBlock}','\u0024{bwPreview}','id="homeArcade"','\u0024{liveActivityList}']) assert.ok(home.includes(s),s);
 assert.match(home,/#\/posts\?compose=1/);
 assert.match(home,/No fabricated views or live counts/);
});
test('responsive mosaic, circular releases and controls are present',()=>{
 for(const name of ['.pikk-home-circle-strip','.pikk-home-filterbar','.pikk-home-media-grid','.pikk-home-media-card.is-featured','.pikk-home-media-shadow'])assert.ok(styles.includes(name),name);
 assert.match(styles,/@media\(max-width:560px\)/);
 assert.match(styles,/@media\(prefers-reduced-motion:reduce\)/);
});

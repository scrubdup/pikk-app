import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { PIKK_FEATURED_RATES, renderStoriesAndPromotions } from '../src/featured-promos.js';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const home = read('../src/pages/home.js');
const shells = read('../src/pages/shells.js');
const css = read('../src/featured-promos.css');
const main = read('../src/main.js');

test('owner-approved rates are exact and inventory contains six slots per page', () => {
  assert.deepEqual(PIKK_FEATURED_RATES.map(({tier,slots,day,week})=>({tier,slots,day,week})),[
    {tier:'spotlight',slots:1,day:199,week:999},
    {tier:'featured',slots:2,day:99,week:499},
    {tier:'promo',slots:3,day:49,week:249},
  ]);
  assert.equal(PIKK_FEATURED_RATES.reduce((sum,item)=>sum+item.slots*item.day,0),544);
  for(const page of ['home','videos']) {
    const html=renderStoriesAndPromotions(page);
    assert.equal((html.match(/class="pikk-ad-slot /g)||[]).length,6,page);
    assert.equal((html.match(/data-promo-tier="spotlight"/g)||[]).length,1);
    assert.equal((html.match(/data-promo-tier="featured"/g)||[]).length,2);
    assert.equal((html.match(/data-promo-tier="promo"/g)||[]).length,3);
    assert.ok(html.indexOf('pikk-stories-strip') < html.indexOf('pikk-featured-inventory'),'Stories above sponsored slots');
    for(const price of ['$199','$999','$99','$499','$49','$249'])assert.ok(html.includes(price),price);
    assert.match(html,/Sponsored placements/);
    assert.match(html,/booking and checkout are not active yet/i);
    assert.doesNotMatch(html,/<button[^>]*>(?:Buy|Book|Purchase)/i);
  }
});

test('Home and Videos include shared UI while preserving existing content',()=>{
  assert.match(home,/renderStoriesAndPromotions\('home'\)/);
  assert.match(shells,/renderStoriesAndPromotions\('videos'\)/);
  assert.ok(home.indexOf('${stageBlock}')<home.indexOf("renderStoriesAndPromotions('home')"),'Top live hero preserved above Stories');
  assert.match(home,/\$\{bwPreview\}/);
  assert.match(home,/\$\{visualFeed\}/);
  assert.match(shells,/\$\{sections\}\$\{extra\}/);
  assert.match(shells,/pikk-video-filters/);
  assert.match(main,/import '\.\/featured-promos\.css'/);
});

test('three-row premium responsive layout keeps one, two and three columns',()=>{
  assert.match(css,/pikk-featured-row-hero\{grid-template-columns:minmax\(0,1fr\)/);
  assert.match(css,/pikk-featured-row-two\{grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(css,/pikk-featured-row-three\{grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(css,/@media\(max-width:560px\)/);
});

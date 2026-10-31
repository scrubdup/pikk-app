import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium} from 'playwright';

process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
await mkdir('visual-review', {recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
try{
  for(const [device,width,height] of [['mobile',390,844],['desktop',1440,900]]){
    const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    for(const route of ['home','videos']){
      await page.goto('http://127.0.0.1:5173/#/'+route,{waitUntil:'domcontentloaded'});
      await page.locator('#tabbar a').first().waitFor({state:'visible',timeout:20000});
      await page.waitForTimeout(3600);
      assert.equal(await page.locator('.logo-img').isVisible(),true,'logo preserved');
      assert.equal(await page.locator('#dbs-sticky-player').isVisible(),true,'music player preserved');
      assert.equal(await page.locator('#tabbar a').count(),7,'seven tabs preserved');
      const panel=page.locator('[data-featured-context="'+route+'"]');
      await panel.waitFor({state:'visible'});
      assert.equal(await panel.locator('.pikk-ad-slot').count(),6,route+' has six slots');
      assert.equal(await panel.locator('.pikk-ad-spotlight').count(),1);
      assert.equal(await panel.locator('.pikk-ad-featured').count(),2);
      assert.equal(await panel.locator('.pikk-ad-promo').count(),3);
      const geometry=await panel.evaluate(el=>{
        const story=el.querySelector('.pikk-stories-strip').getBoundingClientRect();
        const ads=el.querySelector('.pikk-featured-inventory').getBoundingClientRect();
        const rows=[...el.querySelectorAll('.pikk-featured-row')].map(row=>({
          columns:getComputedStyle(row).gridTemplateColumns.split(' ').filter(Boolean).length,
          children:row.children.length,
          width:row.getBoundingClientRect().width
        }));
        return {storyAbove:story.bottom<=ads.top,rows,overflow:document.documentElement.scrollWidth-innerWidth};
      });
      assert.equal(geometry.storyAbove,true,route+' stories above sponsored placements');
      assert.deepEqual(geometry.rows.map(r=>r.columns),[1,2,3],route+' layout columns');
      assert.deepEqual(geometry.rows.map(r=>r.children),[1,2,3],route+' slot counts');
      assert.ok(geometry.overflow<=3,route+' horizontal overflow '+geometry.overflow);
      const cardOverlap = await panel.locator('.pikk-ad-slot').evaluateAll(cards => cards.some(card => {
        const icon = card.querySelector('.pikk-ad-slot-icon').getBoundingClientRect();
        const title = card.querySelector('strong').getBoundingClientRect();
        return title.top < icon.bottom + 2;
      }));
      assert.equal(cardOverlap,false,route+' sponsored card titles must clear play icons');
      await panel.locator('.pikk-stories-strip').evaluate(el => {
        window.scrollTo({top: Math.max(0, window.scrollY + el.getBoundingClientRect().top - 195), behavior:'instant'});
      });
      await page.waitForTimeout(120);
      const storyTop = await panel.locator('.pikk-stories-strip').evaluate(el => el.getBoundingClientRect().top);
      assert.ok(storyTop >= 170 && storyTop < height, route + ' Stories must clear the sticky header');
      await page.screenshot({path:'visual-review/pikk-'+route+'-'+device+'-stories-overview.png'});
      await panel.screenshot({path:'visual-review/pikk-'+route+'-'+device+'-stories-ads.png'});
    }
    assert.deepEqual(errors,[],device+' uncaught browser errors');
    await context.close();
  }
  console.log('PASS: 4 Home/Videos mobile/desktop screenshot reviews, 1/2/3 grid, Stories order, no overflow, seven tabs, logo and player.');
}finally{await browser.close();}

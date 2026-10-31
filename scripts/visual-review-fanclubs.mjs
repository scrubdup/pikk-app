import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY='1';
const base='http://127.0.0.1:4173/pikk-app/';
const server=spawn('npx',['vite','preview','--host','127.0.0.1','--port','4173','--strictPort'],{env:{...process.env,VITE_BASE:'/pikk-app/'},stdio:'inherit'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try{
  let ready=false;for(let i=0;i<50;i++){try{if((await fetch(base)).ok){ready=true;break}}catch{}await sleep(250)}
  assert.ok(ready,'Vite preview unavailable');
  await mkdir('visual-review',{recursive:true});
  const browser=await chromium.launch({headless:true});
  try{
    for(const [name,viewport,mobile] of [['mobile',{width:390,height:844},true],['desktop',{width:1440,height:900},false]]){
      const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:'reduce',...(mobile?{isMobile:true,hasTouch:true}:{})});
      const page=await context.newPage();const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      const verify=async phase=>{
        assert.equal(await page.locator('#tabbar a').count(),7,'seven tabs');
        assert.equal(await page.locator('#dbs-sticky-player').isVisible(),true,'persistent music player');
        assert.equal(await page.locator('.logo-img').evaluate(el=>el.complete&&el.naturalWidth>0),true,'official logo loaded');
        const size=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,viewport:innerWidth}));
        assert.ok(size.doc<=size.viewport+3,name+' '+phase+' horizontal overflow '+JSON.stringify(size));
        assert.deepEqual(errors,[],name+' '+phase+' page errors');
        await page.screenshot({path:'visual-review/fanclubs-'+name+'-'+phase+'.png',fullPage:true,animations:'disabled'});
      };
      await page.goto(base+'#/fanclubs',{waitUntil:'domcontentloaded',timeout:30000});
      await page.locator('.fanclubs-hero').waitFor({state:'visible',timeout:20000});
      await page.locator('#splash').waitFor({state:'hidden',timeout:15000});
      assert.equal(await page.locator('.fanclub-card').count(),3,'original seeded clubs preserved');
      assert.equal((await page.locator('.fanclubs-stats strong').first().textContent()).trim(),'3');
      await verify('directory');
      await page.locator('#fcSearch').fill('Ladies Only');
      assert.equal(await page.locator('.fanclub-card:visible').count(),1,'search filters to matching club');
      assert.match(await page.locator('#fcSearchStatus').textContent(),/Showing 1 of 3/);
      await page.locator('#fcSearch').fill('zzzz-no-match');
      assert.equal(await page.locator('.fanclub-card:visible').count(),0,'no-match state');
      assert.equal(await page.locator('#fcNoResults').isVisible(),true);
      await page.locator('#fcSearch').fill('');
      assert.equal(await page.locator('.fanclub-card:visible').count(),3,'search clears');
      await page.locator('[data-fc-jump="fcCreateCard"]').click();
      assert.ok(page.url().endsWith('#/fanclubs'),'in-page jump does not break hash router');
      await page.locator('[data-open-club="fc_official_dbs"]').click();
      await page.locator('.fanclubs-detail').waitFor({state:'visible'});
      assert.match(page.url(),/\/fanclubs\?club=fc_official_dbs/);
      assert.equal(await page.locator('#fcPosts').count(),1,'original public discussion preserved');
      await verify('club-detail');
      await page.locator('[data-back-list]').click();
      await page.locator('.fanclubs-hero').waitFor({state:'visible'});
      assert.equal(await page.locator('#fcCreateForm').count(),1,'original creation form preserved');
      await context.close();
    }
  }finally{await browser.close()}
}finally{server.kill('SIGTERM')}

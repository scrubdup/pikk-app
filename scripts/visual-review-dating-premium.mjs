import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY='1';
const base='http://127.0.0.1:4173/pikk-app/';
const server=spawn('npx',['vite','preview','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'inherit'});
const sleep=t=>new Promise(r=>setTimeout(r,t));
try {
 let ready=false;for(let i=0;i<80;i++){try{if((await fetch(base)).ok){ready=true;break}}catch{}await sleep(250)}
 assert.ok(ready,'preview unavailable');
 await mkdir('visual-review',{recursive:true});
 const browser=await chromium.launch({headless:true});
 try {
  for(const [device,width,height] of [['mobile',390,844],['desktop',1440,900]]){
   const ctx=await browser.newContext({viewport:{width,height},reducedMotion:'reduce'});
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'#/dating',{waitUntil:'domcontentloaded'});
   await page.locator('.pikk-dating-hero').waitFor({state:'visible'});
   await page.locator('#splash').waitFor({state:'hidden',timeout:15000});
   assert.equal(await page.locator('.pikk-dating-tabs button').count(),4);
   assert.equal(await page.locator('.pikk-dating-experience').count(),3);
   assert.equal(await page.locator('.pikk-dating-panel').count(),4);
   assert.equal(await page.locator('#tabbar a').count(),7);
   assert.equal(await page.locator('#dbs-sticky-player').isVisible(),true);
   assert.ok(await page.locator('.logo-img').evaluate(x=>x.complete&&x.naturalWidth>0),'approved logo failed to load');
   assert.ok((await page.locator('.pikk-dating-hero').innerText()).includes('No real matches'));
   const initial=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(initial.scroll<=initial.viewport+3,'horizontal overflow '+JSON.stringify(initial));
   await page.screenshot({path:'visual-review/dating-premium-'+device+'.png',fullPage:true,animations:'disabled'});
   for(const id of ['dating-experiences','dating-live','dating-safety','dating-discover']){
    const button=page.locator('[data-dating-jump="'+id+'"]');
    await button.click();
    assert.equal(await button.getAttribute('aria-pressed'),'true');
    assert.equal(await page.evaluate(()=>document.activeElement?.id),id);
    assert.equal(await page.locator('.pikk-dating-tabs button[aria-pressed="true"]').count(),1);
    assert.equal(await page.locator('#dbs-sticky-player').isVisible(),true);
   }
   assert.deepEqual(errors,[],'page errors');
   await page.goto(base+'#/dating#dating-safety',{waitUntil:'domcontentloaded'});
   await page.locator('[data-dating-jump="dating-safety"][aria-pressed="true"]').waitFor({state:'visible'});
   await ctx.close();
  }
 }finally{await browser.close()}
}finally{server.kill('SIGTERM')}

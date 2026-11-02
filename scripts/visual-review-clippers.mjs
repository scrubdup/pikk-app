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
  assert.ok(ready,'preview unavailable');await mkdir('visual-review',{recursive:true});
  const browser=await chromium.launch({headless:true});
  try{for(const [name,viewport,mobile] of [['mobile',{width:390,height:844},true],['desktop',{width:1440,height:900},false]]){
    const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:'reduce',...(mobile?{isMobile:true,hasTouch:true}:{})});
    const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base+'#/clippers',{waitUntil:'domcontentloaded',timeout:30000});
    await page.locator('.clippers-hero').waitFor({state:'visible',timeout:20000});
    await page.locator('#splash').waitFor({state:'hidden',timeout:15000});
    assert.equal(await page.locator('#tabbar a').count(),7,'seven tabs');
    assert.equal(await page.locator('#dbs-sticky-player').isVisible(),true,'persistent player');
    assert.equal(await page.locator('.logo-img').evaluate(el=>el.complete&&el.naturalWidth>0),true,'official logo image loaded');
    assert.equal(await page.locator('.clippers-stats>div').count(),3);
    assert.equal(await page.locator('#cSubmit').count(),1);
    assert.equal(await page.locator('#clippers-coming-soon').count(),1);
    assert.equal((await page.locator('.clippers-stats strong').first().textContent()).trim(),'0');
    const size=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,viewport:innerWidth}));
    assert.ok(size.doc<=size.viewport+3,name+' horizontal overflow '+JSON.stringify(size));
    assert.deepEqual(errors,[],'JS errors');
    await page.screenshot({path:'visual-review/clippers-'+name+'.png',fullPage:true,animations:'disabled'});
    await context.close();
  }}finally{await browser.close()}
}finally{server.kill('SIGTERM')}

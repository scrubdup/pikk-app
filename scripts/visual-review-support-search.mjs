import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const base='http://127.0.0.1:4173/pikk-app/';
const server=spawn('npx',['vite','preview','--host','127.0.0.1','--port','4173','--strictPort'],{
 env:{...process.env,VITE_BASE:'/pikk-app/'},stdio:'inherit'
});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try{
 let ready=false;
 for(let i=0;i<60;i++){try{if((await fetch(base)).ok){ready=true;break;}}catch{}await sleep(250);}
 assert.ok(ready,'Vite preview unavailable');
 await mkdir('visual-review',{recursive:true});
 const browser=await chromium.launch({headless:true});
 try{
  for(const [name,viewport,mobile] of [
   ['mobile',{width:390,height:844},true],
   ['desktop',{width:1440,height:900},false],
  ]){
   const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:'reduce',...(mobile?{isMobile:true,hasTouch:true}:{})});
   const page=await context.newPage();
   const errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   const capture=async phase=>{
    assert.equal(await page.locator('#tabbar a').count(),7,'preserve seven tabs');
    assert.equal(await page.locator('#dbs-sticky-player').isVisible(),true,'preserve player');
    assert.equal(await page.locator('.logo-img').isVisible(),true,'preserve PIKK logo');
    assert.equal(await page.locator('.logo-img').evaluate(el=>el.complete&&el.naturalWidth>0),true,'logo loads');
    const dims=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
    assert.ok(dims.scroll<=dims.viewport+3,name+' '+phase+' horizontal overflow '+JSON.stringify(dims));
    assert.deepEqual(errors,[],name+' '+phase+' browser errors');
    await page.screenshot({path:'visual-review/support-faq-'+name+'-'+phase+'.png',fullPage:true,animations:'disabled'});
   };
   await page.goto(base+'#/support',{waitUntil:'domcontentloaded',timeout:30000});
   await page.locator('#pikkSupportSearch').waitFor({state:'visible',timeout:20000});
   await page.locator('#splash').waitFor({state:'hidden',timeout:15000});
   const search=page.locator('#pikkSupportSearch');
   const clear=page.locator('#pikkSupportClear');
   const status=page.locator('#pikkSupportSearchStatus');
   assert.match(await status.innerText(),/Showing all 6 help guides/);
   assert.equal(await clear.isHidden(),true);
   await capture('all');

   await search.fill('refund');
   const count=await page.locator('#pikkSupportResults .support-guide').count();
   assert.ok(count>0&&count<6,'filter reduces guides');
   assert.equal(await status.innerText(),count+' matching help '+(count===1?'guide':'guides'));
   assert.equal(await clear.isVisible(),true);
   assert.equal(await page.locator('#pikkSupportResults .support-guide-link').count(),count,'filtered cards preserve CTA');
   await capture('filtered');

   await search.fill('no-such-pikk-topic-zz');
   assert.equal(await status.innerText(),'0 matching help guides');
   assert.match(await page.locator('#pikkSupportResults').innerText(),/Prepare a local support draft/);
   await capture('empty');

   await clear.click();
   assert.equal(await search.inputValue(),'');
   assert.equal(await search.evaluate(el=>el===document.activeElement),true,'Clear restores focus');
   assert.equal(await clear.isHidden(),true);
   assert.equal(await page.locator('#pikkSupportResults .support-guide').count(),6);
   await search.fill('live');
   await search.press('Escape');
   assert.equal(await search.inputValue(),'','Escape clears search');
   assert.equal(await page.locator('#pikkSupportResults .support-guide').count(),6);
   await capture('cleared');
   await context.close();
  }
 }finally{await browser.close();}
}finally{server.kill('SIGTERM');}

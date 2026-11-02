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
  for(const [name,width,height,reducedMotion,expected] of [
   ['mobile',390,844,'reduce','instant'],
   ['desktop',1440,900,'no-preference','smooth']
  ]){
   const ctx=await browser.newContext({viewport:{width,height},reducedMotion});
   await ctx.addInitScript(()=>{
    window.__connectScroll=[];
    Element.prototype.scrollIntoView=function(options){
      window.__connectScroll.push({id:this.id,behavior:options?.behavior});
    };
   });
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto(base+'#/connect#connect-random-chat',{waitUntil:'domcontentloaded'});
   await page.locator('#connect-random-chat').waitFor({state:'visible'});
   await page.locator('#splash').waitFor({state:'hidden',timeout:15000});
   await page.waitForFunction(()=>window.__connectScroll?.some(x=>x.id==='connect-random-chat'));
   const scrolls=await page.evaluate(()=>window.__connectScroll);
   assert.ok(scrolls.some(x=>x.id==='connect-random-chat'&&x.behavior===expected),
      'expected '+expected+' scrolling: '+JSON.stringify(scrolls));
   assert.equal(await page.locator('#tabbar a').count(),7);
   assert.equal(await page.locator('#dbs-sticky-player').isVisible(),true);
   assert.ok(await page.locator('.logo-img').evaluate(x=>x.complete&&x.naturalWidth>0),'approved logo missing');
   const widthInfo=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(widthInfo.scroll<=widthInfo.viewport+3,'horizontal overflow '+JSON.stringify(widthInfo));
   assert.deepEqual(errors,[],'browser errors');
   await page.goto(base+'#/connect',{waitUntil:'domcontentloaded'});
   await page.locator('.pikk-connect-hero').waitFor({state:'visible'});
   await page.screenshot({path:'visual-review/connect-reduced-motion-'+name+'.png',fullPage:true,animations:'disabled'});
   await ctx.close();
  }
 }finally{await browser.close()}
}finally{server.kill('SIGTERM')}

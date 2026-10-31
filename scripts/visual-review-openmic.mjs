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
 assert.ok(ready,'Vite preview unavailable');await mkdir('visual-review',{recursive:true});
 const browser=await chromium.launch({headless:true});
 try{for(const [name,viewport,mobile] of [['mobile',{width:390,height:844},true],['desktop',{width:1440,height:900},false]]){
  const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:'reduce',...(mobile?{isMobile:true,hasTouch:true}:{})});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const verify=async phase=>{
   assert.equal(await page.locator('#tabbar a').count(),7,'seven tabs');
   assert.equal(await page.locator('#dbs-sticky-player').isVisible(),true,'persistent music player');
   assert.equal(await page.locator('.logo-img').evaluate(el=>el.complete&&el.naturalWidth>0),true,'approved PIKK logo loaded');
   const size=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(size.doc<=size.viewport+3,name+' '+phase+' horizontal overflow '+JSON.stringify(size));
   assert.deepEqual(errors,[],name+' '+phase+' JS errors');
   await page.screenshot({path:'visual-review/openmic-'+name+'-'+phase+'.png',fullPage:true,animations:'disabled'});
  };
  await page.goto(base+'#/openmic',{waitUntil:'domcontentloaded',timeout:30000});
  await page.locator('.openmic-hero').waitFor({state:'visible',timeout:20000});
  await page.locator('#splash').waitFor({state:'hidden',timeout:15000});
  assert.equal(await page.locator('.openmic-stats>div').count(),3);
  assert.equal(await page.locator('#omHouse').count(),1,'house catalog preserved');
  assert.equal(await page.locator('#omForm').count(),1,'original application preserved');
  assert.equal(await page.locator('#omRights').count(),1,'rights certification preserved');
  assert.equal(await page.locator('#omShowcaseCard').count(),1);
  assert.equal((await page.locator('.openmic-stats strong').nth(1).textContent()).trim(),'0','signed-out local applications');
  await verify('initial');
  await page.locator('[data-om-jump="omApplyCard"]').click();
  assert.ok(page.url().endsWith('#/openmic'),'jump did not change hash route');
  await page.locator('#omSignIn').click();
  await page.locator('.openmic-hero').waitFor({state:'visible'});
  await page.locator('#omTitle').fill('Original Demo Performance');
  await page.locator('#omNote').fill('Testing an original performance submission');
  await page.locator('#omRights').check();
  await page.locator('#omForm button[type="submit"]').click();
  await page.locator('.openmic-hero').waitFor({state:'visible'});
  assert.equal((await page.locator('.openmic-stats strong').nth(1).textContent()).trim(),'1','local submission counted');
  assert.equal((await page.locator('.openmic-stats strong').nth(2).textContent()).trim(),'1','pending review counted');
  assert.match(await page.locator('body').textContent(),/Original Demo Performance/);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.openmic-hero').waitFor({state:'visible'});
  assert.equal((await page.locator('.openmic-stats strong').nth(1).textContent()).trim(),'1','application persists after reload');
  await verify('submitted');
  await context.close();
 }}finally{await browser.close()}
}finally{server.kill('SIGTERM')}

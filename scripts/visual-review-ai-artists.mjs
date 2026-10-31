import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY='1';
const base='http://127.0.0.1:4173/pikk-app/';
const server=spawn('npx',['vite','preview','--host','127.0.0.1','--port','4173','--strictPort'],{stdio:'inherit'});
const sleep=t=>new Promise(r=>setTimeout(r,t));
try{
 let ready=false;for(let i=0;i<60;i++){try{if((await fetch(base)).ok){ready=true;break}}catch{}await sleep(250)}
 assert.ok(ready,'preview server failed');await mkdir('visual-review',{recursive:true});
 const browser=await chromium.launch({headless:true});
 try{for(const [label,width,height] of [['mobile',390,844],['desktop',1440,900]]){
  const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'#/ai-artists',{waitUntil:'domcontentloaded',timeout:30000});
  await page.locator('.ai-artist-hero').waitFor({state:'visible',timeout:20000});
  await page.locator('#splash').waitFor({state:'hidden',timeout:15000});
  assert.equal(await page.locator('#tabbar a').count(),7,'seven tabs remain');
  assert.equal(await page.locator('#dbs-sticky-player').isVisible(),true,'music player retained');
  assert.ok(await page.locator('.logo-img').evaluate(el=>el.complete&&el.naturalWidth>0),'official logo retained');
  assert.equal(await page.locator('.ai-artist-policies .card').count(),4);
  const capture=async(stage)=>{
   assert.deepEqual(errors,[],'javascript errors');
   const widths=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(widths.scroll<=widths.viewport+3,'unexpected horizontal overflow '+JSON.stringify(widths));
   await page.screenshot({path:'visual-review/ai-artists-'+label+'-'+stage+'.png',fullPage:true,animations:'disabled'});
  };
  await capture('empty');
  await page.locator('#aiArtistName').fill('Virtual Stage Artist');
  await page.locator('#aiTrackName').fill('Original AI Demo');
  await page.locator('#aiArtistCertify').check();
  await page.locator('#aiArtistForm button[type=submit]').click();
  await page.locator('.ai-artist-draft').waitFor({state:'visible'});
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.ai-artist-draft').waitFor({state:'visible'});
  assert.match(await page.locator('.ai-artist-draft').textContent(),/not published/);
  await capture('saved');
  await page.locator('.ai-artist-delete').click();
  await page.locator('.ai-artist-drafts').getByText('No AI music drafts').waitFor();
  await context.close();
 }}finally{await browser.close()}
}finally{server.kill('SIGTERM')}

import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY='1';
const base='http://127.0.0.1:4173/pikk-app/';
const server=spawn('npx',['vite','preview','--host','127.0.0.1','--port','4173','--strictPort'],{env:{...process.env,VITE_BASE:'/pikk-app/'},stdio:'inherit'});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
try{
  let ready=false;
  for(let i=0;i<50;i++){try{if((await fetch(base)).ok){ready=true;break}}catch{}await sleep(250)}
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
        assert.equal(await page.locator('#dbs-sticky-player').isVisible(),true,'persistent player');
        assert.equal(await page.locator('.logo-img').isVisible(),true,'approved logo');
        assert.equal(await page.locator('.logo-img').evaluate(el=>el.complete&&el.naturalWidth>0),true,'logo loaded');
        const bounds=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
        assert.ok(bounds.width<=bounds.viewport+3,name+' '+phase+' horizontal overflow '+JSON.stringify(bounds));
        assert.deepEqual(errors,[],name+' '+phase+' JS errors');
        await page.screenshot({path:'visual-review/missions-'+name+'-'+phase+'.png',fullPage:true,animations:'disabled'});
      };
      await page.goto(base+'#/missions',{waitUntil:'domcontentloaded',timeout:30000});
      await page.locator('.pikk-missions-hero').waitFor({state:'visible',timeout:20000});
      await page.locator('#splash').waitFor({state:'hidden',timeout:15000});
      assert.equal(await page.locator('.pikk-missions-studio').count(),1);
      assert.equal(await page.locator('#msnSeed').count(),1,'single demo seed button');
      assert.equal(await page.locator('#msnCreate').count(),1);
      await verify('initial');
      await page.locator('#msnSeed').click();
      await page.locator('[data-mission]').first().waitFor({state:'visible'});
      assert.ok(await page.locator('[data-mission]').count()>=3,'demo campaigns seeded');
      const stat=await page.locator('.pikk-missions-stat strong').first().textContent();
      assert.ok(Number(stat)>=3,'active demo campaign count updated');
      await page.reload({waitUntil:'domcontentloaded'});
      await page.locator('.pikk-missions-hero').waitFor({state:'visible'});
      assert.ok(await page.locator('[data-mission]').count()>=3,'campaigns persist in local demo');
      await verify('seeded');
      await context.close();
    }
  }finally{await browser.close()}
}finally{server.kill('SIGTERM')}

import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {chromium, devices} from 'playwright';

// Embedded media can leave remote fonts pending indefinitely in CI screenshots.
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
const url='http://127.0.0.1:4173/pikk-app/#/dating';
const server=spawn('npx',['vite','preview','--host','127.0.0.1','--port','4173','--strictPort'],{
  env:{...process.env,VITE_BASE:'/pikk-app/'},stdio:'inherit'
});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try {
  let ready=false;
  for(let i=0;i<50;i++){
    try{const r=await fetch(url);if(r.ok){ready=true;break;}}catch{}
    await sleep(250);
  }
  assert.ok(ready,'Vite preview did not become ready');
  await mkdir('visual-review',{recursive:true});
  const browser=await chromium.launch({headless:true});
  try{
    for(const [name,viewport,mobile] of [
      ['desktop',{width:1440,height:900},false],
      ['mobile',{width:390,height:844},true]
    ]){
      const context=await browser.newContext({
        viewport,deviceScaleFactor:1,
        ...(mobile?{isMobile:true,hasTouch:true}:{}),
        reducedMotion:'reduce'
      });
      const page=await context.newPage();
      const errors=[];
      page.on('pageerror',err=>errors.push(err.message));
      // The PIKK player and embedded media can keep network requests active; wait for the actual Dating hero instead.
      await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});
      await page.locator('.pikk-dating-hero').waitFor({state:'visible',timeout:20000});
      await page.waitForTimeout(3600);
      assert.equal(await page.locator('.pikk-dating-experience').count(),3);
      assert.equal(await page.locator('.pikk-dating-tabs button').count(),4);
      assert.ok(await page.locator('.pikk-dating-hero h2').isVisible());
      assert.ok(await page.getByText('No real matches are being created here').count()>=1);
      assert.ok(await page.locator('#tabbar a').count()===7);
      const bounds=await page.evaluate(()=>({
        documentWidth:document.documentElement.scrollWidth,
        viewportWidth:window.innerWidth,
        logoLoaded:[...document.images].some(img=>img.src.includes('pikk-official-approved')&&img.complete&&img.naturalWidth>0)
      }));
      assert.ok(bounds.documentWidth<=bounds.viewportWidth+3,
        name+' horizontal overflow: '+JSON.stringify(bounds));
      assert.ok(bounds.logoLoaded,name+' approved logo failed to load');
      assert.deepEqual(errors,[],name+' page errors');
      await page.screenshot({path:'visual-review/dating-'+name+'.png',fullPage:true,animations:'disabled'});
      const safety=page.locator('[data-dating-jump="dating-safety"]');
      await safety.click();
      assert.equal(await safety.getAttribute('aria-pressed'),'true');
      assert.equal(await page.evaluate(()=>document.activeElement?.id),'dating-safety');
      console.log(name+' Dating review OK',bounds);
      await context.close();
    }
  }finally{await browser.close();}
}finally{server.kill('SIGTERM');}

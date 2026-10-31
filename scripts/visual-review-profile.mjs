import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY='1';
const base='http://127.0.0.1:4173/pikk-app/';
const server=spawn('npx',['vite','preview','--host','127.0.0.1','--port','4173','--strictPort'],{env:{...process.env,VITE_BASE:'/pikk-app/'},stdio:'inherit'});
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try{
  let ready=false;
  for(let i=0;i<50;i++){try{const r=await fetch(base);if(r.ok){ready=true;break;}}catch{}await sleep(250);}
  assert.ok(ready,'Vite preview unavailable');
  await mkdir('visual-review',{recursive:true});
  const browser=await chromium.launch({headless:true});
  try{
    for(const [name,viewport,mobile] of [['desktop',{width:1440,height:900},false],['mobile',{width:390,height:844},true]]){
      const context=await browser.newContext({viewport,deviceScaleFactor:1,...(mobile?{isMobile:true,hasTouch:true}:{}),reducedMotion:'reduce'});
      const page=await context.newPage();const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      await page.goto(base+'#/profile',{waitUntil:'domcontentloaded',timeout:30000});
      await page.locator('.pikk-profile-guest-hero').waitFor({state:'visible',timeout:20000});
      // The first visit shows PIKK's approved splash; do not capture a false guest review under it.
      await page.locator('#splash').waitFor({state:'hidden',timeout:15000});
      await page.waitForTimeout(250);
      const verify=async phase=>{
        assert.equal(await page.locator('#tabbar a').count(),7);
        assert.equal(await page.locator('#dbs-sticky-player').isVisible(),true);
        assert.equal(await page.locator('.logo-img').isVisible(),true);
        assert.equal(await page.locator('.logo-img').evaluate(el=>el.complete&&el.naturalWidth>0),true);
        const bounds=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:window.innerWidth}));
        assert.ok(bounds.width<=bounds.viewport+3,name+' '+phase+' horizontal overflow '+JSON.stringify(bounds));
        assert.deepEqual(errors,[],name+' '+phase+' browser errors');
        await page.screenshot({path:'visual-review/profile-'+name+'-'+phase+'.png',fullPage:true,animations:'disabled'});
      };
      assert.equal(await page.locator('#signinBtn').isVisible(),true);
      await verify('guest');
      await page.locator('#signinName').fill('PIKKVisualTest');
      await page.locator('#signinBtn').click();
      await page.locator('.pikk-profile-cover[aria-label="Your PIKK profile"]').waitFor({state:'visible',timeout:10000});
      assert.equal(await page.locator('#saveProfile').isVisible(),true);
      assert.equal(await page.locator('.pikk-profile-stats>div').count(),3);
      await verify('own');
      // Public view must show the owner's real public profile, without edit or self-follow controls.
      const previewLink=page.locator('.pikk-profile-shortcuts a',{hasText:'Public view'});
      const previewHref=await previewLink.getAttribute('href');
      assert.match(previewHref,/^#\/profile\/u_[^?]+\?view=public$/);
      await previewLink.click();
      await page.locator('.pikk-profile-cover[aria-label="Public PIKK profile"]').waitFor({state:'visible',timeout:10000});
      assert.equal(await page.locator('#saveProfile').count(),0);
      assert.equal(await page.locator('#pubFollow').count(),0);
      assert.equal(await page.locator('.pikk-profile-shortcuts a',{hasText:'Edit profile'}).isVisible(),true);
      await verify('own-public');
      await page.locator('.pikk-profile-shortcuts a',{hasText:'Edit profile'}).click();
      await page.locator('#saveProfile').waitFor({state:'visible',timeout:10000});
      await page.goto(base+'#/profile/dbs',{waitUntil:'domcontentloaded'});
      await page.locator('.pikk-profile-cover[aria-label="Public PIKK profile"]').waitFor({state:'visible',timeout:10000});
      assert.equal(await page.locator('#pubFollow').isVisible(),true);
      assert.equal(await page.locator('.pikk-profile-stats>div').count(),3);
      await verify('public');
      await context.close();
    }
  }finally{await browser.close();}
}finally{server.kill('SIGTERM');}

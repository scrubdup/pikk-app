import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {chromium} from 'playwright';
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY='1';
const base='http://127.0.0.1:4173/pikk-app/';
const server=spawn('npx',['vite','preview','--host','127.0.0.1','--port','4173','--strictPort'],{env:{...process.env,VITE_BASE:'/pikk-app/'},stdio:'inherit'});
const sleep=t=>new Promise(r=>setTimeout(r,t));
try{
 let ok=false;for(let i=0;i<60;i++){try{if((await fetch(base)).ok){ok=true;break}}catch{}await sleep(250)}
 assert.ok(ok,'preview server failed');await mkdir('visual-review',{recursive:true});
 const browser=await chromium.launch({headless:true});
 try{for(const [label,viewport,mobile] of [['mobile',{width:390,height:844},true],['desktop',{width:1440,height:900},false]]){
  const context=await browser.newContext({viewport,deviceScaleFactor:1,reducedMotion:'reduce',...(mobile?{isMobile:true,hasTouch:true}:{})});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+'#/shield',{waitUntil:'domcontentloaded',timeout:30000});
  await page.locator('.shield-hero').waitFor({state:'visible',timeout:20000});
  await page.locator('#splash').waitFor({state:'hidden',timeout:15000});
  assert.equal(await page.locator('#tabbar a').count(),7);
  assert.equal(await page.locator('#dbs-sticky-player').isVisible(),true);
  assert.ok(await page.locator('.logo-img').evaluate(el=>el.complete&&el.naturalWidth>0),'official logo loaded');
  assert.equal(await page.locator('.shield-roadmap>div').count(),4);
  const check=async(stage)=>{
   assert.deepEqual(errors,[],'JS errors');
   const bounds=await page.evaluate(()=>({document:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(bounds.document<=bounds.viewport+3,'horizontal overflow '+JSON.stringify(bounds));
   await page.evaluate(()=>{document.activeElement?.blur();window.scrollTo({top:0,behavior:'instant'});});
   await page.screenshot({path:'visual-review/shield-'+label+'-'+stage+'.png',fullPage:true,animations:'disabled'});
  };
  await check('empty');
  // Reset clears only unsaved form values and certification; it never deletes drafts.
  await page.locator('#shieldTitle').fill('Unsaved song');
  await page.locator('#shieldOwner').fill('Unsaved artist');
  await page.locator('#shieldContact').fill('unsaved@example.com');
  await page.locator('#shieldSource').fill('https://example.com/unsaved');
  await page.locator('#shieldNotes').fill('Unsaved rights note');
  await page.locator('#shieldCertify').check();
  await page.locator('#shieldForm button[type=reset]').click();
  for(const selector of ['#shieldTitle','#shieldOwner','#shieldContact','#shieldSource','#shieldNotes']){
    assert.equal(await page.locator(selector).inputValue(),'','reset must clear '+selector);
  }
  assert.equal(await page.locator('#shieldCertify').isChecked(),false);
  assert.equal(await page.locator('.shield-entry').count(),0,'reset must not create or delete drafts');
  await check('cleared');
  await page.locator('#shieldTitle').fill('Original demo song');
  await page.locator('#shieldOwner').fill('PIKK Test Artist');
  await page.locator('#shieldContact').fill('test@example.com');
  await page.locator('#shieldSource').fill('https://example.com/official-track');
  await page.locator('#shieldNotes').fill('Original composition; rights held by PIKK Test Artist.');
  await page.locator('#shieldCertify').check();
  await page.locator('#shieldForm button[type=submit]').click();
  await page.locator('.shield-entry').waitFor({state:'visible'});
  assert.match(await page.locator('.shield-entry').first().textContent(),/Local draft — not submitted/);
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('.shield-entry').waitFor({state:'visible'});
  assert.equal(await page.locator('.shield-entry').count(),1,'local persistence');
  const draftSearch = page.locator('#shieldDraftSearch');
  await draftSearch.fill('PIKK Test Artist');
  assert.equal(await page.locator('.shield-entry:visible').count(),1,'artist search finds saved draft');
  assert.equal(await page.locator('#shieldSearchCount').textContent(),'Showing 1 of 1 drafts');
  await draftSearch.fill('not-a-real-song');
  assert.equal(await page.locator('.shield-entry:visible').count(),0,'unmatched drafts hidden');
  assert.equal(await page.locator('#shieldSearchCount').textContent(),'Showing 0 of 1 drafts');
  assert.equal(await page.locator('#shieldSearchEmpty').isVisible(),true,'empty search state visible');
  await check('search-empty');
  await draftSearch.fill('original demo');
  assert.equal(await page.locator('.shield-entry:visible').count(),1,'song title search restores saved draft');
  await draftSearch.fill('');
  assert.equal(await page.locator('.shield-entry:visible').count(),1,'clearing search restores all drafts');
  const downloadPromise = page.waitForEvent('download');
  await page.locator('#shieldExportDrafts').click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(),'pikk-shield-local-drafts.json');
  const downloadPath = await download.path();
  const {readFile} = await import('node:fs/promises');
  const backup = JSON.parse(await readFile(downloadPath,'utf8'));
  assert.equal(backup.format,'PIKK Shield local rights drafts');
  assert.equal(backup.version,1);
  assert.equal(backup.drafts.length,1);
  assert.equal(backup.drafts[0].title,'Original demo song');
  assert.equal(backup.drafts[0].contact,'test@example.com');
  assert.equal(backup.drafts[0].source,'https://example.com/official-track');
  assert.equal(await page.locator('.shield-entry').count(),1,'export must not delete local drafts');
  await check('backup-ready');
  await check('saved');
  const review=page.locator('.shield-draft-details');
  await review.locator('summary').click();
  assert.equal(await review.getAttribute('open'),'', 'review expands on click');
  assert.match(await review.textContent(),/test@example.com/);
  assert.match(await review.textContent(),/Original composition/);
  const source=review.locator('a');
  assert.equal(await source.getAttribute('href'),'https://example.com/official-track');
  assert.equal(await source.getAttribute('rel'),'noopener noreferrer');
  // Full-page screenshots must start at the top; otherwise sticky headers appear mid-capture.
  await page.evaluate(()=>{ document.activeElement?.blur(); window.scrollTo({top:0,behavior:'instant'}); });
  await check('expanded');
  // Dismiss first: the saved rights draft must remain intact.
  page.once('dialog',dialog=>dialog.dismiss());
  await page.locator('.shield-delete').click();
  assert.equal(await page.locator('.shield-entry').count(),1,'cancelled deletion must preserve draft');
  // Confirm second: deletion removes only the selected browser-local draft.
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('.shield-delete').click();
  await page.locator('.shield-history').getByText('No rights declarations').waitFor();
  // Restore the exported backup through the actual file picker and confirmation.
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#shieldImportFile').setInputFiles(downloadPath);
  await page.locator('.shield-entry').waitFor({state:'visible'});
  assert.equal(await page.locator('.shield-entry').count(),1,'backup restores deleted draft');
  assert.match(await page.locator('.shield-entry').textContent(),/Original demo song/);
  await page.reload({waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('.shield-entry').count(),1,'restored draft persists after reload');
  page.once('dialog', dialog => dialog.accept());
  await page.locator('#shieldImportFile').setInputFiles(downloadPath);
  assert.equal(await page.locator('.shield-entry').count(),1,'duplicate backup import does not duplicate drafts');
  await check('restored');
  await context.close();
 }}finally{await browser.close()}
}finally{server.kill('SIGTERM')}

import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
const browser = await chromium.launch({ headless: true });
await mkdir('visual-review', { recursive: true });
try {
  for (const [name,width,height] of [['mobile',390,844],['desktop',1440,900]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto('http://127.0.0.1:5173/#/profile', { waitUntil: 'domcontentloaded' });
    await page.locator('#signinName').fill('PIKK QA');
    await page.locator('#signinBtn').click();
    await page.goto('http://127.0.0.1:5173/#/communities', { waitUntil: 'domcontentloaded' });
    await page.locator('#pikkForum').waitFor();
    if (width >= 1100) {
      const board = await page.locator('#pikkForum').boundingBox();
      assert.ok(board && board.width >= 950, 'Desktop Communities must use wide three-column canvas');
    }
    assert.equal(await page.locator('.pikk-forum-topic-cards button').count(), 8);
    assert.equal(await page.locator('#pikkForumForm').count(), 1);
    assert.ok(await page.locator('a[href="#/community"]').count() > 0, 'PIKK Lounge link preserved');
    await page.locator('#pikkForumTitle').fill('PIKK QA discussion');
    await page.locator('#pikkForumBody').fill('Testing the original community discussion flow.');
    await page.locator('#pikkForumTopic').selectOption('music');
    await page.locator('#pikkForumForm button[type="submit"]').click();
    await page.locator('.pikk-forum-post').waitFor();
    assert.equal(await page.locator('.pikk-forum-post').count(), 1);
    await page.locator('.pikk-forum-votes button[data-fvote="1"]').click();
    assert.equal(await page.locator('.pikk-forum-votes b').textContent(), '1');
    await page.locator('[data-fopen]').click();
    await page.locator('[data-freply] textarea').fill('Welcome to the PIKK discussion.');
    await page.locator('[data-freply] button').click();
    assert.equal(await page.locator('.pikk-forum-comment').count(), 1);
    await page.locator('.pikk-forum-topic-cards [data-ftopic="business"]').click();
    assert.equal(await page.locator('.pikk-forum-post').count(), 0);
    await page.locator('.pikk-forum-topic-cards [data-ftopic="music"]').click();
    assert.equal(await page.locator('.pikk-forum-post').count(), 1);
    await page.locator('[data-fsort="top"]').click();
    await page.waitForTimeout(2500);
    await page.screenshot({ path: 'visual-review/communities-'+name+'.png', fullPage: true });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2), false, 'Horizontal overflow '+name);
    assert.deepEqual(errors, [], 'Browser errors '+name);
    await page.close();
  }
  console.log('Communities local interactions and 390px/1440px visual checks passed.');
} finally { await browser.close(); }

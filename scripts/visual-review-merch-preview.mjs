import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { MERCH } from '../src/data.js';

await mkdir('visual-review', { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  for (const [name, width, height] of [['mobile', 390, 844], ['desktop', 1440, 900]]) {
    const context = await browser.newContext({
      viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:5173/#/merch', { waitUntil: 'domcontentloaded' });
    await page.locator('.merch-grid .merch-card').first().waitFor({ state: 'visible', timeout: 20000 });
    await page.waitForTimeout(3500);
    assert.equal(await page.locator('.merch-card').count(), MERCH.length);
    assert.equal(await page.locator('#tabbar a').count(), 7);
    assert.equal(await page.locator('.logo-img').isVisible(), true);
    assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    assert.ok(overflow <= 3, name + ' horizontal overflow: ' + overflow);
    await page.screenshot({ path: 'visual-review/merch-' + name + '-catalog.png', fullPage: true });

    const opener = page.locator('.merch-card .img-wrap').first();
    await opener.focus();
    await page.keyboard.press('Enter');
    const dialog = page.locator('#merchLightbox');
    assert.equal(await dialog.isVisible(), true);
    assert.equal(await dialog.getAttribute('aria-hidden'), 'false');
    assert.equal(await page.locator('.merch-lightbox-close').evaluate(el => el === document.activeElement), true);
    assert.equal(await dialog.locator('img').getAttribute('alt'), MERCH[0].name);
    await page.screenshot({ path: 'visual-review/merch-' + name + '-preview.png', fullPage: false });
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('.merch-lightbox-close').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Escape');
    assert.equal(await dialog.isVisible(), false);
    assert.equal(await opener.evaluate(el => el === document.activeElement), true);

    await opener.click();
    assert.equal(await dialog.isVisible(), true);
    await page.locator('.merch-lightbox-close').click();
    assert.equal(await dialog.isVisible(), false);
    assert.equal(await opener.evaluate(el => el === document.activeElement), true);
    assert.deepEqual(errors, [], name + ' page errors');
    await context.close();
  }
} finally {
  await browser.close();
}

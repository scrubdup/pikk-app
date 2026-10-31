import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const base = process.env.PIKK_BASE_URL || 'http://127.0.0.1:5173/';
const browser = await chromium.launch({ headless: true });
await mkdir('visual-review', { recursive: true });
try {
  for (const { name, width, height } of [
    { name: 'mobile', width: 390, height: 844 },
    { name: 'desktop', width: 1440, height: 900 },
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    await page.goto(new URL('#/home', base).toString(), { waitUntil: 'networkidle' });
    await page.locator('#splash').waitFor({ state: 'detached', timeout: 8000 }).catch(() => {});
    const menu = page.locator('#menuBtn');
    const drawer = page.locator('#sideNav');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    assert.equal(await drawer.getAttribute('aria-hidden'), 'true');
    assert.equal(await drawer.evaluate(el => el.inert), true);
    await menu.click();
    assert.equal(await menu.getAttribute('aria-expanded'), 'true');
    assert.equal(await drawer.getAttribute('aria-hidden'), 'false');
    assert.equal(await drawer.evaluate(el => el.inert), false);
    assert.equal(await page.evaluate(() => document.querySelector('#sideNav').contains(document.activeElement)), true);
    // Allow the existing 300ms drawer transition to finish before inspecting pixels.
    await page.waitForTimeout(400);
    const drawerRect = await drawer.boundingBox();
    assert.ok(drawerRect && drawerRect.x >= 0 && drawerRect.x < width, 'drawer must be visible inside viewport');
    assert.ok(Number(await page.locator('#scrim').evaluate(el => getComputedStyle(el).opacity)) > 0.9, 'backdrop must be visible');
    await page.screenshot({ path: `visual-review/drawer-open-${name}.png`, fullPage: false });
    await page.keyboard.press('Escape');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    assert.equal(await drawer.getAttribute('aria-hidden'), 'true');
    assert.equal(await drawer.evaluate(el => el.inert), true);
    assert.equal(await menu.evaluate(el => el === document.activeElement), true);
    await menu.click();
    await drawer.locator('a[href="#/updates"]').click();
    await page.waitForURL('**/#/updates');
    assert.equal(await menu.getAttribute('aria-expanded'), 'false');
    assert.equal(await drawer.evaluate(el => el.inert), true);
    assert.equal(await page.locator('#dbs-sticky-player').count(), 1);
    assert.equal(await page.locator('#tabbar a').count(), 7);
    await page.screenshot({ path: `visual-review/drawer-route-${name}.png`, fullPage: false });
    await page.close();
  }
  console.log('Drawer keyboard, route, seven tabs and persistent player verified at 390px and 1440px.');
} finally {
  await browser.close();
}

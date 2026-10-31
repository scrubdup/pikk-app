import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { MERCH } from '../src/data.js';
import { sortPikkShopProducts } from '../src/pages/pikk-shop.js';

process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
await mkdir('visual-review', { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  for (const [name, width, height] of [['mobile', 390, 844], ['desktop', 1440, 900]]) {
    const context = await browser.newContext({
      viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce'
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:5173/#/shop', { waitUntil: 'domcontentloaded' });
    await page.locator('.pikk-shop-real-hero').waitFor({ state: 'visible', timeout: 20000 });
    await page.waitForTimeout(3500); // approved splash completes before capture

    assert.equal(await page.locator('.pikk-shop-featured-product img').count(), 3);
    assert.equal(await page.locator('#pikkShopProducts .pikk-shop-product').count(), MERCH.length);
    assert.equal(await page.locator('#tabbar a').count(), 7);
    assert.deepEqual((await page.locator('#tabbar a').allTextContents()).map(s => s.trim()),
      ['Music','Videos','Connect','Create','Dating','Games','Shop']);
    assert.equal(await page.locator('.logo-img').isVisible(), true);
    assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true);

    await page.waitForFunction(() => [...document.querySelectorAll('.pikk-shop-featured-product img')]
      .every(img => img.complete && img.naturalWidth > 0), null, { timeout: 20000 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    assert.ok(overflow <= 3, name + ' horizontal overflow: ' + overflow);
    const hero = await page.locator('.pikk-shop-real-hero').boundingBox();
    const gallery = await page.locator('.pikk-shop-hero-gallery').boundingBox();
    assert.ok(hero && gallery && gallery.width >= 110 && gallery.x > hero.x,
      name + ' hero gallery must fit beside the headline');
    if (width >= 960) assert.ok(hero.width >= 900, 'Desktop Shop must use the wide content canvas');
    const searchBox = await page.locator('#pikkShopSearch').boundingBox();
    assert.ok(searchBox && searchBox.width >= Math.min(width - 70, 400), name + ' search must be full width');

    await page.screenshot({ path: 'visual-review/shop-' + name + '.png', fullPage: true });
    // The hero CTA must work with Enter and place focus inside the collection,
    // rather than leaving keyboard users stranded on the hero button.
    await page.locator('[data-shop-scroll]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#pikkShopSearch').evaluate(el => document.activeElement === el),
      true, name + ' collection CTA moves focus to merchandise search');
    await page.screenshot({ path: 'visual-review/shop-' + name + '-collection-focus.png', fullPage: false });
    const sort = page.locator('#pikkShopSort');
    assert.equal(await sort.isVisible(), true, name + ' sort menu must be visible');
    for (const order of ['price-asc', 'price-desc', 'name-asc', 'featured']) {
      await sort.selectOption(order);
      const actual = await page.locator('#pikkShopProducts .pikk-shop-product')
        .evaluateAll((items) => items.map((item) => item.dataset.productId));
      assert.deepEqual(actual, sortPikkShopProducts(MERCH, order).map((item) => item.id),
        name + ' merchandise order for ' + order);
      assert.equal(await page.locator('#pikkShopProducts .pikk-shop-product:visible').count(), MERCH.length);
      if (order === 'price-asc') {
        await page.screenshot({ path: 'visual-review/shop-' + name + '-sorted-low.png', fullPage: false });
      }
    }
    assert.equal(await page.locator('#pikkShopReset').isVisible(), false, 'reset view hidden by default');
    await sort.selectOption('price-desc');
    assert.equal(await page.locator('#pikkShopReset').isVisible(), true, 'reset view visible when only sorting changes');
    await page.screenshot({ path: 'visual-review/shop-' + name + '-reset-sort-active.png', fullPage: false });
    await page.locator('#pikkShopReset').click();
    assert.equal(await sort.inputValue(), 'featured', 'reset view restores featured sort');
    assert.deepEqual(await page.locator('#pikkShopProducts .pikk-shop-product')
      .evaluateAll((items) => items.map((item) => item.dataset.productId)), MERCH.map((item) => item.id));
    assert.equal(await page.locator('#pikkShopReset').isVisible(), false, 'reset view hidden after restoring defaults');
    await page.screenshot({ path: 'visual-review/shop-' + name + '-reset-sort-restored.png', fullPage: false });
    await page.locator('.pikk-shop-category[data-category="Hats"]').click();
    const catalogPosition = await page.locator('#pikkShopCatalog').boundingBox();
    assert.ok(catalogPosition && catalogPosition.y >= 175, name + ' catalog must clear sticky header');
    assert.equal(await page.locator('#pikkShopProducts .pikk-shop-product:visible').count(),
      MERCH.filter(p => p.category === 'Hats').length);
    assert.equal(await page.locator('.pikk-shop-category[data-category="Hats"]').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('#pikkShopReset').isVisible(), true, 'clear filters available for category');
    await page.screenshot({ path: 'visual-review/shop-' + name + '-hats.png', fullPage: false });
    await page.locator('#pikkShopSearch').fill('not-a-real-hat-98765');
    assert.equal(await page.locator('#pikkShopProducts .pikk-shop-product:visible').count(), 0);
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#pikkShopSearch').inputValue(), '', name + ' Escape clears search');
    assert.equal(await page.locator('.pikk-shop-category[data-category="Hats"]').getAttribute('aria-pressed'), 'true', name + ' Escape keeps category');
    assert.equal(await page.locator('#pikkShopProducts .pikk-shop-product:visible').count(), MERCH.filter(p => p.category === 'Hats').length, name + ' Escape restores category results');
    assert.equal(await page.locator('#pikkShopSearch').evaluate(el => document.activeElement === el), true, name + ' Escape keeps search focus');
    await page.screenshot({ path: 'visual-review/shop-' + name + '-escape-keeps-hats.png', fullPage: false });
    await page.locator('.pikk-shop-category[data-category="All"]').click();
    await page.locator('#pikkShopSearch').fill('Buffalo');
    assert.equal(await page.locator('#pikkShopProducts .pikk-shop-product:visible').count(),
      MERCH.filter(p => (p.name + ' ' + p.category).toLowerCase().includes('buffalo')).length);
    assert.equal(await page.locator('#pikkShopReset').isVisible(), true, 'clear filters available for search');
    await page.locator('#pikkShopSearch').fill('definitely-no-such-merchandise-000');
    assert.equal(await page.locator('#pikkShopProducts .pikk-shop-product:visible').count(), 0);
    assert.equal(await page.locator('#pikkShopEmpty').isVisible(), true, 'empty state visible');
    await page.screenshot({ path: 'visual-review/shop-' + name + '-no-results.png', fullPage: false });
    await page.locator('#pikkShopReset').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#pikkShopSearch').inputValue(), '');
    assert.equal(await page.locator('#pikkShopProducts .pikk-shop-product:visible').count(), MERCH.length, 'all original products restored');
    assert.equal(await page.locator('#pikkShopCount').textContent(), MERCH.length + ' items');
    assert.equal(await page.locator('#pikkShopEmpty').isVisible(), false);
    assert.equal(await page.locator('#pikkShopReset').isVisible(), false);
    assert.equal(await page.locator('.pikk-shop-category[data-category="All"]').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('#pikkShopSearch').evaluate(el => document.activeElement === el), true, 'keyboard focus returned to search');
    await page.screenshot({ path: 'visual-review/shop-' + name + '-filters-cleared.png', fullPage: false });
    assert.deepEqual(errors, [], name + ' page exceptions');
    await context.close();
  }
  console.log('PIKK Shop visual checks passed at 390px and 1440px; real images, filters, player, logo, nav and overflow verified.');
} finally {
  await browser.close();
}

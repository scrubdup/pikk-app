import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

// The app uses local/system fonts; avoid a flaky Chromium screenshot wait on
// unrelated pending web fonts (e.g. third-party embedded media).
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';

// Checks the owner's screenshot requirement: ALL seven bottom tabs use the
// existing Create dialog's actual grid, outlined icons, tile and cancel CSS.
// These are real browser interactions, not static string checks.
const sections = [
  ['create', 'pikkCreateMenu', 30],
  ['music', 'pikkMusicMenu', 5],
  ['videos', 'pikkVideosMenu', 4],
  ['connect', 'pikkConnectMenu', 6],
  ['dating', 'pikkDatingMenu', 4],
  ['games', 'pikkGamesMenu', 16],
  ['shop', 'pikkShopMenu', 4],
];
const expectedTabs = ['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop'];
await mkdir('visual-review', { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  for (const [device, width, height] of [['mobile', 390, 844], ['desktop', 1440, 900]]) {
    const context = await browser.newContext({
      viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: 'reduce'
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://127.0.0.1:5173/#/home', { waitUntil: 'domcontentloaded' });
    await page.locator('#tabbar a').first().waitFor({ state: 'visible', timeout: 20000 });
    await page.waitForTimeout(3600); // allow the approved startup splash to clear

    assert.deepEqual((await page.locator('#tabbar a').allTextContents()).map(t => t.trim()), expectedTabs);
    assert.equal(await page.locator('.logo-img').isVisible(), true, 'PIKK logo must stay visible');
    assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true, 'music player must stay visible');

    let createStyle;
    for (const [name, id, count] of sections) {
      await page.evaluate(() => { location.hash = '#/home'; });
      assert.equal(await page.locator('#tabbar a[href="#/home"]').count(), 0, 'Home must not be in bottom nav');
      const trigger = page.locator('#tabbar a[href="#/' + name + '"]');
      await trigger.waitFor({ state: 'visible' });
      await trigger.click();
      const panel = page.locator('#' + id);
      await panel.waitFor({ state: 'visible', timeout: 10000 });
      const sheet = panel.locator('.pikk-create-sheet');
      const tiles = sheet.locator('.pikk-create-grid .pikk-create-tile');
      assert.equal(await tiles.count(), count, device + ' ' + name + ' tile count');
      assert.equal(await sheet.locator('.pikk-menu-cancel').count(), 1, name + ' Cancel');
      assert.equal(await tiles.locator('.pikk-menu-icon svg').count(), count, name + ' SVG icons');
      assert.equal(await trigger.getAttribute('aria-expanded'), 'true', name + ' expanded');
      const geometry = await sheet.evaluate(el => {
        const grid = el.querySelector('.pikk-create-grid');
        const tile = grid.querySelector('.pikk-create-tile');
        const icon = tile.querySelector('.pikk-menu-icon');
        const rect = el.getBoundingClientRect();
        return {
          columns: getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length,
          tileRadius: getComputedStyle(tile).borderRadius,
          tileBackground: getComputedStyle(tile).backgroundImage,
          iconWidth: getComputedStyle(icon).width,
          sheetRadius: getComputedStyle(el).borderRadius,
          withinViewport: rect.left >= -2 && rect.right <= innerWidth + 2 &&
            rect.top >= -2 && rect.bottom <= innerHeight + 2,
          overflow: document.documentElement.scrollWidth - innerWidth
        };
      });
      assert.equal(geometry.columns, 3, device + ' ' + name + ' must have three columns');
      assert.ok(geometry.withinViewport, device + ' ' + name + ' dialog exceeds viewport');
      assert.ok(geometry.overflow <= 3, device + ' ' + name + ' horizontal overflow');
      if (name === 'create') createStyle = geometry;
      else {
        // Every menu uses the same actual Create styles, not an approximation.
        for (const key of ['tileRadius','tileBackground','iconWidth','sheetRadius'])
          assert.equal(geometry[key], createStyle[key], device + ' ' + name + ' ' + key);
      }
      await page.screenshot({ path: 'visual-review/tabs-' + device + '-' + name + '.png' });
      if (name === 'create') {
        // The expanded menu must scroll to the last approved options on both viewports.
        await sheet.evaluate(el => { el.scrollTop = el.scrollHeight; });
        await panel.getByText('Artist Protection', { exact: true }).scrollIntoViewIfNeeded();
        assert.equal(await panel.getByText('Artist Protection', { exact: true }).isVisible(), true);
        assert.equal(await panel.getByText('AI Support', { exact: true }).count(), 1);
        assert.equal(await panel.locator('.pikk-create-tile-planned[aria-disabled="true"]').count() > 0, true);
        await page.screenshot({ path: 'visual-review/tabs-' + device + '-create-bottom.png' });
        await sheet.evaluate(el => { el.scrollTop = 0; });
      }
      if (name === 'games') {
        assert.equal(await panel.locator('.pikk-menu-planned[aria-disabled="true"]').count(), 14, '14 upcoming games are visibly disabled');
        assert.equal(await panel.locator('.pikk-menu-planned[href]').count(), 0, 'planned games cannot masquerade as links');
        await sheet.evaluate(el => { el.scrollTop = el.scrollHeight; });
        await panel.getByText('PIKK Cup Pong', { exact: true }).scrollIntoViewIfNeeded();
        assert.equal(await panel.getByText('PIKK Cup Pong', { exact: true }).isVisible(), true, 'last planned game is accessible');
        await page.screenshot({ path: 'visual-review/tabs-' + device + '-games-bottom.png' });
        await sheet.evaluate(el => { el.scrollTop = 0; });
      }
      await sheet.locator('.pikk-menu-cancel').click();
      await panel.waitFor({ state: 'hidden' });
      assert.equal(await trigger.getAttribute('aria-expanded'), 'false', name + ' cancel expanded');
      await trigger.click();
      await panel.waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await panel.waitFor({ state: 'hidden' });
      await trigger.click();
      await panel.waitFor({ state: 'visible' });
      const firstHref = await tiles.first().getAttribute('href');
      assert.ok(firstHref?.startsWith('#/'), name + ' first tile route');
      await tiles.first().click();
      await panel.waitFor({ state: 'hidden' });
      await page.waitForFunction(expected => location.hash === expected, firstHref);
      assert.equal(await page.locator('#tabbar a').count(), 7, 'navigation preserved after route');
    }
    // The Create menu must navigate to the real, explicitly local-only Shield prototype.
    await page.evaluate(() => { location.hash = '#/home'; });
    await page.locator('#tabbar a[href="#/create"]').click();
    const shieldLink = page.locator('#pikkCreateMenu a[href="#/shield"]');
    await shieldLink.scrollIntoViewIfNeeded();
    assert.equal(await shieldLink.getByText('Artist Protection').isVisible(), true);
    await shieldLink.click();
    await page.waitForFunction(() => location.hash === '#/shield');
    assert.equal(await page.locator('#pikkCreateMenu').isHidden(), true);
    await page.locator('.shield-hero').waitFor({ state: 'visible', timeout: 10000 });
    assert.equal(await page.locator('.shield-hero').isVisible(), true);
    assert.match(await page.locator('.shield-notice').innerText(), /No upload scanning, automated fingerprinting/i);
    assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true);
    assert.equal(await page.locator('#tabbar a').count(), 7);
    await page.screenshot({ path: 'visual-review/tabs-' + device + '-shield-route.png' });
    assert.deepEqual(errors, [], device + ' uncaught errors');
    await context.close();
  }
  console.log('PASS: 7 Create-matched menus x 2 viewports, 18 screenshots, SVG icons, 3-column grids, Cancel, Escape, route navigation, logo/player/nav and no overflow.');
} finally {
  await browser.close();
}

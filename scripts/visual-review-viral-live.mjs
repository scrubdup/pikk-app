import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
const BASE_URL = process.env.PIKK_VISUAL_BASE_URL || 'http://127.0.0.1:5173/';
await mkdir('visual-review', { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
try {
  for (const [device, width, height] of [['small-mobile',320,740],['mobile',390,844],['desktop',1440,900]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(BASE_URL + '#/viral-live', { waitUntil: 'domcontentloaded' });
    await page.locator('#pikkViralPreview').waitFor({ state: 'visible', timeout: 20000 });
    assert.equal(await page.locator('#tabbar a').count(), 7, 'seven approved tabs remain');
    assert.equal(await page.locator('.logo-img').isVisible(), true, 'approved PIKK logo remains');
    assert.equal(await page.locator('.pikk-viral-hero-logo').isVisible(), true, 'official approved PIKK hero logo visible on mobile and desktop');
    assert.match(await page.locator('.pikk-viral-hero-logo').getAttribute('src'), /\/brand\/pikk-official-approved\.jpg$/);
    assert.equal(await page.locator('.pikk-viral-hero-logo').evaluate(el => el.complete && el.naturalWidth > 0), true, 'approved hero image loads');
    const heroPath = await page.locator('.pikk-viral-hero-logo').evaluate(el => new URL(el.currentSrc).pathname);
    assert.equal(heroPath, new URL('brand/pikk-official-approved.jpg', BASE_URL).pathname, 'hero artwork uses the actual deployment base');
    assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true, 'persistent player remains');
    assert.equal(await page.locator('[data-viral-pick]').count(), 3, 'three original sources');
    assert.equal(await page.locator('#pikkViralSource').getAttribute('href'), 'https://www.youtube.com/watch?v=-rHDLWfiuDI');
    assert.match(await page.locator('#pikkViralThumbnail').getAttribute('src'), /-rHDLWfiuDI\/hqdefault\.jpg$/);
    assert.equal(await page.locator('.pikk-viral-choice-thumb').count(), 3);
    if (device !== 'desktop') {
      const tabs = await page.locator('[data-viral-type]').evaluateAll(items => items.map(el => ({ top: el.getBoundingClientRect().top, width: el.getBoundingClientRect().width })));
      assert.equal(tabs.length, 4, 'all content categories remain present');
      assert.ok(tabs.every(tab => Math.abs(tab.top - tabs[0].top) <= 2), 'all four category tabs remain in one mobile row');
      if (device === 'small-mobile') {
        const strip = await page.locator('.pikk-viral-tabs').evaluate(el => ({ scrollWidth: el.scrollWidth, clientWidth: el.clientWidth }));
        assert.ok(strip.scrollWidth > strip.clientWidth, '320px category strip scrolls inside its container');
      }
    }
    await page.locator('[data-viral-pick="1"]').click();
    assert.match(await page.locator('#pikkViralTitle').textContent(), /^93 ft/);
    assert.match(await page.locator('#pikkViralThumbnail').getAttribute('src'), /zC0BYFxs5W0\/hqdefault\.jpg$/);
    assert.equal(await page.locator('#pikkViralSource').getAttribute('href'), 'https://www.youtube.com/watch?v=zC0BYFxs5W0');
    assert.equal(await page.locator('[data-viral-pick="1"]').getAttribute('aria-pressed'), 'true');
    // Arrow/Home/End navigation in the source queue changes the preview and focus together.
    await page.locator('[data-viral-pick="1"]').focus();
    await page.keyboard.press('ArrowRight');
    assert.match(await page.locator('#pikkViralTitle').textContent(), /No Love/i);
    assert.equal(await page.locator('[data-viral-pick="2"]').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('[data-viral-pick="2"]').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('Home');
    assert.equal(await page.locator('[data-viral-pick="0"]').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('#pikkViralSource').getAttribute('href'), 'https://www.youtube.com/watch?v=-rHDLWfiuDI');
    await page.keyboard.press('End');
    assert.equal(await page.locator('[data-viral-pick="2"]').getAttribute('aria-pressed'), 'true');
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('[data-viral-pick="0"]').getAttribute('aria-pressed'), 'true', 'right arrow wraps');
    await page.keyboard.press('ArrowUp');
    assert.equal(await page.locator('[data-viral-pick="2"]').getAttribute('aria-pressed'), 'true', 'up arrow wraps');
    await page.keyboard.press('ArrowDown');
    assert.equal(await page.locator('[data-viral-pick="0"]').getAttribute('aria-pressed'), 'true', 'down arrow wraps');
    await page.locator('[data-viral-type="photos"]').click();
    assert.equal(await page.locator('#viral-panel-photos').isVisible(), true);
    assert.equal(await page.locator('#viral-panel-videos').isVisible(), false);
    // Tab from the selected category to its panel, including the empty states.
    await page.locator('[data-viral-type="photos"]').focus();
    await page.keyboard.press('Tab');
    assert.equal(await page.locator('#viral-panel-photos').evaluate(el => el === document.activeElement), true, 'selected panel receives keyboard focus');
    assert.equal(await page.locator('#viral-panel-photos').evaluate(el => getComputedStyle(el).outlineStyle), 'solid', 'focused panel has a visible outline');
    await page.screenshot({ path: 'visual-review/pikk-viral-live-'+device+'-panel-focus.png' });
    await page.locator('[data-viral-type="videos"]').click();
    assert.equal(await page.locator('#viral-panel-videos').isVisible(), true);
    // Keyboard interaction is part of the WAI-ARIA tablist contract.
    await page.locator('[data-viral-type="videos"]').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('[data-viral-type="clips"]').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#viral-panel-clips').isVisible(), true);
    assert.equal(await page.locator('[data-viral-type="clips"]').evaluate(el => el === document.activeElement), true);
    await page.keyboard.press('End');
    assert.equal(await page.locator('[data-viral-type="photos"]').getAttribute('tabindex'), '0');
    assert.equal(await page.locator('#viral-panel-photos').isVisible(), true);
    if (device !== 'desktop') {
      // Photos is initially off-screen in the 320px horizontal tab strip.
      // End must both select it and reveal its full touch target.
      await page.waitForFunction(() => {
        const tab = document.querySelector('[data-viral-type="photos"]');
        const rail = tab?.closest('.pikk-viral-tabs');
        if (!tab || !rail) return false;
        const a = tab.getBoundingClientRect(), b = rail.getBoundingClientRect();
        return a.left >= b.left - 2 && a.right <= b.right + 2;
      });
    }
    await page.keyboard.press('Home');
    assert.equal(await page.locator('[data-viral-type="videos"]').getAttribute('aria-selected'), 'true');
    assert.equal(await page.locator('#viral-panel-videos').isVisible(), true);
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator('[data-viral-type="photos"]').getAttribute('aria-selected'), 'true', 'left arrow wraps to last tab');
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('[data-viral-type="videos"]').getAttribute('tabindex'), '0');
    assert.equal(await page.locator('[data-viral-type="videos"]').evaluate(el => el === document.activeElement), true);

    const overflowReport = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - innerWidth,
      offenders: Array.from(document.querySelectorAll('body *')).filter(el => el.getBoundingClientRect().right > innerWidth + 3 && getComputedStyle(el).position !== 'fixed').slice(0, 8).map(el => ({ tag: el.tagName, className: String(el.className).slice(0, 100), right: Math.round(el.getBoundingClientRect().right) }))
    }));
    assert.ok(overflowReport.overflow <= 3, device + ' horizontal overflow ' + JSON.stringify(overflowReport));
    // Interacting with Up Next scrolls to the queue; return to the top before reviewing first paint.
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(250);
    await page.screenshot({ path: 'visual-review/pikk-viral-live-'+device+'-viewport.png' });
    await page.screenshot({ path: 'visual-review/pikk-viral-live-'+device+'.png', fullPage: true });
    assert.deepEqual(errors, [], device + ' JS errors');
    // Empty categories must offer relevant working routes, not send every visitor to Clips.
    for (const [type, destination, label] of [
      ['clips', '#/shorts', 'Browse existing PIKK Clips'],
      ['songs', '#/music', 'Explore PIKK Music'],
      ['photos', '#/home', 'Explore PIKK Home'],
    ]) {
      await page.locator('[data-viral-type="' + type + '"]').click();
      const fallback = page.locator('#viral-panel-' + type + ' a.btn.ghost');
      assert.equal(await fallback.isVisible(), true, type + ' fallback visible');
      assert.equal(await fallback.getAttribute('href'), destination, type + ' link destination');
      assert.equal((await fallback.textContent()).trim(), label, type + ' descriptive link');
      // Reset keyboard focus and scroll before full-page capture so fixed chrome is
      // captured at its natural top-of-page position on narrow devices.
      await page.evaluate(() => {
        document.activeElement?.blur();
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      await page.waitForTimeout(150);
      await page.screenshot({ path: 'visual-review/pikk-viral-live-' + device + '-' + type + '.png', fullPage: true });
      await fallback.click();
      await page.waitForFunction(hash => location.hash === hash, destination);
      assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true, type + ' retains persistent player');
      await page.goto(BASE_URL + '#/viral-live', { waitUntil: 'domcontentloaded' });
      await page.locator('#pikkViralPreview').waitFor({ state: 'visible' });
    }
    await page.goto(BASE_URL + '#/live?tab=categories', { waitUntil: 'domcontentloaded' });
    await page.locator('#liveTabCategories').waitFor({ state: 'visible' });
    assert.ok(await page.locator('a[href="#/viral-live"]').count() > 0, 'Viral Live linked from Live categories');
    await context.close();
  }
  console.log('PIKK Viral Live preview: mobile/desktop route, original links, tabs, queue, chrome and overflow verified.');
} finally {
  await browser.close();
}

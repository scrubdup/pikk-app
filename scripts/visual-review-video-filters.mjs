import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
const base = 'http://127.0.0.1:4173/pikk-app/';
const server = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
  env: { ...process.env, VITE_BASE: '/pikk-app/' }, stdio: 'inherit',
});
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(base)).ok) { ready = true; break; } } catch {}
    await sleep(250);
  }
  assert.ok(ready, 'PIKK preview server did not start');
  await mkdir('visual-review', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const [label, viewport, mobile] of [
      ['mobile', { width: 390, height: 844 }, true],
      ['desktop', { width: 1440, height: 900 }, false],
    ]) {
      const context = await browser.newContext({
        viewport, deviceScaleFactor: 1, reducedMotion: 'reduce',
        ...(mobile ? { isMobile: true, hasTouch: true } : {}),
      });
      try {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(base + '#/videos', { waitUntil: 'domcontentloaded', timeout: 30000 });
        await page.locator('.pikk-video-filters').waitFor({ state: 'visible', timeout: 20000 });
        await page.locator('#splash').waitFor({ state: 'hidden', timeout: 15000 });
        assert.equal(await page.locator('#tabbar a').count(), 7);
        assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true);
        assert.ok(await page.locator('.logo-img').evaluate(el => el.complete && el.naturalWidth > 0));
        const check = async stage => {
          assert.deepEqual(errors, [], 'browser JavaScript errors');
          const bounds = await page.evaluate(() => ({ doc: document.documentElement.scrollWidth, width: innerWidth }));
          assert.ok(bounds.doc <= bounds.width + 3, 'horizontal overflow ' + JSON.stringify(bounds));
          await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo({ top: 0, behavior: 'instant' }); });
          await page.screenshot({ path: 'visual-review/videos-' + label + '-' + stage + '.png', fullPage: true, animations: 'disabled' });
        };
        assert.equal(await page.locator('.pikk-video-coming-card:not([hidden])').count(), 3);
        await check('all');
        await page.locator('[data-videos-filter="Music Videos"]').click();
        assert.equal(await page.locator('.pikk-video-coming-list').isHidden(), true, 'unrelated upcoming content should disappear');
        assert.equal(await page.locator('[data-video-filter-status]').textContent(), 'Showing Music Videos.');
        await page.locator('[data-videos-filter="Interviews"]').click();
        assert.equal(await page.locator('.pikk-video-coming-card:not([hidden])').count(), 1, 'show only upcoming interviews');
        assert.equal(await page.locator('.pikk-video-coming-card:not([hidden]) h3').textContent(), 'Interviews');
        await check('interviews');
        // Keyboard category navigation: Right/Left wrap, Home/End jump, and update aria-pressed.
        await page.locator('[data-videos-filter="Interviews"]').focus();
        await page.keyboard.press('ArrowRight');
        assert.equal(await page.locator('[data-videos-filter="All"]').getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('[data-videos-filter="All"]').evaluate(el => document.activeElement === el), true);
        await page.keyboard.press('ArrowLeft');
        assert.equal(await page.locator('[data-videos-filter="Interviews"]').getAttribute('aria-pressed'), 'true');
        await page.keyboard.press('Home');
        assert.equal(await page.locator('[data-videos-filter="All"]').getAttribute('aria-pressed'), 'true');
        await page.keyboard.press('End');
        assert.equal(await page.locator('[data-videos-filter="Interviews"]').getAttribute('aria-pressed'), 'true');
        await check('keyboard-interviews');
        await page.locator('[data-videos-filter="Mixes"]').click();
        assert.equal(await page.locator('.pikk-video-coming-list').isHidden(), true, 'Mixes should not display unrelated upcoming titles');
        await page.locator('[data-videos-filter="All"]').click();
        assert.equal(await page.locator('.pikk-video-coming-card:not([hidden])').count(), 3, 'All restores every upcoming title');
        assert.equal(await page.locator('[data-video-filter-status]').textContent(), 'Showing all video categories and upcoming titles.');
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
} finally {
  server.kill('SIGTERM');
}
console.log('Video filter visual review passed at 390px and 1440px.');

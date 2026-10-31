import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
const base = 'http://127.0.0.1:4173/pikk-app/';
const server = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
  env: { ...process.env, VITE_BASE: '/pikk-app/' }, stdio: 'inherit'
});
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  let ready = false;
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(base)).ok) { ready = true; break; } } catch {}
    await sleep(250);
  }
  assert.ok(ready, 'Vite preview unavailable');
  await mkdir('visual-review', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const [name, viewport, mobile] of [
      ['desktop', { width: 1440, height: 900 }, false],
      ['mobile', { width: 390, height: 844 }, true]
    ]) {
      const context = await browser.newContext({
        viewport, deviceScaleFactor: 1, reducedMotion: 'reduce',
        ...(mobile ? { isMobile: true, hasTouch: true } : {})
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + '#/earnings', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('.pikk-earnings-hero').waitFor({ state: 'visible', timeout: 20000 });
      await page.locator('#splash').waitFor({ state: 'hidden', timeout: 15000 });
      const check = async phase => {
        assert.equal(await page.locator('#tabbar a').count(), 7, 'seven tabs');
        assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true, 'sticky player');
        assert.equal(await page.locator('.logo-img').isVisible(), true, 'official logo');
        assert.equal(await page.locator('.logo-img').evaluate(el => el.complete && el.naturalWidth > 0), true, 'logo loaded');
        assert.equal(await page.locator('.pikk-earnings-summary .grid-2>div').count(), 4, 'summary metrics');
        assert.equal(await page.getByText('TEST MODE · not real money').count(), 1);
        const bounds = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth }));
        assert.ok(bounds.width <= bounds.viewport + 3, name + ' ' + phase + ' overflow ' + JSON.stringify(bounds));
        assert.deepEqual(errors, [], name + ' ' + phase + ' page errors');
        await page.screenshot({ path: 'visual-review/earnings-' + name + '-' + phase + '.png', fullPage: true, animations: 'disabled' });
      };
      await check('empty');
      await page.locator('.pikk-earnings-summary #earnSeed').click();
      await page.locator('.pikk-earnings-summary').waitFor({ state: 'visible' });
      await page.locator('a.earn-filter[href="#/earnings?cat=gifts"]').click();
      await page.waitForTimeout(200);
      assert.ok(page.url().includes('cat=gifts'), 'filter route');
      await check('filtered');
      await context.close();
    }
  } finally { await browser.close(); }
} finally { server.kill('SIGTERM'); }

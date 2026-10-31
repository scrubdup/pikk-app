import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
const base = 'http://127.0.0.1:4173/pikk-app/';
const server = spawn('npx', ['vite','preview','--host','127.0.0.1','--port','4173','--strictPort'], {
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
      ['mobile', { width: 390, height: 844 }, true],
      ['desktop', { width: 1440, height: 900 }, false]
    ]) {
      const context = await browser.newContext({
        viewport, deviceScaleFactor: 1, reducedMotion: 'reduce',
        ...(mobile ? { isMobile: true, hasTouch: true } : {})
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(base + '#/wallet', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('.pikk-wallet-hero').waitFor({ state: 'visible', timeout: 20000 });
      await page.locator('#splash').waitFor({ state: 'hidden', timeout: 15000 });
      const verify = async phase => {
        assert.equal(await page.locator('#tabbar a').count(), 7, 'seven navigation tabs');
        assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true, 'persistent music player');
        assert.equal(await page.locator('.logo-img').isVisible(), true, 'official logo');
        assert.equal(await page.locator('.logo-img').evaluate(el => el.complete && el.naturalWidth > 0), true, 'logo asset loaded');
        assert.equal(await page.locator('.pikk-wallet-metric').count(), 4, 'four summary metrics');
        assert.equal(await page.locator('#wallet-coins').count(), 1, 'coin deep link');
        assert.equal(await page.locator('#cwPayout').count(), 1, 'payout control');
        const bounds = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth }));
        assert.ok(bounds.width <= bounds.viewport + 3, name + ' ' + phase + ' horizontal overflow ' + JSON.stringify(bounds));
        assert.deepEqual(errors, [], name + ' ' + phase + ' browser errors');
        await page.screenshot({ path: 'visual-review/wallet-' + name + '-' + phase + '.png', fullPage: true, animations: 'disabled' });
      };
      await verify('initial');
      await page.locator('#fanCredit5').click();
      await page.locator('.pikk-wallet-hero').waitFor({ state: 'visible' });
      await page.locator('#cwVerify').click();
      await page.locator('.pikk-wallet-hero').waitFor({ state: 'visible' });
      await page.locator('#cwSeed').click();
      await page.locator('.pikk-wallet-hero').waitFor({ state: 'visible' });
      await verify('demo-actions');
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('.pikk-wallet-hero').waitFor({ state: 'visible' });
      assert.match(await page.locator('.pikk-wallet-metric').nth(1).textContent(), /\$5\.00/, 'demo fan credit persisted');
      await verify('reloaded');
      await context.close();
    }
  } finally { await browser.close(); }
} finally { server.kill('SIGTERM'); }

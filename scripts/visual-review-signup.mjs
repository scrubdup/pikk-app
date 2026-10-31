import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
const base = 'http://127.0.0.1:4173/pikk-app/';
const server = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
  env: { ...process.env, VITE_BASE: '/pikk-app/' },
  stdio: 'inherit'
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
        viewport, deviceScaleFactor: 1,
        ...(mobile ? { isMobile: true, hasTouch: true } : {}),
        reducedMotion: 'reduce'
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + '#/signup', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.getByText('Everyone creates a PIKK account to participate', { exact: false }).waitFor({ state: 'visible', timeout: 20000 });
      await page.locator('#splash').waitFor({ state: 'hidden', timeout: 15000 });
      assert.equal(await page.getByText('Everyone creates a DatBoiSkeet account', { exact: false }).count(), 0);
      assert.equal(await page.locator('#tabbar a').count(), 7);
      assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true);
      assert.equal(await page.locator('.logo-img').isVisible(), true);
      assert.equal(await page.locator('.logo-img').evaluate(el => el.complete && el.naturalWidth > 0), true);
      assert.equal(await page.locator('a[href="#/profile"]').count() > 0, true);
      const bounds = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: window.innerWidth }));
      assert.ok(bounds.width <= bounds.viewport + 3, name + ' horizontal overflow ' + JSON.stringify(bounds));
      assert.deepEqual(errors, [], name + ' browser errors');
      await page.screenshot({ path: 'visual-review/signup-' + name + '.png', fullPage: true, animations: 'disabled' });
      await context.close();
    }
  } finally { await browser.close(); }
} finally { server.kill('SIGTERM'); }

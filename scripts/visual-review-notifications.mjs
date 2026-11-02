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
      const verify = async phase => {
        assert.equal(await page.locator('#tabbar a').count(), 7, 'seven navigation tabs');
        assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true, 'persistent music player');
        assert.equal(await page.locator('.logo-img').isVisible(), true, 'approved PIKK logo');
        assert.equal(await page.locator('.logo-img').evaluate(el => el.complete && el.naturalWidth > 0), true, 'logo asset loaded');
        const bounds = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, viewport: innerWidth }));
        assert.ok(bounds.width <= bounds.viewport + 3, name + ' ' + phase + ' horizontal overflow ' + JSON.stringify(bounds));
        assert.deepEqual(errors, [], name + ' ' + phase + ' browser errors');
        await page.screenshot({ path: 'visual-review/notifications-' + name + '-' + phase + '.png', fullPage: true, animations: 'disabled' });
      };
      await page.goto(base + '#/notifications', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('.pikk-notif-hero').waitFor({ state: 'visible', timeout: 20000 });
      await page.locator('#splash').waitFor({ state: 'hidden', timeout: 15000 });
      assert.equal(await page.locator('#notifPrefs input[data-k]').count(), 4);
      assert.equal(await page.locator('#pikkNotifEnabled').textContent(), '3 of 4');
      await verify('default');
      await page.locator('#pikk-notif-lives').uncheck();
      assert.equal(await page.locator('#pikkNotifEnabled').textContent(), '2 of 4');
      assert.match(await page.locator('#pikkNotifStatus').textContent(), /Livestreams preference saved/);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('.pikk-notif-hero').waitFor({ state: 'visible', timeout: 10000 });
      assert.equal(await page.locator('#pikk-notif-lives').isChecked(), false, 'preference persists after reload');
      assert.equal(await page.locator('#pikkNotifEnabled').textContent(), '2 of 4');
      await verify('saved');
      await page.locator('#pikk-notif-quietHours').check();
      assert.equal(await page.locator('#pikkNotifEnabled').textContent(), '3 of 4');
      await page.locator('#pikkNotifReset').click();
      assert.equal(await page.locator('#pikkNotifEnabled').textContent(), '3 of 4');
      assert.match(await page.locator('#pikkNotifStatus').textContent(), /restored to defaults/);
      for (const [key, expected] of Object.entries({ releases: true, lives: true, messages: true, quietHours: false })) {
        assert.equal(await page.locator('#pikk-notif-' + key).isChecked(), expected, key + ' reset');
      }
      await verify('reset');
      // Pause/resume only the three alert preferences, preserving Quiet hours.
      await page.locator('#pikk-notif-quietHours').check();
      await page.locator('#pikkNotifPause').click();
      assert.equal(await page.locator('#pikkNotifEnabled').textContent(), '1 of 4');
      assert.equal(await page.locator('#pikk-notif-quietHours').isChecked(), true);
      for (const key of ['releases', 'lives', 'messages']) {
        assert.equal(await page.locator('#pikk-notif-' + key).isChecked(), false, key + ' paused');
      }
      assert.match(await page.locator('#pikkNotifStatus').textContent(), /paused on this device/);
      await verify('paused');
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('.pikk-notif-hero').waitFor({ state: 'visible', timeout: 10000 });
      assert.equal(await page.locator('#pikkNotifEnabled').textContent(), '1 of 4', 'paused settings persist');
      assert.equal(await page.locator('#pikk-notif-quietHours').isChecked(), true);
      await page.locator('#pikkNotifResume').click();
      assert.equal(await page.locator('#pikkNotifEnabled').textContent(), '4 of 4');
      for (const key of ['releases', 'lives', 'messages', 'quietHours']) {
        assert.equal(await page.locator('#pikk-notif-' + key).isChecked(), true, key + ' after resume');
      }
      assert.match(await page.locator('#pikkNotifStatus').textContent(), /resumed on this device/);
      await verify('resumed');
      await page.locator('#pikkNotifReset').click();
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('.pikk-notif-hero').waitFor({ state: 'visible', timeout: 10000 });
      assert.equal(await page.locator('#pikk-notif-lives').isChecked(), true, 'reset persisted after reload');
      assert.equal(await page.locator('#pikk-notif-quietHours').isChecked(), false, 'quiet hours reset persisted');
      await context.close();
    }
  } finally { await browser.close(); }
} finally { server.kill('SIGTERM'); }

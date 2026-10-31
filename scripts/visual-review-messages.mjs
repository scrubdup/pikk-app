import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

// External media can hold font readiness indefinitely in CI; screenshot the rendered fallback fonts.
process.env.PW_TEST_SCREENSHOT_NO_FONTS_READY = '1';
const base = 'http://127.0.0.1:5173/';
const browser = await chromium.launch({ headless: true });
await mkdir('visual-review', { recursive: true });
try {
  for (const [name, width, height] of [['mobile', 390, 844], ['desktop', 1440, 900]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    await page.goto(base + '#/profile', { waitUntil: 'domcontentloaded' });
    await page.locator('#signinName').fill('PIKK QA');
    await page.locator('#signinBtn').click();
    await page.goto(base + '#/messages', { waitUntil: 'domcontentloaded' });
    await page.locator('.pikk-messages-hero').waitFor();
    assert.equal(await page.locator('#pikkMsgSearch').count(), 1);
    assert.equal(await page.locator('#pikkNewChatTop').count(), 1);
    assert.equal(await page.locator('#pikkGroupTop').count(), 1);
    // Create one genuine local demo thread so filtering is exercised on real data.
    await page.locator('#pikkGroupTop').click();
    await page.locator('#msgBackInbox').waitFor();
    await page.locator('#msgBackInbox').click();
    await page.locator('#pikkMsgSearch').waitFor();
    assert.ok(await page.locator('#msgInbox [data-open-thread]').count() > 0);
    if (width >= 960) {
      const inbox = await page.locator('#msgInbox').boundingBox();
      const team = await page.locator('.msg-team-card').boundingBox();
      assert.ok(inbox && team && inbox.x < team.x, 'Desktop inbox and team card must be side by side');
    }
    // Let the demo group-created toast fade before visual capture.
    await page.waitForTimeout(2400);
    await page.screenshot({ path: 'visual-review/messages-' + name + '.png', fullPage: true });
    await page.locator('#pikkMsgSearch').fill('unfindable___999');
    assert.equal(await page.locator('#msgInbox [data-open-thread]:visible').count(), 0);
    assert.equal(await page.locator('#pikkMsgNoResults:visible').count(), 1);
    // Escape clears search while retaining Unread only and keyboard focus.
    await page.locator('#pikkMsgUnreadOnly').check();
    await page.locator('#pikkMsgSearch').press('Escape');
    assert.equal(await page.locator('#pikkMsgSearch').inputValue(), '');
    assert.equal(await page.locator('#pikkMsgUnreadOnly').isChecked(), true);
    assert.equal(await page.locator('#pikkMsgSearch').evaluate(el => el === document.activeElement), true);
    assert.equal(await page.locator('#pikkMsgNoResults').textContent(), 'No unread conversations.');
    await page.screenshot({ path: 'visual-review/messages-' + name + '-escape.png', fullPage: true });
    await page.locator('#pikkMsgUnreadOnly').uncheck();
    assert.ok(await page.locator('#msgInbox [data-open-thread]:visible').count() > 0);
    // Check the page is not wider than the viewport; keyboard focus remains usable.
    const overflows = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
    assert.equal(overflows, false, 'Unexpected horizontal overflow on ' + name);
    assert.deepEqual(errors, [], 'Browser exceptions on ' + name);
    await page.close();
  }
  console.log('Messages visual checks passed at 390px and 1440px; screenshot artifacts saved.');
} finally { await browser.close(); }

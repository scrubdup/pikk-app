import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4173/pikk-app/';
const server = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
  env: { ...process.env, VITE_BASE: '/pikk-app/' }, stdio: 'inherit'
});
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(base)).ok) { ready = true; break; } } catch {}
    await sleep(250);
  }
  assert.ok(ready, 'Vite preview unavailable');
  await mkdir('visual-review', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const [name, viewport, mobile] of [
      ['mobile', { width: 390, height: 844 }, true],
      ['desktop', { width: 1440, height: 900 }, false],
    ]) {
      const context = await browser.newContext({
        viewport, deviceScaleFactor: 1, reducedMotion: 'reduce',
        ...(mobile ? { isMobile: true, hasTouch: true } : {}),
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const capture = async phase => {
        assert.equal(await page.locator('#tabbar a').count(), 7, 'seven approved tabs');
        assert.equal(await page.locator('#dbs-sticky-player').isVisible(), true, 'persistent music player');
        assert.equal(await page.locator('.logo-img').isVisible(), true, 'approved PIKK logo');
        assert.equal(await page.locator('.logo-img').evaluate(el => el.complete && el.naturalWidth > 0), true, 'logo loaded');
        const width = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: innerWidth }));
        assert.ok(width.scroll <= width.viewport + 3, name + ' ' + phase + ' overflow ' + JSON.stringify(width));
        assert.deepEqual(errors, [], name + ' ' + phase + ' browser errors');
        await page.screenshot({ path: 'visual-review/explore-flow-' + name + '-' + phase + '.png', fullPage: true, animations: 'disabled' });
      };

      await page.goto(base + '#/explore', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('#exploreQ').waitFor({ state: 'visible', timeout: 20000 });
      await page.locator('#splash').waitFor({ state: 'hidden', timeout: 15000 });
      assert.equal(await page.locator('label[for="exploreQ"]').innerText(), 'Search PIKK');
      assert.match(await page.locator('#explorePanel').innerText(), /Trending Across PIKK/);
      await capture('trending');

      // Keyboard-only navigation must switch sections and restore focus after rerender.
      assert.equal(await page.locator('[role="tablist"][aria-label="Explore sections"] [role="tab"]').count(), 3);
      await page.locator('[data-explore-tab="trending"]').focus();
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.locator('[data-explore-tab="following"]').getAttribute('aria-selected'), 'true');
      assert.equal(await page.locator('[data-explore-tab="following"]').evaluate(el => el === document.activeElement), true);
      await page.keyboard.press('End');
      assert.equal(await page.locator('[data-explore-tab="discover"]').getAttribute('aria-selected'), 'true');
      assert.match(await page.locator('#explorePanel').innerText(), /Suggested accounts/);
      await page.keyboard.press('Home');
      assert.equal(await page.locator('[data-explore-tab="trending"]').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('ArrowLeft');
      assert.equal(await page.locator('[data-explore-tab="discover"]').getAttribute('aria-selected'), 'true');
      await page.keyboard.press('Home');
      assert.equal(await page.locator('[data-explore-tab="trending"]').evaluate(el => el === document.activeElement), true);
      await capture('keyboard-tabs');

      // Search results for people must open that person's profile, not the visitor's profile.
      await page.locator('#exploreQ').fill('DatBoiSkeet');
      await page.locator('#exploreGo').click();
      const artistHit = page.locator('#exploreResultsWrap .explore-hit[href="#/profile/dbs"]');
      await artistHit.waitFor({ state: 'visible', timeout: 10000 });
      assert.match(await artistHit.innerText(), /@DatBoiSkeet/);
      await capture('profile-result');
      await artistHit.click();
      await page.waitForURL(/#\/profile\/dbs$/, { timeout: 10000 });
      await page.locator('.pikk-profile-cover-kicker').waitFor({ state: 'visible' });
      assert.match(await page.locator('.pikk-profile-cover').innerText(), /DatBoiSkeet/);
      await capture('profile-open');

      // Discover suggestions must open the selected public profile, not My Profile.
      await page.goto(base + '#/explore', { waitUntil: 'domcontentloaded' });
      await page.locator('[data-explore-tab="discover"]').click();
      const discoverArtist = page.locator('#explorePanel .explore-hit[href="#/profile/dbs"]');
      await discoverArtist.waitFor({ state: 'visible' });
      assert.match(await discoverArtist.innerText(), /DatBoiSkeet/);
      await capture('discover-account-link');
      await discoverArtist.click();
      await page.waitForURL(url => url.hash === '#/profile/dbs', { timeout: 10000 });
      assert.match(await page.locator('.pikk-profile-cover').innerText(), /DatBoiSkeet/);

      // Following uses the same public route after a local demo sign-in.
      await page.goto(base + '#/profile', { waitUntil: 'domcontentloaded' });
      await page.locator('#signinName').fill('Explore QA');
      await page.locator('#signinBtn').click();
      await page.locator('#signoutBtn').waitFor({ state: 'visible' });
      await page.goto(base + '#/explore', { waitUntil: 'domcontentloaded' });
      await page.locator('[data-explore-tab="following"]').click();
      const followedArtist = page.locator('#explorePanel .explore-hit[href="#/profile/dbs"]');
      await followedArtist.waitFor({ state: 'visible' });
      await capture('following-account-link');
      await followedArtist.click();
      await page.waitForURL(url => url.hash === '#/profile/dbs', { timeout: 10000 });
      assert.match(await page.locator('.pikk-profile-cover').innerText(), /DatBoiSkeet/);

      await page.goto(base + '#/explore', { waitUntil: 'domcontentloaded' });
      await page.locator('#exploreQ').waitFor({ state: 'visible', timeout: 20000 });
      // Test-only catalog entries exercise missing vs. genuine artist credits.
      // The production catalog and user data are never changed by this fixture.
      await page.evaluate(() => {
        const key = 'dbs_v1';
        const saved = JSON.parse(localStorage.getItem(key) || '{}');
        saved.catalog = [
          ...(saved.catalog || []),
          { id: 'visual-untagged-video', type: 'video', title: 'Video attribution QA', artist: '', published: true },
          { id: 'visual-credited-video', type: 'video', title: 'Credited video QA', artist: 'DatBoiSkeet', published: true },
        ];
        localStorage.setItem(key, JSON.stringify(saved));
      });
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('#exploreQ').waitFor({ state: 'visible', timeout: 20000 });

      await page.locator('[data-explore-tab="discover"]').click();
      await page.locator('[data-explore-tab="discover"].on').waitFor({ state: 'visible' });
      await page.locator('#exploreQ').fill('music');
      await page.locator('#exploreGo').click();
      await page.locator('#exploreLiveInsert #exploreResults').waitFor({ state: 'visible' });
      assert.equal(await page.locator('#exploreLiveInsert').count(), 1);
      await capture('discover-search');

      await page.locator('#exploreQ').fill('video');
      await page.locator('#exploreGo').click();
      assert.equal(await page.locator('#exploreLiveInsert').count(), 1, 'second search reuses wrapper');
      const videoResultText = await page.locator('#exploreLiveInsert #exploreResults').innerText();
      assert.match(videoResultText, /Video catalog/, 'video results do not claim an admin upload');
      assert.match(videoResultText, /Artist not credited/, 'missing artist is not assigned to DatBoiSkeet');
      assert.match(videoResultText, /DatBoiSkeet/, 'genuine artist credit is preserved');
      await capture('video-results');

      // Search stays visible and actionable when moving between Explore sections.
      await page.locator('[data-explore-tab="following"]').click();
      assert.equal(await page.locator('#exploreQ').inputValue(), 'video', 'Following keeps search text');
      assert.match(await page.locator('#exploreLiveInsert #exploreResults').innerText(), /Video catalog/);
      await capture('following-retained-search');
      await page.locator('[data-explore-tab="discover"]').click();
      assert.equal(await page.locator('#exploreQ').inputValue(), 'video', 'Discover keeps search text');
      assert.match(await page.locator('#exploreLiveInsert #exploreResults').innerText(), /Artist not credited/);
      await capture('discover-retained-search');

      // Escape clears both the search field and the rendered results, not just native input text.
      await page.locator('#exploreQ').focus();
      await page.keyboard.press('Escape');
      await sleep(400);
      assert.equal(await page.locator('#exploreQ').inputValue(), '', 'Escape empties search');
      assert.equal(await page.locator('#exploreLiveInsert').count(), 0, 'Escape removes stale Discover results');
      assert.equal(await page.locator('#exploreQ').evaluate(el => el === document.activeElement), true, 'Escape retains input focus');
      await capture('discover-escape-cleared');

      await page.locator('#exploreQ').fill('video');
      await page.locator('#exploreGo').click();
      await page.locator('#exploreLiveInsert #exploreResults').waitFor({ state: 'visible' });
      await page.locator('#exploreClear').click();
      await sleep(400);
      assert.equal(await page.locator('#exploreLiveInsert').count(), 0, 'Clear removes results after repeated searches');
      assert.equal(await page.locator('#exploreQ').inputValue(), '', 'Clear empties input');
      await capture('discover-cleared');

      await page.locator('[data-explore-tab="following"]').click();
      await page.locator('[data-explore-tab="following"].on').waitFor({ state: 'visible' });
      await page.locator('#exploreQ').fill('artist');
      await page.locator('#exploreGo').click();
      await page.locator('#exploreLiveInsert #exploreResults').waitFor({ state: 'visible' });
      await page.locator('#exploreClear').click();
      await sleep(300);
      assert.equal(await page.locator('#exploreLiveInsert').count(), 0, 'Following Clear removes results');
      await capture('following-cleared');

      await page.locator('[data-explore-tab="trending"]').click();
      await page.locator('[data-explore-tab="trending"].on').waitFor({ state: 'visible' });
      await page.locator('#exploreQ').fill('music');
      await page.locator('#exploreQ').press('Enter');
      await page.locator('#exploreResultsWrap #exploreResults').waitFor({ state: 'visible' });
      await page.locator('#exploreQ').press('Escape');
      await sleep(300);
      assert.equal(await page.locator('#exploreQ').inputValue(), '', 'Trending Escape empties search');
      assert.match(await page.locator('#exploreResultsWrap').innerText(), /Search creators, fans, songs/);
      await capture('trending-escape-cleared');
      await page.locator('#exploreQ').fill('music');
      await page.locator('#exploreGo').click();
      await page.locator('#exploreClear').click();
      assert.match(await page.locator('#exploreResultsWrap').innerText(), /Search creators, fans, songs/);
      await capture('trending-cleared');
      await context.close();
    }
  } finally { await browser.close(); }
} finally { server.kill('SIGTERM'); }

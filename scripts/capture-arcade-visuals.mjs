// Browser evidence for the approved PIKK Arcade. Runs only in CI, never publishes.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const root = 'http://127.0.0.1:4173/pikk-app/';
await mkdir('visual-evidence', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const [route, width, height, file, fullPage] of [
    ['games', 390, 844, 'arcade-mobile.png', true],
    ['games', 1440, 900, 'arcade-desktop.png', true],
    ['home', 390, 844, 'home-mobile.png', false]
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    page.setDefaultNavigationTimeout(20000);
    await page.goto(root + '#/' + route, { waitUntil: 'domcontentloaded', timeout: 20000 });
    // PIKK's splash runs for roughly three seconds.
    await page.waitForTimeout(4500);
    if (route === 'games') {
      const cards = page.locator('.pikk-arcade-card');
      const images = page.locator('.pikk-arcade-card img');
      if (await cards.count() !== 15 || await images.count() !== 15) {
        throw new Error('Expected 15 Arcade cards and 15 installed images');
      }
      const status = await images.evaluateAll(imgs => imgs.map(i => ({ src: i.getAttribute('src'), loaded: i.complete && i.naturalWidth > 0 })));
      if (status.some(x => !x.loaded)) throw new Error('Unloaded Arcade images: ' + JSON.stringify(status.filter(x => !x.loaded)));
      const nav = await page.locator('nav').count();
      if (!nav) throw new Error('Navigation missing from Arcade route');
    }
    await page.screenshot({ path: 'visual-evidence/' + file, fullPage, animations: 'disabled', timeout: 20000 });
    // Validate the real full-size concept-art viewer, not just the static cards.
    if (route === 'games') {
      const previewButtons = page.locator('[data-game-preview]');
      if (await previewButtons.count() !== 15) throw new Error('Expected 15 View artwork controls');
      await previewButtons.first().click();
      const dialog = page.locator('#pikkArcadeLightbox');
      if (!await dialog.evaluate(el => el.open)) throw new Error('Arcade artwork dialog did not open');
      if (await dialog.locator('[data-arcade-title]').textContent() !== 'Block Wars') {
        throw new Error('Wrong initial concept artwork');
      }
      await dialog.locator('[data-arcade-next]').click();
      if (await dialog.locator('[data-arcade-title]').textContent() !== 'PIKK Playground') {
        throw new Error('Next artwork navigation failed');
      }
      await page.keyboard.press('ArrowLeft');
      if (await dialog.locator('[data-arcade-title]').textContent() !== 'Block Wars') {
        throw new Error('Keyboard artwork navigation failed');
      }
      const art = dialog.locator('[data-arcade-full-image]');
      await art.evaluate(img => img.decode());
      const fits = await dialog.evaluate(el => {
        const r = el.getBoundingClientRect();
        return r.left >= -1 && r.right <= innerWidth + 1 && r.top >= -1 && r.bottom <= innerHeight + 1;
      });
      if (!fits) throw new Error('Artwork viewer overflows the ' + width + 'px viewport');
      await page.screenshot({
        path: 'visual-evidence/arcade-preview-' + (width === 390 ? 'mobile' : 'desktop') + '.png',
        fullPage: false, animations: 'disabled', timeout: 20000,
      });
      await page.keyboard.press('Escape');
      if (await dialog.evaluate(el => el.open)) throw new Error('Escape did not close the artwork viewer');
    }

    await page.close();
    console.log('Captured ' + file);
  }
} finally {
  await browser.close();
}

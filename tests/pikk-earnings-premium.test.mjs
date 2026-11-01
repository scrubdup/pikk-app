import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR } from '../src/data.js';

const page = readFileSync(new URL('../src/pages/earnings.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/earnings-premium.css', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('Creator Earnings premium visual is scoped and retains test-mode truthfulness', () => {
  for (const marker of ['pikk-earnings-hero', 'pikk-earnings-dashboard', 'pikk-earnings-summary', 'pikk-earnings-hero-actions']) {
    assert.ok(page.includes(marker), marker);
    assert.ok(css.includes(marker), marker);
  }
  assert.match(page, /Every amount shown here is browser-local demo data, not a real balance/);
  assert.match(page, /TEST MODE · not real money/);
  assert.match(page, /Record demo earning/);
  assert.match(page, /Commission rates · TEST MODE/);
  assert.match(page, /Earnings ledger/);
  assert.match(page, /Open Wallet/);
  assert.match(page, /seedDemoCreatorEarnings/);
  assert.match(page, /creditCreatorEarning/);
  assert.match(page, /getCreatorSplits/);
  assert.match(page, /listCreatorGiftEarnings/);
});

test('Premium Earnings remains a responsive independent route with original player and seven tabs', () => {
  assert.match(main, /import '\.\/earnings-premium\.css';/);
  assert.match(main, /'\/earnings': \{ render: renderEarnings, bind: bindEarnings \}/);
  assert.match(css, /@media\(max-width:560px\)/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css, /\.pikk-earnings-dashboard a:focus-visible/);
  assert.deepEqual(TABBAR.map(t => t.label), ['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
  assert.match(html, /pikk-official-approved\.jpg/);
  assert.match(html, /dbs-sticky-player/);
});

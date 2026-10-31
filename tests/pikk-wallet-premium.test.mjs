import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR } from '../src/data.js';

const wallet = readFileSync(new URL('../src/pages/wallet.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/wallet-premium.css', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('Wallet premium layout preserves existing real demo operations and deep links', () => {
  for (const id of ['wallet-coins','wallet-gift-earnings','fanCredit5','fanCredit25','cwSeed','cwPayout','cwVerify']) {
    assert.ok(wallet.includes(id), id);
  }
  for (const call of ['buyCoins(n)', 'addWalletCredit(5', 'addWalletCredit(25', 'requestCreatorPayout()', 'setCreatorVerification(next)', 'setCreatorPayoutStatus(']) {
    assert.ok(wallet.includes(call), call);
  }
  assert.match(wallet, /class="pikk-wallet-studio"/);
  assert.match(wallet, /class="pikk-wallet-metrics"/);
  assert.match(wallet, /TEST MODE · not real money/);
  assert.match(wallet, /No real processors, KYC, or charges/);
  assert.match(wallet, /href="#\/earnings"/);
});

test('Wallet visual CSS is responsive, route-scoped and accessible', () => {
  for (const selector of ['#app:has(.pikk-wallet-studio)', '.pikk-wallet-hero', '.pikk-wallet-metrics', '.pikk-wallet-studio .coin-pack-btn', ':focus-visible', '@media(max-width:520px)', '@media(prefers-reduced-motion:reduce)']) {
    assert.ok(css.includes(selector), selector);
  }
  assert.match(main, /import '\.\/wallet-premium\.css';/);
  assert.match(main, /'\/wallet': \{ render: renderWallet, bind: bindWallet \}/);
  assert.equal(TABBAR.length, 7);
  assert.match(html, /pikk-official-approved\.jpg/);
  assert.match(html, /dbs-sticky-player/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SPLASH_HOLD_MS, SPLASH_FADE_MS } from '../src/splash-config.js';
test('splash holds a full 5s (t393u), uses official master logo, chime kept', () => {
  assert.equal(SPLASH_HOLD_MS, 5000); assert.equal(SPLASH_FADE_MS, 500);
  const m = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  assert.match(m, /setTimeout\(ready, SPLASH_HOLD_MS\)/); assert.match(m, /playSplashChime\(\)/);
  const h = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(h, /class="splash-logo" src="%BASE_URL%brand\/pikk-logo-official\.png"/); assert.match(h, /dbs-tuning-fork\.mp3/);
});
test('header gear: Settings button next to $ in left cluster (search, $, gear), routed to Settings', () => {
  const h = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const i = h.indexOf('id="exploreSearchBtn"'), j = h.indexOf('id="paymentsBtn"'), k = h.indexOf('id="settingsBtn"');
  assert.ok(i > 0 && i < j && j < k, 'order search, $, gear');
  assert.match(h, /class="pill header-explore-search header-settings" id="settingsBtn" href="#\/settings" aria-label="Settings"/);
  const nav = readFileSync(new URL('../src/nav-sections.js', import.meta.url), 'utf8');
  assert.match(nav, /href: '#\/settings'/);
});

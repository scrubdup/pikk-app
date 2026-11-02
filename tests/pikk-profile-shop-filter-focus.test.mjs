import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderShop } from '../src/pages/shop.js';
import { PROFILE_SHOP, SHOP_CATEGORIES } from '../src/data.js';

test('Profile Shop category filters use a toggle-button group, not an incomplete tablist', () => {
  const html = renderShop();
  assert.match(html, /class="shop-chips" role="group" aria-label="Cosmetic categories"/);
  assert.doesNotMatch(html, /class="shop-chips" role="tablist"/);
  for (const { id, label } of SHOP_CATEGORIES) {
    assert.ok(html.includes('data-cat="' + id + '"'), 'missing ' + label);
    assert.ok(html.includes('aria-pressed="true"') && html.includes('aria-pressed="false"'));
  }
  assert.equal((html.match(/class="cosmetic-card /g) || []).length, PROFILE_SHOP.length);
  assert.match(html, /DBS_Profile_Shop_Concept\.png/);
  assert.match(html, /CONCEPT \/ TEST MODE/);
});

test('category selection restores focus after same-route render without changing the app shell', () => {
  const source = readFileSync(new URL('../src/pages/shop.js', import.meta.url), 'utf8');
  assert.match(source, /refresh\(\);\s*\/\/ The same-route refresh replaces the filter buttons/);
  assert.match(source, /chip\.dataset\.cat === activeCat/);
  assert.match(source, /selected\?\.focus\(\{ preventScroll: true \}\)/);
  const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  assert.match(main, /'\/profile-shop': \{ render: renderShop, bind: bindShop \}/);
  assert.match(main, /initDbsPlayer/);
  assert.match(main, /buildTabbar/);
});

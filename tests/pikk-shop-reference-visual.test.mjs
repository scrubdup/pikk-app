import test from 'node:test';
import assert from 'node:assert/strict';
import { renderPikkShop, filterPikkShopProducts } from '../src/pages/pikk-shop.js';
import { MERCH, TABBAR } from '../src/data.js';

test('PIKK Shop premium hero shows real catalog photos and no invented products', () => {
  const html = renderPikkShop();
  assert.match(html, /pikk-shop-real-hero/);
  assert.match(html, /pikk-shop-hero-gallery/);
  assert.equal((html.match(/class="pikk-shop-featured-product"/g) || []).length, 3);
  assert.equal((html.match(/class="merch-card pikk-shop-product"/g) || []).length, MERCH.length);
  for (const category of ['Jackets', 'Hats', 'Shirts']) {
    const item = MERCH.find((product) => product.category === category);
    assert.ok(item, category + ' catalog item missing');
    assert.ok(html.includes(item.image), category + ' authentic photo missing');
    assert.ok(html.includes(item.name), category + ' real product title missing');
  }
  assert.doesNotMatch(html, /fake viewers|invented reviews|12\\.4K watching/i);
});

test('Shop category shortcuts and original search filters remain available', () => {
  const html = renderPikkShop();
  for (const category of ['All', 'Jackets', 'Shirts', 'Hats']) {
    assert.ok(html.includes('class="pikk-shop-category') && html.includes('data-category="' + category + '"'));
    assert.equal(filterPikkShopProducts(MERCH, category).length, category === 'All' ? MERCH.length : MERCH.filter((p) => p.category === category).length);
  }
  assert.ok(filterPikkShopProducts(MERCH, 'All', 'buffalo').length > 0);
  assert.ok(html.includes('id="pikkShopSearch"'));
  assert.ok(html.includes('id="pikkShopEmpty"'));
  assert.ok(html.includes('data-shop-scroll'));
});

test('Shop retains external-checkout disclosure and approved seven-tab navigation', () => {
  const html = renderPikkShop();
  assert.match(html, /PIKK does not take payments/);
  assert.match(html, /External merchant checkout/);
  assert.match(html, /No PIKK in-app payments/);
  assert.ok(html.includes('target="_blank" rel="noopener noreferrer"'));
  assert.deepEqual(TABBAR.map((tab) => tab.label), ['Music','Videos','Connect','Create','Dating','Games','Shop']);
});

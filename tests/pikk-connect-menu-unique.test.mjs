import test from 'node:test';
import assert from 'node:assert/strict';
import { SECTION_MENU_ITEMS } from '../src/section-menus.js';
import { TABBAR } from '../src/data.js';

test('Connect category menu has one clearly named Communities destination', () => {
  const items = SECTION_MENU_ITEMS.connect;
  const communityItems = items.filter(item => item.href === '#/communities');
  assert.equal(communityItems.length, 1, 'do not show duplicate Communities tiles');
  assert.equal(communityItems[0].title, 'PIKK Communities');
  assert.match(communityItems[0].detail, /discussions/);
  assert.equal(items.some(item => item.title === 'Communities'), false);

  const routes = items.filter(item => item.href).map(item => item.href);
  assert.equal(new Set(routes).size, routes.length, 'each Connect destination appears once');
});

test('Connect cleanup preserves existing navigation and honest preview labels', () => {
  const items = SECTION_MENU_ITEMS.connect;
  for (const href of ['#/connect', '#/messages', '#/explore', '#/live',
    '#/connect#connect-random-chat', '#/connect#connect-multistream']) {
    assert.ok(items.some(item => item.href === href), href);
  }
  assert.match(items.find(item => item.title === 'Random Chat')?.detail || '', /Preview only/);
  assert.deepEqual(TABBAR.map(item => item.label),
    ['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
});

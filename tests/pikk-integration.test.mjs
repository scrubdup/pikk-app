import test from 'node:test';
import assert from 'node:assert/strict';
import { TABBAR, DRAWER_GROUPS, VIDEOS } from '../src/data.js';
import { renderDating } from '../src/pages/dating.js';
import { renderGames } from '../src/pages/games.js';

test('PIKK tabbar has seven unique, navigable destinations', () => {
  assert.equal(TABBAR.length, 7);
  assert.equal(new Set(TABBAR.map(tab => tab.href)).size, 7);
  assert.deepEqual(
    TABBAR.map(tab => tab.href),
    ['#/music', '#/videos', '#/connect', '#/create', '#/dating', '#/games', '#/shop'],
    'Keep the exact owner-approved seven-tab order',
  );
  assert.equal(TABBAR.find(tab => tab.primary)?.href, '#/create');
  assert.ok(TABBAR.every(tab => tab.icon), 'Every tab has an icon');
  assert.ok(TABBAR.some(tab => tab.href === '#/games'), 'Arcade must be directly accessible from bottom navigation');
  assert.ok(!TABBAR.some(tab => tab.href === '#/home'), 'Home stays in the header, not the bottom navigation');
});
test('Dating and Arcade remain discoverable in the drawer', () => {
  const hrefs = DRAWER_GROUPS.flatMap(group => group.href ? [group.href] : (group.links || []).map(link => link.href));
  assert.ok(hrefs.includes('#/dating'));
  assert.ok(hrefs.includes('#/games'));
  assert.ok(hrefs.includes('#/connect'));
});
test('Dating page does not pretend to match people', () => {
  const html = renderDating();
  assert.match(html, /PIKK Dating/);
  assert.match(html, /No real matches/);
  assert.match(html, /age|adult/i);
});
test('Arcade lists all fifteen approved games without real-money claims', () => {
  const html = renderGames();
  assert.equal((html.match(/class="pikk-arcade-card /g) || []).length, 15);
  assert.match(html, /Play Chips have no cash value or cash-out/);
  assert.match(html, /not playable/);
});
test('DatBoiSkeet music remains in catalog', () => {
  assert.ok(VIDEOS.some(video => video.artist === 'DatBoiSkeet'));
});

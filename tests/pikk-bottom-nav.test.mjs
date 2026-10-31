import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const data = readFileSync(new URL('../src/data.js', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const posts = readFileSync(new URL('../src/pages/posts.js', import.meta.url), 'utf8');
import { SECTION_MENU_ITEMS } from '../src/section-menus.js';
import { CREATE_MENU_ITEMS } from '../src/create-menu.js';

test('Create is the exact center of seven bottom navigation slots', () => {
  const match = data.match(/export const TABBAR = \[([\s\S]*?)\];/);
  assert.ok(match);
  const entries = [...match[1].matchAll(/\{ href: '([^']+)', label: '([^']+)'[^}]*\}/g)];
  assert.equal(entries.length, 7);
  assert.equal(entries[3][2], 'Create');
  assert.equal(entries[3][1], '#/create');
  assert.match(entries[3][0], /primary: true/);
  assert.deepEqual(entries.map(x => x[2]), ['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
  assert.ok(!entries.some(x => x[2] === 'Profile'));
});

test('Create opens all six existing destinations without pretending uploads are live', () => {
  assert.match(main, /t\.primary \? ' class="tab-primary"'/);
  assert.ok(CREATE_MENU_ITEMS.some(item => item.href === '#/live?go=1'));
  assert.match(main, /route\.query\.go === '1'/);
  for (const type of ['video', 'short', 'picture', 'text']) {
    assert.ok(CREATE_MENU_ITEMS.some(item => item.href === `#/posts?type=${type}`), type);
  }
  assert.match(posts, /route\.query\.type/);
  assert.match(main, /TEST MODE/);
  assert.match(main, /aria-haspopup="dialog"/);
  assert.match(main, /e\.key === 'Escape'/);
});

test('Header PIKK logo returns to Home without a bottom Home tab; Profile stays in header', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /href="#\/home" class="logo" aria-label="PIKK Home"/);
  assert.match(html, /id="headerProfile" href="#\/profile"/);
});


test('Games bottom tab opens approved category menu with Arcade as first destination', () => {
  assert.doesNotMatch(main, /if \(name === 'games'\) continue/);
  assert.doesNotMatch(main, /pathOnly !== '\/games'/);
  assert.equal(SECTION_MENU_ITEMS.games[0].href, '#/games');
  assert.match(main, /toggleSectionMenu\(name, event\.currentTarget\)/);
  assert.match(main, /'\/games': \{ render: renderGames, bind: bindGames \}/);
});

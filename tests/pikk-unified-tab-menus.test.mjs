import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SECTION_MENU_ITEMS} from '../src/section-menus.js';
import {MUSIC_MENU_ITEMS} from '../src/music-menu.js';
import {TABBAR} from '../src/data.js';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const sections = read('../src/section-menus.js');
const music = read('../src/music-menu.js');
const styles = read('../src/styles.css');
const main = read('../src/main.js');

test('seven approved tabs stay in owner-approved order', () => {
  assert.deepEqual(TABBAR.map(item => item.label), ['Music','Videos','Connect','Create','Dating','Games','Shop']);
  assert.equal(TABBAR.filter(item => item.primary).length, 1);
  assert.equal(TABBAR.find(item => item.primary).label, 'Create');
});
test('every non-Create bottom tab has real menu choices and a consistent card grid', () => {
  for(const tab of ['videos','connect','dating','games','shop']) {
    assert.ok(SECTION_MENU_ITEMS[tab]?.length > 0, tab);
    assert.ok(SECTION_MENU_ITEMS[tab].every(item => item.title && item.detail && (item.href?.startsWith('#/') || item.detail.toLowerCase().includes('planned'))), tab);
  }
  assert.ok(MUSIC_MENU_ITEMS.length > 0);
  assert.doesNotMatch(main, /if \(name === 'games'\) continue/);
  assert.match(main, /toggleSectionMenu\(name, event\.currentTarget\)/);
  assert.match(sections, /pikk-create-options pikk-create-grid/);
  assert.match(music, /pikk-create-options pikk-create-grid/);
  assert.match(sections, /pikk-menu-cancel/);
  assert.match(music, /pikk-menu-cancel/);
  assert.match(styles, /grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(styles, /pikk-create-grid \.pikk-menu-icon svg/);
  assert.match(sections, /ICONS\[MENU_ICON_KEYS/);
  assert.match(music, /ICONS\[MUSIC_ICON_KEYS/);
});
test('modal controls retain keyboard escape, focus trapping, and route close', () => {
  for(const src of [sections,music]) {
    assert.match(src, /event\.key === 'Escape'/);
    assert.match(src, /event\.key (?:!==|===) 'Tab'/);
    assert.match(src, /hashchange/);
  }
});

test('Games menu includes all approved titles without linking unbuilt games to unrelated pages', () => {
  const games = SECTION_MENU_ITEMS.games;
  assert.equal(games.length, 16, 'Arcade hub plus all 15 approved games');
  for (const title of ['PIKK Arcade','PIKK Speed','PIKK Blackjack','PIKK Slots','PIKK Poker','PIKK Spades','PIKK Dominoes','PIKK Chess','PIKK Clash','PIKK Knockout','PIKK Playground','PIKK Bowling','PIKK Pickleball','PIKK Pool','PIKK Cup Pong','Block Wars']) {
    assert.ok(games.some(item => item.title === title), title);
  }
  assert.equal(games.find(item => item.title === 'PIKK Arcade').href, '#/games');
  assert.equal(games.find(item => item.title === 'Block Wars').href, '#/blockwars');
  for (const item of games.filter(item => !['PIKK Arcade','Block Wars'].includes(item.title))) {
    assert.equal(item.href, undefined, item.title + ' must not masquerade as a playable route');
    assert.match(item.detail, /planned/i);
  }
  assert.match(sections, /pikk-menu-planned/);
  assert.match(styles, /pikk-menu-planned/);
  assert.doesNotMatch(SECTION_MENU_ITEMS.videos.map(item => item.title).join(' '), /Behind the Scenes/i);
});

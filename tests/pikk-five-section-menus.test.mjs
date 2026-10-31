import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SECTION_MENU_ITEMS } from '../src/section-menus.js';
import { PIKK_GAMES } from '../src/games/arcade-catalog.js';

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const source = readFileSync(new URL('../src/section-menus.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const routes = [...main.matchAll(/^  '(\/[^']+)': \{/gm)].map(m => m[1]);

test('all five remaining bottom sections have honest, verified menu destinations', () => {
  assert.deepEqual(Object.keys(SECTION_MENU_ITEMS), ['videos', 'connect', 'dating', 'games', 'shop']);
  for (const [section, items] of Object.entries(SECTION_MENU_ITEMS)) {
    assert.ok(items.length >= 2, section);
    for (const { title, href, detail } of items) {
      assert.ok(title && detail, section);
      if (!href) {
        assert.equal(section, 'games', title + ': only upcoming games may omit routes');
        assert.match(detail, /planned/i, title + ': disabled card must disclose planned status');
        continue;
      }
      assert.ok(href.startsWith('#/'), title + ': invalid route');
      const path = href.slice(1).split(/[?#]/)[0];
      assert.ok(routes.includes(path), title + ': missing route ' + path);
    }
  }
});

test('five bottom tabs open modal menus while Music and Create remain independent', () => {
  assert.match(main, /toggleSectionMenu\(name, event\.currentTarget\)/);
  assert.match(main, /Object\.keys\(SECTION_MENU_ITEMS\)/);
  assert.match(main, /toggleMusicMenu\(event\.currentTarget\)/);
  assert.match(main, /ensureCreateMenu\(\)/);
  assert.match(main, /closeSectionMenus\(\)/);
  assert.match(source, /aria-modal="true"/);
  assert.match(source, /pikk-create-options/);
  assert.match(source, /aria-expanded/);
  assert.match(source, /event\.key === 'Escape'/);
  assert.match(source, /event\.key !== 'Tab'/);
  assert.match(source, /addEventListener\('hashchange'/);
});

test('menus retain fail-safe disclosure and protect player and branding', () => {
  assert.match(source, /Production features are not enabled until secure services are available/);
  assert.match(SECTION_MENU_ITEMS.connect.find(item => item.title === 'Random Chat').detail, /unavailable/);
  assert.match(SECTION_MENU_ITEMS.games.find(item => item.title === 'PIKK Arcade').detail, /preview/);
  assert.match(html, /id="dbs-sticky-player"/);
  assert.match(html, /brand\/pikk-official-approved\.jpg/);
});

// Keep the Games popup in lockstep with the fifteen exact owner-approved Arcade tiles.
test('Games tab shows all 15 games in approved order without fake playable links', () => {
  const games = SECTION_MENU_ITEMS.games;
  assert.equal(games[0].title, 'PIKK Arcade');
  const tiles = games.slice(1);
  assert.equal(tiles.length, 15);
  assert.deepEqual(tiles.map(item => item.title), PIKK_GAMES.map(game => game.name));
  assert.equal(tiles[0].title, 'Block Wars');
  assert.equal(tiles[1].title, 'PIKK Playground');
  for (const [index, tile] of tiles.entries()) {
    const catalog = PIKK_GAMES[index];
    assert.equal(tile.href, catalog.href);
    if (!catalog.href) assert.match(tile.detail, /planned/i);
  }
});

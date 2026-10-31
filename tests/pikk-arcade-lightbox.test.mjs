import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderGames, bindGames, arcadePreviewAt } from '../src/pages/games.js';
import { PIKK_GAMES } from '../src/games/arcade-catalog.js';

test('all 15 approved Arcade covers open a full-size concept preview, not fake gameplay', () => {
  const html = renderGames();
  assert.equal(html.split('data-game-preview="').length - 1, 15);
  assert.equal(html.split('class="pikk-arcade-card ').length - 1, 15);
  assert.ok(html.includes('<dialog id="pikkArcadeLightbox"'));
  assert.ok(html.includes('data-arcade-full-image'));
  assert.ok(html.includes('data-arcade-prev'));
  assert.ok(html.includes('data-arcade-next'));
  assert.ok(html.includes('pikk-official-approved.jpg'));
  assert.ok(html.includes('Games are not playable yet'));
  assert.ok(html.includes('Play Chips have no cash value or cash-out'));
  for (const game of PIKK_GAMES) {
    assert.ok(html.includes(game.artwork.split('/').pop()));
  }
});

test('preview wraps around without modifying catalog, and uses project-base image paths', () => {
  const first = arcadePreviewAt(0);
  const last = arcadePreviewAt(14);
  assert.equal(first.title, 'Block Wars');
  assert.equal(arcadePreviewAt(15).title, first.title);
  assert.equal(arcadePreviewAt(-1).title, last.title);
  assert.equal(first.total, 15);
  assert.ok(first.image.endsWith('games/approved/01_block_wars.jpg'));
  assert.equal(PIKK_GAMES.length, 15);
});

test('route binds real open, next, previous, keyboard, and close actions with focus return', () => {
  const handlers = new Map();
  const gallery = { addEventListener(type, fn) { handlers.set('gallery:' + type, fn); } };
  const fields = Object.fromEntries([
    '[data-arcade-full-image]','[data-arcade-title]','[data-arcade-description]',
    '[data-arcade-players]','[data-arcade-counter]',
  ].map(key => [key, { textContent: '', src: '', alt: '' }]));
  const dialog = {
    open: false,
    addEventListener(type, fn) { handlers.set('dialog:' + type, fn); },
    querySelector(selector) { return fields[selector]; },
    showModal() { this.open = true; },
    close() { this.open = false; handlers.get('dialog:close')(); },
  };
  const root = { querySelector(selector) {
    return selector === '.pikk-arcade-grid' ? gallery : selector === '#pikkArcadeLightbox' ? dialog : null;
  }};
  bindGames(root);
  let focused = false;
  const opener = { dataset: { gamePreview: '14' }, isConnected: true, focus() { focused = true; } };
  handlers.get('gallery:click')({ target: { closest(selector) { return selector === '[data-game-preview]' ? opener : null; } } });
  assert.equal(dialog.open, true);
  assert.equal(fields['[data-arcade-title]'].textContent, 'PIKK Chess');
  assert.equal(fields['[data-arcade-counter]'].textContent, '15 / 15');
  handlers.get('dialog:click')({ target: { closest(selector) { return selector === '[data-arcade-next]' ? {} : null; } } });
  assert.equal(fields['[data-arcade-title]'].textContent, 'Block Wars');
  let prevented = false;
  handlers.get('dialog:keydown')({ key: 'ArrowLeft', preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(fields['[data-arcade-title]'].textContent, 'PIKK Chess');
  handlers.get('dialog:click')({ target: { closest(selector) { return selector === '[data-arcade-close]' ? {} : null; } } });
  assert.equal(dialog.open, false);
  assert.equal(focused, true);
});

test('Arcade route binds preview only on Arcade and keeps global shell/player', () => {
  const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  assert.ok(main.includes("import { renderGames, bindGames } from './pages/games.js'"));
  assert.ok(main.includes("'/games': { render: renderGames, bind: bindGames }"));
  assert.ok(main.includes('initDbsPlayer'));
  assert.ok(main.includes('buildTabbar'));
});

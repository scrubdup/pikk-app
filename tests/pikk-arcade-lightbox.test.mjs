import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { renderGames, bindGames, arcadePreviewAt, arcadeMatchesQuery, arcadePreviewIndexes } from '../src/pages/games.js';
import { PIKK_GAMES } from '../src/games/arcade-catalog.js';

test('all 15 approved Arcade covers open a full-size concept preview, not fake gameplay', () => {
  const html = renderGames();
  assert.equal(html.split('data-game-preview="').length - 1, 15);
  assert.equal(html.split('class="pikk-arcade-card ').length - 1, 15);
  assert.ok(html.includes('<dialog id="pikkArcadeLightbox"'));
  assert.ok(html.includes('data-arcade-full-image'));
  assert.ok(html.includes('data-arcade-prev'));
  assert.ok(html.includes('data-arcade-next'));
  assert.ok(html.includes('pikk-logo-official.png'));
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

test('Arcade search keeps all fifteen approved games and reports accessible filtered results', () => {
  const html = renderGames();
  assert.match(html, /id="pikkArcadeSearch"/);
  assert.match(html, /aria-controls="pikkArcadeGrid"/);
  assert.match(html, /id="pikkArcadeSearchStatus"[^>]*role="status"[^>]*aria-live="polite"/);
  assert.match(html, /id="pikkArcadeNoMatches"[^>]*hidden/);
  assert.equal(arcadeMatchesQuery(PIKK_GAMES[0], 'BLOCK'), true);
  assert.equal(arcadeMatchesQuery(PIKK_GAMES[0], 'fighters'), true);
  assert.equal(arcadeMatchesQuery(PIKK_GAMES[0], 'chess'), false);
  assert.equal(PIKK_GAMES.filter(g => arcadeMatchesQuery(g, '  ')).length, 15);
  assert.equal(html.split('class="pikk-arcade-card ').length - 1, 15);
});

test('Arcade search filters in place, shows empty state, clears on Escape and button', () => {
  const handlers = {};
  const cards = PIKK_GAMES.map(() => ({ hidden: false }));
  const gallery = {
    querySelectorAll(selector) {
      assert.equal(selector, '.pikk-arcade-card');
      return cards;
    },
  };
  let focused = false;
  const search = {
    value: '',
    addEventListener(type, handler) { handlers['search:' + type] = handler; },
    focus() { focused = true; },
  };
  const clear = {
    hidden: true,
    addEventListener(type, handler) { handlers['clear:' + type] = handler; },
  };
  const status = { textContent: '' };
  const empty = { hidden: true };
  const root = { querySelector(selector) {
    return ({
      '.pikk-arcade-grid': gallery,
      '#pikkArcadeSearch': search,
      '#pikkArcadeSearchClear': clear,
      '#pikkArcadeSearchStatus': status,
      '#pikkArcadeNoMatches': empty,
    })[selector] || null;
  }};
  bindGames(root);
  assert.equal(status.textContent, 'Showing all 15 games');
  search.value = 'chess';
  handlers['search:input']();
  assert.equal(cards.filter(c => !c.hidden).length, 1);
  assert.equal(cards[14].hidden, false);
  assert.equal(status.textContent, 'Showing 1 of 15 games');
  assert.equal(clear.hidden, false);
  search.value = 'not-a-game';
  handlers['search:input']();
  assert.equal(cards.filter(c => !c.hidden).length, 0);
  assert.equal(empty.hidden, false);
  let prevented = false;
  handlers['search:keydown']({ key: 'Escape', preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(search.value, '');
  assert.equal(cards.filter(c => !c.hidden).length, 15);
  assert.equal(empty.hidden, true);
  assert.equal(clear.hidden, true);
  search.value = 'pool';
  handlers['search:input']();
  handlers['clear:click']();
  assert.equal(search.value, '');
  assert.equal(cards.filter(c => !c.hidden).length, 15);
  assert.equal(focused, true);
});

test('filtered artwork preview browses only matching games, wraps and disables single-result arrows', () => {
  assert.deepEqual(arcadePreviewIndexes('Play Chips'), [8, 9, 10]);
  assert.deepEqual(arcadePreviewIndexes('chess'), [14]);
  assert.equal(arcadePreviewIndexes('').length, 15);

  const handlers = {};
  const cards = PIKK_GAMES.map(() => ({ hidden: false }));
  const gallery = {
    querySelectorAll() { return cards; },
    addEventListener(type, fn) { handlers['gallery:' + type] = fn; },
  };
  const search = {
    value: 'Play Chips',
    addEventListener(type, fn) { handlers['search:' + type] = fn; },
  };
  const prev = { disabled: false };
  const next = { disabled: false };
  const fields = Object.fromEntries([
    '[data-arcade-full-image]', '[data-arcade-title]',
    '[data-arcade-description]', '[data-arcade-players]',
    '[data-arcade-counter]',
  ].map(key => [key, { textContent: '', src: '', alt: '' }]));
  const dialog = {
    open: false,
    addEventListener(type, fn) { handlers['dialog:' + type] = fn; },
    querySelector(selector) {
      if (selector === '[data-arcade-prev]') return prev;
      if (selector === '[data-arcade-next]') return next;
      return fields[selector];
    },
    showModal() { this.open = true; },
    close() { this.open = false; handlers['dialog:close'](); },
  };
  const root = { querySelector(selector) {
    return ({
      '.pikk-arcade-grid': gallery,
      '#pikkArcadeSearch': search,
      '#pikkArcadeLightbox': dialog,
    })[selector] || null;
  }};
  bindGames(root);
  const open = (index) => {
    const opener = { dataset: { gamePreview: String(index) }, isConnected: true, focus() {} };
    handlers['gallery:click']({ target: { closest(key) {
      return key === '[data-game-preview]' ? opener : null;
    }}});
  };
  const click = (key) => handlers['dialog:click']({ target: { closest(selector) {
    return selector === key ? {} : null;
  }}});

  assert.equal(cards.filter(card => !card.hidden).length, 3);
  open(8);
  assert.equal(fields['[data-arcade-title]'].textContent, 'PIKK Poker');
  assert.equal(fields['[data-arcade-counter]'].textContent, '01 / 03');
  assert.equal(prev.disabled, false);
  assert.equal(next.disabled, false);
  click('[data-arcade-next]');
  assert.equal(fields['[data-arcade-title]'].textContent, 'PIKK Blackjack');
  assert.equal(fields['[data-arcade-counter]'].textContent, '02 / 03');
  click('[data-arcade-next]');
  assert.equal(fields['[data-arcade-title]'].textContent, 'PIKK Slots');
  click('[data-arcade-next]');
  assert.equal(fields['[data-arcade-title]'].textContent, 'PIKK Poker');
  click('[data-arcade-prev]');
  assert.equal(fields['[data-arcade-title]'].textContent, 'PIKK Slots');
  dialog.close();

  search.value = 'chess';
  handlers['search:input']();
  open(14);
  assert.equal(fields['[data-arcade-counter]'].textContent, '01 / 01');
  assert.equal(prev.disabled, true);
  assert.equal(next.disabled, true);
  handlers['dialog:keydown']({ key: 'ArrowRight', preventDefault() {} });
  assert.equal(fields['[data-arcade-title]'].textContent, 'PIKK Chess');
  dialog.close();

  search.value = '';
  handlers['search:input']();
  open(14);
  assert.equal(fields['[data-arcade-counter]'].textContent, '15 / 15');
  assert.equal(prev.disabled, false);
  click('[data-arcade-next]');
  assert.equal(fields['[data-arcade-title]'].textContent, 'Block Wars');
  assert.equal(fields['[data-arcade-counter]'].textContent, '01 / 15');
});

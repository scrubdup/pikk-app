import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MUSIC_MENU_ITEMS } from '../src/music-menu.js';

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const menu = readFileSync(new URL('../src/music-menu.js', import.meta.url), 'utf8');
const music = readFileSync(new URL('../src/pages/music.js', import.meta.url), 'utf8');

test('owner-approved Music menu has exactly five options on verified Music route', () => {
  assert.deepEqual(MUSIC_MENU_ITEMS.map(({ label }) => label),
    ['Songs', 'Albums', 'Beats', 'Playlists', 'Upload Music']);
  assert.deepEqual(MUSIC_MENU_ITEMS.map(({ href }) => href),
    ['#/music?view=songs', '#/music?view=albums', '#/music?view=beats',
      '#/music?view=playlists', '#/music?view=upload']);
  assert.ok(MUSIC_MENU_ITEMS.every(({ detail }) => detail.length > 0));
});

test('Music tab opens its dialog; existing Create tab remains independent', () => {
  assert.match(main, /toggleMusicMenu\(event\.currentTarget\)/);
  assert.match(main, /aria-controls="pikkMusicMenu"/);
  assert.match(main, /ensureCreateMenu\(\)/);
  assert.match(main, /closeMusicMenu\(\)/);
  assert.match(menu, /pikk-create-overlay/);
  assert.match(menu, /pikk-create-options/);
});

test('Music menu is keyboard accessible and dismisses on route changes', () => {
  assert.match(menu, /aria-modal="true"/);
  assert.match(menu, /aria-labelledby="pikkMusicMenuTitle"/);
  assert.match(menu, /addEventListener\('hashchange'/);
  assert.match(menu, /event\.key === 'Escape'/);
  assert.match(menu, /event\.key !== 'Tab'/);
  assert.match(menu, /!panel\.contains\(document\.activeElement\)/);
  assert.match(menu, /if \(restoreFocus\) trigger\?\.focus\(\)/);
});

test('Music focus routes show actual songs, albums and playlists without inventing uploads', () => {
  assert.match(music, /route\.query\?\.view/);
  assert.match(music, /release\.type === 'album'/);
  assert.match(music, /release\.type === 'single' \|\| release\.type === 'song'/);
  assert.match(music, /YOUTUBE_CHANNEL_PLAYLISTS\.map/);
  assert.match(music, /Not available yet · TEST MODE/);
  assert.match(music, /The producer beat marketplace and licensing checkout are still in development/);
  assert.match(music, /Creator music uploads require secure storage/);
  assert.match(music, /\$\{focusedViewCard\}/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/pikk-chips.css', import.meta.url), 'utf8');
const music = readFileSync(new URL('../src/pages/music.js', import.meta.url), 'utf8');
const show = readFileSync(new URL('../src/home-showcase.js', import.meta.url), 'utf8');
test('polish-music: Spotify links are not green; palette only', () => {
  assert.match(css, /\.stream-plat-spotify \{ color: #fff !important; border-color: var\(--pikk-blue/);
});
test('polish-music: single play glyph on Apple embed summary, fit-width type chip', () => {
  assert.match(music, /<summary>Play in PIKK · Apple Music<\/summary>/);
  assert.match(css, /apple-music-embed > summary::-webkit-details-marker \{ display: none; \}/);
  assert.match(css, /\.stream-meta > \.chip \{ width: fit-content/);
});
test('polish-music: Vault lock copy shows PIKK+ not skeet+', () => {
  assert.match(music, /'skeet\+':'PIKK\+'/);
});
test('polish-music: Home reaches Beats and Playlists', () => {
  assert.match(show, /'#\/music\?view=beats', 'Beats'/);
  assert.match(show, /'#\/music\?view=playlists', 'Playlists'/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const player = readFileSync(new URL('../src/player.js', import.meta.url), 'utf8');

test('persistent PIKK music player has platform-neutral initial labels', () => {
  assert.match(html, /id="dbs-sticky-player"[^>]*role="region" aria-label="PIKK Music Player"/);
  assert.match(html, /id="spTitle">PIKK Music<\/div>/);
  assert.match(html, /id="spQueueBtn" aria-label="Music queue" title="Music queue"/);
  assert.doesNotMatch(html, /id="spTitle">DatBoiSkeet<\/div>/);
  assert.doesNotMatch(html, /title="His tracks"/);
});

test('artist credit remains track metadata and playback is not replaced', () => {
  assert.match(player, /title\.textContent = track\?\.title \|\| 'PIKK Music'/);
  assert.match(player, /sub\.textContent =/);
  assert.match(player, /artist: r\.artist \|\| 'DatBoiSkeet'/);
  assert.match(player, /playing \? 'Pause' : 'Play PIKK Music'/);
  assert.doesNotMatch(player, /Play DBS Music/);
  assert.match(html, /id="spPlay" aria-label="Play PIKK Music"/);
  assert.match(html, /id="dbsStickyFrame"/);
  assert.match(html, /id="spPrev"/);
  assert.match(html, /id="spNext"/);
});

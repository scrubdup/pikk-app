import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const music = readFileSync(new URL('../src/pages/music.js', import.meta.url), 'utf8');
const data = readFileSync(new URL('../src/data.js', import.meta.url), 'utf8');
test('Apple Music is the primary release listening option', () => {
  assert.ok(music.indexOf("apple: 'Apple Music'") < music.indexOf("spotify: 'Spotify'"));
  assert.match(music, /Apple Music · Listen/);
  assert.match(music, /Spotify · Alternative/);
  assert.match(music, /Full Apple Music playback may require a subscription/);
});
test('verified artist and release links remain available', () => {
  assert.match(data, /apple: 'https:\/\/music\.apple\.com\/us\/artist\/datboiskeet\/1270542870'/);
  assert.match(music, /STREAMING_RELEASES\.map\(renderStreamingReleaseCard\)/);
  assert.match(music, /adminStreaming\.map\(renderStreamingReleaseCard\)/);
});

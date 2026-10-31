import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const music = readFileSync(new URL('../src/pages/music.js', import.meta.url), 'utf8');
test('Apple embed is offered alongside the external release links', () => {
  assert.match(music, /https:\/\/embed\.music\.apple\.com/);
  assert.match(music, /Play in PIKK · Apple Music/);
  assert.match(music, /platformButtons\(r\.links\)/);
  assert.match(music, /Apple controls playback availability/);
});
test('only official Apple Music song or album links can become embeds', () => {
  assert.match(music, /url\.hostname !== 'music\.apple\.com'/);
  assert.match(music, /url\.protocol !== 'https:' /);
  assert.match(music, /\(\?:song\|album\)/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const music = readFileSync(new URL('../src/pages/music.js', import.meta.url), 'utf8');

test('PIKK Music discovery heading is platform-wide, not branded as one creator', () => {
  assert.match(music, /PIKK MUSIC · DISCOVER/);
  assert.doesNotMatch(music, /PIKK MUSIC · DATBOISKEET/);
  assert.match(music, /Discover the sound\./);
  assert.match(music, /href="#\/music\?view=songs"/);
  assert.match(music, /href="#\/music\?view=albums"/);
});

test('Creator releases and official platform links remain in Music', () => {
  assert.match(music, /STREAMING_RELEASES/);
  assert.match(music, /renderStreamingReleaseCard/);
  assert.match(music, /platformButtons\(r\.links\)/);
});

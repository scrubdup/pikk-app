import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const player = readFileSync(new URL('../src/player.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function orderInBlock(startMarker, endMarker, pieces) {
  const start = player.indexOf(startMarker);
  assert.ok(start >= 0, startMarker);
  const end = player.indexOf(endMarker, start);
  assert.ok(end > start, endMarker);
  const block = player.slice(start, end);
  let previous = -1;
  for (const piece of pieces) {
    const position = block.indexOf(piece);
    assert.ok(position > previous, piece + ' should follow its preceding provider');
    previous = position;
  }
}

test('sticky music player external destination prioritizes Apple Music', () => {
  orderInBlock('if (openBtn && track) {', 'openBtn.href = href;', [
    'track.links?.apple', 'track.links?.youtubeMusic', 'track.links?.spotify',
    'track.youtube', 'STREAMING_ARTIST.apple',
  ]);
});

test('most-played external fallback prioritizes Apple Music', () => {
  orderInBlock('if (!playable) {', 'if (openBtn && href)', [
    'item.links?.apple', 'item.links?.youtubeMusic', 'item.links?.spotify',
    'item.links?.youtube ||', 'STREAMING_ARTIST.apple',
  ]);
});

test('initial player external link uses official Apple artist; YouTube transport stays intact', () => {
  assert.match(html, /id="spOpen" href="https:\/\/music\.apple\.com\/us\/artist\/datboiskeet\/1270542870"/);
  assert.match(html, /id="dbs-sticky-player"/);
  assert.match(player, /via YouTube \(not Spotify in-app\)/);
  assert.match(player, /Opening external music service/);
});

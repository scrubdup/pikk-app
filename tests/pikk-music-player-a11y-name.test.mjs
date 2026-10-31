import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('sticky player is a named landmark region called "PIKK Music Player"', () => {
  const tag = html.match(/<div class="sticky-player" id="dbs-sticky-player"[^>]*>/)?.[0] || '';
  assert.match(tag, /role="region"/);
  assert.match(tag, /aria-label="PIKK Music Player"/);
  assert.doesNotMatch(tag, /DatBoiSkeet/i);
});

test('open-on-platform arrow link has a text accessible name; glyph hidden; href unchanged', () => {
  const a = html.match(/<a class="sp-btn sp-open" id="spOpen"[^>]*>[\s\S]*?<\/a>/)?.[0] || '';
  assert.match(a, /href="https:\/\/music\.apple\.com\/us\/artist\/datboiskeet\/1270542870"/);
  assert.match(a, /aria-label="Open on official platform \(opens in a new tab\)"/);
  assert.match(a, /<span aria-hidden="true">↗<\/span>/);
});

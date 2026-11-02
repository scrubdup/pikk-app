import test from 'node:test'; import assert from 'node:assert/strict'; import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/pikk-polish-videos.css', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
test('polish-videos: loaded before chip tokens; even tiles (2-line title clamp, bottom-aligned full-width actions); palette only', () => {
  assert.ok(main.indexOf("pikk-polish-videos.css") > 0 && main.indexOf("pikk-polish-videos.css") < main.indexOf("pikk-chips.css"));
  assert.match(css, /-webkit-line-clamp: 2/);
  assert.match(css, /> \.row \{ margin-top: auto; display: grid/);
  assert.doesNotMatch(css, /#(?:ff00ff|e91e63|9c27b0|800080|00ff00|1db954)|magenta|purple|pink/i);
});

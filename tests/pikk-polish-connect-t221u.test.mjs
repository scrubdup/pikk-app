import test from 'node:test'; import assert from 'node:assert/strict'; import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/pikk-polish-connect.css', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
test('polish-connect: loaded, palette-only, no dashed disabled borders, even action grid', () => {
  assert.match(main, /import '\.\/pikk-polish-connect\.css'/);
  assert.ok(main.indexOf('pikk-polish-connect.css') < main.indexOf("pikk-chips.css"), 'chip tokens stay last');
  assert.doesNotMatch(css, /dashed|#(?:ff00ff|e91e63|9c27b0|800080|00ff00|1db954)/i);
  assert.match(css, /\.connect-actions \{ display: grid; grid-template-columns: 1fr 1fr/);
  assert.match(css, /\.connect-controls \{ display: grid; grid-template-columns: repeat\(4/);
});

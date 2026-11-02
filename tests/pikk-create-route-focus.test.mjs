import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/pikk-mockup.css', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
test('#/create is a real route rendering the existing Create options with TEST MODE note', () => {
  assert.match(main, /'\/create': \{ render: renderCreatePage \}/);
  assert.match(main, /function renderCreatePage\(\)[\s\S]*createMenuMarkup\(\)[\s\S]*TEST MODE/);
});
test('player focus rings are visible; Play next no longer removes outline', () => {
  assert.match(css, /\.sp-btn\.sp-play:focus-visible \{ outline: 3px solid/);
  assert.doesNotMatch(styles, /\.sp-play-next:hover, \.sp-play-next:focus-visible \{\s*border-color: var\(--acc\); outline: none/);
});

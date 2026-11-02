import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/pikk-chips.css', import.meta.url), 'utf8');
const show = readFileSync(new URL('../src/home-showcase.js', import.meta.url), 'utf8');
test('polish-connect: Home Connect row reaches Random Chat and Multi-platform go-live', () => {
  assert.match(show, /'#\/connect#connect-random-chat', 'Random Chat', '18\+ · TEST MODE'/);
  assert.match(show, /'#\/connect#connect-multistream', 'Multi-platform go-live', 'TEST MODE/);
});
test('polish-connect: compact 2-col platform grid, red checkboxes, chrome disabled state (no new hues)', () => {
  const block = css.slice(css.indexOf('/* polish-connect'));
  assert.match(block, /connect-mp-grid \{ display: grid !important; grid-template-columns: repeat\(2/);
  assert.match(block, /accent-color: #e3242b/);
  assert.match(block, /\.btn:disabled[^{]*\{[^}]*color: #c0c6cf/);
  assert.doesNotMatch(block, /#(?:0f0|00ff|ff00ff|a020f0)|green|purple|magenta|pink/i);
});

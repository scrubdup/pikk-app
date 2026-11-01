import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR } from '../src/data.js';
test('tab bar: red icons, blue labels in all states; active shown by glow/underline; Create badge kept', () => {
  const css = readFileSync(new URL('../src/pikk-duotone.css', import.meta.url), 'utf8');
  for (const st of [':hover', ':focus', ':focus-visible', '.on', '[aria-current="page"]']) assert.ok(css.includes(`#tabbar > a${st} { color: var(--pikk-blue) !important; }`) || css.includes(`#tabbar > a${st},`), st);
  assert.match(css, /#tabbar > a > span:not\(\.tab-ico\),[\s\S]*?\{ color: var\(--pikk-blue\) !important; \}/);
  assert.match(css, /\.tab-ico svg \* \{ color: var\(--pikk-red\) !important; stroke: var\(--pikk-red\) !important; \}/);
  assert.match(css, /:is\(\.on, \[aria-current="page"\]\) \{ box-shadow: inset 0 -2px 0 var\(--pikk-blue\) !important; \}/);
  assert.ok(!/#tabbar > a\.tab-primary[^{]*\{[^}]*pikk-create-play-cursor/.test(css));
  assert.match(readFileSync(new URL('../src/main.js', import.meta.url), 'utf8'), /pikk-create-play-cursor-blue\.png/);
  assert.deepEqual(TABBAR.map((t) => t.label), ['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
});

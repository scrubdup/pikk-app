import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/skip-content.css', import.meta.url), 'utf8');

test('keyboard shortcut targets focusable main without replacing hash route', () => {
  assert.match(html, /<button[^>]*id="pikkSkipContent"[^>]*>Skip to main content<\/button>/);
  assert.match(html, /<main id="app" tabindex="-1"><\/main>/);
  assert.ok(html.indexOf('id="pikkSkipContent"') < html.indexOf('class="top"'));
  assert.match(main, /getElementById\('pikkSkipContent'\)\?\.addEventListener\('click',/);
  assert.match(main, /getElementById\('app'\)\?\.focus\(\)/);
  assert.doesNotMatch(html, /href="#app"/);
});

test('skip shortcut is visible only with keyboard focus and preserves app chrome', () => {
  assert.match(main, /import '\.\/skip-content\.css'/);
  assert.match(css, /\.pikk-skip-content:focus-visible\s*\{/);
  assert.match(css, /top:\s*-120px/);
  assert.match(css, /z-index:\s*190/);
  for (const id of ['dbs-sticky-player', 'tabbar', 'spPlay', 'menuBtn']) {
    assert.ok(html.includes('id="' + id + '"'), id);
  }
  assert.match(html, /brand\/pikk-official-approved\.jpg/);
});

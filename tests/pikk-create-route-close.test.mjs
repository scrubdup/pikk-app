import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');

test('Create dialog closes on route changes, not only option clicks', () => {
  assert.match(main, /window\.addEventListener\('hashchange', \(\) => closeMenu\(\)\)/);
  assert.match(main, /panel\.hidden = true;/);
  assert.match(main, /trigger\?\.setAttribute\('aria-expanded', 'false'\)/);
});

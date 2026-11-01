import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('header search magnifier is PIKK red in default, hover and focus states', () => {
  const css = readFileSync(new URL('../src/pikk-mockup.css', import.meta.url), 'utf8');
  for (const st of ['', ':hover', ':focus', ':focus-visible', ':active']) assert.ok(css.includes(`a.header-explore-search${st},`) || css.includes(`a.header-explore-search${st} {`), st || 'default');
  assert.match(css, /a\.header-explore-search svg \* ,?|a\.header-explore-search svg \*,/);
  assert.match(css, /stroke: var\(--pikk-red\); color: var\(--pikk-red\);/);
  assert.match(css, /a\.header-explore-search svg \[fill\]:not\(\[fill="none"\]\) \{ fill: var\(--pikk-red\); \}/);
});

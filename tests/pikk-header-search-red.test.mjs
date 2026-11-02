import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('only the header search magnifier glyph is PIKK red (all states); button box untouched', () => {
  const css = readFileSync(new URL('../src/pikk-mockup.css', import.meta.url), 'utf8');
  for (const st of ['', ':hover', ':focus', ':focus-visible', ':active']) assert.ok(css.includes(`a.header-explore-search${st} svg *`), st || 'default');
  assert.match(css, /stroke: var\(--pikk-red\); color: var\(--pikk-red\);/);
  assert.ok(!/a\.header-explore-search(:[\w-]+)?\s*(,|\{)[^}]*?\{\s*color: var\(--pikk-red\)/.test(css.replace(/svg[^{]*\{[^}]*\}/g, '')), 'button itself not recolored');
});
test('bell, Messages and menu glyphs are PIKK red in every state (t339u)', () => {
  const css = readFileSync(new URL('../src/pikk-mockup.css', import.meta.url), 'utf8');
  const sel = ':is(a.header-notifications, a.header-msg, button.icon-btn)';
  for (const st of ['', ':hover', ':focus', ':focus-visible', ':active']) assert.ok(css.includes(`${sel}${st} svg *`), st || 'default');
  assert.ok(css.includes(`${sel} svg [fill]:not([fill="none"]) { fill: var(--pikk-red); }`));
});

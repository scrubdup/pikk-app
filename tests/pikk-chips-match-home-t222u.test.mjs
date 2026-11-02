import test from 'node:test'; import assert from 'node:assert/strict'; import { readFileSync, existsSync } from 'node:fs';
const css = readFileSync(new URL('../src/pikk-chips.css', import.meta.url), 'utf8');
test('t222u: tab groups on every page use Home chip geometry tokens; avatars use Home ring; guard is wired', () => {
  for (const t of ['--pikk-chip-fs: 11px', '--pikk-chip-fw: 750', '--pikk-chip-pad: 8px 10px', '--pikk-chip-h: 34px']) assert.ok(css.includes(t), t);
  for (const g of ['.home-stage-tabs', '.live-disc-tabs', '.admin-type-tabs', '.pikk-viral-tabs', '.shop-chips', '.pikk-video-filters', '.pikk-music-categories', '.live-cat-chips']) assert.ok(css.includes(g), g);
  assert.ok(css.includes('--pikk-chip-tap: 44px'));
  assert.ok(css.includes('inset: calc((var(--pikk-chip-h) - var(--pikk-chip-tap)) / 2 - var(--pikk-chip-bw, 1px) - 1px) -2px'), 'tap area reaches past the border');
  assert.match(css, /\.pikk-video-filters \{ padding-top: 9px !important;[^}]*margin-top: -6px !important/);
  assert.ok(existsSync(new URL('../scripts/visual-review-connect-tap.mjs', import.meta.url)));
  assert.match(css, /--pikk-ring-bg: linear-gradient\(135deg, var\(--pikk-red[^)]*\), #c0c6cf, var\(--pikk-blue/);
  assert.match(css, /\.meta > \.avatar, \.shop-avatar-frame/);
  assert.ok(existsSync(new URL('../scripts/visual-review-chips-match-home.mjs', import.meta.url)));
  assert.match(readFileSync(new URL('../.github/workflows/pikk-duotone-visual.yml', import.meta.url), 'utf8'), /visual-review-chips-match-home\.mjs/);
});

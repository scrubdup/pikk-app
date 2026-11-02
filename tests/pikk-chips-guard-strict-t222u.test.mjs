import test from 'node:test'; import assert from 'node:assert/strict'; import { readFileSync } from 'node:fs';
const guard = readFileSync(new URL('../scripts/visual-review-chips-match-home.mjs', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/pikk-chips.css', import.meta.url), 'utf8');
test('chips guard: strict same-chip hit at 25/50/75% above+below, no neighbour allowance, waits for splash', () => {
  assert.match(guard, /if \(!\(hit === e \|\| e\.contains\(hit\)\)\) out\.fail\.push\(/);
  assert.doesNotMatch(guard, /neighbour|betweenRows|between-rows/);
  assert.match(guard, /for \(const f of \[0\.25, 0\.5, 0\.75\]\) for \(const \[lbl, y\] of \[\['above', r\.top - 5\], \['below', r\.bottom \+ 5\]\]\)/);
  assert.match(guard, /waitForSelector\('#splash', \{ state: 'detached'/);
  assert.doesNotMatch(guard, /waitForTimeout\(\+\(process\.env\.W \|\| 6500\)\)/);
});
test('chip CSS: 12px wrapped-row gap; rectangular tap area meeting at gap midpoint', () => {
  assert.match(css, /\.pikk-music-categories\) \{ row-gap: 12px; column-gap: max\(6px/);
  assert.match(css, /calc\(-1 \* var\(--pikk-chip-tap-x, 3px\)\); border-radius: 0;/);
});

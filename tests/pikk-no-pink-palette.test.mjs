import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

// Owner palette (2026-10-31): black · red · electric blue · chrome. No pink/magenta accents in app CSS.
function hls(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (!d) return [0, l, 0];
  const s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
  let h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, l, s];
}
const pink = (r, g, b) => { const [h, l, s] = hls(r, g, b); return s > .35 && l > .2 && h > .78 && h < .97; };

test('no pink/magenta colors remain in any src stylesheet', () => {
  const dir = new URL('../src/', import.meta.url);
  const bad = [];
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.css'))) {
    const css = readFileSync(new URL(f, dir), 'utf8');
    for (const [, h] of css.matchAll(/#([0-9a-fA-F]{6})(?![0-9a-fA-F])/g)) {
      const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
      if (pink(r, g, b)) bad.push(`${f} #${h}`);
    }
    for (const [, r, g, b] of css.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g)) if (pink(+r, +g, +b)) bad.push(`${f} rgb(${r},${g},${b})`);
  }
  assert.deepEqual(bad, []);
});

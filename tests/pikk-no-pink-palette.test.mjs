import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Owner palette: black · red · electric blue · metallic chrome. Flags pink, magenta, purple,
// salmon (light red) and lavender in hex (3/4/6/8-digit) and rgb()/rgba(), in CSS, JS inline styles and index.html.
function hls(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (!d) return [0, l, 0];
  const s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
  const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h / 6, l, s];
}
export function offPalette(r, g, b) {
  const [h, l, s] = hls(r, g, b);
  if (s < .3 || l < .15) return false;
  if (h >= .72 && h < .985) return true;               // purple · magenta · pink
  if ((h >= .985 || h < .02) && l > .66) return true;  // salmon / light pink-red
  if (h >= .60 && h < .72 && l > .72 && s > .5) return true; // lavender
  return false;
}
const root = fileURLToPath(new URL('..', import.meta.url));
function walk(dir) {
  return readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
}
test('no pink/magenta/purple/salmon/lavender colors anywhere in app source', () => {
  const files = [...walk(join(root, 'src')).filter((f) => /\.(css|js)$/.test(f) && !f.endsWith('store.js')), join(root, 'index.html')];
  const bad = [];
  for (const f of files) {
    const src = readFileSync(f, 'utf8');
    for (const [m, h] of src.matchAll(/#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![0-9a-zA-Z_-])/g)) {
      const full = h.length >= 6 ? h : [...h.slice(0, 3)].map((c) => c + c).join('');
      const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
      if (offPalette(r, g, b)) bad.push(`${f.slice(root.length)} ${m}`);
    }
    for (const [m, r, g, b] of src.matchAll(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g)) if (offPalette(+r, +g, +b)) bad.push(`${f.slice(root.length)} ${m}`);
    for (const [m] of src.matchAll(/\b(hotpink|deeppink|fuchsia|magenta|violet|orchid|salmon|lightcoral)\b\s*[;,)]/gi)) bad.push(`${f.slice(root.length)} ${m}`);
  }
  assert.deepEqual(bad, []);
});
test('checker-reported colors are gone', () => {
  const all = walk(join(root, 'src')).filter((f) => /\.css$/.test(f)).map((f) => readFileSync(f, 'utf8')).join('\n').toLowerCase();
  for (const c of ['#ff4c92', '#ff8d9e', '#ff8a98', '#ff2bd6', '#e91e8c']) assert.ok(!all.includes(c), c);
});

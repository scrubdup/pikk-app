import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Gradients may go red → chrome/dark → blue, never straight red → blue (sRGB midpoint is purple/rose).
const root = fileURLToPath(new URL('..', import.meta.url));
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(join(root, 'src')).filter((f) => /\.(css|js)$/.test(f));
function hsv(r, g, b) { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (!d) return [0, 0, mx]; let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; if (h < 0) h += 360; return [h, d / mx, mx]; }
function rgbOf(c) {
  if (/^var\(/.test(c)) return /red/.test(c) ? [255, 49, 55, 1] : /blue/.test(c) ? [47, 107, 255, 1] : null;
  if (c[0] === '#') { let h = c.slice(1); if (h.length <= 4) h = [...h.slice(0, 3)].map((x) => x + x).join('') + (h[3] ? h[3] + h[3] : ''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).concat(h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1); }
  const n = c.match(/[\d.]+/g).map(Number); return [n[0], n[1], n[2], n[3] ?? 1];
}
function kind(c) { const v = rgbOf(c); if (!v || v[3] < 0.15) return null; const [h, s, l] = hsv(v[0], v[1], v[2]); if (s < 0.3 || l < 0.25) return null; if (h < 20 || h >= 345) return 'r'; if (h >= 190 && h <= 255) return 'b'; if (h > 260 && h < 345) return 'p'; return null; }
function gradients(src) {
  const out = []; const re = /(?:repeating-)?(?:linear|radial|conic)-gradient\(/g; let m;
  while ((m = re.exec(src))) { let j = re.lastIndex, d = 1; while (d && j < src.length) { if (src[j] === '(') d++; else if (src[j] === ')') d--; j++; } out.push(src.slice(re.lastIndex, j - 1)); }
  return out;
}
const COLOR = /#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|var\(--[\w-]+(?:,[^)]*)?\)/g;
test('no gradient interpolates directly between red and blue, or through purple stops', () => {
  const bad = [];
  for (const f of files) for (const g of gradients(readFileSync(f, 'utf8'))) {
    const ks = [...g.matchAll(COLOR)].map((x) => [x[0], kind(x[0])]).filter((x) => x[1] !== undefined);
    for (let i = 0; i < ks.length; i++) {
      if (ks[i][1] === 'p') bad.push(`${f.slice(root.length)} purple stop ${ks[i][0]}`);
      if (i && ks[i - 1][1] && ks[i][1] && new Set([ks[i - 1][1], ks[i][1]]).size === 2 && [ks[i - 1][1], ks[i][1]].sort().join('') === 'br') bad.push(`${f.slice(root.length)} ${ks[i - 1][0]}→${ks[i][0]}`);
    }
  }
  assert.deepEqual(bad, []);
});
test('arcade titles, Create icons and chips use no orange/yellow', () => {
  const css = readFileSync(join(root, 'src/styles.css'), 'utf8');
  for (const sel of [/\.pikk-arcade-card[^{]*h3\{color:(#[0-9a-f]{6})/gi, /\.pikk-menu-icon\{color:(#[0-9a-f]{6})/gi]) for (const [, c] of css.matchAll(sel)) { const [h, s] = hsv(...rgbOf(c)); assert.ok(!(s > 0.3 && h >= 20 && h <= 70), c); }
});
test('Connect hero orbs and Coming Soon toast wiring', () => {
  const css = readFileSync(join(root, 'src/styles.css'), 'utf8');
  assert.match(css, /\.pikk-connect-hero-orbit\{[^}]*linear-gradient\(130deg,#ff3137, #c0c6cf,#2f6bff\)/);
  const main = readFileSync(join(root, 'src/main.js'), 'utf8');
  assert.match(main, /COMING_SOON_SELECTOR = '\.pikk-menu-planned, \.pikk-create-tile-planned, \.drawer-soon/);
  assert.match(main, /toast\(title \? `\$\{title\} · Coming Soon` : 'Coming Soon'\)/);
});

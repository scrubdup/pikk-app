import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
const dir = new URL('../src/', import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith('.css'));
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '');
const SEL = /(\.active|\.is-active|\.selected|\.is-selected|\.is-on|\.on\b|\.is-current|aria-pressed="?true|aria-selected="?true|aria-current)/;
const CTRL = /(chip|pill|tab|btn|button|seg|filter|categor|sort|tag|pick|toggle|nav a|\ba\b)/i;
const BG = /background(-color|-image)?\s*:([^;]*)/gi;
const OK = /var\(--pikk-chip-(selected|active)-bg\)|^\s*(none|transparent|inherit)\b/;
// Explicit exceptions: non-chip artwork (tab bar Create ring, Match Up tile art).
const ALLOW = /#tabbar|tab-primary|tab-ico|pikk-mu-tile|home-goal|player|progress|range|slider|thumb/;
test('t387u/t388u: every selected chip/pill/tab background uses the shared glossy red+blue token (no white, silver-only or flat fills)', () => {
  const bad = [];
  for (const f of files) {
    if (f === 'pikk-chips.css') continue;
    const css = strip(readFileSync(new URL(f, dir), 'utf8'));
    for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
      const sel = m[1].trim(), body = m[2];
      const parts = sel.split(',').filter((p) => SEL.test(p) && CTRL.test(p) && !ALLOW.test(p) && !/:hover|::|:not\([^)]*(is-current|\.on|active|selected)/.test(p));
      if (!parts.length) continue;
      for (const [, , v] of body.matchAll(BG)) if (!OK.test(v)) bad.push(`${f}: ${parts.join(',').slice(0, 90)} → ${v.trim().slice(0, 50)}`);
    }
  }
  assert.deepEqual(bad, []);
});
test('t388u: shared selected token is glossy red AND blue, not white/silver-only or flat', () => {
  const css = readFileSync(new URL('pikk-chips.css', dir), 'utf8');
  const tok = (css.match(/--pikk-chip-selected-bg:\s*([^;]+);/) || [])[1] || '';
  assert.ok((tok.match(/gradient\(/g) || []).length >= 2, 'gradient + sheen layer');
  assert.match(tok, /rgba\(255, 255, 255, \.[2-9]\d*\)/, 'top sheen');
  assert.match(tok, /#e3242b|#ff3137|#e0222a/i, 'red stop');
  assert.match(tok, /#2f6bff/i, 'blue stop');
  assert.ok(!/pink|magenta|purple|#ff00ff/i.test(tok));
  assert.match(css, /--pikk-chip-active-bg:\s*var\(--pikk-chip-selected-bg\)/);
});
test('t387u: shared chip tokens + global selected rule exist and are loaded last', () => {
  const css = readFileSync(new URL('pikk-chips.css', dir), 'utf8');
  for (const t of ['--pikk-chip-bg', '--pikk-chip-border', '--pikk-chip-text', '--pikk-chip-active-bg', '--pikk-chip-active-text', '--pikk-chip-selected-bg']) assert.ok(css.includes(t + ':'), t);
  
  assert.match(css, /aria-pressed="true"\][\s\S]*background:\s*var\(--pikk-chip-selected-bg\)\s*!important/);
  const main = readFileSync(new URL('main.js', dir), 'utf8');
  const imports = [...main.matchAll(/import '\.\/([\w-]+\.css)'/g)].map((m) => m[1]);
  assert.equal(imports.at(-1), 'pikk-chips.css');
});

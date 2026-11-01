import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SPLASH_HOLD_MS, SPLASH_CLICK_MS } from '../src/splash-config.js';
const css = readFileSync(new URL('../src/pikk-splash.css', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const kf = (n) => { const i = css.indexOf(`@keyframes ${n} {`); assert.ok(i >= 0, n); let d = 0, j = css.indexOf('{', i); for (let k = j; k < css.length; k++) { if (css[k] === '{') d++; if (css[k] === '}' && !--d) return css.slice(j, k + 1); } };
const at = (pct) => (pct / 100) * SPLASH_HOLD_MS;
test('t407u: 5s splash on the official logo with cursor, ripple, shine and tagline', () => {
  assert.equal(SPLASH_HOLD_MS, 5000); assert.match(css, /--splash-total: 5s;/);
  assert.match(html, /data-splash-motion="t407u">\s*<span class="splash-neon" aria-hidden="true"><\/span>\s*<img class="splash-logo" src="%BASE_URL%brand\/pikk-logo-official\.png"/);
  for (const c of ['splash-shine', 'splash-ripple', 'splash-cursor', 'splash-tagline']) assert.match(html, new RegExp(`class="${c}"`));
  assert.match(html, /fill="#ff1f2d"/, 'red cursor');
  assert.match(main, /import '\.\/pikk-splash\.css';/);
});
test('t407u: timings — click 0.8s, zoom 70%→110% (1–2.5s), settle 100% + neon (2.5–3.5s), tagline + zoom-out fade (3.5–5s)', () => {
  assert.equal(SPLASH_CLICK_MS, 800); assert.equal(at(16), 800);
  assert.match(kf('splashCursor'), /16\.5% \{ transform: translate\(0, 0\) scale\(\.8\); \}/);
  assert.match(kf('splashRipple'), /0%, 16% \{ opacity: 0;[\s\S]*17% \{ opacity: 1;/);
  const z = kf('splashZoom');
  assert.match(z, /0%, 20% \{ transform: scale\(\.7\); \}/); assert.equal(at(20), 1000);
  assert.match(z, /50% \{ transform: scale\(1\.1\); \}/); assert.equal(at(50), 2500);
  assert.match(z, /70%, 100% \{ transform: scale\(1\); \}/);
  assert.match(kf('splashLogoShow'), /0%, 17% \{ opacity: 0; \} 20%, 100% \{ opacity: 1; \}/); assert.equal(at(70), 3500);
  assert.match(kf('splashShine'), /0%, 20% \{ background-position: -80% 0; opacity: 0; \}[\s\S]*50%, 100% \{ background-position: 220% 0; opacity: 0; \}/);
  assert.match(kf('splashNeon'), /58% \{ opacity: \.75; \}/);
  assert.match(css, /\.splash-neon \{[^}]*rgba\(255,49,55,\.9\)[^}]*rgba\(47,107,255,\.9\)/);
  assert.match(html, /class="splash-neon"/);
  assert.match(kf('splashTagline'), /0%, 70% \{ opacity: 0;[\s\S]*82%, 100% \{ opacity: 1;/);
  assert.match(kf('splashOut'), /100% \{ opacity: 0; transform: scale\(1\.08\); \}/);
});
test('t407u: reduced motion = simple fade; chime synced to the click', () => {
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{[\s\S]*animation: none !important;[\s\S]*splashFadeSimple/);
  assert.match(main, /setTimeout\(\(\) => playSplashChime\(\), SPLASH_CLICK_MS\)/);
  assert.match(html, /id="splashChime"/);
});

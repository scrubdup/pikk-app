import test from 'node:test'; import assert from 'node:assert/strict'; import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/pikk-t422u.css', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const ord = id => Number(css.match(new RegExp(`#${id}\\s*\\{[^}]*order:\\s*(-?\\d+)`))[1]);
test('t422u header order: profile, $, gear, search', () => {
  assert.ok(ord('headerProfile') < ord('paymentsBtn') && ord('paymentsBtn') < ord('settingsBtn') && ord('settingsBtn') < ord('exploreSearchBtn'));
  assert.match(css, /#headerProfile\s*\{[^}]*display:\s*grid/);
  assert.match(html, /id="headerProfile" href="#\/profile"/);
});
test('t422u tab bar flush bottom with safe-area padding', () => {
  assert.match(css, /bottom:\s*0/);
  assert.match(css, /padding-bottom:\s*env\(safe-area-inset-bottom/);
  assert.match(html, /viewport-fit=cover/);
  assert.match(main, /import '.\/pikk-t422u.css'/);
});
test('t422u-center: logo exactly centred (no shift) and search right edge < logo left edge at 360/390/430', () => {
  assert.doesNotMatch(css, /logo-shift|\.logo \{[^}]*translateX/);
  const icon = (w) => Number(css.match(new RegExp(`max-width: ${w}px\\)[^@]*?:is\\(\\.pill, \\.icon-btn\\) \\{ width: (\\d+)px`))[1]);
  const gap = Number(css.match(/\.top#topBar \{ gap: (\d+)px/)[1]);
  const logoVw = Number(css.match(/logo-img \{ width: min\((\d+)vw/)[1]);
  for (const [w, padL] of [[360, 5], [390, 9], [430, 9]]) {
    const size = w <= 370 ? icon(370) : icon(480);
    const searchRight = padL + 4 * size + 3 * gap;
    const logoLeft = (w - (w * logoVw) / 100) / 2;
    assert.ok(searchRight < logoLeft, `${w}px: search right ${searchRight} must be < logo left ${logoLeft}`);
  }
});

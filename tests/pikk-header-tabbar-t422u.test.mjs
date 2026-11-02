import test from 'node:test'; import assert from 'node:assert/strict'; import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/pikk-t422u.css', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const ord = id => Number(css.match(new RegExp(`#${id}\\s*\\{[^}]*order:\\s*(-?\\d+)`))[1]);
test('t422u/t219u header order: profile, $, search; no gear; 3 icons each side', () => {
  assert.ok(ord('headerProfile') < ord('paymentsBtn') && ord('paymentsBtn') < ord('exploreSearchBtn'));
  assert.match(css, /#headerProfile\s*\{[^}]*display:\s*grid/);
  assert.match(html, /id="headerProfile" href="#\/profile"/);
  assert.equal(html.includes('id="settingsBtn"'), false);
  const head = html.slice(html.indexOf('<header class="top"'), html.indexOf('</header>'));
  const ids = [...head.matchAll(/<(?:a|button)[^>]*id="(\w+)"/g)].map(m => m[1]).filter(i => i !== 'logoLink' && !/logo/i.test(i));
  assert.deepEqual(ids.sort(), ['exploreSearchBtn', 'headerMsg', 'headerProfile', 'menuBtn', 'notifBtn', 'paymentsBtn'].sort());
});
test('t422u tab bar flush bottom with safe-area padding', () => {
  assert.match(css, /bottom:\s*0/);
  assert.match(css, /#tabbar[^{]*\{[^}]*padding-bottom: max\(4px, calc\(env\(safe-area-inset-bottom, 0px\) \* 0\.25\)\)/);
  assert.match(html, /viewport-fit=cover/);
  assert.match(main, /import '.\/pikk-t422u.css'/);
});
test('t219u: logo centred (no shift); 34px icons, 3 per side, clear of logo at 360/390/430', () => {
  assert.doesNotMatch(css, /logo-shift|\.logo \{[^}]*translateX/);
  const size = Number(css.match(/:is\(\.pill, \.icon-btn\) \{ width: (\d+)px/)[1]);
  assert.equal(size, 34);
  assert.match(css, /::after \{ content: ""; position: absolute; inset: -5px; \}/);
  const gap = Number(css.match(/\.top#topBar \{ gap: (\d+)px/)[1]);
  const logoVw = Number(css.match(/logo-img \{ width: min\((\d+)vw/)[1]);
  for (const [w, pad] of [[360, 5], [390, 9], [430, 9]]) {
    const cluster = pad + 3 * size + 2 * gap;
    const logoLeft = (w - (w * logoVw) / 100) / 2;
    assert.ok(cluster < logoLeft, `${w}px: search right ${cluster} must be < logo left ${logoLeft}`);
    assert.ok(w - cluster > w - logoLeft, `${w}px: bell clear of logo`);
  }
});

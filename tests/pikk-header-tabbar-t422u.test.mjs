import test from 'node:test'; import assert from 'node:assert/strict'; import { readFileSync } from 'node:fs';
const css = readFileSync(new URL('../src/pikk-t422u.css', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const ord = id => Number(css.match(new RegExp(`#${id}\\s*\\{[^}]*order:\\s*(-?\\d+)`))[1]);
test('t422u header order: profile, $, search', () => {
  assert.ok(ord('headerProfile') < ord('paymentsBtn') && ord('paymentsBtn') < ord('exploreSearchBtn'));
  assert.match(css, /#headerProfile\s*\{[^}]*display:\s*grid/);
  assert.match(html, /id="headerProfile" href="#\/profile"/);
});
test('t422u tab bar flush bottom with safe-area padding', () => {
  assert.match(css, /bottom:\s*0/);
  assert.match(css, /padding-bottom:\s*env\(safe-area-inset-bottom/);
  assert.match(html, /viewport-fit=cover/);
  assert.match(main, /import '.\/pikk-t422u.css'/);
});

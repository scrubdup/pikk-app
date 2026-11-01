import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const { PAYMENTS_HUB, renderPayments } = await import('../src/pages/payments.js');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const idx = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const routeExists = (h) => main.includes(`'/${h.replace(/^#\/?/, '').split(/[?#]/)[0]}': {`);
test('$ header button sits next to search and routes to #/payments', () => {
  assert.match(idx, /id="exploreSearchBtn"[\s\S]*?<\/a>\s*<a class="pill header-explore-search header-pay" id="paymentsBtn" href="#\/payments"/);
  assert.ok(routeExists('#/payments'));
});
test('every Payments hub item resolves to a route or an honest Coming soon', () => {
  const t = PAYMENTS_HUB.map((i) => i.title);
  for (const need of ['Donate', 'Buy coins & gifts', 'Promote bookings', 'Shop orders & checkout', 'Subscriptions & fan clubs', 'Tips', 'Wallet balance', 'Payouts & earnings', 'Payment history']) assert.ok(t.includes(need), need);
  for (const i of PAYMENTS_HUB) { if (i.href) assert.ok(routeExists(i.href), i.href); else assert.ok(i.soon && /Coming soon/.test(i.detail), i.id); }
  const html = renderPayments();
  assert.match(html, /No real payments are processed yet/);
  assert.equal((html.match(/data-pay="/g) || []).length, PAYMENTS_HUB.length);
  assert.doesNotMatch(html, /\$\d/);
});

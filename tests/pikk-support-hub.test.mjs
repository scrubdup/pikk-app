import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
globalThis.window = { localStorage: { getItem: () => null, setItem: () => {} } }; globalThis.location = { hash: '#/support' };
const s = await import('../src/pikk-support.js');
const { renderSupport } = await import('../src/pages/support.js');
const { drawerGroups } = await import('../src/nav-sections.js');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const routeExists = (h) => main.includes(`'/${h.replace(/^#\/?/, '').split(/[?#]/)[0]}': {`);
const html = renderSupport();
test('Support hub sections render and every link resolves', () => {
  for (const id of ['faq', 'contact', 'account', 'tickets']) assert.ok(html.includes(`id="support-${id}"`), id);
  assert.deepEqual(s.SUPPORT_SECTIONS.map((x) => x.title), ['Help / FAQ search', 'Contact support', 'Report a problem / bug', 'Report abuse / safety', 'Payments & refunds help', 'Account & login help', 'My tickets']);
  for (const x of s.SUPPORT_SECTIONS) assert.ok(routeExists(x.href), x.href);
  for (const [, h] of html.matchAll(/href="(#\/[^"]+)"/g)) assert.ok(routeExists(h), h);
  assert.match(html, /href="#\/guidelines"/); assert.match(html, /href="#\/payments"/);
  assert.match(html, /Saved on this device — support inbox coming soon/);
});
test('tickets: honest status; FAQ search; drawer + profile entry', () => {
  const t = s.createSupportTicket({ category: 'Bug report', subject: 'Player bug', contact: 'me', message: 'Player stops after a few seconds.' });
  assert.match(t.status, /Saved on this device — support inbox coming soon/);
  assert.ok(s.searchSupportGuides('refund').some((g) => g.href === '#/payments'));
  assert.equal(s.searchSupportGuides('').length, s.SUPPORT_GUIDES.length);
  assert.ok(drawerGroups().some((g) => g.href === '#/support'));
  assert.match(readFileSync(new URL('../src/pages/profile.js', import.meta.url), 'utf8'), /href="#\/support" data-profile-support/);
});

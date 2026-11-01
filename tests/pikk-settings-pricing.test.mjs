import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const mem = new Map(); globalThis.localStorage = { getItem: (k) => mem.get(k) ?? null, setItem: (k, v) => mem.set(k, String(v)), removeItem: (k) => mem.delete(k) };
const ss = await import('../src/settings-store.js');
const read = (f) => readFileSync(new URL('../' + f, import.meta.url), 'utf8');
test('#/settings route registered; gear + drawer point at it', () => {
  assert.match(read('src/main.js'), /'\/settings': \{ render: renderSettings, bind: bindSettings \}/);
  assert.match(read('index.html'), /id="settingsBtn" href="#\/settings"/);
  assert.match(read('src/nav-sections.js'), /label: 'Settings', href: '#\/settings'/);
});
test('settings page has all groups and saves locally', () => {
  const p = read('src/pages/settings.js');
  for (const g of ['account', 'notifications', 'privacy', 'appearance', 'sound', 'more', 'about']) assert.match(p, new RegExp(`group\\('${g}'`));
  for (const h of ['#/crew', '#/favorites', '#/payments', '#/support', 'setSignOut', 'splashChime', 'APP_VERSION']) assert.ok(p.includes(h), h);
  mem.clear(); assert.equal(ss.getSettings().splashChime, true);
  ss.setSetting('splashChime', false); assert.equal(JSON.parse(mem.get(ss.SETTINGS_KEY)).splashChime, false);
  assert.equal(ss.getSettings().splashChime, false);
  assert.match(read('src/main.js'), /if \(!getSettings\(\)\.splashChime\) return;/);
});
test('pricing: every tier has Join/Subscribe; Inner Circle stores test-mode status', async () => {
  const { MEMBERSHIPS } = await import('../src/data.js');
  assert.ok(MEMBERSHIPS.find((m) => m.id === 'inner' && m.price === 14.99));
  assert.match(read('src/pages/shells.js'), /data-join="\$\{esc\(m\.id\)\}"/);
  mem.clear(); const m = ss.joinMembership(MEMBERSHIPS.find((x) => x.id === 'inner'));
  assert.equal(JSON.parse(mem.get(ss.MEMBERSHIP_KEY)).id, 'inner');
  assert.equal(ss.membershipStatus(ss.getMembership()), 'Inner Circle (test mode) — billing starts when Stripe is live');
});
test('Crew count copy is singular for one', async () => {
  const { peopleLabel } = await import('../src/circle-store.js');
  assert.equal(peopleLabel(1), '1 person'); assert.equal(peopleLabel(2), '2 people');
});

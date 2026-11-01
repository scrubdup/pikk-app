import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR, DRAWER_GROUPS } from '../src/data.js';
import { drawerGroups, sectionItems } from '../src/nav-sections.js';
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const routes = new Set([...main.slice(main.indexOf('const ROUTES = {')).matchAll(/^\s*'(\/[a-z0-9-]*)':/gm)].map((m) => m[1]));
const pathOf = (h) => '/' + h.replace(/^#\/?/, '').split(/[?#]/)[0];

test('drawer: Home first, then the 7 tab groups in exact tab order, then utilities', () => {
  const g = drawerGroups();
  assert.equal(g[0].label, 'Home'); assert.equal(g[0].href, '#/home');
  assert.deepEqual(g.slice(1, 8).map((x) => x.label), TABBAR.map((t) => t.label));
  assert.equal(g[8].label, 'Promote');
  assert.deepEqual(g.slice(9, 14).map((x) => x.label), ['Explore', 'Profile / Sign in', 'Messages', 'Notifications', 'Settings']);
  assert.ok(!g.some((x) => x.id === 'social'), 'old mixed Social group removed');
});
test('drawer groups share the tab-sheet data source (same items, same order)', () => {
  for (const grp of drawerGroups().slice(1, 8)) assert.deepEqual(grp.links.map((l) => l.label), sectionItems(grp.id).map((i) => i.title), grp.id);
  assert.match(main, /drawerGroups\(\)\.map/);
});
test('every drawer link is a real route; every old drawer destination is still reachable', () => {
  const links = drawerGroups().flatMap((g) => (g.href ? [g.href] : g.links.filter((l) => l.href).map((l) => l.href)));
  for (const h of links) assert.ok(routes.has(pathOf(h)), h);
  const paths = new Set(links.map(pathOf));
  for (const g of DRAWER_GROUPS) for (const h of g.href ? [g.href] : g.links.map((l) => l.href)) assert.ok(paths.has(pathOf(h)), 'lost ' + h);
});

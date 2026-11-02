import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { SECTION_MENU_ITEMS } from '../src/section-menus.js';
import { MUSIC_MENU_ITEMS } from '../src/music-menu.js';
import { CREATE_MENU_GROUPS, CREATE_MENU_ITEMS } from '../src/create-menu.js';

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const routeBlock = main.slice(main.indexOf('const ROUTES = {'));
const routes = new Set([...routeBlock.matchAll(/^\s*'(\/[a-z0-9-]*)':/gm)].map((m) => m[1]));
const pathOf = (href) => '/' + href.replace(/^#\/?/, '').split(/[?#]/)[0];

test('every bottom-tab sheet item links to a real route or is a non-navigating Coming Soon/Planned tile', () => {
  const all = [
    ...CREATE_MENU_ITEMS.map((i) => ['create', i]),
    ...MUSIC_MENU_ITEMS.map((i) => ['music', { title: i.label, ...i }]),
    ...Object.entries(SECTION_MENU_ITEMS).flatMap(([k, items]) => items.map((i) => [k, i])),
  ];
  const bad = [];
  for (const [sheet, item] of all) {
    if (item.href) { if (!routes.has(pathOf(item.href))) bad.push(`${sheet}: ${item.title} → ${item.href}`); }
    else if (!/Coming Soon|Planned|planned/i.test(item.detail || '')) bad.push(`${sheet}: ${item.title} has no route and no Coming Soon/Planned label`);
  }
  assert.deepEqual(bad, []);
  assert.ok(routes.size > 30);
});

test('Create sheet leads with the owner-approved nine actions in order', () => {
  assert.deepEqual(CREATE_MENU_GROUPS[0].items.map((i) => i.title),
    ['Post Photos', 'Story', 'Shorts / Reels', 'Upload Video', 'Create Post', 'Go Live', 'Upload Music', 'Sell Something', 'Paid Content']);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CREATE_MENU_GROUPS, CREATE_MENU_ITEMS } from '../src/create-menu.js';
import { ICONS } from '../src/ui.js';

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

test('Create expands approved original actions into complete grouped menu with outlined icons', () => {
  const titles = CREATE_MENU_ITEMS.map(item => item.title);
  for (const title of [
    'Go Live','Upload Video','Reels','Photo Post','Story','Upload Song',
    'List Product','Create Post','Paid Content','Community Post','Music Video',
    'Upload Album','Upload EP','Artist Protection','AI Support',
  ]) assert.ok(titles.includes(title), title);
  assert.ok(CREATE_MENU_ITEMS.length > 9);
  assert.ok(CREATE_MENU_GROUPS.length >= 4);
  for (const item of CREATE_MENU_ITEMS) assert.ok(ICONS[item.icon], item.title + ' missing SVG icon');
  assert.match(main, /createMenuMarkup\(\)/);
  assert.match(main, /ICONS\[item\.icon\]/);
  assert.match(main, /data-create-close>Cancel/);
  assert.match(css, /\.pikk-create-options\.pikk-create-grid/);
  assert.match(css, /grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
  assert.match(css, /@media\(max-width:390px\)/);
});

test('menu preserves existing routes, user content and honest unavailable states', () => {
  for (const route of [
    '#/live?go=1','#/posts?type=video','#/posts?type=short',
    '#/posts?type=picture','#/posts?type=text','#/pricing',
  ]) assert.ok(CREATE_MENU_ITEMS.some(item => item.href === route), route);
  assert.ok(CREATE_MENU_ITEMS.some(item => !item.href && /Planned/.test(item.detail)));
  assert.match(main, /pikk-create-tile-planned/);
  assert.match(main, /aria-disabled="true"/);
  assert.match(main, /pikkCreateMenu/);
});

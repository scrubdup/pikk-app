import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CREATE_MENU_GROUPS, CREATE_MENU_ITEMS } from '../src/create-menu.js';

const read = path => readFileSync(new URL(path, import.meta.url), 'utf8');
const main = read('../src/main.js');
const styles = read('../src/styles.css');
const names = CREATE_MENU_ITEMS.map(item => item.title);

test('all approved creation types are represented without a nine-tile cap', () => {
  assert.ok(CREATE_MENU_GROUPS.length >= 4);
  assert.ok(CREATE_MENU_ITEMS.length >= 30);
  for (const name of [
    'Create Post', 'Community Post', 'Story', 'Reels', 'Photo Post',
    'Upload Video', 'Music Video', 'Upload Song', 'Upload EP', 'Upload Album',
    'Create Playlist', 'Add to Vault', 'Go Live', 'Live Battle', 'Create Community',
    'Create Chatroom', 'Create Event', 'List Product', 'Seller Store',
    'Paid Content', 'Drafts', 'Artist Protection', 'AI Support',
  ]) assert.ok(names.includes(name), name);
  assert.equal(new Set(names).size, names.length, 'No duplicate actions');
});

test('available links point to defined app routes; planned features are not fake links', () => {
  const defined = [...main.matchAll(/'\/(?:[a-z-]+)':\s*\{/g)].map(match => match[0].split("'")[1]);
  for (const item of CREATE_MENU_ITEMS) {
    assert.ok(item.icon && item.detail, item.title);
    if (item.href) {
      assert.match(item.href, /^#\/[a-z-]+(?:\?.*)?$/);
      const path = item.href.slice(1).split('?')[0];
      assert.ok(defined.includes(path), item.title + ' route ' + path);
    } else {
      assert.match(item.detail, /Planned/);
    }
  }
  assert.match(main, /pikk-create-tile-planned/);
  assert.match(main, /aria-disabled="true"/);
});

test('Create menu uses approved icon system and grouped accessible scrolling dialog', () => {
  assert.match(main, /createMenuMarkup\(\)/);
  assert.match(main, /ICONS\[item\.icon\]/);
  assert.match(main, /aria-label="\$\{esc\(group\.title\)\}"/);
  assert.match(main, /event\.key === 'Escape'|e\.key === 'Escape'/);
  assert.match(main, /hashchange/);
  assert.match(styles, /#pikkCreateMenu \.pikk-create-sheet\{max-height:min\(88dvh,850px\);overflow-y:auto/);
  assert.match(styles, /grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/);
});


test('Artist Protection opens the existing PIKK Shield local-draft route without promising live enforcement', () => {
  const shield = CREATE_MENU_ITEMS.find(item => item.title === 'Artist Protection');
  assert.equal(shield.href, '#/shield');
  assert.match(shield.detail, /local rights drafts/i);
  assert.match(shield.detail, /TEST MODE/);
  assert.match(main, /'\/shield':\s*\{/);
  const support = CREATE_MENU_ITEMS.find(item => item.title === 'AI Support');
  assert.equal(support.href, undefined, 'AI Support remains planned until a real service exists');
});

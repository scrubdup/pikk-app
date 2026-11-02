import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { CREATE_MENU_ITEMS } from '../src/create-menu.js';

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const data = readFileSync(new URL('../src/data.js', import.meta.url), 'utf8');

test('center Create icon is the play button + white cursor cropped from the approved PIKK logo', () => {
  assert.match(main, /t\.href === '#\/create' \? `<img class="pikk-create-logo-icon" src="\$\{asset\('\/brand\/pikk-logo-badge\.png'\)\}"/);
  assert.ok(existsSync(new URL('../public/brand/pikk-logo-badge.png', import.meta.url)));
  assert.ok(existsSync(new URL('../public/brand/pikk-logo-official.png', import.meta.url)), 'source logo unchanged');
});

test('Create remains the primary fourth tab and opens its menu', () => {
  const match = data.match(/export const TABBAR = \[([\s\S]*?)\];/);
  assert.ok(match, 'TABBAR definition must exist');
  const entries = [...match[1].matchAll(/\{ href: '([^']+)', label: '([^']+)'[^}]*\}/g)];
  assert.equal(entries.length, 7);
  assert.equal(entries[3][1], '#/create');
  assert.equal(entries[3][2], 'Create');
  assert.match(entries[3][0], /primary: true/);
  assert.match(main, /ensureCreateMenu\(\)/);
  assert.match(main, /aria-controls="pikkCreateMenu"/);
  assert.ok(CREATE_MENU_ITEMS.some(item => item.href === '#/live?go=1'));
});

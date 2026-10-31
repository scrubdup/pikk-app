import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CREATE_MENU_ITEMS } from '../src/create-menu.js';

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const data = readFileSync(new URL('../src/data.js', import.meta.url), 'utf8');

test('center Create button uses owner-approved plus icon (mockup 1, 2026-10-31)', () => {
  assert.match(main, /t\.href === '#\/create' \? '<svg/);
  assert.match(main, /<path d="M16 7v18M7 16h18"/);
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

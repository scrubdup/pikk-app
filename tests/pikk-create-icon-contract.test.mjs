import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CREATE_MENU_ITEMS } from '../src/create-menu.js';

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const data = readFileSync(new URL('../src/data.js', import.meta.url), 'utf8');

test('center Create button keeps approved play triangle plus arrow icon (owner master requirements)', () => {
  assert.match(main, /t\.href === '#\/create' \? '<svg/);
  assert.match(main, /<path d="M9 5 L25 16 L9 27 Z" fill="currentColor"\/>/);
  // Owner 2026-10-31: silver mouse-cursor (not a down arrow) over the red play triangle.
  assert.match(main, /class="pikk-create-cursor" d="M15 12 L15 27/);
  assert.doesNotMatch(main, /M24 5v11m0 0-4-4m4 4 4-4/);
  assert.doesNotMatch(main, /M16 7v18M7 16h18/);
});

test('Create remains the primary fourth tab and opens its menu', () => {
  const match = data.match(/export const TABBAR = \[([\s\S]*?)\];/);
  assert.ok(match, 'TABBAR definition must exist');
  const entries = [...match[1].matchAll(/\{ href: '([^']+)', label: '([^']+)'[^}]*\}/g)];
  assert.equal(entries.length, 7);
  assert.equal(entries[2][1], '#/create');
  assert.equal(entries[2][2], 'Create');
  assert.match(entries[2][0], /primary: true/);
  assert.match(main, /ensureCreateMenu\(\)/);
  assert.match(main, /aria-controls="pikkCreateMenu"/);
  assert.ok(CREATE_MENU_ITEMS.some(item => item.href === '#/live?go=1'));
});

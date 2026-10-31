import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR } from '../src/data.js';

const shells = readFileSync(new URL('../src/pages/shells.js', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const signup = shells.slice(shells.indexOf('export function renderSignup()'), shells.indexOf('export function renderMessages()'));

test('signup calls platform PIKK, not the artist name, while preserving truthful demo status', () => {
  assert.match(signup, /Everyone creates a PIKK account to participate/);
  assert.doesNotMatch(signup, /Everyone creates a DatBoiSkeet account/);
  assert.match(signup, /TEST MODE/);
  assert.match(signup, /no real email\/auth yet/);
  assert.match(signup, /href="#\/profile"/);
  assert.match(signup, /href="#\/guidelines"/);
});

test('signup route preserves the approved navigation, artist player and logo', () => {
  assert.match(main, /'\/signup': \{ render: renderSignup \}/);
  assert.deepEqual(TABBAR.map(tab => tab.label), ['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
  assert.match(html, /dbs-sticky-player/);
  assert.match(html, /pikk-official-approved\.jpg/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR } from '../src/data.js';

const shells = readFileSync(new URL('../src/pages/shells.js', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const signup = shells.slice(shells.indexOf('export function renderSignup()'), shells.indexOf('export function renderMessages()'));

test('signup calls platform PIKK and truthfully gates backend role management', () => {
  assert.match(signup, /Everyone uses one PIKK account/);
  assert.doesNotMatch(signup, /DatBoiSkeet account/);
  assert.match(signup, /Backend account roles are connected/);
  assert.match(signup, /Account role service is not connected in this build/);
  assert.match(signup, /It does not grant admin privileges, payout eligibility, verification, or monetization approval/);
  assert.match(signup, /href="#\/profile"/);
  assert.match(signup, /href="#\/guidelines"/);
});

test('signup route preserves the approved navigation, artist player and logo', () => {
  assert.match(main, /'\/signup': \{ render: renderSignup, bind: bindSignup \}/);
  assert.deepEqual(TABBAR.map(tab => tab.label), ['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
  assert.match(html, /dbs-sticky-player/);
  assert.match(html, /pikk-logo-official\.png/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR } from '../src/data.js';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');

test('approved seven bottom tabs appear in exact order with centered Create', () => {
  assert.deepEqual(TABBAR.map(({ label }) => label), ['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
  assert.deepEqual(TABBAR.map(({ href }) => href), ['#/music', '#/videos', '#/connect', '#/create', '#/dating', '#/games', '#/shop']);
  assert.equal(TABBAR.length, 7);
  assert.equal(TABBAR[3].primary, true);
  assert.equal(TABBAR.filter(({ primary }) => primary).length, 1);
  assert.ok(TABBAR.every(({ href }) => main.includes(`'${href.slice(1)}':`) || href === '#/create'));
});

test('header keeps canonical PIKK logo as Home link and top music player', () => {
  assert.match(html, /href="#\/home" class="logo" aria-label="PIKK Home"/);
  assert.match(html, /class="logo-img" src="%BASE_URL%brand\/pikk-official-approved\.jpg"/);
  assert.match(html, /id="dbs-sticky-player"/);
  assert.match(html, /id="spPlay"/);
  assert.match(html, /id="spQueueBtn"/);
});

test('top red TEST MODE ribbon removed, while demo disclosure remains visible', () => {
  assert.doesNotMatch(html, /id="testRibbon"/);
  assert.match(html, /TEST MODE: no cards charged/);
});

test('Create action still opens its existing dialog', () => {
  assert.ok(main.includes('aria-controls="pikkCreateMenu"'));
  assert.match(main, /function ensureCreateMenu\(\)/);
  assert.match(main, /href="#\/create"/);
});

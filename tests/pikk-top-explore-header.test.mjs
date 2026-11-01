import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { DRAWER_GROUPS, TABBAR } from '../src/data.js';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

test('Explore lives outside Social as a standalone pinned discovery entry', () => {
  const social = DRAWER_GROUPS.find(g => g.id === 'social');
  assert.ok(social);
  assert.ok(!social.links.some(link => link.href === '#/explore'));
  assert.ok(DRAWER_GROUPS.some(g => g.id === 'explore' && g.href === '#/explore'));
  assert.match(html, /class="pikk-explore-rail"/);
  assert.match(html, /href="#\/explore">⌕ Explore/);
  for (const route of ['#/posts', '#/videos', '#/live', '#/community']) assert.ok(html.includes('href="' + route + '"'));
});

test('official PIKK logo and compact header precede and preserve sticky music player', () => {
  const header = html.indexOf('<header class="top" id="topBar">');
  const player = html.indexOf('id="dbs-sticky-player"');
  const rail = html.indexOf('class="pikk-explore-rail"');
  assert.ok(header > 0 && header < player && player < rail);
  assert.match(html, /src="%BASE_URL%brand\/pikk-official-approved\.jpg" alt="PIKK"/);
  assert.match(html, /href="#\/home" class="logo" aria-label="PIKK Home"/);
  const actions = ['id="headerProfile"', 'id="headerMsg"', 'id="notifBtn"', 'id="menuBtn"'];
  let last = header;
  for (const action of actions) { const next = html.indexOf(action, last); assert.ok(next > last, action); last = next; }
  assert.match(css, /\.top#topBar \{ position: sticky/);
  assert.match(css, /\.sticky-player#dbs-sticky-player \{ top: var\(--top-h\)/);
  assert.match(css, /\.pikk-explore-rail \{/);
  assert.match(html, /id="spPlay"/);
  assert.match(html, /id="spQueueBtn"/);
});

test('approved seven bottom tabs remain unchanged', () => {
  assert.deepEqual(TABBAR.map(t => t.label), ['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
  assert.equal(TABBAR[3].primary, true);
});

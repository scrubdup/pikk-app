import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

test('Explore search magnifying glass appears between notifications and menu', () => {
  const header = html.split('<header class="top" id="topBar">')[1].split('</header>')[0];
  const bell = header.indexOf('id="notifBtn"');
  const search = header.indexOf('id="exploreSearchBtn"');
  const menu = header.indexOf('id="menuBtn"');
  assert.ok(bell > 0 && search > bell && menu > search);
  assert.match(header, /id="exploreSearchBtn" href="#\/explore" aria-label="Explore and search PIKK"/);
  assert.match(header, /<circle cx="10\.8" cy="10\.8" r="6\.5"/);
  assert.match(css, /\.top#topBar \.header-explore-search/);
});

test('PIKK branding, music player, existing header actions and Explore rail remain', () => {
  assert.match(html, /src="%BASE_URL%brand\/pikk-official-approved\.jpg" alt="PIKK"/);
  assert.match(html, /id="dbs-sticky-player"/);
  assert.match(html, /id="spPlay"/);
  for (const id of ['headerProfile', 'headerMsg', 'notifBtn', 'menuBtn']) assert.ok(html.includes('id="'+id+'"'));
  assert.match(html, /class="pikk-explore-rail"/);
});

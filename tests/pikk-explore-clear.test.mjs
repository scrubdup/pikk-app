import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { TABBAR } from '../src/data.js';

const explore = readFileSync(new URL('../src/pages/explore.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('Explore search preserves a stable result container on Discover and Following', () => {
  assert.match(explore, /panel\.querySelector\('#exploreLiveInsert'\)/);
  assert.match(explore, /insert\.innerHTML = renderResults\(res\)/);
  assert.doesNotMatch(explore, /box\.outerHTML = renderResults\(res\)/);
  assert.match(explore, /root\.querySelector\('#exploreLiveInsert'\)\?\.remove\(\)/);
});

test('Clear cancels pending debounced search and resets the input', () => {
  const clearHandler = explore.split('function clearSearch() {')[1]?.split("toast('Cleared')")[0];
  assert.ok(clearHandler, 'Explore clear handler exists');
  assert.match(clearHandler, /clearTimeout\(debounce\)/);
  assert.match(clearHandler, /input\.value = ''/);
  assert.match(explore, /e\.key === 'Enter'/);
  assert.match(explore, /clear\?\.addEventListener\('click', clearSearch\)/);
});

test('Escape clears stale search results, cancels debounce and retains keyboard focus', () => {
  const keyHandler = explore.split("input?.addEventListener('keydown', (e) => {")[1]?.split("\n  });")[0];
  assert.ok(keyHandler, 'Explore search keyboard handler exists');
  assert.match(keyHandler, /e\.key === 'Escape' && input\.value/);
  assert.match(keyHandler, /e\.preventDefault\(\)/);
  assert.match(keyHandler, /clearSearch\(\)/);
  assert.match(keyHandler, /input\.focus\(\)/);
  assert.match(explore, /clearTimeout\(debounce\)/);
});

test('Explore retains original PIKK navigation, logo, and player', () => {
  assert.deepEqual(TABBAR.map(t => t.label), ['Music', 'Videos', 'Connect', 'Create', 'Dating', 'Games', 'Shop']);
  assert.match(html, /pikk-official-approved\.jpg/);
  assert.match(html, /id="dbs-sticky-player"/);
  assert.match(explore, /export function renderExplore\(\)/);
  assert.match(explore, /export function bindExplore\(root\)/);
});


test('Explore people results link to the matched public profile, not the signed-in profile', () => {
  assert.match(explore, /href: `#\/profile\/\$\{p\.id\}`/);
  assert.match(explore, /title: `@\$\{p\.username \|\| p\.id\}`/);
});

test('Explore uses PIKK platform branding without miscrediting untagged creator content', () => {
  assert.match(explore, /Trending Across PIKK/);
  assert.match(explore, /Search PIKK/);
  assert.match(explore, /Universal search & discovery across PIKK/);
  assert.doesNotMatch(explore, /(?:Trending Across|Search|across) DBS/);
  assert.ok(explore.includes("meta: `${c.artist || 'Artist not credited'} · ${c.type}`"));
  assert.ok(explore.includes("meta: `${c.artist || 'Artist not credited'} · Video catalog`"));
  assert.ok(explore.includes("meta: `${v.artist || 'Artist not credited'} · Official MV`"));
  assert.doesNotMatch(explore, /From Admin|v\.artist \|\| 'DatBoiSkeet'/);
  assert.ok(explore.includes("meta: `${c.artist || 'Creator not credited'} · picture`"));
  assert.doesNotMatch(explore, /c\.artist \|\| 'DatBoiSkeet'/);
});

test('Explore Following and Discover account cards link to the selected profile', () => {
  const following = explore.split('function followingPanel() {')[1]?.split('function discoverPanel() {')[0];
  const discover = explore.split('function discoverPanel() {')[1]?.split('export function renderExplore()')[0];
  assert.ok(following && discover, 'both account panels exist');
  for (const [name, panel] of [['Following', following], ['Discover', discover]]) {
    assert.ok(panel.includes('href: `#/profile/${encodeURIComponent(p.id)}`'), name + ' must deep-link to the matched profile');
    assert.ok(!panel.includes("href: '#/profile'"), name + ' must not send visitors to their own profile');
  }
});

test('Explore sections are a keyboard-accessible tablist with focus restored after route refresh', () => {
  assert.match(explore, /role="tablist" aria-label="Explore sections"/);
  assert.match(explore, /role="tab" id="explore-tab-\$\{t\.id\}"/);
  assert.match(explore, /aria-selected="\$\{t\.id === tab\}"/);
  assert.match(explore, /tabindex="\$\{t\.id === tab \? 0 : -1\}"/);
  assert.match(explore, /role="tabpanel" aria-labelledby="explore-tab-\$\{tab\}"/);
  for (const key of ['ArrowLeft', 'ArrowRight', 'Home', 'End']) {
    assert.ok(explore.includes("'" + key + "'"), key + ' keyboard action is supported');
  }
  assert.match(explore, /event\.preventDefault\(\)/);
  assert.match(explore, /activateTab\(tabs\[next\]\.dataset\.exploreTab, true\)/);
  assert.match(explore, /document\.getElementById\('explore-tab-' \+ id\)\?\.focus\(\)/);
});

test('Explore retains the current search across section changes without saving it to account state', () => {
  const activate = explore.split('function activateTab(id, restoreFocus = false) {')[1]?.split('\n  tabs.forEach')[0];
  assert.ok(activate, 'tab activation handler exists');
  assert.match(activate, /const query = input\?\.value \|\| ''/);
  assert.match(activate, /clearTimeout\(debounce\)/);
  assert.match(activate, /nextInput\.value = query/);
  assert.match(activate, /runSearch\(nextRoot, query\)/);
  assert.doesNotMatch(activate, /setState\(\{[^}]*query/);
});

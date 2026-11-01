import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LIVE_DISCOVERY_GROUPS, renderLiveDiscoveryDirectory, matchesLiveRoomSearch, mountLiveDirectorySearch } from '../src/live-discovery.js';

const live = readFileSync(new URL('../src/pages/live.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');
const block = live.slice(
  live.indexOf('const LIVE_DISCOVERY_CATEGORIES = ['),
  live.indexOf('\n];', live.indexOf('const LIVE_DISCOVERY_CATEGORIES = [')),
);
const names = [...block.matchAll(/^\s*\[\s*(?:'((?:\\'|[^'])*)'|"((?:\\"|[^"])*)")\s*,/gm)]
  .map(match => (match[1] ?? match[2]).replace(/\\'/g, "'"));
const escapeHtml = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');

test('Live room discovery keeps all 78 approved categories in exactly one folder', () => {
  assert.equal(names.length, 78, 'all categories retained');
  assert.equal(new Set(names).size, 78, 'category names are unique');
  const grouped = LIVE_DISCOVERY_GROUPS.flatMap(group => group.names);
  assert.equal(grouped.length, 78, 'every category assigned');
  assert.equal(new Set(grouped).size, 78, 'no duplicated category cards');
  assert.deepEqual([...grouped].sort(), [...names].sort(), 'group map matches exact discovery categories');
  assert.equal(LIVE_DISCOVERY_GROUPS.find(g => g.id === 'women').names.length, 15);
  assert.equal(LIVE_DISCOVERY_GROUPS.find(g => g.id === 'men').names.length, 15);
  assert.equal(LIVE_DISCOVERY_GROUPS.find(g => g.id === 'men').icon, '🫱🏻‍🫲🏿', 'light and dark skin tone emoji handshake');
  assert.equal(LIVE_DISCOVERY_GROUPS.find(g => g.id === 'coed').names.length, 10);
  assert.deepEqual(LIVE_DISCOVERY_GROUPS.find(g => g.id === 'coed').names, [
    "Let's Talk", 'The Hangout', 'Business Connect & Wealth Academy',
    'Couples Corner', 'Conspiracy Room', 'Game Room', 'Why Are You Single?',
    'What Are You Looking For?', 'Single & Ready to Mingle', 'City Connect',
  ]);
  for (const removed of ['The Garage', 'The Grill']) assert.ok(!names.includes(removed), removed + ' removed');
  for (const retained of ['Girl Talk', 'Tea Time', "What's the Word?", 'Who Did What?', 'IRL', 'Gaming', "Let's Talk",
    'Business Connect & Wealth Academy', 'City Connect', 'Basketball', 'Football', 'Soccer', 'Baseball', 'Hockey',
    'Why Are You Single?', 'What Are You Looking For?', 'Single & Ready to Mingle'])
    assert.ok(names.includes(retained), retained + ' preserved');
});

test('directory renders accessible collapsible groups with real channel filters', () => {
  const html = renderLiveDiscoveryDirectory(names.map(name => [name, 'Example description', '💬']), escapeHtml);
  assert.equal((html.match(/class="pikk-live-directory-group"/g) || []).length, 8);
  assert.match(html, /class="pikk-live-directory" role="region" aria-label="Live category groups"/, 'directory landmark has an accessible name');
  assert.equal((html.match(/class="live-cat-card pikk-live-room-card"/g) || []).length, 78);
  assert.equal((html.match(/class="pikk-live-directory-summary"/g) || []).length, 8);
  assert.match(html, /id="pikk-live-group-coed" open/);
  assert.match(html, /id="pikk-live-group-general" open/, 'IRL and Gaming section starts expanded');
  assert.ok(html.indexOf('id="pikk-live-group-general"') < html.indexOf('id="pikk-live-group-women"'), 'General Live is the first folder');
  assert.match(html, /17 topics/, 'all 17 General Live topics retained');
  assert.doesNotMatch(html, /class="pikk-live-directory-count">\d+ rooms/, 'discovery must not imply hosted rooms');
  assert.match(html, /15 topics/);
  assert.ok(html.includes('<span class="pikk-live-directory-icon" aria-hidden="true">🫱🏻‍🫲🏿</span>'), 'Men\'s Rooms shows mixed-tone handshake in rendered directory');
  assert.match(html, /10 topics/);
  assert.match(html, /category=Why%20Are%20You%20Single%3F/);
  assert.match(html, /category=Single%20%26%20Ready%20to%20Mingle/);
  assert.match(html, /href="#\/roast-arena"/);
  assert.doesNotMatch(html, /data-fake-viewers|1000 watching/);
});

test('Live still preserves original stages and route-based discovery tabs', () => {
  assert.match(live, /renderLiveDiscoveryDirectory\(LIVE_DISCOVERY_CATEGORIES, esc\)/);
  assert.match(live, /href="#\/openmic"/);
  assert.match(live, /href="#\/spotlight"/);
  assert.match(live, /href="#\/shorts"/);
  assert.match(live, /id: 'categories', href: '#\/live\?tab=categories'/);
  assert.match(live, /Discovery categories filter channels/);
  assert.match(css, /pikk-live-directory-cards/);
  assert.match(css, /@media \(max-width: 720px\)/);
  assert.match(css, /pikk-live-directory-summary:focus-visible/);
});


test('Live room search is accessible, matches topic text and preserves all original links', () => {
  const html = renderLiveDiscoveryDirectory(names.map(name => [name, 'Browse topic', '💬']), escapeHtml);
  assert.match(html, /<label for="liveRoomSearch">/);
  assert.match(html, /id="liveRoomSearch" type="search"/);
  assert.match(html, /id="liveRoomSearchStatus" role="status" aria-live="polite"/);
  assert.match(html, /id="liveRoomSearchClear"/);
  assert.match(live, /mountLiveDirectorySearch\(root\)/);
  assert.equal((html.match(/class="live-cat-card pikk-live-room-card"/g) || []).length, 78);
  assert.equal(matchesLiveRoomSearch('Couples Corner · Browse channels', '  COUPLES  '), true);
  assert.equal(matchesLiveRoomSearch('Business Connect & Wealth Academy', 'wealth'), true);
  assert.equal(matchesLiveRoomSearch('City Connect', 'couples'), false);
  assert.equal(matchesLiveRoomSearch('City Connect', ''), true);
});

test('Escape clears a filtered Live room search and restores the previous folder state', () => {
  const listeners = {};
  let focused = false;
  const input = {
    value: '',
    addEventListener(type, callback) { listeners['input:' + type] = callback; },
    focus() { focused = true; },
  };
  const clear = {
    hidden: true, style: {},
    addEventListener(type, callback) { listeners['clear:' + type] = callback; },
  };
  const status = { textContent: '' };
  const makeGroup = (topics, open) => {
    const cards = topics.map(textContent => ({
      textContent: textContent + ' Browse channels', style: { display: '' },
      querySelector(selector) {
        if (selector === 'strong') return { textContent };
        if (selector === 'p') return { textContent: 'Example description' };
        return null;
      },
    }));
    const count = { textContent: '' };
    return {
      open, style: {},
      cards, count,
      querySelectorAll(selector) { return selector === '.pikk-live-room-card' ? cards : []; },
      querySelector(selector) { return selector === '.pikk-live-directory-count' ? count : null; },
    };
  };
  const coed = makeGroup(['Couples Corner', 'City Connect'], true);
  const women = makeGroup(['Girl Talk'], false);
  const groups = [coed, women];
  const elements = {
    '#liveRoomSearch': input,
    '#liveRoomSearchClear': clear,
    '#liveRoomSearchStatus': status,
  };
  const root = {
    querySelector(selector) { return elements[selector] ?? null; },
    querySelectorAll(selector) { return selector === '.pikk-live-directory-group' ? groups : []; },
  };
  mountLiveDirectorySearch(root);
  assert.equal(status.textContent, 'Browse 3 topics · these filter channels, not hosted rooms.');

  input.value = 'couples';
  listeners['input:input']();
  assert.equal(coed.count.textContent, '1 of 2 topics');
  assert.equal(coed.cards[1].style.display, 'none');
  assert.equal(women.style.display, 'none');
  assert.equal(clear.hidden, false);

  input.value = 'Browse channels';
  listeners['input:input']();
  assert.equal(status.textContent, '0 matching topics · channel discovery only.',
    'shared action label must not make unrelated topics match');
  assert.equal(coed.style.display, 'none');
  assert.equal(women.style.display, 'none');

  let prevented = false;
  listeners['input:keydown']({
    key: 'Escape',
    preventDefault() { prevented = true; },
  });
  assert.equal(prevented, true, 'Escape prevents the browser from swallowing the clear');
  assert.equal(input.value, '');
  assert.equal(focused, true, 'keyboard focus stays in search');
  assert.equal(coed.open, true, 'original open folder restored');
  assert.equal(women.open, false, 'original closed folder restored');
  assert.equal(women.style.display, '');
  assert.equal(coed.cards[1].style.display, '');
  assert.equal(clear.hidden, true);
  assert.equal(status.textContent, 'Browse 3 topics · these filter channels, not hosted rooms.');

  prevented = false;
  listeners['input:keydown']({
    key: 'Escape',
    preventDefault() { prevented = true; },
  });
  assert.equal(prevented, false, 'empty search does not hijack Escape');
});

test('Following creator chips navigate to public profiles instead of the viewer profile', () => {
  assert.match(live, /href="#\\/profile\\/\\$\\{encodeURIComponent\\(f\\.id\\)\\}"/,
    'each followed creator links to their own public profile route');
  assert.doesNotMatch(live, /<a class="chip" href="#\\/profile">\\$\\{esc\\('\\@'/,
    'following chips must not silently redirect to the viewer profile');
});

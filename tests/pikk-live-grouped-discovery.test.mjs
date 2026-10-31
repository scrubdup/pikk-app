import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LIVE_DISCOVERY_GROUPS, renderLiveDiscoveryDirectory } from '../src/live-discovery.js';

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
  assert.equal((html.match(/class="live-cat-card pikk-live-room-card"/g) || []).length, 78);
  assert.equal((html.match(/class="pikk-live-directory-summary"/g) || []).length, 8);
  assert.match(html, /id="pikk-live-group-coed" open/);
  assert.match(html, /15 rooms/);
  assert.ok(html.includes('<span class="pikk-live-directory-icon" aria-hidden="true">🫱🏻‍🫲🏿</span>'), 'Men\'s Rooms shows mixed-tone handshake in rendered directory');
  assert.match(html, /10 rooms/);
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

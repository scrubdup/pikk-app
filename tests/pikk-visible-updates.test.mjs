import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const updates = readFileSync(new URL('../src/pages/updates.js', import.meta.url), 'utf8');

const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const workflow = readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');

test('update center is a real route and accessible from menu and footer', () => {
  assert.match(main, /'\/updates': \{ render: renderUpdates, bind: bindUpdates \}/);
  assert.match(readFileSync(new URL('../src/nav-sections.js', import.meta.url), 'utf8'), /href: '#\/updates'/);
  assert.match(html, /href="#\/updates"/);
});
test('update center lists five verified recent merged UI releases in newest-first order', () => {
  assert.match(updates, /pr: 197[\s\S]*pr: 196[\s\S]*pr: 195[\s\S]*pr: 194[\s\S]*pr: 193/);
  assert.equal((updates.match(/pr: \d+, kind:/g) || []).length, 5);
  for (const route of ['#/support', '#/communities', '#/profile']) {
    assert.ok(updates.includes("route: '" + route + "'"), 'Missing published section: ' + route);
    assert.ok(main.includes("'" + route.slice(1) + "': { render:"), 'Missing real app route: ' + route);
  }
  for (const detail of [
    'Search help guides with live match counts',
    'Saving an identical local ticket draft',
    'Repeated saves of the same support issue',
    'After posting a local reply',
    'Follower, following and public-profile links',
  ]) {
    assert.ok(updates.includes(detail), 'Missing verified release detail: ' + detail);
  }
  assert.match(updates, /AI agents are not connected/);
  assert.match(updates, /No ticket is sent to staff/);
  assert.match(updates, /Public community hosting is not connected/);
  assert.match(updates, /pikk-update-latest/);
  assert.doesNotMatch(updates, /Premium Wallet & Payouts|real-time viewer counts are live/);
  assert.ok(updates.includes('href="${esc(release.route)}"'));
  assert.ok(updates.includes('aria-label="${esc(`See ${release.title} in PIKK`)}"'), 'Each release link has a descriptive screen-reader name');
  assert.match(updates, /pikkUpdatesRefresh/);
  assert.match(updates, /pikk-logo-official\.png/);
  assert.match(updates, /SUPPORT · HELP CENTER/);
  assert.match(updates, /COMMUNITIES · ACCESSIBILITY/);
});

test('production version is the source commit of the deployed build', () => {
  assert.match(workflow, /VITE_BUILD_SHA: \$\{\{ github\.sha \}\}/);
  assert.match(html, /id="pikk-refresh-link"/);
  assert.doesNotMatch(html, /localStorage\.clear/);
});

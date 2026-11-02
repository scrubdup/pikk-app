import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const live = readFileSync(new URL('../src/pages/live.js', import.meta.url), 'utf8');
const directory = readFileSync(new URL('../src/live-discovery.js', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const arena = readFileSync(new URL('../src/pages/roast-arena.js', import.meta.url), 'utf8');
test('Roast Arena is discoverable from Live and registered in routing', () => {
  assert.match(live, /Comedy & Roast Battles/);
  assert.match(directory, /#\/roast-arena/);
  assert.match(live, /renderLiveDiscoveryDirectory/);
  assert.ok(main.includes("'/roast-arena': { render: renderRoastArena, bind: bindRoastArena }"));
});
test('Roast Arena separates vote and gift winners and discloses prelaunch status', () => {
  assert.match(arena, /separate results/);
  assert.match(arena, /Gifts cannot change the audience vote winner/);
  assert.match(arena, /Coming Soon/);
  assert.match(arena, /explicitly opt in/);
  assert.match(arena, /mute and removal actions/);
});

test('Roast rounds are automated with timed audience voting and no host', () => {
  assert.match(arena, /No host is required/);
  assert.match(arena, /visible countdown/);
  assert.match(arena, /Vote: Contestant A/);
  assert.match(arena, /Vote: Contestant B/);
  assert.match(arena, /one vote per round/);
  assert.match(arena, /locks voting when time expires/);
  assert.doesNotMatch(arena, /host and moderator/);
});

test('Roast Arena documents breaks, tie resolution and rematch voting', () => {
  assert.match(arena, /10-second audience voting window is the only break/);
  assert.match(arena, /tiebreaker final round/);
  assert.match(arena, /Rematch: Yes/);
  assert.match(arena, /Rematch: No/);
  assert.match(arena, /both contestants agree/);
});

test('Roast Arena 1v1 preview is labeled TEST MODE with placeholder tiles and test values', () => {
  assert.match(arena, /id="roast-1v1"/);
  assert.match(arena, /TEST MODE/);
  assert.match(arena, /no camera connected/);
  assert.match(arena, /test values · owner verification needed/);
  assert.match(arena, /Report \(stub\)/);
  assert.match(arena, /recorded locally only/);
  assert.doesNotMatch(arena, /giftbattle|live-gift-battle/i);
});

test('Roast Arena Tag-Team preview is TEST MODE with test-value format', () => {
  assert.match(arena, /id="roast-tagteam"/);
  assert.match(arena, /Tag Team · TEST MODE preview/);
  assert.match(arena, /every member must consent/i);
  assert.match(arena, /ROAST_TAG_TEAM_TEST_FORMAT_OWNER_VERIFICATION_NEEDED/);
});

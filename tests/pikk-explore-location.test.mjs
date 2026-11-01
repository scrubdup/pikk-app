import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { matchesOptInLocation, searchOptInLocations, exploreResultContext } from '../src/explore-location.js';

test('Explore result labels distinguish location-only searches from keyword searches', () => {
  assert.equal(exploreResultContext({ query: 'City & State', keywordQuery: '', locationLabel: 'Houston, TX' }), 'in Houston, TX');
  assert.equal(exploreResultContext({ query: 'music', keywordQuery: 'music', locationLabel: 'Houston, TX' }), 'for “music” in Houston, TX');
  assert.equal(exploreResultContext({ query: 'music' }), 'for “music”');
  assert.equal(exploreResultContext({ query: 'City & State', keywordQuery: 'City & State', locationLabel: 'TX' }), 'for “City & State” in TX');
});

test('City/state matches explicit opt-in only and normalizes US state abbreviations', () => {
  const good = { city: 'Houston', state: 'Texas', locationDiscoverable: true };
  assert.equal(matchesOptInLocation(good, { city: ' houston ', state: 'TX' }), true);
  assert.equal(matchesOptInLocation(good, { state: 'tx' }), true);
  assert.equal(matchesOptInLocation(good, { city: 'Austin' }), false);
  assert.equal(matchesOptInLocation({ ...good, locationDiscoverable: false }, { state: 'TX' }), false);
  assert.equal(matchesOptInLocation({ ...good, private: true }, { state: 'TX' }), false);
  assert.equal(matchesOptInLocation({ ...good, city: '' }, { state: 'TX' }), false);
  assert.equal(matchesOptInLocation({ ...good, state: '' }, { city: 'Houston' }), false);
});

test('Location-only search returns only explicitly opted-in content, never unrelated catalog', () => {
  const opt = { city: 'Houston', state: 'TX', locationDiscoverable: true };
  const data = {
    profiles: { a: { id: 'a', username: 'Maya', ...opt }, b: { id: 'b', username: 'Hidden', city: 'Houston', state: 'TX' } },
    posts: [{ id: 'p1', text: 'Food downtown', ...opt }, { id: 'p2', text: 'Private post', ...opt, isPrivate: true }],
    catalog: [{ id: 'v1', type: 'video', title: 'City clip', published: true, ...opt }, { id: 'v2', type: 'video', title: 'No consent', published: true, city: 'Houston', state: 'TX' }],
    live: { id: 'l1', title: 'Live Houston', ...opt },
    liveHistory: [{ id: 'l2', title: 'Past stream', ...opt }],
    listings: [{ id: 'm1', title: 'Shop', active: true, ...opt }],
  };
  const result = searchOptInLocations(data, { city: 'Houston', state: 'Texas' });
  assert.equal(result.profiles.length, 1);
  assert.equal(result.posts.length, 1);
  assert.equal(result.videos.length, 1);
  assert.equal(result.lives.length, 2);
  assert.equal(result.products.length, 1);
  assert.equal(result.music.length, 0);
  assert.equal(result.locationLabel, 'Houston, Texas');
  assert.equal(result.keywordQuery, '', 'location-only searches must not fabricate a keyword');
  assert.equal(searchOptInLocations(data, { city: 'Dallas', state: 'TX' }).profiles.length, 0);
});

test('Keyword and location filters both apply; signed-in user needs double consent', () => {
  const user = { id: 'me', username: 'Creator', city: 'Dallas', state: 'TX', locationDiscoverable: true };
  const data = { user, profiles: {}, exploreDiscoverable: false };
  assert.equal(searchOptInLocations(data, { state: 'Texas' }).profiles.length, 0);
  data.exploreDiscoverable = true;
  assert.equal(searchOptInLocations(data, { state: 'Texas', query: 'creator' }).profiles.length, 1);
  assert.equal(searchOptInLocations(data, { state: 'Texas', query: 'other' }).profiles.length, 0);
});

test('Explore exposes city/state inputs, clears them, and preserves them across tabs', () => {
  const source = readFileSync(new URL('../src/pages/explore.js', import.meta.url), 'utf8');
  assert.match(source, /id="exploreCity"/);
  assert.match(source, /id="exploreState"/);
  assert.match(source, /searchOptInLocations\(getState\(\)/);
  assert.match(source, /if \(cityInput\) cityInput.value = ''/);
  assert.match(source, /if \(stateInput\) stateInput.value = ''/);
  assert.match(source, /nextCity.value = city/);
  assert.match(source, /nextState.value = region/);
  assert.match(source, /No GPS, precise addresses, real-time presence or backend/);
});

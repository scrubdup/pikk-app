import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const connect = readFileSync(new URL('../src/pages/connect.js', import.meta.url), 'utf8');
const routes = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('Connect Communities card, hero and menu open the topic directory, not the Lounge', () => {
  assert.match(connect, /class="pikk-connect-feature pikk-connect-feature-community" href="#\/communities"/);
  assert.match(connect, /href="#\/communities">Explore communities<\/a>/);
  assert.match(connect, /href="#\/communities"><span aria-hidden="true">♧<\/span> Communities<\/a>/);
  assert.match(routes, /'\/communities': \{ render: renderCommunities, bind: bindCommunities \}/);
});

test('PIKK Lounge remains separately accessible without changing approved navigation/player', () => {
  assert.match(connect, /href="#\/community">PIKK Lounge<\/a>/);
  assert.match(routes, /'\/community': \{ render: renderCommunity, bind: bindCommunity \}/);
  assert.match(html, /pikk-logo-official\.png/);
  assert.match(html, /dbs-sticky-player/);
});

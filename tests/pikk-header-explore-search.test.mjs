import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8');

test('Explore search magnifying glass is third after Profile and Payments', () => {
  const header = html.split('<header class="top" id="topBar">')[1].split('</header>')[0];
  const profile = header.indexOf('id="headerProfile"');
  const pay = header.indexOf('id="paymentsBtn"');
  const search = header.indexOf('id="exploreSearchBtn"');
  const menu = header.indexOf('id="menuBtn"');
  assert.ok(profile > 0 && pay > profile && search > pay && menu > search);
  assert.match(header, /id="exploreSearchBtn" href="#\/explore" aria-label="Explore and search PIKK"/);
  assert.match(header, /<circle cx="10\.8" cy="10\.8" r="6\.5"/);
  assert.match(css, /\.top#topBar \.header-explore-search/);
});

test('PIKK branding, music player, existing header actions and Explore rail remain', () => {
  assert.match(html, /src="%BASE_URL%brand\/pikk-logo-official\.png" alt="PIKK"/);
  assert.match(html, /id="dbs-sticky-player"/);
  assert.match(html, /id="spPlay"/);
  for (const id of ['headerProfile', 'headerMsg', 'notifBtn', 'menuBtn']) assert.ok(html.includes('id="'+id+'"'));
  assert.match(html, /class="pikk-explore-rail"/);
});


test('header begins Profile then Payments then Settings gear then Search',()=>{
  const html=readFileSync(new URL('../index.html', import.meta.url),'utf8');
  const p=html.indexOf('id="headerProfile"');
  const pay=html.indexOf('id="paymentsBtn"');
  const search=html.indexOf('id="exploreSearchBtn"');
  assert.ok(p>=0 && pay>p && search>pay, 'expected Profile → Payments → Search order');
  const gear=html.indexOf('id="settingsBtn" href="#/settings"');
  assert.ok(gear>pay && search>gear, 'expected Settings gear right after $ and before Search');
});

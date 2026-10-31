import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {TABBAR} from '../src/data.js';
const profile=readFileSync(new URL('../src/pages/profile.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');

test('guest, public and own PIKK profile receive premium covers without replacing actual content',()=>{
  for(const marker of ['pikk-profile-guest-hero','pikk-profile-cover-inner','pikk-profile-cover-kicker','pikk-profile-stats','pikk-profile-shortcuts']) assert.ok(profile.includes(marker),marker);
  for(const label of ['PIKK · YOUR PROFILE','PIKK · CREATOR PROFILE','PIKK · MY PROFILE']) assert.ok(profile.includes(label),label);
  for(const original of ['theirPosts.length','myPosts.length','listFollowers','listFollowing','avatarHtml','pubFollow','saveProfile','signoutBtn','toggleAdmin','editBio','editAvatar']) assert.ok(profile.includes(original),original);
  assert.match(profile,/TEST MODE · Browser-local account only/);
  assert.match(profile,/TEST MODE · demo user only/);
});

test('profile remains accessible on mobile, preserves seven tabs and player',()=>{
  for(const selector of ['.pikk-profile-cover','.pikk-profile-stats','.pikk-profile-guest-hero','.pikk-profile-cover a:focus-visible']) assert.ok(css.includes(selector),selector);
  assert.match(css,/@media\(max-width:520px\)/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(main,/'\/profile': \{ render: renderProfile, bind: bindProfile \}/);
  assert.deepEqual(TABBAR.map(t=>t.label),['Music','Videos','Connect','Create','Dating','Games','Shop']);
  assert.match(html,/pikk-official-approved\.jpg/);
  assert.match(html,/dbs-sticky-player/);
});

test('Public view shows the signed-in owner their read-only profile, not the edit screen', () => {
  assert.match(profile, /route\?\.query\?\.view === 'public'/);
  assert.match(profile, /if \(viewingOther \|\| isOwnPreview\)/);
  assert.match(profile, /\?view=public">Public view<\/a>/);
  assert.match(profile, /isOwnPreview\s*\? `<a class="btn primary" href="#\/profile">Edit profile<\/a>`/);
  assert.match(profile, /user && !isOwnPreview &&/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const account = readFileSync(new URL('../src/api/account-client.js', import.meta.url), 'utf8');
const profile = readFileSync(new URL('../src/pages/profile.js', import.meta.url), 'utf8');
const posts = readFileSync(new URL('../src/pages/posts.js', import.meta.url), 'utf8');
const messages = readFileSync(new URL('../src/pages/messages.js', import.meta.url), 'utf8');

test('public backend profile lookup uses authenticated user handle endpoint', () => {
  assert.match(account, /publicProfile:\(handle\)=>request\('\/users\/'\+encodeURIComponent/);
  assert.match(profile, /accountApi\.publicProfile\(handle\)/);
  assert.match(profile, /id="backendPublicProfile"/);
  assert.match(profile, /PIKK · PUBLIC PROFILE/);
});

test('persistent post authors link to backend public profiles', () => {
  assert.match(posts, /#\/profile\/\$\{encodeURIComponent\(handle\)\}/);
});

test('public backend Profile can launch a prefilled persistent DM', () => {
  assert.match(profile, /#\/messages\?view=new&handle=\$\{encodeURIComponent\(p\.handle\)\}/);
  assert.match(messages, /const prefill=route\?\.query\?\.handle\|\|''/);
  assert.match(messages, /value="\$\{esc\(prefill\)\}"/);
});

test('public backend profile never renders private email', () => {
  const start = profile.indexOf('accountApi.publicProfile(handle)');
  assert.ok(start > 0);
  const backendBlock = profile.slice(start, start + 2500);
  assert.doesNotMatch(backendBlock, /p\.email/);
});

test('configured API post create is authoritative with no localStorage fallback on failure', () => {
  assert.match(posts, /API is authoritative: never fall back to localStorage createPost on failure/);
  // Remote branch returns after createText; createPost only appears in the !remote demo path after that return.
  const submitIdx = posts.indexOf("root.querySelector('#postSubmit')");
  const remoteIdx = posts.indexOf('if (remote)', submitIdx);
  const createTextIdx = posts.indexOf('postsApi.createText', remoteIdx);
  const returnIdx = posts.indexOf('return;', createTextIdx);
  const demoCreateIdx = posts.indexOf("createPost({ text: text.trim(), mediaType: 'text' })", returnIdx);
  assert.ok(createTextIdx > remoteIdx);
  assert.ok(returnIdx > createTextIdx);
  assert.ok(demoCreateIdx > returnIdx);
  assert.match(posts, /Demo · this browser only \(localStorage\)/);
});

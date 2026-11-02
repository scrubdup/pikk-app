import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client = readFileSync(new URL('../src/api/posts-client.js', import.meta.url), 'utf8');
const page = readFileSync(new URL('../src/pages/posts.js', import.meta.url), 'utf8');

test('posts API uses configured backend with credentialed sessions', () => {
  assert.match(client, /VITE_PIKK_API_BASE/);
  assert.match(client, /credentials:'include'/);
  for (const route of ["'/posts'","'/feed'","'/follows'"]) assert.ok(client.includes(route), route);
});

test('real Posts mode loads Discover and Following from backend', () => {
  assert.match(page, /isPostsApiConfigured\(\)/);
  assert.match(page, /postsApi\.discover\(\)/);
  assert.match(page, /postsApi\.following\(\)/);
  assert.match(page, /renderPersistentPosts\(data\.posts \|\| \[\]/);
  assert.match(page, /id="pikkPersistentPosts"/);
});

test('real Posts mode publishes persistent text and blocks unconnected media persistence', () => {
  assert.match(page, /await postsApi\.createText\(text\.trim\(\)\)/);
  assert.match(page, /Text post saved to PIKK/);
  assert.match(page, /Persistent Picture\/Short\/Video uploads are not connected yet/);
  assert.match(page, /Verify your email before posting/);
});

test('real persistent feed can follow by backend handle', () => {
  assert.match(page, /class="btn ghost persistent-follow"/);
  assert.match(page, /await postsApi\.follow\(btn\.dataset\.handle\)/);
});

test('local prototype post behavior remains as fallback', () => {
  assert.match(page, /createPost\(\{ text: text\.trim\(\), mediaType: 'text' \}\)/);
  assert.match(page, /TEST MODE · no real upload/);
  assert.match(page, /toggleLike/);
  assert.match(page, /addComment/);
});

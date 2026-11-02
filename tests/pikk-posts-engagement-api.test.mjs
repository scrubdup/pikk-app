import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client=readFileSync(new URL('../src/api/posts-client.js',import.meta.url),'utf8');
const page=readFileSync(new URL('../src/pages/posts.js',import.meta.url),'utf8');

test('persistent posts client exposes like unlike comment routes',()=>{
 for(const token of ["like:(id)","unlike:(id)","comments:(id)","comment:(id,body)"]) assert.ok(client.includes(token),token);
 assert.match(client,/\/like/);
 assert.match(client,/\/comments/);
 assert.match(client,/credentials:'include'/);
});

test('persistent post cards render backend engagement counts and controls',()=>{
 assert.match(page,/Number\(p\.like_count\)\|\|0/);
 assert.match(page,/Number\(p\.comment_count\)\|\|0/);
 assert.match(page,/data-liked=/);
 assert.match(page,/persistent-like/);
 assert.match(page,/persistent-comments-toggle/);
 assert.match(page,/persistent-comment-form/);
});

test('persistent likes toggle through backend and refresh feed',()=>{
 assert.match(page,/postsApi\.unlike\(likeBtn\.dataset\.id\)/);
 assert.match(page,/postsApi\.like\(likeBtn\.dataset\.id\)/);
 assert.match(page,/await loadPersistentPosts\(\)/);
 assert.match(page,/Verify your email before liking posts/);
});

test('persistent comments load and submit through backend',()=>{
 assert.match(page,/postsApi\.comments\(commentsBtn\.dataset\.id\)/);
 assert.match(page,/await postsApi\.comment\(form\.dataset\.id, body\)/);
 assert.match(page,/renderPersistentComments/);
 assert.match(page,/Verify your email before commenting/);
});

test('local demo engagement remains fallback only',()=>{
 for(const token of ['toggleLike','addComment','sharePost']) assert.ok(page.includes(token),token);
 assert.match(page,/if \(!remote\) return/);
});

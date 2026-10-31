import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const view=readFileSync(new URL('../src/pages/communities.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const connect=readFileSync(new URL('../src/pages/connect.js',import.meta.url),'utf8');
const shells=readFileSync(new URL('../src/pages/shells.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');
test('original Reddit-style communities exist as a separate route within Connect',()=>{
 assert.match(main,/import \{ renderCommunities, bindCommunities \}/);
 assert.match(main,/'\/communities': \{ render: renderCommunities, bind: bindCommunities \}/);
 assert.match(main,/'\/community': \{ render: renderCommunity, bind: bindCommunity \}/);
 assert.match(connect,/href="#\/communities"/);
 assert.match(shells,/Open PIKK Communities/);
 assert.match(css,/\.pikk-forum-layout/);
 assert.match(css,/@media\(max-width:610px\)/);
});
test('topic forum implements local posts, votes, replies and clear prelaunch limitations',()=>{
 for(const marker of ['music','business','relationships','gaming','sports','entertainment','lifestyle','general','data-ftopic','data-fsort','data-fvote','data-freply','pikkForumForm','pikk-forum-post'])assert.ok(view.includes(marker),marker);
 assert.match(view,/localStorage\.setItem/);
 assert.match(view,/getState\(\)\.user/);
 assert.match(view,/saved only in this browser/i);
 assert.match(view,/No public posting/i);
 assert.match(view,/no server report submitted/i);
 assert.match(view,/esc\(p\.body\)/);
});

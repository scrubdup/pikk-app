import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const account=readFileSync(new URL('../src/api/account-client.js',import.meta.url),'utf8');
const profile=readFileSync(new URL('../src/pages/profile.js',import.meta.url),'utf8');
const posts=readFileSync(new URL('../src/pages/posts.js',import.meta.url),'utf8');
const messages=readFileSync(new URL('../src/pages/messages.js',import.meta.url),'utf8');

test('public backend profile lookup uses authenticated user handle endpoint',()=>{
 assert.match(account,/publicProfile:\(handle\)=>request\('\/users\/'\+encodeURIComponent\(handle\)\)/);
 assert.match(profile,/accountApi\.publicProfile\(handle\)/);
 assert.match(profile,/id="backendPublicProfile"/);
 assert.match(profile,/PIKK · PUBLIC PROFILE/);
});

test('persistent post authors link to backend public profiles',()=>{
 assert.match(posts,/#\/profile\/\$\{encodeURIComponent\(handle\)\}/);
});

test('public backend Profile can launch a prefilled persistent DM',()=>{
 assert.match(profile,/#\/messages\?view=new&handle=\$\{encodeURIComponent\(p\.handle\)\}/);
 assert.match(messages,/const prefill=route\?\.query\?\.handle\|\|''/);
 assert.match(messages,/value="\$\{esc\(prefill\)\}"/);
});

test('public backend profile never renders private email',()=>{
 const backendBlock=profile.slice(profile.indexOf("accountApi.publicProfile(handle)"),profile.indexOf("root.querySelector('#signupAccountBtn')"));
 assert.doesNotMatch(backendBlock,/p\.email/);
});

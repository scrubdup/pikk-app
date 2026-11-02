import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const profile=readFileSync(new URL('../src/pages/profile.js',import.meta.url),'utf8');
const account=readFileSync(new URL('../src/api/account-client.js',import.meta.url),'utf8');
const store=readFileSync(new URL('../src/store.js',import.meta.url),'utf8');

test('backend Profile edits save through the authenticated account API',()=>{
 assert.match(account,/updateProfile/);
 assert.match(account,/\/account\/profile/);
 assert.match(profile,/await accountApi\.updateProfile/);
 assert.match(profile,/Profile saved to PIKK/);
 assert.match(profile,/syncRemoteAuthUser\(result\.user\)/);
});

test('remote session sync uses backend bio and avatar fields',()=>{
 assert.match(store,/remoteUser\.bio/);
 assert.match(store,/remoteUser\.avatar_url/);
});

test('legacy local profile save remains fallback only',()=>{
 assert.match(profile,/current\?\.authSource === 'backend'/);
 assert.match(profile,/updateProfile\(\{ bio, avatar \}\)/);
 assert.match(profile,/Profile saved locally/);
});

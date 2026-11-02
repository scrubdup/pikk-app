import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client=readFileSync(new URL('../src/api/account-client.js',import.meta.url),'utf8');
const shells=readFileSync(new URL('../src/pages/shells.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('creator role manager uses authenticated backend account roles',()=>{
 assert.match(client,/credentials:'include'/);
 assert.match(client,/\/auth\/me/);
 assert.match(client,/\/account\/signup-roles/);
 assert.match(shells,/accountApi\.me\(\)/);
 assert.match(shells,/accountApi\.updateSignupRoles\(roles\)/);
 assert.match(main, /'\/signup': \{ render: renderSignup, bind: bindSignup \}/);
});

test('creator role manager exposes every approved declaration role except implicit member',()=>{
 for(const role of ['creator','artist','streamer','producer','publisher','seller','advertiser','clipper'])assert.ok(shells.includes(`id: '${role}'`),role);
 assert.match(shells,/Member is always included/);
});

test('role declaration explicitly does not grant restricted approval or monetization',()=>{
 for(const phrase of [
  'It does not grant admin privileges, payout eligibility, verification, or monetization approval.',
  'additional review beyond the role declaration',
  'identity\/tax\/payout checks'
 ])assert.match(shells,new RegExp(phrase));
});

test('creator tools link real artist roles toward private music drafts',()=>{
 assert.match(shells,/#\/music\?view=upload/);
 assert.match(shells,/Private draft music uploads with rights certification/);
});

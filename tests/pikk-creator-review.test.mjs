import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client=readFileSync(new URL('../src/api/account-client.js',import.meta.url),'utf8');
const page=readFileSync(new URL('../src/pages/creator-review.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('creator review route uses real admin review APIs',()=>{
 assert.match(main, /'\/creator-review': \{ render: renderCreatorReview, bind: bindCreatorReview \}/);
 assert.match(client,/listRoleReviews/);
 assert.match(client,/reviewRole/);
 assert.match(client,/\/admin\/signup-roles/);
 assert.match(client,/\/admin\/signup-roles\/review/);
});

test('creator review UI exposes backend statuses and requires reason',()=>{
 for(const status of ['declared','pending_review','approved','rejected']) assert.ok(page.includes(status),status);
 assert.match(page,/Review reason/);
 assert.match(page,/Enter a review reason/);
 assert.match(page,/Role review saved/);
});

test('creator review UI keeps approval separate from payout and identity checks',()=>{
 assert.match(page,/payout eligibility, identity\/tax checks and other provider approvals remain separate/);
 assert.match(page,/does not have Admin permission/);
 assert.match(page,/Sign in with an Admin account/);
});

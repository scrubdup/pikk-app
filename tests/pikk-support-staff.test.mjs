import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client=readFileSync(new URL('../src/api/support-client.js',import.meta.url),'utf8');
const page=readFileSync(new URL('../src/pages/support-staff.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('Support Staff route is registered and backed by staff-only queue API',()=>{
 assert.match(main, /'\/support-staff': \{ render: renderSupportStaff, bind: bindSupportStaff \}/);
 assert.match(client,/staffList: \(\) => request\('\/support\/staff\/tickets'\)/);
 assert.match(page,/supportApi\.staffList\(\)/);
 assert.match(page,/supportApi\.getTicket/);
 assert.match(page,/supportApi\.reply/);
});

test('staff queue communicates backend authorization boundaries',()=>{
 assert.match(page,/support_agent/);
 assert.match(page,/Unauthorized accounts cannot read this queue/);
 assert.match(page,/does not have Support Staff permission/);
 assert.match(page,/Sign in with a Support Staff account/);
});

test('staff can open threads and send replies from the UI',()=>{
 assert.match(page,/data-staff-ticket/);
 assert.match(page,/id="supportStaffReply"/);
 assert.match(page,/Send support reply/);
 assert.match(page,/Support reply sent/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client=readFileSync(new URL('../src/api/support-client.js',import.meta.url),'utf8');
const page=readFileSync(new URL('../src/pages/support.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/support.css',import.meta.url),'utf8');

test('support API uses the configured backend with credentialed sessions',()=>{
 assert.match(client,/VITE_PIKK_API_BASE/);
 assert.match(client,/credentials: 'include'/);
 for(const route of ["/support/tickets","/messages"])assert.ok(client.includes(route),route);
});

test('support topics map into the backend ticket categories',()=>{
 for(const value of ["'account'","'payments'","'safety'","'technical'","'other'"])assert.ok(client.includes(value),value);
 assert.match(client,/'Bug report': 'technical'/);
 assert.match(client,/'Billing & purchases': 'payments'/);
});

test('Support switches to real submission and account ticket history only when API is configured',()=>{
 assert.match(page,/isSupportApiConfigured\(\)/);
 assert.match(page,/Submit ticket to PIKK Support/);
 assert.match(page,/supportApi\.createTicket/);
 assert.match(page,/supportApi\.listTickets/);
 assert.match(page,/supportApi\.getTicket/);
 assert.match(page,/supportApi\.reply/);
 assert.match(page,/Ticket submitted to PIKK Support/);
 assert.match(page,/Reply sent to PIKK Support/);
});

test('Support retains the honest local-draft fallback',()=>{
 for(const phrase of ['Tickets are saved only in this browser','No request is sent to staff','Save ticket draft locally','Ticket draft saved locally · not sent'])assert.ok(page.includes(phrase),phrase);
 assert.match(page,/const drafts=saveSupportTicket\(window\.localStorage,item\)/);
});

test('real ticket thread layout is responsive',()=>{
 for(const token of ['.support-ticket-detail','.support-thread-message.is-staff','.support-thread-message.is-user'])assert.ok(css.includes(token),token);
 assert.match(css,/@media\(max-width:520px\)/);
});

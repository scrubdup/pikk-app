import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client=readFileSync(new URL('../src/api/messages-client.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');

test('messages API exposes persistent unread count',()=>{
 assert.match(client,/unreadCount:\(\)=>request\('\/messages\/unread-count'\)/);
 assert.match(client,/credentials:'include'/);
});

test('header badge uses backend unread count for backend accounts',()=>{
 assert.match(main,/isMessagesApiConfigured\(\) && getState\(\)\.user\?\.authSource === 'backend'/);
 assert.match(main,/messagesApi\.unreadCount\(\)/);
 assert.match(main,/paintHeaderMsgBadge\(Number\(data\?\.unread \|\| 0\)\)/);
});

test('demo unread seeding is disabled in real API mode',()=>{
 assert.match(main,/getState\(\)\.user && !isMessagesApiConfigured\(\)/);
 assert.match(main,/ensureDemoUnreadMessages\(\)/);
 assert.match(main,/getUnreadMessageCount\(\)/);
});

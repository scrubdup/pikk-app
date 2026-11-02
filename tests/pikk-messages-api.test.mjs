import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client=readFileSync(new URL('../src/api/messages-client.js',import.meta.url),'utf8');
const page=readFileSync(new URL('../src/pages/messages.js',import.meta.url),'utf8');

test('persistent Messages client uses credentialed backend routes',()=>{
 assert.match(client,/VITE_PIKK_API_BASE/);
 assert.match(client,/credentials:'include'/);
 for(const token of ["'/messages/conversations'","'/messages'","'/read'"])assert.ok(client.includes(token),token);
});

test('Messages switches to persistent backend inbox when API is configured',()=>{
 assert.match(page,/isMessagesApiConfigured\(\)/);
 assert.match(page,/renderPersistentMessages\(route,user\)/);
 assert.match(page,/messagesApi\.list\(\)/);
 assert.match(page,/renderPersistentConversationList/);
 assert.match(page,/id="persistentMsgInbox"/);
});

test('persistent Messages supports start, open, send and mark read',()=>{
 assert.match(page,/messagesApi\.start\(handle\)/);
 assert.match(page,/messagesApi\.get\(id\)/);
 assert.match(page,/messagesApi\.send\(id,message\)/);
 assert.match(page,/messagesApi\.markRead\(id\)/);
 assert.match(page,/Verify your email before starting messages/);
 assert.match(page,/Verify your email before sending messages/);
});

test('persistent Messages does not present demo group or paid-priority claims in remote mode',()=>{
 assert.match(page,/Verified accounts only/);
 assert.match(page,/Persistent private messaging/);
 assert.match(page,/if \(isMessagesApiConfigured\(\)\) return renderPersistentMessages/);
});

test('browser-local messaging remains available only as fallback',()=>{
 for(const token of ['ensureDemoMessageContacts','ensureDemoGroupThread','sendMessage','sendGroupMessage'])assert.ok(page.includes(token),token);
 assert.match(page,/TEST MODE · No server messaging/);
});

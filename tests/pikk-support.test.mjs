import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {createSupportTicket,readSupportTickets,saveSupportTicket,deleteSupportTicket} from '../src/pikk-support.js';
test('Support validates required inputs and does not falsely submit',()=>{const input={category:'Technical issue',subject:'Video player',contact:'user@example.com',message:'The player freezes when I open music.'};const t=createSupportTicket(input,8);assert.equal(t.createdAt,8);assert.match(t.status,/not submitted/);assert.throws(()=>createSupportTicket({...input,category:'Not supported'}));assert.throws(()=>createSupportTicket({...input,message:'tiny'}))});
test('Support tickets persist only in caller supplied local storage and can be deleted',()=>{const m=new Map();const store={getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};const t=createSupportTicket({category:'Other',subject:'Support request',contact:'test',message:'A detailed issue message.'});assert.equal(saveSupportTicket(store,t).length,1);assert.equal(readSupportTickets(store).length,1);assert.equal(deleteSupportTicket(store,t.id).length,0)});
test('Support UI labels prototype honestly',()=>{const s=readFileSync(new URL('../src/pages/support.js',import.meta.url),'utf8');for(const p of ['TEST MODE','Tickets are saved only in this browser','No request is sent to staff','not yet connected','pikkSupportForm'])assert.ok(s.includes(p),p);const m=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');assert.ok(m.includes("'/support': { render: renderSupport, bind: bindSupport }"))});

test('Support avoids duplicate local drafts while allowing different issues',()=>{
 const m=new Map();const store={getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};
 const input={category:'Technical issue',subject:'Video player',contact:'user@example.com',message:'Video playback freezes on mobile.'};
 const first=createSupportTicket(input,100);const repeated=createSupportTicket(input,200);
 assert.equal(saveSupportTicket(store,first).length,1);
 assert.equal(saveSupportTicket(store,repeated).length,1);
 assert.equal(readSupportTickets(store)[0].id,first.id);
 assert.equal(saveSupportTicket(store,createSupportTicket({...input,message:'Video playback freezes on desktop.'},300)).length,2);
});

// The visible support screen must distinguish a duplicate from a newly saved draft.
test('Support form reports duplicate drafts honestly and labels local history',()=>{
 const page=readFileSync(new URL('../src/pages/support.js',import.meta.url),'utf8');
 assert.match(page,/const drafts=saveSupportTicket\(window\.localStorage,item\)/);
 assert.match(page,/drafts\.some\(draft=>draft\.id===item\.id\)/);
 assert.match(page,/An identical draft is already saved on this device · not sent/);
 assert.match(page,/Saved drafts \(\$\{tickets\.length\}\)/);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {normalizeShieldSubmission,readShieldIntakes,saveShieldIntake,removeShieldIntake,safeShieldUrl,serializeShieldDrafts,importShieldDrafts} from '../src/pikk-shield.js';
const page=readFileSync(new URL('../src/pages/shield.js',import.meta.url),'utf8');
const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
const music=readFileSync(new URL('../src/pages/music.js',import.meta.url),'utf8');
test('PIKK Shield validates rights declarations and rejects missing certification',()=>{
  const base={title:'Original track',owner:'Artist',rights:'Original creator',contact:'artist@example.com',certified:true,source:'https://example.com/song'};
  const record=normalizeShieldSubmission(base,123);
  assert.equal(record.title,'Original track');
  assert.equal(record.status,'Local draft — not submitted');
  assert.equal(record.source,'https://example.com/song');
  assert.throws(()=>normalizeShieldSubmission({...base,certified:false}),/certification/);
  assert.throws(()=>normalizeShieldSubmission({...base,rights:'Pirated copy'}),/certification/);
  assert.throws(()=>normalizeShieldSubmission({...base,source:'javascript:alert(1)'}),/valid http/);
  assert.equal(safeShieldUrl('file:///local'), '');
});
test('PIKK Shield stores, reads and deletes local drafts without backend claims',()=>{
  const m=new Map();const storage={getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};
  const item=normalizeShieldSubmission({title:'Song',owner:'Artist',rights:'Original creator',contact:'contact',certified:true},1);
  assert.equal(saveShieldIntake(storage,item).length,1);
  assert.equal(readShieldIntakes(storage)[0].id,item.id);
  assert.equal(removeShieldIntake(storage,item.id).length,0);
  storage.setItem('pikk_shield_intake_v1','corrupt');
  assert.deepEqual(readShieldIntakes(storage),[]);
});
test('Shield local draft deletion asks for explicit confirmation before removal',()=>{
  assert.ok(page.includes('window.confirm('),'delete must ask for confirmation');
  assert.ok(page.includes('This cannot be undone.'),'warning must explain permanent local deletion');
  assert.ok(page.indexOf('window.confirm(') < page.indexOf('removeShieldIntake(window.localStorage,b.dataset.id)'));
});
test('Shield page is routed, reachable from music and clear about prototype limits',()=>{
  assert.ok(main.includes("'/shield': { render: renderShield, bind: bindShield }"));
  assert.ok(main.includes("import './shield.css'"));
  assert.ok(music.includes('href="#/shield"'));
  for(const token of ['TEST MODE','No upload scanning','not sent to PIKK','Audio fingerprinting','Dispute and appeals','External platform notices','shieldForm','shieldCertify'])assert.ok(page.includes(token),token);
});

test('Saved Shield drafts reveal existing details without exposing unsafe local links',()=>{
  assert.ok(page.includes('<details class="shield-draft-details">'));
  assert.ok(page.includes('Review saved draft details'));
  assert.ok(page.includes('esc(e.contact ||'));
  assert.ok(page.includes('esc(e.notes)'));
  assert.ok(page.includes('safeShieldUrl(e.source)'), 'revalidate even tampered localStorage links');
  assert.ok(page.includes('href="${esc(source)}"'));
  assert.ok(page.includes('rel="noopener noreferrer"'));
  assert.ok(page.includes('Not submitted to PIKK'));
  assert.equal(safeShieldUrl('javascript:alert(1)'), '');
  assert.equal(safeShieldUrl('https://example.com/track'), 'https://example.com/track');
});

test('Shield clear form is a native reset and never deletes saved rights drafts',()=>{
  assert.match(page, /<form id="shieldForm">[\s\S]*<button type="reset" class="btn ghost">Clear form<\/button>[\s\S]*<\/form>/);
  assert.ok(!page.includes('shieldForm.reset()'), 'native form reset is sufficient');
  assert.ok(page.includes('window.confirm('), 'saved-draft deletion still requires confirmation');
});

test('Shield local draft search filters song and artist without mutating storage',()=>{
  assert.ok(page.includes('id="shieldDraftSearch"'));
  assert.ok(page.includes('data-shield-search='));
  assert.ok(page.includes('e.title || ""'));
  assert.ok(page.includes('e.owner || ""'));
  assert.ok(page.includes("search?.addEventListener('input'"));
  assert.ok(page.includes('card.hidden = !matches'));
  assert.ok(page.includes('Showing ${visible} of ${cards.length} drafts'));
  assert.ok(page.includes('No saved drafts match your search.'));
  assert.ok(!page.includes('removeShieldIntake(window.localStorage,card.dataset'), 'search never deletes saved drafts');
});

test('PIKK Shield offline JSON backup exports only rights draft fields without mutating local data',()=>{
 const m=new Map();const storage={getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};
 storage.setItem('other_app_secret','do not export');
 const record=normalizeShieldSubmission({title:'Song',owner:'Artist',rights:'Original creator',contact:'artist@example.com',source:'https://example.com/song',notes:'Private rights note',certified:true},42);
 saveShieldIntake(storage,record);
 const before=storage.getItem('pikk_shield_intake_v1');
 const backup=JSON.parse(serializeShieldDrafts(storage));
 assert.equal(backup.format,'PIKK Shield local rights drafts');
 assert.equal(backup.version,1);
 assert.equal(backup.drafts.length,1);
 assert.equal(backup.drafts[0].title,'Song');
 assert.equal(backup.drafts[0].contact,'artist@example.com');
 assert.equal(backup.drafts[0].notes,'Private rights note');
 assert.equal(backup.drafts[0].status,'Local draft — not submitted');
 assert.equal(serializeShieldDrafts(storage).includes('do not export'),false);
 assert.equal(storage.getItem('pikk_shield_intake_v1'),before);
 assert.deepEqual(JSON.parse(serializeShieldDrafts({getItem:()=>null})).drafts,[]);
});
test('PIKK Shield backup is explicitly user initiated and warns about private contact data',()=>{
 assert.ok(page.includes('id="shieldExportDrafts"'));
 assert.ok(page.includes('Download local backup (.json)'));
 assert.ok(page.includes('Backups contain your contact and rights details.'));
 assert.ok(page.includes("serializeShieldDrafts(window.localStorage)"));
 assert.ok(page.includes("link.download = 'pikk-shield-local-drafts.json'"));
 assert.ok(page.includes("URL.revokeObjectURL(url)"));
});

test('Shield restores valid JSON backups locally and ignores duplicate IDs',()=>{
 const m=new Map();const storage={getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};
 const record=normalizeShieldSubmission({title:'Restored song',owner:'Artist',rights:'Original creator',contact:'artist@example.com',certified:true},42);
 saveShieldIntake(storage,record);
 const backup=serializeShieldDrafts(storage);
 storage.setItem('pikk_shield_intake_v1','[]');
 assert.deepEqual(importShieldDrafts(storage,backup),{added:1,duplicates:0,total:1});
 assert.deepEqual(importShieldDrafts(storage,backup),{added:0,duplicates:1,total:1});
 assert.equal(readShieldIntakes(storage)[0].title,'Restored song');
});
test('Shield rejects malformed, oversized, and unsafe backups without changing stored drafts',()=>{
 const m=new Map();const storage={getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};
 const record=normalizeShieldSubmission({title:'Original',owner:'Artist',rights:'Original creator',contact:'contact',certified:true},99);
 saveShieldIntake(storage,record);
 const original=storage.getItem('pikk_shield_intake_v1');
 const backup=JSON.parse(serializeShieldDrafts(storage));
 for(const bad of ['bad json','x'.repeat(65537),JSON.stringify({...backup,version:9}),
 JSON.stringify({...backup,drafts:[{...backup.drafts[0],source:'javascript:alert(1)'}]}),
 JSON.stringify({...backup,drafts:[{...backup.drafts[0],title:''}]}),
 JSON.stringify({...backup,drafts:Array(31).fill(backup.drafts[0])})]){
   assert.throws(()=>importShieldDrafts(storage,bad));
   assert.equal(storage.getItem('pikk_shield_intake_v1'),original);
 }
});
test('Shield import UI requires explicit file choice and confirmation',()=>{
 assert.ok(page.includes('id="shieldImportDrafts"'));
 assert.ok(page.includes('id="shieldImportFile"'));
 assert.ok(page.includes("window.confirm('Restore PIKK Shield drafts"));
 assert.ok(page.includes('importShieldDrafts(window.localStorage, json)'));
 assert.ok(page.includes("file.size > 65536"));
});

test('Shield restore at capacity never evicts previously saved drafts',()=>{
 const m=new Map();const storage={getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v)};
 const make=(n)=>normalizeShieldSubmission({title:'Track '+n,owner:'Artist',rights:'Original creator',contact:'contact',certified:true},n);
 for(let i=0;i<30;i++)saveShieldIntake(storage,make(i));
 const before=readShieldIntakes(storage).map(x=>x.id);
 const other={getItem:()=>null,setItem:()=>{}};
 const incoming=make(99);
 const backup=JSON.stringify({format:'PIKK Shield local rights drafts',version:1,drafts:[incoming]});
 assert.deepEqual(importShieldDrafts(storage,backup),{added:0,duplicates:0,total:30});
 assert.deepEqual(readShieldIntakes(storage).map(x=>x.id),before);
});

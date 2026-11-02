import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client=readFileSync(new URL('../src/api/music-upload-client.js',import.meta.url),'utf8');
const page=readFileSync(new URL('../src/pages/music.js',import.meta.url),'utf8');

test('music upload client uses credentialed multipart requests',()=>{
 assert.match(client,/VITE_PIKK_API_BASE/);
 assert.match(client,/credentials:'include'/);
 assert.match(client,/new FormData\(\)/);
 assert.match(client,/form\.set\('audio',audio\)/);
 assert.match(client,/\/media\/music/);
});

test('Upload Music view renders real draft form only when API is configured',()=>{
 assert.match(page,/isMusicUploadApiConfigured\(\)/);
 for(const id of ['pikkMusicUploadForm','musicUploadTitle','musicUploadArtist','musicUploadFile','musicUploadRights','musicUploadSubmit','pikkMusicUploadList'])assert.ok(page.includes(id),id);
 assert.match(page,/Upload private draft/);
 assert.match(page,/Drafts are not automatically published or monetized/);
});

test('music upload UI surfaces real account/storage blockers honestly',()=>{
 for(const phrase of [
   'Sign in to upload music.',
   'Verify your email before uploading music.',
   'Add Creator, Artist or Producer to your PIKK account before uploading.',
   'PIKK media storage is not connected yet. No file was uploaded.',
   'Confirm that you own or control the rights to this audio.'
 ])assert.ok(page.includes(phrase),phrase);
});

test('successful backend upload stays a draft and refreshes My draft uploads',()=>{
 assert.match(page,/musicUploadApi\.upload/);
 assert.match(page,/Draft uploaded:/);
 assert.match(page,/It is not published yet/);
 assert.match(page,/musicUploadApi\.list\(\)/);
 assert.match(page,/renderMusicUploadDrafts/);
});

test('legacy device-local Admin catalog remains separate from real creator uploads',()=>{
 assert.match(page,/listCatalog/);
 assert.match(page,/resolveMediaSrc/);
 assert.match(page,/From Admin/);
});

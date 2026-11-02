import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const client=readFileSync(new URL('../src/api/music-upload-client.js',import.meta.url),'utf8');
const page=readFileSync(new URL('../src/pages/music.js',import.meta.url),'utf8');

test('music draft client deletes through authenticated backend',()=>{
 assert.match(client,/deleteDraft:async\(id\)/);
 assert.match(client,/method:'DELETE'/);
 assert.match(client,/credentials:'include'/);
});

test('My draft uploads expose an explicit owner delete action',()=>{
 assert.match(page,/music-draft-delete/);
 assert.match(page,/Delete draft/);
 assert.match(page,/Delete this private music draft\?/);
 assert.match(page,/musicUploadApi\.deleteDraft\(button\.dataset\.id\)/);
 assert.match(page,/Music draft deleted/);
});

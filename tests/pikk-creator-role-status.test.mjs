import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const page=readFileSync(new URL('../src/pages/shells.js',import.meta.url),'utf8');

test('creator role manager displays backend review status separately from selection',()=>{
 assert.match(page,/data-role-state=/);
 assert.match(page,/not selected/);
 assert.match(page,/byRole\.get\(input\.value\)\|\|'not selected'/);
 assert.match(page,/Current account roles and review statuses loaded/);
});

test('saving role declarations never relabels them approved',()=>{
 assert.match(page,/badge\.textContent=saved\.includes\(input\.value\)\?'declared':'not selected'/);
 assert.match(page,/Review status may be updated separately where required/);
 assert.doesNotMatch(page,/badge\.textContent=.*approved/);
});

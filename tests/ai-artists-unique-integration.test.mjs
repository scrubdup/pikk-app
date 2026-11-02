import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('AI Artists route, imports and Music link are unique to prevent deploy build failures',()=>{
 const main=readFileSync(new URL('../src/main.js',import.meta.url),'utf8');
 const music=readFileSync(new URL('../src/pages/music.js',import.meta.url),'utf8');
 for(const [text,pattern] of [[main,/import \{ renderAIArtists, bindAIArtists \} from '\.\/pages\/ai-artists\.js';/g],[main,/\s'\/ai-artists': \{ render: renderAIArtists, bind: bindAIArtists \},/g],[music,/href="#\/ai-artists"/g]])assert.equal([...text.matchAll(pattern)].length,1,'AI Artists integration must appear exactly once');
 assert.match(main,/\/shield/,'Shield preserved');
 assert.match(music,/href="#\/shield"/,'Shield link preserved');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
globalThis.window={localStorage:{getItem:()=>null,setItem:()=>{}}};
globalThis.location={hash:'#/support'};
const { renderSupport, renderSupportGuideLinks, supportSearchStatus }=await import('../src/pages/support.js');
const { SUPPORT_GUIDES, searchSupportGuides }=await import('../src/pikk-support.js');
const page=renderSupport();
test('FAQ search has an accessible status, clear button and actual local-draft fallback',()=>{
 assert.match(page,/id="pikkSupportSearch"[^>]*aria-controls="pikkSupportResults"[^>]*aria-describedby="pikkSupportSearchStatus"/);
 assert.match(page,/id="pikkSupportClear"[^>]*type="button" hidden/);
 assert.match(page,/id="pikkSupportSearchStatus" role="status" aria-live="polite" aria-atomic="true"/);
 assert.match(page,/Showing all 6 help guides/);
 const source=readFileSync(new URL('../src/pages/support.js',import.meta.url),'utf8');
 assert.match(source,/search\.focus\(\)/);
 assert.match(source,/event\.key==='Escape'/);
 assert.match(source,/Prepare a local support draft/);
 assert.match(source,/res\.innerHTML=results\.length\?renderSupportGuideLinks\(results\)/);
 assert.match(source,/clear\.hidden=!String\(query\)\.trim\(\)/);
});
test('filtered guides keep the same visible CTA and safe link markup',()=>{
 const matches=searchSupportGuides('refund');
 assert.ok(matches.length>0);
 const html=renderSupportGuideLinks(matches);
 assert.equal((html.match(/class="support-guide"/g)||[]).length,matches.length);
 assert.equal((html.match(/View related page →/g)||[]).length,matches.length);
 assert.match(html,/href="#\/payments"/);
 assert.equal(renderSupportGuideLinks([]),'');
 assert.equal(supportSearchStatus(1,'refund'),'1 matching help guide');
 assert.equal(supportSearchStatus(0,'missing'),'0 matching help guides');
 assert.equal(supportSearchStatus(SUPPORT_GUIDES.length),'Showing all 6 help guides');
});
test('support styling protects mobile layout and keyboard focus',()=>{
 const css=readFileSync(new URL('../src/support.css',import.meta.url),'utf8');
 assert.match(css,/\.support-search-row\{display:grid;grid-template-columns:minmax\(0,1fr\) auto/);
 assert.match(css,/\.support-search-clear\[hidden\]\{display:none!important\}/);
 assert.match(css,/#pikkSupportSearch:focus-visible/);
});

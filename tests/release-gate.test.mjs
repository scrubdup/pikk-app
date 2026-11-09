import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const pages = readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');
const restore = readFileSync(new URL('../.github/workflows/pikk-restore.yml', import.meta.url), 'utf8');
const regression = readFileSync(new URL('../.github/workflows/pikk-regression.yml', import.meta.url), 'utf8');

for (const [name, workflow] of [['Pages', pages], ['Restore preview', restore]]) {
  test(`${name} publishing requires manual dispatch, never a branch push or PR`, () => {
    assert.match(workflow, /^on:\s*\n\s{2}workflow_dispatch:/m);
    assert.doesNotMatch(workflow, /^\s{2}(?:push|pull_request|schedule|workflow_run):/m);
    assert.match(workflow, /publish_branch:\s*gh-pages/);
  });
}

test('manual publishing tests and builds before uploading', () => {
  for (const workflow of [pages, restore]) {
    const testStep = workflow.indexOf('run: npm test');
    const buildStep = workflow.indexOf('run: npm run build');
    const publishStep = workflow.indexOf('peaceiris/actions-gh-pages@');
    assert.ok(testStep >= 0 && buildStep > testStep && publishStep > buildStep);
  }
  assert.match(pages, /VITE_BASE:\s*\/pikk-app\//);
});

test('existing regression workflow verifies PRs and main pushes without deploy rights', () => {
  assert.match(regression, /^\s{2}pull_request:/m);
  assert.match(regression, /^\s{2}push:/m);
  assert.match(regression, /branches:\s*\[main, pikk-build-regression-guards\]/);
  assert.match(regression, /contents:\s*read/);
  assert.match(regression, /run: npm test/);
  assert.match(regression, /run: npm run build/);
  assert.doesNotMatch(regression, /peaceiris\/actions-gh-pages|publish_branch|contents:\s*write/);
});

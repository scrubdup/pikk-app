import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflow = readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');

test('Pages publish is followed by a public CDN verification gate, not only a gh-pages artifact', () => {
  const publish = workflow.indexOf('Publish built app to existing gh-pages branch');
  const verify = workflow.indexOf('Verify public PIKK Pages CDN serves this exact build');
  assert.ok(publish >= 0 && verify > publish);
  assert.match(workflow, /EXPECTED_SHA: \$\{\{ github\.sha \}\}/);
  assert.match(workflow, /https:\/\/scrubdup\.github\.io\/pikk-app\//);
  assert.match(workflow, /curl -fLsS/);
  assert.match(workflow, /grep -oE .*assets\/index-/);
  assert.match(workflow, /\$js\" == \*\"\$EXPECTED_SHA\"\*/);
  assert.match(workflow, /Public Pages delivery .* could not be verified/);
});

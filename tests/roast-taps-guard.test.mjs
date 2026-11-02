import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const script = readFileSync(new URL('../scripts/visual-review-roast-taps.mjs', import.meta.url), 'utf8');
const wf = readFileSync(new URL('../.github/workflows/pikk-roast-visual.yml', import.meta.url), 'utf8');
test('roast tap review never measures a foreign server', () => {
  assert.doesNotMatch(script, /'4173'/, 'no hardcoded port');
  assert.match(script, /listen\(0, '127\.0\.0\.1'/, 'picks a free port');
  assert.match(script, /--strictPort/);
  assert.match(script, /port \$\{port\} is busy/); assert.match(script, /process\.exit\(2\)/);
  assert.match(script, /server\.on\('exit'/); assert.match(script, /exited early/);
  assert.match(script, /process\.exitCode = 1/);
});
test('roast tap workflow runs on any shared stylesheet change', () => {
  assert.match(wf, /- 'src\/\*\.css'/); assert.match(wf, /- 'src\/\*\*\/\*\.css'/);
});

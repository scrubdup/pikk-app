import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../scripts/live-api-smoke.mjs', import.meta.url));
const run = (url) => {
  const env = { ...process.env };
  delete env.PIKK_API_URL;
  if (url !== undefined) env.PIKK_API_URL = url;
  return spawnSync(process.execPath, [script], { env, encoding: 'utf8', timeout: 5000 });
};

test('live API smoke script parses as valid JavaScript', () => {
  const result = spawnSync(process.execPath, ['--check', script], { encoding: 'utf8', timeout: 5000 });
  assert.equal(result.status, 0, result.stderr);
});

test('live API smoke requires explicit target', () => {
  const result = run();
  assert.equal(result.status, 2);
  assert.match(result.stderr, /Set PIKK_API_URL/);
});

test('live API smoke rejects malformed URLs before making requests', () => {
  const result = run('not-a-url');
  assert.equal(result.status, 2);
  assert.match(result.stderr, /not a valid URL/);
});

for (const url of [
  'http://localhost:8787/',
  'https://user:password@example.com/',
  'https://example.com/path',
  'https://example.com/?debug=1',
  'https://example.com/#fragment',
]) {
  test('live API smoke rejects unsafe target: ' + url, () => {
    const result = run(url);
    assert.equal(result.status, 2);
    assert.match(result.stderr, /HTTPS origin/);
  });
}

test('live API smoke refuses to report success when the target is unreachable', () => {
  // Reserved local TLS port: a connection failure must fail closed rather than
  // counting a missing deployment as a successful smoke test.
  const result = run('https://127.0.0.1:1/');
  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /FAIL live API smoke/);
  assert.doesNotMatch(result.stdout, /PASS read-only live smoke checks/);
});

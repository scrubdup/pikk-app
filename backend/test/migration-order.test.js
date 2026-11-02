// Guard for backend/migrations numbering (see backend/README.md "Migration numbering").
// - Always: every file is NNNN_lower_snake.sql and no two files share a prefix.
// - No gaps (0001..N contiguous): only when GITHUB_BASE_REF is unset, i.e. on main / local runs.
//   PR CI sets GITHUB_BASE_REF, and a PR that lands out of the agreed order (e.g. 0013 before
//   0008-0012) would otherwise fail, so gaps are tolerated there. Duplicates never are.
// - migrations/RESERVED.json lists numbers held for PRs not yet merged; they count as present for
//   the gap check. A file may use a reserved number with any slug (the value is a human hint only);
//   delete the entry once that migration lands.
import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import reserved from '../migrations/RESERVED.json';

const names = env.TEST_MIGRATIONS.map((m) => m.name);
const parse = (n) => /^(\d{4})_[a-z0-9_]+\.sql$/.exec(n);
const isPrRun = !!(env.GITHUB_BASE_REF || (typeof process !== 'undefined' && process.env?.GITHUB_BASE_REF));

describe('migration order', () => {
  it('has at least one migration', () => expect(names.length).toBeGreaterThan(0));

  it('uses strict NNNN_lower_snake.sql names', () => {
    const bad = names.filter((n) => !parse(n));
    expect(bad, `bad migration names: ${bad.join(', ')}`).toEqual([]);
  });

  it('RESERVED.json keys are 4-digit numbers', () => {
    const bad = Object.keys(reserved).filter((k) => !/^\d{4}$/.test(k));
    expect(bad, `bad RESERVED.json keys: ${bad.join(', ')}`).toEqual([]);
  });

  it('has no duplicate numeric prefixes', () => {
    const nums = names.map((n) => parse(n)?.[1]).filter(Boolean);
    const dupes = [...new Set(nums.filter((n, i) => nums.indexOf(n) !== i))];
    expect(dupes, `duplicate migration prefixes: ${dupes.join(', ')}`).toEqual([]);
  });

  it.skipIf(isPrRun)('is contiguous from 0001 with no skipped numbers (main only)', () => {
    // Check 0001..highest real file; reserved numbers fill holes, reservations above the top are ignored.
    const real = names.map((n) => Number(parse(n)?.[1]));
    const nums = [...real, ...Object.keys(reserved).map(Number)];
    const top = Math.max(...real);
    const missing = [];
    for (let i = 1; i <= top; i++) if (!nums.includes(i)) missing.push(String(i).padStart(4, '0'));
    expect(missing, `skipped migration numbers: ${missing.join(', ')}`).toEqual([]);
  });
});

import { describe, it, expect } from 'vitest';
import { shouldMigrate, main } from '../scripts/migrate-if-main.mjs';
import wranglerRaw from '../wrangler.jsonc?raw';

const fake = () => { const calls = []; const run = (...a) => { calls.push(a); return { status: 0 }; }; return { calls, run }; };

describe('migrate-if-main gate', () => {
  it('migrates only on Workers Builds main', () => {
    expect(shouldMigrate({ WORKERS_CI: '1', WORKERS_CI_BRANCH: 'main' }).ok).toBe(true);
    const f = fake();
    expect(main({ WORKERS_CI: '1', WORKERS_CI_BRANCH: 'main' }, f.run)).toBe(0);
    expect(f.calls).toHaveLength(1);
    expect(f.calls[0][1]).toEqual(['wrangler', 'd1', 'migrations', 'apply', 'DB', '--remote']);
  });
  for (const env of [
    {}, { WORKERS_CI_BRANCH: 'main' }, { WORKERS_CI: '1' },
    { WORKERS_CI: '1', WORKERS_CI_BRANCH: 'feature/pikk-vault-media-slice1' },
    { WORKERS_CI: '1', WORKERS_CI_BRANCH: 'Main' }, { WORKERS_CI: '1', WORKERS_CI_BRANCH: 'main ' },
    { WORKERS_CI: '1', WORKERS_CI_BRANCH: '' }, { WORKERS_CI: '0', WORKERS_CI_BRANCH: 'main' },
  ]) {
    it(`never migrates for ${JSON.stringify(env)}`, () => {
      const f = fake();
      expect(shouldMigrate(env).ok).toBe(false);
      expect(main(env, f.run)).toBe(0);
      expect(f.calls).toHaveLength(0);
    });
  }
  it('propagates wrangler failure on main', () => {
    expect(main({ WORKERS_CI: '1', WORKERS_CI_BRANCH: 'main' }, () => ({ status: 3 }))).toBe(3);
  });
  it('wrangler.jsonc has no build command that touches remote D1', () => {
    const src = wranglerRaw
      .split('\n').filter(l => !l.trim().startsWith('//')).join('\n');
    expect(src).not.toMatch(/"build"\s*:/);
    expect(src).not.toMatch(/--remote/);
  });
});

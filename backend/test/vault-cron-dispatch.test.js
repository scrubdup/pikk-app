import { describe, it, expect } from 'vitest';
import worker from '../src/index.js';
import { runVaultCron } from '../src/vault-cron.js';
describe('cron dispatcher', () => {
  it('worker exports a scheduled() handler', () => { expect(typeof worker.scheduled).toBe('function'); });
  it('runVaultCron takes (env, event, now)', () => { expect(runVaultCron.length).toBe(2); });
});

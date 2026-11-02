import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { runVaultCron } from '../src/vault-cron.js';

describe('Vault cron with no MEDIA binding', () => {
  it('skips cleanly even when enabled', async () => {
    const r = await runVaultCron({ ...env, MEDIA: undefined, VAULT_CRON_ENABLED: 'true' }, {});
    expect(r).toEqual({ skipped: expect.stringMatching(/not configured/) });
  });
});

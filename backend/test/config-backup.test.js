import { describe, it, expect } from 'vitest';
import { env } from 'cloudflare:test';
import { runVaultCron } from '../src/vault-cron.js';
import { backupHealth } from '../src/backup.js';
import { BACKUP } from '../src/media-config.js';
import cfg from '../wrangler.jsonc?raw';

describe('Vault backup with no MEDIA_BACKUP binding', () => {
  it('wrangler.jsonc does not mention MEDIA_BACKUP as a deploy binding', () => {
    expect(cfg).not.toMatch(/"r2_buckets"\s*:/);
  });
  it('backup cron records a skipped run and does not throw', async () => {
    const r = await runVaultCron({ ...env, MEDIA_BACKUP: undefined, VAULT_CRON_ENABLED: 'true' }, { cron: BACKUP.cron });
    expect(r.state).toBe('skipped');
    expect(r.message).toMatch(/MEDIA_BACKUP missing/);
  });
  it('backup health reports not configured', async () => {
    const h = await backupHealth({ ...env, MEDIA_BACKUP: undefined });
    expect(h.configured).toBe(false);
    expect(h.reachable).toBe(false);
    expect(h.error).toMatch(/not configured/);
  });
});

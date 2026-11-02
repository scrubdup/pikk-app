import { describe, it, expect, beforeEach } from 'vitest';
import { env, createScheduledController, createExecutionContext, waitOnExecutionContext } from 'cloudflare:test';
import worker from '../src/index.js';
import { runVaultCron } from '../src/vault-cron.js';
import { PROCESSING, BACKUP } from '../src/media-config.js';

const fire = async (e, cron = PROCESSING.sweeperCron) => {
  const ctx = createExecutionContext();
  await worker.scheduled(createScheduledController({ scheduledTime: Date.now(), cron }), e, ctx);
  await waitOnExecutionContext(ctx);
};
const lastRun = async () => (await env.DB.prepare(`SELECT value FROM vault_settings WHERE key='sweeper_last_run'`).first())?.value ?? null;

describe('cron dispatcher + VAULT_CRON_ENABLED gate', () => {
  beforeEach(async () => {
    await env.DB.prepare(`DELETE FROM vault_settings WHERE key='sweeper_last_run'`).run();
    await env.DB.prepare(`DELETE FROM vault_backup_runs WHERE trigger='cron'`).run();
  });
  it('index.js exports exactly one scheduled() taking (event, env, ctx)', () => {
    expect(typeof worker.scheduled).toBe('function');
    expect(worker.scheduled.length).toBe(3);
  });
  it('flag unset: scheduled() runs nothing', async () => {
    await fire({ ...env, VAULT_CRON_ENABLED: undefined });
    expect(await lastRun()).toBeNull();
    expect(await runVaultCron({ ...env, VAULT_CRON_ENABLED: 'false' }, { cron: PROCESSING.sweeperCron })).toMatchObject({ skipped: expect.any(String) });
  });
  it('flag "true": scheduled() actually runs the Vault sweeper', async () => {
    await fire({ ...env, VAULT_CRON_ENABLED: 'true' });
    expect(JSON.parse(await lastRun())).toMatchObject({ at: expect.any(String) });
  });
  const cronBackups = async () => (await env.DB.prepare(`SELECT COUNT(*) AS n FROM vault_backup_runs WHERE trigger='cron'`).first()).n;
  it('flag unset: backup cron does not run runBackup', async () => {
    await fire({ ...env }, BACKUP.cron);
    expect(await cronBackups()).toBe(0);
    expect(await lastRun()).toBeNull();
  });
  it('flag "true": backup cron calls runBackup (not the sweeper)', async () => {
    await fire({ ...env, VAULT_CRON_ENABLED: 'true' }, BACKUP.cron);
    expect(await cronBackups()).toBe(1);
    expect(await lastRun()).toBeNull();
  });
  it('flag "true": any other cron calls scheduledTick (not runBackup)', async () => {
    await fire({ ...env, VAULT_CRON_ENABLED: 'true' }, '0 * * * *');
    expect(await cronBackups()).toBe(0);
    expect(JSON.parse(await lastRun())).toMatchObject({ at: expect.any(String) });
  });
});

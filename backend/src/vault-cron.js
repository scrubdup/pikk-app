// PIKK Vault cron work, kept out of index.js so the Worker's single scheduled()
// handler can dispatch to Vault and other modules (e.g. Master Mind #336) with one line each.
import { scheduledTick } from './processing.js';
import { runBackup } from './backup.js';
import { BACKUP } from './media-config.js';

// Argument order matches runMasterMindScheduled(env, event, now).
export async function runVaultCron(env, event, now = Date.now()) {
  // Daily backup cron runs the backup export; every other cron runs the sweeper/drain tick.
  if (event && event.cron === BACKUP.cron) return runBackup(env, 'cron');
  return scheduledTick(env);
}

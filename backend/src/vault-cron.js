// PIKK Vault cron work, kept out of index.js so the Worker's single scheduled()
// dispatcher can call Vault and other modules (e.g. Master Mind #336) with one line each.
import { scheduledTick } from './processing.js';

// Off switch: Vault cron work runs only when env.VAULT_CRON_ENABLED === 'true'.
// Unset by default, so a deployed cron trigger fires but does nothing until the owner turns it on.
export const vaultCronEnabled = (env) => !!env && env.VAULT_CRON_ENABLED === 'true';

// Argument order matches runMasterMindScheduled(env, event, now).
export async function runVaultCron(env, event, now = Date.now()) {
  if (!vaultCronEnabled(env)) return { skipped: 'VAULT_CRON_ENABLED is not "true"' };
  return scheduledTick(env);
}

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

/**
 * Wrap the Worker so every cron also runs runVaultCron, without touching index.js's scheduled() text.
 * If the worker has its own scheduled() (e.g. #336's Master Mind dispatcher) it runs first, isolated;
 * Vault work is added via ctx.waitUntil and is still gated by VAULT_CRON_ENABLED === 'true'.
 */
export function withVaultCron(worker) {
  const inner = typeof worker.scheduled === 'function' ? worker.scheduled : null;
  return {
    ...worker,
    async scheduled(event, env, ctx) {
      const now = Date.now();
      const vault = Promise.resolve().then(() => runVaultCron(env, event, now));
      ctx.waitUntil(vault.catch(e => console.error('scheduled task failed', e && e.message)));
      if (inner) {
        try { await inner.call(worker, event, env, ctx); } catch (e) { console.error('scheduled task failed', e && e.message); }
      }
    },
  };
}

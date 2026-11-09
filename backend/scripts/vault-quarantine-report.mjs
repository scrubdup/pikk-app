#!/usr/bin/env node
/**
 * Local operator report for Vault cleanup quarantine / R2-pending rows.
 * Does NOT talk to production. Intended for Miniflare / local D1 inspection via vitest harness
 * or a future `wrangler d1 execute --local` wrapper.
 *
 * Usage (from backend/):
 *   node --experimental-vm-modules ./scripts/vault-quarantine-report.mjs
 * Or import { quarantineReport } from '../src/processing.js' in a local test.
 *
 * Prints SQL operators can run locally:
 */
const sql = `
-- Quarantined (permanent key/retry failures); object may still exist in R2
SELECT id, owner_id, media_type, object_key, last_error, updated_at
FROM media
WHERE state='deleted' AND last_error LIKE 'cleanup: quarantined:%'
ORDER BY updated_at DESC
LIMIT 100;

-- Retryable R2 cleanup backlog (abandoned + cancel)
SELECT id, owner_id, last_error, updated_at
FROM media
WHERE state='deleted' AND last_error LIKE '%r2 delete pending%'
ORDER BY updated_at ASC
LIMIT 100;
`;
console.log('Vault quarantine / R2-pending local SQL (no production):\n' + sql);
console.log('Programmatic: import { quarantineReport } from "../src/processing.js" then quarantineReport(env).');
console.log('Admin JSON sample also on GET /vault/health (admin.access) under cleanup.quarantined_sample.');

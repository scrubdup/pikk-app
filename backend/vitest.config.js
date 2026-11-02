import { defineConfig } from 'vitest/config';
import { cloudflareTest, readD1Migrations } from '@cloudflare/vitest-plugin';
import path from 'node:path';

export default defineConfig(async () => {
  const migrations = await readD1Migrations(path.join(import.meta.dirname, 'migrations'));
  return {
    plugins: [cloudflareTest({
      wrangler: { configPath: './wrangler.jsonc' },
      miniflare: {
        // Slice 4: isolated restore target (test-only; never in wrangler.jsonc).
        d1Databases: ['RESTORE_DB'],
        r2Buckets: ['RESTORE_MEDIA'],
        bindings: {
          TEST_MIGRATIONS: migrations,
          EXPOSE_VERIFY_TOKEN: 'true',
          STRIPE_WEBHOOK_SECRET: 'whsec_local_test_only_not_a_real_secret',
          AGE_VERIFY_WEBHOOK_SECRET: 'agev_local_test_only_not_a_real_secret',
          VAULT_SIGNING_KEY: 'vault_local_test_only_not_a_real_signing_key_0123456789',
        },
      },
    })],
    test: { setupFiles: ['./test/apply-migrations.js'] },
  };
});

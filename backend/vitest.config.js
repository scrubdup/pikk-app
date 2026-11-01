import { defineConfig } from 'vitest/config';
import { cloudflareTest, readD1Migrations } from '@cloudflare/vitest-plugin';
import path from 'node:path';

export default defineConfig(async () => {
  const migrations = await readD1Migrations(path.join(import.meta.dirname, 'migrations'));
  return {
    plugins: [cloudflareTest({
      wrangler: { configPath: './wrangler.jsonc' },
      miniflare: {
        bindings: {
          TEST_MIGRATIONS: migrations,
          EXPOSE_VERIFY_TOKEN: 'true',
          STRIPE_WEBHOOK_SECRET: 'whsec_local_test_only_not_a_real_secret',
          AGE_VERIFY_WEBHOOK_SECRET: 'agev_local_test_only_not_a_real_secret',
        },
      },
    })],
    test: { setupFiles: ['./test/apply-migrations.js'] },
  };
});

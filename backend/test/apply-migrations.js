import { applyD1Migrations, env } from 'cloudflare:test';
await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
// LOCAL ONLY: owner-pending additive migrations (backend/migrations-pending/). Never applied to production.
await applyD1Migrations(env.DB, env.TEST_PENDING_MIGRATIONS, 'd1_migrations_pending');

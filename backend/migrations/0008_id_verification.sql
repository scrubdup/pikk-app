-- Ledger-name match: production d1_migrations already records "0008_id_verification.sql"
-- (applied 2026-11-02 by a PR build). Keeping this exact name means wrangler never re-runs it
-- on production, while fresh DBs still get the column. SQLite has no ADD COLUMN IF NOT EXISTS.
-- Tables for ID verification live in 0013 (CREATE ... IF NOT EXISTS). Do not rename this file.
ALTER TABLE users ADD COLUMN age_verification_ref TEXT;

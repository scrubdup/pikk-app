# PIKK Vault (backend) — LOCAL ONLY, not deployed

## Object keys & shared bucket (prefix isolation)
- Vault shares ONE R2 bucket (`env.MEDIA`) with main's music uploads (PIKK Backend decision): music uses `music/<user_id>/...`, Vault uses `vault/<media_type>/<owner_id>/<media_id>` (was `u/<owner>/<id>`).
- `src/vault-keys.js` is the only way Vault builds, deletes or lists keys: `vaultKey()`, `assertVaultKey()`, `vaultDelete()`, `vaultList()`. Any key not shaped `vault/<type>/<owner>/<id>` (other prefix, traversal, extra segments) throws `VaultKeyError`. Delete, list, backup and restore paths all go through the guard.
- Backup copies live at `objects/vault/<type>/<owner>/<id>` in `MEDIA_BACKUP` (`vaultBackupKey()`); backup refuses non-vault source rows and restore refuses manifest entries whose `object_key`/`backup_key` fall outside vault/. Multipart cancel/assemble, content reads, processing rejects and the Story sweep are guarded too.
- Tests: `test/vault-prefix.test.js` and `test/vault-prefix-storage.test.js` plant a `music/` object and checks it survives every Vault operation.

## Slice 3: processing, Story sweeper, admin controls (migration `0010_vault_processing.sql`)
- **States:** `pending_upload → uploaded → processing → ready | failed` (`rejected` on spoofed type at complete). `POST /media/:id/complete` sniffs + hashes, then returns **202** with `state: processing` and a queued `probe` job. Nothing is playable until `ready`: `/media/:id/content` and `/access-url` require `ready` for everyone, owner included.
- **Jobs:** `processing_jobs` (job_type, state queued/running/succeeded/failed, attempts, max_attempts=3, last_error, run_after, timestamps). Transient errors retry with backoff (`PROCESSING.backoffMs`); content mismatches fail immediately and delete the object. Stuck `running` jobs are reclaimed after 10 min by the cron.
- **Processor:** in-Worker, kicked via `ctx.waitUntil` from complete/retry/resume (`src/processing.js`, `inWorkerProcessor`). `setProcessor()` is the swap point for a Cloudflare Queues producer later (needs owner approval; not used).
- **Probe:** re-validates magic bytes; PNG/GIF/WebP/JPEG dimensions; WAV/FLAC/MP4/MOV/M4A duration. MP3/OGG/WebM duration = `null`. Thumbnails and video variants are `unavailable_pending_provider` (never faked).
- **Story sweeper:** `scheduled()` on a free Cron Trigger `*/15 * * * *` (`wrangler.jsonc` → `triggers.crons`). Soft-deletes expired stories (`state=deleted`, `deleted_at`), deletes their R2 objects, writes `media.story_expired` audit rows, then drains due jobs. Local: `npx wrangler dev --test-scheduled` then `curl "http://localhost:8787/__scheduled?cron=*/15+*+*+*+*"`.
- **Cron off switch:** `index.js` has ONE `scheduled()` dispatcher that calls `runVaultCron(env, event, now)` from `src/vault-cron.js` (Master Mind's #336 adds its own line). `runVaultCron` does nothing unless the var `VAULT_CRON_ENABLED` is exactly `"true"`; it is unset by default (not in `wrangler.jsonc` vars), so a deployed cron trigger no-ops until the owner turns it on.
- **Admin (admin.access, all audited):** `GET /vault/jobs?state=queued|running|succeeded|failed`, `POST /vault/jobs/:id/retry` (failed only; resets attempts), `POST /vault/processing/pause|resume` (flag in D1 `vault_settings`, optional `{reason}`).
- **Health additions** (`GET /vault/health`, slice 1 fields unchanged; `counts_by_state` gains `processing`): `processing.{processor, paused, paused_since, backlog{queued,running,oldest_queued_at}, jobs_by_state, failed_jobs, last_failed_job, thumbnails, video_variants}`, `sweeper.{cron, last_run_at, last_run}`, `heartbeat_at`.

## Slice 4: storage management, resumable uploads, backup/recovery (migration `0014_vault_storage.sql`)
- Quotas: `VAULT_QUOTA` in `src/media-config.js` (temporary default 5 GB/user, alert at 80%); per-user overrides via `PUT /vault/admin/quotas/:userId` (admin, audited). Pending uploads reserve quota. Over quota: `413 quota_exceeded`.
- Usage: `GET /vault/usage` (self), `GET /vault/admin/usage`, `GET /vault/admin/stats` (backlog, failures 24h, active multipart, stale pending). Costs are reported as `unavailable` (no billing source).
- Resumable uploads: `POST /media/uploads {multipart:true, part_size}` → `PUT /media/uploads/:id/parts/:n` (max 3 attempts per part, 429 `part_retry_limit`) → `GET .../parts` to resume → `POST .../parts/complete` → `POST /media/:id/complete` (same sniff/checksum/processing path). Cancel: `DELETE /media/uploads/:id` (aborts R2 multipart, frees quota).
- Backup: daily cron `30 3 * * *` (gated by `VAULT_CRON_ENABLED`, like the sweeper) (+ `POST /vault/admin/backups/run`) copies ready objects to the separate `MEDIA_BACKUP` binding with R2 sha256 verification and writes `manifests/<run>.json` + `manifests/latest.json` (media metadata + entitlements + `deleted_entries` owner-delete snapshot, no account data). Owner-delete also writes `deletes/<media_id>.json` markers and prunes that media's backup object + `media_backups` row (retry/quarantine on failure). `media_backups` inserts are conditional on the row still being ready+live.
- Restore: `restoreBackup({sourceBucket,targetDb,targetBucket,confirmIsolatedTarget:true, ...})` — **code-enforced** isolated use (`confirmIsolatedTarget` required). Verifies size+sha256; skips missing owners; skips ids in deletion authority (target tombstones + manifest `deleted_entries` + `deletes/` markers + optional `extraDeletedIds` / `deletionSnapshotDb`). Fail closed when deletion authority is incomplete (old manifest without `deleted_entries` and no D1-derived ids). Conditional upsert refuses to clear live tombstones; post-put recheck drops raced objects. **Honest limits:** restore does **not** claim global byte erasure; a same-bucket `deletes/` ledger is **insufficient** under marker-write outage while prior backup bytes remain — supply D1 Time Travel/export ids before disaster restore, and purge quarantined leftovers flagged by `quarantineReport` (`backup_object_present`). Not exposed over HTTP. Users come from D1 Time Travel/export.
- Planned, not done: backup retention deletion (policy 30 days placeholder — not an undelete policy), measured RPO/RTO, production restore drill, cost source. Thumbnails remain `unavailable_pending_provider` (paid Images).
- LOCAL ONLY: `MEDIA` and `MEDIA_BACKUP` are placeholder buckets; nothing provisioned.

## Abandoned unfinished uploads (cleanup)
- Cron path `cleanupAbandonedUploads` (via `scheduledTick` / `runVaultCron` when `VAULT_CRON_ENABLED=true` and MEDIA is bound) soft-deletes `pending_upload` and `uploaded` rows older than `PENDING_UPLOAD_TTL_HOURS` (24h), aborts active multipart, deletes the vault R2 object, writes `media.upload_abandoned` audit.
- Owner cancel remains `DELETE /media/uploads/:id` (immediate). Ready/processing media is never touched by this sweeper.
- Stats still report `stale_pending_uploads_24h` for operators.

## Media processing audit (what exists vs missing)
| Capability | Status |
|---|---|
| Magic-byte sniff + declared MIME match on complete | Implemented |
| SHA-256 checksum of stored object | Implemented |
| In-Worker probe job (dimensions / some durations) | Implemented (PNG/GIF/WebP/JPEG dims; WAV/FLAC/MP4/MOV/M4A duration; MP3/OGG/WebM duration=null) |
| State machine pending→uploaded→processing→ready/failed/rejected | Implemented |
| Story TTL soft-delete sweeper | Implemented (cron gated) |
| Thumbnails / image variants | **NOT implemented** — `unavailable_pending_provider` (paid Images) |
| Video transcoding / adaptive variants | **NOT implemented** — `unavailable_pending_provider` |
| Cloudflare Queues processor | Not used (swap point exists; needs owner approval) |
| Stream / Images paid providers | Not integrated |

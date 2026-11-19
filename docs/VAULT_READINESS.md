# Vault Readiness

## Current state

- Route stubs exist at `/vault/*`
- Clear 503 responses when R2 is not bound
- Auth required on all Vault endpoints

## To go live

1. Create the R2 bucket:
   ```bash
   npx wrangler r2 bucket create pikk-vault
   ```

2. Uncomment the R2 binding in `backend/wrangler.toml`:
   ```toml
   [[r2_buckets]]
   binding = "VAULT_BUCKET"
   bucket_name = "pikk-vault"
   ```

3. Implement signed upload URL generation in `backend/src/routes/vault.ts`

4. Add frontend upload helper that:
   - Requests a signed URL from `/vault/upload-url`
   - PUTs the file directly to R2
   - Registers the object metadata (future table)

## Future tables (when ready)

```sql
CREATE TABLE media_objects (
  id TEXT PRIMARY KEY,
  owner_id INTEGER NOT NULL,
  key TEXT NOT NULL,
  content_type TEXT,
  size INTEGER,
  created_at TEXT NOT NULL,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);
```

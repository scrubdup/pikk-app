# PIKK Backend (Engine)

Cloudflare Workers + Hono + D1 + R2

## Vault (Complete)

Media storage is ready. Only requires the R2 bucket to be created and bound.

### One-time setup
```bash
cd backend
npx wrangler r2 bucket create pikk-vault
# Then uncomment the [[r2_buckets]] block in wrangler.toml and redeploy
```

### API
| Method | Path | Description |
|--------|------|-------------|
| POST | `/vault/objects` | Register object metadata → returns upload instructions |
| PUT | `/vault/objects/:id/content` | Stream file bytes into R2 |
| GET | `/vault/objects/:id/content` | Stream file bytes from R2 |
| GET | `/vault/objects` | List your objects |
| GET | `/vault/objects/:id` | Get metadata |
| DELETE | `/vault/objects/:id` | Soft-delete + remove from R2 |

### Example flow
```bash
# 1. Register
curl -X POST $API/vault/objects -H "Content-Type: application/json" -d '{"filename":"clip.mp4","contentType":"video/mp4"}'

# 2. Upload (use the id from step 1)
curl -X PUT $API/vault/objects/<id>/content -H "Content-Type: video/mp4" --data-binary @clip.mp4

# 3. Download
curl $API/vault/objects/<id>/content -o downloaded.mp4
```

## Other Systems

| System | Status |
|--------|--------|
| Auth / Engine | Strong |
| Vault | **Complete** (needs R2 bind) |
| Broadcast + Connectors | D1-backed, no real OAuth/ingest |
| Payments | Full TEST MODE |
| Support | Tickets + stub AI |
| Shield + Moderation | Foundation |
| Supervisor | Job queue + runners |
| Master Mind | Admin overview + activity |

## Setup
```bash
cd backend
npm install
npx wrangler d1 create pikk-db   # paste ID into wrangler.toml
npm run db:migrate               # 0001 → 0005
npx wrangler r2 bucket create pikk-vault
# uncomment R2 block in wrangler.toml
npm run dev
```

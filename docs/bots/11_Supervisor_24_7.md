# PIKK Supervisor — 24/7 Operations (Scaffold)

Status: structure only. Not deployed. Aligned with `PIKK_AI_Supervisor_24_7_Plan.md`.

## Role
Always-on coordinator that monitors PIKK systems, routes incidents to specialized workers, and only executes explicitly allowed, reversible actions.

## Boundaries
- Does **not** replace Broadcast Bot or existing Grok bots
- Does **not** auto-deploy, auto-refund, or auto-moderate sensitive cases
- Requires continuous hosting (cannot run only on owner's phone)

## Worker registry (planned)

| Worker | Responsibility | Auto-allowed |
|--------|----------------|--------------|
| Broadcast | Stream health, ingest alerts, destination failures | Read + bounded retry |
| QA | Staging smoke tests, capture failures | Staging only |
| Media | Upload/transcode job health | Idempotent retries |
| Commerce | Webhook delivery monitoring | Read-only |
| Connect/Dating Safety | Error + report signals | Escalate to human |
| Deployment | PR checks, stage releases | Never production without approval |

## Approval gates
- Auto: health checks, staging tests, notifications, safe retries
- Human required: production deploy, rollback, refunds, policy changes, deletions
- Never: credential scraping, private message access, irreversible silent changes

## Build order (from plan)
S1 Inventory + baseline metrics  
S2 Supervisor service + DB + queues  
S3 Broadcast telemetry  
S4 QA + Media workers  
S5 Commerce + Safety (read-only)  
S6 Gated remediation + audit + rollout  

## Current state
- Instruction file exists
- No running service
- No Redis/Postgres supervisor tables yet
- Existing Engine auth + Broadcast stubs are the foundation to monitor later

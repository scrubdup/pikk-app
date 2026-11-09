# Vault DOM live standalone (review)

Runnable copy of the independent review's live DOM harness (`zz-review-vault-dom-live.test.mjs`).

- **Not** included in `npm test` (requires a local wrangler Worker on :8799).
- Uses **linkedom**, not a real browser.
- Always use an **isolated temp persist dir** and delete it after the run.
- Config: `wrangler.review-local.jsonc` (local R2 bindings only; never deploy).

## Run

```bash
# from repo root (this worktree)
STATE_DIR=$(mktemp -d /tmp/vault-dom-live-XXXX)
cleanup() { kill "$WRANGLER_PID" 2>/dev/null || true; rm -rf "$STATE_DIR"; }
trap cleanup EXIT

npx wrangler dev -c scripts/review/wrangler.review-local.jsonc   --ip 127.0.0.1 --port 8799 --persist-to "$STATE_DIR" &
WRANGLER_PID=$!

for i in $(seq 1 60); do
  curl -sf http://127.0.0.1:8799/health >/dev/null && break
  sleep 1
done

node --test scripts/review/vault-dom-live-standalone.mjs
```

Teardown is handled by `trap cleanup EXIT` (kills wrangler, removes `$STATE_DIR`).

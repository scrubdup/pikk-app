#!/usr/bin/env bash
# Test gate: runs backend vitest, frontend node --test and the vite build for a task's
# branch, and records pass/fail in the local DB. Usage: scripts/test-gate.sh <task-id>
set -euo pipefail
HERE="$(cd "$(dirname "$0")/.." && pwd)"
REPO="${OCC_REPO:-$(cd "$HERE/.." && pwd)}"
[ $# -eq 1 ] || { echo "usage: $0 <task-id>"; exit 2; }
exec python3 "$HERE/occ.py" gate "$1" --repo "$REPO"

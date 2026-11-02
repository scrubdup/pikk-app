#!/usr/bin/env bash
# Push ONLY branches that passed the test gate AND were approved by the owner (recorded in the DB).
# Pushes the exact approved commit. Never pushes main/master, never force-pushes, never deploys.
# Opening and merging the pull request still happens on GitHub with the normal Checker audit.
set -euo pipefail
HERE="$(cd "$(dirname "$0")/.." && pwd)"
REPO="${OCC_REPO:-$(cd "$HERE/.." && pwd)}"
DRY="${1:-}"
git -C "$REPO" ls-remote --exit-code origin >/dev/null 2>&1 || { echo "offline: nothing pushed, try again later"; exit 0; }
python3 "$HERE/occ.py" sync-list | while read -r id branch sha; do
  case "$branch" in main|master|""|-*) echo "skip task $id: protected or unsafe branch"; continue;; esac
  git check-ref-format --branch "$branch" >/dev/null 2>&1 || { echo "skip task $id: invalid branch name"; continue; }
  if [ "$(git -C "$REPO" rev-parse --verify --quiet "refs/heads/$branch^{commit}" 2>/dev/null)" != "$sha" ]; then
    echo "skip task $id: $branch moved after approval; run the gate and approve again"; continue
  fi
  if [ "$DRY" = "--dry-run" ]; then echo "would push $branch ($sha)"; continue; fi
  git -C "$REPO" push origin "$sha:refs/heads/$branch" && python3 "$HERE/occ.py" mark-synced "$id" \
    && echo "pushed $branch ($sha) for task $id"
done

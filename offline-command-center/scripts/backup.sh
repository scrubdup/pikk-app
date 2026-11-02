#!/usr/bin/env bash
# Timestamped backup of the local DB plus a git bundle of every branch. Keeps the newest $KEEP.
set -euo pipefail
HERE="$(cd "$(dirname "$0")/.." && pwd)"
REPO="${OCC_REPO:-$(cd "$HERE/.." && pwd)}"
DB="${OCC_DB:-$HOME/.pikk-occ/occ.db}"
DEST="${OCC_BACKUP_DIR:-$HOME/.pikk-occ/backups}"
KEEP="${OCC_BACKUP_KEEP:-14}"
STAMP="$(date +%Y%m%d-%H%M%S)"
mkdir -p "$DEST"
if [ -f "$DB" ]; then
  python3 -c 'import sqlite3,sys; s=sqlite3.connect(sys.argv[1]); d=sqlite3.connect(sys.argv[2]); s.backup(d); d.close()' "$DB" "$DEST/occ-$STAMP.db"
fi
git -C "$REPO" bundle create "$DEST/pikk-app-$STAMP.bundle" --all
for pat in 'occ-*.db' 'pikk-app-*.bundle'; do
  ls -1t "$DEST"/$pat 2>/dev/null | tail -n +"$((KEEP + 1))" | while read -r old; do rm -f -- "$old"; done
done
echo "backup written to $DEST ($STAMP)"

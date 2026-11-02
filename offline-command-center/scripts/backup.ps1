# Windows: timestamped backup of the local DB plus a git bundle of every branch. Keeps the newest $Keep.
param(
  [string]$Repo = (Resolve-Path "$PSScriptRoot\..\.."),
  [string]$Db = $(if ($env:OCC_DB) { $env:OCC_DB } else { "$HOME\.pikk-occ\occ.db" }),
  [string]$Dest = $(if ($env:OCC_BACKUP_DIR) { $env:OCC_BACKUP_DIR } else { "$HOME\.pikk-occ\backups" }),
  [int]$Keep = 14
)
$ErrorActionPreference = "Stop"
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
New-Item -ItemType Directory -Force -Path $Dest | Out-Null
if (Test-Path $Db) {
  python -c "import sqlite3,sys; s=sqlite3.connect(sys.argv[1]); d=sqlite3.connect(sys.argv[2]); s.backup(d); d.close()" $Db "$Dest\occ-$stamp.db"
}
git -C $Repo bundle create "$Dest\pikk-app-$stamp.bundle" --all
foreach ($pat in "occ-*.db", "pikk-app-*.bundle") {
  Get-ChildItem -Path $Dest -Filter $pat | Sort-Object LastWriteTime -Descending | Select-Object -Skip $Keep | Remove-Item -Force
}
Write-Host "backup written to $Dest ($stamp)"

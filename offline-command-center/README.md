# PIKK Master Mind — Offline Command Center

This folder lets **your own computer** keep PIKK development going when ChatGPT, Grok or the internet
is down. Everything here is free and open source. Nothing here deploys the live app, and nothing
reaches GitHub until the tests pass **and** you approve it.

How it works, in one picture:

```
task queue (occ.py) → local AI agent edits code on a branch (Aider + Ollama)
   → test gate (scripts/test-gate.sh) → YOU approve (occ.py approve)
   → sync.sh pushes that branch when you're back online → normal PR + Checker audit on GitHub
```

## 1. What your computer needs

| | Minimum | Better |
|---|---|---|
| Memory (RAM) | 16 GB (runs 7B models) | 32 GB+ (runs 14B models comfortably) |
| Graphics | Not required (CPU works, just slower) | Apple M1/M2/M3/M4, or an NVIDIA card with 8 GB+ (7B) / 12–16 GB+ (14B) |
| Free disk | 20 GB | 50 GB+ (each model is 4–9 GB) |

Honest note: local models are noticeably weaker than ChatGPT or Grok. They're good for small,
well-described fixes. Keep tasks small, and always let the tests and your approval decide.

## 2. Install the tools (one time)

### Mac
1. Open **Terminal** (press Cmd+Space, type "Terminal").
2. Install Homebrew (free installer) from https://brew.sh — copy the one line it shows into Terminal.
3. Run: `brew install git node@20 python@3.12`
4. Install Ollama: download from https://ollama.com/download and open it.
5. Install Aider: `python3 -m pip install aider-install && aider-install`

### Windows
1. Install **Git** from https://git-scm.com/download/win (keep default options).
2. Install **Node.js 20 LTS** from https://nodejs.org.
3. Install **Python 3** from https://www.python.org/downloads/ — tick **"Add python.exe to PATH"**.
4. Install **Ollama** from https://ollama.com/download.
5. Open **PowerShell** and run: `python -m pip install aider-install; aider-install`

Alternative to Aider: **OpenHands** (https://github.com/All-Hands-AI/OpenHands) is a free, open-source
agent with a web window. It needs Docker Desktop, which is heavier; Aider is the simpler start.

## 3. Download free models (while you're online)

```
ollama pull qwen2.5-coder:7b     # best default for code, ~4.7 GB, 16 GB RAM
ollama pull qwen2.5-coder:14b    # smarter, ~9 GB, needs 32 GB RAM or a 16 GB GPU
ollama pull llama3.1:8b          # general writing/planning, ~4.9 GB
```

## 4. Get the PIKK code on your computer

```
git clone https://github.com/scrubdup/pikk-app.git
cd pikk-app
npm ci                      # app tools
cd backend && npm ci && cd ..   # server tools
```
Do this while online. After that, the code and the tests work without internet.

## 5. Run the tests yourself

```
cd backend && npm test && cd ..   # server tests
npm test                          # app tests
npm run build                     # make sure the app builds
```

## 6. Use the task queue

The queue is a small database file on your computer (`~/.pikk-occ/occ.db`). It needs only Python.
(On Windows type `python` instead of `python3`.)

```
python3 offline-command-center/occ.py init
python3 offline-command-center/occ.py add "Fix typo on Music tab" --agent design --branch fix/music-typo
python3 offline-command-center/occ.py list
python3 offline-command-center/occ.py claim design                 # an agent takes the next task
python3 offline-command-center/occ.py progress 1 "edited the label" --percent 50
python3 offline-command-center/occ.py handoff 1 backend --note "needs an API change"
python3 offline-command-center/occ.py log-error "build failed" --task 1
python3 offline-command-center/occ.py status
```

To have a local AI do the work: `git checkout -b fix/music-typo`, then
`aider --model ollama_chat/qwen2.5-coder:7b`, and paste the task plus the matching file from
`docs/agent-instructions/` (each PIKK bot's role and standing rules; start with `_STANDING_RULES.md`).

## 7. Test gate and your approval

```
offline-command-center/scripts/test-gate.sh 1          # runs server tests, app tests, build; records pass/fail
python3 offline-command-center/occ.py approve 1        # only works after a pass; asks you to type APPROVE 1
```
The gate tests a fresh, separate copy of the branch's latest commit (not whatever you have open), installs packages from your local npm cache, and cleans the copy up afterwards.
Approval is tied to the exact version that passed. If anything changes afterwards, run the gate again.
Approval can't run unattended — it needs you at the keyboard.

## 8. Backups

- Mac: `offline-command-center/scripts/backup.sh`
- Windows: `powershell -File offline-command-center\scripts\backup.ps1`

Each run saves a dated copy of the task database and a git "bundle" (a single file holding the
whole code history) in `~/.pikk-occ/backups`, keeping the newest 14. To schedule it daily: Mac —
`crontab -e` and add `0 21 * * * /path/to/pikk-app/offline-command-center/scripts/backup.sh`;
Windows — Task Scheduler → Create Basic Task → run `powershell -File ...\backup.ps1`.

## 9. Sync when you're back online

`offline-command-center/scripts/sync.sh` (add `--dry-run` to preview). It pushes **only** branches
that passed the gate and that you approved, exactly as approved. It never pushes `main`, never
force-pushes and never deploys. On GitHub, open a draft PR as usual; the Progress Checker audits it
and the normal merge rules apply. Windows: run it from **Git Bash** (installed with Git).

## Rules this folder follows
Free/open-source only, no paid services, no secrets in files, no database migrations, no changes to the
live app, no unattended deploys. Full agent rules: `docs/agent-instructions/_STANDING_RULES.md`.
Developer tests: `python3 -m unittest discover -s offline-command-center/tests`.

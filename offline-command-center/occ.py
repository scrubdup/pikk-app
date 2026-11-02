#!/usr/bin/env python3
"""PIKK Master Mind - Offline Command Center CLI (Python 3 standard library only).

Local task queue for the owner's computer. It never deploys anything and never
pushes to main. See README.md.
"""
import argparse
import json
import os
import shutil
import sqlite3
import subprocess
import sys
import tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
SCHEMA = HERE / "schema.sql"
PROTECTED_BRANCHES = {"main", "master"}

# The test gate: the same suites CI runs (backend vitest, frontend node --test, vite build).
# Runs inside a clean temporary worktree of the exact commit, so dependencies are installed first
# (`--prefer-offline` uses the local npm cache, so this works without internet after one online install).
DEFAULT_GATE = [
    ("backend install", ["npm", "ci", "--prefer-offline", "--no-audit", "--no-fund"], "backend"),
    ("frontend install", ["npm", "ci", "--prefer-offline", "--no-audit", "--no-fund"], "."),
    ("backend tests (vitest)", ["npm", "test"], "backend"),
    ("frontend tests (node --test)", ["npm", "test"], "."),
    ("build (vite)", ["npm", "run", "build"], "."),
]


def db_path():
    return os.environ.get("OCC_DB") or str(Path.home() / ".pikk-occ" / "occ.db")


def connect(path=None):
    path = path or db_path()
    if path != ":memory:":
        Path(path).parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db(conn):
    conn.executescript(SCHEMA.read_text(encoding="utf-8"))
    conn.commit()


def get_task(conn, task_id):
    row = conn.execute("SELECT * FROM tasks WHERE id=?", (task_id,)).fetchone()
    if row is None:
        raise SystemExit(f"error: task {task_id} not found")
    return row


def set_status(conn, task_id, status, **extra):
    cols = ", ".join(f"{k}=?" for k in extra)
    sql = "UPDATE tasks SET status=?, updated_at=strftime('%Y-%m-%dT%H:%M:%SZ','now')"
    sql += (", " + cols if cols else "") + " WHERE id=?"
    conn.execute(sql, (status, *extra.values(), task_id))


def valid_branch(branch):
    """True for a safe feature-branch name: not main/master, no leading dash, valid git ref."""
    if not branch or branch in PROTECTED_BRANCHES or branch.startswith("-"):
        return False
    try:
        r = subprocess.run(["git", "check-ref-format", "--branch", branch], capture_output=True, text=True)
    except OSError:
        return False
    return r.returncode == 0 and r.stdout.strip() == branch


def check_branch(branch):
    if branch is None:
        return
    if not valid_branch(branch):
        raise SystemExit(f"error: '{branch}' is not an allowed branch (feature branches only, valid git name)")


def git_head(repo, branch):
    try:
        check_branch(branch)
        ref = f"refs/heads/{branch}^{{commit}}" if branch else "HEAD"
        out = subprocess.run(["git", "-C", str(repo), "rev-parse", "--verify", "--quiet", ref],
                             capture_output=True, text=True, check=True)
        return out.stdout.strip()
    except (OSError, subprocess.CalledProcessError):
        return None


# ---- commands -------------------------------------------------------------

def add_task(conn, title, description="", agent=None, branch=None):
    check_branch(branch)
    cur = conn.execute("INSERT INTO tasks(title, description, agent, branch) VALUES (?,?,?,?)",
                       (title, description, agent, branch))
    conn.commit()
    return cur.lastrowid


def list_tasks(conn, status=None, agent=None):
    sql, params = "SELECT * FROM tasks WHERE 1=1", []
    if status:
        sql += " AND status=?"; params.append(status)
    if agent:
        sql += " AND agent=?"; params.append(agent)
    return conn.execute(sql + " ORDER BY id", params).fetchall()


def claim(conn, agent, task_id=None):
    """Claim a specific task, or the oldest open task for this agent (or unassigned)."""
    if task_id is None:
        row = conn.execute("SELECT id FROM tasks WHERE status='open' AND (agent IS NULL OR agent=?) "
                           "ORDER BY id LIMIT 1", (agent,)).fetchone()
        if row is None:
            return None
        task_id = row["id"]
    cur = conn.execute("UPDATE tasks SET status='claimed', agent=?, "
                       "updated_at=strftime('%Y-%m-%dT%H:%M:%SZ','now') "
                       "WHERE id=? AND status='open'", (agent, task_id))
    conn.commit()
    return task_id if cur.rowcount == 1 else None


def handoff(conn, task_id, to_agent, note=""):
    task = get_task(conn, task_id)
    conn.execute("INSERT INTO handoffs(task_id, from_agent, to_agent, note) VALUES (?,?,?,?)",
                 (task_id, task["agent"], to_agent, note))
    # A handoff returns the task to the queue for the new agent; any old gate/approval no longer counts.
    set_status(conn, task_id, "open", agent=to_agent)
    conn.commit()


def log_error(conn, message, task_id=None, agent=None):
    if task_id is not None:
        get_task(conn, task_id)
    conn.execute("INSERT INTO errors(task_id, agent, message) VALUES (?,?,?)", (task_id, agent, message))
    conn.commit()


def add_progress(conn, task_id, note, agent=None, percent=None):
    get_task(conn, task_id)
    conn.execute("INSERT INTO progress(task_id, agent, note, percent) VALUES (?,?,?,?)",
                 (task_id, agent, note, percent))
    conn.commit()


def run_gate(conn, task_id, repo, commands=None, runner=subprocess.run):
    """Run every gate command in a clean temporary worktree of the branch head; record pass/fail for that sha."""
    task = get_task(conn, task_id)
    if not task["branch"]:
        raise SystemExit("error: task has no branch to test")
    check_branch(task["branch"])
    repo = Path(repo)
    sha = git_head(repo, task["branch"])
    results, ok = [], sha is not None
    if sha is None:
        results.append({"step": "resolve branch", "passed": False, "rc": "branch not found"})
    else:
        tmp = tempfile.mkdtemp(prefix="occ-gate-")
        try:
            add = subprocess.run(["git", "-C", str(repo), "worktree", "add", "--detach", tmp, sha],
                                 capture_output=True, text=True)
            if add.returncode != 0:
                ok = False
                results.append({"step": "worktree add", "passed": False, "rc": add.stderr.strip()})
            else:
                for name, cmd, cwd in (commands or DEFAULT_GATE):
                    try:
                        rc = runner(cmd, cwd=str(Path(tmp) / cwd)).returncode
                    except OSError as e:
                        rc = f"could not start: {e}"
                    passed = rc == 0
                    ok = ok and passed
                    results.append({"step": name, "passed": passed, "rc": rc})
                    if not passed:
                        break
        finally:
            subprocess.run(["git", "-C", str(repo), "worktree", "remove", "--force", tmp], capture_output=True)
            shutil.rmtree(tmp, ignore_errors=True)
            subprocess.run(["git", "-C", str(repo), "worktree", "prune"], capture_output=True)
    result = "pass" if ok else "fail"
    cur = conn.execute("INSERT INTO gate_runs(task_id, branch, commit_sha, result, details) VALUES (?,?,?,?,?)",
                       (task_id, task["branch"], sha, result, json.dumps(results)))
    set_status(conn, task_id, "gate_passed" if ok else "gate_failed")
    if not ok:
        conn.execute("INSERT INTO errors(task_id, agent, message) VALUES (?,?,?)",
                     (task_id, task["agent"], "test gate failed: " + json.dumps(results)))
    conn.commit()
    return cur.lastrowid, result


def latest_gate(conn, task_id):
    return conn.execute("SELECT * FROM gate_runs WHERE task_id=? ORDER BY id DESC LIMIT 1",
                        (task_id,)).fetchone()


def approve(conn, task_id, owner, repo=None, confirm=input, interactive=None):
    """Owner approval. Needs a passing gate on the current commit and a typed confirmation."""
    task = get_task(conn, task_id)
    check_branch(task["branch"])
    interactive = sys.stdin.isatty() if interactive is None else interactive
    if not interactive:
        raise SystemExit("error: approval needs the owner at the keyboard; it cannot run unattended")
    gate = latest_gate(conn, task_id)
    if gate is None or gate["result"] != "pass" or task["status"] != "gate_passed":
        raise SystemExit("error: no passing test gate for this task; run `occ.py gate` first")
    if repo is not None:
        head = git_head(repo, task["branch"])
        if head != gate["commit_sha"]:
            raise SystemExit("error: branch changed since the gate passed; run the gate again")
    print(f"Task {task_id}: {task['title']}\nBranch: {task['branch']}  Commit: {gate['commit_sha']}")
    print("Approving lets sync.sh push this branch to GitHub (never main, never a deploy).")
    answer = confirm(f"Type APPROVE {task_id} to confirm: ")
    if answer.strip() != f"APPROVE {task_id}":
        raise SystemExit("not approved (confirmation text did not match)")
    conn.execute("INSERT INTO approvals(task_id, gate_run_id, branch, commit_sha, approved_by) VALUES (?,?,?,?,?)",
                 (task_id, gate["id"], task["branch"], gate["commit_sha"], owner))
    set_status(conn, task_id, "approved")
    conn.commit()


def sync_candidates(conn):
    """Branches that are approved after a passing gate, with the exact commit approved."""
    rows = conn.execute(
        "SELECT t.id, a.branch, a.commit_sha FROM tasks t "
        "JOIN approvals a ON a.id = (SELECT MAX(id) FROM approvals WHERE task_id=t.id) "
        "JOIN gate_runs g ON g.id = a.gate_run_id AND g.result='pass' "
        "WHERE t.status='approved' AND a.branch IS NOT NULL AND a.commit_sha IS NOT NULL "
        "ORDER BY t.id").fetchall()
    return [r for r in rows if valid_branch(r["branch"])]


def mark_synced(conn, task_id):
    if get_task(conn, task_id)["status"] != "approved":
        raise SystemExit("error: only approved tasks can be marked synced")
    set_status(conn, task_id, "synced")
    conn.commit()


def status_summary(conn):
    counts = {r["status"]: r["n"] for r in conn.execute("SELECT status, COUNT(*) n FROM tasks GROUP BY status")}
    errors = conn.execute("SELECT COUNT(*) FROM errors").fetchone()[0]
    return {"tasks": counts, "errors": errors}


# ---- CLI ------------------------------------------------------------------

def main(argv=None):
    p = argparse.ArgumentParser(prog="occ.py", description="PIKK Offline Command Center task queue")
    p.add_argument("--db", help="database file (default: $OCC_DB or ~/.pikk-occ/occ.db)")
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("init")
    a = sub.add_parser("add"); a.add_argument("title"); a.add_argument("--description", default="")
    a.add_argument("--agent"); a.add_argument("--branch")
    l = sub.add_parser("list"); l.add_argument("--status"); l.add_argument("--agent")
    c = sub.add_parser("claim"); c.add_argument("agent"); c.add_argument("--task", type=int)
    h = sub.add_parser("handoff"); h.add_argument("task", type=int); h.add_argument("to_agent")
    h.add_argument("--note", default="")
    e = sub.add_parser("log-error"); e.add_argument("message"); e.add_argument("--task", type=int)
    e.add_argument("--agent")
    g = sub.add_parser("progress"); g.add_argument("task", type=int); g.add_argument("note")
    g.add_argument("--agent"); g.add_argument("--percent", type=int)
    t = sub.add_parser("gate", help="run the test gate for a task and record pass/fail")
    t.add_argument("task", type=int); t.add_argument("--repo", default=str(HERE.parent))
    ap = sub.add_parser("approve"); ap.add_argument("task", type=int)
    ap.add_argument("--owner", default="owner"); ap.add_argument("--repo", default=str(HERE.parent))
    sub.add_parser("sync-list", help="print approved branch/commit pairs for sync.sh")
    ms = sub.add_parser("mark-synced"); ms.add_argument("task", type=int)
    sub.add_parser("status")
    args = p.parse_args(argv)

    conn = connect(args.db)
    init_db(conn)
    if args.cmd == "init":
        print(f"database ready: {args.db or db_path()}")
    elif args.cmd == "add":
        print(add_task(conn, args.title, args.description, args.agent, args.branch))
    elif args.cmd == "list":
        for r in list_tasks(conn, args.status, args.agent):
            print(f"{r['id']}\t{r['status']}\t{r['agent'] or '-'}\t{r['branch'] or '-'}\t{r['title']}")
    elif args.cmd == "claim":
        tid = claim(conn, args.agent, args.task)
        if tid is None:
            print("nothing to claim"); return 1
        print(tid)
    elif args.cmd == "handoff":
        handoff(conn, args.task, args.to_agent, args.note)
    elif args.cmd == "log-error":
        log_error(conn, args.message, args.task, args.agent)
    elif args.cmd == "progress":
        add_progress(conn, args.task, args.note, args.agent, args.percent)
    elif args.cmd == "gate":
        _, result = run_gate(conn, args.task, args.repo)
        print(result); return 0 if result == "pass" else 1
    elif args.cmd == "approve":
        approve(conn, args.task, args.owner, repo=args.repo)
        print("approved")
    elif args.cmd == "sync-list":
        for r in sync_candidates(conn):
            print(f"{r['id']} {r['branch']} {r['commit_sha']}")
    elif args.cmd == "mark-synced":
        mark_synced(conn, args.task)
    elif args.cmd == "status":
        print(json.dumps(status_summary(conn), indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())

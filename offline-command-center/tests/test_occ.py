import io
import os
import subprocess
import sys
import tempfile
import unittest
from contextlib import redirect_stdout
from pathlib import Path
from types import SimpleNamespace

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import occ  # noqa: E402

PASS = lambda cmd, cwd=None: SimpleNamespace(returncode=0)  # noqa: E731
FAIL = lambda cmd, cwd=None: SimpleNamespace(returncode=1)  # noqa: E731
STEPS = [("step", ["true"], ".")]


class OccTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.conn = occ.connect(os.path.join(self.tmp.name, "t.db"))
        occ.init_db(self.conn)
        self.repo = Path(self.tmp.name, "repo")
        self.repo.mkdir()
        self.git("init", "-q", "-b", "feature/x")
        self.commit("check.sh", "exit 0\n", "clean")

    def tearDown(self):
        self.conn.close()
        self.tmp.cleanup()

    def git(self, *a):
        return subprocess.run(["git", "-C", str(self.repo), "-c", "user.email=t@t", "-c", "user.name=t", *a],
                              check=True, capture_output=True, text=True).stdout.strip()

    def commit(self, name, body, msg):
        (self.repo / name).write_text(body)
        self.git("add", name)
        self.git("commit", "-q", "-m", msg)

    def worktrees(self):
        return self.git("worktree", "list").count("\n") + 1

    def gated(self, runner=PASS):
        tid = occ.add_task(self.conn, "fix", agent="backend", branch="feature/x")
        occ.run_gate(self.conn, tid, self.repo, STEPS, runner)
        return tid

    def approve(self, tid):
        with redirect_stdout(io.StringIO()):
            occ.approve(self.conn, tid, "owner", repo=self.repo, confirm=lambda _: f"APPROVE {tid}",
                        interactive=True)

    def test_init_is_idempotent(self):
        occ.init_db(self.conn)
        names = {r[0] for r in self.conn.execute("SELECT name FROM sqlite_master WHERE type='table'")}
        self.assertTrue({"tasks", "handoffs", "errors", "progress", "gate_runs", "approvals"} <= names)

    def test_add_list_claim(self):
        a = occ.add_task(self.conn, "one")
        occ.add_task(self.conn, "two", agent="design")
        self.assertEqual(len(occ.list_tasks(self.conn)), 2)
        self.assertEqual(occ.claim(self.conn, "backend"), a)
        self.assertIsNone(occ.claim(self.conn, "backend"))  # design's task is not backend's
        self.assertIsNone(occ.claim(self.conn, "x", a))     # already claimed
        self.assertEqual(occ.list_tasks(self.conn, status="claimed")[0]["agent"], "backend")

    def test_bad_branch_names_rejected(self):
        for bad in ["main", "master", "-x", "--force", "a..b", "bad name", "x~1"]:
            with self.subTest(bad=bad), self.assertRaises(SystemExit):
                occ.add_task(self.conn, "bad", branch=bad)
        self.assertTrue(occ.valid_branch("feature/ok-1"))

    def test_handoff_records_and_reassigns(self):
        tid = self.gated()
        occ.handoff(self.conn, tid, "design", "needs styling")
        t = occ.get_task(self.conn, tid)
        self.assertEqual((t["agent"], t["status"]), ("design", "open"))
        h = self.conn.execute("SELECT * FROM handoffs").fetchone()
        self.assertEqual((h["from_agent"], h["to_agent"]), ("backend", "design"))

    def test_errors_and_progress(self):
        tid = occ.add_task(self.conn, "t")
        occ.log_error(self.conn, "boom", tid, "backend")
        occ.add_progress(self.conn, tid, "half", "backend", 50)
        self.assertEqual(occ.status_summary(self.conn)["errors"], 1)
        self.assertEqual(self.conn.execute("SELECT percent FROM progress").fetchone()[0], 50)

    def test_gate_fail_logs_error(self):
        tid = self.gated(FAIL)
        self.assertEqual(occ.latest_gate(self.conn, tid)["result"], "fail")
        self.assertEqual(occ.get_task(self.conn, tid)["status"], "gate_failed")
        self.assertEqual(occ.status_summary(self.conn)["errors"], 1)

    def test_gate_missing_branch_fails(self):
        tid = occ.add_task(self.conn, "fix", branch="feature/nope")
        _, result = occ.run_gate(self.conn, tid, self.repo, STEPS, PASS)
        self.assertEqual(result, "fail")

    def test_gate_runs_branch_head_not_checkout(self):
        """Regression (Checker REJECT @2d1cf59): failing branch gated while a clean branch is checked out."""
        self.git("checkout", "-q", "-b", "feature/bad")
        self.commit("check.sh", "exit 1\n", "broken")
        bad_sha = self.git("rev-parse", "HEAD")
        self.git("checkout", "-q", "feature/x")            # clean branch checked out
        before = self.worktrees()
        tid = occ.add_task(self.conn, "bad", branch="feature/bad")
        _, result = occ.run_gate(self.conn, tid, self.repo, [("check", ["sh", "check.sh"], ".")])
        self.assertEqual(result, "fail")
        self.assertEqual(occ.latest_gate(self.conn, tid)["commit_sha"], bad_sha)
        self.assertEqual(self.worktrees(), before)          # temp worktree removed
        with self.assertRaises(SystemExit):
            self.approve(tid)
        self.assertEqual(occ.sync_candidates(self.conn), [])
        # and the clean branch passes with the same real command
        ok = occ.add_task(self.conn, "ok", branch="feature/x")
        self.assertEqual(occ.run_gate(self.conn, ok, self.repo, [("check", ["sh", "check.sh"], ".")])[1], "pass")
        self.assertEqual(self.worktrees(), before)

    def test_approve_requires_passing_gate(self):
        tid = self.gated(FAIL)
        with self.assertRaises(SystemExit):
            self.approve(tid)

    def test_approve_requires_interactive_and_exact_text(self):
        tid = self.gated()
        with self.assertRaises(SystemExit):
            occ.approve(self.conn, tid, "owner", confirm=lambda _: f"APPROVE {tid}", interactive=False)
        with redirect_stdout(io.StringIO()), self.assertRaises(SystemExit):
            occ.approve(self.conn, tid, "owner", confirm=lambda _: "yes", interactive=True)
        self.assertEqual(occ.sync_candidates(self.conn), [])

    def test_approve_then_sync_candidates(self):
        tid = self.gated()
        self.approve(tid)
        self.assertEqual([r["branch"] for r in occ.sync_candidates(self.conn)], ["feature/x"])
        occ.mark_synced(self.conn, tid)
        self.assertEqual(occ.sync_candidates(self.conn), [])

    def test_sync_drops_protected_and_unsafe_branches(self):
        tid = self.gated()
        self.approve(tid)
        for bad in ["main", "master", "-evil"]:
            self.conn.execute("UPDATE approvals SET branch=?", (bad,))
            with self.subTest(bad=bad):
                self.assertEqual(occ.sync_candidates(self.conn), [])

    def test_approve_rejects_moved_branch(self):
        tid = self.gated()
        self.commit("other.txt", "x", "2")
        with self.assertRaises(SystemExit):
            self.approve(tid)

    def test_cli_smoke(self):
        db = os.path.join(self.tmp.name, "cli.db")
        with redirect_stdout(io.StringIO()) as out:
            self.assertEqual(occ.main(["--db", db, "add", "hello", "--branch", "feature/y"]), 0)
            self.assertEqual(occ.main(["--db", db, "claim", "backend"]), 0)
            self.assertEqual(occ.main(["--db", db, "status"]), 0)
        self.assertIn('"claimed": 1', out.getvalue())


if __name__ == "__main__":
    unittest.main()

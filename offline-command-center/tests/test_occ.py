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

    def tearDown(self):
        self.conn.close()
        self.tmp.cleanup()

    def gated(self, runner=PASS):
        tid = occ.add_task(self.conn, "fix", agent="backend", branch="feature/x")
        occ.run_gate(self.conn, tid, self.tmp.name, STEPS, runner)
        return tid

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

    def test_main_branch_rejected(self):
        with self.assertRaises(SystemExit):
            occ.add_task(self.conn, "bad", branch="main")

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
        s = occ.status_summary(self.conn)
        self.assertEqual(s["errors"], 1)
        self.assertEqual(self.conn.execute("SELECT percent FROM progress").fetchone()[0], 50)

    def test_gate_fail_logs_error(self):
        tid = self.gated(FAIL)
        self.assertEqual(occ.latest_gate(self.conn, tid)["result"], "fail")
        self.assertEqual(occ.get_task(self.conn, tid)["status"], "gate_failed")
        self.assertEqual(occ.status_summary(self.conn)["errors"], 1)

    def test_approve_requires_passing_gate(self):
        tid = self.gated(FAIL)
        with self.assertRaises(SystemExit):
            occ.approve(self.conn, tid, "owner", confirm=lambda _: f"APPROVE {tid}", interactive=True)

    def test_approve_requires_interactive_and_exact_text(self):
        tid = self.gated()
        with self.assertRaises(SystemExit):
            occ.approve(self.conn, tid, "owner", confirm=lambda _: f"APPROVE {tid}", interactive=False)
        with redirect_stdout(io.StringIO()), self.assertRaises(SystemExit):
            occ.approve(self.conn, tid, "owner", confirm=lambda _: "yes", interactive=True)
        self.assertEqual(occ.sync_candidates(self.conn), [])

    def test_approve_then_sync_candidates(self):
        repo = Path(self.tmp.name, "repo")
        repo.mkdir()
        subprocess.run(["git", "-C", str(repo), "init", "-q", "-b", "feature/x"], check=True)
        subprocess.run(["git", "-C", str(repo), "-c", "user.email=t@t", "-c", "user.name=t",
                        "commit", "-q", "--allow-empty", "-m", "1"], check=True)
        tid = occ.add_task(self.conn, "fix", branch="feature/x")
        occ.run_gate(self.conn, tid, repo, STEPS, PASS)
        with redirect_stdout(io.StringIO()):
            occ.approve(self.conn, tid, "owner", repo=repo, confirm=lambda _: f"APPROVE {tid}", interactive=True)
        self.assertEqual([r["branch"] for r in occ.sync_candidates(self.conn)], ["feature/x"])
        occ.mark_synced(self.conn, tid)
        self.assertEqual(occ.sync_candidates(self.conn), [])

    def test_approve_rejects_moved_branch(self):
        repo = Path(self.tmp.name, "repo")
        git = lambda *a: subprocess.run(["git", "-C", str(repo), *a], check=True, capture_output=True)  # noqa: E731
        repo.mkdir()
        git("init", "-q", "-b", "feature/x")
        git("-c", "user.email=t@t", "-c", "user.name=t", "commit", "-q", "--allow-empty", "-m", "1")
        tid = occ.add_task(self.conn, "fix", branch="feature/x")
        occ.run_gate(self.conn, tid, repo, STEPS, PASS)
        git("-c", "user.email=t@t", "-c", "user.name=t", "commit", "-q", "--allow-empty", "-m", "2")
        with self.assertRaises(SystemExit):
            occ.approve(self.conn, tid, "owner", repo=repo, confirm=lambda _: f"APPROVE {tid}", interactive=True)

    def test_cli_smoke(self):
        db = os.path.join(self.tmp.name, "cli.db")
        with redirect_stdout(io.StringIO()) as out:
            self.assertEqual(occ.main(["--db", db, "add", "hello", "--branch", "feature/y"]), 0)
            self.assertEqual(occ.main(["--db", db, "claim", "backend"]), 0)
            self.assertEqual(occ.main(["--db", db, "status"]), 0)
        self.assertIn('"claimed": 1', out.getvalue())


if __name__ == "__main__":
    unittest.main()

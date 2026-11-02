import io
import json
import os
import subprocess
import sys
import tempfile
import time
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

    # ---- leftover-gate cleanup (Checker REJECT @3cdf4d1) ----
    def dead_pid(self):
        p = subprocess.Popen(["true"]); p.wait()
        return p.pid

    def make_gate_dir(self, root, name, owner="this", pid=None, register=True):
        folder = Path(root, name); folder.mkdir(parents=True)
        if register:
            self.git("worktree", "add", "--detach", str(folder / "wt"), "HEAD")
        if owner is not None:
            common = occ.git_common_dir(self.repo) if owner == "this" else owner
            (folder / occ.OWNER_FILE).write_text(json.dumps(
                {"pid": pid if pid is not None else self.dead_pid(), "started": 0, "repo_common_dir": common}))
        return folder

    def root(self):
        r = Path(self.tmp.name, "tmproot"); r.mkdir(exist_ok=True)
        return r.resolve()

    def test_cleanup_removes_dead_owned_gate_only(self):
        root, before = self.root(), self.worktrees()
        dead = self.make_gate_dir(root, occ.GATE_PREFIX + "dead")
        live = self.make_gate_dir(root, occ.GATE_PREFIX + "live", pid=os.getpid())
        other = self.make_gate_dir(root, occ.GATE_PREFIX + "otherrepo", owner="/elsewhere/.git", register=False)
        self.assertEqual(occ.cleanup_stale_worktrees(self.repo, root), [str(dead)])
        self.assertFalse(dead.exists()); self.assertTrue(live.exists()); self.assertTrue(other.exists())
        self.assertEqual(self.worktrees(), before + 1)

    def test_cleanup_ownerless_needs_age_and_registration(self):
        root = self.root()
        old_reg = self.make_gate_dir(root, occ.GATE_PREFIX + "oldreg", owner=None)
        young_reg = self.make_gate_dir(root, occ.GATE_PREFIX + "young", owner=None)
        old_unreg = self.make_gate_dir(root, occ.GATE_PREFIX + "oldunreg", owner=None, register=False)
        past = time.time() - 2 * occ.ORPHAN_AGE_SEC
        for f in (old_reg, old_unreg):
            os.utime(f, (past, past))
        self.assertEqual(occ.cleanup_stale_worktrees(self.repo, root), [str(old_reg)])
        self.assertTrue(young_reg.exists()); self.assertTrue(old_unreg.exists())

    def test_cleanup_ignores_non_prefixed_folder_in_tmp_root(self):
        root = self.root()
        keep = self.make_gate_dir(root, "user-worktree")
        self.assertEqual(occ.cleanup_stale_worktrees(self.repo, root), [])
        self.assertTrue(keep.exists())

    def test_cleanup_ignores_prefixed_folder_outside_tmp_root(self):
        root = self.root()
        keep = self.make_gate_dir(Path(self.tmp.name, "elsewhere"), occ.GATE_PREFIX + "mine")
        self.assertEqual(occ.cleanup_stale_worktrees(self.repo, root), [])
        self.assertTrue(keep.exists())

    def test_run_gate_does_startup_cleanup(self):
        root = self.root()
        dead = self.make_gate_dir(root, occ.GATE_PREFIX + "crashed")
        tid = occ.add_task(self.conn, "fix", branch="feature/x")
        occ.run_gate(self.conn, tid, self.repo, STEPS, PASS, tmp_root=root)
        self.assertFalse(dead.exists())

    def test_concurrent_gates_do_not_delete_each_other(self):
        root = self.root()
        a = occ.add_task(self.conn, "A", branch="feature/x")
        b = occ.add_task(self.conn, "B", branch="feature/x")
        seen = {}

        def runner_a(cmd, cwd=None):
            seen["b"] = occ.run_gate(self.conn, b, self.repo, STEPS, PASS, tmp_root=root)[1]  # B starts mid-A
            return SimpleNamespace(returncode=0 if Path(cwd).is_dir() and Path(cwd, "check.sh").exists() else 1)
        _, result_a = occ.run_gate(self.conn, a, self.repo, STEPS, runner_a, tmp_root=root)
        self.assertEqual((result_a, seen["b"]), ("pass", "pass"))
        self.assertEqual(list(root.iterdir()), [])

    def test_signal_during_gate_removes_worktree(self):
        import signal
        before = self.worktrees()
        tid = occ.add_task(self.conn, "fix", branch="feature/x")

        def interrupted(cmd, cwd=None):
            signal.raise_signal(signal.SIGTERM)
        with self.assertRaises(SystemExit):
            occ.run_gate(self.conn, tid, self.repo, STEPS, interrupted)
        self.assertEqual(self.worktrees(), before)
        self.assertEqual(signal.getsignal(signal.SIGTERM), signal.SIG_DFL)

    def test_sighup_handled_where_available(self):
        import signal
        if not hasattr(signal, "SIGHUP"):
            self.skipTest("no SIGHUP on this platform")
        before = self.worktrees()
        tid = occ.add_task(self.conn, "fix", branch="feature/x")
        with self.assertRaises(SystemExit):
            occ.run_gate(self.conn, tid, self.repo, STEPS, lambda c, cwd=None: signal.raise_signal(signal.SIGHUP))
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

# t212u REJECT fix — unread badge clear

**Cause:** `ensureDemoUnreadMessages()` ran on every tabbar rebuild. After `markThreadRead`, unread hit 0, then seed rewound `lastReadAt` and put badge back to 2.

**Fix:**
- `demoUnreadSeeded` one-shot flag in `dbs_v1`; never rewind after seed/read (`lastReadAt > 0`).
- `markThreadRead` sets the flag + dispatches `dbs:messages-unread`.
- `main.js` listens → `refreshTabBadges()`.

**Evidence:** `/workspace/dbs-evidence/phase2/tabbar-t212u/FIX-unread.md`

**Re-audit:** open MayaBeats thread → badge drops; navigate Home → badge stays cleared. **PENDING AUDIT.**

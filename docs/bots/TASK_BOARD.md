# PIKK Master Task Board

**Owner:** PIKK Supervisor  
**Last updated:** 2026-11-16  
**Rule:** This is the single accurate task board. All bots and the human owner should treat it as source of truth.

## Legend

- **TODO** — Not started
- **IN PROGRESS** — Actively being worked
- **BLOCKED** — Waiting on dependency or decision
- **REVIEW** — Waiting for Supervisor or QA review
- **DONE** — Accepted with evidence

---

## Active Work

| ID | Task | Owner Bot | Status | Notes / Acceptance |
|----|------|-----------|--------|--------------------|
| BOT-001 | Establish permanent 12-bot instruction set in repo | Supervisor | DONE | Completed 2026-11-16 |
| BOT-002 | Baseline current frontend + STATUS against new PIKK roles | Supervisor + QA | TODO | Map existing DONE items to new bot ownership |
| BOT-003 | Define next highest-priority production slice (auth / vault / payments / live) | Supervisor | TODO | Needs human direction |

---

## Backlog (High Level)

- Production auth + sessions (Engine)
- Secure media vault foundation (Vault)
- Payment webhooks + memberships (Payments)
- Live donation goals + battles reliability (Live)
- Shop seller flows (Shop)
- Stories + ad-free enforcement (Stories/Ads)
- Admin command center hardening (Master Mind)
- Ongoing QA regression suite (QA)

---

## Handoff Log

| Date | From | To | Summary |
|------|------|----|---------|
| 2026-11-16 | Human + Supervisor | All bots | Official 12-bot team instructions committed to `docs/bots/`. Team is now durable. |

---

## Notes for Supervisor

- When a bot completes a slice, require evidence before moving to DONE.
- Keep this board short and current. Archive completed sections periodically if it grows too long.
- Any major scope change to a bot must be reflected in that bot’s instruction file and noted here.

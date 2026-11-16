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

## Current Focus (Supervisor Decision 2026-11-16)

**Highest priority area needing the most work:**  
**PIKK Engine / Backend**

**Why:** The entire app is still a pure frontend Vite SPA with only localStorage. There is zero production database, authentication, session handling, or real API layer. Almost every other bot (Vault, Payments, Live, Shop, Master Mind, etc.) is blocked until a solid Engine foundation exists.

---

## Active Work

| ID | Task | Owner Bot | Status | Notes / Acceptance |
|----|------|-----------|--------|--------------------|
| BOT-001 | Establish permanent 12-bot instruction set in repo | Supervisor | DONE | Completed 2026-11-16 |
| ENG-001 | Choose backend stack + project structure | Engine + Supervisor | IN PROGRESS | Decision needed on stack |
| ENG-002 | Core auth: signup, login, logout, /auth/me, secure cookie sessions | Engine | TODO | Production-grade required |
| ENG-003 | Email verification flow | Engine | TODO | |
| ENG-004 | Basic permissions / roles model | Engine | TODO | |
| ENG-005 | Database migrations + first schema (users + sessions) | Engine | TODO | |
| BOT-002 | Baseline current frontend against new PIKK roles | Supervisor + QA | TODO | Can run in parallel |

---

## Backlog (High Level)

**Engine (current focus)**
- Production auth + sessions
- Core APIs
- Background jobs foundation
- Recovery patterns

**Next after Engine foundation is solid**
- Secure media vault (Vault)
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
| 2026-11-16 | Human + Supervisor | All bots | Official 12-bot team instructions committed. Team is now durable. |
| 2026-11-16 | Supervisor | Engine | Declared Engine/Backend as highest priority. First slices defined (ENG-001 → ENG-005). |

---

## Notes for Supervisor

- When a bot completes a slice, require evidence before moving to DONE.
- Keep this board short and current.
- Any major scope change to a bot must be reflected in that bot’s instruction file and noted here.

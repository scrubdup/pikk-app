# PIKK Master Task Board

**Owner:** PIKK Supervisor  
**Last updated:** 2026-11-19  
**Rule:** This is the single accurate task board. All bots and the human owner should treat it as source of truth.

## Legend

- **TODO** — Not started
- **IN PROGRESS** — Actively being worked
- **BLOCKED** — Waiting on dependency or decision
- **REVIEW** — Waiting for Supervisor or owner review
- **DONE** — Accepted with evidence

---

## Current Focus (Supervisor Decision 2026-11-19)

**Highest priority area needing the most work:**  
**Engine / Backend Operations**

**Why:** The entire app is still a pure frontend Vite SPA with only localStorage. There is zero production database, authentication, session handling, or real API layer. Almost every other bot (Vault, Payments, Broadcast/Live, Master Mind, etc.) is blocked until a solid Engine foundation exists.

---

## Active Work

| ID | Task | Owner Bot | Status | Notes / Acceptance |
|----|------|-----------|--------|--------------------|
| BOT-001 | Establish permanent 12-bot instruction set | Supervisor | DONE | Completed 2026-11-16 |
| BOT-003 | Rebuild official 10-bot roster + instruction files | Supervisor | **DONE** | Completed 2026-11-19. New roster locked. |
| ENG-001 | Choose backend stack + project structure | Engine + Supervisor | IN PROGRESS | Decision needed on stack |
| ENG-002 | Core auth: signup, login, logout, /auth/me, secure cookie sessions | Engine | TODO | Production-grade required |
| ENG-003 | Email verification flow | Engine | TODO | |
| ENG-004 | Basic permissions / roles model | Engine | TODO | |
| ENG-005 | Database migrations + first schema (users + sessions) | Engine | TODO | |

---

## Official Bot Roster (locked 2026-11-19)

1. PIKK Supervisor
2. Master Mind
3. Engine / Backend Operations
4. Vault
5. Shield
6. Payments & Payouts
7. Revenue Dashboard
8. Broadcast / Live Operations
9. AI Support
10. Trust & Safety

---

## Backlog (High Level)

**Engine (current focus)**
- Production auth + sessions
- Core APIs
- Background jobs foundation
- Recovery patterns

**Next after Engine foundation is solid**
- Secure media vault (Vault)
- Payment webhooks + memberships + gifts (Payments & Payouts)
- Live reliability + multistream (Broadcast / Live)
- Owner control center (Master Mind)
- Moderation queues (Trust & Safety)
- Support ticket system (AI Support)

---

## Handoff Log

| Date | From | To | Summary |
|------|------|----|---------|
| 2026-11-16 | Human + Supervisor | All bots | Official 12-bot team instructions committed. |
| 2026-11-16 | Supervisor | Engine | Declared Engine/Backend as highest priority. |
| 2026-11-19 | Owner + Supervisor | All bots | Official 10-bot roster defined and committed. Old specialized bots (Shop, Stories, Design, QA) folded or retired from main roster. |

---

## Notes for Supervisor

- When a bot completes a slice, require evidence before moving to DONE.
- Keep this board short and current.
- Any major scope change to a bot must be reflected in that bot’s instruction file and noted here.

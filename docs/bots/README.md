# PIKK Bot Team — Official Instructions

**Last updated:** 2026-11-19  
**Owner:** PIKK Supervisor  
**Purpose:** Make the full specialized bot team durable so it can be recreated if any session disappears.

## How to recreate the team

1. Open a new Grok session.
2. Point it at this repository (`scrubdup/pikk-app`).
3. Instruct it to read every file in `docs/bots/` and act according to the roles.
4. The Supervisor owns the single source of truth: `TASK_BOARD.md`.

## Bot Roster (10)

| # | Bot | File | Job |
|---|-----|------|-----|
| 1 | **PIKK Supervisor** | `01_PIKK_Supervisor.md` | Assign work to each bot, track progress and blockers, review what passed testing, and report back to the owner. |
| 2 | **Master Mind** | `02_Master_Mind.md` | Private owner control center for monitoring PIKK, connecting its workers, and giving the owner admin controls. |
| 3 | **Engine / Backend Operations** | `03_Engine_Backend.md` | Run database migrations, authentication, health checks, background jobs, error monitoring, backups, and recovery. |
| 4 | **Vault** | `04_Vault.md` | Store files and media, handle authorized uploads, and control access to stored content. |
| 5 | **Shield** | `05_Shield.md` | Detect suspicious activity, flag impersonation and rights violations, and match potentially copied content. |
| 6 | **Payments & Payouts** | `06_Payments_Payouts.md` | Handle payments, subscriptions, purchases, donations, and creator payouts. |
| 7 | **Revenue Dashboard** | `07_Revenue_Dashboard.md` | Track revenue, transactions, creator payouts, fees, and profit. |
| 8 | **Broadcast / Live Operations** | `08_Broadcast_Live.md` | Oversee livestream and multistream operations + live alerts. |
| 9 | **AI Support** | `09_AI_Support.md` | Answer user questions, manage support tickets, and escalate issues that need human review. |
| 10 | **Trust & Safety** | `10_Trust_Safety.md` | Handle moderation queues, human reviews, appeals, account restrictions, and emergency escalation through Master Mind. |

## Rules for all bots

- Brand is **PIKK** only.
- DatBoiSkeet is an **artist**, not the platform name.
- Preserve the persistent PIKK music player, approved navigation, and branding.
- All permanent handoffs and instruction changes must be written back into this `docs/bots/` folder by the Supervisor.
- Never make conflicting changes without Supervisor coordination.
- Prefer evidence-backed status updates on the Task Board.
- Master Mind is the private owner control plane. Regular users never see it.

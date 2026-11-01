# PIKK Roast Arena and PIKK Battles: two separate systems

Source spec: MASTER_HANDOFF.md, section "ROAST ARENA AND BATTLES — SEPARATE SYSTEMS"; docs/owner-requirements/MASTER_FEATURES.md §7.
Inventory date: 2026-10-31. Branch inspected: feat/pikk-home-top-mockup-20261031 (origin/main 2125f7a). Test suite: 249 pass / 0 fail.

## 1. PIKK Roast Arena (comedy/roast battles)
### Target user flow
1. A comedian browses Upcoming / Live / Top Roasters / Clips and either requests a battle or receives an invite.
2. Both contestants accept, explicitly consent to being roasted, and see the automated on-screen rules. No human host is involved.
3. The match runs split-screen in the chosen format: 1v1, Tag-Team, Open Mic or Tournament.
4. Each timed round is followed by a voting window. Each eligible viewer gets one vote per round, and voting locks automatically.
5. Audience votes alone decide the winner. Gifts are tallied separately as "most supported." Ties go to a tiebreaker, and a rematch poll follows.
6. Tournament results advance through a bracket. Clips and Top Roasters update.
7. Report, mute and removal tools are available throughout, with escalation to human review.

### Current state
| Requirement | Status | Evidence |
|---|---|---|
| 1v1 round/vote/score engine | Working and unit-tested, but local only | src/roast-engine.js:6-34; tests/roast-engine.test.mjs |
| Tag-Team, Open Mic, Tournament | Missing (shown only as chips) | src/pages/roast-arena.js:44 |
| No host, automated rules | Text only, plus a local demo timer | roast-arena.js:45,48-57 |
| Split-screen video | Missing | none |
| Timed rounds | Hardcoded values: 60s round, 10s vote, 10s rematch, 3 rounds. **UNVERIFIED** | roast-engine.js:2-5 |
| Invites, acceptance, consent | Missing (text only) | roast-arena.js:50,65 |
| One vote per eligible viewer per round | Missing: only a local `voted` flag, with no identity or eligibility check | roast-arena.js:29 |
| Votes and gifts kept separate | Engine has a `gifts` field that is never written. Separation is stated in text only | roast-engine.js:7; roast-arena.js:61 |
| Audience votes decide the winner | Working in the local engine | roast-engine.js:24-28 |
| Tiebreaker and rematch poll | Working in the local engine and tested | roast-engine.js:27-31 |
| Brackets | Missing | none |
| Upcoming / Live / Top Roasters / Clips | Missing (text label only) | roast-arena.js:60 |
| Reporting and moderation | Missing (text only) | roast-arena.js:65-66 |
| Persistence and auth | None: module-level in-memory `demo`, no backend, no auth | roast-arena.js:5-6 |

tests/pikk-roast-arena.test.mjs only matches strings in the page copy, so it does not test behavior.

## 2. PIKK Battles (streamer vs streamer)
### Target user flow
1. A streamer who is live invites another live streamer, and the other streamer accepts or declines.
2. The two streams are shown split-screen and a one-minute countdown starts.
3. The audience sends gifts and interacts, and scores update live.
4. When the countdown ends, the winner is announced and receives a 24-hour champion badge.
5. History and leaderboards update. City Takeover runs as a city-versus-city variant.
6. Safety controls are available: report, block, decline and opt out of invites.

### Current state
| Requirement | Status | Evidence |
|---|---|---|
| Streamer vs streamer | **Mismatch**: implemented as viewer/gifter-vs-viewer against demo fans | giftbattles.js:66; store.js `listDemoBattleFans` (~2721) |
| Invites, accept, decline, opt-out | UI plus localStorage logic | store.js startGiftBattle/acceptGiftBattle/declineGiftBattle (~2771-2840); giftbattles.js:320,382 |
| Split screen | Missing: only a two-column scoreboard, no video | giftbattles.js:149-160 |
| 1-minute countdown | Working locally (GB_DURATION_MS 60_000, which matches the spec) | store.js ~2657; giftbattles.js:454 |
| Gifts and scoring | Local: score is gift amount (fmtMoney), sandbox wallet debit, TEST MODE | giftbattles.js:149-171 |
| Winner announcement | Working locally | store.js ~2690-2716; giftbattles.js:191 |
| Champion badge | **Wrong**: `championUntil` is end of the local calendar day, not 24 hours | store.js ~2716 (gbEndOfLocalDay); giftbattles.js:70 |
| Leaderboards and history | Local: history capped at 40, daily board capped at 10. Caps are **UNVERIFIED** | store.js:55, ~2659; giftbattles.js:263-304 |
| City Takeover | Missing: exists only as a category label | live.js:207; live-discovery.js:50 |
| Safety (report/block) | Missing, apart from the invite toggle | none |
| Tests | Only regression string checks in tests/pikk-regression.test.mjs. No unit tests for battle logic | |
| Persistence and auth | localStorage via store.js and a local demo account. No PIKK Backend or server auth | giftbattles.js:53 |

## Owner verification needed (no values invented)
- Roast round length (code says 60s, **unverified**), vote window (10s, **unverified**), rematch poll (10s, **unverified**), number of rounds (3, **unverified**).
- Whether rounds have any break between them, and how many tiebreaker rounds are allowed.
- Rematch rule: does it need audience majority, both contestants, or both?
- Tag-Team format: team size, turn order, and how a team's vote is counted.
- Open Mic format: queue, slot length, and how a winner is chosen.
- Tournament format: bracket size, seeding, single or double elimination, and scheduling.
- Vote eligibility: account age, verification or 18+, whether followers or paid viewers only, and anti-bot rules.
- Whether Roast Arena gifts produce a separate "most supported" award, and whether it carries prizes.
- How Top Roasters is ranked, and the source and rights for clips.
- Roast consent, content rules, moderation SLA and escalation path.
- Battles scoring formula: gift coin value, gift count, likes or other interactions, and how ties are handled.
- Whether Battles must be streamer vs streamer only (code is viewer vs viewer), and the matchmaking rules.
- 24-hour badge: starts at the win, and how it behaves on a repeat win or when a newer champion appears.
- Leaderboard windows (daily/weekly/all-time) and caps (code: 10/day and 40 history, **unverified**).
- City Takeover rules: how a city is determined, team formation, duration, scoring and rewards.
- Battle safety rules: reporting, blocking, minors, and invite rate limits.
- Real-money and gift ledger requirements: the current code is TEST MODE wallet only.

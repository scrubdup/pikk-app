# PIKK Roast Arena and PIKK Battles: two separate systems

Source spec: MASTER_HANDOFF.md, section "ROAST ARENA AND BATTLES — SEPARATE SYSTEMS"; docs/owner-requirements/MASTER_FEATURES.md §7.
Roast section updated 2026-11-02 against origin/main 3b4e321 (test suite 542 pass / 0 fail). The Battles section is still the 2026-10-31 inventory (origin/main 2125f7a) and has not been re-checked.

## 1. PIKK Roast Arena (comedy/roast battles)
### Target user flow
1. A comedian browses Upcoming / Live / Top Roasters / Clips and either requests a battle or receives an invite.
2. Both contestants accept, explicitly consent to being roasted, and see the automated on-screen rules. No human host is involved.
3. The match runs split-screen in the chosen format: 1v1, Open Mic or Tournament. There is no team mode (owner ruling t461u: Roast is 1v1 only).
4. Each timed round is followed by a voting window. Each eligible viewer gets one vote per round, and voting locks automatically.
5. Audience votes alone decide the winner. Gifts are tallied separately as "most supported." A tie after 3 rounds gets one round labeled "Tie Breaker"; if that is also tied, the match ends as a tie. After a decided match, both contestants have 5s to agree to a rematch (viewers do not vote on it); any "no" or the window closing ends the match.
6. Tournament results advance through a bracket. Clips and Top Roasters update.
7. Report, mute and removal tools are available throughout, with escalation to human review.

### Current state
| Requirement | Status | Evidence |
|---|---|---|
| 1v1 round/vote/score engine | Working and unit-tested, local TEST MODE only | src/roast-engine.js:114-135; tests/roast-engine.test.mjs (18 tests), tests/roast-owner-timings.test.mjs (9 tests) |
| Open Mic, Tournament | Missing (shown only as chips) | src/pages/roast-arena.js:133-134 |
| Team modes | Removed: not a PIKK feature (owner ruling t461u). Guarded by tests/roast-1v1-only-guard.test.mjs | |
| No host, automated rules | Local 1s timer drives round → vote → next round automatically; on-screen rules card | roast-arena.js:14-22, 54; roast-engine.js:114-135 |
| Split-screen video | Missing: two placeholder tiles ("no camera connected") | roast-arena.js:36-46 |
| Timed rounds | Owner-approved: 60s rounds, 3 rounds, 10s vote, 5s rematch window; rematch rounds are also 60s | roast-engine.js:6-12, 18-21 |
| Invites, acceptance, consent | Working locally: invite needs challenger consent, match needs opponent consent too; decline blocks the match | roast-engine.js:31-49, 51-52; roast-arena.js:24-35, 79-86 |
| One vote per eligible viewer per round | Working locally: one vote per viewer id per round, only viewers on the eligible list, contestants excluded; "X of Y eligible viewers voted" shown during voting | roast-engine.js:57-59, 68-80; roast-arena.js:59-60 |
| Votes and gifts kept separate | Working locally: `sendRoastTestGift` writes a separate TEST gift tally that never affects the winner | roast-engine.js:81-86, 119-120; roast-arena.js:43-44 |
| Audience votes decide the winner | Working in the local engine | roast-engine.js:119-125 |
| Tiebreaker and rematch | One tiebreaker round labeled "Tie Breaker", then a tie; rematch needs both contestants within 5s (rule read from `ROAST_APPROVED_RULES.rematchRequiresAllContestants`), any "no" declines, timeout expires | roast-engine.js:17, 88-106, 127-134; roast-arena.js:49-50, 62-63 |
| Vote screen | Round number (or "Tie Breaker") and both names as tap-to-vote buttons (44px) | roast-arena.js:49-50, 60 |
| Brackets | Missing | none |
| Upcoming / Live / Top Roasters / Clips | Missing (text label only) | roast-arena.js:149-150 |
| Reporting and moderation | Report stub only: `recordRoastReport` records locally on the match, nothing is sent to moderators | roast-engine.js:108-112; roast-arena.js:64-65 |
| Persistence and auth | None: per-mode in-memory `states` with fixed test viewer ids; no backend, no auth | roast-arena.js:5-10, 107-117 |

The Roast tests check behavior (engine rules, timings, vote screen, turnout and the rematch rule), not only page copy. tests/pikk-roast-arena.test.mjs (7 tests) still checks page copy.

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

## Owner rulings recorded (2026-11-02)
- **t461u: there are NO team modes anywhere in PIKK** (not in Roast Arena, live streams or any live feature). Roast is 1v1 only. The team-mode code, UI and tests were removed.
- t429u / 12:48 PM CT: 60s rounds, 3 rounds; a tie gets one tiebreaker round, then ends as a tie; contestants cannot vote; a rematch needs both contestants to agree; the page shows how many people in the room can vote.
- t443u (2:03 PM CT): "10 secs to vote players get 5 secs to rematch". Rematch rounds keep the same 60s length.
- t447u: the audience vote screen shows the round number and both contestant names; voters tap a name; a tiebreaker round is labeled "Tie Breaker".

## Owner verification needed (no values invented)
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

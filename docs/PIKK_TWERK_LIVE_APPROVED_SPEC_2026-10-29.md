# PIKK Twerk Live — complete owner-approved specification (2026-10-29)

**Status:** Requirements approved and recorded; full functionality NOT implemented or verified. Preview UI PR #149 is a draft.

## Two separate 18+ Live categories
**Twerk Solo**: Adult woman streams solo dance and receives gifts; no voting or winner. She may enable/disable challenges and accept/decline a challenge while solo. **Twerk-Off Battles**: separate competitive room for two eligible consenting adult women; fans vote after performances. Both receive gifts credited to their own accounts.

## Challenge and battle sequence
- A challenge initiated from Twerk Solo becomes a **Twerk-Off Challenge only upon acceptance**. No votes if declined, canceled, or incomplete.
- Each of the two contestants performs **30 seconds separately**, with an authoritative visible timer. The first performer leaves the main video focus after her turn; the second takes over, never keep the same girl on-screen for both turns. After both turns, authenticated eligible fans vote **one vote each** for the winner. Gift amounts never buy votes or determine the winner.
- Solo performances and ordinary noncompetitive **Next** rotations have **no votes, no winner**.
- Users can select **Next** to enter a waiting lineup. Maintain exact FIFO selection/acceptance order; automatically advance to the next performer after each 30-second turn; show active performer, time remaining and Up Next. Allow cancellation before turn. If disconnected/not ready, skip with an auditable reason without silently reordering.
- Clarify in UI whether a turn is noncompetitive solo rotation or part of a two-person challenge/battle. Do not show winner or vote UI in solo mode.
- Separate gift tallies and proper attribution; no fabricated fans, gifts, votes or active streams.

## Signup, permissions and safety
- Participation is opt-in through signup/account settings; settings allow disabling entry/participation and challenge invitations. Host must consent to each challenge.
- **18+ age assurance for performers and viewers**, enforced on server, not only self-attestation.
- Show and require agreement to **NO NUDITY** rule before entry or broadcast. No nudity or sexual acts, minors or coercion. Violations can lead to termination, suspension or ban under reviewed moderation policy, not automatic permanent ban based solely on an allegation.
- Respect app store/payment processor policies and privacy/consent/recording controls.

## Nudity reports with timestamped moderator review
- On report, capture server UTC timestamp, stream ID, reported user, reporter ID, report reason, exact playback offset/timecode and moderation case ID.
- Route to restricted admin moderation queue with severity, moderator decision, audit trail, appeal process and evidence retention/deletion policy.
- Preserve a short evidence clip **only where recording, consent and legal retention permit**; otherwise a timestamp alone does not guarantee video replay. Protect reporter identity and prevent report abuse. Support urgent stream intervention when credible severe violation is flagged.
- Never claim an actual moderation/replay system exists until it is tested.

## Build and verification plan
1. Quick win: two Coming Soon (18+) category tiles in Live discovery (staged in PR #149, **not merged or verified**).
2. Add explicit rules, participation controls and safe disabled challenge/battle previews.
3. Build age assurance, live video switching, server-side FIFO queue, authoritative timers, verified voting, gifts/payout ledger, reporting/evidence/admin review.
4. Test mobile and desktop, two performers and disconnects, voting eligibility, gift integrity, no-vote solo mode, consent, moderation, abuse prevention, and deployment before launch.

**Owner's decisive rule: fans vote ONLY for Twerk-Off Battles and accepted Twerk-Off Challenges, never regular solo twerking or Next rotation.**

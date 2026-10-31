# PIKK Live Rooms and Competition Rules — Approved Direction

## Live discovery room changes
- Remove **PIKK Battles** as a standalone general Live discovery category; preserve battles as an accessible competition feature within Live and relevant creator rooms.
- **The Booth**: rappers and hip-hop artists only; freestyles, track previews, performances and rap challenges.
- **Producer Room**: producers and beatmakers; beat showcases, production collaborations, beat competitions, links to authorized beat marketplace.
- **The Stage**: singers, bands, vocalists and instrumentalists; performances and talent showcases. Distinct from rap-focused Booth.
- **Ladies Lounge**: women-centered girl talk, beauty, fashion, lifestyle and relationship conversations, with room safety and moderation.
- **City Takeover**: city-versus-city showcases and community competition; participants choose a city affiliation, hosts organize comparable city challenges, users see matchups, local standings and event schedules. Avoid implying residency verification until built.
- Retain other previously approved live categories, subject to ongoing review.

## PIKK Battles (feature, not discovery room)
- Entrants choose a competition field: **Rapper**, **Producer**, **Singer** or **Band**.
- Match competitors within the same field, with opt-in acceptance and queue/fair scheduling.
- Each contestant performs/presents once in Round 1, then once in Round 2; audience voting happens per round.
- If combined voting scores tie, hold a tiebreaker round and vote; define fair fallback for unresolved tie/disconnect.
- Winner receives a competition badge and reward (reward type/value to be configured and approved; no unsupported promises of cash).
- Only eligible, authenticated viewers vote; prevent self-votes, duplicate votes, bot voting and bribery; define voting windows and transparent result rules.
- Gifts and top-gifter rankings are separate from fan votes; gifts must not decide battle results.
- Copyright rights/consent, age-appropriate access, harassment moderation, audio/video latency and disconnection handling required.

## Leaderboards and banners
- **Daily Champions:** scroll/display the day's winners across PIKK Live for 24 hours after qualifying win. Display up to **19** winners, with 5–19 as desired typical presentation where enough winners exist; if fewer than 5 wins, display actual winners only (never invent names). Include handle, field and badge. Define ordering/tie rules.
- **Top Gifters:** colorful, clearly labeled 7-day leaderboard with actual verified gifts, username, ranking and totals; use real ledger events, not demo values.
- Winners and top gifters are separate recognition tracks; ensure privacy settings, abuse detection and audit logs.

## Acceptance gates
- Real stream ingest, matching, turn-taking, synchronized clocks, authenticated audience vote storage, round result aggregation, tie-breaker, badge/reward issuance, leaderboards, 24-hour expiry and 7-day expiry.
- Cross-device tests, moderation, anti-fraud, reconnect/recovery and staging-to-production validation.
- UI category additions alone do not mean these features are working or live.

## City Takeover — strict same-field city-versus-city matching (approved)
- Each entrant chooses a city and a specific competition field before entering the queue. Fields: Rapper, Producer, Singer, Band, DJ, Dancer, Comedian; Other Talent only matches the same explicitly specified subcategory, never a generic miscellaneous opponent.
- **Hard match rule:** city A vs city B AND field A === field B (and subcategory equality where relevant). Never match a rapper against a singer, producer, band, DJ, dancer or comedian. No fallback cross-field matching when a queue is empty.
- Competitors with multiple talents may enroll in multiple queues, but must lock one field for each match; do not switch fields mid-battle.
- City Takeover uses the same two rounds, one turn per competitor per round, authenticated audience voting, tiebreaker if needed, badge/reward and anti-fraud/moderation rules as PIKK Battles.
- Maintain field-specific city standings and winner rankings; calculate city scores only from verified completed battles, with explicit scoring rules and anti-manipulation controls.
- Matching UI must show chosen city, field, opposing city, compatible opponents and waiting state if none are available. No simulated opponent or fabricated matchup.
- Backend must enforce category equality transactionally; do not rely on UI-only filtering. Test mismatched-field rejection, multi-field profiles, empty queues, disconnects, vote integrity and expiry of recognition banners.

## Recovered women and business room history (October 2026 planning)
Earlier names included Girl Talk, Tea Time, What's the Word?, Who Did What?, Beauty Bar, Girls' Night In, Love & Standards, Boss Ladies, Fashion & Fits, Ladies Only Live, and historically The Pink Lounge (women's social) / The Man Cave (men's sports/business/networking). Avoid confusing original discussion names with already operational services.

### Newly prioritized distinct live discovery rooms
- **What's the Word?** — tea-style entertainment news, gossip, viral topics and discussions, without the name Tea Room; combines the earlier Tea Time and Who Did What? concepts.
- **Women in Business** — women entrepreneurs, business ownership, networking, collaborations and mentorship; evolves Boss Ladies.
- **The Man Cave** — men's business networking, partnerships, entrepreneurship and mentorship; preserve men's social/sports as separate optional topics.
- **Ladies Lounge** — general women-centered social live discussion, separate from news/tea and business.
- **Business Only** — general business room open to all eligible participants.

### Required production functionality
- Moderated hosted rooms and/or live category filtering must connect to actual active streams; room-specific host roles, room guidelines, opt-in participation, reporting and safety tools.
- Role/eligibility restrictions, if any, must be consistently disclosed and enforced without inferring a user's gender from their appearance or name. Build privacy-preserving access and moderation policies before rollout.
- No invented streams, fake viewer counts or simulated room participation in production.

# PIKK Promote — slot caps and rotation (for Backend)

Status: frontend preview only. Booking/checkout is **Coming soon** until Stripe is live. The app shows
`X of N slots left` from `src/promote-pricing.js` with TEST MODE occupancy (all slots open, no fake bookings).

## Slot caps per window
| Placement | Key | Slots per window | Prices |
|---|---|---|---|
| Top PIKK Music Player (Home) | `player` | 20 per 24h | $149 / 24h · $699 / 7 days |
| Home story rail | `storyrail` | 20 per 24h (swipeable) | $49 / 24h · $229 / 7 days |
| Premium Spotlight | `spotlight` | 1 | $199 / 24h · $999 / 7 days |
| Featured Box | `featured` | 2 | $99 / 24h · $499 / 7 days |
| Promo Box | `promo` | 3 | $49 / 24h · $249 / 7 days |

Single source: `src/promote-pricing.js` (`SLOT_CAPS`, `PROMOTE_SECTIONS`). Keep the server config in sync.

## Windows
- **24h window**: a rolling booking starts at the purchased start time and runs 24 hours. For cap purposes,
  a slot is occupied for every instant in `[start, start + 24h)`.
- **7-day window**: `[start, start + 7 × 24h)`.
- A placement is **full** at instant *t* when the number of active bookings covering *t* equals its cap.
  A new booking is accepted only if the placement stays ≤ cap at **every** instant of the requested window.
- All times are stored and compared in UTC; display in the user's zone.

## Rotation (fair round-robin)
- Active bookings for a placement are ordered by `paid_at` (ties: booking id).
- Impressions are served round-robin: position *i* shows booking `i mod n`, where *n* = active bookings (≤ cap).
- Every active booking receives an equal share; counts differ by at most 1 within a window.
- Unfilled slots fall back to house / Trending items, tagged honestly (never "Promoted" unless paid or a
  clearly labeled house demo).
- Reference implementation: `rotate()` / `slotStatus()` / `canBook()` in `src/promote-pricing.js`, unit-tested
  in `tests/pikk-promote-slots.test.mjs`.

## Music Player hourly guarantee (t346u)
- Up to 20 paid songs per 24h window. **Every paid song gets at least one play in every hour.**
- Each promoted play is capped at `floor(3600 / n)` seconds (n = active songs, so ≥ 180 s at n = 20);
  the listener can keep playing the full track, but rotation then continues round-robin.
- Rotation carries over across hours (song after the last one played starts the next hour).
- Reference: `hourlyPlayerSchedule()` in `src/promote-pricing.js`; test proves all 20 appear in each of 24 hours.

## Story rail
- Up to 20 promoted stories per 24h window, shown in a horizontally swipeable rail (scroll-snap) in fair
  round-robin order; unfilled positions use house / Trending stories tagged honestly.

## Enforcement requirements
- Caps MUST be enforced **server-side** by the ledger/booking system in a single transaction
  (e.g. D1 row lock / conditional insert counting overlapping active bookings). The client label is advisory only.
- Reject over-cap bookings before payment capture; never charge for a sold-out window.
- Refund automatically if a race is lost after authorization.
- Dating profile boost: 18+ only, requires age & ID verification and safety review; not slot-capped yet.
- **Server-side play/view counting (t347u):** real plays from Promote placements (Music Player, story rail,
  video/clip boosts) increment the item's normal play/view counter — the same counter as organic plays.
  Count only actual plays (≥ 3 s of audio/video playback; a story open), never impressions; dedupe rapid
  repeats per viewer+item (client uses 30 s); record `source = promote | organic` for reporting. Client
  reference: `src/play-counter.js` (local TEST MODE counter).
- Log every booking, rotation change and refund to the append-only ledger.

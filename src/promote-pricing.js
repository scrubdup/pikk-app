// t343u: single source for every PIKK promotion option and its introductory price.
// Pricing preview only — booking/checkout is Coming soon until Stripe is live. Nothing is charged.
export const PIKK_FEATURED_RATES = Object.freeze([
  { tier: 'spotlight', name: 'Premium Spotlight', slots: 1, day: 199, week: 999 },
  { tier: 'featured', name: 'Featured Box', slots: 2, day: 99, week: 499 },
  { tier: 'promo', name: 'Promo Box', slots: 3, day: 49, week: 249 },
]);
const p = (o) => Object.freeze(o);
export const PROMOTE_SECTIONS = Object.freeze([
  { id: 'featured', title: 'Featured placements', link: '#/videos', items: PIKK_FEATURED_RATES.map((t) => p({ name: t.name, day: t.day, week: t.week, slots: t.slots })) },
  { id: 'player', title: 'Music Player placement', link: '#/home', items: [p({ name: 'Top PIKK Music Player on Home (Trending / Promoted slot)', day: 149, week: 699, slots: 6 })] },
  { id: 'storyrail', title: 'Story rail placement', link: '#/home', items: [p({ name: 'Home story rail (Trending / Promoted slot)', day: 49, week: 229, slots: 10 })] },
  { id: 'music', title: 'Music', link: '#/music', items: [p({ name: 'Trending Music boost (tracks, albums)', day: 29, week: 129 })] },
  { id: 'videos', title: 'Videos and Clips', link: '#/videos', items: [p({ name: 'Video / Clip boost', day: 19, week: 89 })] },
  { id: 'live', title: 'Live', link: '#/live', items: [p({ name: 'Live stream boost (pre-live + during the live)', perStream: 25 })] },
  { id: 'shop', title: 'Shop', link: '#/shop', items: [p({ name: 'Shop product boost', day: 15, week: 69 }), p({ name: 'Store spotlight', week: 59 })] },
  { id: 'posts', title: 'Posts and Stories', link: '#/posts', items: [p({ name: 'Post / Story boost', day: 9, week: 39 })] },
  { id: 'profiles', title: 'Profiles', link: '#/profile', items: [p({ name: 'Profile / Creator boost', day: 19, week: 89 })] },
  { id: 'events', title: 'Events', link: '#/openmic', items: [p({ name: 'Event / Open Mic listing', perEvent: 25 })] },
  { id: 'battles', title: 'Battles and Roast', link: '#/giftbattles', items: [p({ name: 'Battles / Roast Arena matchup feature', perMatch: 35 })] },
  { id: 'communities', title: 'Communities', link: '#/communities', items: [p({ name: 'Community spotlight', week: 29 })] },
  { id: 'dating', title: 'Dating boost', link: '#/dating', gate: '18+ only · requires age & ID verification and safety review before launch', items: [p({ name: 'Dating profile boost', hour: 4.99, day: 14.99 })] },
]);
const usd = (n) => '$' + (Number.isInteger(n) ? n : n.toFixed(2));
/** Human price labels for an option; every option has at least one. */
export function priceLabels(i) {
  return [i.hour != null && `${usd(i.hour)} / hour`, i.day != null && `${usd(i.day)} / 24h`, i.week != null && `${usd(i.week)} / 7 days`,
    i.perStream != null && `${usd(i.perStream)} per stream`, i.perEvent != null && `${usd(i.perEvent)} per event`, i.perMatch != null && `${usd(i.perMatch)} per match`].filter(Boolean);
}

/** Rotating placements: slot caps per time window (t345u). Server must enforce (docs/promote-slots.md). */
export const SLOT_CAPS = Object.freeze({ player: 6, storyrail: 10, spotlight: 1, featured: 2, promo: 3 });
/** TEST MODE occupancy: no real bookings exist yet, so every slot is open. */
export const DEMO_OCCUPANCY = Object.freeze({ player: 0, storyrail: 0, spotlight: 0, featured: 0, promo: 0 });

export function slotStatus(cap, booked) {
  const c = Math.max(0, cap | 0), b = Math.min(c, Math.max(0, booked | 0)), left = c - b;
  return { cap: c, booked: b, left, soldOut: left === 0, label: left === 0 ? 'Sold out' : `${left} of ${c} slots left` };
}
/** Booking is allowed only when a slot is free (and, today, never — checkout is Coming soon). */
export function canBook(cap, booked) { return !slotStatus(cap, booked).soldOut; }
/**
 * Fair round-robin rotation. Pure. Given booked items (≤ cap are accepted, extras rejected),
 * returns an order of `impressions` positions where each accepted item gets an equal share
 * (counts differ by at most 1, earlier bookings first on ties).
 */
export function rotate(bookings, cap, impressions) {
  const accepted = bookings.slice(0, Math.max(0, cap | 0));
  const rejected = bookings.slice(accepted.length);
  const schedule = [];
  if (accepted.length) for (let i = 0; i < impressions; i++) schedule.push(accepted[i % accepted.length]);
  return { accepted, rejected, schedule };
}

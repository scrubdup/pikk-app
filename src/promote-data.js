// t336u/t337u: everything a user can pay to promote on PIKK. Pricing preview only;
// booking and checkout are Coming soon until Stripe is live. No payments are taken.
export { PROMOTE_SECTIONS, PIKK_FEATURED_RATES, priceLabels } from './promote-pricing.js';
import { PROMOTE_SECTIONS } from './promote-pricing.js';
export const promoteHref = (id) => `#/promote?s=${id}`;

/** Placement tag for the Home player and story rail (t342u). Honest by construction:
 *  'Promoted' only for an item explicitly marked as a house/demo promotion; 'Trending' only with
 *  a real trending signal; otherwise 'House pick'. No paid data exists until checkout is live. */
export function placementTag(item = {}) {
  if (item.promoted && item.house) return 'Promoted · House demo';
  if (item.trending === true) return 'Trending';
  return 'House pick';
}

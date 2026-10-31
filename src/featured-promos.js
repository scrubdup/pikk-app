// Owner-approved introductory inventory, shown for information only.
// No booking or payment endpoint is connected yet.
export const PIKK_FEATURED_RATES = Object.freeze([
  { tier: 'spotlight', name: 'Premium Spotlight', slots: 1, day: 199, week: 999 },
  { tier: 'featured', name: 'Featured Box', slots: 2, day: 99, week: 499 },
  { tier: 'promo', name: 'Promo Box', slots: 3, day: 49, week: 249 },
]);

function promoCard(tier, number) {
  return `<article class="pikk-ad-slot pikk-ad-${tier.tier}" data-promo-tier="${tier.tier}" aria-label="${tier.name} slot ${number}, pricing preview">
    <span class="pikk-ad-slot-top"><span class="pikk-ad-slot-icon" aria-hidden="true">▶</span><span class="pikk-ad-slot-number">0${number}</span></span>
    <strong>${tier.name}</strong>
    <span class="pikk-ad-slot-description">Available placement · booking coming soon</span>
    <span class="pikk-ad-slot-prices"><b>$${tier.day}</b><small>/ 24 hours</small></span>
    <span class="pikk-ad-slot-week">$${tier.week} / 7 days</span>
  </article>`;
}

// Shared visual presentation on Home and Videos. Stories are a clearly marked
// preview, not fabricated user posts or a misleading working uploader.
export function renderStoriesAndPromotions(page) {
  const context = page === 'videos' ? 'videos' : 'home';
  return `<div class="pikk-stories-promotions" data-featured-context="${context}">
    <section class="pikk-stories-strip" aria-label="PIKK Stories preview">
      <div class="pikk-featured-heading"><div><p class="kicker">Connect in 24 hours</p><h2>PIKK Stories</h2></div><span class="pikk-featured-state">Coming soon</span></div>
      <div class="pikk-stories-preview">
        <div class="pikk-story-preview"><span class="pikk-story-ring"><span aria-hidden="true">＋</span></span><strong>Your Story</strong></div>
        <p>Share moments with your followers. Stories will disappear after 24 hours once publishing launches.</p>
      </div>
    </section>
    <section class="pikk-featured-inventory" aria-label="Featured on PIKK sponsored placement pricing">
      <div class="pikk-featured-heading"><div><p class="kicker">Creator &amp; brand visibility</p><h2>Featured on PIKK</h2></div><span class="pikk-featured-sponsored">Sponsored placements</span></div>
      <p class="pikk-featured-intro">Six premium advertising positions on each page. Preview pricing below; booking and checkout are not active yet.</p>
      <div class="pikk-featured-rows">
        <div class="pikk-featured-row pikk-featured-row-hero">${promoCard(PIKK_FEATURED_RATES[0], 1)}</div>
        <div class="pikk-featured-row pikk-featured-row-two">${[1, 2].map(i => promoCard(PIKK_FEATURED_RATES[1], i)).join('')}</div>
        <div class="pikk-featured-row pikk-featured-row-three">${[1, 2, 3].map(i => promoCard(PIKK_FEATURED_RATES[2], i)).join('')}</div>
      </div>
      <p class="pikk-featured-footnote">Home and Videos placements are priced separately. Rates are introductory proposals; no paid placement or guaranteed views are currently offered.</p>
    </section>
  </div>`;
}

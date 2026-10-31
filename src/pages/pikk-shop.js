/**
 * PIKK Shop consumer landing — phase-one catalog shell.
 *
 * Uses the actual existing Foreign X-Change merchandise catalog; purchases
 * remain on the merchant's site. In-platform sellers, checkout, verification,
 * orders and affiliate commissions are NOT active.
 */
import { MERCH } from '../data.js';
import { esc, shellPage } from '../ui.js';

const CATEGORIES = ['All', 'Hats', 'Shirts', 'Jackets'];
const FUTURE_DEPARTMENTS = [
  'Ladies Shop', "Men's Shop", 'Beauty & Hair', 'Fashion & Accessories',
  'Lifestyle & Home', 'Creator Brands', 'Live Shopping', 'Deals',
];

export function filterPikkShopProducts(products, category = 'All', query = '') {
  const normalized = String(query || '').trim().toLocaleLowerCase();
  return products.filter((item) =>
    (category === 'All' || item.category === category) &&
    (!normalized || `${item.name} ${item.category}`.toLocaleLowerCase().includes(normalized))
  );
}

export function sortPikkShopProducts(products, order = 'featured') {
  const sorted = [...products];
  if (order === 'price-asc') return sorted.sort((a, b) => Number(a.price) - Number(b.price));
  if (order === 'price-desc') return sorted.sort((a, b) => Number(b.price) - Number(a.price));
  if (order === 'name-asc') return sorted.sort((a, b) => String(a.name).localeCompare(String(b.name)));
  return sorted;
}

function merchCard(item) {
  return `
    <article class="merch-card pikk-shop-product" data-product-id="${esc(item.id)}">
      <div class="img-wrap">
        <img src="${esc(item.image)}" alt="${esc(item.name)}" loading="lazy" />
      </div>
      <div class="body">
        <span class="chip">${esc(item.category)}</span>
        <h3 class="name">${esc(item.name)}</h3>
        <p class="price">$ ${Number(item.price).toFixed(2)}</p>
        <a class="btn primary block" href="${esc(item.shopUrl)}" target="_blank" rel="noopener noreferrer">
          Shop on Foreign X-Change ↗
        </a>
        <p class="merch-note">External merchant checkout. Confirm sizes, stock, shipping, taxes and returns on the merchant site.</p>
      </div>
    </article>`;
}

export function renderPikkShop() {
  const chips = CATEGORIES.map((category) =>
    `<button type="button" class="btn ${category === 'All' ? 'primary' : 'ghost'} pikk-shop-filter"
      data-category="${esc(category)}" aria-pressed="${category === 'All' ? 'true' : 'false'}">${esc(category)}</button>`
  ).join('');
  const future = FUTURE_DEPARTMENTS.map((category) =>
    `<li><span>${esc(category)}</span><span class="chip">Coming Soon</span></li>`
  ).join('');
  const spotlight = [
    MERCH.find((item) => item.id === 'jacket-black') || MERCH.find((item) => item.category === 'Jackets'),
    MERCH.find((item) => item.id === 'hat-716-orange') || MERCH.find((item) => item.category === 'Hats'),
    MERCH.find((item) => item.id === 'tee-ptsd') || MERCH.find((item) => item.category === 'Shirts'),
  ].filter(Boolean);
  const spotlightHtml = spotlight.map((item) =>
    '<a class="pikk-shop-featured-product" href="' + esc(item.shopUrl) + '" target="_blank" rel="noopener noreferrer" aria-label="View ' + esc(item.name) + ' on Foreign X-Change">' +
      '<img src="' + esc(item.image) + '" alt="' + esc(item.name) + '" loading="eager" decoding="async" />' +
      '<span>' + esc(item.category) + '</span></a>'
  ).join('');
  return shellPage('PIKK Shop', `
    <section class="pikk-shop-showcase pikk-shop-real-hero" aria-label="Featured Foreign X-Change merchandise">
      <div class="pikk-shop-showcase-copy">
        <p class="kicker">PIKK SHOP · FOREIGN X-CHANGE</p>
        <h2>Wear your story.<br/><span>Shop the culture.</span></h2>
        <p>Explore real Foreign X-Change jackets, hats and shirts. Your style, your PIKK.</p>
        <button type="button" class="btn primary" data-shop-scroll>Shop the collection</button>
        <small>External merchant checkout · No PIKK in-app payments</small>
      </div>
      <div class="pikk-shop-hero-gallery" aria-label="Featured product photography">${spotlightHtml}</div>
    </section>
    <nav class="pikk-shop-departments pikk-shop-category-nav" aria-label="Browse shopping categories">
      <button type="button" class="pikk-shop-category on" data-category="All" aria-pressed="true">Featured</button>
      <button type="button" class="pikk-shop-category" data-category="Jackets" aria-pressed="false">Jackets</button>
      <button type="button" class="pikk-shop-category" data-category="Shirts" aria-pressed="false">Shirts</button>
      <button type="button" class="pikk-shop-category" data-category="Hats" aria-pressed="false">Hats</button>
      <a href="#/profile-shop">Accessories · Preview</a>
    </nav>
    <section class="card pikk-shop-catalog" id="pikkShopCatalog" aria-label="Browse merchandise" style="scroll-margin-top:190px">
      <div class="pikk-shop-catalog-heading"><div><p class="kicker">THE COLLECTION</p><h3>Popular items</h3></div><span class="chip">Authentic Foreign X-Change</span></div>
      <label for="pikkShopSearch">Search merchandise</label>
      <input id="pikkShopSearch" type="search" placeholder="Search hats, shirts, jackets…" autocomplete="off" />
      <div class="row wrap" role="group" aria-label="Product category" style="gap:8px;margin-top:12px">
        ${chips}
        <button type="button" class="btn ghost" id="pikkShopReset" style="display:none" hidden>Reset view</button>
      </div>
      <div class="pikk-shop-sort-row" style="display:flex;justify-content:flex-end;align-items:center;gap:10px;flex-wrap:wrap;margin-top:12px">
        <label for="pikkShopSort">Sort by</label>
        <select id="pikkShopSort" style="width:auto;min-width:190px;max-width:100%">
          <option value="featured">Featured order</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>
      <p class="muted small" id="pikkShopCount" aria-live="polite">${MERCH.length} items</p>
      <div class="merch-grid pikk-shop-premium-grid pikk-shop-real-grid" id="pikkShopProducts">${MERCH.map(merchCard).join('')}</div>
      <p class="muted" id="pikkShopEmpty" hidden>No matching merchandise. Try another search or category.</p>
    </section>
    <section class="card" aria-label="PIKK Shop information">
      <span class="chip">PIKK Shop · Phase 1 preview</span>
      <h2>Discover real merchandise</h2>
      <p>Browse existing Foreign X-Change items below. PIKK does not take payments, verify sellers or fulfill orders in this preview.</p>
      <p class="muted small">All purchases open Foreign X-Change. External orders are not subject to an automated PIKK commission.</p>
      <div class="row wrap" style="gap:8px">
        <a class="btn ghost" href="#/merch">Full Foreign X-Change showcase</a>
        <a class="btn ghost" href="#/marketplace">Sponsored offers · TEST MODE</a>
        <a class="btn ghost" href="#/profile-shop">Profile Shop · cosmetic preview</a>
      </div>
    </section>
    <section class="card" aria-label="Future PIKK Shop departments">
      <h3>More PIKK Shop departments</h3>
      <p class="muted small">These sections are planned, not active storefronts. No in-app checkout or seller verification is available yet.</p>
      <ul class="list-plain">${future}</ul>
    </section>
    <section class="card" aria-label="Shop safety and fees">
      <h3>Seller safety &amp; checkout</h3>
      <p class="muted">Future PIKK checkout requires verified seller onboarding, inventory checks, refunds, disputes and payment reconciliation before activation. The planned physical-goods platform fee is 7% of the applicable item subtotal, subject to final payment/legal review; it does not apply to Foreign X-Change offsite orders.</p>
      <p class="muted small">Affiliate enrollment, payable links, commissions and payouts remain disabled · Coming Soon.</p>
    </section>
  `, { lead: 'Physical merchandise · external checkout · future verified storefronts' });
}

export function bindPikkShop(root) {
  const search = root.querySelector('#pikkShopSearch');
  const cards = [...root.querySelectorAll('.pikk-shop-product')];
  const buttons = [...root.querySelectorAll('.pikk-shop-filter, .pikk-shop-category')];
  const count = root.querySelector('#pikkShopCount');
  const empty = root.querySelector('#pikkShopEmpty');
  const reset = root.querySelector('#pikkShopReset');
  const sort = root.querySelector('#pikkShopSort');
  const productGrid = root.querySelector('#pikkShopProducts');
  const cardsById = new Map(cards.map((card) => [card.dataset.productId, card]));
  let category = 'All';
  function applyFilters() {
    const ids = new Set(filterPikkShopProducts(MERCH, category, search?.value || '').map((item) => item.id));
    for (const item of sortPikkShopProducts(MERCH, sort?.value || 'featured')) {
      const card = cardsById.get(item.id);
      if (card) productGrid?.appendChild(card);
    }
    for (const card of cards) {
      const show = ids.has(card.dataset.productId);
      card.hidden = !show;
      card.style.display = show ? '' : 'none';
    }
    if (count) count.textContent = `${ids.size} ${ids.size === 1 ? 'item' : 'items'}`;
    if (empty) empty.hidden = ids.size > 0;
    if (reset) {
      const active = category !== 'All' || !!search?.value.trim() || (sort?.value || 'featured') !== 'featured';
      reset.hidden = !active;
      reset.style.display = active ? '' : 'none';
    }
    for (const button of buttons) {
      const active = button.dataset.category === category;
      button.setAttribute('aria-pressed', String(active));
      if (button.classList.contains('pikk-shop-filter')) {
        button.classList.toggle('primary', active);
        button.classList.toggle('ghost', !active);
      }
      button.classList.toggle('on', active);
    }
  }
  search?.addEventListener('input', applyFilters);
  // Escape clears only the search query; keep the selected category and sort order.
  // The catalog and live result count update without taking keyboard focus away.
  search?.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !search.value) return;
    event.preventDefault();
    event.stopPropagation();
    search.value = '';
    applyFilters();
  });
  sort?.addEventListener('change', applyFilters);
  reset?.addEventListener('click', () => {
    category = 'All';
    if (search) search.value = '';
    if (sort) sort.value = 'featured';
    applyFilters();
    search?.focus();
  });
  // Move keyboard focus into the collection when the hero CTA jumps there.
  // Keep the catalog's existing reduced-motion scroll behavior.
  root.querySelector('[data-shop-scroll]')?.addEventListener('click', () => {
    search?.focus({ preventScroll: true });
    root.querySelector('#pikkShopCatalog')?.scrollIntoView({
      behavior: window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ? 'instant' : 'smooth',
      block: 'start',
    });
  });
  for (const button of buttons) {
    button.addEventListener('click', () => {
      category = button.dataset.category || 'All';
      applyFilters();
      if (button.classList.contains('pikk-shop-category')) root.querySelector('#pikkShopCatalog')?.scrollIntoView({ behavior: 'auto', block: 'start' });
    });
  }
}

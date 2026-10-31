import {
  getState,
  submitBrandApp,
  setBrandStatus,
  addSponsoredListing,
  setListingActive,
  listSponsoredListings,
} from '../store.js';
import { esc, toast, shellPage, timeAgo } from '../ui.js';
import { navigate } from '../router.js';

function refresh() {
  navigate('#/marketplace');
}

const STATUS_CHIP = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
};

const CAMPAIGNS = [
  { v: 'sponsored_post', label: 'Sponsored post' },
  { v: 'livestream_promo', label: 'Livestream promo' },
  { v: 'affiliate', label: 'Affiliate link' },
  { v: 'storefront', label: 'Product storefront' },
];

export function renderMarketplace() {
  const { brandApps, user } = getState();
  const listings = listSponsoredListings();
  const active = listings.filter((l) => l.active);

  const listingCards = active.length
    ? active
        .map(
          (l) => `
      <article class="card market-listing" data-id="${esc(l.id)}">
        <div class="row wrap">
          <span class="chip">Sponsored</span>
          <span class="chip">${esc(l.disclosure || 'Paid partnership')}</span>
          <span class="muted spacer" style="text-align:right;font-size:12px">${timeAgo(l.at)}</span>
        </div>
        <h3 style="margin:8px 0 4px">${esc(l.title)}</h3>
        <p class="muted" style="margin:0 0 6px">${esc(l.brand)}</p>
        <p style="margin:0 0 10px;font-size:14px">${esc(l.blurb || '')}</p>
        <div class="row wrap">
          ${l.url ? `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">Visit offer</a>` : ''}
          <button class="btn ghost listing-toggle" data-id="${esc(l.id)}" data-active="0">Hide · demo</button>
        </div>
      </article>`
        )
        .join('')
    : `<div class="card"><p class="muted" style="margin:0">No active sponsored listings yet. Apply as a brand or create a demo listing below.</p></div>`;

  const appsHtml = brandApps.length
    ? brandApps
        .map(
          (a) => `
      <div class="card" style="margin:0 0 10px;background:#12121a" data-app="${esc(a.id)}">
        <div class="row wrap">
          <strong>${esc(a.brand)}</strong>
          <span class="chip">${esc(STATUS_CHIP[a.status] || a.status)}</span>
          <span class="muted spacer" style="text-align:right">${timeAgo(a.at)}</span>
        </div>
        <p class="muted" style="margin:6px 0;font-size:12px">${esc(a.email)} · ${esc(a.campaign)} · budget ${esc(a.budget || '—')}</p>
        <p style="font-size:13px;margin:0 0 8px">${esc((a.pitch || '').slice(0, 160))}</p>
        <div class="row wrap">
          <button class="btn primary brand-status" data-id="${esc(a.id)}" data-status="approved">Approve</button>
          <button class="btn ghost brand-status" data-id="${esc(a.id)}" data-status="rejected">Reject</button>
          ${
            a.status === 'approved'
              ? `<button class="btn brand-to-listing" data-id="${esc(a.id)}" data-brand="${esc(a.brand)}" data-url="${esc(a.url || '')}" data-pitch="${esc(a.pitch || '')}">Create listing</button>`
              : ''
          }
        </div>
      </div>`
        )
        .join('')
    : '<p class="muted">No brand applications yet.</p>';

  const body = `
    <div class="card">
      <h3>Featured offers</h3>
      <p class="muted" style="margin:0 0 10px">Commission example: marketplace 85/15 · sponsored campaigns 80/20. Disclosures required.</p>
    </div>
    ${listingCards}

    <div class="card">
      <h3>Apply as Brand · TEST MODE</h3>
      <p class="muted">Demo application — stored in localStorage (<code>dbs_v1.brandApps</code>). No real billing.</p>
      <div class="grid-2">
        <div class="field"><label>Brand / business *</label><input id="mBrand" required /></div>
        <div class="field"><label>Contact name</label><input id="mContact" /></div>
      </div>
      <div class="grid-2">
        <div class="field"><label>Email *</label><input id="mEmail" type="email" required /></div>
        <div class="field"><label>Budget (approx)</label><input id="mBudget" placeholder="e.g. $500" /></div>
      </div>
      <div class="field"><label>Campaign type</label>
        <select id="mCampaign">
          ${CAMPAIGNS.map((c) => `<option value="${c.v}">${esc(c.label)}</option>`).join('')}
        </select>
      </div>
      <div class="field"><label>Offer / product URL</label><input id="mUrl" placeholder="https://" /></div>
      <div class="field"><label>Pitch</label><textarea id="mPitch" placeholder="What should creators promote?"></textarea></div>
      <button class="btn primary block" id="mSubmit">Submit application</button>
      <p class="chip" style="margin-top:10px">Signed in as ${esc(user?.username || 'guest')}</p>
    </div>

    <div class="card">
      <h3>Create sponsored listing · demo</h3>
      <p class="muted">Skip the application queue — publish a listing directly for UI testing.</p>
      <div class="grid-2">
        <div class="field"><label>Title *</label><input id="lTitle" placeholder="Summer drop · 20% off" /></div>
        <div class="field"><label>Brand *</label><input id="lBrand" placeholder="Brand name" /></div>
      </div>
      <div class="field"><label>Blurb</label><textarea id="lBlurb" placeholder="Short offer copy"></textarea></div>
      <div class="field"><label>URL</label><input id="lUrl" placeholder="https://" /></div>
      <div class="field"><label>Disclosure</label><input id="lDisc" value="Paid partnership · TEST MODE" /></div>
      <button class="btn primary block" id="lCreate">Publish listing</button>
    </div>

    <div class="card">
      <h3>Applications (this device)</h3>
      ${appsHtml}
      <p class="muted" style="font-size:12px;margin-top:8px">Demo approve / reject here. Approved apps can spawn a listing.</p>
    </div>

    ${
      listings.some((l) => !l.active)
        ? `<div class="card">
            <h3>Hidden listings</h3>
            ${listings
              .filter((l) => !l.active)
              .map(
                (l) => `<div class="row wrap" style="margin-bottom:8px">
                  <span>${esc(l.title)} · ${esc(l.brand)}</span>
                  <button class="btn ghost listing-toggle" data-id="${esc(l.id)}" data-active="1">Show</button>
                </div>`
              )
              .join('')}
          </div>`
        : ''
    }
  `;

  return shellPage('Marketplace', body, {
    lead: 'Brand applications & sponsored listings · localStorage demo.',
  });
}

export function bindMarketplace(root) {
  root.querySelector('#mSubmit')?.addEventListener('click', () => {
    const res = submitBrandApp({
      brand: root.querySelector('#mBrand')?.value,
      contact: root.querySelector('#mContact')?.value,
      email: root.querySelector('#mEmail')?.value,
      budget: root.querySelector('#mBudget')?.value,
      campaign: root.querySelector('#mCampaign')?.value,
      url: root.querySelector('#mUrl')?.value,
      pitch: root.querySelector('#mPitch')?.value,
    });
    if (res?.error === 'required') return toast('Brand and email required');
    toast('Application saved');
    refresh();
  });

  root.querySelectorAll('.brand-status').forEach((btn) => {
    btn.addEventListener('click', () => {
      setBrandStatus(btn.dataset.id, btn.dataset.status);
      toast('Marked ' + btn.dataset.status);
      refresh();
    });
  });

  root.querySelectorAll('.brand-to-listing').forEach((btn) => {
    btn.addEventListener('click', () => {
      const brand = btn.dataset.brand || 'Brand';
      const res = addSponsoredListing({
        title: `${brand} · sponsored`,
        brand,
        blurb: btn.dataset.pitch || 'Sponsored offer from approved brand application.',
        url: btn.dataset.url || '',
        disclosure: 'Paid partnership · TEST MODE',
        brandAppId: btn.dataset.id,
      });
      if (res?.error) return toast('Could not create listing');
      toast('Listing published');
      refresh();
    });
  });

  root.querySelector('#lCreate')?.addEventListener('click', () => {
    const res = addSponsoredListing({
      title: root.querySelector('#lTitle')?.value,
      brand: root.querySelector('#lBrand')?.value,
      blurb: root.querySelector('#lBlurb')?.value,
      url: root.querySelector('#lUrl')?.value,
      disclosure: root.querySelector('#lDisc')?.value,
    });
    if (res?.error === 'required') return toast('Title and brand required');
    toast('Listing published');
    refresh();
  });

  root.querySelectorAll('.listing-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      setListingActive(btn.dataset.id, btn.dataset.active === '1');
      toast(btn.dataset.active === '1' ? 'Listing shown' : 'Listing hidden');
      refresh();
    });
  });
}

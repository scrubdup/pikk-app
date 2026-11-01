import { esc, shellPage, toast } from '../ui.js';
import { PROMOTE_SECTIONS } from '../promote-data.js';
import { PIKK_FEATURED_RATES, renderPromotionInventory } from '../featured-promos.js';

export function renderPromote() {
  const groups = PROMOTE_SECTIONS.map((s) => `
    <section class="pikk-promote-group" id="promote-${s.id}" data-promote-section="${s.id}" aria-labelledby="promote-${s.id}-h">
      <div class="pikk-promote-head"><h3 id="promote-${s.id}-h">${esc(s.title)}</h3>${s.gate ? `<span class="chip pikk-promote-gate">${esc(s.gate)}</span>` : ''}</div>
      <ul class="pikk-promote-items">${s.items.map((i) => `<li><span>${esc(i)}</span><span class="pikk-promote-tiers">${PIKK_FEATURED_RATES.map((t) => `<small>${esc(t.name)} $${t.day}/24h</small>`).join('')}</span><button type="button" class="btn ghost" data-promote-book="${esc(s.title)} · ${esc(i)}" aria-label="Promote ${esc(i)} (coming soon)">Promote</button></li>`).join('')}</ul>
      <a class="pikk-promote-open" href="${s.link}">Open ${esc(s.title)} →</a>
    </section>`).join('');
  return shellPage('Promote on PIKK', `
    <p class="pikk-promote-intro">Choose what to promote. Prices are introductory previews. <strong>Booking and checkout are Coming soon</strong> until secure payments (Stripe) are live; nothing is charged and no views are guaranteed.</p>
    <nav class="pikk-promote-jump" aria-label="Promote sections">${PROMOTE_SECTIONS.map((s) => `<a class="chip" href="#/promote?s=${s.id}">${esc(s.title)}</a>`).join('')}</nav>
    ${renderPromotionInventory()}
    <div class="pikk-promote-groups">${groups}</div>`, { badge: 'TEST MODE · Coming soon' });
}
export function bindPromote(root = document) {
  root.addEventListener('click', (e) => { const b = e.target.closest('[data-promote-book]'); if (b) { e.preventDefault(); toast(`${b.dataset.promoteBook} · Coming soon, no payment taken`); } });
  const s = new URLSearchParams((location.hash.split('?')[1] || '')).get('s');
  if (s && PROMOTE_SECTIONS.some((x) => x.id === s)) setTimeout(() => document.getElementById('promote-' + s)?.scrollIntoView({ block: 'start' }), 60);
}

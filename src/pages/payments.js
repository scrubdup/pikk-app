import { esc, shellPage, toast } from '../ui.js';
// t353u: money-only Payments hub. Links only to existing routes; everything not live is an honest Coming soon
// until Stripe. No charges; any balances shown elsewhere are TEST MODE demo coins.
export const PAYMENTS_HUB = Object.freeze([
  { id: 'donate', title: 'Donate', detail: 'PIKK daily app goal · TEST MODE demo coins', href: '#/donate' },
  { id: 'donate-live', title: 'Creator & host goals', detail: 'Live goals on streams · TEST MODE', href: '#/live' },
  { id: 'coins', title: 'Buy coins & gifts', detail: 'Coin packs and gifts · Coming soon until Stripe', soon: true },
  { id: 'promote', title: 'Promote bookings', detail: 'Placements and boosts · booking Coming soon', href: '#/promote' },
  { id: 'shop', title: 'Shop orders & checkout', detail: 'Merch checkout on the merchant site; in-app orders Coming soon', href: '#/shop' },
  { id: 'subs', title: 'Subscriptions & fan clubs', detail: 'Creator fan clubs · TEST MODE', href: '#/fanclubs' },
  { id: 'membership', title: 'PIKK memberships', detail: 'Plans preview · no billing yet', href: '#/pricing' },
  { id: 'tips', title: 'Tips', detail: 'Tip creators · Coming soon until Stripe', soon: true },
  { id: 'wallet', title: 'Wallet balance', detail: 'Demo coin balance · TEST MODE', href: '#/wallet' },
  { id: 'payouts', title: 'Payouts & earnings', detail: 'Creator earnings preview · payouts Coming soon', href: '#/earnings' },
  { id: 'history', title: 'Payment history', detail: 'Receipts and refunds · Coming soon until Stripe', soon: true },
]);
export function renderPayments() {
  const rows = PAYMENTS_HUB.map((i) => i.href
    ? `<a class="pikk-pay-item" href="${i.href}" data-pay="${i.id}"><span class="pikk-pay-ico" aria-hidden="true">$</span><span><strong>${esc(i.title)}</strong><small>${esc(i.detail)}</small></span><span aria-hidden="true">→</span></a>`
    : `<div class="pikk-pay-item is-soon" data-pay="${i.id}" data-coming-soon role="button" tabindex="0"><span class="pikk-pay-ico" aria-hidden="true">$</span><span><strong class="pikk-menu-title">${esc(i.title)}</strong><small>${esc(i.detail)}</small></span><span class="chip">Coming soon</span></div>`).join('');
  return shellPage('Payments', `<p class="pikk-pay-intro">Everything money on PIKK in one place. <strong>No real payments are processed yet</strong>; secure checkout (Stripe) is Coming soon. Balances are TEST MODE demo coins.</p><div class="pikk-pay-list">${rows}</div>`, { badge: 'TEST MODE' });
}
export function bindPayments() {}

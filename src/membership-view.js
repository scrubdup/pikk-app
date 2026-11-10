// Read-only text for the server membership status (Profile chip + Pricing Memberships card).
// Honest states only: no benefits are listed and an active plan is never described as unlocking perks.
import { MEMBERSHIPS } from './data.js';

function planLabel(plan) {
  const t = MEMBERSHIPS.find((m) => m.id === plan);
  return t ? t.name : String(plan || '');
}
function day(iso) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}

/** Returns null in demo mode (callers keep their existing demo text). */
export function membershipViewText(view) {
  if (!view || view.mode !== 'api') return null;
  switch (view.phase) {
    case 'signed_out': return 'Sign in to see your membership status.';
    case 'loading': return 'Checking membership status…';
    case 'error': return 'Membership status is unavailable right now.';
    default: break;
  }
  if (view.status !== 'active') {
    return view.billing_configured ? 'No active membership.' : 'No active membership · memberships are not available yet.';
  }
  let t = `Active membership · ${planLabel(view.plan)}`;
  const end = view.current_period_end ? day(view.current_period_end) : '';
  if (end) t += view.cancel_at_period_end ? ` · ends ${end}` : ` · current period ends ${end}`;
  if (!view.entitlements) t += ' · member perks are not enabled yet';
  return t;
}

/** Short chip label for the Profile cover. */
export function membershipChipText(view) {
  if (!view || view.mode !== 'api') return null;
  if (view.phase === 'loading') return 'Membership · checking…';
  if (view.phase === 'error') return 'Membership · unavailable';
  if (view.phase === 'signed_out') return null;
  return view.status === 'active' ? `Member · ${planLabel(view.plan)}` : 'No membership';
}

/** Update any mounted membership status nodes in root. */
export function paintMembershipStatus(root, view) {
  if (!root || typeof root.querySelectorAll !== 'function') return;
  const text = membershipViewText(view);
  const chip = membershipChipText(view);
  root.querySelectorAll('[data-server-membership]').forEach((el) => {
    const kind = el.getAttribute('data-server-membership');
    const v = kind === 'chip' ? chip : text;
    el.textContent = v || '';
    el.hidden = !v;
    el.setAttribute('data-membership-phase', view && view.phase ? view.phase : 'demo');
    if (view && view.phase === 'ready') el.setAttribute('data-membership-status', view.status);
    else el.removeAttribute('data-membership-status');
  });
}

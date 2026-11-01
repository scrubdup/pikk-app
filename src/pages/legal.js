// t377u — Terms + Privacy (drafts). No terms/privacy route existed, so these are new. Draft — pending legal review.
import { shellPage } from '../ui.js';
export const SECURITY_HREF = '#/terms?s=security';
export const SECURITY_TEXT = 'PIKK uses reasonable measures to protect your information, but no system is 100% secure. To the fullest extent permitted by law, PIKK and its owners are not liable for damages resulting from unauthorized access, hacking, or data breaches beyond our reasonable control. If a breach affects your data, we will notify you as required by law.';
const draft = '<span class="chip pikk-legal-draft">Draft — pending legal review</span>';
export function renderTerms() {
  return shellPage('Terms', `
    <div class="card"><p class="kicker">PIKK Terms of Service</p>${draft}<p>Full Terms ship before public launch. See also <a href="#/guidelines">Community Guidelines</a> and <a href="#/privacy">Privacy</a>.</p></div>
    <section class="card pikk-legal-section" id="terms-security" aria-labelledby="terms-security-h">
      <h2 id="terms-security-h">Security &amp; Data Breach / Limitation of Liability</h2>${draft}
      <p>${SECURITY_TEXT}</p>
    </section>`, { badge: 'DRAFT' });
}
export function renderPrivacy() {
  return shellPage('Privacy', `
    <div class="card"><p class="kicker">PIKK Privacy</p>${draft}<p>TEST MODE: most data in this demo stays on your device. The full Privacy Policy ships before public launch.</p>
    <p><a href="${SECURITY_HREF}">Security &amp; Data Breach / Limitation of Liability</a></p></div>`, { badge: 'DRAFT' });
}
export function bindTerms() {
  if (typeof location !== 'undefined' && /[?&]s=security\b/.test(location.hash)) setTimeout(() => document.getElementById('terms-security')?.scrollIntoView({ block: 'start' }), 50);
}

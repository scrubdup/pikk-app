// Shared Report/Block for a real PIKK user (Messages, user profiles).
import { getState } from './store.js';
import { toast } from './ui.js';
import { REPORT_CATEGORIES, safetyApi, isSafetyApiConfigured, safetyErrorMessage, LOCAL_ONLY_BLOCK_NOTE, LOCAL_ONLY_REPORT_NOTE } from './api/safety-client.js';

const PEER_HANDLE_RE = /^[A-Za-z0-9_]{3,30}$/;
/** Normalize a backend user handle (what POST /blocks `handle` and report target_id expect). */
export function normalizePeerHandle(h) {
  const v = String(h || '').trim().replace(/^@/, '');
  return PEER_HANDLE_RE.test(v) ? v : '';
}
/** Server Report/Block needs: API configured + backend session + real handle. */
export function canUseServerSafety(peerHandle) {
  return !!normalizePeerHandle(peerHandle) && isSafetyApiConfigured() && getState().user?.authSource === 'backend';
}
const CATEGORY_LABELS = { csam: 'Child sexual abuse material', ncii: 'Non-consensual intimate imagery', self_harm: 'Self-harm', threat: 'Threat', underage: 'Underage user', harassment: 'Harassment', hate: 'Hate', sexual: 'Sexual content', violence: 'Violence', impersonation: 'Impersonation', fraud: 'Fraud / scam', copyright: 'Copyright', spam: 'Spam', other: 'Other' };
export const REPORT_CATEGORY_REQUIRED = 'Choose a report category first.';
/** <select> of backend-allowed report categories; defaults to none selected. */
export function renderReportCategorySelect(attrs = 'data-report-category') {
  return `<select ${attrs} class="pikk-safety-tap" aria-label="Report category" required><option value="" selected>Report reason…</option>${REPORT_CATEGORIES.map((c) => `<option value="${c}">${CATEGORY_LABELS[c] || c}</option>`).join('')}</select>`;
}
export function isValidReportCategory(c) { return REPORT_CATEGORIES.includes(c); }

/** Returns a promise of the toast text shown. Success text only after the server confirms. */
export function runPeerSafetyAction(action, peerHandle, { notify = toast, details = 'Reported from Messages', category = '' } = {}) {
  const handle = normalizePeerHandle(peerHandle);
  if (action === 'report' && !isValidReportCategory(category)) {
    notify(REPORT_CATEGORY_REQUIRED);
    return Promise.resolve(REPORT_CATEGORY_REQUIRED);
  }
  if (!canUseServerSafety(handle)) {
    const msg = action === 'block' ? 'Blocked · ' + LOCAL_ONLY_BLOCK_NOTE : 'Reported · stub (Guidelines §13) · ' + LOCAL_ONLY_REPORT_NOTE;
    notify(msg);
    return Promise.resolve(msg);
  }
  const p = action === 'block'
    ? safetyApi.block(handle).then(() => 'Blocked across PIKK', (err) => 'Hidden here only — server block failed: ' + safetyErrorMessage(err))
    : safetyApi.report({ targetType: 'user', targetId: handle, category, details })
        .then(() => 'Report sent to PIKK moderators', (err) => 'Report not sent: ' + safetyErrorMessage(err));
  return p.then((msg) => { notify(msg); return msg; });
}

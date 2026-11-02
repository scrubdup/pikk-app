/**
 * Search only the participant name and visible latest-message preview.
 * This is browser-local demo data; do not index hidden thread history or
 * imply server-side message search.
 */
export function messageSearchText(thread) {
  const messages = Array.isArray(thread?.messages) ? thread.messages : [];
  const latest = messages.length ? messages[messages.length - 1] : null;
  const participant = String(thread?.peerName || thread?.peerId || '');
  // Inbox previews display at most 80 characters; do not match text the user cannot see.
  const preview = String(latest?.text || '').slice(0, 80);
  return `${participant} ${preview}`.toLowerCase();
}

/** Visible inbox feedback; counts are browser-local, never server search results. */
export function messageResultSummary(shown, total, filtered = false) {
  const count = Math.max(0, Math.trunc(Number(total) || 0));
  const visible = Math.min(count, Math.max(0, Math.trunc(Number(shown) || 0)));
  const label = `conversation${count === 1 ? '' : 's'}`;
  return filtered ? `Showing ${visible} of ${count} ${label}` : `${count} ${label}`;
}

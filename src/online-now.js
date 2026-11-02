/** Online Now presentation: never invent users or online counts.
 * Production integration must supply server-authorized presence snapshots.
 */
export function normalizePresenceSnapshot(snapshot) {
  if (!snapshot || snapshot.source !== 'authenticated-server') return null;
  const count = value => Number.isSafeInteger(value) && value >= 0 ? value : null;
  return {
    onlineMembers: count(snapshot.onlineMembers),
    onlineCreators: count(snapshot.onlineCreators),
    activeLivestreams: count(snapshot.activeLivestreams),
    activeCities: count(snapshot.activeCities),
  };
}
const show = value => value === null ? '—' : String(value);
export function renderMemberOnlineNow(snapshot = null) {
  const data = normalizePresenceSnapshot(snapshot);
  return `<section class="card" aria-labelledby="pikk-online-heading">
    <div class="row wrap" style="justify-content:space-between;align-items:center;gap:8px">
      <h3 id="pikk-online-heading" style="margin:0">Online Now</h3>
      <span class="chip"> ${data ? 'Server presence' : 'COMING SOON'} </span>
    </div>
    <p class="muted" style="margin:10px 0">Discover online connections, followed members and opted-in people in your city or state.</p>
    <p role="status" class="muted">${data ? `Online members: ${show(data.onlineMembers)}` : 'Live online status is unavailable until secure presence tracking is connected.'}</p>
    <p class="muted" style="font-size:12px">Your online visibility will be optional. Hidden, private and blocked accounts must not appear in public discovery.</p>
  </section>`;
}
export function renderAdminOnlineNow(snapshot = null) {
  const data = normalizePresenceSnapshot(snapshot);
  const entries = [
    ['Online members', data?.onlineMembers ?? null],
    ['Online creators', data?.onlineCreators ?? null],
    ['Active livestreams', data?.activeLivestreams ?? null],
    ['Active cities', data?.activeCities ?? null],
  ];
  return `<section class="card" aria-labelledby="pikk-admin-online-heading">
    <h3 id="pikk-admin-online-heading">PIKK Live Activity</h3>
    <p class="muted"> ${data ? 'Authenticated presence snapshot' : 'COMING SOON · No real-time presence backend connected'} </p>
    <div class="row wrap" style="gap:10px">${entries.map(([label,value]) => `<div class="card" style="flex:1 1 130px;min-width:0"><strong>${show(value)}</strong><div class="muted" style="font-size:12px">${label}</div></div>`).join('')}</div>
    <p class="muted" style="font-size:12px">Production metrics require authenticated server aggregation, access control and session expiry. No simulated user counts.</p>
  </section>`;
}

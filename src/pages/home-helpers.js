export const SECTION_ICONS = {
  Explore: '🧭',
  'Shorts / Clips': '▶',

  Music: '🎵',
  Videos: '🎬',
  Posts: '📸',
  Live: '🔴',
  'PIKK Lounge': '💬',
  Vault: '🔐',
  Marketplace: '🛍️',
  Missions: '🎯',
};

export const STAGE_TABS = [
  { id: 'toplive', label: 'Top live' },
  { id: 'videos', label: 'Videos' },
  { id: 'rising', label: 'Rising' },
  { id: 'hot', label: 'Hot lives' },
  { id: 'songs', label: 'Songs' },
];

export const STAGE_CYCLE_MS = 8000;
export const STAGE_PREF_KEY = 'dbs_home_stage_v2';
export const STAGE_PREF_LEGACY_KEYS = ['dbs_home_stage'];

export function fmtViewers(n) {
  const v = Number(n) || 0;
  if (v >= 1000) return `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}k`;
  return String(v);
}

export function isHouseLive(l) {
  if (!l) return false;
  return !!(l.house || l.hostId === 'dbs' || l.hostName === 'DatBoiSkeet');
}

export function isHousePost(h) {
  if (!h) return false;
  return !!(h.house || h.userId === 'dbs' || h.username === 'DatBoiSkeet');
}

export function fmtUsd(n) { return '$' + Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }); }
export function goalTimeLeft(endsAt) {
  const ms = Math.max(0, endsAt - Date.now());
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000);
  return ms <= 0 ? 'Ended' : `${h}h ${m}m left`;
}

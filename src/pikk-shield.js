// Browser-local PIKK Shield intake prototype. Not a fingerprinting or enforcement service.
export const SHIELD_STORAGE_KEY = 'pikk_shield_intake_v1';
const MAX_ITEMS = 30;
export const RIGHTS_OPTIONS = Object.freeze(['Original creator','Licensed with permission','Authorized representative']);
export function safeShieldUrl(raw) {
  const value = String(raw || '').trim();
  if (!value) return '';
  try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : ''; }
  catch { return ''; }
}
export function normalizeShieldSubmission(data, now = Date.now()) {
  const title = String(data.title || '').trim().slice(0,120);
  const owner = String(data.owner || '').trim().slice(0,100);
  const rights = String(data.rights || '');
  const contact = String(data.contact || '').trim().slice(0,180);
  const notes = String(data.notes || '').trim().slice(0,800);
  const source = safeShieldUrl(data.source);
  if (!title || !owner || !contact || !RIGHTS_OPTIONS.includes(rights) || !data.certified) {
    throw new Error('Complete title, rights holder, contact, ownership basis and certification.');
  }
  if (String(data.source || '').trim() && !source) throw new Error('Use a valid http or https link.');
  return { id: 'shield-' + now + '-' + Math.random().toString(36).slice(2,8), type:'rights-declaration', title, owner, rights, contact, notes, source, at:now, status:'Local draft — not submitted' };
}
export function readShieldIntakes(storage) {
  try {
    const raw = JSON.parse(storage.getItem(SHIELD_STORAGE_KEY) || '[]');
    return Array.isArray(raw) ? raw.filter(x => x && x.type === 'rights-declaration').slice(0,MAX_ITEMS) : [];
  } catch { return []; }
}
export function saveShieldIntake(storage, item) {
  const items = [item,...readShieldIntakes(storage)].slice(0,MAX_ITEMS);
  storage.setItem(SHIELD_STORAGE_KEY,JSON.stringify(items));
  return items;
}
export function removeShieldIntake(storage,id) {
  const items = readShieldIntakes(storage).filter(x=>x.id!==id);
  storage.setItem(SHIELD_STORAGE_KEY,JSON.stringify(items));
  return items;
}

/** User-initiated offline backup. Export only known fields, never other localStorage data. */
export function serializeShieldDrafts(storage) {
  const drafts = readShieldIntakes(storage).map(item => ({
    id: String(item.id || ''),
    type: 'rights-declaration',
    title: String(item.title || ''),
    owner: String(item.owner || ''),
    rights: String(item.rights || ''),
    contact: String(item.contact || ''),
    notes: String(item.notes || ''),
    source: safeShieldUrl(item.source),
    at: Number.isFinite(item.at) ? item.at : null,
    status: 'Local draft — not submitted'
  }));
  return JSON.stringify({format:'PIKK Shield local rights drafts',version:1,drafts},null,2);
}

/** Restore a PIKK-generated backup locally. Validate the entire file before any write. */
export function importShieldDrafts(storage, json) {
  if (typeof json !== 'string' || json.length > 65536) throw new Error('Backup file must be under 64 KB.');
  let backup;
  try { backup = JSON.parse(json); } catch { throw new Error('Invalid JSON backup file.'); }
  if (!backup || backup.format !== 'PIKK Shield local rights drafts' || backup.version !== 1 || !Array.isArray(backup.drafts) || backup.drafts.length > MAX_ITEMS) {
    throw new Error('Not a supported PIKK Shield backup (maximum 30 drafts).');
  }
  const imported = backup.drafts.map((item, i) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) throw new Error('Invalid draft in backup.');
    for (const key of ['id','title','owner','rights','contact','notes','source']) {
      if (typeof item[key] !== 'string') throw new Error('Invalid draft field: ' + key);
    }
    if (!/^shield-[a-zA-Z0-9-]{1,80}$/.test(item.id) || !item.title.trim() || item.title.length > 120 ||
        !item.owner.trim() || item.owner.length > 100 || !RIGHTS_OPTIONS.includes(item.rights) ||
        !item.contact.trim() || item.contact.length > 180 || item.notes.length > 800 ||
        (item.source && (!safeShieldUrl(item.source) || safeShieldUrl(item.source) !== item.source)) ||
        (item.at !== null && (!Number.isFinite(item.at) || item.at < 0))) {
      throw new Error('Backup draft ' + (i + 1) + ' contains invalid fields.');
    }
    return {id:item.id,type:'rights-declaration',title:item.title.trim(),owner:item.owner.trim(),
      rights:item.rights,contact:item.contact.trim(),notes:item.notes,source:safeShieldUrl(item.source),
      at:item.at ?? Date.now(),status:'Local draft — not submitted'};
  });
  const existing = readShieldIntakes(storage);
  const ids = new Set(existing.map(item => item.id));
  const added = [];
  for (const item of imported) if (!ids.has(item.id)) {ids.add(item.id);added.push(item);}
  // Preserve every existing draft; if storage is full, do not evict it during restore.
  const accepted = added.slice(0, Math.max(0, MAX_ITEMS - existing.length));
  if (accepted.length) storage.setItem(SHIELD_STORAGE_KEY,JSON.stringify([...accepted,...existing]));
  return {added:accepted.length,duplicates:imported.length-added.length,total:readShieldIntakes(storage).length};
}

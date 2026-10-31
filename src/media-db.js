/** IndexedDB blob store for Admin Add Content (TEST MODE, no backend).
 * Keys are opaque ids referenced from dbs_v1.catalog entries as idb:<key>.
 */

const DB_NAME = 'dbs_media_v1';
const STORE = 'blobs';
const VERSION = 1;

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error || new Error('idb open failed'));
  });
}

export async function putBlob(id, blob, meta = {}) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put({
      id,
      blob,
      mime: blob.type || meta.mime || 'application/octet-stream',
      name: meta.name || '',
      size: blob.size || 0,
      at: Date.now(),
    });
    tx.oncomplete = () => resolve(id);
    tx.onerror = () => reject(tx.error);
  });
}

export async function getBlobRecord(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

/** Resolve idb:<id> | http(s) | /path to a usable src string (object URL for blobs). */
const urlCache = new Map();

export async function resolveMediaSrc(ref) {
  if (!ref) return '';
  if (ref.startsWith('idb:')) {
    const id = ref.slice(4);
    if (urlCache.has(id)) return urlCache.get(id);
    const rec = await getBlobRecord(id);
    if (!rec?.blob) return '';
    const url = URL.createObjectURL(rec.blob);
    urlCache.set(id, url);
    return url;
  }
  return ref;
}

export function isIdbRef(ref) {
  return typeof ref === 'string' && ref.startsWith('idb:');
}

export function newBlobId(prefix = 'blob') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

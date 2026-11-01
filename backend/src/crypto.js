const enc = new TextEncoder();
export const PBKDF2_ITERATIONS = 100000; // Workers WebCrypto maximum for PBKDF2

export function b64(buf) { return btoa(String.fromCharCode(...new Uint8Array(buf))); }
export function unb64(s) { return Uint8Array.from(atob(s), c => c.charCodeAt(0)); }
export function hex(buf) { return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join(''); }
export function randomToken(bytes = 32) {
  const a = crypto.getRandomValues(new Uint8Array(bytes));
  return b64(a).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export function newId(prefix) { return `${prefix}_${randomToken(16)}`; }
export async function sha256Hex(s) { return hex(await crypto.subtle.digest('SHA-256', enc.encode(s))); }

export async function hashPassword(password, saltB64, iterations = PBKDF2_ITERATIONS) {
  const salt = saltB64 ? unb64(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256);
  return { hash: b64(bits), salt: b64(salt), iterations };
}

export function timingSafeEqual(a, b) {
  const ab = enc.encode(a), bb = enc.encode(b);
  if (ab.length !== bb.length) return false;
  let diff = 0;
  for (let i = 0; i < ab.length; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}

export async function verifyPassword(password, rec) {
  const { hash } = await hashPassword(password, rec.password_salt, rec.password_iterations);
  return timingSafeEqual(hash, rec.password_hash);
}

export async function hmacSha256Hex(secret, message) {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, enc.encode(message)));
}

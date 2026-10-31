import { ApiError } from './http.js';

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,63}$/;
const HANDLE = /^[a-zA-Z0-9_]{3,30}$/;

export function validateSignup(b) {
  const errs = {};
  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : '';
  const handle = typeof b.handle === 'string' ? b.handle.trim() : '';
  const display = typeof b.display_name === 'string' ? b.display_name.trim() : '';
  const pw = typeof b.password === 'string' ? b.password : '';
  if (!EMAIL.test(email)) errs.email = 'invalid email';
  if (!HANDLE.test(handle)) errs.handle = '3-30 letters, digits or underscore';
  if (display.length < 1 || display.length > 60) errs.display_name = '1-60 characters';
  if (pw.length < 10 || pw.length > 256) errs.password = '10-256 characters';
  else if (!/[a-zA-Z]/.test(pw) || !/[0-9]/.test(pw)) errs.password = 'must include a letter and a digit';
  if (Object.keys(errs).length) throw new ApiError(422, 'validation_failed', 'Invalid input', errs);
  return { email, handle, display_name: display, password: pw };
}

export function validateLogin(b) {
  if (typeof b.email !== 'string' || typeof b.password !== 'string' || b.password.length > 256 || b.email.length > 260)
    throw new ApiError(422, 'validation_failed', 'email and password required');
  return { email: b.email.trim().toLowerCase(), password: b.password };
}

export function requireString(b, field, { min = 1, max = 5000, pattern } = {}) {
  const v = b[field];
  if (typeof v !== 'string' || v.trim().length < min || v.length > max || (pattern && !pattern.test(v)))
    throw new ApiError(422, 'validation_failed', 'Invalid input', { [field]: `${min}-${max} characters` });
  return v.trim();
}

export function requirePositiveInt(b, field, max = 1_000_000_00) {
  const v = b[field];
  if (!Number.isSafeInteger(v) || v <= 0 || v > max)
    throw new ApiError(422, 'validation_failed', 'Invalid input', { [field]: 'positive integer' });
  return v;
}

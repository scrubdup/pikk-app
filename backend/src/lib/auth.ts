/** Password hashing — bcryptjs (nodejs_compat) */
import { hash, compare } from 'bcryptjs'

const ROUNDS = 10

export async function hashPassword(password: string): Promise<string> {
  return hash(password, ROUNDS)
}

export async function verifyPassword(password: string, passwordHash: string): Promise<boolean> {
  return compare(password, passwordHash)
}

/** Returns null if OK, or an error string */
export function validatePassword(password: string): string | null {
  if (typeof password !== 'string' || password.length < 8) {
    return 'password must be at least 8 characters'
  }
  if (password.length > 128) return 'password too long'
  if (!/[a-zA-Z]/.test(password)) return 'password must include a letter'
  if (!/[0-9]/.test(password)) return 'password must include a number'
  return null
}

export function validateEmail(email: string): string | null {
  if (typeof email !== 'string') return 'valid email required'
  const e = email.trim().toLowerCase()
  if (!e.includes('@') || e.length < 5 || e.length > 254) return 'valid email required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return 'valid email required'
  return null
}

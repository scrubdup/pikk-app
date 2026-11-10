import { it, expect } from 'vitest';
import source from '../src/index.js?raw';

it('Master Mind wires authenticated in-process Vault health', () => {
  expect(source).toMatch(/const vaultHealth = \(\) => mediaRoute\(env, req, ctx, 'GET', '\/vault\/health'\)/);
  expect(source).toMatch(/opsSummary\(env, \{ vaultHealth \}\)/);
  expect(source).not.toMatch(/vaultHealth: undefined/);
});

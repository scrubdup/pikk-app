import { defineConfig } from 'vite';

// GitHub Pages project site: https://scrubdup.github.io/pikk-app/
// Override with VITE_BASE=/ for root hosts (e.g. workers.dev).
const base = process.env.VITE_BASE || (process.env.NODE_ENV === 'production' ? '/pikk-app/' : '/');

export default defineConfig({
  base,
  root: '.',
  publicDir: 'public',
  server: {
    host: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});

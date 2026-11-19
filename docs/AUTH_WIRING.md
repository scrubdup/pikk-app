# Auth Wiring Checklist

Everything needed for real signup → login → session survival → logout is built.

## One-time owner actions

```bash
cd backend
npm install
npx wrangler d1 create pikk-db
# paste database_id into wrangler.toml
npm run db:migrate
npm run dev          # local API on :8787
```

## Frontend wiring (main.js)

```js
import { authRoutes } from './auth/routes.js'
import { restoreServerSession } from './auth/boot.js'

const ROUTES = {
  ...authRoutes,
  // ...existing routes
}

async function boot() {
  await restoreServerSession()   // restores real session on reload
  // ...existing boot code
}
```

## Environment

```
VITE_API_URL=http://127.0.0.1:8787
```

## Test flow

1. Open `#/auth?mode=signup`
2. Create account
3. Reload the page → still signed in (`/auth/me`)
4. Logout → session destroyed on server

## Pages ready

| Route | Purpose |
|-------|---------|
| `#/auth` | Signup / Login |
| `#/auth/reset` | Request + confirm password reset |
| `#/profile` | Still supports local demo + will show real user when session exists |

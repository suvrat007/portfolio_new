# Portfolio — Suvrat Mittal

Personal site positioning the work as financial systems engineering. React + Vite
frontend on Vercel, Express + MongoDB API on Render, with an admin panel for
publishing work without a redeploy.

```
frontend/   React 19, Vite 6, Tailwind 4, Redux Toolkit, Framer Motion
backend/    Express 4, Mongoose 8, JWT
```

---

## Quick start

```bash
# API
cd backend
cp .env.example .env        # fill in MONGO_URI and ACCESS_TOKEN_SECRET
npm install
npm run dev                 # http://localhost:8000

# Web
cd frontend
npm install
npm run dev                 # http://localhost:5173, proxies /api to production
```

To develop the frontend against a local API, set `VITE_API_PROXY_TARGET=http://localhost:8000`
in `frontend/.env.local`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Regenerates the snapshot, then builds |
| `npm run snapshot` | Bakes the live API payload into the bundle |
| `npm test` | Vitest suite (content model + full-route render) |
| `npm run lint` | ESLint |

---

## The cold-start problem, and what actually fixes it

Render's free tier spins the API down after roughly 15 minutes of inactivity.
The first request after that takes 30–50 seconds. The old site fired four
separate requests on load and rendered a spinner until they returned, so a
cold visitor stared at nothing.

Four layers now sit between that and the visitor, in the order they take effect:

**1. A build-time snapshot — this is the one that matters.**
`npm run build` runs `scripts/fetch-snapshot.mjs` first, which fetches
`/api/content` and writes it to `src/data/snapshot.json`. That file is bundled.
The deployed site paints real projects, real toolkit, real everything at t=0
with *no network dependency at all*. If the API is asleep at build time the
script keeps the committed snapshot and the build still succeeds — a sleeping
API can never break a deploy.

**2. A localStorage cache.** Returning visitors render from their last payload,
which is newer than the snapshot. Expires after seven days.

**3. Background revalidation.** Once the page is up, one request goes out with
an `If-None-Match` header. Unchanged content costs a 304 and no bandwidth;
changed content swaps in silently. The Redux store resolves its initial state
synchronously from cache-or-snapshot, so the first render already has data —
there is no loading state to flash through.

**4. A warm-up ping.** `warmUpApi()` fires at `main.jsx` module load, before
React mounts, so a sleeping instance starts booting during first paint rather
than after it. A GitHub Action also pings every ten minutes to keep the
instance resident.

On the API side, `GET /api/content` returns everything in one request instead of
four — one cold start, not four — and memoises the result in process memory with
an ETag, invalidated on every write.

**The cold-start screen** (`features/boot/`) is the last line of defence. Because
a snapshot ships with the bundle it normally exits after a ~1.9s intro (0.65s for
returning visitors). On a genuinely cold visit with no snapshot and no cache it
holds until data arrives, capped hard at 30 seconds, rotating through facts about
the work with a live elapsed counter and an honest status line. Tuning lives in
`src/constants/boot.js`.

> One consequence worth knowing: work published through the admin panel appears
> immediately for anyone loading the site fresh, but the *bundled snapshot* only
> updates on redeploy. Redeploy the frontend when you want new work visible
> before the API has woken up.

---

## Publishing work

Sign in at `/admin`. Every project carries:

| Field | Notes |
| --- | --- |
| `domain` | `finance` · `data` · `engineering` · `research` — drives the filter on `/work` |
| `status` | `live` · `building` · `planned` · `archived` |
| `tags` | Stack or technique, comma separated |
| `timeline`, `highlights`, `liveUrl`, `github`, `image`, `order` | All optional |

Only `name` and `description` are required, so an Excel valuation model or a
research note publishes as cleanly as a deployed app.

**Finance work specifically.** `src/constants/content.js` holds a `ROADMAP` array
listing committed-but-unshipped work (equity research terminal, options pricing
engine, DCF suite, portfolio risk dashboard). Those render in the *In Development*
section. Publish a real project with the same name and the placeholder disappears
on its own — no code change needed. Set its `status` to `building` or `planned`
to keep it in that section, or `live` to move it into the work index.

The toolkit is fully data-driven too: add a category from the console and it
renders. That is how the *Markets & Valuation* competencies sit beside the
engineering ones without a schema change.

---

## Layout

```
frontend/src/
  constants/     Identity, copy, API contract, motion tokens, storage keys, boot timing
  lib/           API client, storage wrapper, content normaliser + selectors, validators
  hooks/         useContent, useBootSequence, useMagnetic, useProjectMutations, …
  store/         Redux Toolkit slices (content, auth)
  components/ui/ Section, MaskedLines, Reveal, Button, Marquee, Counter, Field, Modal
  features/      boot, layout, hero, profile, practice, work, roadmap, toolkit,
                 activity, contact, admin — one directory per section of the site
  pages/         Home, Work, Admin, NotFound
  app/           Router, ThemeProvider
  data/          snapshot.json (generated)

backend/src/
  config/        Env validation, database connection
  constants/     Every literal the server uses
  models/        One shared project schema, stack, user
  middleware/    Auth, async wrapper, error handling
  services/      Content aggregation + cache, auth
  routes/        content, projects, stack, auth, legacy rewrites
```

No component holds a bare string or magic number — copy lives in
`constants/content.js`, timings in `constants/motion.js` and `constants/boot.js`.

### Design

Monochrome paper/ink, light and dark, applied before first paint by an inline
script so the theme never flashes. Fluid type scale, hairline rules, mono labels,
numbered sections. Motion is shared through `constants/motion.js`: masked line
reveals, staggered entrances, magnetic buttons, a cursor-following project
preview, animated counters, page transitions. Everything respects
`prefers-reduced-motion`, and hover effects are inert on touch.

---

## API

Public:

```
GET  /api/health                     Wake-up target
GET  /api/content                    Everything, ETag + stale-while-revalidate
GET  /api/projects/:collection       featured | fullstack | react | js
GET  /api/stack
```

Authenticated (`Authorization: Bearer <token>`):

```
POST   /api/auth/login
POST   /api/projects/:collection
PUT    /api/projects/:collection/:id
DELETE /api/projects/:collection/:id
POST   /api/stack                          { category }
DELETE /api/stack/:category
POST   /api/stack/:category/techs          { name, image? }
DELETE /api/stack/:category/techs/:tech
```

The original verb-per-collection routes (`/getTopFourProjects`, `/addJSProject`, …)
still resolve as rewrites so the previously deployed frontend keeps working.
They can be deleted once nothing points at them — see `src/routes/legacyRoutes.js`.

---

## Security notes

- `backend/config.json` was committed with live MongoDB Atlas credentials before
  `.gitignore` covered it. It is untracked now, but **the credential is in public
  git history and must be rotated in Atlas.** Removing it from history requires a
  force-push (`git filter-repo` or BFG).
- Passwords are bcrypt hashed. Rows created before this change hold plaintext;
  they are verified once by direct comparison and transparently re-saved as a
  hash on next login, so no account breaks.
- Login returns the same error whether the account is missing or the password is
  wrong.
- Set `CORS_ORIGINS` in the API environment to lock the allowlist to your domains.
  Left empty it reflects any origin.

## Deployment

- **Frontend** → Vercel, root `frontend/`. `vercel.json` rewrites `/api/*` to
  Render and everything else to `index.html`. That second rule also fixes deep
  links — previously `/projects` fell through to the backend and 404'd.
- **Backend** → Render, root `backend/`, `npm start`. Set `MONGO_URI`,
  `ACCESS_TOKEN_SECRET` and optionally `CORS_ORIGINS`.

# Soham Dengale — Portfolio (MERN)

A portfolio site built to match your design, as a full MERN app:

- **React (Vite)** front end — hero, work, stack, experience, about, contact, footer, a **case-study page for every project** (`/work/:slug`), smooth scrolling and page/scroll animations, plus a mobile layout.
- **Express + MongoDB (Mongoose)** API — projects, experience and skills are stored in the database; the contact form saves messages.
- **Admin panel at `/admin`** — sign in to read messages and add, edit and delete projects, experience and skills. No code changes needed to update the site.

```
portfolio/
├─ client/   React app (Vite)
│  └─ src/content.js   ← hero / about / footer copy and your social links
└─ server/   Express API
   └─ src/data/seedData.js   ← starter projects, skills, experience
```

## Run it locally

You need Node 20+ and a MongoDB (local, or a free Atlas cluster).

```bash
# 1. MongoDB (skip if you use Atlas) — needs Docker
docker compose up -d

# 2. Install everything
npm run setup

# 3. Configure the server
cp server/.env.example server/.env
#    then edit server/.env:
#      JWT_SECRET      a long random string
#      ADMIN_EMAIL / ADMIN_PASSWORD   your admin login (password: 10+ characters)
#      MONGO_URI       only if not using the local MongoDB above
#    Generate a secret with:
#      node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"

# 4. Start API (port 5000) and site (port 5173) together
npm run dev
```

Open <http://localhost:5173>. On first start the server creates your admin account and fills the database with the starter content from your design. Sign in at <http://localhost:5173/admin>.

## Things to personalise

| What | Where |
| --- | --- |
| GitHub / LinkedIn links, availability line | `client/src/content.js` (`site`) |
| Hero text, about text, contact copy | `client/src/content.js` |
| Projects and their case studies (summary, role, tags, year, cover image, Overview / Challenge / Approach, links) | Admin → Projects |
| Overall UI size (fonts, buttons, spacing) | `client/src/styles.css` → `html { font-size: clamp(13px, 0.8vw, 15.4px) }` (desktop). Lower the numbers to shrink everything, raise them to enlarge. |
| Skills columns | Admin → Skills |
| Experience entries | Admin → Experience |

- Clicking a project in the Work list opens its case study at `/work/<slug>`. The slug is made from the title unless you set one. The cover is generated artwork unless you add a **Cover image** (an `https://` link or a `/path`). **Live site** and **Source code** links appear on the case-study page when set.
- **Sample content:** the six projects (apart from Orbit's text, which comes from your screenshot) and the experience entries are placeholders. Replace them in the admin panel with your real work.
- Smooth scrolling uses Lenis. It switches off automatically for visitors who prefer reduced motion and on the admin pages.
- If your database was seeded before case studies were added, run `npm run seed:reset --prefix server` to load the new sample projects (this replaces projects, skills and experience with the starter data).
- Reset the content to the starter data with `npm run seed:reset --prefix server`. Any run of the seed script (`npm run seed`) also sets the admin password to the current `ADMIN_PASSWORD`, which is how you change it.

## Deploy (one service)

The server serves the built React app, so one host is enough (Render, Railway, Fly, a VPS…).

```bash
npm run setup
npm run build     # builds client/dist
npm start         # serves API + site on $PORT
```

Set these environment variables on the host: `NODE_ENV=production`, `MONGO_URI` (e.g. MongoDB Atlas), `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`. `CLIENT_ORIGIN` is only needed if you host the front end separately (then also build it with `VITE_API_URL=https://your-api/api`).

## API

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| GET | `/api/projects`, `/api/experience`, `/api/skills` | – | Public content |
| GET | `/api/projects/:slug` | – | One project (case study) |
| POST | `/api/contact` | – | Contact form (rate-limited: 5 per hour per IP) |
| POST | `/api/auth/login` | – | Returns a 12-hour JWT |
| GET | `/api/auth/me` | token | Check session |
| POST / PUT / DELETE | `/api/admin/{projects,experience,skills}[/:id]` | token | Manage content |
| GET / PATCH / DELETE | `/api/admin/messages[/:id]` | token | Inbox |

## Security notes

- Passwords are hashed with bcrypt; login is rate-limited (10 failed attempts per 15 minutes) and doesn't reveal whether an email exists.
- All input is validated server-side (zod). Project links must be `http(s)://`, so a `javascript:` link can't be saved.
- The contact form has a hidden honeypot field plus rate limiting. Message text is rendered as plain text in the admin, never as HTML.
- Helmet sets security headers including a strict Content-Security-Policy.
- The admin token is kept in `localStorage`. That's fine for a personal admin panel, but it means any XSS on the site could read it, so avoid adding third-party scripts to the page.

## Testing status

Verified in a sandbox with the production build: the API's validation, authentication, rate limiting, security headers and static serving; the full browser flows (contact form, admin sign-in, editing and creating content) with the exact request bodies checked against the server's schemas; and layout against your screenshots at 1920 px, 1440 px and a 390 px mobile view, including the case-study page, smooth scrolling and reduced-motion behaviour.

**Not verified:** the database layer against a real MongoDB (the sandbox couldn't download one). The Mongoose models and queries are standard, but run the app once locally and send yourself a test message from the contact form to confirm it end to end.

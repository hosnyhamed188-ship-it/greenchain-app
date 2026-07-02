# GreenChain App

A React + Vite portfolio-style prototype for a supply-chain intelligence dashboard.

GreenChain App includes a modern enterprise UI with pages for:
- Settings
- Compliance
- Exports
- AI-powered reports
- Carbon credits

Built with React, Vite, Supabase, and Framer Motion.

---

## Features

- **Settings**: manage enterprise configuration and notification preferences
- **SQL Editor**: open your Supabase SQL workspace and copy the settings-table migration script
- **Compliance**: review live compliance controls and audit status
- **Exports**: create and manage secure audit exports
- **AI Reports**: generate intelligent ESG and regulatory insights
- **Carbon Credits**: track carbon offsets and credit portfolios

---

## Tech Stack

- React 19
- Vite 8
- Supabase
- Framer Motion
- ESLint

---

## Getting Started

### Prerequisites

- Node.js 20+ or compatible
- npm
- A Supabase project for backend data
- Optional: Vercel account for deployment

### Install

```bash
git clone https://github.com/your-org/greenchain-app.git
cd greenchain-app
npm install
```

---

## Environment Variables

This app uses Vite environment variables for Supabase configuration.

Create a `.env` or `.env.local` file at the project root with:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

The app reads these values from `src/supabase.js`.

> Keep sensitive keys out of source control by adding `.env*` to `.gitignore`.

---

## Development

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal (typically `http://localhost:5173`).

---

## Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Deployment

### Vercel

1. Push your repo to GitHub, GitLab, or another Git provider.
2. Import the project into Vercel.
3. Set the environment variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`

### Notes

- Vite exposes only `VITE_`-prefixed environment variables to the browser.
- Ensure Supabase credentials are set in both development and Vercel.
- If you use a Supabase project for auth, enable security settings such as leaked password protection.

---

## Database Migration

If you need to create or update the `settings` table in Supabase, use the included migration script:

```bash
# Run this in Supabase SQL Editor or via your preferred SQL migration workflow
cat migrate-settings-table.sql
```

This script will:
- create the `public.settings` table if it does not exist
- add required columns for the Settings page
- enable row-level security
- create the `Users manage own settings` policy

---

## Project Structure

- `src/` — main React source code
- `src/supabase.js` — Supabase client initialization
- `public/` — static assets
- `package.json` — scripts and dependencies
- `vite.config.js` — Vite configuration

---

## Scripts

- `npm run dev` — start development server
- `npm run build` — build production bundle
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

---

## Notes

This repo is currently a prototype for a sustainability dashboard and can be extended with real backend auth, data syncing, and production-ready security controls.

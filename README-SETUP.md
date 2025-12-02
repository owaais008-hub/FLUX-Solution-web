# EventSphere - Local Setup & Supabase Migrations

This README explains how to run the project locally and apply Supabase migrations.

## Prerequisites
- Node.js (>=18)
- npm
- supabase CLI (optional for migrations)
- Docker (optional for running a local Postgres)

## Environment
Create a `.env` file (or set environment variables) with:

```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>
VITE_EMAILJS_SERVICE_ID=<your-emailjs-service-id>
VITE_EMAILJS_TEMPLATE_ID=<your-emailjs-template-id>
VITE_EMAILJS_PUBLIC_KEY=<your-emailjs-public-key>
```

## Run locally (frontend)
1. Install deps

```powershell
npm install
```

2. Start dev server

```powershell
npm run dev
```

## Apply Supabase migrations
Using the Supabase CLI (recommended):

```powershell
# login if needed
supabase login

# link to project (or set SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY env vars)
supabase db reset --confirm "my-project"
supabase db push
```

Or run the SQL files against your Postgres instance directly (e.g., psql or pgAdmin).

## Email Setup
To enable the contact form to send emails to flux.solution929@gmail.com:

1. Follow the instructions in `EMAILJS_SETUP.md` to set up an EmailJS account
2. Update your `.env` file with your EmailJS credentials
3. Restart the development server

## Notes
- Project originally lived in OneDrive which can cause file-system issues; prefer a local folder like `C:\Projects\project` for development.
- If the Supabase project is remote, be cautious when running migrations in production.
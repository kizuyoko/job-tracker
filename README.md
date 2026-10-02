# Job Tracker

A small job application tracker, built over a weekend as an experiment in AI-assisted development.

## What it does

- Add a company
- Change its status (Applied / Interview / Rejected) and save it
- Delete an application, with a confirmation

## Tech stack

- React + TypeScript (Vite)
- Tailwind CSS
- Supabase (PostgreSQL)
- GitHub

## How I worked

I used AI to generate code and to explain errors, and made the design decisions myself:

- Split the list row into its own component under `src/components/`
- Moved the shared type into `src/types/`
- Changed the status dropdown to use an explicit Save button instead of saving on every change
- Added a confirmation before deleting
- Enabled Row Level Security on the table and reviewed the generated policy

## Known limitations

- There is no login. The Row Level Security policy is a temporary one that allows anyone with the public key to read and write, so this is for local use with dummy data only.
- Errors are shown but never cleared.
- Data fetching could be moved into a custom hook.

## Run locally

1. Create a Supabase project and an `applications` table (`id`, `company`, `status`, `notes`, `created_at`)
2. Add a `.env.local` file:

   VITE_SUPABASE_URL=your project URL
   VITE_SUPABASE_ANON_KEY=your publishable key

3. `npm install`
4. `npm run dev`
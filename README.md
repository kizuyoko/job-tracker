# Job Tracker

A small job application tracker, built over a weekend as an experiment in AI-assisted development.

## What it does

- Sign up and sign in with email and password
- Add a company
- Change its status (Applied / Interview / Rejected) and save it
- Delete an application, with a confirmation
- Each user can only see and edit their own applications
- Light and dark mode, with a toggle that remembers your choice

## Tech stack

- React + TypeScript (Vite)
- Tailwind CSS
- Supabase (PostgreSQL, Auth, Row Level Security)
- GitHub

## How I worked

I used AI to generate code and to explain errors, and made the design decisions myself:

- Split the UI into components under `src/components/` and moved the shared type into `src/types/`
- Extracted data fetching into a custom hook, `useApplications`
- Changed the status dropdown to use an explicit Save button instead of saving on every change
- Added a confirmation before deleting
- Replaced the generated "allow everyone" Row Level Security policy with one that limits each row to its owner (`user_id`)

## Known limitations

- Errors are shown but never cleared.
- The `notes` column exists but has no UI yet.
- No password reset.

## Run locally

1. Create a Supabase project and run this in the SQL Editor:

```sql
   create table applications (
     id uuid primary key default gen_random_uuid(),
     company text not null,
     status text not null default 'applied',
     notes text,
     created_at timestamptz not null default now(),
     user_id uuid references auth.users (id) default auth.uid()
   );

   alter table applications enable row level security;

   create policy "users manage own applications"
   on applications for all to authenticated
   using (auth.uid() = user_id)
   with check (auth.uid() = user_id);
```
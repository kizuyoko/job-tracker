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
on applications
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
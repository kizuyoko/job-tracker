create table interviews (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications (id) on delete cascade,
  interview_date timestamptz,
  notes text,
  created_at timestamptz not null default now()
);

alter table interviews enable row level security;
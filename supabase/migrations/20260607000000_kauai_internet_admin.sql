-- Kauai Internet community platform backend (applied via Supabase MCP)

create table if not exists public.kauai_interest_submissions (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('support', 'feedback', 'observation', 'concern')),
  status text not null default 'new' check (status in ('new', 'reviewed', 'replied', 'archived')),
  name text,
  email text,
  organization text,
  location_label text,
  support_type text,
  message text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.kauai_email_messages (
  id uuid primary key default gen_random_uuid(),
  direction text not null check (direction in ('inbound', 'outbound')),
  submission_id uuid references public.kauai_interest_submissions (id) on delete set null,
  from_email text not null,
  to_email text not null,
  subject text,
  body_text text not null,
  body_html text,
  provider_id text,
  thread_key text,
  created_at timestamptz not null default now()
);

create table if not exists public.kauai_admin_notes (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.kauai_interest_submissions (id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

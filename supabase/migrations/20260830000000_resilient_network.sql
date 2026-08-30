-- Extend submissions for node applications; add community reports and RF measurements schema

alter table public.kauai_interest_submissions
  drop constraint if exists kauai_interest_submissions_kind_check;

alter table public.kauai_interest_submissions
  add constraint kauai_interest_submissions_kind_check
  check (kind in ('support', 'feedback', 'observation', 'concern', 'node-application'));

create table if not exists public.kauai_community_reports (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  description text not null,
  location_label text,
  lat double precision,
  lng double precision,
  reporter_hash text,
  verification_count integer not null default 0,
  confidence text not null default 'unverified'
    check (confidence in ('unverified', 'community', 'verified')),
  moderation_state text not null default 'pending'
    check (moderation_state in ('pending', 'approved', 'rejected', 'expired')),
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists kauai_community_reports_moderation_idx
  on public.kauai_community_reports (moderation_state, created_at desc);

create table if not exists public.kauai_rf_measurements (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  node_id text,
  lat double precision not null,
  lng double precision not null,
  rssi double precision,
  snr double precision,
  frequency_mhz double precision,
  spreading_factor integer,
  packet_loss double precision,
  recorded_at timestamptz not null default now(),
  uploaded_at timestamptz not null default now(),
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists kauai_rf_measurements_recorded_idx
  on public.kauai_rf_measurements (recorded_at desc);

alter table public.kauai_community_reports enable row level security;
alter table public.kauai_rf_measurements enable row level security;

-- Community connectivity measurements for island infrastructure knowledge base

create table if not exists public.kauai_connectivity_tests (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  visitor_id text not null,
  ip_address text,
  ip_masked text,
  isp_name text,
  isp_org text,
  asn text,
  country text,
  region text,
  city text,
  download_mbps numeric(10, 2),
  upload_mbps numeric(10, 2),
  latency_ms numeric(10, 2),
  jitter_ms numeric(10, 2),
  region_id text,
  user_agent text,
  device_type text check (device_type in ('mobile', 'tablet', 'desktop', 'unknown')),
  screen_width int,
  language text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists kauai_connectivity_tests_created_at_idx
  on public.kauai_connectivity_tests (created_at desc);

create index if not exists kauai_connectivity_tests_isp_name_idx
  on public.kauai_connectivity_tests (isp_name);

create index if not exists kauai_connectivity_tests_region_id_idx
  on public.kauai_connectivity_tests (region_id);

create index if not exists kauai_connectivity_tests_visitor_id_idx
  on public.kauai_connectivity_tests (visitor_id);

alter table public.kauai_connectivity_tests enable row level security;

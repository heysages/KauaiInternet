-- Web analytics: page views, referrers, UTM attribution

create table if not exists public.kauai_web_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null default 'pageview' check (event_type in ('pageview', 'section_view')),
  path text not null,
  pathname text not null,
  hash text,
  referrer text,
  referrer_host text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  session_id text not null,
  visitor_id text not null,
  user_agent text,
  device_type text check (device_type in ('mobile', 'tablet', 'desktop', 'unknown')),
  screen_width int,
  language text,
  country text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists kauai_web_events_created_at_idx
  on public.kauai_web_events (created_at desc);

create index if not exists kauai_web_events_path_idx
  on public.kauai_web_events (path);

create index if not exists kauai_web_events_referrer_host_idx
  on public.kauai_web_events (referrer_host);

create index if not exists kauai_web_events_visitor_id_idx
  on public.kauai_web_events (visitor_id);

alter table public.kauai_web_events enable row level security;

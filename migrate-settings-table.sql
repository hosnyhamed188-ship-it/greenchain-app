-- Migrate or ensure the `settings` table exists for GreenChain App.
-- This script is idempotent and safe to run multiple times.

create extension if not exists pgcrypto;

create table if not exists public.settings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  company_name text,
  industry text,
  country text,
  phone text,
  scope_target text,
  offset_budget text,
  email_alerts boolean default true,
  penalty_alerts boolean default true,
  report_ready boolean default true,
  created_at timestamptz default now(),
  unique(user_id)
);

alter table public.settings enable row level security;

drop policy if exists "Users manage own settings" on public.settings;

create policy "Users manage own settings"
  on public.settings
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

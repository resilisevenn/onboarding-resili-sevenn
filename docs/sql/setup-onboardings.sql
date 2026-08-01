-- =========================================================
-- 1. TABELA
-- =========================================================
create table public.onboardings (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  access_code    text not null,
  client_name    text not null,
  payload        jsonb not null,
  status         text not null default 'active',
  created_by     uuid references public.profiles(id),
  created_at     timestamptz not null default now(),
  last_viewed_at timestamptz,
  constraint onboardings_status_check check (status in ('active', 'paused')),
  constraint onboardings_access_code_check check (access_code ~ '^[0-9]{4}$')
);

create index onboardings_slug_idx on public.onboardings (slug);
create index onboardings_created_by_idx on public.onboardings (created_by);

-- =========================================================
-- 2. RPC — leitura pública (única forma de acesso anônimo)
-- =========================================================
create or replace function public.get_onboarding(p_slug text, p_code text)
returns table (
  id uuid, client_name text, payload jsonb, created_at timestamptz
)
language plpgsql security definer set search_path = public as $$
begin
  update public.onboardings
    set last_viewed_at = now()
    where slug = p_slug and access_code = p_code and status = 'active';

  return query
    select o.id, o.client_name, o.payload, o.created_at
    from public.onboardings o
    where o.slug = p_slug and o.access_code = p_code and o.status = 'active';
end;
$$;

grant execute on function public.get_onboarding(text, text) to anon;

-- =========================================================
-- 3. RLS
-- =========================================================
alter table public.onboardings enable row level security;

create policy "gestor/admin insert onboardings"
  on public.onboardings for insert
  to authenticated
  with check ( auth.uid() = created_by );

create policy "gestor/admin read own onboardings"
  on public.onboardings for select
  to authenticated
  using ( created_by = auth.uid() or public.is_admin() );

create policy "gestor/admin update own onboardings"
  on public.onboardings for update
  to authenticated
  using ( created_by = auth.uid() or public.is_admin() );

-- Sem policy de select para 'anon' — leitura pública é exclusivamente via RPC acima.

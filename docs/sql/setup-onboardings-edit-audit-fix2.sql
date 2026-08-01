-- CORREÇÃO 2 — a policy de profiles criada em setup-onboardings-edit-audit-fix.sql
-- causa "infinite recursion detected in policy for relation profiles": o subquery
-- dela consulta a própria tabela profiles, e RLS reavalia essa mesma policy para
-- cada linha checada dentro do subquery, entrando em loop.
--
-- Solução: uma função security definer (roda com privilégios do dono da função,
-- ignorando RLS internamente) que resolve "sou eu mesmo, ou sou admin/gestor
-- ativo" sem re-disparar a policy de profiles.

-- =========================================================
-- 1. Função auxiliar (bypassa RLS internamente)
-- =========================================================
create or replace function public.is_active_editor()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and status = 'active'
      and role in ('admin', 'gestor_trafego')
  );
$$;

grant execute on function public.is_active_editor() to authenticated;

-- =========================================================
-- 2. onboardings — reaplica UPDATE/SELECT usando a função
-- =========================================================
drop policy if exists "gestor/admin update onboardings" on public.onboardings;

create policy "gestor/admin update onboardings"
  on public.onboardings for update
  to authenticated
  using ( public.is_active_editor() );

drop policy if exists "gestor/admin read onboardings" on public.onboardings;

create policy "gestor/admin read onboardings"
  on public.onboardings for select
  to authenticated
  using ( public.is_active_editor() );

-- =========================================================
-- 3. profiles — corrige a recursão
-- =========================================================
drop policy if exists "gestor/admin read profiles" on public.profiles;

create policy "gestor/admin read profiles"
  on public.profiles for select
  to authenticated
  using ( id = auth.uid() or public.is_active_editor() );

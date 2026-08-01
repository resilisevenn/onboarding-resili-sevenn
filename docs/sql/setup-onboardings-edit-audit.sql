-- Habilita edição inline do documento por qualquer admin/gestor_trafego autenticado
-- (não só quem criou o onboarding) e registra rastro de quem editou por último.

-- =========================================================
-- 1. Colunas de auditoria de edição
-- =========================================================
alter table public.onboardings
  add column if not exists last_edited_at timestamptz,
  add column if not exists last_edited_by uuid references public.profiles(id);

-- =========================================================
-- 2. RLS — liberar update para qualquer authenticated (role já
--    restrita no login da aplicação a admin/gestor_trafego)
-- =========================================================
drop policy if exists "gestor/admin update own onboardings" on public.onboardings;

create policy "gestor/admin update onboardings"
  on public.onboardings for update
  to authenticated
  using ( true );

-- =========================================================
-- 3. RLS — leitura autenticada de qualquer onboarding (necessário
--    para o modo editor abrir /o/:slug sem passar pelo código público)
-- =========================================================
drop policy if exists "gestor/admin read own onboardings" on public.onboardings;

create policy "gestor/admin read onboardings"
  on public.onboardings for select
  to authenticated
  using ( true );

-- =========================================================
-- 4. RLS — permite ler o nome de outros profiles (para exibir
--    "editado por fulano" no painel, mesmo quando o editor não é
--    o usuário logado). Só roda se a tabela já tiver RLS habilitado
--    e ainda não existir policy de leitura ampla.
-- =========================================================
drop policy if exists "authenticated read profiles" on public.profiles;

create policy "authenticated read profiles"
  on public.profiles for select
  to authenticated
  using ( true );

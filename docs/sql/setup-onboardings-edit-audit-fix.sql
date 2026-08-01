-- CORREÇÃO DE SEGURANÇA — substitui as policies "using (true)" introduzidas em
-- setup-onboardings-edit-audit.sql, que removeram toda autorização a nível de
-- banco (qualquer usuário autenticado, inclusive role 'comercial' ou contas
-- pausadas com token ainda válido, podia ler/escrever qualquer onboarding e
-- ler todos os profiles). Restaura o controle no banco, mas mantém o pedido
-- original: qualquer admin/gestor_trafego ATIVO pode editar qualquer onboarding
-- (não só quem criou).

-- =========================================================
-- 1. onboardings — UPDATE restrito a admin/gestor_trafego ativos
-- =========================================================
drop policy if exists "gestor/admin update onboardings" on public.onboardings;

create policy "gestor/admin update onboardings"
  on public.onboardings for update
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.status = 'active'
        and p.role in ('admin', 'gestor_trafego')
    )
  );

-- =========================================================
-- 2. onboardings — SELECT restrito a admin/gestor_trafego ativos
--    (leitura pública de cliente continua exclusivamente via RPC
--    get_onboarding, que não passa por aqui)
-- =========================================================
drop policy if exists "gestor/admin read onboardings" on public.onboardings;

create policy "gestor/admin read onboardings"
  on public.onboardings for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.status = 'active'
        and p.role in ('admin', 'gestor_trafego')
    )
  );

-- =========================================================
-- 3. profiles — SELECT restrito a admin/gestor_trafego ativos
--    (necessário só para resolver "editado por fulano" no painel)
-- =========================================================
drop policy if exists "authenticated read profiles" on public.profiles;

create policy "gestor/admin read profiles"
  on public.profiles for select
  to authenticated
  using (
    id = auth.uid()
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and p.status = 'active'
        and p.role in ('admin', 'gestor_trafego')
    )
  );

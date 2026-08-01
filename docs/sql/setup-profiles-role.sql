-- Permite a nova role 'gestor_trafego' em profiles.role.
-- Não havia check constraint antes (era só convenção via comentário) — adiciono aqui
-- para os dois projetos (proposta e onboarding) ficarem protegidos contra typo.
alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles
  add constraint profiles_role_check
  check (role in ('admin', 'comercial', 'gestor_trafego'));

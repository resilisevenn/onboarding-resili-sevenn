# Briefing — Onboarding Digital Resili Sevenn

## Contexto e motivação

Hoje, após o cliente fechar contrato, ele preenche 2 formulários (Google Forms). Depois, o gestor de tráfego faz uma call onde: (1) valida os dados do formulário, (2) pega acessos do Meta Ads, (3) apresenta uma estratégia num slide de Canva montado manualmente para cada cliente.

Problemas identificados:
- A call é longa porque mistura validação de dado (trabalho operacional) com apresentação de estratégia (o que importa).
- O slide é remontado à mão a cada cliente — trabalho repetido, sem padronização, difícil de manter consistente com a identidade visual da marca.
- O deck atual (analisado a partir de um caso real, Dr. Lucas Sales) mistura três tipos de conteúdo que deveriam ser separados: (a) estratégia específica da conta, (b) método genérico da Resili Sevenn (educação sobre anúncio, formatos, CTA), (c) execução/links. Isso infla o documento e gera retrabalho no que não deveria mudar por cliente.
- Faltam seções estruturais importantes: o que a clínica precisa entregar (com prazo), riscos operacionais assumidos em conjunto, cronograma dos primeiros 30 dias, e a tradução da meta de faturamento em número de pacientes/leads necessários.

## Objetivo

Substituir o slide de Canva por um **documento web** (não PDF, não slide) que:
1. É gerado em ~20 minutos por um gestor de tráfego, colando as respostas do formulário + o ICP/análise de território que ele já produz por fora.
2. É enviado à clínica **antes** da call de onboarding, para que ela leia, valide os dados e chegue com dúvidas — reduzindo o tempo da call ao que realmente importa: alinhar estratégia e (se necessário) configurar o acesso ao Meta Ads ao vivo.
3. Continua acessível depois, como referência (cronograma, checklist de pendências).
4. Reflete a identidade visual premium/editorial da Resili Sevenn (ver `CLAUDE.md` do site institucional para paleta, tipografia e regras de design).

## Decisão de arquitetura

**Projeto novo, separado do projeto comercial, banco de dados compartilhado.**

Motivo: isolamento de deploy (se o onboarding quebrar, a apresentação comercial não é afetada, e vice-versa — dois gestores de tráfego vão mexer nesse projeto), evitando risco cruzado. O banco é compartilhado para reaproveitar autenticação e não duplicar cadastro de usuários.

### Projeto de referência (já existe, é o modelo a seguir)

Caminho local: `C:\PROJETOS\proposta-resili-sevenn`

Esse projeto é a apresentação comercial (React + Vite + Tailwind + Supabase), já em produção, com:
- Autenticação via Supabase Auth (email + senha), tabela `public.profiles` com colunas `role` (`admin` | `comercial`) e `status` (`active` | `paused` | `inactive`).
- Um fluxo de **proposta pública**: tabela `public.proposals` (slug, payload JSON, expires_at, status, created_by), rota pública `/p/:slug` sem exigir login, geração via n8n (webhook que grava no Supabase e retorna a URL).
- RLS: usuário autenticado insere/lê as próprias linhas; `anon` só lê linhas com `status='active' and expires_at > now()`.
- Dois clientes Supabase no código: um para sessão autenticada (`supabase`), outro para leitura pública sem sessão (`supabasePublic`) — ver `src/lib/supabase.ts`. Essa separação existe para a rota pública não interferir com login de gestor no mesmo navegador.
- Deploy na Vercel, domínio hoje é algo como `proposta-ecossistema.resilisevenn.com.br` (confirmar com o usuário antes de tomar como definitivo).

**O projeto novo de onboarding deve seguir o mesmo padrão arquitetural** (Supabase Auth + RLS + rota pública por slug + cliente público separado), mas como aplicação própria, com seu próprio repositório, deploy Vercel e domínio.

### Banco de dados: compartilhado, não duplicado

- Mesma instância Supabase do projeto `proposta-resili-sevenn`. Reaproveita `auth.users` e `public.profiles` — não recria cadastro de usuário.
- É necessário adicionar uma nova role em `profiles.role`: `gestor_trafego`, além das existentes `admin` e `comercial`.
- **Segregação de acesso por projeto via role, não por tabela separada de usuários:**
  - No projeto proposta comercial, a rota autenticada continua liberando apenas `admin` e `comercial`. Um usuário `gestor_trafego` faz login (mesmo banco), mas é barrado nesse app.
  - No projeto onboarding (novo), a rota autenticada libera apenas `admin` e `gestor_trafego`. Um usuário `comercial` é barrado.
  - `admin` acessa os dois projetos.
- Isso significa que o schema `profiles` existente só precisa de um ajuste de constraint/check para aceitar o novo valor de `role` — não precisa de tabela nova nem de duplicação de cadastro.

### Nova tabela: `public.onboardings`

```sql
create table public.onboardings (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,       -- ex: "dra-fulana-k7m2p9qx"
  access_code    text not null,               -- 4 últimos dígitos do WhatsApp da clínica, ex: "4821"
  client_name    text not null,
  payload        jsonb not null,              -- conteúdo estruturado dos 12 blocos (ver seção "Conteúdo")
  status         text not null default 'active',  -- 'active' | 'paused' (SEM expiração automática por tempo)
  created_by     uuid references public.profiles(id),
  created_at     timestamptz not null default now(),
  last_viewed_at timestamptz
);
```

Diferenças importantes em relação ao padrão de `proposals`:
- **Sem `expires_at`/expiração automática.** O onboarding fica ativo indefinidamente até ser pausado manualmente pelo gestor/admin. Motivo: ao contrário da proposta comercial (que precisa gerar urgência de decisão), o onboarding é referência de trabalho em andamento — a clínica pode e deve reconsultar cronograma e checklist depois da call.
- **Código de acesso obrigatório (`access_code`), não apenas slug.** O documento carrega dado financeiro sensível da clínica (faturamento, custo operacional, margem), então o slug sozinho (mesmo com sufixo aleatório) não é suficiente. O código são os 4 últimos dígitos do WhatsApp cadastrado pela clínica — funciona como confirmação leve de posse, sem exigir criação de conta/senha pela cliente.
- **`last_viewed_at`** é atualizado toda vez que a rota pública é acessada com sucesso (slug + código corretos) — alimenta o painel interno.

### RLS e acesso público — atenção especial ao código de acesso

Como o código de acesso precisa ser validado **antes** de expor o payload, uma policy de `select` simples não é suficiente (ela vazaria o payload de qualquer registro que bata o slug, sem checar o código). A leitura pública deve ser feita via **RPC** (função Postgres `security definer`), não via select direto:

```sql
create or replace function public.get_onboarding(p_slug text, p_code text)
returns table (
  id uuid, client_name text, payload jsonb, created_at timestamptz
)
language plpgsql security definer as $$
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
```

Policies de RLS da tabela (para o acesso autenticado, via app):
```sql
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
```
Não criar policy de `select` para `anon` — a leitura pública passa **exclusivamente** pela RPC acima, que já embute a checagem de `access_code` e `status`.

### Geração do slug e do código

- Slug: nome legível (slugificado) + sufixo aleatório de 8-10 caracteres alfanuméricos, gerado com `crypto.randomUUID()` (cortado) ou lib tipo `nanoid`. Exemplo: `dra-fulana-k7m2p9qx`. O sufixo é o que impede adivinhação — o nome legível é só para reconhecimento humano nos registros internos.
- Código: últimos 4 dígitos do WhatsApp informado no formulário de briefing da clínica. Armazenado em texto puro (não precisa hash — é um código de baixo risco / alta usabilidade, pensado para "confirmar que é você", não para segurança criptográfica forte).
- Evitar indexação: `noindex` na rota pública, e considerar desabilitar preview rico de link (Open Graph) para não vazar nome/dado em preview de WhatsApp/Slack.

## Painel interno (novo — não existe equivalente hoje em `proposals`)

Rota autenticada (`admin` ou `gestor_trafego`) com listagem de todos os onboardings gerados:

| Coluna | Descrição |
|---|---|
| Cliente | `client_name` |
| Link | slug completo, com botão de copiar |
| Status | Ativo / Pausado, com toggle |
| Criado em | `created_at` |
| Última visualização | `last_viewed_at` (ou "nunca visualizado") |
| Ações | Pausar/Reativar, Copiar link, Ver documento, (futuro: editar) |

`admin` vê todos os onboardings; `gestor_trafego` vê os que ele mesmo criou (via RLS `created_by = auth.uid()`, exceto se for admin).

## Conteúdo do documento — os 12 blocos

Este é o conteúdo validado que o documento deve estruturar. **Importante: o objetivo de cada bloco é funcional, não "ter aquele slide". Não copiar a estrutura antiga do Canva.**

1. **O seu negócio, como eu entendi** — devolve organizado o que a clínica respondeu no formulário (serviços, diferencial, público descrito, regiões, horários, sazonalidade), com espaço explícito para ela corrigir o que estiver errado. Função: ela precisa se reconhecer antes de qualquer proposta, e é aqui que valida dado — tirando isso da call.

2. **Onde você está hoje** — faturamento dos últimos 3 meses, ticket médio, custo operacional, margem, verba de anúncio. Inclui o cálculo de quantos pacientes/mês são necessários só para cobrir a operação (custo ÷ (ticket × margem)). Função: linha de base mensurável.

3. **Onde você quer chegar — em pacientes, não só em reais** — a meta declarada traduzida: meta (R$) → nº de pacientes (÷ ticket) → nº de leads necessários (÷ taxas de conversão) → verba necessária (× CPL). Apresentar em 3 níveis (inicial/intermediária/super meta). As taxas de conversão usadas devem aparecer explícitas na tela (são teóricas/históricas, fornecidas pelo usuário — não inventar). Função: expor no papel se a meta cabe na verba, antes de virar frustração depois.

4. **Para quem vamos anunciar** — ICP/persona: perfil demográfico, dores, desejos, nível de consciência sobre o procedimento. Este bloco vem de documento externo que o gestor já produz (ICP/persona e região) — **não deve ser inventado pela IA/sistema**, é input manual do gestor.

5. **Onde vamos anunciar — e onde não vamos** — regiões incluídas e excluídas, cada exclusão com a razão (ex.: poder aquisitivo não sustenta o ticket). Mesmo tipo de input do bloco 4: vem da análise territorial que o gestor já faz, não é gerado automaticamente.

6. **O caminho do paciente** — do anúncio ao agendamento: por onde entra, para onde vai, quem responde.

7. **As fases** — Fase 1 e Fase 2 (ou mais, se houver), com % de verba em cada uma, objetivo de cada fase, e o gatilho de mudança de fase (quando e por quê).

8. **O que os anúncios vão dizer** — formatos de criativo específicos para o caso da clínica, ângulos de mensagem, copy de partida, link de referências (pasta de criativos). Não incluir teoria genérica de anúncio aqui (isso vai para o Manual do Método, ver abaixo).

9. **Riscos que assumimos juntos** — inclui o que a própria clínica identificou como "ponto fraco da operação" no formulário, mais o que o gestor identificou. Função: se o risco está escrito e assinado desde o dia 1, um problema (ex.: recepção lenta) vira responsabilidade conjunta com plano de ação, não falha unilateral da agência.

10. **O que precisa de você** — checklist com prazo e responsável: acessos (incluindo o que a clínica precisa ter em mãos para o setup do Meta Ads — login, senha, 2FA, se há Business Manager antiga vinculada), criativos a gravar, tempo de resposta no WhatsApp, aprovações pendentes. **O acesso ao Meta Ads continua sendo configurado ao vivo na call** (junto com o gestor, ou a clínica envia os dados por chat para o gestor configurar sozinho) — este bloco só prepara a clínica para isso ser rápido, não substitui a etapa.

11. **Como vamos trabalhar juntos** — canal de comunicação, frequência de report, o que a clínica pode esperar (puxado da preferência de comunicação que ela marcou no formulário). Inclui, devolvido nas palavras dela, o que ela respondeu sobre "o que precisa acontecer para a parceria valer a pena".

12. **Os primeiros 30 dias** — cronograma com datas reais (quando a campanha sobe, quando aparecem os primeiros leads, quando começa a otimização, quando é a primeira reunião de resultado), e explicitamente **o que não vai acontecer** (que os primeiros 7-14 dias são de aprendizado do algoritmo, CPL começa alto e cai, dado de poucos dias não é conclusivo). Função: ancorar expectativa e evitar percepção de fracasso prematuro.

### O que NÃO entra no documento de onboarding

Conteúdo educacional/genérico do método Resili Sevenn (estrutura de gancho/corpo/CTA, enquadramento de vídeo, duração ideal, diferença entre anúncio publicado e escondido, dicas de Instagram orgânico) **não deve ser gerado por cliente**. Isso é material fixo, igual para todos, e deve virar um documento/página separada e permanente ("Manual do Método"), fora do escopo deste projeto por ora — mas a arquitetura de conteúdo deve deixar claro, nos componentes, que esses blocos não pertencem ao payload por-cliente.

## Fontes de dados (input do gestor, colado manualmente — sem integração automática)

- **Formulário de onboarding** (Google Forms) — respostas da clínica: nome, Instagram, WhatsApp, acessos, público-alvo, faturamento, ticket médio, custo operacional, margem, meta de faturamento, serviços, diferencial, ponto fraco, concorrentes, preferência de comunicação, objetivo da parceria, etc. Hoje as respostas vão para Google Sheets.
- **ICP/persona e análise territorial** — documento que o gestor já produz por fora (não gerado pelo sistema).
- **Taxas de conversão teóricas** (lead→agendamento, agendamento→comparecimento, comparecimento→fechamento) — fornecidas pelo gestor/usuário, usadas no cálculo do bloco 3. Podem variar por tipo de clínica (confirmar com o usuário se são fixas ou ajustáveis no formulário de geração).

Não há integração automática com Google Sheets neste momento — o volume (1-3 onboardings/mês) não justifica a complexidade. O gestor cola as respostas manualmente em um formulário interno do próprio app, que já monta o `payload` estruturado. Automação de leitura do Sheets pode ser reavaliada depois, se o volume crescer.

## Identidade visual

Seguir a mesma identidade do site institucional (`website-resili-sevenn`, ver `CLAUDE.md` na raiz daquele repositório): paleta Obsidian/Emerald Deep/Sevenn Green/Bone, DM Serif Display para headlines, Geist para corpo/UI, Geist Mono para números e métricas. Zero emoji, zero ícone colorido, sem gradiente decorativo. O documento de onboarding deve ser reconhecível como Resili Sevenn — não como apresentação de agência genérica.

Formato de leitura: **página web longa, com navegação lateral fixa pelos 12 blocos** (não slides, não PDF) — pensado para ser consultado depois da call (cronograma, checklist), não só apresentado uma vez.

## Domínio e deploy

- Domínio: `onboarding.resilisevenn.com.br`
- Deploy: Vercel, projeto próprio (repositório separado do `proposta-resili-sevenn`)
- Variáveis de ambiente necessárias: `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` — **mesmos valores do projeto `proposta-resili-sevenn`**, pois o banco é compartilhado.

## Fora de escopo por ora

- Manual do Método (documento fixo com conteúdo educacional) — mencionar que ele vai existir, mas não construir agora.
- Integração automática com Google Sheets/Forms.
- Edição do onboarding depois de criado (o painel deve permitir pausar/reativar; edição de conteúdo pode ser via re-geração ou é decisão a discutir depois).
- Autenticação/acesso da própria clínica além do código de 4 dígitos (sem conta, sem senha).

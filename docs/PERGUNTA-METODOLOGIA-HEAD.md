# Pergunta para o Head de Tráfego — Base de Metodologia para IA

## Contexto

Estamos construindo o sistema de Onboarding Digital (documento web que substitui o
slide de Canva enviado ao cliente antes da call de onboarding). O documento tem 12
blocos. Já implementamos extração automática por IA a partir da transcrição/resumo
da call para reduzir preenchimento manual do gestor: hoje a IA já preenche
automaticamente os blocos **1 (negócio), 6 (caminho do paciente), 10 (checklist),
11 (comunicação) e 12 (primeiros 30 dias)** a partir do que for dito na call — o
gestor sempre revisa antes de gerar o documento, nada é salvo sem revisão humana.

Queremos ampliar essa automação para os blocos **7 (fases), 8 (criativos) e 9
(riscos)**. O problema: diferente dos blocos já automatizados, esses três blocos
não são só "o que o cliente disse na call" — parte do conteúdo é *metodologia da
agência*, coisa que se repete entre clientes e não necessariamente é discutida
com o cliente na call. Precisamos saber se esse padrão existe e qual é, porque a
IA **não pode inventar método que não existe** — isso é regra do projeto desde o
início (o briefing original já proibia isso para os blocos de ICP/território).

## O que precisamos decidir

### 1. Bloco 7 — Fases

Quando vocês estruturam uma campanha nova, existe um padrão que se repete? Por
exemplo (isto é só ilustrativo, não é o que vamos usar):
- "Fase 1 = teste de criativos, ~20% da verba, dura 1-2 semanas, muda de fase
  quando o CPL estabiliza"
- "Fase 2 = escala do que validou, ~80% da verba"

**Pergunta**: esse tipo de estrutura de fases é padronizada (mesmo número de
fases, mesma lógica de % de verba e gatilho de mudança, mudando só os números
finos por cliente) ou cada cliente tem uma estrutura de fases desenhada do zero,
sem repetição?

### 2. Bloco 8 — O que os anúncios vão dizer (criativos)

Existem formatos de criativo que vocês recomendam com frequência para esse nicho
(estética facial / odontologia estética)? Exemplos ilustrativos:
- Vídeo depoimento de paciente
- Reels antes/depois
- Estático com prova social
- Criativo de dor + solução

**Pergunta**: há uma lista de formatos/ângulos de mensagem que se repete entre
clientes desse segmento, ou isso é sempre definido caso a caso a partir da
análise específica daquele cliente?

### 3. Bloco 9 — Riscos operacionais comuns

Existem riscos que vocês já viram se repetir entre clínicas desse tipo de
negócio? Exemplos ilustrativos:
- Recepção demora para responder o WhatsApp do lead
- Cliente sem CRM/planilha para rastrear origem do lead
- Agenda cheia mas sem confirmação prévia → no-show alto

**Pergunta**: existe uma lista de riscos operacionais recorrentes que vocês já
identificam de cara nesse tipo de clínica, mesmo antes de conhecer a operação
específica do cliente?

## Como a resposta muda a implementação

- **Se existe padrão real e documentável** para qualquer um dos três blocos: nos
  passa o conteúdo (pode ser texto corrido, não precisa ser estruturado) que a
  gente configura como contexto de referência para a IA. Ela vai usar isso como
  base e adaptar ao cliente específico com o que vier da transcrição da call —
  o gestor continua revisando e editando tudo antes de gerar o documento.
- **Se não existe padrão** (cada cliente é desenhado do zero nesses três blocos):
  não criamos essa base. A IA extrai apenas o que a transcrição mencionar
  explicitamente para esses blocos (podendo ficar vazio, indo pro preenchimento
  manual do gestor) — sem propor fases/criativos/riscos genéricos.
- **Resposta parcial também é válida** — por exemplo, pode ser que só bloco 9
  (riscos) tenha padrão suficiente, e blocos 7/8 sejam sempre sob medida. Nesse
  caso automatizamos só o que tiver base real.
- **Se o padrão existe mas é confidencial demais para entrar no sistema** (nem
  tudo da metodologia da agência precisa ou deve estar documentado em código —
  ainda mais hoje, com o repositório no GitHub como **público**): também é uma
  resposta válida. Nesse caso, deixamos esse conteúdo de fora da automação e o
  gestor continua preenchendo manualmente esses trechos específicos, sem
  problema. Vale inclusive já decidirmos agora se o repositório deveria virar
  privado, independente da resposta sobre a base de conhecimento.

## Onde isso vai morar no código (para referência técnica, se for relevante)

`api/_lib/agencyKnowledgeBase.ts` — hoje está como placeholder vazio, com o aviso
explícito de que a IA não deve propor nada nesses blocos enquanto o arquivo
estiver vazio. Assim que tivermos a resposta, preenchemos esse arquivo com o
conteúdo real.

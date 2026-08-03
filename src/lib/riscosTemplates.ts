export interface RiscoTemplate {
  id: 'so_trafego' | 'trafego_comercial' | 'trafego_posicionamento_comercial' | 'completo_crc'
  nome: string
  frentesContratadas: string
  riscos: { descricao: string; origem: 'clinica' | 'gestor'; planoDeAcao: string }[]
}

const RISCO_SAZONALIDADE = {
  descricao: 'Sazonalidade do negócio não é avisada com antecedência, e o cliente estranha quando o resultado varia.',
  origem: 'clinica' as const,
  planoDeAcao: 'A clínica avisa com antecedência os períodos de sazonalidade (feriados, alta/baixa temporada) para ajustar a expectativa de resultado.',
}

const RISCO_CORTE_VERBA = {
  descricao: 'O cliente corta ou reduz a verba de anúncio num mês mais fraco, o que prejudica os resultados justamente quando o algoritmo estava aprendendo.',
  origem: 'clinica' as const,
  planoDeAcao: 'Manter a verba combinada mesmo em meses mais fracos — cortes prejudicam o aprendizado do algoritmo e atrasam os resultados.',
}

const RISCO_RECEPCAO_LENTA = {
  descricao: 'A recepção não responde rápido ao lead que chegou pelo anúncio (lead esfria em minutos, não em horas).',
  origem: 'clinica' as const,
  planoDeAcao: 'Definir um tempo máximo de resposta ao lead (ideal: minutos) e priorizar o atendimento a leads de anúncio na rotina da recepção.',
}

const RISCO_NO_SHOW = {
  descricao: 'Falta de confirmação de agendamento, gerando falta do paciente no dia.',
  origem: 'clinica' as const,
  planoDeAcao: 'Implementar confirmação de agendamento (mensagem ou ligação) 1 dia antes da consulta.',
}

const RISCO_SEM_RASTREIO = {
  descricao: 'Não existe forma de rastrear de onde veio cada paciente, dificultando provar o resultado depois.',
  origem: 'gestor' as const,
  planoDeAcao: 'Estruturar um processo simples de origem do lead na recepção, até que a clínica tenha um CRM implementado.',
}

const RISCO_OBJECAO_PRECO = {
  descricao: 'Objeção de preço mal tratada na primeira conversa com o lead.',
  origem: 'clinica' as const,
  planoDeAcao: 'Alinhar com a equipe de atendimento um roteiro de resposta para as objeções de preço mais comuns.',
}

const RISCO_RESPONSAVEL_INDEFINIDO = {
  descricao: 'Ninguém é claramente responsável por atender o lead — mensagens inconsistentes, contato perdido.',
  origem: 'clinica' as const,
  planoDeAcao: 'Definir uma única pessoa responsável por cada lead até o agendamento, evitando que a mensagem se perca entre a equipe.',
}

const RISCO_ANUNCIO_GENERICO = {
  descricao:
    'Sem posicionamento, quem chega pelo anúncio ainda não conhece o profissional: nível de confiança e consciência baixos, muitas vezes é o primeiro contato e a pessoa ainda compara por preço.',
  origem: 'gestor' as const,
  planoDeAcao: 'Refinar segmentação e criativos ao longo da fase de aprendizado para qualificar melhor quem chega pelo anúncio.',
}

const RISCO_SEM_CONTEUDO_ATIVO = {
  descricao:
    'Não existe presença orgânica (Instagram, conteúdo educativo, prova social contínua) para o lead consultar antes ou depois de ver o anúncio: quem chega ainda não conhece o profissional, nível de confiança e consciência baixos, muitas vezes é o primeiro contato e a pessoa ainda compara por preço.',
  origem: 'clinica' as const,
  planoDeAcao: 'Recomendar a clínica manter um mínimo de conteúdo orgânico ativo, mesmo sem a frente de Posicionamento contratada.',
}

export const RISCOS_TEMPLATES: RiscoTemplate[] = [
  {
    id: 'so_trafego',
    nome: 'Cliente só contratou Tráfego Pago',
    frentesContratadas: 'Sem Posicionamento, sem Estruturação Comercial, sem Atendimento Ouro (CRC).',
    riscos: [
      RISCO_RECEPCAO_LENTA,
      RISCO_NO_SHOW,
      RISCO_SEM_RASTREIO,
      RISCO_OBJECAO_PRECO,
      RISCO_SEM_CONTEUDO_ATIVO,
      RISCO_SAZONALIDADE,
    ],
  },
  {
    id: 'trafego_comercial',
    nome: 'Cliente contratou Tráfego + Estruturação Comercial',
    frentesContratadas: 'Tem CRM/processo comercial, mas sem Posicionamento e sem Atendimento Ouro (CRC).',
    riscos: [
      RISCO_RECEPCAO_LENTA,
      RISCO_NO_SHOW,
      RISCO_RESPONSAVEL_INDEFINIDO,
      RISCO_ANUNCIO_GENERICO,
      RISCO_SEM_CONTEUDO_ATIVO,
      RISCO_SAZONALIDADE,
    ],
  },
  {
    id: 'trafego_posicionamento_comercial',
    nome: 'Cliente contratou Tráfego + Posicionamento + Comercial',
    frentesContratadas: 'Tem CRM e conteúdo/autoridade, mas ainda sem Atendimento Ouro (CRC).',
    riscos: [RISCO_RECEPCAO_LENTA, RISCO_NO_SHOW, RISCO_RESPONSAVEL_INDEFINIDO, RISCO_SAZONALIDADE],
  },
  {
    id: 'completo_crc',
    nome: 'Cliente com o ecossistema completo (inclui Atendimento Ouro)',
    frentesContratadas: 'Tem Posicionamento, Comercial e Atendimento Ouro (CRC) cuidando dos leads.',
    riscos: [RISCO_SAZONALIDADE, RISCO_CORTE_VERBA],
  },
]

export const RISCO_REATIVACAO_BASE = {
  descricao: 'Contatos antigos, leads que não fecharam ou pacientes que sumiram nunca são reaproveitados — é receita que já foi paga uma vez e está sendo desperdiçada.',
  origem: 'gestor' as const,
  planoDeAcao: 'Incluir a Reativação de Base como frente de trabalho para reaproveitar contatos antigos.',
}

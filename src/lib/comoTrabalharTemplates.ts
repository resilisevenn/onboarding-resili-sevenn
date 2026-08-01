export const CANAL_COMUNICACAO_PADRAO = 'Grupo dedicado no WhatsApp entre clínica e gestor de tráfego.'
export const FREQUENCIA_REPORT_PADRAO = 'Relatório mensal + 1 reunião mensal de alinhamento.'

export interface OQuePodeEsperarTemplate {
  id: string
  texto: string
}

export const O_QUE_PODE_ESPERAR_TEMPLATES: OQuePodeEsperarTemplate[] = [
  {
    id: 'consultiva',
    texto:
      'Transparência total sobre números, suporte de segunda a sexta das 9h às 19h com resposta em até 3 horas, e recomendações proativas — não vamos só executar, vamos pensar estrategicamente com você.',
  },
  {
    id: 'direta',
    texto:
      'Atualização constante do andamento das campanhas, clareza nos números e disponibilidade para dúvidas dentro do prazo combinado.',
  },
  {
    id: 'parceria',
    texto:
      'Acompanhamento próximo em cada etapa, com dados claros sobre o que está funcionando e ajustes explicados antes de serem feitos — você nunca fica no escuro sobre o próprio investimento.',
  },
]

export interface CitacaoPadraoTemplate {
  id: string
  texto: string
}

export const CITACAO_PADRAO_TEMPLATES: CitacaoPadraoTemplate[] = [
  {
    id: 'agenda_previsivel',
    texto: 'Ver a agenda cheia de forma previsível, sem precisar me preocupar com marketing no dia a dia.',
  },
  {
    id: 'fluxo_constante',
    texto: 'Ter um fluxo constante de pacientes novos, sem depender só de indicação.',
  },
  {
    id: 'retorno_claro',
    texto: 'Saber que o investimento em anúncio está trazendo retorno de verdade, com números que eu consigo entender.',
  },
]

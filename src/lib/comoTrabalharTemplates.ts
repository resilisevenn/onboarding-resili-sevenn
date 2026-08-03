export const CANAL_COMUNICACAO_PADRAO = 'Grupo dedicado no WhatsApp entre clínica e equipe.'
export const FREQUENCIA_REPORT_PADRAO = 'Relatório mensal + 1 reunião mensal de alinhamento.'

export interface OQuePodeEsperarTemplate {
  id: string
  nome: string
  itens: string[]
}

export const O_QUE_PODE_ESPERAR_TEMPLATES: OQuePodeEsperarTemplate[] = [
  {
    id: 'consultiva',
    nome: 'Consultiva',
    itens: [
      'Transparência total sobre números',
      'Suporte de segunda a sexta das 9h às 19h com resposta em até 3 horas',
      'Recomendações proativas: não vamos só executar, vamos pensar estrategicamente com você',
    ],
  },
  {
    id: 'direta',
    nome: 'Direta',
    itens: [
      'Atualização constante do andamento das campanhas',
      'Clareza nos números',
      'Disponibilidade para dúvidas dentro do prazo combinado',
    ],
  },
  {
    id: 'parceria',
    nome: 'Parceria',
    itens: [
      'Acompanhamento próximo em cada etapa',
      'Dados claros sobre o que está funcionando',
      'Ajustes explicados antes de serem feitos: você nunca fica no escuro sobre o próprio investimento',
    ],
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

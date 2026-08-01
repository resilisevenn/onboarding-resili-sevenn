import type { EventoCronograma } from '../types/onboarding'

function addDias(base: Date, dias: number): string {
  const d = new Date(base)
  d.setDate(d.getDate() + dias)
  return d.toISOString().slice(0, 10)
}

export function buildCronogramaPadrao(dataInicio: Date = new Date()): EventoCronograma[] {
  return [
    {
      data: addDias(dataInicio, 0),
      descricao: 'Início oficial da parceria: hoje, essa reunião e alinhamento de expectativas.',
    },
    {
      data: addDias(dataInicio, 2),
      descricao:
        'Estruturação do Marketing: configuração da captação de leads (estratégia, conta de anúncios e anúncios) e estruturação do Posicionamento/Conteúdos (quando contratado).',
    },
    {
      data: addDias(dataInicio, 7),
      descricao: 'Lançamento das campanhas: início da geração de demanda.',
    },
    {
      data: addDias(dataInicio, 15),
      descricao:
        'Primeiros leads e possíveis primeiros agendamentos: primeira leitura de dados, ajustes iniciais de segmentação e otimização dos resultados da primeira semana. Primeiro relatório de meio de período, com checagem de CPL e volume de leads.',
    },
    {
      data: addDias(dataInicio, 30),
      descricao: 'Fechamento do primeiro ciclo: resultados tendem a melhorar e estabilizar.',
    },
  ]
}

export const O_QUE_NAO_VAI_ACONTECER_PADRAO: string[] = [
  'Resultado explosivo imediato, pois o algoritmo ainda está aprendendo.',
  'Mudança de estratégia a cada poucos dias, pois testes precisam de tempo pra gerar dado confiável.',
  'Não podemos deixar a verba acabar em hipótese alguma, pois perde performance na campanha.',
]

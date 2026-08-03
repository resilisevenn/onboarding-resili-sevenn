import type { Bloco2OndeVoceEsta, Bloco3OndeQuerChegar } from '../types/onboarding'

export const PERCENTUAL_CAPTACAO_LEADS_PADRAO = 0.85

export function calcPacientesCobertura(data: Bloco2OndeVoceEsta): number {
  if (data.ticketMedio <= 0 || data.margem <= 0) return 0
  return data.custoOperacionalMensal / (data.ticketMedio * data.margem)
}

export function calcFaturamentoMedio(data: Pick<Bloco2OndeVoceEsta, 'faturamentoUltimos3Meses'>): number {
  return data.faturamentoUltimos3Meses.reduce((sum, v) => sum + v, 0) / data.faturamentoUltimos3Meses.length
}

/** Taxa geral de conversão lead → fechamento: produto das três taxas de funil. */
export function calcTaxaLeadParaFechamento(
  b3: Pick<Bloco3OndeQuerChegar, 'taxaLeadParaAgendamento' | 'taxaAgendamentoParaComparecimento' | 'taxaComparecimentoParaFechamento'>,
): number {
  return b3.taxaLeadParaAgendamento * b3.taxaAgendamentoParaComparecimento * b3.taxaComparecimentoParaFechamento
}

/**
 * O gap de faturamento parte da média dos últimos 3 meses, não de zero:
 * a meta é o quanto falta faturar a mais para sair do patamar atual e chegar no nível desejado.
 *
 * percentualCaptacaoLeads só afeta o número de leads necessários (parte da verba vai para
 * geração de base/audiência, então é preciso gerar mais leads com a fatia que sobra para captação).
 * A verba exibida é sempre o valor total (100%) que a clínica precisa investir — nunca reduzida
 * pelo percentual, para não passar a impressão de que dá para investir menos.
 */
export function calcNivelMeta(
  metaFaturamento: number,
  ticketMedio: number,
  b3: Pick<Bloco3OndeQuerChegar, 'taxaLeadParaAgendamento' | 'taxaAgendamentoParaComparecimento' | 'taxaComparecimentoParaFechamento' | 'cplEstimado'>,
  faturamentoAtual: number = 0,
  percentualCaptacaoLeads: number = PERCENTUAL_CAPTACAO_LEADS_PADRAO,
) {
  const gapFaturamento = Math.max(0, metaFaturamento - faturamentoAtual)
  const numPacientes = ticketMedio > 0 ? gapFaturamento / ticketMedio : 0
  const taxaGeral = calcTaxaLeadParaFechamento(b3)
  const numLeadsCaptacao = taxaGeral > 0 ? numPacientes / taxaGeral : 0
  const percentual = percentualCaptacaoLeads > 0 ? percentualCaptacaoLeads : PERCENTUAL_CAPTACAO_LEADS_PADRAO
  const numLeads = numLeadsCaptacao / percentual
  const verbaNecessaria = numLeadsCaptacao * b3.cplEstimado
  return { numPacientes, numLeads, verbaNecessaria }
}

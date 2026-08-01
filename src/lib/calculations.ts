import type { Bloco2OndeVoceEsta, Bloco3OndeQuerChegar } from '../types/onboarding'

export function calcPacientesCobertura(data: Bloco2OndeVoceEsta): number {
  if (data.ticketMedio <= 0 || data.margem <= 0) return 0
  return data.custoOperacionalMensal / (data.ticketMedio * data.margem)
}

export function calcNivelMeta(
  metaFaturamento: number,
  ticketMedio: number,
  b3: Pick<Bloco3OndeQuerChegar, 'taxaLeadParaAgendamento' | 'taxaAgendamentoParaComparecimento' | 'taxaComparecimentoParaFechamento' | 'cplEstimado'>,
) {
  const numPacientes = ticketMedio > 0 ? metaFaturamento / ticketMedio : 0
  const taxaGeral = b3.taxaLeadParaAgendamento * b3.taxaAgendamentoParaComparecimento * b3.taxaComparecimentoParaFechamento
  const numLeads = taxaGeral > 0 ? numPacientes / taxaGeral : 0
  const verbaNecessaria = numLeads * b3.cplEstimado
  return { numPacientes, numLeads, verbaNecessaria }
}

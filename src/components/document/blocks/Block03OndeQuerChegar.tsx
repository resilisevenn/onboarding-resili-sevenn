import type { Bloco3OndeQuerChegar } from '../../../types/onboarding'
import { formatCurrency, formatNumber, formatPercent } from '../../../lib/format'
import { BlockHeading } from '../BlockHeading'

const NIVEL_LABEL: Record<string, string> = {
  inicial: 'Meta inicial',
  intermediaria: 'Meta intermediária',
  super_meta: 'Super meta',
}

export function Block03OndeQuerChegar({
  data,
  ticketMedio,
}: {
  data: Bloco3OndeQuerChegar
  ticketMedio: number
}) {
  return (
    <div>
      <BlockHeading
        title="Onde você quer chegar — em pacientes, não só em reais"
        subtitle="A meta declarada traduzida em pacientes, leads e verba necessária."
      />

      <div className="mb-6 grid gap-3 text-sm text-obsidian/60">
        <p>
          Taxas de conversão usadas (histórico/teórico): lead → agendamento{' '}
          <span className="font-mono text-obsidian">{formatPercent(data.taxaLeadParaAgendamento)}</span>, agendamento →
          comparecimento <span className="font-mono text-obsidian">{formatPercent(data.taxaAgendamentoParaComparecimento)}</span>,
          comparecimento → fechamento{' '}
          <span className="font-mono text-obsidian">{formatPercent(data.taxaComparecimentoParaFechamento)}</span>. CPL estimado:{' '}
          <span className="font-mono text-obsidian">{formatCurrency(data.cplEstimado)}</span>.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {data.niveis.map((nivel) => {
          const numPacientes = ticketMedio > 0 ? nivel.metaFaturamento / ticketMedio : 0
          const taxaGeral =
            data.taxaLeadParaAgendamento * data.taxaAgendamentoParaComparecimento * data.taxaComparecimentoParaFechamento
          const numLeads = taxaGeral > 0 ? numPacientes / taxaGeral : 0
          const verbaNecessaria = numLeads * data.cplEstimado

          return (
            <div key={nivel.nome} className="rounded border border-obsidian/10 p-4">
              <p className="mb-2 text-sm font-medium text-obsidian/50">{NIVEL_LABEL[nivel.nome] ?? nivel.nome}</p>
              <p className="font-mono text-xl">{formatCurrency(nivel.metaFaturamento)}</p>
              <dl className="mt-4 space-y-1 text-sm text-obsidian/70">
                <div className="flex justify-between">
                  <dt>Pacientes/mês</dt>
                  <dd className="font-mono text-obsidian">{formatNumber(numPacientes)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Leads necessários</dt>
                  <dd className="font-mono text-obsidian">{formatNumber(numLeads)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Verba necessária</dt>
                  <dd className="font-mono text-obsidian">{formatCurrency(verbaNecessaria)}</dd>
                </div>
              </dl>
            </div>
          )
        })}
      </div>
    </div>
  )
}

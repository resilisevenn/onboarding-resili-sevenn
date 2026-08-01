import type { Bloco3OndeQuerChegar } from '../../../types/onboarding'
import { formatCurrency, formatNumber, formatPercent } from '../../../lib/format'
import { calcNivelMeta } from '../../../lib/calculations'
import { BlockHeading } from '../BlockHeading'
import { EditableNumber, EditablePercent } from '../EditableField'

const NIVEL_LABEL: Record<string, string> = {
  inicial: 'Meta inicial',
  intermediaria: 'Meta intermediária',
  super_meta: 'Super meta',
}

export function Block03OndeQuerChegar({
  data,
  ticketMedio,
  editable = false,
  onChange,
}: {
  data: Bloco3OndeQuerChegar
  ticketMedio: number
  editable?: boolean
  onChange?: (data: Bloco3OndeQuerChegar) => void
}) {
  return (
    <div>
      <BlockHeading
        title="Onde você quer chegar — em pacientes, não só em reais"
        subtitle="A meta declarada traduzida em pacientes, leads e verba necessária."
      />

      <div className="mb-6 grid gap-3 text-sm text-obsidian/60">
        {editable && onChange ? (
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
            Taxas de conversão usadas (histórico/teórico): lead → agendamento
            <EditablePercent value={data.taxaLeadParaAgendamento} onChange={(v) => onChange({ ...data, taxaLeadParaAgendamento: v })} />
            , agendamento → comparecimento
            <EditablePercent
              value={data.taxaAgendamentoParaComparecimento}
              onChange={(v) => onChange({ ...data, taxaAgendamentoParaComparecimento: v })}
            />
            , comparecimento → fechamento
            <EditablePercent
              value={data.taxaComparecimentoParaFechamento}
              onChange={(v) => onChange({ ...data, taxaComparecimentoParaFechamento: v })}
            />
            . CPL estimado:
            <EditableNumber value={data.cplEstimado} step={0.01} prefix="R$" onChange={(v) => onChange({ ...data, cplEstimado: v })} />
          </p>
        ) : (
          <p>
            Taxas de conversão usadas (histórico/teórico): lead → agendamento{' '}
            <span className="font-mono text-obsidian">{formatPercent(data.taxaLeadParaAgendamento)}</span>, agendamento →
            comparecimento <span className="font-mono text-obsidian">{formatPercent(data.taxaAgendamentoParaComparecimento)}</span>,
            comparecimento → fechamento{' '}
            <span className="font-mono text-obsidian">{formatPercent(data.taxaComparecimentoParaFechamento)}</span>. CPL estimado:{' '}
            <span className="font-mono text-obsidian">{formatCurrency(data.cplEstimado)}</span>.
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {data.niveis.map((nivel, i) => {
          const { numPacientes, numLeads, verbaNecessaria } = calcNivelMeta(nivel.metaFaturamento, ticketMedio, data)

          return (
            <div key={nivel.nome} className="rounded border border-obsidian/10 p-4">
              <p className="mb-2 text-sm font-medium text-obsidian/50">{NIVEL_LABEL[nivel.nome] ?? nivel.nome}</p>
              {editable && onChange ? (
                <EditableNumber
                  value={nivel.metaFaturamento}
                  prefix="R$"
                  className="text-xl"
                  onChange={(v) => {
                    const next = [...data.niveis]
                    next[i] = { ...next[i], metaFaturamento: v }
                    onChange({ ...data, niveis: next })
                  }}
                />
              ) : (
                <p className="font-mono text-xl">{formatCurrency(nivel.metaFaturamento)}</p>
              )}
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

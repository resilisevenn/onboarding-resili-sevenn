import type { Bloco2OndeVoceEsta, Bloco3OndeQuerChegar, NivelMeta } from '../../../types/onboarding'
import { formatCurrency, formatNumber, formatPercent } from '../../../lib/format'
import { calcFaturamentoMedio, calcNivelMeta, calcTaxaLeadParaFechamento } from '../../../lib/calculations'
import { BlockHeading } from '../BlockHeading'
import { EditableNumber, EditablePercent } from '../EditableField'
import { cn } from '../../../lib/utils'

const NIVEL_LABEL: Record<string, string> = {
  inicial: 'Meta inicial',
  intermediaria: 'Meta intermediária',
  super_meta: 'Super meta',
}

// Ordem de exibição: super_meta em destaque primeiro, depois os demais na ordem original.
function orderNiveis(niveis: NivelMeta[]): NivelMeta[] {
  const featured = niveis.filter((n) => n.nome === 'super_meta')
  const rest = niveis.filter((n) => n.nome !== 'super_meta')
  return [...featured, ...rest]
}

export function Block03OndeQuerChegar({
  data,
  ticketMedio,
  bloco2,
  editable = false,
  onChange,
}: {
  data: Bloco3OndeQuerChegar
  ticketMedio: number
  bloco2: Bloco2OndeVoceEsta
  editable?: boolean
  onChange?: (data: Bloco3OndeQuerChegar) => void
}) {
  const faturamentoAtual = calcFaturamentoMedio(bloco2)
  const taxaLeadParaFechamento = calcTaxaLeadParaFechamento(data)
  return (
    <div>
      <BlockHeading
        number={3}
        title="Onde você quer chegar"
        subtitle="A meta declarada traduzida em pacientes, leads e verba necessária."
      />

      <div className="mb-8 text-sm text-obsidian/60">
        {editable && onChange ? (
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
            Taxas de conversão usadas (histórico/teórico):
            <br />
            lead → agendamento
            <EditablePercent value={data.taxaLeadParaAgendamento} onChange={(v) => onChange({ ...data, taxaLeadParaAgendamento: v })} />
            ,
            <br />
            agendamento → comparecimento
            <EditablePercent
              value={data.taxaAgendamentoParaComparecimento}
              onChange={(v) => onChange({ ...data, taxaAgendamentoParaComparecimento: v })}
            />
            ,
            <br />
            comparecimento → fechamento
            <EditablePercent
              value={data.taxaComparecimentoParaFechamento}
              onChange={(v) => onChange({ ...data, taxaComparecimentoParaFechamento: v })}
            />
            .
            <br />
            Taxa conv. leads → fechamento (calculada automaticamente):{' '}
            <span className="font-mono text-obsidian">{formatPercent(taxaLeadParaFechamento)}</span>.
            <br />
            CPL estimado:
            <EditableNumber value={data.cplEstimado} step={0.01} prefix="R$" onChange={(v) => onChange({ ...data, cplEstimado: v })} />
          </p>
        ) : (
          <p>
            Taxas de conversão usadas (histórico/teórico):
            <br />
            lead → agendamento <span className="font-mono text-obsidian">{formatPercent(data.taxaLeadParaAgendamento)}</span>,
            <br />
            agendamento → comparecimento{' '}
            <span className="font-mono text-obsidian">{formatPercent(data.taxaAgendamentoParaComparecimento)}</span>,
            <br />
            comparecimento → fechamento{' '}
            <span className="font-mono text-obsidian">{formatPercent(data.taxaComparecimentoParaFechamento)}</span>.
            <br />
            Taxa conv. leads → fechamento (calculada automaticamente):{' '}
            <span className="font-mono text-obsidian">{formatPercent(taxaLeadParaFechamento)}</span>.
            <br />
            CPL estimado: <span className="font-mono text-obsidian">{formatCurrency(data.cplEstimado)}</span>.
          </p>
        )}
      </div>

      <div className="mb-8 text-sm text-obsidian/60">
        <p>
          Ponto de partida (faturamento médio atual): <span className="font-mono text-obsidian">{formatCurrency(faturamentoAtual)}</span>.
          As metas abaixo representam o quanto falta faturar a mais para sair desse patamar.
          <br />
          Alocação da verba: <span className="font-mono text-obsidian">{formatPercent(bloco2.percentualCaptacaoLeads)}</span> em
          captação de leads, o restante em geração de base/audiência.
        </p>
      </div>

      <div className="grid items-stretch gap-5 md:grid-cols-[1.4fr_1fr_1fr]">
        {orderNiveis(data.niveis).map((nivel) => {
          const originalIndex = data.niveis.findIndex((n) => n.nome === nivel.nome)
          const { numPacientes, numLeads, verbaNecessaria } = calcNivelMeta(
            nivel.metaFaturamento,
            ticketMedio,
            data,
            faturamentoAtual,
            bloco2.percentualCaptacaoLeads,
          )
          const featured = nivel.nome === 'super_meta'

          return (
            <div
              key={nivel.nome}
              className={cn(
                'rounded-[18px] border p-6 transition-[box-shadow,transform,background,border-color] duration-150',
                featured
                  ? 'border-2 border-brand bg-gradient-to-br from-[var(--color-doc-dark)] to-obsidian-alt text-bone shadow-[0_12px_32px_rgba(89,165,44,0.25)]'
                  : 'border-obsidian/10 bg-gradient-to-b from-obsidian/[0.015] to-transparent shadow-[0_1px_2px_rgba(11,19,16,0.04),0_4px_12px_rgba(11,19,16,0.05)] hover:-translate-y-0.5 hover:border-brand/60 hover:bg-gradient-to-b hover:from-brand/[0.28] hover:to-brand/10 hover:shadow-[0_2px_4px_rgba(11,19,16,0.06),0_10px_24px_rgba(89,165,44,0.22)]',
              )}
            >
              <p
                className={cn(
                  'mb-2 text-sm font-bold uppercase tracking-wide',
                  featured ? 'text-brand-light' : 'text-obsidian/70',
                )}
              >
                {NIVEL_LABEL[nivel.nome] ?? nivel.nome}
              </p>
              {editable && onChange ? (
                <EditableNumber
                  value={nivel.metaFaturamento}
                  prefix="R$"
                  className={cn(featured ? 'text-2xl' : 'text-xl')}
                  onChange={(v) => {
                    const next = [...data.niveis]
                    next[originalIndex] = { ...next[originalIndex], metaFaturamento: v }
                    onChange({ ...data, niveis: next })
                  }}
                />
              ) : (
                <p className={cn('font-mono font-bold', featured ? 'text-4xl text-brand-light' : 'text-2xl text-brand-hover')}>
                  {formatCurrency(nivel.metaFaturamento)}
                </p>
              )}
              <dl className={cn('mt-4 space-y-1.5 text-[13.5px]', featured ? 'text-bone/70' : 'text-obsidian/55')}>
                <div className={cn('flex justify-between border-t pt-1.5', featured ? 'border-bone/10' : 'border-obsidian/[0.06]')}>
                  <dt>Pacientes/mês</dt>
                  <dd className={cn('font-mono font-semibold', featured ? 'text-bone' : 'text-obsidian')}>{formatNumber(numPacientes)}</dd>
                </div>
                <div className={cn('flex justify-between border-t pt-1.5', featured ? 'border-bone/10' : 'border-obsidian/[0.06]')}>
                  <dt>Leads necessários</dt>
                  <dd className={cn('font-mono font-semibold', featured ? 'text-bone' : 'text-obsidian')}>{formatNumber(numLeads)}</dd>
                </div>
                <div className={cn('flex justify-between border-t pt-1.5', featured ? 'border-bone/10' : 'border-obsidian/[0.06]')}>
                  <dt>Verba necessária</dt>
                  <dd className={cn('font-mono font-semibold', featured ? 'text-bone' : 'text-obsidian')}>{formatCurrency(verbaNecessaria)}</dd>
                </div>
              </dl>
            </div>
          )
        })}
      </div>
    </div>
  )
}

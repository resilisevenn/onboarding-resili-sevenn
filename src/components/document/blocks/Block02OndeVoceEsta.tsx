import type { Bloco2OndeVoceEsta } from '../../../types/onboarding'
import { formatCurrency, formatNumber, formatPercent } from '../../../lib/format'
import { calcPacientesCobertura } from '../../../lib/calculations'
import { BlockHeading } from '../BlockHeading'
import { EditableNumber, EditablePercent } from '../EditableField'

export function Block02OndeVoceEsta({
  data,
  editable = false,
  onChange,
}: {
  data: Bloco2OndeVoceEsta
  editable?: boolean
  onChange?: (data: Bloco2OndeVoceEsta) => void
}) {
  const pacientesCobertura = calcPacientesCobertura(data)

  return (
    <div>
      <BlockHeading title="Onde você está hoje" subtitle="A linha de base a partir da qual medimos o progresso." />

      <div className="mb-6 grid grid-cols-3 gap-3">
        {data.faturamentoUltimos3Meses.map((v, i) => (
          <div key={i} className="rounded border border-obsidian/10 p-4">
            <p className="text-xs text-obsidian/50">Mês {i + 1}</p>
            {editable && onChange ? (
              <EditableNumber
                value={v}
                prefix="R$"
                className="text-lg"
                onChange={(next) => {
                  const copy = [...data.faturamentoUltimos3Meses] as [number, number, number]
                  copy[i] = next
                  onChange({ ...data, faturamentoUltimos3Meses: copy })
                }}
              />
            ) : (
              <p className="font-mono text-lg">{formatCurrency(v)}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Ticket médio">
          {editable && onChange ? (
            <EditableNumber value={data.ticketMedio} prefix="R$" onChange={(v) => onChange({ ...data, ticketMedio: v })} />
          ) : (
            <p className="font-mono text-lg">{formatCurrency(data.ticketMedio)}</p>
          )}
        </Stat>
        <Stat label="Custo operacional/mês">
          {editable && onChange ? (
            <EditableNumber
              value={data.custoOperacionalMensal}
              prefix="R$"
              onChange={(v) => onChange({ ...data, custoOperacionalMensal: v })}
            />
          ) : (
            <p className="font-mono text-lg">{formatCurrency(data.custoOperacionalMensal)}</p>
          )}
        </Stat>
        <Stat label="Margem">
          {editable && onChange ? (
            <EditablePercent value={data.margem} onChange={(v) => onChange({ ...data, margem: v })} />
          ) : (
            <p className="font-mono text-lg">{formatPercent(data.margem)}</p>
          )}
        </Stat>
        <Stat label="Verba de anúncio mensal">
          {editable && onChange ? (
            <EditableNumber
              value={data.verbaAnuncioAtual}
              prefix="R$"
              onChange={(v) => onChange({ ...data, verbaAnuncioAtual: v })}
            />
          ) : (
            <p className="font-mono text-lg">{formatCurrency(data.verbaAnuncioAtual)}</p>
          )}
        </Stat>
      </div>

      <div className="mt-6 rounded border border-brand/30 bg-brand/5 p-4">
        <p className="text-sm text-obsidian/70">
          Pacientes/mês necessários só para cobrir a operação:{' '}
          <span className="font-mono font-medium text-obsidian">{formatNumber(pacientesCobertura)}</span>
        </p>
      </div>
    </div>
  )
}

function Stat({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-obsidian/50">{label}</p>
      {children}
    </div>
  )
}

import type { Bloco2OndeVoceEsta } from '../../../types/onboarding'
import { formatCurrency, formatNumber, formatPercent } from '../../../lib/format'
import { BlockHeading } from '../BlockHeading'

export function Block02OndeVoceEsta({ data }: { data: Bloco2OndeVoceEsta }) {
  const pacientesCobertura =
    data.ticketMedio > 0 && data.margem > 0
      ? data.custoOperacionalMensal / (data.ticketMedio * data.margem)
      : 0

  return (
    <div>
      <BlockHeading title="Onde você está hoje" subtitle="A linha de base a partir da qual medimos o progresso." />

      <div className="mb-6 grid grid-cols-3 gap-3">
        {data.faturamentoUltimos3Meses.map((v, i) => (
          <div key={i} className="rounded border border-obsidian/10 p-4">
            <p className="text-xs text-obsidian/50">Mês {i + 1}</p>
            <p className="font-mono text-lg">{formatCurrency(v)}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Ticket médio" value={formatCurrency(data.ticketMedio)} />
        <Stat label="Custo operacional/mês" value={formatCurrency(data.custoOperacionalMensal)} />
        <Stat label="Margem" value={formatPercent(data.margem)} />
        <Stat label="Verba de anúncio atual" value={formatCurrency(data.verbaAnuncioAtual)} />
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-obsidian/50">{label}</p>
      <p className="font-mono text-lg">{value}</p>
    </div>
  )
}

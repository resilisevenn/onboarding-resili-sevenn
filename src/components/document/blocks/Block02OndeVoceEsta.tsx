import type { ReactNode } from 'react'
import type { Bloco2OndeVoceEsta } from '../../../types/onboarding'
import { formatCurrency, formatNumber, formatPercent } from '../../../lib/format'
import { calcFaturamentoMedio, calcPacientesCobertura } from '../../../lib/calculations'
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
  const faturamentoMedio = calcFaturamentoMedio(data)

  return (
    <div>
      <BlockHeading number={2} title="Onde você está hoje" subtitle="A linha de base a partir da qual medimos o progresso." />

      <div className="mb-8 grid grid-cols-2 gap-5 md:grid-cols-5">
        <Stat label="Faturamento médio (últimos 3 meses)">
          {editable && onChange ? (
            <EditableNumber
              value={faturamentoMedio}
              prefix="R$"
              className="font-normal"
              // Editar a média grava o mesmo valor nos 3 meses: a média de três valores iguais
              // é o próprio valor, então o número exibido é exatamente o que foi digitado.
              onChange={(v) => onChange({ ...data, faturamentoUltimos3Meses: [v, v, v] })}
            />
          ) : (
            <p className="font-mono text-[clamp(22px,3vw,32px)] font-normal leading-none text-obsidian">
              {formatCurrency(faturamentoMedio)}
            </p>
          )}
        </Stat>
        <Stat label="Ticket médio">
          {editable && onChange ? (
            <EditableNumber value={data.ticketMedio} prefix="R$" className="font-normal" onChange={(v) => onChange({ ...data, ticketMedio: v })} />
          ) : (
            <p className="font-mono text-[clamp(22px,3vw,32px)] font-normal leading-none text-obsidian">{formatCurrency(data.ticketMedio)}</p>
          )}
        </Stat>
        <Stat label="Margem">
          {editable && onChange ? (
            <EditablePercent value={data.margem} onChange={(v) => onChange({ ...data, margem: v })} />
          ) : (
            <p className="font-mono text-[clamp(22px,3vw,32px)] font-normal leading-none text-obsidian">{formatPercent(data.margem)}</p>
          )}
        </Stat>
        <Stat label="Verba de anúncio mensal">
          {editable && onChange ? (
            <EditableNumber
              value={data.verbaAnuncioAtual}
              prefix="R$"
              className="font-normal"
              onChange={(v) => onChange({ ...data, verbaAnuncioAtual: v })}
            />
          ) : (
            <p className="font-mono text-[clamp(22px,3vw,32px)] font-normal leading-none text-obsidian">{formatCurrency(data.verbaAnuncioAtual)}</p>
          )}
        </Stat>
        <Stat label="Custo operacional mensal">
          {editable && onChange ? (
            <EditableNumber
              value={data.custoOperacionalMensal}
              prefix="R$"
              className="font-normal"
              onChange={(v) => onChange({ ...data, custoOperacionalMensal: v })}
            />
          ) : (
            <p className="font-mono text-[clamp(22px,3vw,32px)] font-normal leading-none text-obsidian">{formatCurrency(data.custoOperacionalMensal)}</p>
          )}
        </Stat>
      </div>

      <div className="rounded-2xl border border-brand/35 bg-gradient-to-br from-brand/10 to-brand/[0.04] p-6 shadow-[0_4px_14px_rgba(89,165,44,0.08)]">
        <p className="text-base text-obsidian">
          Pacientes/mês necessários só para cobrir a operação:{' '}
          <span className="font-mono text-[1.3em] font-semibold text-brand-hover">{formatNumber(pacientesCobertura)}</span>
        </p>
      </div>
    </div>
  )
}

function Stat({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-[2.4em] flex-col justify-between rounded-xl border border-obsidian/10 bg-gradient-to-b from-obsidian/[0.015] to-transparent p-5 shadow-[0_1px_2px_rgba(11,19,16,0.04),0_4px_12px_rgba(11,19,16,0.05)] transition-[box-shadow,transform,background,border-color] duration-150 hover:-translate-y-px hover:border-brand/60 hover:bg-gradient-to-b hover:from-brand/[0.28] hover:to-brand/10 hover:shadow-[0_2px_4px_rgba(11,19,16,0.06),0_10px_24px_rgba(89,165,44,0.22)]">
      <p className="text-[12.5px] uppercase tracking-wide text-obsidian/70">{label}</p>
      <div className="mt-4">{children}</div>
    </div>
  )
}

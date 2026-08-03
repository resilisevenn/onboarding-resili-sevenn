import type { Bloco2OndeVoceEsta } from '../../types/onboarding'
import { formatCurrency } from '../../lib/format'
import { CurrencyField } from './fields'

export function CustoOperacionalField({
  value,
  onChange,
}: {
  value: Bloco2OndeVoceEsta
  onChange: (v: Bloco2OndeVoceEsta) => void
}) {
  const custoCalculado = value.custoPorDiaAtendimento * value.diasAtendimentoMes

  return (
    <div className="space-y-2">
      <span className="mb-1 block text-sm text-bone/70">Custo operacional mensal</span>
      <div className="flex gap-2 text-sm">
        <button
          type="button"
          onClick={() => onChange({ ...value, modoCustoOperacional: 'mensal' })}
          className={`rounded border px-3 py-1.5 transition ${
            value.modoCustoOperacional === 'mensal'
              ? 'border-brand bg-brand/10 text-brand'
              : 'border-white/10 text-bone/60 hover:text-bone'
          }`}
        >
          Valor fixo mensal
        </button>
        <button
          type="button"
          onClick={() =>
            onChange({
              ...value,
              modoCustoOperacional: 'porDia',
              custoOperacionalMensal: value.custoPorDiaAtendimento * value.diasAtendimentoMes,
            })
          }
          className={`rounded border px-3 py-1.5 transition ${
            value.modoCustoOperacional === 'porDia'
              ? 'border-brand bg-brand/10 text-brand'
              : 'border-white/10 text-bone/60 hover:text-bone'
          }`}
        >
          Custo por dia de atendimento
        </button>
      </div>

      {value.modoCustoOperacional === 'mensal' ? (
        <CurrencyField
          label="Valor fixo mensal"
          value={value.custoOperacionalMensal}
          onChange={(v) => onChange({ ...value, custoOperacionalMensal: v })}
        />
      ) : (
        <div className="space-y-2 rounded border border-white/10 p-3">
          <p className="text-xs text-bone/50">
            Para quem não tem custo fixo mensal (ex: aluga consultório por dia de atendimento).
          </p>
          <div className="grid grid-cols-2 gap-3">
            <CurrencyField
              label="Custo por dia"
              value={value.custoPorDiaAtendimento}
              onChange={(v) =>
                onChange({
                  ...value,
                  custoPorDiaAtendimento: v,
                  custoOperacionalMensal: v * value.diasAtendimentoMes,
                })
              }
            />
            <label className="block">
              <span className="mb-1 block text-sm text-bone/70">Dias de atendimento/mês</span>
              <input
                type="number"
                value={Number.isNaN(value.diasAtendimentoMes) ? '' : value.diasAtendimentoMes}
                onChange={(e) => {
                  const dias = e.target.valueAsNumber
                  onChange({
                    ...value,
                    diasAtendimentoMes: dias,
                    custoOperacionalMensal: value.custoPorDiaAtendimento * dias,
                  })
                }}
                className="w-full rounded border border-white/10 bg-obsidian-field px-3 py-2 text-bone outline-none focus:border-brand"
              />
            </label>
          </div>
          <p className="text-sm text-bone/70">
            Custo operacional mensal calculado: <span className="font-mono text-brand">{formatCurrency(custoCalculado)}</span>
          </p>
        </div>
      )}
    </div>
  )
}

const OPCOES_ALOCACAO_VERBA: { percentual: number; label: string }[] = [
  { percentual: 1, label: '100% investimento em captação de leads' },
  { percentual: 0.85, label: '85% captação de leads - 15% geração de base de audiência' },
  { percentual: 0.8, label: '80% captação de leads - 20% geração de base de audiência' },
  { percentual: 0.75, label: '75% captação de leads - 25% geração de base de audiência' },
]

export function AlocacaoVerbaField({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-bone/70">Alocação da verba de anúncio</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded border border-white/10 bg-obsidian-field px-3 py-2 text-bone outline-none focus:border-brand"
      >
        {OPCOES_ALOCACAO_VERBA.map((o) => (
          <option key={o.percentual} value={o.percentual}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

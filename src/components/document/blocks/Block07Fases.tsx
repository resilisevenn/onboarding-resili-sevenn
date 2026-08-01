import type { Bloco7Fases } from '../../../types/onboarding'
import { formatPercent } from '../../../lib/format'
import { BlockHeading } from '../BlockHeading'

export function Block07Fases({ data }: { data: Bloco7Fases }) {
  return (
    <div>
      <BlockHeading title="As fases" />
      <div className="space-y-4">
        {data.fases.map((fase, i) => (
          <div key={i} className="rounded border border-obsidian/10 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-medium">{fase.nome}</p>
              <span className="font-mono text-sm text-brand">{formatPercent(fase.percentualVerba)} da verba</span>
            </div>
            <p className="mb-2 text-obsidian/70">{fase.objetivo}</p>
            <p className="text-sm text-obsidian/50">
              <span className="font-medium">Gatilho de mudança de fase:</span> {fase.gatilhoMudancaFase}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

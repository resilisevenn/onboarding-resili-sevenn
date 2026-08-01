import type { Bloco5OndeVamosAnunciar } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'

export function Block05OndeVamosAnunciar({ data }: { data: Bloco5OndeVamosAnunciar }) {
  return (
    <div>
      <BlockHeading title="Onde vamos anunciar — e onde não vamos" />
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Regiões incluídas</h3>
          <ul className="list-inside list-disc space-y-1">
            {data.regioesIncluidas.filter(Boolean).map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Regiões excluídas</h3>
          <ul className="space-y-2">
            {data.regioesExcluidas.map((r, i) => (
              <li key={i}>
                <span className="font-medium">{r.regiao}</span>
                <span className="text-obsidian/60"> — {r.motivo}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

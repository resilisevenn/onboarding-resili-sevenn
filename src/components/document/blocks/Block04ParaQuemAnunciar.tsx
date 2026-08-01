import type { Bloco4ParaQuemAnunciar } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'

export function Block04ParaQuemAnunciar({ data }: { data: Bloco4ParaQuemAnunciar }) {
  return (
    <div>
      <BlockHeading title="Para quem vamos anunciar" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="md:col-span-2">
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Perfil demográfico</h3>
          <p>{data.perfilDemografico}</p>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Dores</h3>
          <ul className="list-inside list-disc space-y-1">
            {data.dores.filter(Boolean).map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Desejos</h3>
          <ul className="list-inside list-disc space-y-1">
            {data.desejos.filter(Boolean).map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Nível de consciência sobre o procedimento</h3>
          <p>{data.nivelConscienciaProcedimento}</p>
        </div>
      </div>
    </div>
  )
}

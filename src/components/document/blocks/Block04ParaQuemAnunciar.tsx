import type { Bloco4ParaQuemAnunciar } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'

export function Block04ParaQuemAnunciar({ data }: { data: Bloco4ParaQuemAnunciar }) {
  return (
    <div>
      <BlockHeading number={4} title="Para quem vamos anunciar" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="group/card border-l-[3px] border-brand bg-bone px-5 py-1 md:col-span-2">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60 transition-colors group-hover/card:text-brand-hover">
            Perfil demográfico
          </h3>
          <p className="text-[16px] leading-[1.65]">{data.perfilDemografico}</p>
        </div>
        <div className="group/card border-l-[3px] border-brand bg-bone px-5 py-1">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60 transition-colors group-hover/card:text-brand-hover">
            Dores
          </h3>
          <ul className="list-inside list-disc space-y-1.5 text-[16px] leading-[1.65]">
            {data.dores.filter(Boolean).map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="group/card border-l-[3px] border-brand bg-bone px-5 py-1">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60 transition-colors group-hover/card:text-brand-hover">
            Desejos
          </h3>
          <ul className="list-inside list-disc space-y-1.5 text-[16px] leading-[1.65]">
            {data.desejos.filter(Boolean).map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="group/card border-l-[3px] border-brand bg-bone px-5 py-1 md:col-span-2">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60 transition-colors group-hover/card:text-brand-hover">
            Nível de consciência sobre o procedimento
          </h3>
          <p className="text-[16px] leading-[1.65]">{data.nivelConscienciaProcedimento}</p>
        </div>
      </div>
    </div>
  )
}

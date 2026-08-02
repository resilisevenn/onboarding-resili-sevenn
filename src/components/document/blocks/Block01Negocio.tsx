import type { Bloco1Negocio } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'

export function Block01Negocio({ data }: { data: Bloco1Negocio }) {
  return (
    <div>
      <BlockHeading
        number={1}
        title="O retrato da sua operação"
        subtitle="Confira se está tudo certo; se algo estiver errado, é só nos avisar."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="group/card border-l-[3px] border-brand bg-bone px-5 py-1">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60 transition-colors group-hover/card:text-brand-hover">
            Serviços
          </h3>
          <ul className="list-inside list-disc space-y-1.5 text-[16px] leading-[1.65]">
            {data.servicos.filter(Boolean).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="group/card border-l-[3px] border-brand bg-bone px-5 py-1">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60 transition-colors group-hover/card:text-brand-hover">
            Diferencial
          </h3>
          <p className="text-[16px] leading-[1.65]">{data.diferencial}</p>
        </div>
        <div className="group/card border-l-[3px] border-brand bg-bone px-5 py-1">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60 transition-colors group-hover/card:text-brand-hover">
            Público descrito
          </h3>
          <p className="text-[16px] leading-[1.65]">{data.publicoDescrito}</p>
        </div>
        <div className="group/card border-l-[3px] border-brand bg-bone px-5 py-1">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60 transition-colors group-hover/card:text-brand-hover">
            Regiões atendidas
          </h3>
          <p className="text-[16px] leading-[1.65]">{data.regioesAtendidas}</p>
        </div>
        <div className="group/card border-l-[3px] border-brand bg-bone px-5 py-1">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60 transition-colors group-hover/card:text-brand-hover">
            Horários de funcionamento
          </h3>
          <p className="text-[16px] leading-[1.65]">{data.horariosFuncionamento}</p>
        </div>
        <div className="group/card border-l-[3px] border-brand bg-bone px-5 py-1">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60 transition-colors group-hover/card:text-brand-hover">
            Sazonalidade
          </h3>
          <p className="text-[16px] leading-[1.65]">{data.sazonalidade}</p>
        </div>
      </div>
    </div>
  )
}

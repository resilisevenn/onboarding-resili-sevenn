import type { Bloco9Riscos } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'

const ORIGEM_LABEL: Record<string, string> = {
  clinica: 'Identificado pela clínica',
  gestor: 'Identificado pelo gestor',
}

export function Block09Riscos({ data }: { data: Bloco9Riscos }) {
  return (
    <div>
      <BlockHeading
        title="Riscos que assumimos juntos"
        subtitle="Escrito desde o dia 1 — se acontecer, já temos um plano combinado."
      />
      <div className="space-y-4">
        {data.riscos.map((risco, i) => (
          <div key={i} className="rounded border border-obsidian/10 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-medium">{risco.descricao}</p>
              <span className="shrink-0 rounded-full bg-obsidian/5 px-2 py-0.5 text-xs text-obsidian/60">
                {ORIGEM_LABEL[risco.origem] ?? risco.origem}
              </span>
            </div>
            <p className="text-sm text-obsidian/60">
              <span className="font-medium">Plano de ação:</span> {risco.planoDeAcao}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

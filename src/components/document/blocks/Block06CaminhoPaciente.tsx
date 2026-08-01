import type { Bloco6CaminhoPaciente } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'

export function Block06CaminhoPaciente({ data }: { data: Bloco6CaminhoPaciente }) {
  return (
    <div>
      <BlockHeading title="O caminho do paciente" subtitle="Do anúncio ao agendamento." />
      <ol className="space-y-4">
        {data.etapas.map((etapa, i) => (
          <li key={i} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-obsidian font-mono text-sm text-bone">
              {i + 1}
            </span>
            <div>
              <p className="font-medium">{etapa.titulo}</p>
              <p className="text-obsidian/60">{etapa.descricao}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

import type { Bloco6CaminhoPaciente } from '../../../types/onboarding'
import { CAMINHOS_PACIENTE_TEMPLATES } from '../../../lib/caminhoPacienteTemplates'
import { BlockHeading } from '../BlockHeading'

export function Block06CaminhoPaciente({ data }: { data: Bloco6CaminhoPaciente }) {
  const template = CAMINHOS_PACIENTE_TEMPLATES.find((t) => t.id === data.caminhoSelecionado)
  return (
    <div>
      <BlockHeading title="O caminho do paciente" subtitle={template ? template.nome : 'Do anúncio ao agendamento.'} />
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

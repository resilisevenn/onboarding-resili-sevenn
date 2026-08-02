import type { Bloco6CaminhoPaciente } from '../../../types/onboarding'
import { CAMINHOS_PACIENTE_TEMPLATES } from '../../../lib/caminhoPacienteTemplates'
import { BlockHeading } from '../BlockHeading'

export function Block06CaminhoPaciente({ data }: { data: Bloco6CaminhoPaciente }) {
  const template = CAMINHOS_PACIENTE_TEMPLATES.find((t) => t.id === data.caminhoSelecionado)
  return (
    <div>
      <BlockHeading number={6} title="O caminho do paciente" subtitle={template ? template.nome : 'Do anúncio ao agendamento.'} />
      <ol className="flex flex-col">
        {data.etapas.map((etapa, i) => (
          <li key={i} className="relative flex items-start gap-5 pb-8 last:pb-0">
            {i < data.etapas.length - 1 && (
              <span className="absolute left-5 top-10 bottom-1 w-0.5 bg-gradient-to-b from-brand/50 to-brand/15" />
            )}
            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-hover to-[var(--color-doc-dark)] font-mono text-base font-bold text-bone shadow-[0_2px_8px_rgba(89,165,44,0.25)]">
              {i + 1}
            </span>
            <div>
              <p className="mb-1 text-lg font-bold">{etapa.titulo}</p>
              {etapa.descricao && <p className="text-[15px] text-obsidian/60">{etapa.descricao}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

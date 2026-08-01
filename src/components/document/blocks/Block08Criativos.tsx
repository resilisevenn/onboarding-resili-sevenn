import type { Bloco8Criativos } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'

export function Block08Criativos({ data }: { data: Bloco8Criativos }) {
  return (
    <div>
      <BlockHeading title="O que os anúncios vão dizer" />
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Formatos de criativo</h3>
          <ul className="list-inside list-disc space-y-1">
            {data.formatos.filter(Boolean).map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Ângulos de mensagem</h3>
          <ul className="list-inside list-disc space-y-1">
            {data.angulosDeMensagem.filter(Boolean).map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Copy de partida</h3>
          <p className="whitespace-pre-wrap">{data.copyDePartida}</p>
        </div>
        {data.linkReferencias && (
          <div className="md:col-span-2">
            <h3 className="mb-1 text-sm font-medium text-obsidian/50">Referências</h3>
            <a href={data.linkReferencias} target="_blank" rel="noreferrer" className="text-brand underline">
              {data.linkReferencias}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

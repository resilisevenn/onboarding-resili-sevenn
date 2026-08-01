import type { Bloco11ComoTrabalhar } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'

export function Block11ComoTrabalhar({ data }: { data: Bloco11ComoTrabalhar }) {
  return (
    <div>
      <BlockHeading title="Como vamos trabalhar juntos" />
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Canal de comunicação</h3>
          <p>{data.canalComunicacao}</p>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Frequência de report</h3>
          <p>{data.frequenciaReport}</p>
        </div>
        <div className="md:col-span-2">
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">O que você pode esperar</h3>
          <p>{data.oQuePodeEsperar}</p>
        </div>
        <div className="md:col-span-2 rounded border border-brand/30 bg-brand/5 p-4">
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">
            Na sua avaliação, o que precisa acontecer para a parceria valer a pena
          </h3>
          <p className="italic">"{data.motivoParceriaValerAPena}"</p>
        </div>
      </div>
    </div>
  )
}

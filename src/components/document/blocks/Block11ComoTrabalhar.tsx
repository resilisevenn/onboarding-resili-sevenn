import type { Bloco11ComoTrabalhar } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'
import { EditableText, EditableTextArea } from '../EditableField'

export function Block11ComoTrabalhar({
  data,
  editable = false,
  onChange,
}: {
  data: Bloco11ComoTrabalhar
  editable?: boolean
  onChange?: (data: Bloco11ComoTrabalhar) => void
}) {
  return (
    <div>
      <BlockHeading title="Como vamos trabalhar juntos" />
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Canal de comunicação</h3>
          {editable && onChange ? (
            <EditableText value={data.canalComunicacao} onChange={(v) => onChange({ ...data, canalComunicacao: v })} />
          ) : (
            <p>{data.canalComunicacao}</p>
          )}
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Frequência de report</h3>
          {editable && onChange ? (
            <EditableText value={data.frequenciaReport} onChange={(v) => onChange({ ...data, frequenciaReport: v })} />
          ) : (
            <p>{data.frequenciaReport}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">O que você pode esperar</h3>
          {editable && onChange ? (
            <EditableTextArea value={data.oQuePodeEsperar} onChange={(v) => onChange({ ...data, oQuePodeEsperar: v })} />
          ) : (
            <p>{data.oQuePodeEsperar}</p>
          )}
        </div>
        <div className="md:col-span-2 rounded border border-brand/30 bg-brand/5 p-4">
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">
            Na sua avaliação, o que precisa acontecer para a parceria valer a pena
          </h3>
          {editable && onChange ? (
            <EditableTextArea
              value={data.motivoParceriaValerAPena}
              onChange={(v) => onChange({ ...data, motivoParceriaValerAPena: v })}
            />
          ) : (
            <p className="italic">"{data.motivoParceriaValerAPena}"</p>
          )}
        </div>
      </div>
    </div>
  )
}

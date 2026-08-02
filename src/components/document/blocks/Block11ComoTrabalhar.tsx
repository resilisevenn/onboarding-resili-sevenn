import type { Bloco11ComoTrabalhar } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'
import { EditableStringList, EditableText, EditableTextArea } from '../EditableField'

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
      <BlockHeading number={11} title="Como vamos trabalhar juntos" />
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-brand/35 bg-gradient-to-br from-brand/10 to-brand/[0.04] p-5 shadow-[0_4px_14px_rgba(89,165,44,0.08)]">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60">Canal de comunicação</h3>
          {editable && onChange ? (
            <EditableText value={data.canalComunicacao} onChange={(v) => onChange({ ...data, canalComunicacao: v })} />
          ) : (
            <p className="text-[16px] leading-[1.65]">{data.canalComunicacao}</p>
          )}
        </div>
        <div className="rounded-2xl border border-brand/35 bg-gradient-to-br from-brand/10 to-brand/[0.04] p-5 shadow-[0_4px_14px_rgba(89,165,44,0.08)]">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60">Frequência de report</h3>
          {editable && onChange ? (
            <EditableText value={data.frequenciaReport} onChange={(v) => onChange({ ...data, frequenciaReport: v })} />
          ) : (
            <p className="text-[16px] leading-[1.65]">{data.frequenciaReport}</p>
          )}
        </div>
        <div className="md:col-span-2">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60">O que você pode esperar</h3>
          {editable && onChange ? (
            <EditableStringList
              values={data.oQuePodeEsperar}
              onChange={(v) => onChange({ ...data, oQuePodeEsperar: v })}
            />
          ) : (
            <ul className="list-inside list-disc space-y-1.5 text-[16px] leading-[1.65]">
              {data.oQuePodeEsperar.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mt-8 border-l-4 border-brand bg-bone px-6 py-1">
        <h3 className="mb-2.5 text-sm font-bold">Na sua avaliação, o que precisa acontecer para a parceria valer a pena</h3>
        {editable && onChange ? (
          <EditableTextArea
            value={data.motivoParceriaValerAPena}
            onChange={(v) => onChange({ ...data, motivoParceriaValerAPena: v })}
          />
        ) : (
          <p className="text-[17px] italic">"{data.motivoParceriaValerAPena}"</p>
        )}
      </div>
    </div>
  )
}

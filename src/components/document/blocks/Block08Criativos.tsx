import type { Bloco8Criativos, LinhaCriativo } from '../../../types/onboarding'
import { BlockHeading } from '../BlockHeading'
import { EditableStringList, EditableText, EditableTextArea } from '../EditableField'

function isLikelyUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

const LAYERS = [
  { tag: '1. Atração', desc: 'Conteúdo educacional/lifestyle, sem oferta direta, para quem ainda não conhece a clínica.' },
  { tag: '2. Confiança', desc: 'Autoridade, bastidores, prova social, para quem já segue mas ainda não decidiu.' },
  { tag: '3. Conversão', desc: 'Quebra de objeção e urgência, levando direto para o WhatsApp.' },
]

export function Block08Criativos({
  data,
  editable = false,
  onChange,
}: {
  data: Bloco8Criativos
  editable?: boolean
  onChange?: (data: Bloco8Criativos) => void
}) {
  function updateLinha(index: number, patch: Partial<LinhaCriativo>) {
    if (!onChange) return
    const next = [...data.linhas]
    next[index] = { ...next[index], ...patch }
    onChange({ ...data, linhas: next })
  }

  return (
    <div>
      <BlockHeading number={8} title="O que os anúncios vão dizer" />

      {data.temPosicionamento ? (
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {LAYERS.map((layer, i) => (
            <div key={layer.tag} className="relative overflow-hidden rounded-2xl border border-obsidian/10 bg-bone p-5">
              <span
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: i === 0 ? 'var(--color-brand)' : i === 1 ? 'var(--color-brand-hover)' : 'var(--color-obsidian)' }}
              />
              <span className="mb-3 inline-block rounded-full bg-brand/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide text-brand-hover">
                {layer.tag}
              </span>
              <p className="text-[15px] leading-relaxed text-obsidian/75">{layer.desc}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-12 rounded-2xl border border-obsidian/10 bg-bone p-6">
          <p className="mb-1 font-bold">Sem Posicionamento: conversão direta</p>
          <p className="text-[15px] leading-relaxed text-obsidian/75">
            Não existe conteúdo orgânico aquecendo o público antes do anúncio. O anúncio precisa fazer esse trabalho sozinho: o
            formato principal tende a ser Resultado final, Antes ou depois, ou CTA Direta, indo direto ao ponto com o lead frio.
          </p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60">Formatos de criativo</h3>
          {data.formatos.length > 0 || editable ? (
            <ul className="list-inside list-disc space-y-1.5 text-[16px] leading-[1.65]">
              {data.formatos.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          ) : null}
          {(data.formatosCustomizados.length > 0 || editable) && (
            <div className="mt-2">
              {editable && onChange ? (
                <EditableStringList
                  values={data.formatosCustomizados}
                  onChange={(v) => onChange({ ...data, formatosCustomizados: v })}
                  placeholder="Formato customizado"
                />
              ) : (
                <ul className="list-inside list-disc space-y-1.5 text-[16px] leading-[1.65]">
                  {data.formatosCustomizados.filter(Boolean).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {(data.linkReferencias || editable) && (
          <div>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60">Referências</h3>
            {editable && onChange ? (
              <>
                <EditableText value={data.linkReferencias} onChange={(v) => onChange({ ...data, linkReferencias: v })} />
                {data.linkReferencias && !isLikelyUrl(data.linkReferencias) && (
                  <p className="mt-1 text-xs text-amber-600">
                    Isso não parece um link (ex: https://...): será exibido como texto, não como link clicável.
                  </p>
                )}
              </>
            ) : isLikelyUrl(data.linkReferencias) ? (
              <a href={data.linkReferencias} target="_blank" rel="noreferrer" className="text-brand-hover underline">
                {data.linkReferencias}
              </a>
            ) : (
              <p className="text-[16px] leading-[1.65]">{data.linkReferencias}</p>
            )}
          </div>
        )}

        <div className="md:col-span-2">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60">Copy de partida</h3>
          {editable && onChange ? (
            <EditableTextArea value={data.copyDePartida} rows={4} onChange={(v) => onChange({ ...data, copyDePartida: v })} />
          ) : (
            <p className="whitespace-pre-wrap text-[16px] leading-[1.65]">{data.copyDePartida}</p>
          )}
        </div>
      </div>

      {data.linhas.length > 0 && (
        <div className="mt-8">
          {data.linhas.map((linha, i) => (
            <div key={i} className="mb-4 rounded-2xl border border-obsidian/10 bg-bone p-6 last:mb-0">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-doc-dark)] font-mono text-sm font-bold text-bone">
                  {i + 1}
                </span>
                {editable && onChange ? (
                  <EditableText
                    value={linha.nomeProcedimento}
                    onChange={(v) => updateLinha(i, { nomeProcedimento: v })}
                    className="w-auto flex-1 text-[17px] font-bold"
                  />
                ) : (
                  <span className="text-[17px] font-bold">{linha.nomeProcedimento}</span>
                )}
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-obsidian/60">Ângulos de mensagem</h4>
                  {editable && onChange ? (
                    <EditableStringList
                      values={linha.angulosDeMensagem}
                      onChange={(v) => updateLinha(i, { angulosDeMensagem: v })}
                    />
                  ) : (
                    <ul className="list-inside list-disc space-y-1 text-[15px] leading-[1.65]">
                      {linha.angulosDeMensagem.filter(Boolean).map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="rounded-r-[10px] border-l-[3px] border-brand bg-brand/5 p-4">
                  <h4 className="mb-1.5 text-[11.5px] text-obsidian/50">
                    Exemplo de narrativa, referência de tom, não é copy pronta para publicar
                  </h4>
                  {editable && onChange ? (
                    <EditableTextArea
                      value={linha.exemploNarrativa}
                      rows={3}
                      onChange={(v) => updateLinha(i, { exemploNarrativa: v })}
                    />
                  ) : (
                    <p className="text-[14.5px] italic leading-[1.55]">"{linha.exemploNarrativa}"</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

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
      <BlockHeading title="O que os anúncios vão dizer" />

      <div className="mb-6 rounded border border-brand/30 bg-brand/5 p-4 text-sm">
        {editable && onChange && (
          <label className="mb-3 flex items-start gap-2 text-obsidian/80">
            <input
              type="checkbox"
              checked={data.temPosicionamento}
              onChange={(e) => onChange({ ...data, temPosicionamento: e.target.checked })}
              className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
            />
            <span>Cliente já tem conteúdo/presença digital aquecendo o público (Posicionamento com a gente ou com outra equipe)</span>
          </label>
        )}
        {data.temPosicionamento ? (
          <>
            <p className="mb-1 font-medium">Com Posicionamento — estrutura em 3 camadas</p>
            <p className="text-obsidian/70">
              <span className="font-medium">Atração:</span> conteúdo educacional/lifestyle, sem oferta direta, para quem
              ainda não conhece a clínica. <span className="font-medium">Confiança:</span> autoridade, bastidores, prova
              social, para quem já segue mas ainda não decidiu. <span className="font-medium">Conversão:</span> quebra de
              objeção e urgência, levando direto para o WhatsApp.
            </p>
          </>
        ) : (
          <>
            <p className="mb-1 font-medium">Sem Posicionamento — conversão direta</p>
            <p className="text-obsidian/70">
              Não existe conteúdo orgânico aquecendo o público antes do anúncio. O anúncio precisa fazer esse trabalho
              sozinho: o formato principal tende a ser Quebra de Objeção ou CTA Direta, indo direto ao ponto com o lead
              frio.
            </p>
          </>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Formatos de criativo</h3>
          {data.formatos.length > 0 || editable ? (
            <ul className="list-inside list-disc space-y-1">
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
                <ul className="list-inside list-disc space-y-1">
                  {data.formatosCustomizados.filter(Boolean).map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <h3 className="mb-1 text-sm font-medium text-obsidian/50">Copy de partida</h3>
          {editable && onChange ? (
            <EditableTextArea value={data.copyDePartida} rows={4} onChange={(v) => onChange({ ...data, copyDePartida: v })} />
          ) : (
            <p className="whitespace-pre-wrap">{data.copyDePartida}</p>
          )}
        </div>

        {(data.linkReferencias || editable) && (
          <div className="md:col-span-2">
            <h3 className="mb-1 text-sm font-medium text-obsidian/50">Referências</h3>
            {editable && onChange ? (
              <>
                <EditableText value={data.linkReferencias} onChange={(v) => onChange({ ...data, linkReferencias: v })} />
                {data.linkReferencias && !isLikelyUrl(data.linkReferencias) && (
                  <p className="mt-1 text-xs text-amber-600">
                    Isso não parece um link (ex: https://…) — será exibido como texto, não como link clicável.
                  </p>
                )}
              </>
            ) : isLikelyUrl(data.linkReferencias) ? (
              <a href={data.linkReferencias} target="_blank" rel="noreferrer" className="text-brand underline">
                {data.linkReferencias}
              </a>
            ) : (
              <p>{data.linkReferencias}</p>
            )}
          </div>
        )}
      </div>

      {data.linhas.length > 0 && (
        <div className="mt-6 space-y-6">
          {data.linhas.map((linha, i) => (
            <div key={i} className="rounded border border-obsidian/10 p-4">
              <h3 className="mb-2 font-medium">
                Linha {i + 1} — {editable && onChange ? (
                  <EditableText
                    value={linha.nomeProcedimento}
                    onChange={(v) => updateLinha(i, { nomeProcedimento: v })}
                    className="inline-block w-auto"
                  />
                ) : (
                  linha.nomeProcedimento
                )}
              </h3>

              <div className="mb-3">
                <h4 className="mb-1 text-sm font-medium text-obsidian/50">Ângulos de mensagem</h4>
                {editable && onChange ? (
                  <EditableStringList
                    values={linha.angulosDeMensagem}
                    onChange={(v) => updateLinha(i, { angulosDeMensagem: v })}
                  />
                ) : (
                  <ul className="list-inside list-disc space-y-1">
                    {linha.angulosDeMensagem.filter(Boolean).map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded border border-obsidian/10 bg-obsidian/5 p-3">
                <h4 className="mb-1 text-xs font-medium text-obsidian/50">
                  Exemplo de narrativa — referência de tom, não é copy pronta para publicar
                </h4>
                {editable && onChange ? (
                  <EditableTextArea
                    value={linha.exemploNarrativa}
                    rows={3}
                    onChange={(v) => updateLinha(i, { exemploNarrativa: v })}
                  />
                ) : (
                  <p className="italic">"{linha.exemploNarrativa}"</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

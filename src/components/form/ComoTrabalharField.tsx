import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'
import { CITACAO_PADRAO_TEMPLATES, O_QUE_PODE_ESPERAR_TEMPLATES } from '../../lib/comoTrabalharTemplates'
import type { Bloco11ComoTrabalhar } from '../../types/onboarding'
import { TextAreaField, TextField } from './fields'

export function ComoTrabalharField({
  value,
  onChange,
}: {
  value: Bloco11ComoTrabalhar
  onChange: (v: Bloco11ComoTrabalhar) => void
}) {
  return (
    <div className="space-y-4">
      <TextField
        label="Canal de comunicação"
        value={value.canalComunicacao}
        onChange={(v) => onChange({ ...value, canalComunicacao: v })}
      />
      <TextField
        label="Frequência de report"
        value={value.frequenciaReport}
        onChange={(v) => onChange({ ...value, frequenciaReport: v })}
      />

      <div>
        <span className="mb-2 block text-sm text-bone/70">O que você pode esperar</span>
        <div className="mb-2 grid grid-cols-1 gap-2">
          {O_QUE_PODE_ESPERAR_TEMPLATES.map((template) => {
            const selected = value.oQuePodeEsperarTemplateId === template.id
            return (
              <button
                key={template.id}
                type="button"
                onClick={() =>
                  onChange({ ...value, oQuePodeEsperarTemplateId: template.id, oQuePodeEsperar: template.texto })
                }
                className={cn(
                  'flex items-start justify-between gap-2 rounded border p-3 text-left text-sm transition-colors',
                  selected ? 'border-brand bg-brand/10 text-bone' : 'border-white/10 text-bone/70 hover:border-white/30',
                )}
              >
                <span>{template.texto}</span>
                {selected && <Check className="h-4 w-4 shrink-0 text-brand" />}
              </button>
            )
          })}
        </div>
        <TextAreaField
          label="Texto final (editável)"
          value={value.oQuePodeEsperar}
          onChange={(v) => onChange({ ...value, oQuePodeEsperarTemplateId: null, oQuePodeEsperar: v })}
        />
      </div>

      <div>
        <span className="mb-1 block text-sm text-bone/70">
          O que precisa acontecer para a parceria valer a pena (palavras da clínica)
        </span>
        <p className="mb-2 text-xs text-bone/50">
          Por padrão, use exatamente o que a clínica respondeu no Formulário de Briefing. Se ela não respondeu nada, ative a
          opção abaixo para usar uma frase-modelo.
        </p>

        <label className="mb-3 flex items-center gap-2 text-sm text-bone/80">
          <input
            type="checkbox"
            checked={value.usarCitacaoPadrao}
            onChange={(e) => {
              const usar = e.target.checked
              if (usar) {
                const primeiro = CITACAO_PADRAO_TEMPLATES[0]
                onChange({
                  ...value,
                  usarCitacaoPadrao: true,
                  citacaoPadraoId: primeiro.id,
                  motivoParceriaValerAPena: primeiro.texto,
                })
              } else {
                onChange({ ...value, usarCitacaoPadrao: false, citacaoPadraoId: null, motivoParceriaValerAPena: '' })
              }
            }}
            className="h-4 w-4 accent-brand"
          />
          A clínica não respondeu isso no formulário — usar frase-modelo
        </label>

        {value.usarCitacaoPadrao && (
          <div className="mb-2 grid grid-cols-1 gap-2">
            {CITACAO_PADRAO_TEMPLATES.map((template) => {
              const selected = value.citacaoPadraoId === template.id
              return (
                <button
                  key={template.id}
                  type="button"
                  onClick={() =>
                    onChange({ ...value, citacaoPadraoId: template.id, motivoParceriaValerAPena: template.texto })
                  }
                  className={cn(
                    'flex items-start justify-between gap-2 rounded border p-3 text-left text-sm italic transition-colors',
                    selected ? 'border-brand bg-brand/10 text-bone' : 'border-white/10 text-bone/70 hover:border-white/30',
                  )}
                >
                  <span>"{template.texto}"</span>
                  {selected && <Check className="h-4 w-4 shrink-0 text-brand" />}
                </button>
              )
            })}
          </div>
        )}

        <TextAreaField
          label="Texto final (editável)"
          value={value.motivoParceriaValerAPena}
          onChange={(v) => onChange({ ...value, citacaoPadraoId: null, motivoParceriaValerAPena: v })}
        />
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { createOnboarding, garantirSessaoValida } from '../../lib/onboardings'
import type { OnboardingPayload } from '../../types/onboarding'
import { ExpandableSection } from '../ui/ExpandableSection'
import { CurrencyField, ObjectListField, PercentField, StringListField, TextAreaField, TextField } from './fields'
import { CaminhoPacienteField } from './CaminhoPacienteField'
import { FasesField } from './FasesField'
import { RiscosField } from './RiscosField'
import { CriativosField } from './CriativosField'
import { ChecklistField } from './ChecklistField'
import { ComoTrabalharField } from './ComoTrabalharField'
import { CplBenchmarkInfo } from './CplBenchmarkInfo'
import { AlocacaoVerbaField } from './AlocacaoVerbaField'
import { CustoOperacionalField } from './CustoOperacionalField'
import { Primeiros30DiasField } from './Primeiros30DiasField'
import { emptyPayload } from './emptyPayload'
import { calcFaturamentoMedio, calcNivelMeta, calcPacientesCobertura, calcTaxaLeadParaFechamento } from '../../lib/calculations'
import { formatCurrency, formatNumber, formatPercent } from '../../lib/format'

export function OnboardingFormPage() {
  const { session } = useAuth()
  const navigate = useNavigate()

  const [clientName, setClientName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [payload, setPayload] = useState<OnboardingPayload>(emptyPayload())
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function patch<K extends keyof OnboardingPayload>(key: K, value: OnboardingPayload[K]) {
    setPayload((p) => ({ ...p, [key]: value }))
  }

  async function handleSubmit() {
    if (!session) {
      setError('Sua sessão expirou. Faça login novamente para gerar o onboarding.')
      return
    }
    if (!clientName.trim() || whatsapp.replace(/\D/g, '').length < 4) {
      setError('Preencha nome da clínica e WhatsApp (mínimo 4 dígitos).')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      if (!(await garantirSessaoValida())) {
        setError('Sua sessão expirou. Faça login novamente para gerar o onboarding.')
        return
      }
      const row = await createOnboarding({
        clientName,
        whatsapp,
        payload,
        createdBy: session.user.id,
      })
      window.open(`/o/${row.slug}`, '_blank', 'noopener,noreferrer')
      navigate(`/?created=${row.slug}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao criar onboarding.')
    } finally {
      setSubmitting(false)
    }
  }

  const b1 = payload.bloco1_negocio
  const b2 = payload.bloco2_ondeVoceEsta
  const b3 = payload.bloco3_ondeQuerChegar
  const b4 = payload.bloco4_paraQuemAnunciar
  const b5 = payload.bloco5_ondeVamosAnunciar
  const b6 = payload.bloco6_caminhoPaciente
  const b7 = payload.bloco7_fases
  const b8 = payload.bloco8_criativos
  const b9 = payload.bloco9_riscos
  const b10 = payload.bloco10_checklist
  const b11 = payload.bloco11_comoTrabalhar
  const b12 = payload.bloco12_primeiros30Dias

  return (
    <div className="min-h-screen bg-brand-dark">
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-1 font-display text-2xl text-bone">Gerar onboarding</h1>
      <p className="mb-8 text-sm text-bone/60">
        Cole as respostas do formulário de briefing e o ICP/análise de território do gestor.
      </p>

      <div className="mb-6 space-y-4 rounded-xl border border-brand/30 bg-gradient-to-br from-brand/10 to-brand/5 p-6 shadow-lg shadow-brand/5">
        <TextField label="Nome da clínica" value={clientName} onChange={setClientName} />
        <TextField label="WhatsApp (para código de acesso — últimos 4 dígitos)" value={whatsapp} onChange={setWhatsapp} />
      </div>

      <div>
        <ExpandableSection
          title="1. O retrato da sua operação"
          description="Preenchido com base nas respostas do Formulário de Briefing (serviços, diferencial, horários e sazonalidade)."
          defaultOpen
        >
          <StringListField label="Serviços a serem anunciados" values={b1.servicos} onChange={(v) => patch('bloco1_negocio', { ...b1, servicos: v })} />
          <TextAreaField label="Diferencial" value={b1.diferencial} onChange={(v) => patch('bloco1_negocio', { ...b1, diferencial: v })} />
          <TextAreaField label="Público descrito" value={b1.publicoDescrito} onChange={(v) => patch('bloco1_negocio', { ...b1, publicoDescrito: v })} />
          <TextField label="Regiões atendidas" value={b1.regioesAtendidas} onChange={(v) => patch('bloco1_negocio', { ...b1, regioesAtendidas: v })} />
          <TextField label="Horários de funcionamento" value={b1.horariosFuncionamento} onChange={(v) => patch('bloco1_negocio', { ...b1, horariosFuncionamento: v })} />
          <TextAreaField label="Sazonalidade" value={b1.sazonalidade} onChange={(v) => patch('bloco1_negocio', { ...b1, sazonalidade: v })} />
        </ExpandableSection>

        <ExpandableSection
          title="2. Onde você está hoje"
          description="Preenchido com base nas respostas financeiras do Formulário de Briefing (faturamento, ticket médio, custo operacional e margem)."
        >
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2].map((i) => (
              <CurrencyField
                key={i}
                label={`Faturamento mês ${i + 1}`}
                value={b2.faturamentoUltimos3Meses[i]}
                onChange={(v) => {
                  const next = [...b2.faturamentoUltimos3Meses] as [number, number, number]
                  next[i] = v
                  patch('bloco2_ondeVoceEsta', { ...b2, faturamentoUltimos3Meses: next })
                }}
              />
            ))}
            <div>
              <span className="mb-1 block text-sm text-bone/70">Faturamento médio</span>
              <div className="rounded border border-brand/30 bg-brand/5 px-3 py-2 font-mono text-brand">
                {formatCurrency(calcFaturamentoMedio(b2))}
              </div>
            </div>
          </div>
          <CurrencyField label="Ticket médio" value={b2.ticketMedio} onChange={(v) => patch('bloco2_ondeVoceEsta', { ...b2, ticketMedio: v })} />
          <CustoOperacionalField value={b2} onChange={(v) => patch('bloco2_ondeVoceEsta', v)} />
          <PercentField label="Margem" value={b2.margem} onChange={(v) => patch('bloco2_ondeVoceEsta', { ...b2, margem: v })} />
          <CurrencyField label="Verba de anúncio mensal" value={b2.verbaAnuncioAtual} onChange={(v) => patch('bloco2_ondeVoceEsta', { ...b2, verbaAnuncioAtual: v })} />
          <AlocacaoVerbaField value={b2.percentualCaptacaoLeads} onChange={(v) => patch('bloco2_ondeVoceEsta', { ...b2, percentualCaptacaoLeads: v })} />

          {b2.custoOperacionalMensal <= 0 && b2.ticketMedio > 0 && b2.margem > 0 ? (
            <div className="rounded border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm text-yellow-200">
              Custo operacional mensal está zerado — confirme se é intencional (sem custo fixo) ou se falta preencher
              (inclusive pelo modo "Custo por dia de atendimento" acima).
            </div>
          ) : (
            <div className="rounded border border-brand/30 bg-brand/5 p-3 text-sm text-bone/70">
              Pacientes/mês necessários só para cobrir a operação:{' '}
              <span className="font-mono font-medium text-bone">{formatNumber(calcPacientesCobertura(b2))}</span>
            </div>
          )}
        </ExpandableSection>

        <ExpandableSection title="3. Onde você quer chegar">
          {b3.niveis.map((nivel, i) => {
            const preview = calcNivelMeta(nivel.metaFaturamento, b2.ticketMedio, b3, calcFaturamentoMedio(b2), b2.percentualCaptacaoLeads)
            return (
              <div key={nivel.nome} className="flex items-end gap-3">
                <div className="flex-1">
                  <CurrencyField
                    label={`Meta de faturamento — ${nivel.nome}`}
                    value={nivel.metaFaturamento}
                    onChange={(v) => {
                      const next = [...b3.niveis]
                      next[i] = { ...next[i], metaFaturamento: v }
                      patch('bloco3_ondeQuerChegar', { ...b3, niveis: next })
                    }}
                  />
                </div>
                <div className="flex-1 rounded border border-white/10 p-3 text-sm text-bone/60">
                  <span className="font-mono text-bone">{formatNumber(preview.numPacientes)}</span> pacientes ·{' '}
                  <span className="font-mono text-bone">{formatNumber(preview.numLeads)}</span> leads ·{' '}
                  <span className="font-mono text-bone">{formatCurrency(preview.verbaNecessaria)}</span> de verba
                </div>
              </div>
            )
          })}
          <PercentField label="Taxa lead → agendamento" value={b3.taxaLeadParaAgendamento} onChange={(v) => patch('bloco3_ondeQuerChegar', { ...b3, taxaLeadParaAgendamento: v })} />
          <PercentField label="Taxa agendamento → comparecimento" value={b3.taxaAgendamentoParaComparecimento} onChange={(v) => patch('bloco3_ondeQuerChegar', { ...b3, taxaAgendamentoParaComparecimento: v })} />
          <PercentField label="Taxa comparecimento → fechamento" value={b3.taxaComparecimentoParaFechamento} onChange={(v) => patch('bloco3_ondeQuerChegar', { ...b3, taxaComparecimentoParaFechamento: v })} />
          <div className="rounded border border-white/10 p-3 text-sm text-bone/60">
            Taxa conv. leads → fechamento (calculada automaticamente):{' '}
            <span className="font-mono text-lg font-semibold text-brand">{formatPercent(calcTaxaLeadParaFechamento(b3))}</span>
          </div>
          <CurrencyField
            label="CPL estimado"
            value={b3.cplEstimado}
            onChange={(v) => patch('bloco3_ondeQuerChegar', { ...b3, cplEstimado: v })}
            labelExtra={<CplBenchmarkInfo />}
          />
        </ExpandableSection>

        <ExpandableSection
          title="4. Para quem vamos anunciar (input manual — ICP/persona)"
          description="O Formulário de Briefing traz apenas o público descrito pela clínica — dores, desejos e nível de consciência são análise manual do gestor."
        >
          <TextAreaField label="Perfil demográfico" value={b4.perfilDemografico} onChange={(v) => patch('bloco4_paraQuemAnunciar', { ...b4, perfilDemografico: v })} />
          <StringListField label="Dores" values={b4.dores} onChange={(v) => patch('bloco4_paraQuemAnunciar', { ...b4, dores: v })} />
          <StringListField label="Desejos" values={b4.desejos} onChange={(v) => patch('bloco4_paraQuemAnunciar', { ...b4, desejos: v })} />
          <TextAreaField label="Nível de consciência sobre o procedimento" value={b4.nivelConscienciaProcedimento} onChange={(v) => patch('bloco4_paraQuemAnunciar', { ...b4, nivelConscienciaProcedimento: v })} />
        </ExpandableSection>

        <ExpandableSection
          title="5. Onde vamos anunciar — e onde não vamos (análise territorial)"
          description="O Formulário de Briefing traz as regiões incluídas indicadas pela clínica — as regiões excluídas e seus motivos são análise manual do gestor."
        >
          <StringListField label="Regiões incluídas" values={b5.regioesIncluidas} onChange={(v) => patch('bloco5_ondeVamosAnunciar', { ...b5, regioesIncluidas: v })} />
          <ObjectListField
            label="Regiões excluídas"
            values={b5.regioesExcluidas}
            newItem={() => ({ regiao: '', motivo: '' })}
            onChange={(v) => patch('bloco5_ondeVamosAnunciar', { ...b5, regioesExcluidas: v })}
            renderItem={(item, update) => (
              <div className="space-y-2">
                <TextField label="Região" value={item.regiao} onChange={(v) => update({ regiao: v })} />
                <TextField label="Motivo" value={item.motivo} onChange={(v) => update({ motivo: v })} />
              </div>
            )}
          />
        </ExpandableSection>

        <ExpandableSection title="6. O caminho do paciente">
          <CaminhoPacienteField value={b6} onChange={(v) => patch('bloco6_caminhoPaciente', v)} />
        </ExpandableSection>

        <ExpandableSection title="7. As fases">
          <FasesField value={b7} onChange={(v) => patch('bloco7_fases', v)} />
        </ExpandableSection>

        <ExpandableSection title="8. O que os anúncios vão dizer">
          <CriativosField value={b8} onChange={(v) => patch('bloco8_criativos', v)} />
        </ExpandableSection>

        <ExpandableSection title="9. Riscos que assumimos juntos">
          <RiscosField value={b9} onChange={(v) => patch('bloco9_riscos', v)} />
        </ExpandableSection>

        <ExpandableSection title="10. O que precisa de você">
          <ChecklistField value={b10} onChange={(v) => patch('bloco10_checklist', v)} />
        </ExpandableSection>

        <ExpandableSection title="11. Como vamos trabalhar juntos">
          <ComoTrabalharField value={b11} onChange={(v) => patch('bloco11_comoTrabalhar', v)} />
        </ExpandableSection>

        <ExpandableSection title="12. Os primeiros 30 dias">
          <Primeiros30DiasField value={b12} onChange={(v) => patch('bloco12_primeiros30Dias', v)} />
        </ExpandableSection>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-6 w-full rounded bg-brand py-3 font-medium text-brand-dark transition hover:bg-brand-hover disabled:opacity-50"
      >
        {submitting ? 'Gerando…' : 'Gerar onboarding'}
      </button>
    </div>
    </div>
  )
}

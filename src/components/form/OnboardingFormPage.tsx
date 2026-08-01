import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { createOnboarding } from '../../lib/onboardings'
import type { OnboardingPayload } from '../../types/onboarding'
import { ExpandableSection } from '../ui/ExpandableSection'
import { NumberField, ObjectListField, StringListField, TextAreaField, TextField } from './fields'
import { emptyPayload } from './emptyPayload'

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
    if (!session) return
    if (!clientName.trim() || whatsapp.replace(/\D/g, '').length < 4) {
      setError('Preencha nome da clínica e WhatsApp (mínimo 4 dígitos).')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const row = await createOnboarding({
        clientName,
        whatsapp,
        payload,
        createdBy: session.user.id,
      })
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
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-1 font-display text-2xl text-bone">Gerar onboarding</h1>
      <p className="mb-8 text-sm text-bone/60">
        Cole as respostas do formulário de briefing e o ICP/análise de território do gestor.
      </p>

      <div className="mb-6 space-y-4 rounded-lg border border-white/10 bg-obsidian-alt p-6">
        <TextField label="Nome da clínica" value={clientName} onChange={setClientName} />
        <TextField label="WhatsApp (para código de acesso — últimos 4 dígitos)" value={whatsapp} onChange={setWhatsapp} />
      </div>

      <div className="rounded-lg border border-white/10 bg-obsidian-alt px-6">
        <ExpandableSection title="1. O seu negócio, como eu entendi" defaultOpen>
          <StringListField label="Serviços" values={b1.servicos} onChange={(v) => patch('bloco1_negocio', { ...b1, servicos: v })} />
          <TextAreaField label="Diferencial" value={b1.diferencial} onChange={(v) => patch('bloco1_negocio', { ...b1, diferencial: v })} />
          <TextAreaField label="Público descrito" value={b1.publicoDescrito} onChange={(v) => patch('bloco1_negocio', { ...b1, publicoDescrito: v })} />
          <TextField label="Regiões atendidas" value={b1.regioesAtendidas} onChange={(v) => patch('bloco1_negocio', { ...b1, regioesAtendidas: v })} />
          <TextField label="Horários de funcionamento" value={b1.horariosFuncionamento} onChange={(v) => patch('bloco1_negocio', { ...b1, horariosFuncionamento: v })} />
          <TextAreaField label="Sazonalidade" value={b1.sazonalidade} onChange={(v) => patch('bloco1_negocio', { ...b1, sazonalidade: v })} />
        </ExpandableSection>

        <ExpandableSection title="2. Onde você está hoje">
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <NumberField
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
          </div>
          <NumberField label="Ticket médio" value={b2.ticketMedio} onChange={(v) => patch('bloco2_ondeVoceEsta', { ...b2, ticketMedio: v })} />
          <NumberField label="Custo operacional mensal" value={b2.custoOperacionalMensal} onChange={(v) => patch('bloco2_ondeVoceEsta', { ...b2, custoOperacionalMensal: v })} />
          <NumberField label="Margem (0 a 1, ex: 0.4 = 40%)" step={0.01} value={b2.margem} onChange={(v) => patch('bloco2_ondeVoceEsta', { ...b2, margem: v })} />
          <NumberField label="Verba de anúncio atual" value={b2.verbaAnuncioAtual} onChange={(v) => patch('bloco2_ondeVoceEsta', { ...b2, verbaAnuncioAtual: v })} />
        </ExpandableSection>

        <ExpandableSection title="3. Onde você quer chegar">
          {b3.niveis.map((nivel, i) => (
            <NumberField
              key={nivel.nome}
              label={`Meta de faturamento — ${nivel.nome}`}
              value={nivel.metaFaturamento}
              onChange={(v) => {
                const next = [...b3.niveis]
                next[i] = { ...next[i], metaFaturamento: v }
                patch('bloco3_ondeQuerChegar', { ...b3, niveis: next })
              }}
            />
          ))}
          <NumberField label="Taxa lead → agendamento" step={0.01} value={b3.taxaLeadParaAgendamento} onChange={(v) => patch('bloco3_ondeQuerChegar', { ...b3, taxaLeadParaAgendamento: v })} />
          <NumberField label="Taxa agendamento → comparecimento" step={0.01} value={b3.taxaAgendamentoParaComparecimento} onChange={(v) => patch('bloco3_ondeQuerChegar', { ...b3, taxaAgendamentoParaComparecimento: v })} />
          <NumberField label="Taxa comparecimento → fechamento" step={0.01} value={b3.taxaComparecimentoParaFechamento} onChange={(v) => patch('bloco3_ondeQuerChegar', { ...b3, taxaComparecimentoParaFechamento: v })} />
          <NumberField label="CPL estimado" step={0.01} value={b3.cplEstimado} onChange={(v) => patch('bloco3_ondeQuerChegar', { ...b3, cplEstimado: v })} />
        </ExpandableSection>

        <ExpandableSection title="4. Para quem vamos anunciar (input manual — ICP/persona)">
          <TextAreaField label="Perfil demográfico" value={b4.perfilDemografico} onChange={(v) => patch('bloco4_paraQuemAnunciar', { ...b4, perfilDemografico: v })} />
          <StringListField label="Dores" values={b4.dores} onChange={(v) => patch('bloco4_paraQuemAnunciar', { ...b4, dores: v })} />
          <StringListField label="Desejos" values={b4.desejos} onChange={(v) => patch('bloco4_paraQuemAnunciar', { ...b4, desejos: v })} />
          <TextAreaField label="Nível de consciência sobre o procedimento" value={b4.nivelConscienciaProcedimento} onChange={(v) => patch('bloco4_paraQuemAnunciar', { ...b4, nivelConscienciaProcedimento: v })} />
        </ExpandableSection>

        <ExpandableSection title="5. Onde vamos anunciar — e onde não vamos (análise territorial)">
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
          <ObjectListField
            label="Etapas"
            values={b6.etapas}
            newItem={() => ({ titulo: '', descricao: '' })}
            onChange={(v) => patch('bloco6_caminhoPaciente', { etapas: v })}
            renderItem={(item, update) => (
              <div className="space-y-2">
                <TextField label="Título" value={item.titulo} onChange={(v) => update({ titulo: v })} />
                <TextAreaField label="Descrição" value={item.descricao} onChange={(v) => update({ descricao: v })} />
              </div>
            )}
          />
        </ExpandableSection>

        <ExpandableSection title="7. As fases">
          <ObjectListField
            label="Fases"
            values={b7.fases}
            newItem={() => ({ nome: '', percentualVerba: 0, objetivo: '', gatilhoMudancaFase: '' })}
            onChange={(v) => patch('bloco7_fases', { fases: v })}
            renderItem={(item, update) => (
              <div className="space-y-2">
                <TextField label="Nome" value={item.nome} onChange={(v) => update({ nome: v })} />
                <NumberField label="% de verba (0 a 1)" step={0.01} value={item.percentualVerba} onChange={(v) => update({ percentualVerba: v })} />
                <TextAreaField label="Objetivo" value={item.objetivo} onChange={(v) => update({ objetivo: v })} />
                <TextAreaField label="Gatilho de mudança de fase" value={item.gatilhoMudancaFase} onChange={(v) => update({ gatilhoMudancaFase: v })} />
              </div>
            )}
          />
        </ExpandableSection>

        <ExpandableSection title="8. O que os anúncios vão dizer">
          <StringListField label="Formatos de criativo" values={b8.formatos} onChange={(v) => patch('bloco8_criativos', { ...b8, formatos: v })} />
          <StringListField label="Ângulos de mensagem" values={b8.angulosDeMensagem} onChange={(v) => patch('bloco8_criativos', { ...b8, angulosDeMensagem: v })} />
          <TextAreaField label="Copy de partida" value={b8.copyDePartida} onChange={(v) => patch('bloco8_criativos', { ...b8, copyDePartida: v })} />
          <TextField label="Link de referências (pasta de criativos)" value={b8.linkReferencias} onChange={(v) => patch('bloco8_criativos', { ...b8, linkReferencias: v })} />
        </ExpandableSection>

        <ExpandableSection title="9. Riscos que assumimos juntos">
          <ObjectListField
            label="Riscos"
            values={b9.riscos}
            newItem={() => ({ descricao: '', origem: 'clinica' as const, planoDeAcao: '' })}
            onChange={(v) => patch('bloco9_riscos', { riscos: v })}
            renderItem={(item, update) => (
              <div className="space-y-2">
                <TextAreaField label="Descrição" value={item.descricao} onChange={(v) => update({ descricao: v })} />
                <label className="block">
                  <span className="mb-1 block text-sm text-bone/70">Origem</span>
                  <select
                    value={item.origem}
                    onChange={(e) => update({ origem: e.target.value as 'clinica' | 'gestor' })}
                    className="w-full rounded border border-white/10 bg-obsidian px-3 py-2 text-bone outline-none focus:border-brand"
                  >
                    <option value="clinica">Clínica</option>
                    <option value="gestor">Gestor</option>
                  </select>
                </label>
                <TextAreaField label="Plano de ação" value={item.planoDeAcao} onChange={(v) => update({ planoDeAcao: v })} />
              </div>
            )}
          />
        </ExpandableSection>

        <ExpandableSection title="10. O que precisa de você">
          <ObjectListField
            label="Checklist"
            values={b10.itens}
            newItem={() => ({ item: '', prazo: '', responsavel: '' })}
            onChange={(v) => patch('bloco10_checklist', { itens: v })}
            renderItem={(item, update) => (
              <div className="space-y-2">
                <TextField label="Item" value={item.item} onChange={(v) => update({ item: v })} />
                <TextField label="Prazo" value={item.prazo} onChange={(v) => update({ prazo: v })} />
                <TextField label="Responsável" value={item.responsavel} onChange={(v) => update({ responsavel: v })} />
              </div>
            )}
          />
        </ExpandableSection>

        <ExpandableSection title="11. Como vamos trabalhar juntos">
          <TextField label="Canal de comunicação" value={b11.canalComunicacao} onChange={(v) => patch('bloco11_comoTrabalhar', { ...b11, canalComunicacao: v })} />
          <TextField label="Frequência de report" value={b11.frequenciaReport} onChange={(v) => patch('bloco11_comoTrabalhar', { ...b11, frequenciaReport: v })} />
          <TextAreaField label="O que a clínica pode esperar" value={b11.oQuePodeEsperar} onChange={(v) => patch('bloco11_comoTrabalhar', { ...b11, oQuePodeEsperar: v })} />
          <TextAreaField label="O que precisa acontecer para a parceria valer a pena (palavras da clínica)" value={b11.motivoParceriaValerAPena} onChange={(v) => patch('bloco11_comoTrabalhar', { ...b11, motivoParceriaValerAPena: v })} />
        </ExpandableSection>

        <ExpandableSection title="12. Os primeiros 30 dias">
          <ObjectListField
            label="Cronograma"
            values={b12.cronograma}
            newItem={() => ({ data: '', descricao: '' })}
            onChange={(v) => patch('bloco12_primeiros30Dias', { ...b12, cronograma: v })}
            renderItem={(item, update) => (
              <div className="space-y-2">
                <label className="block">
                  <span className="mb-1 block text-sm text-bone/70">Data</span>
                  <input
                    type="date"
                    value={item.data}
                    onChange={(e) => update({ data: e.target.value })}
                    className="w-full rounded border border-white/10 bg-obsidian px-3 py-2 text-bone outline-none focus:border-brand"
                  />
                </label>
                <TextAreaField label="Descrição" value={item.descricao} onChange={(v) => update({ descricao: v })} />
              </div>
            )}
          />
          <StringListField label="O que não vai acontecer" values={b12.oQueNaoVaiAcontecer} onChange={(v) => patch('bloco12_primeiros30Dias', { ...b12, oQueNaoVaiAcontecer: v })} />
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
  )
}

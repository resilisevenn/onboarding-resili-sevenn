// Payload por-cliente dos 12 blocos do documento de onboarding.
// Conteúdo educacional genérico (Manual do Método) NÃO pertence a este payload —
// só o que varia por cliente.

export interface OnboardingPayload {
  bloco1_negocio: Bloco1Negocio
  bloco2_ondeVoceEsta: Bloco2OndeVoceEsta
  bloco3_ondeQuerChegar: Bloco3OndeQuerChegar
  bloco4_paraQuemAnunciar: Bloco4ParaQuemAnunciar
  bloco5_ondeVamosAnunciar: Bloco5OndeVamosAnunciar
  bloco6_caminhoPaciente: Bloco6CaminhoPaciente
  bloco7_fases: Bloco7Fases
  bloco8_criativos: Bloco8Criativos
  bloco9_riscos: Bloco9Riscos
  bloco10_checklist: Bloco10Checklist
  bloco11_comoTrabalhar: Bloco11ComoTrabalhar
  bloco12_primeiros30Dias: Bloco12Primeiros30Dias
}

// 1. O seu negócio, como eu entendi
export interface Bloco1Negocio {
  servicos: string[]
  diferencial: string
  publicoDescrito: string
  regioesAtendidas: string
  horariosFuncionamento: string
  sazonalidade: string
}

// 2. Onde você está hoje
export interface Bloco2OndeVoceEsta {
  faturamentoUltimos3Meses: [number, number, number]
  ticketMedio: number
  custoOperacionalMensal: number
  margem: number // 0-1, ex: 0.4 = 40%
  verbaAnuncioAtual: number
  // pacientesNecessariosCobertura = custoOperacionalMensal / (ticketMedio * margem) — calculado na UI, não armazenado
}

// 3. Onde você quer chegar
export interface NivelMeta {
  nome: 'inicial' | 'intermediaria' | 'super_meta'
  metaFaturamento: number
  // derivados na UI: numPacientes = meta / ticketMedio; numLeads = numPacientes / taxas; verbaNecessaria = numLeads * cpl
}

export interface Bloco3OndeQuerChegar {
  niveis: NivelMeta[]
  taxaLeadParaAgendamento: number // 0-1, ajustável por cliente, com default pré-preenchido
  taxaAgendamentoParaComparecimento: number
  taxaComparecimentoParaFechamento: number
  cplEstimado: number
}

// 4. Para quem vamos anunciar (input manual do gestor, não gerado por IA)
export interface Bloco4ParaQuemAnunciar {
  perfilDemografico: string
  dores: string[]
  desejos: string[]
  nivelConscienciaProcedimento: string
}

// 5. Onde vamos anunciar — e onde não vamos (input manual, análise territorial)
export interface RegiaoExcluida {
  regiao: string
  motivo: string
}

export interface Bloco5OndeVamosAnunciar {
  regioesIncluidas: string[]
  regioesExcluidas: RegiaoExcluida[]
}

// 6. O caminho do paciente
export interface Bloco6CaminhoPaciente {
  caminhoSelecionado: number | null // 1 a 5, referente a CAMINHOS_PACIENTE_TEMPLATES
  etapas: { titulo: string; descricao: string }[]
}

// 7. As fases
export interface Fase {
  nome: string
  periodo: string // ex: "Dias 1 a 7" ou "A partir do dia 22 (contínua)"
  objetivo: string
  gatilhoMudancaFase: string
}

export interface Bloco7Fases {
  templateSelecionado: 'agressivo' | 'padrao' | 'conservador' | null
  fases: Fase[]
}

// 8. O que os anúncios vão dizer
export interface LinhaCriativo {
  procedimentoId: string | null // id de PROCEDIMENTOS_CATALOGO, ou null se linha manual
  nomeProcedimento: string
  angulosDeMensagem: string[]
  exemploNarrativa: string
}

export interface Bloco8Criativos {
  temPosicionamento: boolean
  formatos: string[]
  formatosCustomizados: string[]
  linhas: LinhaCriativo[]
  copyDePartida: string
  linkReferencias: string
}

// 9. Riscos que assumimos juntos
export interface Risco {
  descricao: string
  origem: 'clinica' | 'gestor'
  planoDeAcao: string
}

export interface Bloco9Riscos {
  templateSelecionado: 'so_trafego' | 'trafego_comercial' | 'trafego_posicionamento_comercial' | 'completo_crc' | null
  temReativacaoBase: boolean
  riscos: Risco[]
}

// 10. O que precisa de você
export interface ItemChecklist {
  item: string
  prazo: string
  responsavel: string
}

export interface Bloco10Checklist {
  templateSelecionado: 'so_trafego' | 'trafego_comercial' | 'trafego_posicionamento_comercial' | 'completo_crc' | null
  itens: ItemChecklist[]
}

// 11. Como vamos trabalhar juntos
export interface Bloco11ComoTrabalhar {
  canalComunicacao: string
  frequenciaReport: string
  oQuePodeEsperarTemplateId: string | null
  oQuePodeEsperar: string
  motivoParceriaValerAPena: string // devolvido nas palavras da clínica
  usarCitacaoPadrao: boolean // true quando a clínica não disse nada no formulário
  citacaoPadraoId: string | null
}

// 12. Os primeiros 30 dias
export interface EventoCronograma {
  data: string // ISO date
  descricao: string
}

export interface Bloco12Primeiros30Dias {
  cronograma: EventoCronograma[]
  oQueNaoVaiAcontecer: string[]
}

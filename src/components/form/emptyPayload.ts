import type { OnboardingPayload } from '../../types/onboarding'

export function emptyPayload(): OnboardingPayload {
  return {
    bloco1_negocio: {
      servicos: [''],
      diferencial: '',
      publicoDescrito: '',
      regioesAtendidas: '',
      horariosFuncionamento: '',
      sazonalidade: '',
    },
    bloco2_ondeVoceEsta: {
      faturamentoUltimos3Meses: [0, 0, 0],
      ticketMedio: 0,
      custoOperacionalMensal: 0,
      margem: 0.4,
      verbaAnuncioAtual: 0,
    },
    bloco3_ondeQuerChegar: {
      niveis: [
        { nome: 'inicial', metaFaturamento: 0 },
        { nome: 'intermediaria', metaFaturamento: 0 },
        { nome: 'super_meta', metaFaturamento: 0 },
      ],
      taxaLeadParaAgendamento: 0.3,
      taxaAgendamentoParaComparecimento: 0.7,
      taxaComparecimentoParaFechamento: 0.3,
      cplEstimado: 0,
    },
    bloco4_paraQuemAnunciar: {
      perfilDemografico: '',
      dores: [''],
      desejos: [''],
      nivelConscienciaProcedimento: '',
    },
    bloco5_ondeVamosAnunciar: {
      regioesIncluidas: [''],
      regioesExcluidas: [],
    },
    bloco6_caminhoPaciente: {
      etapas: [],
    },
    bloco7_fases: {
      fases: [],
    },
    bloco8_criativos: {
      formatos: [''],
      angulosDeMensagem: [''],
      copyDePartida: '',
      linkReferencias: '',
    },
    bloco9_riscos: {
      riscos: [],
    },
    bloco10_checklist: {
      itens: [],
    },
    bloco11_comoTrabalhar: {
      canalComunicacao: '',
      frequenciaReport: '',
      oQuePodeEsperar: '',
      motivoParceriaValerAPena: '',
    },
    bloco12_primeiros30Dias: {
      cronograma: [],
      oQueNaoVaiAcontecer: [
        'Os primeiros 7-14 dias são de aprendizado do algoritmo.',
        'O CPL começa alto e cai ao longo da otimização.',
        'Dado de poucos dias não é conclusivo.',
      ],
    },
  }
}

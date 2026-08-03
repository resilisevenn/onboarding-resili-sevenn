import type { OnboardingPayload } from '../../types/onboarding'
import { CANAL_COMUNICACAO_PADRAO, FREQUENCIA_REPORT_PADRAO } from '../../lib/comoTrabalharTemplates'

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
      modoCustoOperacional: 'mensal',
      custoPorDiaAtendimento: 0,
      diasAtendimentoMes: 0,
      margem: 0.4,
      verbaAnuncioAtual: 0,
      percentualCaptacaoLeads: 0.85,
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
      caminhoSelecionado: null,
      etapas: [],
    },
    bloco7_fases: {
      templateSelecionado: null,
      fases: [],
    },
    bloco8_criativos: {
      temPosicionamento: false,
      formatos: [],
      formatosCustomizados: [],
      linhas: [],
      copyDePartida: '',
      linkReferencias: '',
    },
    bloco9_riscos: {
      templateSelecionado: null,
      temReativacaoBase: false,
      riscos: [],
    },
    bloco10_checklist: {
      templateSelecionado: null,
      itens: [],
    },
    bloco11_comoTrabalhar: {
      canalComunicacao: CANAL_COMUNICACAO_PADRAO,
      frequenciaReport: FREQUENCIA_REPORT_PADRAO,
      oQuePodeEsperarTemplateId: null,
      oQuePodeEsperar: [],
      motivoParceriaValerAPena: '',
      usarCitacaoPadrao: false,
      citacaoPadraoId: null,
    },
    bloco12_primeiros30Dias: {
      cronograma: [],
      oQueNaoVaiAcontecer: [],
    },
  }
}

// Payload fictício "Clínica Vitá Estética" — usado apenas pela rota /dev-preview
// para visualizar a migração de design dos componentes reais. Remover junto com a rota
// quando a migração dos 12 blocos estiver concluída e aprovada.
import type { OnboardingPayload } from '../types/onboarding'

export const MOCK_PAYLOAD: OnboardingPayload = {
  bloco1_negocio: {
    servicos: ['Harmonização facial', 'Preenchimento labial', 'Botox terapêutico e estético', 'Bioestimuladores de colágeno'],
    diferencial:
      'Atendimento médico especializado com protocolo de acompanhamento pós-procedimento em 7, 30 e 90 dias, algo que a concorrência local não oferece.',
    publicoDescrito:
      'Mulheres de 28 a 50 anos, classe B/A, que já usam procedimentos estéticos mas buscam um profissional de confiança para resultados mais naturais.',
    regioesAtendidas: 'Zona Sul e Centro da cidade, com pacientes vindos também da região metropolitana.',
    horariosFuncionamento: 'Segunda a sexta, das 9h às 19h. Sábados das 9h às 13h mediante agendamento.',
    sazonalidade: 'Aumento de demanda em outubro/novembro (temporada de festas) e queda em janeiro/fevereiro.',
  },
  bloco2_ondeVoceEsta: {
    faturamentoUltimos3Meses: [42000, 38500, 45200],
    ticketMedio: 850,
    custoOperacionalMensal: 28000,
    modoCustoOperacional: 'mensal',
    custoPorDiaAtendimento: 0,
    diasAtendimentoMes: 0,
    margem: 0.34,
    verbaAnuncioAtual: 3000,
    percentualCaptacaoLeads: 0.85,
  },
  bloco3_ondeQuerChegar: {
    niveis: [
      { nome: 'inicial', metaFaturamento: 60000 },
      { nome: 'intermediaria', metaFaturamento: 90000 },
      { nome: 'super_meta', metaFaturamento: 130000 },
    ],
    taxaLeadParaAgendamento: 0.32,
    taxaAgendamentoParaComparecimento: 0.7,
    taxaComparecimentoParaFechamento: 0.45,
    cplEstimado: 28,
  },
  bloco4_paraQuemAnunciar: {
    perfilDemografico:
      'Mulheres, 28–50 anos, classe A/B, moradoras da Zona Sul e Centro, ativas em redes sociais, que seguem influenciadoras de estética e bem-estar.',
    dores: [
      'Medo de resultado artificial ("cara de boneca")',
      'Insegurança sobre a reputação do profissional',
      'Falta de tempo para pesquisar clínicas',
    ],
    desejos: ['Resultado natural e discreto', 'Autoestima e confiança no dia a dia', 'Atendimento humanizado, sem julgamento'],
    nivelConscienciaProcedimento:
      'Maioria já conhece os procedimentos (consciente do produto), mas ainda não decidiu por qual clínica/profissional optar: a decisão está em "qual marca escolher", não em "se devo fazer".',
  },
  bloco5_ondeVamosAnunciar: {
    regioesIncluidas: ['Zona Sul', 'Centro', 'Região metropolitana (raio de 25km)'],
    regioesExcluidas: [
      { regiao: 'Zona Norte', motivo: 'distância inviabiliza deslocamento até a clínica' },
      { regiao: 'Cidades vizinhas de baixa renda', motivo: 'ticket médio incompatível com o público-alvo' },
    ],
  },
  bloco6_caminhoPaciente: {
    caminhoSelecionado: 1,
    etapas: [
      { titulo: 'Anúncio Instagram', descricao: '' },
      { titulo: 'Clique no botão "WhatsApp"', descricao: '' },
      { titulo: 'Conversa com atendente/recepção', descricao: '' },
      { titulo: 'Qualificação', descricao: 'Dúvidas, convênio, disponibilidade.' },
      { titulo: 'Agendamento confirmado', descricao: '' },
    ],
  },
  bloco7_fases: {
    templateSelecionado: 'padrao',
    fases: [
      {
        nome: 'Aprendizado',
        periodo: 'Dias 1 a 14',
        objetivo: 'Validar públicos, criativos e ofertas.',
        gatilhoMudancaFase: 'CPL estável e mínimo de 40 leads.',
      },
      {
        nome: 'Otimização',
        periodo: 'Dias 15 a 30',
        objetivo: 'Escalar vencedores, cortar low performers.',
        gatilhoMudancaFase: 'CPL dentro da meta por 7 dias seguidos.',
      },
      {
        nome: 'Escala',
        periodo: 'A partir do dia 31 (contínua)',
        objetivo: 'Aumentar verba nos melhores conjuntos.',
        gatilhoMudancaFase: 'Reavaliação mensal de saturação de público.',
      },
    ],
  },
  bloco8_criativos: {
    temPosicionamento: true,
    formatos: ['Antes/depois com autorização', 'Vídeo depoimento de paciente (UGC)', 'Reels institucional da clínica e equipe'],
    formatosCustomizados: [],
    linhas: [
      {
        procedimentoId: null,
        nomeProcedimento: 'Harmonização Facial / Estética não invasiva',
        angulosDeMensagem: ['Naturalidade, "sem parecer mexido"', 'Envelhecer bem, realce sutil', 'Prova social e reputação local'],
        exemploNarrativa:
          'Resultado natural, sem exagero. Cada procedimento pensado para valorizar o que já é seu, com acompanhamento médico em todas as etapas. Agende sua avaliação.',
      },
      {
        procedimentoId: null,
        nomeProcedimento: 'Odontologia Estética (facetas, lentes em resina, clareamento)',
        angulosDeMensagem: ['Autoestima ao sorrir', 'Resolver de uma vez, sem tratamento longo', 'Confiança social, sorriso alinhado sem parecer falso'],
        exemploNarrativa:
          'Vergonha de sorrir em fotos? Recupere a confiança com Facetas em Resina, resultado em 1 sessão, sem desgastar os dentes. Agende sua avaliação.',
      },
    ],
    copyDePartida:
      'Resultado natural, sem exagero. Na Vitá Estética, cada procedimento é pensado para valorizar o que já é seu, com acompanhamento médico em todas as etapas. Agende sua avaliação.',
    linkReferencias: 'https://drive.google.com/referencias-criativos-vita',
  },
  bloco9_riscos: {
    templateSelecionado: 'trafego_comercial',
    temReativacaoBase: false,
    riscos: [
      {
        descricao: 'A recepção não responde rápido ao lead que chegou pelo anúncio (lead esfria em minutos, não em horas).',
        origem: 'clinica',
        planoDeAcao: 'Definir um tempo máximo de resposta ao lead (ideal: minutos) e priorizar o atendimento a leads de anúncio na rotina da recepção.',
      },
      {
        descricao: 'Falta de confirmação de agendamento, gerando falta do paciente no dia.',
        origem: 'clinica',
        planoDeAcao: 'Implementar confirmação de agendamento (mensagem ou ligação) 1 dia antes da consulta.',
      },
      {
        descricao: 'Ninguém é claramente responsável por atender o lead, mensagens inconsistentes, contato perdido.',
        origem: 'clinica',
        planoDeAcao: 'Definir uma única pessoa responsável por cada lead até o agendamento, evitando que a mensagem se perca entre a equipe.',
      },
      {
        descricao: 'O anúncio é genérico demais e atrai gente só curiosa ou pesquisando preço, não paciente pronto para agendar.',
        origem: 'gestor',
        planoDeAcao: 'Refinar segmentação e criativos ao longo da fase de aprendizado para qualificar melhor quem chega pelo anúncio.',
      },
      {
        descricao: 'Sazonalidade do negócio não é avisada com antecedência, e o cliente estranha quando o resultado varia.',
        origem: 'clinica',
        planoDeAcao: 'A clínica avisa com antecedência os períodos de sazonalidade (feriados, alta/baixa temporada) para ajustar a expectativa de resultado.',
      },
    ],
  },
  bloco10_checklist: {
    templateSelecionado: 'trafego_comercial',
    itens: [
      { item: 'Acesso de administrador ao Business Manager (Meta)', prazo: 'Imediato, máximo 2 dias', responsavel: 'Cliente' },
      { item: 'Acesso à página do Instagram/Facebook (ou convite como parceiro)', prazo: 'Imediato, junto do acesso ao BM', responsavel: 'Cliente' },
      { item: 'Definir responsável único por lead, configurado no CRM', prazo: 'Imediato', responsavel: 'Cliente' },
      { item: 'Definir quem responde os leads no WhatsApp', prazo: 'Antes de começar', responsavel: 'Cliente' },
      {
        item: 'Definir e comunicar o tempo máximo de resposta ao lead (ideal: minutos) para a equipe de recepção',
        prazo: 'Antes de começar',
        responsavel: 'Cliente',
      },
      { item: 'Enviar materiais/fotos/vídeos para os criativos iniciais', prazo: 'Até 3 dias', responsavel: 'Cliente' },
      { item: 'Forma de pagamento ativa na conta de anúncios', prazo: 'Semana 1', responsavel: 'Cliente' },
      { item: 'Acesso ao WhatsApp Business (número principal)', prazo: 'Semana 1', responsavel: 'Cliente' },
      { item: 'Configurar Business Manager, pixel e públicos', prazo: 'Semana 1', responsavel: 'Agência' },
      { item: 'Criar e subir os primeiros criativos', prazo: 'Semana 1, até o 7º dia', responsavel: 'Agência' },
      {
        item: 'Implementar CRM com processo de atendimento/objeções (inclui roteiro de objeções de preço e automação de confirmação de agendamento)',
        prazo: '10 a 15 dias',
        responsavel: 'Agência',
      },
    ],
  },
  bloco11_comoTrabalhar: {
    canalComunicacao: 'Grupo dedicado no WhatsApp entre clínica e gestor de tráfego.',
    frequenciaReport: 'Relatório mensal + 1 reunião mensal de alinhamento.',
    oQuePodeEsperarTemplateId: 'consultiva',
    oQuePodeEsperar: [
      'Transparência total sobre números',
      'Suporte de segunda a sexta das 9h às 19h com resposta em até 3 horas',
      'Recomendações proativas: não vamos só executar, vamos pensar estrategicamente com você',
    ],
    motivoParceriaValerAPena: 'Ver a agenda cheia de forma previsível, sem eu precisar me preocupar com marketing no dia a dia.',
    usarCitacaoPadrao: false,
    citacaoPadraoId: null,
  },
  bloco12_primeiros30Dias: {
    cronograma: [
      { data: '2026-08-05', descricao: 'Início oficial da parceria: hoje, essa reunião e alinhamento de expectativas.' },
      {
        data: '2026-08-07',
        descricao:
          'Estruturação do Marketing: configuração da captação de leads (estratégia, conta de anúncios e anúncios) e estruturação do Posicionamento/Conteúdos (quando contratado).',
      },
      { data: '2026-08-12', descricao: 'Lançamento das campanhas: início da geração de demanda.' },
      {
        data: '2026-08-20',
        descricao:
          'Primeiros leads e possíveis primeiros agendamentos: primeira leitura de dados, ajustes iniciais de segmentação e otimização dos resultados da primeira semana. Primeiro relatório de meio de período, com checagem de CPL e volume de leads.',
      },
      { data: '2026-09-04', descricao: 'Fechamento do primeiro ciclo: resultados tendem a melhorar e estabilizar.' },
    ],
    oQueNaoVaiAcontecer: [
      'Resultado explosivo imediato, pois o algoritmo ainda está aprendendo.',
      'Mudança de estratégia a cada poucos dias, pois testes precisam de tempo pra gerar dado confiável.',
      'Não podemos deixar a verba acabar em hipótese alguma, pois perde performance na campanha.',
    ],
  },
}

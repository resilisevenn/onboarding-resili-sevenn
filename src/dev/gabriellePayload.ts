// Payload de preview da Dra. Gabrielle Leão — usado apenas pela rota /preview/dra-gabrielle-leao.
// Preenchido bloco a bloco com os dados reais passados pelo cliente.
import type { OnboardingPayload } from '../types/onboarding'
import { CHECKLIST_TEMPLATES } from '../lib/checklistTemplates'

export const GABRIELLE_PAYLOAD: OnboardingPayload = {
  bloco1_negocio: {
    servicos: ['Lentes em Resina'],
    diferencial: 'Lentes em resina naturais, prezando sempre pela saúde do paciente em primeiro lugar.',
    publicoDescrito:
      'Homens e mulheres entre 25 e 50 anos insatisfeitos com a estética do sorriso, que tem vergonha de sorrir e que desejam aumentar a autoestima de forma definitiva. São principalmente mulheres que tem vergonha do próprio sorriso e sonham com um sorriso mais alinhado e harmônico.',
    regioesAtendidas: 'Águas Claras, Taguatinga, Plano Piloto, Gama, Samambaia, todas as regiões satélites do DF.',
    horariosFuncionamento: 'Segundas (8h às 12h), Terças (13h às 18h), Quartas (8h às 18h). Horários extras disponíveis a combinar.',
    sazonalidade: '',
  },
  bloco2_ondeVoceEsta: {
    faturamentoUltimos3Meses: [10000, 6000, 7000],
    ticketMedio: 4000,
    custoOperacionalMensal: 1600,
    modoCustoOperacional: 'porDia',
    custoPorDiaAtendimento: 400,
    diasAtendimentoMes: 4,
    margem: 0.7,
    verbaAnuncioAtual: 1200,
    percentualCaptacaoLeads: 0.85,
  },
  bloco3_ondeQuerChegar: {
    niveis: [
      { nome: 'inicial', metaFaturamento: 15000 },
      { nome: 'intermediaria', metaFaturamento: 17000 },
      { nome: 'super_meta', metaFaturamento: 20000 },
    ],
    taxaLeadParaAgendamento: 0.1,
    taxaAgendamentoParaComparecimento: 0.7,
    taxaComparecimentoParaFechamento: 0.7,
    cplEstimado: 12,
  },
  bloco4_paraQuemAnunciar: {
    perfilDemografico:
      'Mulheres de 25 a 45 anos, insatisfeitas com a estética do sorriso, que tem vergonha de sorrir e que desejam aumentar a autoestima de forma definitiva. São principalmente mulheres que tem vergonha do próprio sorriso e sonham com um sorriso mais alinhado e harmônico.',
    dores: [
      'Evitar fotos e vídeos por vergonha do sorriso.',
      'Rir "com a boca fechada" mesmo se divertindo de verdade.',
      'Comparar o próprio sorriso com o de outras pessoas nas redes sociais.',
      'Sentir que a aparência dos dentes passa uma imagem de descuido.',
      'Adiar o problema há anos por medo ou falta de tempo.',
    ],
    desejos: [
      'Sorrir livremente sem pensar em esconder nada.',
      'Sentir orgulho ao se ver em fotos e vídeos.',
      'Ter mais confiança em ambientes sociais e profissionais.',
      'Ser vista como alguém cuidada e com autoestima elevada.',
      'Resolver esse incômodo de forma definitiva, sem depender de manutenção constante.',
    ],
    nivelConscienciaProcedimento:
      'Consciente do Problema → Consciente da Solução (a maior parte do público está nessa transição). Ela já sabe muito bem qual é o problema (vergonha do sorriso, insatisfação estética) e já ouviu falar de lentes em resina como uma solução possível, seja por indicação, redes sociais ou pesquisa própria. O que ainda não está resolvido pra ela é: qual é exatamente a diferença entre lentes de resina, facetas e lentes de porcelana (ela mistura os conceitos); se essa é realmente a solução certa pro caso dela especificamente; qual profissional ou clínica é confiável o suficiente pra fazer esse investimento.',
  },
  bloco5_ondeVamosAnunciar: {
    regioesIncluidas: [
      'Brasília (Plano Piloto) e cidades satélites num raio de até 15 km do centro, região com forte concentração de servidores públicos, profissionais liberais e classe média/média alta, público exigente com atendimento e resultado estético natural.',
      'Guará',
      'Vicente Pires',
      'Águas Claras',
      'Park Way',
      'Arniqueira',
      'Jardim Botânico',
    ],
    regioesExcluidas: [
      { regiao: 'Estrutural', motivo: '' },
      { regiao: 'Taguatinga', motivo: '' },
      { regiao: 'Ceilândia', motivo: '' },
      { regiao: 'Gama', motivo: '' },
      { regiao: 'Samambaia', motivo: '' },
    ],
  },
  bloco6_caminhoPaciente: {
    caminhoSelecionado: 2,
    etapas: [
      { titulo: 'Anúncio (perfil Instagram + WhatsApp)', descricao: '' },
      { titulo: 'Lead se torna seguidor ou consome os conteúdos', descricao: '' },
      { titulo: 'Recebe anúncio com o botão de enviar mensagem WhatsApp', descricao: '' },
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
    temPosicionamento: false,
    formatos: [
      'Antes/depois com autorização',
      'Reels institucional da clínica e equipe',
      'Resultado com benefício + chamada (narrado ou sem narração)',
      'Tela dividida (cima/baixo) com antes e depois simultâneo, narrado',
      'Quebra de objeção — vídeo ou estático respondendo diretamente à dúvida/medo mais comum do público (dor do procedimento, preço, tempo de resultado, "vai parecer natural?"). Normalmente usado na camada de Conversão, ou como formato principal quando a clínica não tem Posicionamento.',
      'CTA direta — anúncio sem aquecimento, oferta e botão de ação já nos primeiros segundos. Usado para público frio, ou quando toda a verba está concentrada em conversão direta (típico de cliente sem Posicionamento).',
    ],
    formatosCustomizados: [],
    linhas: [
      {
        procedimentoId: null,
        nomeProcedimento: 'Odontologia Estética (facetas, lentes em resina, clareamento)',
        angulosDeMensagem: ['Autoestima ao sorrir', 'Resolver de uma vez, sem tratamento longo', 'Confiança social, sorriso alinhado sem parecer falso'],
        exemploNarrativa:
          'Vergonha de sorrir em fotos? Recupere a confiança com Facetas em Resina, resultado em 1 sessão, sem desgastar os dentes. Agende sua avaliação.',
      },
    ],
    copyDePartida: 'Slogan: "Proporcionando a melhor versão de cada sorriso!"',
    linkReferencias: 'https://drive.google.com/drive/folders/1eFdEPA9FiayoBVcLdOvRzPW8SAQeupCW?usp=drive_link',
  },
  bloco9_riscos: {
    templateSelecionado: 'trafego_comercial',
    temReativacaoBase: false,
    riscos: [
      {
        descricao:
          'Não existe presença orgânica (Instagram, conteúdo educativo, prova social contínua) para o lead consultar antes ou depois de ver o anúncio: quem chega ainda não conhece o profissional, nível de confiança e consciência baixos, muitas vezes é o primeiro contato e a pessoa ainda compara por preço.',
        origem: 'clinica',
        planoDeAcao: 'Manter um mínimo de conteúdo orgânico ativo, mesmo sem a frente de Posicionamento contratada.',
      },
      {
        descricao:
          'Sem posicionamento, quem chega pelo anúncio ainda não conhece o profissional: nível de confiança e consciência baixos, muitas vezes é o primeiro contato e a pessoa ainda compara por preço.',
        origem: 'clinica',
        planoDeAcao:
          'Sem posicionamento, quem chega pelo anúncio ainda não conhece o profissional: nível de confiança e consciência baixos, muitas vezes é o primeiro contato e a pessoa ainda compara por preço.',
      },
    ],
  },
  bloco10_checklist: {
    templateSelecionado: 'trafego_comercial',
    itens: CHECKLIST_TEMPLATES.find((t) => t.id === 'trafego_comercial')!.itens,
  },
  bloco11_comoTrabalhar: {
    canalComunicacao: 'Grupo dedicado no WhatsApp entre clínica e equipe.',
    frequenciaReport: 'Relatório mensal + 1 reunião mensal de alinhamento.',
    oQuePodeEsperarTemplateId: null,
    oQuePodeEsperar: [
      'Transparência total sobre números',
      'Suporte de segunda a sexta das 9h às 19h com resposta em até 3 horas',
      'Recomendações proativas: não vamos só executar, vamos pensar estrategicamente com você',
    ],
    motivoParceriaValerAPena:
      'Aumentar o número de pacientes particulares. Ter um crescimento consistente da agenda e do faturamento. Fortalecer a presença nas redes sociais (próxima etapa). Construir uma autoridade cada vez maior em Brasília (próxima etapa + consequência).',
    usarCitacaoPadrao: false,
    citacaoPadraoId: null,
  },
  bloco12_primeiros30Dias: {
    cronograma: [
      { data: '2026-08-03', descricao: 'Início oficial da parceria: hoje, essa reunião e alinhamento de expectativas.' },
      {
        data: '2026-08-06',
        descricao:
          'Estruturação do Marketing: configuração da captação de leads (estratégia, conta de anúncios e anúncios) e estruturação do Posicionamento/Conteúdos (quando contratado).',
      },
      { data: '2026-08-09', descricao: 'Lançamento das campanhas: início da geração de demanda.' },
      {
        data: '2026-08-16',
        descricao:
          'Primeiros leads e possíveis primeiros agendamentos: primeira leitura de dados, ajustes iniciais de segmentação e otimização dos resultados da primeira semana. Primeiro relatório de meio de período, com checagem de CPL e volume de leads.',
      },
      { data: '2026-09-03', descricao: 'Fechamento do primeiro ciclo: resultados tendem a melhorar e estabilizar.' },
    ],
    oQueNaoVaiAcontecer: [
      'Resultado explosivo imediato, pois o algoritmo ainda está aprendendo.',
      'Mudança de estratégia a cada poucos dias, pois testes precisam de tempo pra gerar dado confiável.',
      'Não podemos deixar a verba acabar em hipótese alguma, pois perde performance na campanha.',
    ],
  },
}

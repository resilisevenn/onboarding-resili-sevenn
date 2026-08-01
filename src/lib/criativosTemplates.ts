export const FORMATOS_CRIATIVO_CATALOGO: string[] = [
  'Vídeo depoimento de paciente (UGC)',
  'Antes/depois com autorização',
  'Reels institucional da clínica e equipe',
  'Resultado com benefício + chamada (narrado ou sem narração)',
  'Tela dividida (cima/baixo) com antes e depois simultâneo, narrado',
  'Estático com resultado, título direto + botão WhatsApp',
  'Quebra de objeção — vídeo ou estático respondendo diretamente à dúvida/medo mais comum do público (dor do procedimento, preço, tempo de resultado, "vai parecer natural?"). Normalmente usado na camada de Conversão, ou como formato principal quando a clínica não tem Posicionamento.',
  'CTA direta — anúncio sem aquecimento, oferta e botão de ação já nos primeiros segundos. Usado para público frio, ou quando toda a verba está concentrada em conversão direta (típico de cliente sem Posicionamento).',
]

export interface ProcedimentoTemplate {
  id: string
  nome: string
  dorCentral: string
  angulosDeMensagem: string[]
  exemploNarrativa: string
}

export const PROCEDIMENTOS_CATALOGO: ProcedimentoTemplate[] = [
  {
    id: 'odonto_estetica',
    nome: 'Odontologia Estética (facetas, lentes em resina, clareamento)',
    dorCentral: 'Vergonha de sorrir em fotos e vídeos, dentes tortos ou amarelados.',
    angulosDeMensagem: [
      'Autoestima ao sorrir',
      'Resolver de uma vez, sem tratamento longo',
      'Confiança social, sorriso alinhado sem parecer falso',
    ],
    exemploNarrativa:
      'Vergonha de sorrir em fotos? Recupere a confiança com Facetas em Resina — resultado em 1 sessão, sem desgastar os dentes. Agende sua avaliação.',
  },
  {
    id: 'harmonizacao_facial',
    nome: 'Harmonização Facial / Estética não invasiva',
    dorCentral: 'Envelhecimento, insegurança com a própria imagem.',
    angulosDeMensagem: ['Naturalidade, "sem parecer mexido"', 'Envelhecer bem, realce sutil', 'Prova social e reputação local'],
    exemploNarrativa:
      'Resultado natural, sem exagero. Cada procedimento pensado para valorizar o que já é seu — com acompanhamento médico em todas as etapas. Agende sua avaliação.',
  },
  {
    id: 'odonto_geral',
    nome: 'Odontologia Geral / Reabilitação (implante, prótese)',
    dorCentral: 'Dor física, medo do procedimento, vergonha da falta de dente.',
    angulosDeMensagem: ['Segurança médica', 'Fim do desconforto', 'Confiança técnica no profissional'],
    exemploNarrativa:
      'Viver com dor ou vergonha de sorrir não precisa ser normal. Recupere sua boca com segurança e acompanhamento especializado do início ao fim. Agende sua avaliação.',
  },
]

export interface ComboProcedimentoTemplate {
  id: string
  nome: string
  procedimentoIds: [string, string]
}

export const COMBOS_PROCEDIMENTO_CATALOGO: ComboProcedimentoTemplate[] = [
  {
    id: 'combo_estetica_harmonizacao',
    nome: 'Odontologia Estética + Harmonização Facial',
    procedimentoIds: ['odonto_estetica', 'harmonizacao_facial'],
  },
  {
    id: 'combo_estetica_implantes',
    nome: 'Odontologia Estética + Implantes/Reabilitação',
    procedimentoIds: ['odonto_estetica', 'odonto_geral'],
  },
]

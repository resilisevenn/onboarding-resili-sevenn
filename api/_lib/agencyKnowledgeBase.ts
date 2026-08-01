/**
 * Base de conhecimento da metodologia Resili Sevenn — usada como contexto de referência
 * para a IA sugerir os blocos 7 (fases), 8 (criativos) e 9 (riscos), combinando com o que
 * vier da transcrição da call. NUNCA inventar método aqui: só o que a agência confirmar.
 *
 * PLACEHOLDER — preencher com o conteúdo real antes de usar em produção. Enquanto vazio,
 * a IA extrai apenas o que estiver explícito na transcrição para esses blocos, sem propor
 * fases/criativos/riscos "padrão".
 */
export const AGENCY_KNOWLEDGE_BASE = {
  fasesTipicas: '',
  formatosCriativoRecorrentes: '',
  riscosOperacionaisComuns: '',
}

export function buildKnowledgeBaseContext(): string {
  const { fasesTipicas, formatosCriativoRecorrentes, riscosOperacionaisComuns } = AGENCY_KNOWLEDGE_BASE

  const hasContent = fasesTipicas || formatosCriativoRecorrentes || riscosOperacionaisComuns
  if (!hasContent) return ''

  return `
Metodologia padrão da Resili Sevenn (use como base, adapte ao contexto do cliente na transcrição):

Fases típicas: ${fasesTipicas || 'não informado'}
Formatos de criativo recorrentes: ${formatosCriativoRecorrentes || 'não informado'}
Riscos operacionais comuns em clínicas de estética: ${riscosOperacionaisComuns || 'não informado'}
`.trim()
}

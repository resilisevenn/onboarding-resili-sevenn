function isString(v: unknown): v is string {
  return typeof v === 'string'
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every(isString)
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function isArrayOfObjects(v: unknown, check: (item: Record<string, unknown>) => boolean): boolean {
  return Array.isArray(v) && v.every((item) => isObject(item) && check(item))
}

/**
 * Valida (sem lançar) o shape da extração retornada pela OpenAI antes de repassar ao
 * cliente. Campos ausentes são aceitáveis (Partial); campos presentes com formato
 * errado são removidos, para não corromper o merge feito em applyExtracted().
 */
export function sanitizeExtractedFields(raw: unknown): Record<string, unknown> {
  if (!isObject(raw)) return {}
  const out: Record<string, unknown> = {}

  if (isObject(raw.bloco1_negocio)) {
    const b = raw.bloco1_negocio
    out.bloco1_negocio = {
      ...(isStringArray(b.servicos) && { servicos: b.servicos }),
      ...(isString(b.diferencial) && { diferencial: b.diferencial }),
      ...(isString(b.publicoDescrito) && { publicoDescrito: b.publicoDescrito }),
      ...(isString(b.regioesAtendidas) && { regioesAtendidas: b.regioesAtendidas }),
      ...(isString(b.horariosFuncionamento) && { horariosFuncionamento: b.horariosFuncionamento }),
      ...(isString(b.sazonalidade) && { sazonalidade: b.sazonalidade }),
    }
  }

  if (isObject(raw.bloco6_caminhoPaciente) && isArrayOfObjects(raw.bloco6_caminhoPaciente.etapas, (i) => isString(i.titulo) && isString(i.descricao))) {
    out.bloco6_caminhoPaciente = { etapas: raw.bloco6_caminhoPaciente.etapas }
  }

  if (
    isObject(raw.bloco7_fases) &&
    isArrayOfObjects(
      raw.bloco7_fases.fases,
      (i) => isString(i.nome) && typeof i.percentualVerba === 'number' && isString(i.objetivo) && isString(i.gatilhoMudancaFase),
    )
  ) {
    out.bloco7_fases = { fases: raw.bloco7_fases.fases }
  }

  if (isObject(raw.bloco8_criativos)) {
    const b = raw.bloco8_criativos
    out.bloco8_criativos = {
      ...(isStringArray(b.formatos) && { formatos: b.formatos }),
      ...(isStringArray(b.angulosDeMensagem) && { angulosDeMensagem: b.angulosDeMensagem }),
      ...(isString(b.copyDePartida) && { copyDePartida: b.copyDePartida }),
      ...(isString(b.linkReferencias) && { linkReferencias: b.linkReferencias }),
    }
  }

  if (
    isObject(raw.bloco9_riscos) &&
    isArrayOfObjects(
      raw.bloco9_riscos.riscos,
      (i) => isString(i.descricao) && (i.origem === 'clinica' || i.origem === 'gestor') && isString(i.planoDeAcao),
    )
  ) {
    out.bloco9_riscos = { riscos: raw.bloco9_riscos.riscos }
  }

  if (
    isObject(raw.bloco10_checklist) &&
    isArrayOfObjects(raw.bloco10_checklist.itens, (i) => isString(i.item) && isString(i.prazo) && isString(i.responsavel))
  ) {
    out.bloco10_checklist = { itens: raw.bloco10_checklist.itens }
  }

  if (isObject(raw.bloco11_comoTrabalhar)) {
    const b = raw.bloco11_comoTrabalhar
    out.bloco11_comoTrabalhar = {
      ...(isString(b.canalComunicacao) && { canalComunicacao: b.canalComunicacao }),
      ...(isString(b.frequenciaReport) && { frequenciaReport: b.frequenciaReport }),
      ...(isString(b.oQuePodeEsperar) && { oQuePodeEsperar: b.oQuePodeEsperar }),
      ...(isString(b.motivoParceriaValerAPena) && { motivoParceriaValerAPena: b.motivoParceriaValerAPena }),
    }
  }

  if (isObject(raw.bloco12_primeiros30Dias)) {
    const b = raw.bloco12_primeiros30Dias
    out.bloco12_primeiros30Dias = {
      ...(isArrayOfObjects(b.cronograma, (i) => isString(i.data) && isString(i.descricao)) && { cronograma: b.cronograma }),
      ...(isStringArray(b.oQueNaoVaiAcontecer) && { oQueNaoVaiAcontecer: b.oQueNaoVaiAcontecer }),
    }
  }

  return out
}

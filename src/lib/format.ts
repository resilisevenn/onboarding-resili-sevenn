export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function formatPercent(value: number): string {
  return `${(value * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`
}

export function formatNumber(value: number): string {
  return value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })
}

/** Lê um número digitado em pt-BR ("20.000,50") e devolve o valor puro (20000.5). */
export function parsePtBrNumber(text: string): number {
  const normalized = text.replace(/\./g, '').replace(',', '.')
  const parsed = Number(normalized)
  return Number.isFinite(parsed) ? parsed : NaN
}

/** Escreve um número no formato pt-BR, com ponto de milhar (20000.5 -> "20.000,5"). */
export function formatPtBrNumber(value: number): string {
  if (Number.isNaN(value)) return ''
  return value.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
}

export function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  const dataCurta = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  const diaSemana = d.toLocaleDateString('pt-BR', { weekday: 'long' })
  return `${dataCurta} (${diaSemana})`
}

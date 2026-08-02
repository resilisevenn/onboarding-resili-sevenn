export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function formatPercent(value: number): string {
  return `${(value * 100).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`
}

export function formatNumber(value: number): string {
  return value.toLocaleString('pt-BR', { maximumFractionDigits: 0 })
}

export function formatDate(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso + 'T00:00:00')
  const dataCurta = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  const diaSemana = d.toLocaleDateString('pt-BR', { weekday: 'long' })
  return `${dataCurta} (${diaSemana})`
}

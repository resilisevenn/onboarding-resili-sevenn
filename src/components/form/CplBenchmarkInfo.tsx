import { useState } from 'react'
import { Info, X } from 'lucide-react'

const BENCHMARKS: {
  servico: string
  orcMinimo: string
  orcIdeal: string
  cplBruto: string
  metaLeads: string
}[] = [
  { servico: 'Clareamento Dental', orcMinimo: 'R$ 500/mês', orcIdeal: 'R$ 800–1.200', cplBruto: 'R$ 6–15', metaLeads: '35–70 leads' },
  { servico: 'Lentes de Resina', orcMinimo: 'R$ 800/mês', orcIdeal: 'R$ 1.200–2.000', cplBruto: 'R$ 8–18', metaLeads: '45–100 leads' },
  { servico: 'Lentes de Porcelana', orcMinimo: 'R$ 1.000/mês', orcIdeal: 'R$ 1.500–3.000', cplBruto: 'R$ 10–22', metaLeads: '45–100 leads' },
  { servico: 'Harmonização Orofacial', orcMinimo: 'R$ 800/mês', orcIdeal: 'R$ 1.200–2.500', cplBruto: 'R$ 7–18', metaLeads: '45–115 leads' },
  { servico: 'Implante Dentário', orcMinimo: 'R$ 1.200/mês', orcIdeal: 'R$ 2.000–4.000', cplBruto: 'R$ 12–28', metaLeads: '43–100 leads' },
  { servico: 'Alinhadores Invisíveis', orcMinimo: 'R$ 1.000/mês', orcIdeal: 'R$ 1.500–3.000', cplBruto: 'R$ 10–25', metaLeads: '40–100 leads' },
  { servico: 'Protocolo All-on-4/6', orcMinimo: 'R$ 2.000/mês', orcIdeal: 'R$ 3.000–6.000', cplBruto: 'R$ 18–40', metaLeads: '50–111 leads' },
  { servico: 'Reabilitação Oral', orcMinimo: 'R$ 1.500/mês', orcIdeal: 'R$ 2.500–5.000', cplBruto: 'R$ 15–35', metaLeads: '43–100 leads' },
]

export function CplBenchmarkInfo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)
        }}
        className="inline-flex items-center gap-1 text-brand hover:text-brand-light"
        title="Ver benchmarks de CPL por serviço"
      >
        <Info className="h-4 w-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-white/10 bg-obsidian p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-bone">Benchmarks de CPL por serviço</h3>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setOpen(false)
                }}
                className="text-bone/60 hover:text-red-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-3 text-sm text-bone/60">
              CPL Bruto = custo por qualquer lead que entrou em contato (WhatsApp/Msg), sem filtro de qualificação.
              Use como referência para o campo "CPL estimado".
            </p>
            <div className="overflow-x-auto rounded border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-white/5 text-bone/70">
                    <th className="whitespace-nowrap px-3 py-2">Serviço</th>
                    <th className="whitespace-nowrap px-3 py-2">Orç. Mínimo/mês</th>
                    <th className="whitespace-nowrap px-3 py-2">Orç. Ideal/mês</th>
                    <th className="whitespace-nowrap px-3 py-2">CPL Bruto</th>
                    <th className="whitespace-nowrap px-3 py-2">Meta de Leads</th>
                  </tr>
                </thead>
                <tbody>
                  {BENCHMARKS.map((b) => (
                    <tr key={b.servico} className="border-t border-white/10">
                      <td className="whitespace-nowrap px-3 py-2 font-medium text-bone">{b.servico}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-bone/70">{b.orcMinimo}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-bone/70">{b.orcIdeal}</td>
                      <td className="whitespace-nowrap px-3 py-2 font-mono text-brand-light">{b.cplBruto}</td>
                      <td className="whitespace-nowrap px-3 py-2 text-bone/70">{b.metaLeads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

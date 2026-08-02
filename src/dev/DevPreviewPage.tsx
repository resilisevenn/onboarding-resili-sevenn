// Rota temporária só para visualizar a migração de design dos 12 blocos com dados fictícios,
// sem depender de um registro real no Supabase. Remover junto com a rota /dev-preview em App.tsx
// quando a migração estiver concluída e aprovada.
import { OnboardingDocument } from '../components/document/OnboardingDocument'
import { MOCK_PAYLOAD } from './mockPayload'

export function DevPreviewPage() {
  return (
    <OnboardingDocument clientName="Clínica Vitá Estética" payload={MOCK_PAYLOAD} generatedAt="2026-08-05T00:00:00.000Z" />
  )
}

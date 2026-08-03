// Rota de preview da Dra. Gabrielle Leão, sem gate/Supabase, para revisar o documento
// enquanto o conteúdo é montado bloco a bloco.
import { OnboardingDocument } from '../components/document/OnboardingDocument'
import { GABRIELLE_PAYLOAD } from './gabriellePayload'

export function GabriellePreviewPage() {
  return (
    <OnboardingDocument
      clientName="Dra. Gabrielle Leão"
      payload={GABRIELLE_PAYLOAD}
      generatedAt="2026-08-03T12:00:00.000Z"
    />
  )
}

import type {
  Bloco1Negocio,
  Bloco6CaminhoPaciente,
  Bloco7Fases,
  Bloco8Criativos,
  Bloco9Riscos,
  Bloco10Checklist,
  Bloco11ComoTrabalhar,
  Bloco12Primeiros30Dias,
} from '../types/onboarding'
import { supabase } from './supabase'

export interface ExtractedFields {
  bloco1_negocio?: Partial<Bloco1Negocio>
  bloco6_caminhoPaciente?: Partial<Bloco6CaminhoPaciente>
  bloco7_fases?: Partial<Bloco7Fases>
  bloco8_criativos?: Partial<Bloco8Criativos>
  bloco9_riscos?: Partial<Bloco9Riscos>
  bloco10_checklist?: Partial<Bloco10Checklist>
  bloco11_comoTrabalhar?: Partial<Bloco11ComoTrabalhar>
  bloco12_primeiros30Dias?: Partial<Bloco12Primeiros30Dias>
}

export async function extractOnboardingFromTranscript(transcript: string): Promise<ExtractedFields> {
  const { data: session } = await supabase.auth.getSession()
  const token = session.session?.access_token
  if (!token) throw new Error('Sessão expirada — faça login novamente.')

  const res = await fetch('/api/extract-onboarding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ transcript }),
  })

  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.error ?? 'Falha ao extrair dados da transcrição')
  }
  return result as ExtractedFields
}

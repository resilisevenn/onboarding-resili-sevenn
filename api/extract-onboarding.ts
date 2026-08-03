import type { VercelRequest, VercelResponse } from '@vercel/node'
import { buildKnowledgeBaseContext } from './_lib/agencyKnowledgeBase'
import { requireEditorUser } from './_lib/requireUser'
import { sanitizeExtractedFields } from './_lib/validateExtractedFields'

function buildSystemPrompt(): string {
  const kb = buildKnowledgeBaseContext()

  return `Você extrai informações estruturadas de uma transcrição/resumo de call de onboarding entre uma agência de marketing e uma clínica de estética.

Extraia APENAS os campos abaixo, em JSON válido, sem comentários. Se uma informação não estiver clara no texto, use string vazia ou array vazio — NUNCA invente dado que não está no texto nem na metodologia padrão fornecida abaixo.

{
  "bloco1_negocio": {
    "servicos": string[],
    "diferencial": string,
    "publicoDescrito": string,
    "regioesAtendidas": string,
    "horariosFuncionamento": string,
    "sazonalidade": string
  },
  "bloco6_caminhoPaciente": {
    "etapas": { "titulo": string, "descricao": string }[]
  },
  "bloco7_fases": {
    "fases": { "nome": string, "percentualVerba": number, "objetivo": string, "gatilhoMudancaFase": string }[]
  },
  "bloco8_criativos": {
    "formatos": string[],
    "angulosDeMensagem": string[],
    "copyDePartida": string,
    "linkReferencias": string
  },
  "bloco9_riscos": {
    "riscos": { "descricao": string, "origem": "clinica" | "gestor", "planoDeAcao": string }[]
  },
  "bloco10_checklist": {
    "itens": { "item": string, "prazo": string, "responsavel": string }[]
  },
  "bloco11_comoTrabalhar": {
    "canalComunicacao": string,
    "frequenciaReport": string,
    "oQuePodeEsperar": string,
    "motivoParceriaValerAPena": string
  },
  "bloco12_primeiros30Dias": {
    "cronograma": { "data": string, "descricao": string }[],
    "oQueNaoVaiAcontecer": string[]
  }
}

Para bloco7_fases, bloco8_criativos e bloco9_riscos: use a metodologia padrão da agência (se fornecida abaixo) como base,
adaptando ao contexto específico do cliente mencionado na transcrição. Se a metodologia padrão não for fornecida e a
transcrição não mencionar esses pontos, retorne arrays vazios — não invente fases, formatos ou riscos genéricos.

${kb || 'Metodologia padrão da agência não fornecida nesta chamada — extraia apenas o que a transcrição mencionar explicitamente para bloco7/8/9.'}

Não extraia dados financeiros (faturamento, ticket, custo, margem, metas) nem ICP/persona/território — esses são preenchidos manualmente pelo gestor por decisão de produto.`
}

export const config = {
  maxDuration: 60,
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const user = await requireEditorUser(req)
  if (!user) {
    res.status(401).json({ error: 'Não autorizado' })
    return
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'OPENAI_API_KEY não configurada no servidor' })
    return
  }

  const { transcript } = req.body as { transcript?: string }
  if (!transcript || typeof transcript !== 'string' || transcript.trim().length < 20) {
    res.status(400).json({ error: 'Transcrição vazia ou muito curta' })
    return
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        temperature: 0,
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: transcript.slice(0, 80000) },
        ],
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      res.status(502).json({ error: 'Falha ao chamar a OpenAI', detail })
      return
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content
    if (!content) {
      res.status(502).json({ error: 'Resposta vazia do modelo' })
      return
    }

    let parsed: unknown
    try {
      parsed = JSON.parse(content)
    } catch {
      res.status(502).json({ error: 'Resposta do modelo não é um JSON válido' })
      return
    }

    res.status(200).json(sanitizeExtractedFields(parsed))
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : 'Erro desconhecido' })
  }
}

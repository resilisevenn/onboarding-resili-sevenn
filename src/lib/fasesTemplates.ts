export interface FaseTemplate {
  id: 'agressivo' | 'padrao' | 'conservador'
  nome: string
  fases: { nome: string; periodo: string; objetivo: string; gatilhoMudancaFase: string }[]
}

export const FASES_TEMPLATES: FaseTemplate[] = [
  {
    id: 'agressivo',
    nome: 'Agressivo — verba alta, pressa por resultado',
    fases: [
      {
        nome: 'Aprendizado',
        periodo: 'Dias 1 a 7',
        objetivo: 'Validar públicos e criativos rapidamente, testar mais variações em paralelo.',
        gatilhoMudancaFase: 'Volume mínimo de 20 leads.',
      },
      {
        nome: 'Otimização',
        periodo: 'Dias 8 a 21',
        objetivo: 'Escalar vencedores de forma acelerada.',
        gatilhoMudancaFase: 'CPL dentro da meta por 3 dias seguidos.',
      },
      {
        nome: 'Escala',
        periodo: 'A partir do dia 22 (contínua)',
        objetivo: 'Escalar verba de forma agressiva nos melhores conjuntos.',
        gatilhoMudancaFase: 'Reavaliação semanal de saturação de público.',
      },
    ],
  },
  {
    id: 'padrao',
    nome: 'Padrão — ritmo equilibrado',
    fases: [
      {
        nome: 'Aprendizado',
        periodo: 'Dias 1 a 14',
        objetivo: 'Validar públicos, criativos e ofertas.',
        gatilhoMudancaFase: 'CPL estável e mínimo de 40 leads.',
      },
      {
        nome: 'Otimização',
        periodo: 'Dias 15 a 30',
        objetivo: 'Escalar vencedores, cortar low performers.',
        gatilhoMudancaFase: 'CPL dentro da meta por 7 dias seguidos.',
      },
      {
        nome: 'Escala',
        periodo: 'A partir do dia 31 (contínua)',
        objetivo: 'Aumentar verba nos melhores conjuntos.',
        gatilhoMudancaFase: 'Reavaliação mensal de saturação de público.',
      },
    ],
  },
  {
    id: 'conservador',
    nome: 'Conservador — verba enxuta, sem histórico de tráfego',
    fases: [
      {
        nome: 'Aprendizado',
        periodo: 'Dias 1 a 21',
        objetivo: 'Validar públicos e criativos com verba controlada, evitar decisões precipitadas.',
        gatilhoMudancaFase: 'CPL estável e mínimo de 40 leads em 14 dias.',
      },
      {
        nome: 'Otimização',
        periodo: 'Dias 22 a 45',
        objetivo: 'Escalar apenas vencedores comprovados, manter verba de segurança.',
        gatilhoMudancaFase: 'CPL dentro da meta por 14 dias seguidos.',
      },
      {
        nome: 'Escala',
        periodo: 'A partir do dia 46 (contínua)',
        objetivo: 'Aumentar verba de forma gradual.',
        gatilhoMudancaFase: 'Reavaliação mensal, aumentos de no máximo 20% por vez.',
      },
    ],
  },
]

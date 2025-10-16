// Sistema de perguntas estruturadas da Fase 1

export interface Question {
  id: string
  text: string
  options?: { value: string; label: string }[]
  type: 'text' | 'select' | 'number' | 'email' | 'tel'
  required: boolean
  conditionalLogic?: (answers: Record<string, string>) => boolean
}

// Pergunta inicial para capturar o nome
export const INITIAL_NAME_QUESTION: Question = {
  id: 'user_name',
  text: 'Olá! Sou o Assistente da Connect Academy. 👋\n\nAntes de começarmos, qual o seu nome?',
  type: 'text',
  required: true
}

// Segunda pergunta - escolha do estágio do negócio
export const INITIAL_QUESTION: Question = {
  id: 'business_stage',
  text: 'Prazer em conhecê-lo! Para começar, preciso saber: você está **iniciando um negócio** ou **buscando melhorar um negócio atual**?',
  options: [
    { value: 'iniciando', label: 'Iniciando um negócio' },
    { value: 'melhorando', label: 'Buscando melhorar o negócio atual' }
  ],
  type: 'select',
  required: true
}

// Perguntas finais para capturar contato
export const FINAL_CONTACT_QUESTIONS: Question[] = [
  {
    id: 'user_email',
    text: 'Perfeito! Para enviar seu relatório completo, qual o seu **email**?',
    type: 'email',
    required: true
  },
  {
    id: 'user_whatsapp',
    text: 'E qual o seu **WhatsApp** para nossa equipe comercial entrar em contato? (formato: 11999999999)',
    type: 'tel',
    required: true
  }
]

export const QUESTIONS_INICIANDO: Question[] = [
  {
    id: 'business_name',
    text: 'Qual será o nome da sua empresa?',
    type: 'text',
    required: true
  },
  {
    id: 'segment',
    text: 'Qual será o segmento de atuação?',
    options: [
      { value: 'varejo', label: 'Varejo' },
      { value: 'atacado', label: 'Atacado' },
      { value: 'servicos', label: 'Serviços' },
      { value: 'logistica', label: 'Logística' },
      { value: 'construcao', label: 'Construção Civil' },
      { value: 'saude', label: 'Serviços de Saúde' },
      { value: 'hotel', label: 'Hotel' },
      { value: 'restaurante', label: 'Restaurante' },
      { value: 'diversos', label: 'Serviços Diversos' }
    ],
    type: 'select',
    required: true
  },
  {
    id: 'tax_regime',
    text: 'Qual regime tributário pretende adotar?',
    options: [
      { value: 'simples', label: 'Simples Nacional' },
      { value: 'presumido', label: 'Lucro Presumido' },
      { value: 'real', label: 'Lucro Real' },
      { value: 'outro', label: 'Outro' }
    ],
    type: 'select',
    required: true
  },
  {
    id: 'employees',
    text: 'Quantos empregados pretende contratar inicialmente?',
    options: [
      { value: '0-10', label: 'até 10' },
      { value: '11-50', label: '11–50' },
      { value: '51-100', label: '51–100' },
      { value: '100+', label: '+100' }
    ],
    type: 'select',
    required: true
  },
  {
    id: 'partners',
    text: 'Quantos sócios terá a empresa?',
    type: 'number',
    required: true
  },
  {
    id: 'locations',
    text: 'Em quais cidades/estados pretende atuar?',
    type: 'text',
    required: true
  },
  {
    id: 'main_concern',
    text: 'Qual sua maior preocupação ou desafio ao iniciar o negócio?',
    type: 'text',
    required: true
  }
]

export const QUESTIONS_MELHORANDO: Question[] = [
  {
    id: 'business_name',
    text: 'Qual o nome da sua empresa?',
    type: 'text',
    required: true
  },
  {
    id: 'cnpj',
    text: 'Qual o CNPJ da empresa principal?',
    type: 'text',
    required: true
  },
  {
    id: 'segment',
    text: 'Qual o segmento de atuação?',
    options: [
      { value: 'varejo', label: 'Varejo' },
      { value: 'atacado', label: 'Atacado' },
      { value: 'servicos', label: 'Serviços' },
      { value: 'logistica', label: 'Logística' },
      { value: 'construcao', label: 'Construção Civil' },
      { value: 'saude', label: 'Serviços de Saúde' },
      { value: 'hotel', label: 'Hotel' },
      { value: 'restaurante', label: 'Restaurante' },
      { value: 'diversos', label: 'Serviços Diversos' }
    ],
    type: 'select',
    required: true
  },
  {
    id: 'revenue',
    text: "Qual o faturamento anual médio dos últimos 3 anos? (Em caso de não haver faturamento, escreva 'Não')",
    type: 'text',
    required: true
  },
  {
    id: 'tax_regime',
    text: 'Qual o regime tributário atual?',
    options: [
      { value: 'simples', label: 'Simples Nacional' },
      { value: 'presumido', label: 'Lucro Presumido' },
      { value: 'real', label: 'Lucro Real' },
      { value: 'outro', label: 'Outro' }
    ],
    type: 'select',
    required: true
  },
  {
    id: 'employees',
    text: 'Quantos empregados a empresa possui?',
    options: [
      { value: '0-10', label: 'até 10' },
      { value: '11-50', label: '11–50' },
      { value: '51-100', label: '51–100' },
      { value: '100+', label: '+100' }
    ],
    type: 'select',
    required: true
  },
  {
    id: 'contractors',
    text: 'A empresa possui contratos com prestadores PJ/autônomos?',
    options: [
      { value: 'sim', label: 'Sim' },
      { value: 'nao', label: 'Não' }
    ],
    type: 'select',
    required: true
  },
  {
    id: 'partners',
    text: 'Quantos sócios a empresa possui?',
    type: 'number',
    required: true
  },
  {
    id: 'cnpjs',
    text: 'Quantos CNPJs existem no grupo empresarial?',
    type: 'number',
    required: true
  },
  {
    id: 'locations',
    text: 'Em quais cidades/estados a empresa atua?',
    type: 'text',
    required: true
  },
  {
    id: 'main_pain',
    text: 'Qual a maior dor ou desafio atual da empresa?',
    type: 'text',
    required: true
  }
]

export function getQuestionsList(businessStage: string): Question[] {
  const businessQuestions =
    businessStage === 'iniciando' ? QUESTIONS_INICIANDO : QUESTIONS_MELHORANDO

  return [...businessQuestions, ...FINAL_CONTACT_QUESTIONS]
}

export function getNextQuestion(
  businessStage: string,
  currentAnswers: Record<string, string>
): Question | null {
  const questions = getQuestionsList(businessStage)

  for (const question of questions) {
    if (!currentAnswers[question.id]) {
      return question
    }
  }

  return null
}

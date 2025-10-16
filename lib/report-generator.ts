type BusinessAnswers = {
  business_name?: string
  cnpj?: string
  segment?: string
  revenue?: string
  tax_regime?: string
  employees?: string
  contractors?: string
  partners?: string
  cnpjs?: string
  locations?: string
  main_pain?: string
  main_concern?: string // Para fluxo "iniciando"
  business_stage?: string
  // As respostas 'litigation' e 'informal_employees' foram removidas
}

export function generateReport(answers: BusinessAnswers): string {
  const isStarting = answers.business_stage === 'iniciando' || !answers.cnpj

  const safeAnswers = {
    business_name: answers.business_name || 'Empresa',
    cnpj:
      answers.cnpj ||
      (isStarting ? 'Em processo de abertura' : 'Não informado'),
    segment: answers.segment || 'Não informado',
    revenue:
      answers.revenue ||
      (isStarting ? 'Empresa em fase de abertura' : 'Não informado'),
    tax_regime: answers.tax_regime || 'Não informado',
    employees: answers.employees || 'Não informado',
    contractors: answers.contractors || '',
    partners: answers.partners || 'Não informado',
    cnpjs: answers.cnpjs || (isStarting ? '1 (em abertura)' : 'Não informado'),
    locations: answers.locations || 'Não informado',
    main_pain: answers.main_pain || answers.main_concern || 'Não informado',
    isStarting: isStarting
  }

  const hasContractors = safeAnswers.contractors.toLowerCase().includes('sim')
  const isSimples = safeAnswers.tax_regime.includes('Simples')
  const isLucroPresumido = safeAnswers.tax_regime.includes('Lucro Presumido')

  let report = `# 📊 ${
    safeAnswers.isStarting
      ? 'Plano de Estruturação Empresarial'
      : 'Diagnóstico Empresarial Completo'
  }\n## ${safeAnswers.business_name}\n\n`

  if (safeAnswers.isStarting) {
    report += `**Status:** Empresa em fase de abertura\n`
  } else {
    report += `**CNPJ:** ${safeAnswers.cnpj}\n`
  }

  report += `**Segmento:** ${safeAnswers.segment}\n`

  if (!safeAnswers.isStarting) {
    report += `**Faturamento Anual:** ${safeAnswers.revenue}\n`
  }

  report += `**Regime Tributário:** ${safeAnswers.tax_regime}\n\n`

  report += `---\n\n## 🎯 ${
    safeAnswers.isStarting ? 'Análise de Planejamento' : 'Análise Estratégica'
  }\n\n`
  report += `### ${
    safeAnswers.isStarting
      ? 'Principal Preocupação'
      : 'Principal Desafio Identificado'
  }\n${safeAnswers.main_pain}\n\n`

  // Análise Tributária
  report += `### 💰 Análise Tributária\n\n`
  if (isSimples) {
    report += `Sua empresa está no **Simples Nacional**. Este regime é adequado para empresas com faturamento de até R$ 4,8 milhões anuais.\n\n`
    report += `**Recomendações:**\n`
    report += `- Avaliar se permanência no Simples é vantajosa considerando seu faturamento atual\n`
    report += `- Análise de enquadramento nos anexos corretos do Simples\n`
    report += `- Estudo de viabilidade de migração para Lucro Presumido/Real se aplicável\n`
    report += `- Revisão de créditos tributários não aproveitados\n\n`
  } else if (isLucroPresumido) {
    report += `Sua empresa está no **Lucro Presumido**. Este regime pode ser otimizado.\n\n`
    report += `**Recomendações:**\n`
    report += `- Planejamento tributário para redução de carga fiscal\n`
    report += `- Análise comparativa com Lucro Real\n`
    report += `- Revisão de IRPJ e CSLL para otimização\n`
    report += `- Estudo de benefícios fiscais aplicáveis ao seu segmento\n\n`
  } else {
    report += `Seu regime tributário atual: ${safeAnswers.tax_regime}\n\n`
    report += `**Recomendações:**\n`
    report += `- Análise detalhada do regime atual vs. alternativas disponíveis\n`
    report += `- Estudo de viabilidade econômica de mudança de regime\n`
    report += `- Revisão de obrigações acessórias e compliance tributário\n\n`
  }

  // Análise Trabalhista
  report += `### 👥 Análise Trabalhista e RH\n\n`

  if (safeAnswers.isStarting) {
    report += `**Previsão de empregados:** ${safeAnswers.employees}\n\n`
    report += `**Recomendações para Estruturação:**\n`
    report += `- Planejamento de estrutura organizacional desde o início\n`
    report += `- Definição de políticas de contratação e remuneração\n`
    report += `- Escolha adequada entre CLT, PJ e outros modelos\n`
    report += `- Implementação de controles de ponto e jornada desde o dia 1\n`
    report += `- Elaboração de manual do empregado e código de conduta\n`
    report += `- Compliance trabalhista preventivo para evitar passivos futuros\n\n`
  } else {
    report += `**Número de empregados:** ${safeAnswers.employees}\n\n`
    report += `**Recomendações de Melhoria:**\n`
    report += `- Revisão de políticas de RH e compliance trabalhista\n`
    report += `- Implementação de programa de avaliação de desempenho\n`
    report += `- Análise de benefícios competitivos para retenção de talentos\n\n`

    if (hasContractors) {
      report += `**Prestadores PJ/Autônomos:** Identificados contratos com prestadores.\n\n`
      report += `**Ações Recomendadas:**\n`
      report += `- Revisão de todos os contratos PJ para evitar caracterização de vínculo\n`
      report += `- Verificação de requisitos de pejotização vs. CLT\n`
      report += `- Análise de custos: PJ vs. CLT\n`
      report += `- Implementação de controles preventivos\n\n`
    }
  }

  // Análise Societária
  report += `### 🏢 Estrutura Societária\n\n`
  report += `**Número de sócios:** ${safeAnswers.partners}\n`
  report += `**Número de CNPJs no grupo:** ${safeAnswers.cnpjs}\n`
  report += `**Localizações:** ${safeAnswers.locations}\n\n`

  report += `**Recomendações:**\n`
  report += `- Revisão e atualização do contrato social\n`
  report += `- Análise de acordo de quotistas/acionistas\n`
  report += `- Planejamento sucessório e proteção patrimonial\n`
  report += `- Governança corporativa adequada ao porte\n\n`

  // Plano de Ação (sem as lógicas condicionais das perguntas removidas)
  report += `---\n\n## 📅 Plano de Ação Estratégico\n\n`

  report += `### 🎯 Fase 1: Primeiros 180 Dias (Urgente)\n\n`
  report += `#### Mês 1-2: Diagnóstico e Regularização\n`
  report += `- Auditoria completa de compliance tributário, trabalhista e societário\n`
  report += `- Levantamento de passivos contingentes\n`
  report += `- Mapeamento de processos críticos\n`
  report += `- Implementação de controles internos básicos\n\n`

  report += `#### Mês 3-4: Estruturação e Planejamento\n`
  report += `- Planejamento tributário para o próximo exercício\n`
  report += `- Revisão de todos os contratos empresariais\n`
  report += `- Implementação de políticas de RH e compliance\n`
  report += `- Estruturação de governança corporativa\n`
  report += `- Análise de fluxo de caixa e gestão financeira\n\n`

  report += `#### Mês 5-6: Otimização e Proteção\n`
  report += `- Implementação de planejamento tributário aprovado\n`
  report += `- Reestruturação societária se necessário\n`
  report += `- Proteção patrimonial dos sócios\n`
  report += `- Sistema de gestão de riscos operacionais\n`
  report += `- Revisão de seguros empresariais\n\n`

  report += `### 🚀 Fase 2: 180-360 Dias (Crescimento Sustentável)\n\n`
  report += `#### Mês 7-9: Consolidação\n`
  report += `- Monitoramento de indicadores de compliance\n`
  report += `- Auditoria interna de processos implementados\n`
  report += `- Treinamento contínuo de equipes\n`
  report += `- Análise de oportunidades de expansão\n`
  report += `- Revisão de estratégia tributária\n\n`

  report += `#### Mês 10-12: Excelência Operacional\n`
  report += `- Certificações e selos de qualidade\n`
  report += `- Programa de inovação e melhoria contínua\n`
  report += `- Análise de M&A e parcerias estratégicas\n`
  report += `- Planejamento estratégico de longo prazo\n`
  report += `- Preparação para próximo ciclo de crescimento\n\n`

  // Benefícios Esperados
  report += `---\n\n## 💎 Benefícios Esperados\n\n`
  report += `### Resultados em 180 Dias:\n`
  report += `- ✅ Regularização completa de pendências críticas\n`
  report += `- ✅ Redução de riscos jurídicos e fiscais\n`
  report += `- ✅ Otimização tributária com economia estimada de 15-30%\n`
  report += `- ✅ Processos internos estruturados e documentados\n`
  report += `- ✅ Governança corporativa implementada\n\n`

  report += `### Resultados em 360 Dias:\n`
  report += `- 🚀 Empresa 100% em compliance legal e fiscal\n`
  report += `- 🚀 Estrutura escalável para crescimento\n`
  report += `- 🚀 Redução de custos operacionais em 20-35%\n`
  report += `- 🚀 Proteção patrimonial consolidada\n`
  report += `- 🚀 Base sólida para expansão nacional/internacional\n\n`

  // Próximos Passos
  report += `---\n\n## 📞 Próximos Passos\n\n`
  report += `### Agende sua Consultoria Personalizada\n\n`
  report += `Nossa equipe está pronta para:\n`
  report += `1. Apresentar análise detalhada do diagnóstico\n`
  report += `2. Discutir prioridades e cronograma\n`
  report += `3. Apresentar proposta de investimento\n`
  report += `4. Iniciar a transformação da sua empresa\n\n`

  report += `**Entre em contato:**\n`
  report += `- 📧 Email: contato@connectacademy.com\n`
  report += `- 📱 WhatsApp: (11) 99999-9999\n`
  report += `- 🌐 Site: www.connectacademy.com\n\n`

  report += `---\n\n`
  report += `*Relatório gerado automaticamente pelo sistema Connect Academy Business Diagnostic.*\n`
  report += `*Este diagnóstico é baseado nas informações fornecidas e representa uma análise preliminar.*\n`
  report += `*Para um diagnóstico completo e personalizado, agende uma consultoria com nossos especialistas.*\n`

  return report
}

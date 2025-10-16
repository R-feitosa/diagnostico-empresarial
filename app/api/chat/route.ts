
import { NextRequest, NextResponse } from "next/server";
import {
  INITIAL_NAME_QUESTION,
  INITIAL_QUESTION,
  getNextQuestion,
  getQuestionsList,
} from "@/lib/questions";
import { generateReport } from "@/lib/report-generator";

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, currentAnswers, businessStage, currentQuestionId } =
      await request.json();

    console.log('\n=== INÍCIO DA REQUISIÇÃO ===');
    console.log('Business Stage:', businessStage);
    console.log('Current Question ID:', currentQuestionId);
    console.log('Message:', message);

    // Se não há nome do usuário, começar com a pergunta do nome
    if (!currentAnswers?.user_name) {
      console.log('Sem nome do usuário - retornando pergunta inicial');
      return NextResponse.json({
        response: INITIAL_NAME_QUESTION.text,
        question: INITIAL_NAME_QUESTION,
        isComplete: false,
      });
    }

    // Se não há businessStage, fazer a segunda pergunta
    if (!businessStage) {
      console.log('Sem business stage - retornando pergunta de estágio');
      return NextResponse.json({
        response: INITIAL_QUESTION.text,
        question: INITIAL_QUESTION,
        isComplete: false,
      });
    }

    // Verificar se todas as perguntas foram respondidas (incluindo a última)
    const allQuestions = getQuestionsList(businessStage);
    const answers = { ...currentAnswers };
    
    // Contar quantas perguntas foram respondidas
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = allQuestions.length;

    console.log(`\nPerguntas respondidas: ${answeredCount}/${totalQuestions}`);
    console.log('IDs das perguntas:', allQuestions.map(q => q.id));
    console.log('IDs das respostas:', Object.keys(answers));
    console.log('Respostas completas:', JSON.stringify(answers, null, 2));

    // Se todas as perguntas foram respondidas, gerar relatório
    if (answeredCount >= totalQuestions) {
      console.log('\n✅ TODAS AS PERGUNTAS RESPONDIDAS - GERANDO RELATÓRIO...\n');
      
      try {
        console.log('📝 Gerando relatório usando template inteligente...');
        
        // Gerar relatório usando o gerador local
        const report = generateReport(answers as any);
        
        console.log(`✅ Relatório gerado com sucesso! Tamanho: ${report.length} caracteres`);

        // Enviar relatório por email
        try {
          console.log('📧 Enviando relatório por email...');
          
          // Usar Gmail SMTP (gratuito e funciona para qualquer email) ou Resend
          const emailService = process.env.EMAIL_SERVICE || 'gmail'; // 'gmail' ou 'resend'
          const emailEndpoint = emailService === 'gmail' ? '/api/send-report-gmail' : '/api/send-report';
          
          console.log(`📮 Usando serviço de email: ${emailService.toUpperCase()}`);
          
          const emailResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}${emailEndpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              reportMarkdown: report,
              userName: answers.user_name,
              userEmail: answers.user_email,
              userWhatsApp: answers.user_whatsapp,
              businessName: answers.business_name,
              answers: answers,
            }),
          });

          if (!emailResponse.ok) {
            const errorText = await emailResponse.text();
            console.error('❌ Erro ao enviar email:', errorText);
            // Se Gmail falhar, tentar Resend como backup (se configurado)
            if (emailService === 'gmail' && process.env.RESEND_API_KEY) {
              console.log('🔄 Tentando enviar via Resend como backup...');
              const backupResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/send-report`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  reportMarkdown: report,
                  userName: answers.user_name,
                  userEmail: answers.user_email,
                  userWhatsApp: answers.user_whatsapp,
                  businessName: answers.business_name,
                  answers: answers,
                }),
              });
              
              if (backupResponse.ok) {
                console.log('✅ Email enviado com sucesso via Resend (backup)!');
              }
            }
          } else {
            console.log(`✅ Email enviado com sucesso via ${emailService.toUpperCase()}!`);
          }
        } catch (emailError) {
          console.error('❌ Erro ao chamar API de email:', emailError);
          // Não falhar o processo todo se o email falhar
        }

        return NextResponse.json({
          response: report,
          question: null,
          isComplete: true,
          report,
        });
      } catch (error) {
        console.error('❌ ERRO ao gerar relatório:', error);
        console.error('Detalhes do erro:', JSON.stringify(error, null, 2));
        
        return NextResponse.json({
          response: `Desculpe, houve um erro ao gerar o relatório. Por favor, tente novamente. Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
          question: null,
          isComplete: false,
          error: true,
        });
      }
    }

    // Ainda há perguntas a responder - obter próxima pergunta
    console.log('\n⏭️ Buscando próxima pergunta...');
    const nextQuestion = getNextQuestion(businessStage, answers);
    
    if (nextQuestion) {
      console.log('✅ Próxima pergunta encontrada:', nextQuestion.id, '-', nextQuestion.text.substring(0, 50) + '...');
      return NextResponse.json({
        response: nextQuestion.text,
        question: nextQuestion,
        isComplete: false,
      });
    }

    // Fallback - não deveria chegar aqui, mas se chegar, retornar erro
    console.error('\n❌ ERRO: Estado inconsistente - sem próxima pergunta mas sem relatório');
    console.error('Contagem:', answeredCount, '/', totalQuestions);
    return NextResponse.json({
      response: "Erro: Estado inconsistente. Por favor, recarregue a página e tente novamente.",
      question: null,
      isComplete: false,
    });
    
  } catch (error) {
    console.error("Erro na API de chat:", error);
    return NextResponse.json(
      { error: "Erro ao processar a mensagem" },
      { status: 500 }
    );
  }
}

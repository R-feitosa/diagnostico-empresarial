
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateReportPDF } from "@/lib/pdf-generator";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { reportMarkdown, userName, userEmail, userWhatsApp, businessName, answers } = await request.json();

    console.log('\n=== ENVIANDO RELATÓRIO ===');
    console.log('Usuário:', userName);
    console.log('Email:', userEmail);
    console.log('WhatsApp:', userWhatsApp);
    console.log('Empresa:', businessName);
    console.log('API Key configurada:', !!process.env.RESEND_API_KEY);
    console.log('API Key (primeiros 10 chars):', process.env.RESEND_API_KEY?.substring(0, 10));

    // Gerar PDF do relatório
    console.log('Gerando PDF do relatório...');
    const pdfBuffer = generateReportPDF(reportMarkdown, userName, businessName);
    console.log('PDF gerado com sucesso. Tamanho:', pdfBuffer.length, 'bytes');

    // Email para o cliente
    console.log('\n📧 Enviando email para o cliente:', userEmail);
    console.log('⚠️  IMPORTANTE: Com o domínio de teste (onboarding@resend.dev), o Resend só permite enviar para emails verificados.');
    console.log('    Para enviar para qualquer email, você precisa:');
    console.log('    1. Verificar seu domínio no Resend');
    console.log('    2. Usar um email do seu domínio como remetente (ex: contato@rfeitosagroup.com)');
    console.log('    3. Ou adicionar o email do destinatário na lista de "Testing emails" no painel do Resend');
    
    const clientEmailResult = await resend.emails.send({
      from: 'RFeitosa Group <onboarding@resend.dev>',
      to: [userEmail],
      subject: `Seu Diagnóstico Empresarial - ${businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #6E0000; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">RFEITOSA GROUP</h1>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #0A1F44;">Olá, ${userName}!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Obrigado por confiar na <strong>RFeitosa Group</strong> para o diagnóstico empresarial de <strong>${businessName}</strong>.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Seu relatório completo está anexado a este email em formato PDF. Este documento contém:
            </p>
            
            <ul style="font-size: 14px; line-height: 1.8; color: #555;">
              <li>Análise detalhada da situação atual</li>
              <li>Identificação de riscos e oportunidades</li>
              <li>Recomendações estratégicas personalizadas</li>
              <li>Plano de ação estruturado</li>
            </ul>
            
            <div style="background-color: #fff; border-left: 4px solid #6E0000; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #333;">
                <strong>📞 Próximo Passo:</strong><br/>
                Nossa equipe comercial entrará em contato em breve pelo WhatsApp <strong>${userWhatsApp}</strong> para agendar uma consultoria personalizada e discutir como podemos ajudar sua empresa a alcançar seus objetivos.
              </p>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              Atenciosamente,<br/>
              <strong style="color: #6E0000;">Equipe RFeitosa Group</strong>
            </p>
          </div>
          
          <div style="background-color: #0A1F44; padding: 15px; text-align: center;">
            <p style="color: #fff; margin: 0; font-size: 12px;">
              © ${new Date().getFullYear()} RFeitosa Group - Todos os direitos reservados
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Diagnostico_${businessName.replace(/\s+/g, '_')}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    console.log('✅ Email enviado para o cliente!');
    console.log('   ID:', clientEmailResult.data?.id);
    console.log('   Error:', clientEmailResult.error);

    // Email para a empresa com os dados do lead
    const companyEmail = process.env.COMPANY_EMAIL || 'ffilho695@gmail.com';
    console.log('\n📧 Enviando email para a empresa:', companyEmail);
    
    const companyEmailResult = await resend.emails.send({
      from: 'RFeitosa Group Sistema <onboarding@resend.dev>',
      to: [companyEmail],
      subject: `🎯 Novo Lead: ${userName} - ${businessName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #6E0000; padding: 20px;">
            <h2 style="color: white; margin: 0;">🎯 NOVO LEAD CAPTURADO</h2>
          </div>
          
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h3 style="color: #0A1F44; margin-top: 0;">Informações do Lead</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 0; font-weight: bold; color: #6E0000;">Nome:</td>
                <td style="padding: 12px 0;">${userName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 0; font-weight: bold; color: #6E0000;">Email:</td>
                <td style="padding: 12px 0;"><a href="mailto:${userEmail}">${userEmail}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 0; font-weight: bold; color: #6E0000;">WhatsApp:</td>
                <td style="padding: 12px 0;">
                  <a href="https://wa.me/55${userWhatsApp.replace(/\D/g, '')}" target="_blank">${userWhatsApp}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 0; font-weight: bold; color: #6E0000;">Empresa:</td>
                <td style="padding: 12px 0;">${businessName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 0; font-weight: bold; color: #6E0000;">Segmento:</td>
                <td style="padding: 12px 0;">${answers.segment || 'Não informado'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 0; font-weight: bold; color: #6E0000;">Estágio:</td>
                <td style="padding: 12px 0;">${answers.business_stage === 'iniciando' ? 'Iniciando um negócio' : 'Melhorando negócio atual'}</td>
              </tr>
            </table>
            
            <div style="background-color: #fff; border-left: 4px solid #6E0000; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #333; font-weight: bold;">
                Principal Desafio/Preocupação:
              </p>
              <p style="margin: 10px 0 0 0; color: #666;">
                ${answers.main_pain || answers.main_concern || 'Não informado'}
              </p>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              O relatório completo está anexado a este email.
            </p>
          </div>
          
          <div style="background-color: #0A1F44; padding: 15px; text-align: center;">
            <p style="color: #fff; margin: 0; font-size: 12px;">
              RFeitosa Group - Sistema de Diagnóstico Empresarial
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `Lead_${userName.replace(/\s+/g, '_')}_${businessName.replace(/\s+/g, '_')}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    console.log('✅ Email enviado para a empresa!');
    console.log('   ID:', companyEmailResult.data?.id);
    console.log('   Error:', companyEmailResult.error);

    console.log('\n=== RESUMO DO ENVIO ===');
    console.log('Cliente Email ID:', clientEmailResult.data?.id || 'ERRO');
    console.log('Empresa Email ID:', companyEmailResult.data?.id || 'ERRO');
    console.log('=======================\n');

    return NextResponse.json({
      success: true,
      message: 'Relatório enviado com sucesso!',
      clientEmailId: clientEmailResult.data?.id,
      companyEmailId: companyEmailResult.data?.id,
      clientEmailError: clientEmailResult.error,
      companyEmailError: companyEmailResult.error,
    });

  } catch (error) {
    console.error('Erro ao enviar relatório:', error);
    return NextResponse.json(
      {
        error: 'Erro ao enviar relatório',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}

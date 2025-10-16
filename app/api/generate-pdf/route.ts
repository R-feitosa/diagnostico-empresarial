
import { NextRequest, NextResponse } from "next/server";
import { generateReportPDF } from "@/lib/pdf-generator";

export async function POST(request: NextRequest) {
  try {
    const { reportMarkdown, userName, businessName } = await request.json();

    console.log('Gerando PDF:', { userName, businessName });

    // Gerar PDF
    const pdfBuffer = generateReportPDF(reportMarkdown, userName, businessName);

    // Retornar o PDF como blob
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Diagnostico_${businessName.replace(/\s+/g, '_')}.pdf"`,
      },
    });

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    return NextResponse.json(
      {
        error: 'Erro ao gerar PDF',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}

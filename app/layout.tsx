
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diagnóstico Empresarial - RFeitosa Group",
  description: "Sistema completo de análise jurídica, fiscal, societária, trabalhista e de processos internos para sua empresa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

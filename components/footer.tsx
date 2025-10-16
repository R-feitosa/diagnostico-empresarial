
"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Instagram, Linkedin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0A1F44] text-white relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E1B547] via-[#E1B547]/50 to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20 opacity-5">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M 0 0 L 200 0 L 100 150 Z" fill="#E1B547" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="relative w-48 h-14">
              <Image
                src="/logo-connect.png"
                alt="Connect Academy"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-gray-400 leading-relaxed font-medium">
              Profissionais do mercado para o mercado. Transformando desafios em oportunidades através de diagnósticos precisos e estratégias comprovadas.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#E1B547]/20 border border-[#E1B547]/30 flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5 text-[#E1B547]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 hover:bg-[#E1B547]/20 border border-[#E1B547]/30 flex items-center justify-center transition-all hover:scale-110"
              >
                <Linkedin className="w-5 h-5 text-[#E1B547]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black text-[#E1B547] mb-6 flex items-center">
              <span className="mr-2">▶</span>
              Links Rápidos
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Sobre o Serviço", href: "#sobre" },
                { label: "Como Funciona", href: "#fases" },
                { label: "Diferenciais", href: "#diferenciais" },
                { label: "Iniciar Diagnóstico", href: "/chat" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#E1B547] transition-colors font-medium flex items-center group"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#E1B547]/50 mr-3 group-hover:bg-[#E1B547]" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-black text-[#E1B547] mb-6 flex items-center">
              <span className="mr-2">▶</span>
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#E1B547] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400 font-medium">Email</p>
                  <a href="mailto:contato@connectacademy.com" className="text-white hover:text-[#E1B547] transition-colors">
                    contato@connectacademy.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#E1B547] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-400 font-medium">Telefone</p>
                  <a href="tel:+5511999999999" className="text-white hover:text-[#E1B547] transition-colors">
                    +55 (11) 99999-9999
                  </a>
                </div>
              </li>
            </ul>

            <div className="mt-8 bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-[#E1B547]/20">
              <p className="text-sm text-gray-400 mb-2 font-medium">
                <span className="text-[#E1B547] font-bold">Gestão 360°</span>
              </p>
              <p className="text-xs text-gray-500">
                Menos teoria, mais resultado
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-medium">
              © 2024 Connect Academy. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-500 hover:text-[#E1B547] text-sm transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#E1B547] text-sm transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Dots Pattern */}
      <div className="absolute bottom-8 left-8 grid grid-cols-3 gap-2 opacity-10">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#E1B547]" />
        ))}
      </div>
    </footer>
  );
}


"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileSearch } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-gradient-to-r from-secondary via-secondary to-secondary/95 backdrop-blur-sm shadow-lg border-b-2 border-primary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-28">
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-96 h-24 drop-shadow-lg">
              <Image
                src="/logo-connect.png"
                alt="Connect Academy"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#sobre"
              className="text-white hover:text-primary transition-colors font-medium text-base"
            >
              Sobre o Serviço
            </Link>
            <Link
              href="#fases"
              className="text-white hover:text-primary transition-colors font-medium text-base"
            >
              Como Funciona
            </Link>
            <Link
              href="#diferenciais"
              className="text-white hover:text-primary transition-colors font-medium text-base"
            >
              Diferenciais
            </Link>
            <Link
              href="/chat"
              className="bg-primary hover:bg-primary/90 text-secondary px-7 py-3.5 rounded-md font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 border-2 border-primary hover:border-primary/80"
            >
              <FileSearch className="w-5 h-5" />
              Iniciar Diagnóstico
            </Link>
          </nav>

          <Link
            href="/chat"
            className="md:hidden bg-primary hover:bg-primary/90 text-secondary px-5 py-2.5 rounded-md font-semibold transition-all flex items-center gap-2 border-2 border-primary"
          >
            <FileSearch className="w-4 h-4" />
            Iniciar
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

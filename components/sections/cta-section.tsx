
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, MessageSquare, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="py-24 bg-gradient-to-br from-[#0A1F44] via-[#0d2a5c] to-[#0A1F44] relative overflow-hidden" ref={ref}>
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Diagonal Triangle */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] -ml-40 -mt-40 opacity-20">
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <path d="M 0 0 L 600 0 L 300 500 Z" fill="#E1B547" />
          </svg>
        </div>

        {/* Bottom Right Triangle */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] -mr-40 -mb-40 opacity-20">
          <svg viewBox="0 0 500 500" className="w-full h-full">
            <path d="M 500 500 L 0 500 L 250 100 Z" fill="#E1B547" />
          </svg>
        </div>

        {/* Decorative Dots */}
        <div className="absolute top-20 right-20 grid grid-cols-4 gap-3 opacity-30">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-3 h-3 rounded-full bg-[#E1B547]" />
          ))}
        </div>

        {/* Accent Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#E1B547" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center bg-[#E1B547]/20 px-6 py-3 rounded-full mb-8 border border-[#E1B547]/40">
            <MessageSquare className="w-5 h-5 text-[#E1B547] mr-2" />
            <span className="text-white text-sm font-bold">Comece Sua Transformação Agora</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Pronto para transformar <br />
            <span className="text-[#E1B547]">seu negócio?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Inicie agora seu diagnóstico empresarial completo. Processo rápido e resultados personalizados.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              href="/chat"
              className="group bg-[#E1B547] hover:bg-[#C9A236] text-[#0A1F44] px-10 py-5 rounded-xl font-black text-xl transition-all shadow-2xl hover:shadow-[#E1B547]/50 flex items-center gap-3"
            >
              <MessageSquare className="w-7 h-7" />
              Iniciar Diagnóstico
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: CheckCircle, text: "Sem compromisso" },
              { icon: CheckCircle, text: "100% Gratuito" },
              { icon: CheckCircle, text: "Resultados em minutos" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg border border-[#E1B547]/30"
              >
                <item.icon className="w-6 h-6 text-[#E1B547] flex-shrink-0" />
                <span className="text-white font-bold">{item.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-gray-400 text-sm font-medium"
          >
            <p>▶ Junte-se às <span className="text-[#E1B547] font-bold">26 empresas</span> que já transformaram sua gestão</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

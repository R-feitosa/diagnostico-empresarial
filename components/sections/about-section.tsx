
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle, Target, Zap, LineChart } from "lucide-react";

export default function AboutSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="sobre" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Diagonal Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 -mr-20 -mt-20">
        <svg viewBox="0 0 400 400" className="w-full h-full opacity-10">
          <path
            d="M 0 0 L 400 0 L 200 300 Z"
            fill="#0A1F44"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-[#E1B547]/10 px-5 py-2 rounded-full mb-6">
            <span className="text-[#E1B547] text-sm font-bold mr-2">▶</span>
            <span className="text-[#0A1F44] text-sm font-semibold">Transforme seu Negócio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0A1F44] mb-6">
            O que é o <span className="text-[#E1B547]">Diagnóstico Empresarial?</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Um sistema completo de análise que identifica oportunidades, riscos e cria planos de ação estratégicos para transformar sua empresa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Target,
              title: "Análise Profunda",
              description: "Avaliação detalhada de todas as áreas críticas: jurídica, fiscal, societária, trabalhista, RH e processos internos.",
            },
            {
              icon: LineChart,
              title: "Relatórios Exaustivos",
              description: "Documentação completa com diagnósticos precisos, identificação de riscos e oportunidades de melhoria.",
            },
            {
              icon: Zap,
              title: "Planos de Ação",
              description: "Estratégias práticas em 180 e 360 dias, personalizadas para o segmento e realidade do seu negócio.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all group border-2 border-transparent hover:border-[#E1B547]/30 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 opacity-5">
                <svg viewBox="0 0 100 100">
                  <path d="M 0 0 L 100 0 L 50 80 Z" fill="#E1B547" />
                </svg>
              </div>
              <div className="bg-[#E1B547]/15 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#E1B547]/25 transition-colors border-2 border-[#E1B547]/30">
                <item.icon className="w-8 h-8 text-[#E1B547]" />
              </div>
              <h3 className="text-2xl font-black text-[#0A1F44] mb-4">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed font-medium">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative bg-gradient-to-br from-[#0A1F44] to-[#0d2a5c] p-8 md:p-12 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M 0 0 L 200 0 L 100 150 Z" fill="#E1B547" />
            </svg>
          </div>
          <div className="absolute bottom-4 right-8 grid grid-cols-3 gap-2 opacity-30">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#E1B547]" />
            ))}
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-8 text-center">
              <span className="text-[#E1B547]">▶</span> Por que realizar o Diagnóstico?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Identificar riscos jurídicos antes que se tornem problemas",
                "Otimizar a carga tributária de forma legal e estratégica",
                "Garantir compliance trabalhista e evitar passivos",
                "Melhorar processos internos e aumentar eficiência",
                "Estruturar governança corporativa adequada",
                "Receber orientação especializada para crescimento sustentável",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3 bg-white/5 p-4 rounded-lg backdrop-blur-sm border border-[#E1B547]/20"
                >
                  <CheckCircle className="w-6 h-6 text-[#E1B547] flex-shrink-0 mt-1" />
                  <p className="text-white font-semibold">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 w-80 h-80 -ml-20 -mb-20 opacity-5">
        <svg viewBox="0 0 300 300" className="w-full h-full">
          <path d="M 0 300 L 300 300 L 150 100 Z" fill="#E1B547" />
        </svg>
      </div>
    </section>
  );
}

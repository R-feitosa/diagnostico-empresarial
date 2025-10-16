
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Users, TrendingUp, Target, Zap, Award } from "lucide-react";

export default function DifferentialsSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const differentials = [
    {
      icon: Shield,
      title: "Análise Jurídica Completa",
      description: "Identificação de riscos contratuais, societários e regulatórios com soluções preventivas.",
      highlight: "Proteção Legal",
    },
    {
      icon: TrendingUp,
      title: "Otimização Fiscal",
      description: "Revisão tributária completa com estratégias de economia legal e conformidade.",
      highlight: "Economia Tributária",
    },
    {
      icon: Users,
      title: "Gestão de Pessoas",
      description: "Análise de RH e compliance trabalhista para evitar passivos e melhorar clima organizacional.",
      highlight: "Capital Humano",
    },
    {
      icon: Target,
      title: "Processos Internos",
      description: "Mapeamento e otimização de processos para aumentar eficiência e reduzir custos.",
      highlight: "Eficiência Operacional",
    },
    {
      icon: Zap,
      title: "Planos Estratégicos",
      description: "Roadmap de implementação com metas claras em 180 e 360 dias.",
      highlight: "Ação Prática",
    },
    {
      icon: Award,
      title: "Especialistas do Mercado",
      description: "Profissionais com experiência em corporações multinacionais e estratégias comprovadas.",
      highlight: "Expertise Reconhecida",
    },
  ];

  return (
    <section id="diferenciais" className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 right-0 w-96 h-96">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M 400 0 L 0 0 L 200 300 Z" fill="#0A1F44" />
          </svg>
        </div>
        <div className="absolute bottom-20 left-0 w-80 h-80">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M 0 400 L 400 400 L 200 100 Z" fill="#E1B547" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-[#E1B547]/10 px-5 py-2 rounded-full mb-6">
            <span className="text-sm font-bold mr-2" style={{ color: '#E1B547' }}>▶</span>
            <span className="text-sm font-semibold" style={{ color: '#0A1F44' }}>Profissionais do Mercado para o Mercado</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ color: '#0A1F44' }}>
            Nossos <span style={{ color: '#E1B547' }}>Diferenciais</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed font-medium" style={{ color: '#374151' }}>
            Uma abordagem 360° que combina expertise técnica com visão estratégica de mercado
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all group border-2 border-transparent hover:border-[#E1B547]/30 relative overflow-hidden"
            >
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg viewBox="0 0 100 100">
                  <path d="M 0 0 L 100 0 L 50 80 Z" fill="#E1B547" />
                </svg>
              </div>

              {/* Highlight Tag */}
              <div className="absolute top-4 right-4 bg-[#E1B547]/20 px-3 py-1 rounded-full">
                <span className="text-[#E1B547] text-xs font-bold">{item.highlight}</span>
              </div>

              <div className="bg-[#E1B547]/15 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#E1B547]/25 transition-colors border-2 border-[#E1B547]/30 group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8 text-[#E1B547]" />
              </div>
              
              <h3 className="text-2xl font-black text-[#0A1F44] mb-4 group-hover:text-[#E1B547] transition-colors">
                {item.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed font-medium">
                {item.description}
              </p>

              {/* Decorative Dots */}
              <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-1 opacity-10">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#E1B547]" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-br from-[#0A1F44] to-[#0d2a5c] p-10 rounded-2xl shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20 opacity-10">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M 0 0 L 200 0 L 100 150 Z" fill="#E1B547" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-8 grid grid-cols-4 gap-2 opacity-20">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-[#E1B547]" />
            ))}
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
              <span className="text-[#E1B547]">▶</span> Mude a realidade do seu negócio!
            </h3>
            <p className="text-lg text-gray-300 mb-8 font-medium">
              Junte-se às <span className="text-[#E1B547] font-bold">26 empresas</span> que já passaram pelo Connect Academy e estão transformando seus resultados. 
              O caminho para o próximo nível começa com o primeiro passo: leve sua empresa do problema ao próximo nível.
            </p>
            <a
              href="/chat"
              className="inline-flex items-center gap-3 bg-[#E1B547] hover:bg-[#C9A236] text-[#0A1F44] px-10 py-5 rounded-lg font-black text-xl transition-all shadow-xl hover:shadow-2xl"
            >
              <Award className="w-7 h-7" />
              Iniciar Diagnóstico
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MessageSquare, FileText, CheckCircle2, Clock } from "lucide-react";

export default function PhasesSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const phases = [
    {
      number: "01",
      title: "Questionário Inteligente",
      description: "Nosso assistente virtual realiza uma conversa estruturada, coletando informações essenciais sobre seu negócio em cada área crítica.",
      icon: MessageSquare,
      color: "#E1B547",
    },
    {
      number: "02",
      title: "Análise Detalhada",
      description: "Processamento das informações coletadas, identificando pontos de atenção, riscos potenciais e oportunidades de melhoria.",
      icon: FileText,
      color: "#E1B547",
    },
    {
      number: "03",
      title: "Relatório Completo",
      description: "Documento abrangente com diagnósticos precisos de todas as áreas, incluindo análise jurídica, fiscal, societária, trabalhista, RH e processos.",
      icon: CheckCircle2,
      color: "#E1B547",
    },
    {
      number: "04",
      title: "Planos de Ação",
      description: "Estratégias práticas e personalizadas com prazos de 180 e 360 dias, adaptadas ao seu segmento e realidade empresarial.",
      icon: Clock,
      color: "#E1B547",
    },
  ];

  return (
    <section id="fases" className="py-24 bg-gradient-to-br from-[#0A1F44] to-[#0d2a5c] relative overflow-hidden" ref={ref}>
      {/* Geometric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-20 left-0 w-96 h-96 -ml-20">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M 0 200 L 300 0 L 300 400 Z" fill="#E1B547" opacity="0.1" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-0 w-96 h-96 -mr-20">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path d="M 400 200 L 100 0 L 100 400 Z" fill="#E1B547" opacity="0.1" />
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
          <div className="inline-flex items-center bg-[#E1B547]/20 px-5 py-2 rounded-full mb-6 border border-[#E1B547]/40">
            <span className="text-[#E1B547] text-sm font-bold mr-2">▶</span>
            <span className="text-white text-sm font-semibold">A Evolução do Movimento Connect</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Como Funciona o <span className="text-[#E1B547]">Diagnóstico</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Um processo estruturado em 4 etapas para transformar a gestão do seu negócio
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#E1B547]/30 transform -translate-x-1/2" />

          <div className="space-y-16">
            {phases.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="flex-1 lg:text-right lg:pr-12">
                  <div className={`${index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'} max-w-xl`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl border-2 border-[#E1B547]/30 relative overflow-hidden group"
                    >
                      {/* Decorative Corner */}
                      <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 opacity-20">
                        <svg viewBox="0 0 100 100">
                          <path d="M 0 0 L 100 0 L 50 80 Z" fill="#E1B547" />
                        </svg>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-[#E1B547]/20 w-16 h-16 rounded-xl flex items-center justify-center border-2 border-[#E1B547]/40">
                          <phase.icon className="w-8 h-8 text-[#E1B547]" />
                        </div>
                        <div>
                          <div className="text-[#E1B547] text-sm font-bold mb-1">ETAPA {phase.number}</div>
                          <h3 className="text-2xl font-black text-white">{phase.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed font-medium">{phase.description}</p>

                      {/* Dots Pattern */}
                      <div className="absolute bottom-4 right-4 grid grid-cols-3 gap-1 opacity-20">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#E1B547]" />
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Timeline Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-20 h-20 rounded-full bg-[#E1B547] border-4 border-[#0A1F44] flex items-center justify-center shadow-2xl">
                    <span className="text-[#0A1F44] text-2xl font-black">{phase.number}</span>
                  </div>
                </div>

                <div className="flex-1 lg:pl-12">
                  {/* Empty space for alignment */}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-16 text-center"
        >
          <a
            href="/chat"
            className="inline-flex items-center gap-3 bg-[#E1B547] hover:bg-[#C9A236] text-[#0A1F44] px-8 py-4 rounded-lg font-black text-lg transition-all shadow-xl hover:shadow-2xl"
          >
            <MessageSquare className="w-6 h-6" />
            Iniciar Meu Diagnóstico Agora
          </a>
        </motion.div>
      </div>
    </section>
  );
}


"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileSearch, Shield, TrendingUp, Target, Users } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-[#0A1F44] via-[#0d2a5c] to-[#0A1F44] min-h-[90vh] flex items-center overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Diagonal Triangle - Golden */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] -mr-40 -mt-40">
          <svg viewBox="0 0 800 800" className="w-full h-full">
            <defs>
              <linearGradient id="heroGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#E1B547", stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: "#C9A236", stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>
            <path
              d="M 0 0 L 800 0 L 400 600 Z"
              fill="url(#heroGold)"
              stroke="#E1B547"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Bottom Left Diagonal Triangle */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] -ml-40 -mb-40">
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <path
              d="M 0 600 L 600 600 L 200 200 Z"
              fill="url(#heroGold)"
              stroke="#E1B547"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Decorative Dots Pattern - Bottom Right */}
        <div className="absolute bottom-32 right-32 grid grid-cols-4 gap-4 opacity-60">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
              className="w-3 h-3 rounded-full bg-[#E1B547]"
            />
          ))}
        </div>

        {/* Accent Lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <motion.line
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.5 }}
            x1="20%"
            y1="0"
            x2="80%"
            y2="100%"
            stroke="#E1B547"
            strokeWidth="2"
          />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center bg-[#E1B547]/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-[#E1B547]/40"
            >
              <span className="text-[#E1B547] text-sm font-bold mr-2">▶</span>
              <span className="text-white text-sm font-semibold">Diagnóstico Empresarial Completo</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Gestão <span className="text-[#E1B547]">360°</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl">Menos teoria,</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-[#E1B547]">Mais resultado</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
              Duas instituições que caminharam juntas: profissionais de alto nível de corporações multinacionais compartilham experiências reais e estratégias comprovadas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/chat"
                className="bg-[#E1B547] hover:bg-[#C9A236] text-[#0A1F44] px-8 py-4 rounded-lg font-black text-lg transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group"
              >
                <FileSearch className="w-6 h-6" />
                Começar Diagnóstico
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="#sobre"
                className="bg-transparent border-2 border-[#E1B547] text-[#E1B547] hover:bg-[#E1B547]/10 px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                Saiba Mais
              </a>
            </div>
            
            {/* Stats with Golden Accent */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: "6+", label: "Áreas de Análise" },
                { value: "100%", label: "Personalizado" },
                { value: "360°", label: "Visão Completa" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-center border-l-2 border-[#E1B547] pl-4"
                >
                  <div className="text-3xl font-black text-[#E1B547] mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Shield, title: "Análise Jurídica", desc: "Proteção completa legal" },
                  { icon: TrendingUp, title: "Análise Fiscal", desc: "Otimização tributária" },
                  { icon: Target, title: "Análise Societária", desc: "Governança corporativa" },
                  { icon: Users, title: "Análise RH", desc: "Gestão de pessoas" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-2xl border-2 border-[#E1B547]/30 ${
                      index % 2 === 1 ? 'mt-8' : ''
                    }`}
                  >
                    <div className="bg-[#E1B547]/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="w-7 h-7 text-[#E1B547]" />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

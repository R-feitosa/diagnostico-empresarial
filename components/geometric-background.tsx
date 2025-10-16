
"use client";

import { motion } from "framer-motion";

export default function GeometricBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Diagonal Triangle - Top Right */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="absolute -top-20 -right-20 w-96 h-96"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#E1B547", stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: "#D4A531", stopOpacity: 0.5 }} />
            </linearGradient>
          </defs>
          <path
            d="M 0 0 L 400 0 L 200 300 Z"
            fill="url(#goldGradient)"
            stroke="#E1B547"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Diagonal Triangle - Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute -bottom-20 -left-20 w-80 h-80"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <path
            d="M 0 400 L 400 400 L 150 100 Z"
            fill="url(#goldGradient)"
            stroke="#E1B547"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Decorative Dots Pattern */}
      <div className="absolute bottom-20 right-20 grid grid-cols-3 gap-3">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="w-3 h-3 rounded-full bg-primary/30"
          />
        ))}
      </div>

      {/* Diagonal Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#E1B547", stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: "#0A1F44", stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
          x1="0"
          y1="100"
          x2="100%"
          y2="0"
          stroke="url(#lineGradient)"
          strokeWidth="2"
        />
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          x1="100%"
          y1="100%"
          x2="0"
          y2="80%"
          stroke="url(#lineGradient)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

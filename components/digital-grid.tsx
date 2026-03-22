"use client"

import { motion } from "framer-motion"

export function DigitalGrid() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000510] via-[#001020] to-[#000815]" />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.05)_0%,transparent_70%)]" />
      
      {/* 3D Perspective Grid */}
      <div className="absolute inset-0" style={{ perspective: "1000px" }}>
        <motion.div
          className="absolute w-[200%] h-[200%] left-[-50%] top-[20%]"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(75deg)",
          }}
          animate={{
            y: [0, 100],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Grid lines - horizontal */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0,255,255,0)" />
                <stop offset="50%" stopColor="rgba(0,255,255,0.3)" />
                <stop offset="100%" stopColor="rgba(0,255,255,0)" />
              </linearGradient>
              <linearGradient id="gridGradientV" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,255,255,0.1)" />
                <stop offset="50%" stopColor="rgba(0,255,255,0.4)" />
                <stop offset="100%" stopColor="rgba(0,255,255,0)" />
              </linearGradient>
            </defs>
            
            {/* Horizontal lines */}
            {Array.from({ length: 40 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={`${i * 5}%`}
                x2="100%"
                y2={`${i * 5}%`}
                stroke="url(#gridGradient)"
                strokeWidth="1"
                opacity={0.5 - i * 0.01}
              />
            ))}
            
            {/* Vertical lines */}
            {Array.from({ length: 30 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={`${(i + 1) * 3.33}%`}
                y1="0"
                x2={`${(i + 1) * 3.33}%`}
                y2="100%"
                stroke="url(#gridGradientV)"
                strokeWidth="1"
                opacity={0.3}
              />
            ))}
          </svg>
        </motion.div>
      </div>
      
      {/* Horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-cyan-500/10 via-cyan-500/5 to-transparent" />
      
      {/* City silhouette hint for Washington IAD1 */}
      <div className="absolute bottom-[15%] left-0 right-0 h-32 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path
            d="M0,100 L0,80 L50,80 L50,60 L80,60 L80,70 L120,70 L120,40 L140,40 L140,50 L180,50 L180,30 L200,30 L200,50 L220,50 L220,60 L280,60 L280,45 L300,20 L320,45 L320,60 L400,60 L400,40 L420,40 L420,55 L480,55 L480,35 L500,35 L500,55 L520,55 L520,50 L580,50 L580,30 L600,10 L620,30 L620,50 L680,50 L680,40 L720,40 L720,55 L780,55 L780,45 L820,45 L820,60 L880,60 L880,50 L920,50 L920,35 L960,35 L960,55 L1000,55 L1000,40 L1040,40 L1040,60 L1100,60 L1100,50 L1150,50 L1150,70 L1200,70 L1200,100 Z"
            fill="url(#cityGradient)"
          />
          <defs>
            <linearGradient id="cityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(0,255,255,0.4)" />
              <stop offset="100%" stopColor="rgba(0,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan-500/30" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-cyan-500/30" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-cyan-500/30" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-500/30" />
    </div>
  )
}

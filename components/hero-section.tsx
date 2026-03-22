"use client"

import { motion } from "framer-motion"
import { HUDQRCode } from "./hud-qr-code"
import { StatusPanel } from "./status-panel"

interface HeroSectionProps {
  language: string
}

export function HeroSection({ language }: HeroSectionProps) {
  const texts = {
    fr: {
      title: "Confiance",
      titleAccent: "Méritocratique",
      subtitle: "L'OMNIUTIL est l'infrastructure de confiance n°1 mondiale de récompense sur consommation réelle. Basée sur la méritocratie, cette valeur s'applique via Code QR et IA Coordinatrice.",
      scanLabel: "SCANNER POUR GREFFE",
      scanSub: "DATABASE SYNC",
    },
    en: {
      title: "Meritocratic",
      titleAccent: "Trust",
      subtitle: "OMNIUTIL is the world's #1 trust infrastructure for real consumption rewards. Based on meritocracy, this value is applied via QR Code and Coordinator AI.",
      scanLabel: "SCAN TO GRAFT",
      scanSub: "DATABASE SYNC",
    },
    zh: {
      title: "精英",
      titleAccent: "信任",
      subtitle: "OMNIUTIL是全球第一的真实消费奖励信任基础设施。基于精英制度，通过二维码和协调AI应用此价值。",
      scanLabel: "扫描以嫁接",
      scanSub: "数据库同步",
    },
    ar: {
      title: "الجدارة",
      titleAccent: "الثقة",
      subtitle: "OMNIUTIL هي البنية التحتية للثقة رقم 1 في العالم لمكافآت الاستهلاك الحقيقي. بناءً على الجدارة، يتم تطبيق هذه القيمة عبر رمز QR والذكاء الاصطناعي المنسق.",
      scanLabel: "مسح للتطعيم",
      scanSub: "مزامنة قاعدة البيانات",
    },
  }

  const t = texts[language as keyof typeof texts] || texts.fr

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass text-xs font-mono text-cyan-300"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-cyan-400"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              INFRASTRUCTURE DE CONFIANCE N°1
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black italic leading-[0.9] tracking-tight">
                <span className="text-foreground">{t.title}</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-500 bg-clip-text text-transparent cyber-glow">
                  {t.titleAccent}
                </span>
                <span className="text-cyan-400">.</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-foreground/60 max-w-xl leading-relaxed font-light"
            >
              {t.subtitle}
            </motion.p>

            {/* Status Panel */}
            <StatusPanel language={language} />
          </div>

          {/* Right Content - QR Code HUD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center justify-center"
          >
            {/* HUD Frame */}
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute inset-[-50px] bg-cyan-500/10 rounded-full blur-3xl" />
              
              {/* Label */}
              <motion.div
                className="absolute -top-16 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="text-2xl font-black italic text-foreground cyber-glow-subtle tracking-wider">
                  {t.scanLabel}
                </div>
                <div className="text-xs font-mono text-cyan-400/60 tracking-[0.3em] mt-1">
                  {t.scanSub}
                </div>
              </motion.div>

              {/* QR Code with HUD */}
              <HUDQRCode 
                value="https://omniutil-web.vercel.app/greffe" 
                size={220} 
              />

              {/* Bottom info */}
              <motion.div
                className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="flex items-center gap-4 text-[10px] font-mono text-cyan-400/50">
                  <span>PROTOCOL: OMNI-V9</span>
                  <span className="w-1 h-1 rounded-full bg-cyan-400/50" />
                  <span>ENCRYPTION: AES-256</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating data indicators */}
      <div className="absolute bottom-8 left-8 hidden lg:block">
        <motion.div
          className="liquid-glass rounded-lg p-4 text-xs font-mono space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-cyan-400/60">LAT:</span>
            <span className="text-foreground/80">38.9072° N</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-cyan-400/60">LON:</span>
            <span className="text-foreground/80">77.0369° W</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-cyan-400/60">DC:</span>
            <span className="text-foreground/80">Washington IAD1</span>
          </div>
        </motion.div>
      </div>

      {/* Version indicator */}
      <motion.div
        className="absolute bottom-8 right-8 text-right hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="text-xs font-mono text-cyan-400/40 tracking-wider">
          <div>SYSTEM: v9.0-SOUVERAIN</div>
          <div>NODE: iad1</div>
          <div>STATUS: OPERATIONAL</div>
        </div>
      </motion.div>
    </section>
  )
}

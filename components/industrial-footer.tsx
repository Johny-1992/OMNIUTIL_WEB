"use client"

import { motion } from "framer-motion"

interface IndustrialFooterProps {
  language: string
}

export function IndustrialFooter({ language }: IndustrialFooterProps) {
  const texts = {
    fr: {
      rights: "Tous droits réservés",
      infrastructure: "Infrastructure de Confiance Souveraine",
    },
    en: {
      rights: "All rights reserved",
      infrastructure: "Sovereign Trust Infrastructure",
    },
    zh: {
      rights: "保留所有权利",
      infrastructure: "主权信任基础设施",
    },
    ar: {
      rights: "جميع الحقوق محفوظة",
      infrastructure: "البنية التحتية للثقة السيادية",
    },
  }

  const t = texts[language as keyof typeof texts] || texts.fr

  return (
    <footer className="relative py-12 px-4 border-t border-cyan-500/10">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <span className="text-xl font-black text-black italic">Ω</span>
              </div>
              <div>
                <div className="text-lg font-black italic tracking-tight text-foreground">
                  OMNIUTIL
                </div>
                <div className="text-[10px] font-mono text-cyan-400/70 tracking-widest">
                  v9.0-SOUVERAIN
                </div>
              </div>
            </div>
            <p className="text-xs font-mono text-foreground/40 leading-relaxed">
              {t.infrastructure}
            </p>
          </div>

          {/* System Status */}
          <div className="text-center">
            <div className="text-xs font-mono text-cyan-400/50 tracking-widest mb-3">
              SYSTEM STATUS
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-xs font-mono text-emerald-400">OPERATIONAL</span>
            </div>
            <div className="mt-3 text-xs font-mono text-foreground/30">
              Node iad1 • Washington DC
            </div>
          </div>

          {/* Network Info */}
          <div className="text-right">
            <div className="text-xs font-mono text-cyan-400/50 tracking-widest mb-3">
              NETWORK
            </div>
            <div className="space-y-1 text-xs font-mono text-foreground/40">
              <div>Protocol: OMNI-V9</div>
              <div>Encryption: AES-256-GCM</div>
              <div>Consensus: MERIDIAN</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cyan-500/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-foreground/30">
              © {new Date().getFullYear()} OMNIUTIL • {t.rights}
            </div>
            
            {/* Terminal-style info */}
            <div className="flex items-center gap-6 text-[10px] font-mono text-cyan-400/40">
              <motion.span
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                SYS:OK
              </motion.span>
              <span>NET:STABLE</span>
              <span>SEC:MAX</span>
              <span>LAT:12ms</span>
            </div>
          </div>
        </div>

        {/* Decorative corners */}
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l border-b border-cyan-500/20 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-cyan-500/20 pointer-events-none" />
      </div>
    </footer>
  )
}

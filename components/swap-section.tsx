"use client"

import { motion } from "framer-motion"
import { ArrowDown, Zap, Shield, TrendingUp } from "lucide-react"
import { useState } from "react"

interface SwapSectionProps {
  language: string
  walletAddress: string | null
  onConnectWallet: () => void
}

export function SwapSection({ language, walletAddress, onConnectWallet }: SwapSectionProps) {
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")

  const texts = {
    fr: {
      title: "ÉCHANGE",
      subtitle: "SOUVERAIN",
      desc: "Protocole d'échange décentralisé avec garantie de valeur méritocratique.",
      from: "DE",
      to: "VERS",
      connect: "CONNECTER WALLET",
      swap: "EXÉCUTER L'ÉCHANGE",
      rate: "TAUX",
      fee: "FRAIS",
      slippage: "GLISSEMENT",
    },
    en: {
      title: "SWAP",
      subtitle: "SOVEREIGN",
      desc: "Decentralized exchange protocol with meritocratic value guarantee.",
      from: "FROM",
      to: "TO",
      connect: "CONNECT WALLET",
      swap: "EXECUTE SWAP",
      rate: "RATE",
      fee: "FEE",
      slippage: "SLIPPAGE",
    },
    zh: {
      title: "交换",
      subtitle: "主权",
      desc: "去中心化交换协议，具有精英价值保证。",
      from: "从",
      to: "到",
      connect: "连接钱包",
      swap: "执行交换",
      rate: "汇率",
      fee: "费用",
      slippage: "滑点",
    },
    ar: {
      title: "تبادل",
      subtitle: "سيادي",
      desc: "بروتوكول تبادل لامركزي مع ضمان قيمة الجدارة.",
      from: "من",
      to: "إلى",
      connect: "توصيل المحفظة",
      swap: "تنفيذ التبادل",
      rate: "السعر",
      fee: "الرسوم",
      slippage: "الانزلاق",
    },
  }

  const t = texts[language as keyof typeof texts] || texts.fr

  const handleFromChange = (value: string) => {
    setFromAmount(value)
    const num = parseFloat(value) || 0
    setToAmount((num * 0.000274).toFixed(6))
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-6xl font-black italic tracking-tight">
            <span className="text-foreground">{t.title}</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              {t.subtitle}
            </span>
          </h2>
          <p className="text-foreground/50 mt-4 font-mono text-sm">{t.desc}</p>
        </motion.div>

        {/* Swap Card */}
        <motion.div
          className="liquid-glass-intense rounded-3xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-cyan-500/30" />
          <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-cyan-500/30" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-cyan-500/30" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-cyan-500/30" />

          {/* From Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-cyan-400/70 tracking-widest">{t.from}</span>
              <span className="text-xs font-mono text-foreground/40">Balance: 0.00</span>
            </div>
            <div className="relative">
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => handleFromChange(e.target.value)}
                placeholder="0.00"
                className="w-full bg-black/40 border border-cyan-500/20 rounded-xl px-5 py-4 text-2xl font-mono text-foreground placeholder-foreground/30 focus:outline-none focus:border-cyan-400/50 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-cyan-500/20 px-3 py-1.5 rounded-lg">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
                <span className="font-mono text-sm font-bold text-foreground">ETH</span>
              </div>
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="flex justify-center my-4">
            <motion.button
              className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 transition-all"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </div>

          {/* To Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-cyan-400/70 tracking-widest">{t.to}</span>
              <span className="text-xs font-mono text-foreground/40">Balance: 0.00</span>
            </div>
            <div className="relative">
              <input
                type="number"
                value={toAmount}
                readOnly
                placeholder="0.00"
                className="w-full bg-black/40 border border-cyan-500/20 rounded-xl px-5 py-4 text-2xl font-mono text-foreground placeholder-foreground/30 focus:outline-none"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-amber-500/20 px-3 py-1.5 rounded-lg">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
                  <span className="text-[10px] font-black text-black">Ω</span>
                </div>
                <span className="font-mono text-sm font-bold text-foreground">UTIL</span>
              </div>
            </div>
          </div>

          {/* Swap Info */}
          <div className="mt-6 p-4 rounded-xl bg-black/30 border border-cyan-500/10 space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-foreground/50">{t.rate}</span>
              <span className="text-foreground/80">1 ETH = 3,650 UTIL</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-foreground/50">{t.fee}</span>
              <span className="text-foreground/80">0.3%</span>
            </div>
            <div className="flex justify-between text-xs font-mono">
              <span className="text-foreground/50">{t.slippage}</span>
              <span className="text-cyan-400">0.5%</span>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            onClick={walletAddress ? undefined : onConnectWallet}
            className="w-full mt-6 py-4 rounded-xl font-mono text-sm tracking-wider font-bold transition-all bg-gradient-to-r from-cyan-500 to-cyan-600 text-black hover:from-cyan-400 hover:to-cyan-500"
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(0,255,255,0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              {walletAddress ? t.swap : t.connect}
            </span>
          </motion.button>

          {/* Security badges */}
          <div className="flex justify-center gap-6 mt-6">
            {[
              { icon: Shield, label: "SECURE" },
              { icon: Zap, label: "INSTANT" },
              { icon: TrendingUp, label: "OPTIMAL" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs font-mono text-foreground/40">
                <Icon className="w-3 h-3" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

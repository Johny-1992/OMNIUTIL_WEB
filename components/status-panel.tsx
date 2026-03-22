"use client"

import { motion } from "framer-motion"
import { Activity, Shield, Database, Cpu } from "lucide-react"

interface StatusPanelProps {
  language: string
}

export function StatusPanel({ language }: StatusPanelProps) {
  const texts = {
    fr: {
      status: "STATUT",
      node: "Node",
      rarity: "Rareté Scellée",
      active: "ACTIF",
      integrity: "INTÉGRITÉ",
      latency: "LATENCE",
      uptime: "DISPONIBILITÉ",
    },
    en: {
      status: "STATUS",
      node: "Node",
      rarity: "Sealed Rarity",
      active: "ACTIVE",
      integrity: "INTEGRITY",
      latency: "LATENCY",
      uptime: "UPTIME",
    },
    zh: {
      status: "状态",
      node: "节点",
      rarity: "封印稀有度",
      active: "活跃",
      integrity: "完整性",
      latency: "延迟",
      uptime: "运行时间",
    },
    ar: {
      status: "الحالة",
      node: "عقدة",
      rarity: "الندرة المختومة",
      active: "نشط",
      integrity: "التكامل",
      latency: "زمن الاستجابة",
      uptime: "وقت التشغيل",
    },
  }

  const t = texts[language as keyof typeof texts] || texts.fr

  return (
    <motion.div
      className="liquid-glass-intense rounded-2xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-cyan-400/10 via-transparent to-transparent pointer-events-none"
        style={{ height: "10%" }}
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
            <Activity className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="text-xs font-mono text-cyan-400/70 tracking-widest">{t.status}</div>
            <div className="text-lg font-black italic text-foreground">IAD1_GALAXY_PRO</div>
          </div>
        </div>
        <motion.div
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-mono text-emerald-400">{t.active}</span>
        </motion.div>
      </div>

      {/* Node Info */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-cyan-500/10">
          <div className="flex items-center gap-3">
            <Database className="w-4 h-4 text-cyan-400/70" />
            <span className="text-sm font-mono text-foreground/70">{t.node}</span>
          </div>
          <span className="text-sm font-mono font-bold text-cyan-300">iad1</span>
        </div>

        <div className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-cyan-500/10">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-cyan-400/70" />
            <span className="text-sm font-mono text-foreground/70">{t.rarity}</span>
          </div>
          <span className="text-sm font-mono font-bold text-amber-400">3 650 $ / UTIL</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <MetricBox
          icon={<Shield className="w-4 h-4" />}
          label={t.integrity}
          value="100%"
          color="emerald"
        />
        <MetricBox
          icon={<Cpu className="w-4 h-4" />}
          label={t.latency}
          value="12ms"
          color="cyan"
        />
        <MetricBox
          icon={<Activity className="w-4 h-4" />}
          label={t.uptime}
          value="99.9%"
          color="amber"
        />
      </div>

      {/* Data stream decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent">
        <motion.div
          className="h-full w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{ x: ["-100%", "500%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  )
}

interface MetricBoxProps {
  icon: React.ReactNode
  label: string
  value: string
  color: "emerald" | "cyan" | "amber"
}

function MetricBox({ icon, label, value, color }: MetricBoxProps) {
  const colorClasses = {
    emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    cyan: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  }

  return (
    <motion.div
      className={`p-3 rounded-lg border ${colorClasses[color]} text-center`}
      whileHover={{ scale: 1.05, borderColor: "rgba(0,255,255,0.5)" }}
    >
      <div className="flex justify-center mb-1 opacity-70">{icon}</div>
      <div className="text-[10px] font-mono opacity-60 tracking-wider mb-1">{label}</div>
      <div className="text-lg font-black italic">{value}</div>
    </motion.div>
  )
}

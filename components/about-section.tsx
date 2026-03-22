"use client"

import { motion } from "framer-motion"
import { Globe, Shield, Cpu, Users, Zap, Lock } from "lucide-react"

interface AboutSectionProps {
  language: string
}

export function AboutSection({ language }: AboutSectionProps) {
  const texts = {
    fr: {
      title: "À PROPOS",
      subtitle: "OMNIUTIL",
      mission: "MISSION",
      missionText: "Créer une infrastructure de confiance mondiale basée sur la méritocratie et la consommation réelle.",
      features: [
        { icon: Globe, title: "GLOBAL", desc: "Réseau distribué sur 4 continents" },
        { icon: Shield, title: "SOUVERAIN", desc: "Indépendance totale des données" },
        { icon: Cpu, title: "IA COORDINATRICE", desc: "Algorithmes de récompense avancés" },
        { icon: Users, title: "MÉRITOCRATIQUE", desc: "Valeur basée sur la contribution" },
        { icon: Zap, title: "INSTANTANÉ", desc: "Transactions en temps réel" },
        { icon: Lock, title: "CRYPTÉ", desc: "Sécurité de grade militaire" },
      ],
      stats: [
        { value: "99.9%", label: "DISPONIBILITÉ" },
        { value: "12ms", label: "LATENCE" },
        { value: "4", label: "CONTINENTS" },
        { value: "∞", label: "ÉVOLUTIVITÉ" },
      ],
    },
    en: {
      title: "ABOUT",
      subtitle: "OMNIUTIL",
      mission: "MISSION",
      missionText: "Create a global trust infrastructure based on meritocracy and real consumption.",
      features: [
        { icon: Globe, title: "GLOBAL", desc: "Network distributed across 4 continents" },
        { icon: Shield, title: "SOVEREIGN", desc: "Total data independence" },
        { icon: Cpu, title: "COORDINATOR AI", desc: "Advanced reward algorithms" },
        { icon: Users, title: "MERITOCRATIC", desc: "Value based on contribution" },
        { icon: Zap, title: "INSTANT", desc: "Real-time transactions" },
        { icon: Lock, title: "ENCRYPTED", desc: "Military-grade security" },
      ],
      stats: [
        { value: "99.9%", label: "UPTIME" },
        { value: "12ms", label: "LATENCY" },
        { value: "4", label: "CONTINENTS" },
        { value: "∞", label: "SCALABILITY" },
      ],
    },
    zh: {
      title: "关于",
      subtitle: "OMNIUTIL",
      mission: "使命",
      missionText: "创建基于精英制度和真实消费的全球信任基础设施。",
      features: [
        { icon: Globe, title: "全球", desc: "分布于4大洲的网络" },
        { icon: Shield, title: "主权", desc: "完全数据独立" },
        { icon: Cpu, title: "协调AI", desc: "先进的奖励算法" },
        { icon: Users, title: "精英制", desc: "基于贡献的价值" },
        { icon: Zap, title: "即时", desc: "实时交易" },
        { icon: Lock, title: "加密", desc: "军事级安全" },
      ],
      stats: [
        { value: "99.9%", label: "运行时间" },
        { value: "12ms", label: "延迟" },
        { value: "4", label: "大洲" },
        { value: "∞", label: "可扩展性" },
      ],
    },
    ar: {
      title: "حول",
      subtitle: "OMNIUTIL",
      mission: "المهمة",
      missionText: "إنشاء بنية تحتية للثقة العالمية قائمة على الجدارة والاستهلاك الحقيقي.",
      features: [
        { icon: Globe, title: "عالمي", desc: "شبكة موزعة على 4 قارات" },
        { icon: Shield, title: "سيادي", desc: "استقلالية كاملة للبيانات" },
        { icon: Cpu, title: "ذكاء اصطناعي منسق", desc: "خوارزميات مكافآت متقدمة" },
        { icon: Users, title: "جدارة", desc: "القيمة على أساس المساهمة" },
        { icon: Zap, title: "فوري", desc: "معاملات في الوقت الحقيقي" },
        { icon: Lock, title: "مشفر", desc: "أمان عسكري" },
      ],
      stats: [
        { value: "99.9%", label: "وقت التشغيل" },
        { value: "12ms", label: "الكمون" },
        { value: "4", label: "قارات" },
        { value: "∞", label: "قابلية التوسع" },
      ],
    },
  }

  const t = texts[language as keyof typeof texts] || texts.fr

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black italic tracking-tight">
            <span className="text-foreground">{t.title}</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">
              {t.subtitle}
            </span>
          </h2>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          className="liquid-glass-intense rounded-3xl p-8 mb-12 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400/50 tracking-widest">
            {t.mission}
          </div>
          <p className="text-xl sm:text-2xl font-light text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {t.missionText}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {t.features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="liquid-glass rounded-2xl p-6 group hover:border-cyan-400/40 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-black italic text-lg text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-foreground/50 font-mono">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="liquid-glass rounded-2xl p-6 text-center relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="text-4xl sm:text-5xl font-black italic text-cyan-400 cyber-glow-subtle mb-2">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-foreground/50 tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

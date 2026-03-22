"use client"

import { motion } from "framer-motion"
import { Heart, Wallet, Copy, Check, ExternalLink } from "lucide-react"
import { useState } from "react"

interface DonateSectionProps {
  language: string
  walletAddress: string | null
  onConnectWallet: () => void
}

export function DonateSection({ language, walletAddress, onConnectWallet }: DonateSectionProps) {
  const [copied, setCopied] = useState(false)
  const donationAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"

  const texts = {
    fr: {
      title: "SOUTENIR",
      subtitle: "LA MISSION",
      desc: "Contribuez au développement de l'infrastructure de confiance souveraine. Chaque contribution renforce le réseau méritocratique mondial.",
      address: "ADRESSE DE DON",
      connect: "CONNECTER POUR DONNER",
      donate: "FAIRE UN DON",
      copied: "COPIÉ",
      copy: "COPIER",
      tiers: [
        { amount: "0.01 ETH", label: "SUPPORTER", desc: "Accès au réseau de base" },
        { amount: "0.1 ETH", label: "CONTRIBUTEUR", desc: "Badge de contributeur vérifié" },
        { amount: "1 ETH", label: "MÉCÈNE", desc: "Statut de mécène souverain" },
      ],
    },
    en: {
      title: "SUPPORT",
      subtitle: "THE MISSION",
      desc: "Contribute to the development of the sovereign trust infrastructure. Each contribution strengthens the global meritocratic network.",
      address: "DONATION ADDRESS",
      connect: "CONNECT TO DONATE",
      donate: "DONATE",
      copied: "COPIED",
      copy: "COPY",
      tiers: [
        { amount: "0.01 ETH", label: "SUPPORTER", desc: "Basic network access" },
        { amount: "0.1 ETH", label: "CONTRIBUTOR", desc: "Verified contributor badge" },
        { amount: "1 ETH", label: "PATRON", desc: "Sovereign patron status" },
      ],
    },
    zh: {
      title: "支持",
      subtitle: "使命",
      desc: "为主权信任基础设施的发展做出贡献。每一份贡献都加强了全球精英网络。",
      address: "捐赠地址",
      connect: "连接钱包捐赠",
      donate: "捐赠",
      copied: "已复制",
      copy: "复制",
      tiers: [
        { amount: "0.01 ETH", label: "支持者", desc: "基本网络访问" },
        { amount: "0.1 ETH", label: "贡献者", desc: "验证贡献者徽章" },
        { amount: "1 ETH", label: "赞助人", desc: "主权赞助人身份" },
      ],
    },
    ar: {
      title: "دعم",
      subtitle: "المهمة",
      desc: "ساهم في تطوير البنية التحتية للثقة السيادية. كل مساهمة تعزز الشبكة العالمية للجدارة.",
      address: "عنوان التبرع",
      connect: "اتصل للتبرع",
      donate: "تبرع",
      copied: "تم النسخ",
      copy: "نسخ",
      tiers: [
        { amount: "0.01 ETH", label: "داعم", desc: "وصول أساسي للشبكة" },
        { amount: "0.1 ETH", label: "مساهم", desc: "شارة مساهم موثق" },
        { amount: "1 ETH", label: "راعي", desc: "حالة الراعي السيادي" },
      ],
    },
  }

  const t = texts[language as keyof typeof texts] || texts.fr

  const copyAddress = async () => {
    await navigator.clipboard.writeText(donationAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Heart className="w-10 h-10 text-pink-400" />
          </motion.div>
          <h2 className="text-5xl sm:text-6xl font-black italic tracking-tight">
            <span className="text-foreground">{t.title}</span>
            <br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              {t.subtitle}
            </span>
          </h2>
          <p className="text-foreground/50 mt-4 font-mono text-sm max-w-2xl mx-auto">
            {t.desc}
          </p>
        </motion.div>

        {/* Donation Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {t.tiers.map((tier, index) => (
            <motion.div
              key={tier.label}
              className="liquid-glass rounded-2xl p-6 text-center relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="text-3xl font-black italic text-cyan-400 cyber-glow-subtle mb-2">
                {tier.amount}
              </div>
              <div className="text-sm font-black italic text-foreground mb-2">
                {tier.label}
              </div>
              <div className="text-xs font-mono text-foreground/50">
                {tier.desc}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Address Card */}
        <motion.div
          className="liquid-glass-intense rounded-3xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-4 left-4 text-xs font-mono text-cyan-400/50 tracking-widest">
            {t.address}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full p-4 rounded-xl bg-black/40 border border-cyan-500/20 font-mono text-sm text-foreground/80 break-all">
              {donationAddress}
            </div>
            <motion.button
              onClick={copyAddress}
              className="flex items-center gap-2 px-6 py-4 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-sm hover:bg-cyan-500/30 transition-all whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  {t.copied}
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  {t.copy}
                </>
              )}
            </motion.button>
          </div>

          {/* Action Button */}
          <motion.button
            onClick={walletAddress ? undefined : onConnectWallet}
            className="w-full mt-6 py-4 rounded-xl font-mono text-sm tracking-wider font-bold transition-all bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-400 hover:to-purple-400"
            whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(236,72,153,0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex items-center justify-center gap-2">
              <Wallet className="w-4 h-4" />
              {walletAddress ? t.donate : t.connect}
            </span>
          </motion.button>

          {/* Etherscan link */}
          <div className="flex justify-center mt-4">
            <a
              href={`https://etherscan.io/address/${donationAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-foreground/40 hover:text-cyan-400 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              View on Etherscan
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

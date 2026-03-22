"use client"

import { motion } from "framer-motion"
import { Home, ArrowLeftRight, Info, Heart, Wallet, ChevronDown } from "lucide-react"
import { useState } from "react"

interface NavItem {
  id: string
  labelFR: string
  labelEN: string
  labelZH: string
  labelAR: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: "home", labelFR: "ACCUEIL", labelEN: "HOME", labelZH: "首页", labelAR: "الرئيسية", icon: <Home className="w-4 h-4" /> },
  { id: "swap", labelFR: "ÉCHANGE", labelEN: "SWAP", labelZH: "交换", labelAR: "تبادل", icon: <ArrowLeftRight className="w-4 h-4" /> },
  { id: "about", labelFR: "À PROPOS", labelEN: "ABOUT", labelZH: "关于", labelAR: "حول", icon: <Info className="w-4 h-4" /> },
  { id: "donate", labelFR: "DONS", labelEN: "DONATE", labelZH: "捐赠", labelAR: "تبرع", icon: <Heart className="w-4 h-4" /> },
]

const languages = [
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中文" },
  { code: "ar", label: "عربي" },
]

interface IndustrialNavbarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  language: string
  onLanguageChange: (lang: string) => void
  onConnectWallet: () => void
  walletAddress?: string | null
}

export function IndustrialNavbar({
  activeSection,
  onSectionChange,
  language,
  onLanguageChange,
  onConnectWallet,
  walletAddress,
}: IndustrialNavbarProps) {
  const [langOpen, setLangOpen] = useState(false)

  const getLabel = (item: NavItem) => {
    switch (language) {
      case "en": return item.labelEN
      case "zh": return item.labelZH
      case "ar": return item.labelAR
      default: return item.labelFR
    }
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="liquid-glass rounded-xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <span className="text-xl font-black text-black italic">Ω</span>
              </div>
              <motion.div
                className="absolute inset-0 rounded-lg border border-cyan-400/50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-black italic tracking-tight text-foreground cyber-glow-subtle">
                OMNIUTIL
              </div>
              <div className="text-[10px] font-mono text-cyan-400/70 tracking-widest">
                v9.0-SOUVERAIN
              </div>
            </div>
          </motion.div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`relative px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  activeSection === item.id
                    ? "text-cyan-300 bg-cyan-500/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                {getLabel(item)}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                    layoutId="activeTab"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <motion.button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/5 border border-cyan-500/20 text-xs font-mono text-cyan-300 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                {languages.find(l => l.code === language)?.label}
                <ChevronDown className="w-3 h-3" />
              </motion.button>
              
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 right-0 liquid-glass rounded-lg py-2 min-w-[80px]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code)
                        setLangOpen(false)
                      }}
                      className={`w-full px-4 py-2 text-left text-xs font-mono hover:bg-cyan-500/10 transition-colors ${
                        language === lang.code ? "text-cyan-300" : "text-foreground/70"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Wallet Button */}
            <motion.button
              onClick={onConnectWallet}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all ${
                walletAddress
                  ? "bg-cyan-500/20 border border-cyan-400/40 text-cyan-300"
                  : "bg-gradient-to-r from-cyan-500 to-cyan-600 text-black font-bold"
              }`}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Wallet className="w-4 h-4" />
              {walletAddress ? truncateAddress(walletAddress) : "CONNECT"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-2">
        <div className="liquid-glass rounded-lg p-2 flex justify-around">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`p-2 rounded-lg transition-all ${
                activeSection === item.id
                  ? "text-cyan-300 bg-cyan-500/20"
                  : "text-foreground/50"
              }`}
              whileTap={{ scale: 0.9 }}
            >
              {item.icon}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

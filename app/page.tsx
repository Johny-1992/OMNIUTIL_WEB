"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DigitalGrid } from "@/components/digital-grid"
import { IndustrialNavbar } from "@/components/industrial-navbar"
import { HeroSection } from "@/components/hero-section"
import { SwapSection } from "@/components/swap-section"
import { AboutSection } from "@/components/about-section"
import { DonateSection } from "@/components/donate-section"
import { IndustrialFooter } from "@/components/industrial-footer"

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, callback: (...args: unknown[]) => void) => void
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void
    }
  }
}

export default function OmniutilPage() {
  const [activeSection, setActiveSection] = useState("home")
  const [language, setLanguage] = useState("fr")
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing wallet connection
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" }) as string[]
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
          }
        } catch (error) {
          console.error("Error checking wallet:", error)
        }
      }
      setIsLoading(false)
    }

    checkWalletConnection()
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: unknown) => {
        const accountsArray = accounts as string[]
        if (accountsArray.length === 0) {
          setWalletAddress(null)
        } else {
          setWalletAddress(accountsArray[0])
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)

      return () => {
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged)
      }
    }
  }, [])

  const connectWallet = useCallback(async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        }) as string[]
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
        }
      } catch (error) {
        console.error("Error connecting wallet:", error)
      }
    } else {
      window.open("https://metamask.io/download/", "_blank")
    }
  }, [])

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#000510] flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <span className="text-3xl font-black text-black italic">Ω</span>
          </motion.div>
          <div className="text-xs font-mono text-cyan-400/70 tracking-widest">
            INITIALIZING v9.0-SOUVERAIN
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#000510] text-foreground relative overflow-x-hidden scanlines">
      {/* Animated Background */}
      <DigitalGrid />

      {/* Navigation */}
      <IndustrialNavbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        language={language}
        onLanguageChange={setLanguage}
        onConnectWallet={connectWallet}
        walletAddress={walletAddress}
      />

      {/* Content Sections */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {activeSection === "home" && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <HeroSection language={language} />
            </motion.div>
          )}

          {activeSection === "swap" && (
            <motion.div
              key="swap"
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="pt-24"
            >
              <SwapSection
                language={language}
                walletAddress={walletAddress}
                onConnectWallet={connectWallet}
              />
            </motion.div>
          )}

          {activeSection === "about" && (
            <motion.div
              key="about"
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="pt-24"
            >
              <AboutSection language={language} />
            </motion.div>
          )}

          {activeSection === "donate" && (
            <motion.div
              key="donate"
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="pt-24"
            >
              <DonateSection
                language={language}
                walletAddress={walletAddress}
                onConnectWallet={connectWallet}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <IndustrialFooter language={language} />
      </div>

      {/* Global scan effect overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-gradient-to-b from-cyan-500/[0.02] via-transparent to-cyan-500/[0.02]" />
    </main>
  )
}

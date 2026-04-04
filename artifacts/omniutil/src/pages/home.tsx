import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { useGetOverviewStats, useGetUtilPrice, useGetContractInfo, useGetPartnerQRCode } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Activity, Box, Zap, Coins } from "lucide-react";

export default function Home() {
  const { t } = useI18n();

  const { data: stats, isLoading: statsLoading } = useGetOverviewStats();
  const { data: price, isLoading: priceLoading } = useGetUtilPrice();
  const { data: contract, isLoading: contractLoading } = useGetContractInfo();
  const { data: qrCode, isLoading: qrLoading } = useGetPartnerQRCode();

  return (
    <div className="min-h-screen py-12 px-4 md:px-12 flex flex-col items-center max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-mono mb-6 border border-primary/20">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          BSC MAINNET ACTIVE
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50">
          {t("hero_title")}
        </h1>
        <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
          {t("description")}
        </p>
      </motion.div>

      {/* Stats Ticker */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
      >
        <StatCard title={t("price")} value={priceLoading ? "..." : `$${price?.priceUSDT?.toFixed(4) || "0.0000"}`} icon={<Coins className="w-4 h-4 text-primary" />} />
        <StatCard title={t("total_partners")} value={statsLoading ? "..." : stats?.totalPartners || 0} icon={<Box className="w-4 h-4 text-primary" />} />
        <StatCard title={t("total_users")} value={statsLoading ? "..." : stats?.totalUsers?.toLocaleString() || 0} icon={<Activity className="w-4 h-4 text-primary" />} />
        <StatCard title={t("total_rewards")} value={statsLoading ? "..." : `${stats?.totalRewardsDistributed?.toLocaleString()} UTIL`} icon={<Zap className="w-4 h-4 text-primary" />} />
      </motion.div>

      {/* QR Code Centerpiece */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="relative group mb-20"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-amber-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <div className="relative bg-card border border-border p-8 rounded-xl flex flex-col items-center">
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-mono text-white mb-2">ACCESS TERMINAL</h3>
            <p className="text-sm text-muted-foreground uppercase tracking-widest">Ecosystem Integration Gateway</p>
          </div>
          
          <div className="p-4 bg-white rounded-lg mb-8 shadow-[0_0_50px_rgba(255,170,0,0.15)]">
            <QRCodeSVG 
              value={qrCode?.partnerOnboardingUrl || `${window.location.origin}/partner/apply`} 
              size={240}
              level="H"
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </div>

          <Link href="/partner/apply" className="w-full">
            <Button size="lg" className="w-full text-lg font-bold h-14 bg-primary hover:bg-primary/90 text-primary-foreground">
              {t("integrate_btn")}
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Contract Info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-4xl bg-secondary/30 border border-border/50 rounded-xl p-6 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-mono text-white">SMART CONTRACT INFRASTRUCTURE</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Contract Address</p>
            <p className="font-mono text-sm break-all text-primary/80 bg-background/50 p-2 rounded border border-border">
              {contractLoading ? "Loading..." : contract?.address || "0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B"}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Network</p>
            <p className="font-mono text-sm text-white bg-background/50 p-2 rounded border border-border">
              {contractLoading ? "Loading..." : contract?.network || "BSC Mainnet"}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string | number, icon: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:bg-secondary/50 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon}
      </div>
      <p className="text-2xl font-bold font-mono text-white tracking-tight">{value}</p>
    </div>
  );
}

import { useListPartners } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { ExternalLink, Users, TrendingUp, Zap, FileSignature } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const ECOSYSTEM_ICONS: Record<string, string> = {
  mobile: "📡", tv: "📺", ebank: "🏦", ecommerce: "🛒",
  casino: "🎰", hotel: "🏨", sports_betting: "⚽", supermarket: "🛍️",
  bar: "🍸", network: "🌐", other: "⚙️",
};

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-400/8 text-green-400 border-green-400/15",
  pending: "bg-amber-500/8 text-amber-400 border-amber-500/15",
  rejected: "bg-red-400/8 text-red-400 border-red-400/15",
};

export default function Partners() {
  const { t } = useI18n();
  const { data: partners, isLoading } = useListPartners();

  const active = partners?.filter(p => p.status === "active") ?? [];
  const pending = partners?.filter(p => p.status === "pending") ?? [];
  const all = partners ?? [];

  return (
    <div className="p-5 md:p-8 space-y-7 max-w-6xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <FileSignature className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">{t("partners_dir")}</h1>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              {isLoading ? "..." : `${active.length} ${t("active")} · ${pending.length} ${t("pending")}`}
            </p>
          </div>
        </div>
        <Link href="/partner/apply">
          <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold h-9 text-xs px-4 rounded-lg">
            {t("apply")}
          </Button>
        </Link>
      </motion.div>

      {/* Partners Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-5 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/5 rounded-lg" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 bg-white/5 rounded w-3/4" />
                  <div className="h-2.5 bg-white/5 rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2.5 bg-white/5 rounded" />
                <div className="h-2.5 bg-white/5 rounded w-4/5" />
              </div>
            </div>
          ))}
        </div>
      ) : all.length === 0 ? (
        <div className="text-center py-16 text-zinc-600">
          <FileSignature className="w-10 h-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-mono">{t("no_partners")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {all.map((partner, i) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-5 hover:border-amber-500/20 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/2 transition-all duration-500" />
              
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-xl flex-shrink-0 group-hover:border-amber-500/20 transition-colors">
                  {ECOSYSTEM_ICONS[partner.ecosystemType] ?? "⚙️"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-white truncate">{partner.name}</h3>
                    <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border flex-shrink-0 ${STATUS_STYLES[partner.status] ?? STATUS_STYLES.pending}`}>
                      {t(partner.status === "rejected" ? "rejected_status" : partner.status)}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">
                    {t(`ecosystem_${partner.ecosystemType}`) !== `ecosystem_${partner.ecosystemType}` 
                      ? t(`ecosystem_${partner.ecosystemType}`) 
                      : partner.ecosystemType}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between py-1.5 border-b border-[#141414]">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Zap className="w-3 h-3" /> {t("partner_rate")}
                  </div>
                  <span className="text-sm font-mono font-bold text-amber-400">{partner.rewardRate}%</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-[#141414]">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Users className="w-3 h-3" /> {t("partner_users")}
                  </div>
                  <span className="text-xs font-mono text-white">{(partner.totalUsers ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-[#141414]">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <TrendingUp className="w-3 h-3" /> {t("partner_volume")}
                  </div>
                  <span className="text-xs font-mono text-white">${(partner.totalVolume ?? 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                    <Zap className="w-3 h-3" /> {t("partner_rewards")}
                  </div>
                  <span className="text-xs font-mono text-amber-400">{(partner.totalRewardsDistributed ?? 0).toFixed(2)} UTIL</span>
                </div>
              </div>

              {/* Wallet */}
              {partner.walletAddress && (
                <a
                  href={`https://bscscan.com/address/${partner.walletAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-zinc-600 hover:text-amber-400 transition-colors"
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                  {partner.walletAddress.slice(0, 10)}...{partner.walletAddress.slice(-6)}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

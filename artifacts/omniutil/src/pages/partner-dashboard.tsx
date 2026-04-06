import { useGetPartnerStats, useListPartners } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import {
  Users, Activity, DollarSign, Zap, Database, ExternalLink,
  ChevronDown, TrendingUp
} from "lucide-react";

const ECOSYSTEM_ICONS: Record<string, string> = {
  mobile: "📡", tv: "📺", ebank: "🏦", ecommerce: "🛒",
  casino: "🎰", hotel: "🏨", sports_betting: "⚽", supermarket: "🛍️",
  bar: "🍸", network: "🌐", other: "⚙️",
};

export default function PartnerDashboard() {
  const { t } = useI18n();
  const { data: allPartners, isLoading: partnersLoading } = useListPartners();
  const activePartners = allPartners?.filter(p => p.status === "active") ?? [];

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const partnerId = selectedId ?? activePartners[0]?.id ?? "";

  const { data: stats, isLoading: statsLoading } = useGetPartnerStats(partnerId, {
    query: { enabled: !!partnerId, queryKey: ["partnerStats", partnerId] }
  });

  const selectedPartner = activePartners.find(p => p.id === partnerId);

  const metrics = [
    { label: t("total_users"), value: stats?.totalUsers?.toLocaleString() ?? "0", icon: <Users className="w-4 h-4" />, accent: false },
    { label: t("active"), value: stats?.activeUsers?.toLocaleString() ?? "0", icon: <Activity className="w-4 h-4" />, accent: false },
    { label: t("partner_volume"), value: `$${(stats?.totalConsumptionUSD ?? 0).toLocaleString()}`, icon: <DollarSign className="w-4 h-4" />, accent: false },
    { label: t("partner_rewards"), value: `${(stats?.totalRewardsUTIL ?? 0).toLocaleString()} UTIL`, icon: <Zap className="w-4 h-4" />, accent: true },
  ];

  return (
    <div className="p-5 md:p-8 space-y-7 max-w-6xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Database className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">{t("partner_dash")}</h1>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              {activePartners.length} {t("active")} partners
            </p>
          </div>
        </div>

        {/* Partner Selector */}
        {activePartners.length > 0 && (
          <div className="relative">
            <select
              className="appearance-none bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl px-4 py-2 pr-8 text-sm text-white font-mono focus:outline-none focus:border-amber-500/30 cursor-pointer"
              value={partnerId}
              onChange={e => setSelectedId(e.target.value)}
            >
              {activePartners.map(p => (
                <option key={p.id} value={p.id}>
                  {ECOSYSTEM_ICONS[p.ecosystemType] ?? ""} {p.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
          </div>
        )}
      </motion.div>

      {/* Selected Partner Banner */}
      {selectedPartner && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-between bg-[#0c0c0c] border border-amber-500/10 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{ECOSYSTEM_ICONS[selectedPartner.ecosystemType] ?? "⚙️"}</span>
            <div>
              <h3 className="font-bold text-white text-sm">{selectedPartner.name}</h3>
              <p className="text-xs text-zinc-500 font-mono">
                {t(`ecosystem_${selectedPartner.ecosystemType}`)} · {t("partner_rate")}: <span className="text-amber-400">{selectedPartner.rewardRate}%</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono bg-green-400/8 text-green-400 border border-green-400/15 px-2 py-1 rounded uppercase tracking-wider">{t("active")}</span>
            {selectedPartner.walletAddress && (
              <a
                href={`https://bscscan.com/address/${selectedPartner.walletAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-amber-400 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      )}

      {/* Metrics */}
      {partnersLoading || statsLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-5 animate-pulse">
              <div className="h-2.5 bg-white/5 rounded w-2/3 mb-4" />
              <div className="h-6 bg-white/5 rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {metrics.map((m, i) => (
            <div key={i} className={`relative bg-[#0c0c0c] border rounded-xl p-5 overflow-hidden ${m.accent ? "border-amber-500/20" : "border-[#1a1a1a]"}`}>
              {m.accent && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />}
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{m.label}</p>
                <span className={m.accent ? "text-amber-500" : "text-zinc-700"}>{m.icon}</span>
              </div>
              <p className="text-xl font-mono font-bold text-white">{m.value}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 p-5 border-b border-[#141414]">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Activité Récente</h2>
        </div>
        <div className="divide-y divide-[#0f0f0f]">
          {stats?.recentTransactions?.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-white/1 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-amber-500/5 border border-amber-500/10 flex items-center justify-center">
                  <Zap className="w-3 h-3 text-amber-500/50" />
                </div>
                <div>
                  <p className="text-sm text-white font-medium capitalize">{tx.type}</p>
                  {tx.txHash && (
                    <p className="text-[10px] font-mono text-zinc-600 mt-0.5">
                      {tx.txHash.slice(0, 12)}...
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono font-bold text-amber-400">+{tx.amount} UTIL</p>
              </div>
            </div>
          ))}
          {(!stats?.recentTransactions || stats.recentTransactions.length === 0) && (
            <div className="text-center py-10 text-zinc-600 text-sm font-mono">
              Aucune activité récente.
            </div>
          )}
        </div>
      </motion.div>

      {/* Info Bar */}
      <div className="text-center pb-4">
        <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">{t("powered_by")} · {t("contract_verified")}</p>
      </div>
    </div>
  );
}

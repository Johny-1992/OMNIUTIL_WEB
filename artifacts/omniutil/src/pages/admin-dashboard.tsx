import {
  useGetOverviewStats, useListApplications,
  useApprovePartner, useRejectPartner, useGetContractInfo, useGetUtilPrice
} from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import {
  Activity, Shield, Coins, Users, Box, Zap, ExternalLink,
  TrendingUp, CheckCircle2, XCircle, Clock, RefreshCw
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const BSCSCAN = "https://bscscan.com/token/0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B";

const ECOSYSTEM_ICONS: Record<string, string> = {
  mobile: "📡", tv: "📺", ebank: "🏦", ecommerce: "🛒",
  casino: "🎰", hotel: "🏨", sports_betting: "⚽", supermarket: "🛍️",
  bar: "🍸", network: "🌐", other: "⚙️",
};

function MetricCard({
  label, value, sub, icon, accent = false
}: { label: string; value: React.ReactNode; sub?: string; icon: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`relative bg-[#0c0c0c] border rounded-xl p-5 overflow-hidden ${accent ? "border-amber-500/20" : "border-[#1a1a1a]"}`}>
      {accent && <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />}
      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">{label}</p>
        <div className={accent ? "text-amber-500" : "text-zinc-700"}>{icon}</div>
      </div>
      <div className="text-2xl font-mono font-bold text-white">{value}</div>
      {sub && <p className="text-xs text-zinc-600 mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const { t } = useI18n();
  const { toast } = useToast();
  const qc = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useGetOverviewStats();
  const { data: contract, isLoading: contractLoading } = useGetContractInfo();
  const { data: price } = useGetUtilPrice();
  const { data: pendingApps, refetch } = useListApplications({ status: "pending" });
  const approve = useApprovePartner();
  const reject = useRejectPartner();

  const mintPct = contract
    ? Math.min(100, (contract.mintedThisYear / contract.maxAnnualMint) * 100)
    : 0;

  const handleApprove = (id: string, name: string) => {
    approve.mutate({ id }, {
      onSuccess: () => {
        toast({ title: t("approved"), description: name });
        refetch();
        qc.invalidateQueries();
      }
    });
  };

  const handleReject = (id: string, name: string) => {
    reject.mutate({ id, data: { reason: "Admin rejection" } }, {
      onSuccess: () => {
        toast({ title: t("rejected"), description: name, variant: "destructive" });
        refetch();
        qc.invalidateQueries();
      }
    });
  };

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
            <Shield className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">{t("admin_dash")}</h1>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">{t("on_chain_data")} · BSC Mainnet</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => qc.invalidateQueries()}
            className="text-zinc-600 hover:text-zinc-400 transition-colors p-2 rounded-lg hover:bg-white/5">
            <RefreshCw className="w-4 h-4" />
          </button>
          <a href={BSCSCAN} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-amber-400/70 hover:text-amber-400 border border-amber-500/10 hover:border-amber-500/30 px-3 py-1.5 rounded-lg transition-all">
            BSCScan <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </motion.div>

      {/* Main Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <MetricCard
          label={t("total_volume")}
          value={statsLoading ? "..." : `$${(stats?.totalConsumptionVolumeUSD ?? 0).toLocaleString()}`}
          icon={<TrendingUp className="w-4 h-4" />}
          accent
        />
        <MetricCard
          label={t("circulating")}
          value={contractLoading ? "..." : (contract?.mintedThisYear ?? stats?.utilCirculatingSupply ?? 0).toLocaleString()}
          sub={`/ ${(contract?.maxAnnualMint ?? 1_000_000).toLocaleString()} max`}
          icon={<Coins className="w-4 h-4" />}
        />
        <MetricCard
          label={t("total_partners")}
          value={statsLoading ? "..." : stats?.totalPartners ?? 0}
          sub={`${stats?.activePartners ?? 0} ${t("active")}`}
          icon={<Box className="w-4 h-4" />}
        />
        <MetricCard
          label={t("txs_24h")}
          value={statsLoading ? "..." : stats?.transactionsLast24h ?? 0}
          sub={`+${(stats?.rewardsLast24h ?? 0).toFixed(2)} UTIL`}
          icon={<Activity className="w-4 h-4" />}
        />
      </motion.div>

      {/* Secondary Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <MetricCard
          label={t("total_users")}
          value={statsLoading ? "..." : (stats?.totalUsers ?? 0).toLocaleString()}
          icon={<Users className="w-4 h-4" />}
        />
        <MetricCard
          label={t("total_rewards")}
          value={statsLoading ? "..." : `${(stats?.totalRewardsDistributed ?? 0).toLocaleString()} UTIL`}
          icon={<Zap className="w-4 h-4" />}
        />
        <MetricCard
          label={t("price")}
          value={price?.listed && price.priceUSDT != null ? `$${price.priceUSDT.toFixed(6)}` : t("not_listed")}
          sub={price?.source ?? "BSCScan"}
          icon={<Coins className="w-4 h-4" />}
          accent={!!price?.listed}
        />
        <MetricCard
          label={t("pending")}
          value={pendingApps?.length ?? 0}
          sub={t("pending_apps")}
          icon={<Clock className="w-4 h-4" />}
        />
      </motion.div>

      {/* Annual Supply Progress */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">{t("supply_progress")}</h2>
          <span className="text-xs font-mono text-amber-400">{contractLoading ? "..." : `${mintPct.toFixed(2)}%`}</span>
        </div>
        <div className="h-2 bg-black/60 rounded-full border border-[#1a1a1a] overflow-hidden mb-3">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${mintPct}%` }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div>
            <p className="text-zinc-500 mb-0.5">{t("minted_this_year")}</p>
            <p className="font-mono font-bold text-white">{contractLoading ? "..." : (contract?.mintedThisYear ?? 0).toLocaleString()} UTIL</p>
          </div>
          <div>
            <p className="text-zinc-500 mb-0.5">{t("remaining_mintable")}</p>
            <p className="font-mono font-bold text-green-400">{contractLoading ? "..." : (contract?.remainingMintable ?? 0).toLocaleString()} UTIL</p>
          </div>
          <div>
            <p className="text-zinc-500 mb-0.5">{t("max_annual_mint")}</p>
            <p className="font-mono font-bold text-zinc-400">{contractLoading ? "..." : (contract?.maxAnnualMint ?? 0).toLocaleString()} UTIL</p>
          </div>
        </div>
      </motion.div>

      {/* Pending Applications */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl overflow-hidden"
      >
        <div className="flex items-center gap-2 p-5 border-b border-[#1a1a1a]">
          <Activity className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-mono font-bold text-white uppercase tracking-wider">{t("pending_apps")}</h2>
          {pendingApps && pendingApps.length > 0 && (
            <span className="ml-auto text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full">
              {pendingApps.length}
            </span>
          )}
        </div>
        <div className="divide-y divide-[#141414]">
          {pendingApps?.map((app) => (
            <div key={app.id} className="flex items-center justify-between p-4 hover:bg-white/2 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-sm flex-shrink-0">
                  {ECOSYSTEM_ICONS[app.ecosystemType] ?? "⚙️"}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm text-white truncate">{app.name}</p>
                  <p className="text-xs text-zinc-500 font-mono">
                    {app.ecosystemType} · {t("rate")}: <span className="text-amber-400">{app.rewardRate}%</span>
                  </p>
                  <p className="text-[10px] font-mono text-zinc-700 truncate mt-0.5">{app.walletAddress}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0 ml-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-500/20 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/40 h-8 text-xs gap-1.5"
                  onClick={() => handleReject(app.id, app.name)}
                  disabled={reject.isPending}
                >
                  <XCircle className="w-3 h-3" /> {t("reject")}
                </Button>
                <Button
                  size="sm"
                  className="bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 hover:text-green-300 h-8 text-xs gap-1.5"
                  onClick={() => handleApprove(app.id, app.name)}
                  disabled={approve.isPending}
                >
                  <CheckCircle2 className="w-3 h-3" /> {t("approve")}
                </Button>
              </div>
            </div>
          ))}
          {(!pendingApps || pendingApps.length === 0) && (
            <div className="text-center py-10 text-zinc-600 text-sm font-mono">{t("no_pending")}</div>
          )}
        </div>
      </motion.div>

    </div>
  );
}

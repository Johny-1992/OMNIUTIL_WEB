import { useListUsers } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";
import { Users as UsersIcon, ExternalLink, Search, Zap, Clock } from "lucide-react";

export default function Users() {
  const { t } = useI18n();
  const { data: usersData, isLoading } = useListUsers();
  const [search, setSearch] = useState("");

  const all = usersData?.data ?? [];
  const filtered = search.trim()
    ? all.filter(u => u.walletAddress.toLowerCase().includes(search.toLowerCase()))
    : all;

  const totalBalance = all.reduce((s, u) => s + u.utilBalance, 0);
  const totalEarned = all.reduce((s, u) => s + u.totalEarned, 0);

  return (
    <div className="p-5 md:p-8 space-y-7 max-w-6xl mx-auto">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between flex-wrap gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <UsersIcon className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">{t("users_explorer")}</h1>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              {isLoading ? "..." : `${all.length} wallets · ${totalBalance.toFixed(2)} UTIL total`}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
      >
        <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-4">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{t("total_users")}</p>
          <p className="text-xl font-mono font-bold text-white">{isLoading ? "..." : all.length.toLocaleString()}</p>
        </div>
        <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-4">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{t("balance")} Total</p>
          <p className="text-xl font-mono font-bold text-amber-400">{isLoading ? "..." : totalBalance.toFixed(2)} UTIL</p>
        </div>
        <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-4 col-span-2 md:col-span-1">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{t("total_earned")}</p>
          <p className="text-xl font-mono font-bold text-white">{isLoading ? "..." : totalEarned.toFixed(2)} UTIL</p>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="relative"
      >
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
        <input
          type="text"
          placeholder={t("search_wallet")}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/10 transition-all font-mono"
        />
      </motion.div>

      {/* Users List */}
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-4 animate-pulse flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-3 bg-white/5 rounded w-64" />
                <div className="h-2.5 bg-white/5 rounded w-32" />
              </div>
              <div className="h-5 bg-white/5 rounded w-24" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-zinc-600">
          <UsersIcon className="w-10 h-10 mx-auto mb-3 opacity-20" />
          <p className="text-sm font-mono">{search ? "Aucun résultat." : t("no_users")}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((user, i) => (
            <motion.div
              key={user.walletAddress}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.5) }}
              className="group flex items-center justify-between bg-[#0c0c0c] border border-[#1a1a1a] hover:border-amber-500/15 rounded-xl p-4 transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-amber-500/5 border border-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:border-amber-500/25 transition-colors">
                  <Zap className="w-3.5 h-3.5 text-amber-500/50 group-hover:text-amber-400 transition-colors" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm text-white truncate max-w-[180px] md:max-w-none">{user.walletAddress}</p>
                    <a
                      href={`https://bscscan.com/address/${user.walletAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-700 hover:text-amber-400 transition-colors flex-shrink-0"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-600">
                      <Clock className="w-2.5 h-2.5" />
                      {new Date(user.lastActivity ?? "").toLocaleDateString()}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600">
                      {t("total_earned")}: <span className="text-zinc-500">{user.totalEarned.toFixed(3)} UTIL</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <p className="text-base font-mono font-bold text-amber-400">{user.utilBalance.toFixed(3)}</p>
                <p className="text-[10px] font-mono text-zinc-600">UTIL</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <p className="text-center text-[10px] font-mono text-zinc-700 pb-4">
          {filtered.length} / {all.length} wallets · {t("powered_by")}
        </p>
      )}
    </div>
  );
}

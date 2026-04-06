import { useI18n } from "@/lib/i18n";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  useGetOverviewStats, useGetUtilPrice, useGetContractInfo, useGetPartnerQRCode
} from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck, Copy, Check, ExternalLink, Zap,
  Users, Box, TrendingUp, AlertCircle, RefreshCw
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

const CONTRACT = "0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B";
const BSCSCAN = `https://bscscan.com/token/${CONTRACT}`;

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const start = prev.current;
    const end = value;
    const diff = end - start;
    if (diff === 0) return;
    const dur = 1200;
    const startTime = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / dur);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(start + diff * ease));
      if (t < 1) requestAnimationFrame(tick);
      else prev.current = end;
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{display.toLocaleString()}{suffix}</>;
}

function StatCard({
  label, value, subvalue, icon, loading, href
}: {
  label: string;
  value: React.ReactNode;
  subvalue?: string;
  icon: React.ReactNode;
  loading?: boolean;
  href?: string;
}) {
  const inner = (
    <div className="relative bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-5 hover:border-amber-500/20 transition-all group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/3 group-hover:to-transparent transition-all duration-500" />
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">{label}</p>
        <div className="text-zinc-700 group-hover:text-amber-500/60 transition-colors">{icon}</div>
      </div>
      {loading ? (
        <div className="h-7 w-24 bg-white/5 rounded animate-pulse" />
      ) : (
        <p className="text-2xl font-bold font-mono text-white tracking-tight">{value}</p>
      )}
      {subvalue && <p className="text-xs text-zinc-600 mt-1 font-mono">{subvalue}</p>}
    </div>
  );
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return inner;
}

export default function Home() {
  const { t } = useI18n();
  const qc = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useGetOverviewStats();
  const { data: price, isLoading: priceLoading } = useGetUtilPrice();
  const { data: contract, isLoading: contractLoading } = useGetContractInfo();
  const { data: qrCode } = useGetPartnerQRCode();

  const { copied: addrCopied, copy: copyAddr } = useCopy(CONTRACT);
  const { copied: ownerCopied, copy: copyOwner } = useCopy(contract?.ownerWallet ?? "");
  const { copied: treasuryCopied, copy: copyTreasury } = useCopy(contract?.treasuryWallet ?? "");

  const mintPct = contract
    ? Math.min(100, (contract.mintedThisYear / contract.maxAnnualMint) * 100)
    : 0;

  const qrUrl = qrCode?.partnerOnboardingUrl ?? `${window.location.origin}/partner/apply`;

  const handleRefresh = () => {
    qc.invalidateQueries();
  };

  return (
    <div className="min-h-screen px-4 md:px-8 py-8 max-w-6xl mx-auto space-y-10">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-center pt-2"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/8 border border-amber-500/15 text-amber-400 text-xs font-mono mb-6 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {t("live_bsc")}
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-5 leading-none">
          <span className="text-white">{t("hero_title")}</span>
        </h1>

        <p className="text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {t("hero_subtitle")}
        </p>

        <div className="flex items-center justify-center gap-3 mt-6">
          <Link href="/partner/apply">
            <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 h-10 text-sm rounded-lg">
              {t("integrate_btn")}
            </Button>
          </Link>
          <a href={BSCSCAN} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-[#1a1a1a] bg-transparent hover:bg-white/5 text-zinc-300 h-10 text-sm rounded-lg gap-2">
              BSCScan <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
          <button onClick={handleRefresh} className="text-zinc-600 hover:text-zinc-400 transition-colors p-2 rounded-lg hover:bg-white/5">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
      >
        <StatCard
          label={t("price")}
          icon={<TrendingUp className="w-4 h-4" />}
          loading={priceLoading}
          value={
            price?.listed && price?.priceUSDT != null
              ? `$${price.priceUSDT.toFixed(6)}`
              : <span className="text-zinc-500 text-sm">{t("not_listed")}</span>
          }
          subvalue={price?.listed ? price.source : undefined}
          href={BSCSCAN}
        />
        <StatCard
          label={t("total_partners")}
          icon={<Box className="w-4 h-4" />}
          loading={statsLoading}
          value={<AnimatedNumber value={stats?.totalPartners ?? 0} />}
          subvalue={`${stats?.activePartners ?? 0} actifs`}
        />
        <StatCard
          label={t("total_users")}
          icon={<Users className="w-4 h-4" />}
          loading={statsLoading}
          value={<AnimatedNumber value={stats?.totalUsers ?? 0} />}
        />
        <StatCard
          label={t("total_rewards")}
          icon={<Zap className="w-4 h-4" />}
          loading={statsLoading}
          value={<AnimatedNumber value={stats?.totalRewardsDistributed ?? 0} suffix=" UTIL" />}
        />
      </motion.div>

      {/* Main content grid: QR + Contract */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="relative group"
        >
          <div className="absolute -inset-px bg-gradient-to-r from-amber-500/20 via-amber-600/10 to-amber-500/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl p-6 flex flex-col items-center h-full">
            <div className="mb-4 text-center">
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{t("ecosystem_gateway")}</p>
              <h3 className="text-lg font-black font-mono text-white tracking-tight">ACCESS TERMINAL</h3>
            </div>

            <div className="relative mb-5">
              <div className="absolute -inset-2 bg-amber-500/10 rounded-xl blur-md animate-pulse" />
              <div className="relative p-3 bg-white rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <QRCodeSVG
                  value={qrUrl}
                  size={180}
                  level="H"
                  fgColor="#000000"
                  bgColor="#ffffff"
                />
              </div>
            </div>

            <p className="text-xs text-zinc-500 text-center mb-4">{t("scan_to_integrate")}</p>

            <Link href="/partner/apply" className="w-full">
              <Button className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold h-11 rounded-xl text-sm">
                {t("integrate_btn")}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Contract Info */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl p-6 space-y-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-mono font-bold text-white tracking-wider uppercase">{t("contract_info")}</h2>
            </div>
            <a href={BSCSCAN} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-[10px] font-mono text-green-400 bg-green-400/8 px-2 py-1 rounded border border-green-400/15 hover:border-green-400/30 transition-colors">
              <span className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
              {t("verified")}
            </a>
          </div>

          {/* Contract Address */}
          <div className="space-y-1.5">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("contract_address")}</p>
            <div className="flex items-center gap-2 bg-black/40 border border-[#1a1a1a] rounded-lg p-2.5">
              <code className="text-amber-400/80 text-xs font-mono flex-1 break-all leading-tight">
                {contractLoading ? "Loading..." : contract?.address ?? CONTRACT}
              </code>
              <div className="flex gap-1.5 flex-shrink-0">
                <button onClick={copyAddr}
                  className="text-zinc-600 hover:text-amber-400 transition-colors p-1 rounded hover:bg-amber-400/5">
                  {addrCopied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
                <a href={BSCSCAN} target="_blank" rel="noopener noreferrer"
                  className="text-zinc-600 hover:text-amber-400 transition-colors p-1 rounded hover:bg-amber-400/5">
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Network + Supply */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("network")}</p>
              <p className="text-sm font-mono text-white">{contract?.network ?? "BSC Mainnet"}</p>
              <p className="text-[10px] font-mono text-zinc-600">Chain ID: {contract?.chainId ?? 56}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("total_supply")}</p>
              <p className="text-sm font-mono text-white">
                {contractLoading ? "..." : (contract?.totalSupply ?? 1_000_000).toLocaleString()} {contract?.symbol ?? "UTIL"}
              </p>
              <p className="text-[10px] font-mono text-zinc-600">{t("annual_supply")}</p>
            </div>
          </div>

          {/* Annual Mint Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("supply_progress")}</p>
              <span className="text-[10px] font-mono text-amber-400">
                {contractLoading ? "..." : `${mintPct.toFixed(1)}%`}
              </span>
            </div>
            <div className="h-1.5 bg-black/60 rounded-full border border-[#1a1a1a] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${mintPct}%` }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] font-mono text-zinc-600">
                {contractLoading ? "..." : (contract?.mintedThisYear ?? 0).toLocaleString()} {t("minted_this_year")}
              </span>
              <span className="text-[10px] font-mono text-zinc-600">
                / {contractLoading ? "..." : (contract?.maxAnnualMint ?? 1_000_000).toLocaleString()} max
              </span>
            </div>
          </div>

          {/* Fees */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="bg-black/30 border border-[#1a1a1a] rounded-lg p-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{t("creator_fee")}</p>
              <p className="text-base font-mono font-bold text-amber-400">{contract?.creatorFeePercent ?? 0.5}%</p>
              <button onClick={copyOwner} className="text-[9px] font-mono text-zinc-600 hover:text-zinc-400 flex items-center gap-1 mt-1 transition-colors">
                {ownerCopied ? <><Check className="w-2.5 h-2.5 text-green-400" /> Copié</> : <><Copy className="w-2.5 h-2.5" /> {`${contract?.ownerWallet?.slice(0, 8) ?? "0x40BB46B9"}...`}</>}
              </button>
            </div>
            <div className="bg-black/30 border border-[#1a1a1a] rounded-lg p-3">
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">{t("treasury_fee")}</p>
              <p className="text-base font-mono font-bold text-amber-400">{contract?.treasuryFeePercent ?? 0.5}%</p>
              <button onClick={copyTreasury} className="text-[9px] font-mono text-zinc-600 hover:text-zinc-400 flex items-center gap-1 mt-1 transition-colors">
                {treasuryCopied ? <><Check className="w-2.5 h-2.5 text-green-400" /> Copié</> : <><Copy className="w-2.5 h-2.5" /> {`${contract?.treasuryWallet?.slice(0, 8) ?? "0xB13B61a6"}...`}</>}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Price Info Banner */}
      <AnimatePresence>
        {!priceLoading && price && !price.listed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/15 rounded-xl p-4"
          >
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-amber-300 font-medium">{t("not_listed")}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{t("not_listed_desc")}</p>
            </div>
            <a href={BSCSCAN} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 border border-amber-500/20 hover:border-amber-500/40 px-3 py-1.5 rounded-lg transition-all flex-shrink-0">
              {t("view_bscscan")} <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Powered by footer */}
      <div className="text-center pb-4">
        <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">{t("powered_by")} · {t("contract_verified")}</p>
      </div>
    </div>
  );
}

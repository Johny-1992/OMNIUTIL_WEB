import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import {
  ExternalLink, CheckCircle2, XCircle, Clock, AlertTriangle,
  Copy, Check, ChevronRight, Rocket, Zap, Globe, Shield,
  TrendingUp, RefreshCw
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

const CONTRACT = "0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B";
const BSCSCAN = `https://bscscan.com/token/${CONTRACT}`;

const BASE_URL = import.meta.env.BASE_URL ?? "/";
const API = BASE_URL.replace(/\/$/, "") + "/api";

interface ListingPlatform {
  id: string;
  name: string;
  tier: number;
  priority: string;
  autoListing: boolean;
  listed: boolean;
  data: null | Record<string, unknown>;
  submitUrl: string;
  description: string;
  requirements?: string[];
}

interface ListingStatus {
  checkedAt: string;
  contractAddress: string;
  hasDexPair: boolean;
  platforms: ListingPlatform[];
  nextSteps: string[];
}

const PANCAKE_URL = `https://pancakeswap.finance/add/BNB/${CONTRACT}`;
const PANCAKE_V3_URL = `https://pancakeswap.finance/liquidity/add?currencyA=BNB&currencyB=${CONTRACT}`;

const TIER_LABEL: Record<number, string> = {
  1: "TIER 1 — Références mondiales",
  2: "TIER 2 — DEX & Explorateurs",
  3: "TIER 3 — Agrégateurs additionnels",
};

const PRIORITY_COLOR: Record<string, string> = {
  CRITIQUE: "text-red-400 bg-red-500/10 border-red-500/20",
  ÉLEVÉE: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  MOYENNE: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  BASSE: "text-zinc-400 bg-zinc-500/10 border-zinc-500/20",
};

function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, copy };
}

const TOKEN_METADATA = {
  name: "OmniUtil",
  symbol: "UTIL",
  decimals: 18,
  contract: CONTRACT,
  network: "Binance Smart Chain (BSC)",
  chainId: 56,
  type: "BEP-20",
  totalSupply: "1,000,000 UTIL",
  maxAnnualMint: "10,000,000 UTIL",
  creatorFee: "0.5%",
  treasuryFee: "0.5%",
  website: "https://omniutil.app",
  description: "Universal on-chain consumption reward infrastructure. An AI coordinator on BSC that automatically rewards users of any ecosystem (telecom, banking, e-commerce, hospitality, betting) with UTIL tokens based on real spending.",
  tags: ["reward", "defi", "bep20", "loyalty", "ai", "infrastructure"],
  bscscan: BSCSCAN,
  logo: "https://omniutil.app/logo.png",
};

export default function Listing() {
  const { t } = useI18n();
  const [status, setStatus] = useState<ListingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const contractCopy = useCopy(CONTRACT);
  const metaCopy = useCopy(JSON.stringify(TOKEN_METADATA, null, 2));

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API}/token/listing-status`);
      if (r.ok) {
        const data = await r.json() as ListingStatus;
        setStatus(data);
        setLastRefresh(new Date());
      }
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { fetchStatus(); }, [fetchStatus]);

  const listedCount = status?.platforms.filter(p => p.listed).length ?? 0;
  const totalCount = status?.platforms.length ?? 12;

  return (
    <div className="min-h-screen bg-[#060606] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-mono mb-2">
            <Globe className="w-3 h-3" />
            LISTING COMMAND CENTER
          </div>
          <h1 className="text-4xl font-black tracking-tight">
            Déploiement mondial de{" "}
            <span className="text-amber-400">UTIL</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Statut en temps réel de votre token sur toutes les plateformes de listing crypto mondiales.
            Suivez, soumettez, dominez.
          </p>
        </motion.div>

        {/* Global Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0e0e0e] border border-[#1c1c1c] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">Couverture mondiale</div>
              <div className="text-3xl font-black">
                <span className="text-amber-400">{listedCount}</span>
                <span className="text-zinc-600"> / {totalCount}</span>
                <span className="text-sm font-normal text-zinc-500 ml-2">plateformes</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {lastRefresh && (
                <div className="text-xs text-zinc-600 font-mono">
                  {lastRefresh.toLocaleTimeString()}
                </div>
              )}
              <Button
                onClick={fetchStatus}
                disabled={loading}
                variant="outline"
                size="sm"
                className="border-[#2a2a2a] text-zinc-400 hover:text-white bg-transparent text-xs"
              >
                <RefreshCw className={`w-3 h-3 mr-1.5 ${loading ? "animate-spin" : ""}`} />
                Actualiser
              </Button>
            </div>
          </div>
          <div className="h-2 bg-[#1c1c1c] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
              initial={{ width: 0 }}
              animate={{ width: `${(listedCount / totalCount) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <div className="mt-2 text-xs text-zinc-600 font-mono">
            {Math.round((listedCount / totalCount) * 100)}% de couverture mondiale
          </div>
        </motion.div>

        {/* CRITICAL: PancakeSwap DEX Pair */}
        {status && !status.hasDexPair && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="bg-red-950/20 border border-red-500/30 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1">
                <div className="text-red-400 font-bold text-sm mb-1 font-mono uppercase tracking-wider">
                  ACTION PRIORITAIRE — Aucune paire DEX détectée
                </div>
                <p className="text-zinc-300 text-sm mb-4">
                  Sans paire PancakeSwap, <strong className="text-white">DexScreener, DexTools, GeckoTerminal</strong> ne peuvent pas lister UTIL automatiquement.
                  C'est le déclencheur de tous les listings Tier 2.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={PANCAKE_URL} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs">
                      <Rocket className="w-3.5 h-3.5 mr-1.5" />
                      Créer paire UTIL/BNB — PancakeSwap V2
                    </Button>
                  </a>
                  <a href={PANCAKE_V3_URL} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="border-amber-500/30 text-amber-400 hover:text-amber-300 bg-transparent text-xs">
                      <Zap className="w-3.5 h-3.5 mr-1.5" />
                      Paire V3 (concentrée)
                    </Button>
                  </a>
                </div>
                <p className="text-zinc-600 text-xs mt-3">
                  Après création de la paire : listing automatique en moins de 5 minutes sur DexScreener, DexTools et GeckoTerminal.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Next Steps */}
        {status?.nextSteps && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0a0a0a] border border-amber-500/10 rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-amber-400 font-mono uppercase tracking-wider">Prochaines étapes</span>
            </div>
            <div className="space-y-2">
              {status.nextSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Platforms by Tier */}
        {[1, 2, 3].map((tier) => {
          const platforms = status?.platforms.filter(p => p.tier === tier) ?? [];
          if (!platforms.length) return null;
          return (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * tier }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-[#1c1c1c]" />
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest whitespace-nowrap">
                  {TIER_LABEL[tier]}
                </span>
                <div className="h-px flex-1 bg-[#1c1c1c]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {platforms.map((p) => (
                  <PlatformCard key={p.id} platform={p} hasDexPair={status?.hasDexPair ?? false} />
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Token Metadata Generator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[#0e0e0e] border border-[#1c1c1c] rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-white">Métadonnées Universelles du Token</span>
              <span className="text-xs text-zinc-600 font-mono">— copier/coller pour toute soumission</span>
            </div>
            <Button
              onClick={metaCopy.copy}
              variant="outline"
              size="sm"
              className="border-[#2a2a2a] text-zinc-400 hover:text-white bg-transparent text-xs"
            >
              {metaCopy.copied ? <Check className="w-3 h-3 mr-1.5 text-green-400" /> : <Copy className="w-3 h-3 mr-1.5" />}
              {metaCopy.copied ? "Copié !" : "Copier JSON"}
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Nom", value: TOKEN_METADATA.name },
              { label: "Symbole", value: TOKEN_METADATA.symbol },
              { label: "Réseau", value: "BSC Mainnet" },
              { label: "Standard", value: TOKEN_METADATA.type },
              { label: "Décimales", value: String(TOKEN_METADATA.decimals) },
              { label: "Supply totale", value: TOKEN_METADATA.totalSupply },
              { label: "Frais créateur", value: TOKEN_METADATA.creatorFee },
              { label: "Frais trésorerie", value: TOKEN_METADATA.treasuryFee },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#0a0a0a] border border-[#1c1c1c] rounded-lg p-3">
                <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-sm font-bold text-white truncate">{value}</div>
              </div>
            ))}
          </div>

          {/* Contract Address */}
          <div className="bg-[#0a0a0a] border border-amber-500/10 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Adresse du contrat (BSC Mainnet)</div>
                <div className="font-mono text-sm text-amber-400">{CONTRACT}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={contractCopy.copy}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-[#2a2a2a] flex items-center justify-center hover:bg-white/10 transition-all"
                >
                  {contractCopy.copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                </button>
                <a href={BSCSCAN} target="_blank" rel="noopener noreferrer"
                   className="w-8 h-8 rounded-lg bg-white/5 border border-[#2a2a2a] flex items-center justify-center hover:bg-amber-500/10 hover:border-amber-500/30 transition-all">
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Description for listings */}
          <div className="mt-4 bg-[#0a0a0a] border border-[#1c1c1c] rounded-xl p-4">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Description (pour formulaires de listing)</div>
            <p className="text-sm text-zinc-300 leading-relaxed">{TOKEN_METADATA.description}</p>
          </div>
        </motion.div>

        {/* Submit Links by platform */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#0e0e0e] border border-[#1c1c1c] rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <Rocket className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-white">Liens de soumission directe</span>
          </div>
          <div className="space-y-2">
            {status?.platforms
              .filter(p => !p.listed && !p.autoListing)
              .sort((a, b) => a.tier - b.tier)
              .map((p) => (
                <a
                  key={p.id}
                  href={p.submitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-[#1c1c1c] hover:border-amber-500/20 hover:bg-amber-500/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded border font-bold ${PRIORITY_COLOR[p.priority]}`}>
                      {p.priority}
                    </span>
                    <span className="text-sm text-white font-medium">{p.name}</span>
                    <span className="text-xs text-zinc-600">{p.description.split(".")[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono group-hover:gap-2.5 transition-all">
                    Soumettre
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </a>
              ))}
            {status?.platforms.filter(p => !p.listed && !p.autoListing).length === 0 && (
              <div className="text-center text-zinc-600 text-sm py-4">Toutes les plateformes manuelles ont été soumises.</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PlatformCard({ platform: p, hasDexPair }: { platform: ListingPlatform; hasDexPair: boolean }) {
  const isAutoUnlocked = p.autoListing && hasDexPair;
  const effectiveListed = p.listed || isAutoUnlocked;

  return (
    <div className={`relative bg-[#0e0e0e] border rounded-xl p-4 transition-all ${
      effectiveListed
        ? "border-green-500/20 bg-green-950/10"
        : p.autoListing
        ? "border-amber-500/15"
        : "border-[#1c1c1c]"
    }`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 ${
            effectiveListed ? "bg-green-500/20 border-green-500/30" : "bg-[#1a1a1a] border-[#2a2a2a]"
          }`}>
            {effectiveListed
              ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
              : p.autoListing
              ? <Zap className="w-3.5 h-3.5 text-amber-400" />
              : <XCircle className="w-3.5 h-3.5 text-zinc-600" />
            }
          </div>
          <div>
            <div className="text-sm font-bold text-white">{p.name}</div>
            <div className={`text-[9px] font-mono px-1.5 py-0.5 rounded border inline-block mt-0.5 ${PRIORITY_COLOR[p.priority]}`}>
              {p.priority}
            </div>
          </div>
        </div>
        {p.autoListing && (
          <div className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 whitespace-nowrap flex-shrink-0">
            AUTO
          </div>
        )}
      </div>

      <p className="text-xs text-zinc-500 mb-3 leading-relaxed">{p.description}</p>

      {!effectiveListed && p.requirements && (
        <div className="mb-3 space-y-1">
          {p.requirements.slice(0, 2).map((req, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-600">
              <span className="text-amber-500/60 mt-0.5">→</span>
              {req}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1.5 text-xs font-mono ${
          effectiveListed ? "text-green-400" : "text-zinc-600"
        }`}>
          {effectiveListed ? (
            <><CheckCircle2 className="w-3 h-3" /> Listé</>
          ) : p.autoListing ? (
            <><Clock className="w-3 h-3 text-amber-500" /><span className="text-amber-500">Automatique après DEX</span></>
          ) : (
            <><XCircle className="w-3 h-3" /> Non listé</>
          )}
        </div>
        {p.submitUrl && (
          <a
            href={p.submitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-zinc-600 hover:text-amber-400 transition-colors group"
          >
            {effectiveListed ? "Voir" : "Soumettre"}
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );
}

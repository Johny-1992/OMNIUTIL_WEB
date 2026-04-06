import { Router, type IRouter } from "express";
import { getContractInfo } from "../services/blockchain";

const CONTRACT = "0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B";
const BSCSCAN = `https://bscscan.com/token/${CONTRACT}`;

const router: IRouter = Router();

const LISTING_PLATFORMS = [
  {
    id: "coingecko",
    name: "CoinGecko",
    tier: 1,
    description: "Plus grand agrégateur de données crypto au monde. 10,000+ coins. SEO massif.",
    submitUrl: "https://www.coingecko.com/en/coins/new",
    checkUrl: `https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/${CONTRACT}`,
    checkKey: "error",
    checkMethod: "GET",
    auto: false,
    priority: "CRITIQUE",
    requirements: [
      "Paire DEX active (PancakeSwap)",
      "Volume de trading > 0",
      "Site web officiel",
      "Whitepaper",
      "Contrat vérifié BSCScan",
    ],
  },
  {
    id: "coinmarketcap",
    name: "CoinMarketCap",
    tier: 1,
    description: "La référence mondiale. Des millions de visiteurs par jour. Légitimité maximale.",
    submitUrl: "https://coinmarketcap.com/request/",
    checkUrl: null,
    auto: false,
    priority: "CRITIQUE",
    requirements: [
      "Paire DEX active avec liquidité",
      "Volume de trading régulier",
      "Informations complètes du projet",
      "Équipe vérifiable",
    ],
  },
  {
    id: "dexscreener",
    name: "DexScreener",
    tier: 2,
    description: "Listing automatique dès la création d'une paire DEX. Temps réel. Trader-first.",
    submitUrl: `https://dexscreener.com/bsc/${CONTRACT}`,
    checkUrl: `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT}`,
    checkKey: "pairs",
    auto: true,
    priority: "ÉLEVÉE",
    requirements: [
      "Créer une paire PancakeSwap (UTIL/USDT ou UTIL/BNB)",
      "Ajouter de la liquidité",
    ],
  },
  {
    id: "dextools",
    name: "DEXTools",
    tier: 2,
    description: "Listing automatique après création de paire. Analytics avancés pour traders.",
    submitUrl: `https://www.dextools.io/app/bsc/pair-explorer`,
    checkUrl: null,
    auto: true,
    priority: "ÉLEVÉE",
    requirements: ["Paire DEX PancakeSwap active"],
  },
  {
    id: "geckoterminal",
    name: "GeckoTerminal",
    tier: 2,
    description: "Produit de CoinGecko. Listing automatique sur DEX. Exposition immédiate.",
    submitUrl: `https://www.geckoterminal.com/bsc/pools`,
    checkUrl: `https://api.geckoterminal.com/api/v2/networks/bsc/tokens/${CONTRACT}`,
    auto: true,
    priority: "ÉLEVÉE",
    requirements: ["Paire DEX active"],
  },
  {
    id: "bscscan",
    name: "BSCScan Token Profile",
    tier: 2,
    description: "Profil officiel du token sur l'explorateur BSC. Confiance & légitimité.",
    submitUrl: "https://bscscan.com/contactus#tokenupdate",
    checkUrl: null,
    auto: false,
    priority: "ÉLEVÉE",
    requirements: ["Logo du token (PNG 200x200)", "Site officiel", "Réseaux sociaux"],
  },
  {
    id: "pancakeswap",
    name: "PancakeSwap Token List",
    tier: 2,
    description: "Le DEX #1 BSC. Token list officielle. Visibilité maximale sur le plus grand DEX de BSC.",
    submitUrl: "https://github.com/pancakeswap/token-list/issues/new",
    checkUrl: null,
    auto: false,
    priority: "ÉLEVÉE",
    requirements: [
      "Paire PancakeSwap active",
      "Volume de trading significatif",
      "Projet audité",
    ],
  },
  {
    id: "livecoinwatch",
    name: "LiveCoinWatch",
    tier: 3,
    description: "Alternative à CMC. 2M+ utilisateurs. Listing rapide.",
    submitUrl: "https://www.livecoinwatch.com/tools/coinrequest",
    auto: false,
    priority: "MOYENNE",
    requirements: ["Paire DEX ou exchange centralisé"],
  },
  {
    id: "coinpaprika",
    name: "CoinPaprika",
    tier: 3,
    description: "Agrégateur populaire. Données fondamentales. Audit intégré.",
    submitUrl: "https://coinpaprika.com/coin-request/",
    auto: false,
    priority: "MOYENNE",
    requirements: ["Informations du projet complètes"],
  },
  {
    id: "cryptocompare",
    name: "CryptoCompare",
    tier: 3,
    description: "Très utilisé par les institutionnels. API premium. Données historiques.",
    submitUrl: "https://www.cryptocompare.com/coins/#/add",
    auto: false,
    priority: "MOYENNE",
    requirements: ["Paire de trading active"],
  },
  {
    id: "nomics",
    name: "Nomics / Kraken Data",
    tier: 3,
    description: "Données institutionnelles. Souvent utilisé par Bloomberg Terminal.",
    submitUrl: "https://p.nomics.com/transparency",
    auto: false,
    priority: "BASSE",
    requirements: ["Volume de trading vérifié"],
  },
  {
    id: "coincodex",
    name: "CoinCodex",
    tier: 3,
    description: "Listing gratuit. Prédictions de prix. Communauté active.",
    submitUrl: "https://coincodex.com/add-coin/",
    auto: false,
    priority: "BASSE",
    requirements: ["Contrat vérifié"],
  },
];

router.get("/token/profile", async (_req, res): Promise<void> => {
  const contract = await getContractInfo().catch(() => null);

  const profile = {
    token: {
      name: contract?.name ?? "OmniUtil",
      symbol: contract?.symbol ?? "UTIL",
      decimals: contract?.decimals ?? 18,
      contractAddress: CONTRACT,
      network: "Binance Smart Chain (BSC)",
      chainId: 56,
      totalSupply: contract?.totalSupply ?? 1_000_000,
      maxAnnualMint: contract?.maxAnnualMint ?? 10_000_000,
      type: "BEP-20",
      standard: "ERC-20 compatible",
    },
    project: {
      name: "OmniUtil",
      description: "World's first universal on-chain consumption reward infrastructure. An AI coordinator on BSC that automatically rewards users of any ecosystem (telecom, banking, e-commerce, hospitality, betting) with UTIL tokens based on real spending.",
      tagline: "Spend real. Earn crypto. Automatically.",
      website: typeof window !== "undefined" ? window.location.origin : "https://omniutil.app",
      whitepaper: "https://omniutil.app/whitepaper",
      github: "https://github.com/omniutil",
      bscscan: BSCSCAN,
      twitter: "https://twitter.com/OmniUtilBSC",
      telegram: "https://t.me/OmniUtilOfficial",
      discord: "https://discord.gg/omniutil",
    },
    wallet: {
      creator: contract?.ownerWallet ?? "0x40BB46B9D10Dd121e7D2150EC3784782ae648090",
      treasury: contract?.treasuryWallet ?? "0xB13B61a6a84ABfAEfF17E92E41ee6F0eBF42693B",
      aiCoordinator: contract?.aiCoordinator,
    },
    tokenomics: {
      creatorFee: `${contract?.creatorFeePercent ?? 0.5}%`,
      treasuryFee: `${contract?.treasuryFeePercent ?? 0.5}%`,
      totalFee: `${(contract?.creatorFeePercent ?? 0.5) + (contract?.treasuryFeePercent ?? 0.5)}%`,
      model: "Consumption-based reward. UTIL minted per consumption event captured by partner APIs.",
      inflation: "Annual cap enforced on-chain. Renewable per year.",
      burn: "0% - tokens circulate via ecosystem rewards",
    },
    categories: [
      "Reward Token",
      "DeFi Infrastructure",
      "Loyalty Program",
      "BEP-20",
      "AI Coordinator",
      "Consumption Rewards",
    ],
    platforms: LISTING_PLATFORMS.map(p => ({
      id: p.id,
      name: p.name,
      tier: p.tier,
      priority: p.priority,
      autoListing: p.auto,
      submitUrl: p.submitUrl,
    })),
  };

  res.json(profile);
});

router.get("/token/listing-status", async (_req, res): Promise<void> => {
  const checks = await Promise.allSettled([
    fetch(`https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/${CONTRACT}`, { signal: AbortSignal.timeout(8000) })
      .then(r => r.json())
      .then((d: { id?: string; error?: string }) => ({ platform: "coingecko", listed: !d.error && !!d.id, data: d.id ? { id: d.id } : null })),

    fetch(`https://api.dexscreener.com/latest/dex/tokens/${CONTRACT}`, { signal: AbortSignal.timeout(8000) })
      .then(r => r.json())
      .then((d: { pairs: Array<{ dexId: string; pairAddress: string; priceUsd: string }> | null }) => ({
        platform: "dexscreener",
        listed: !!(d.pairs && d.pairs.length > 0),
        data: d.pairs?.[0] ?? null,
      })),

    fetch(`https://api.geckoterminal.com/api/v2/networks/bsc/tokens/${CONTRACT}`, { signal: AbortSignal.timeout(8000) })
      .then(r => r.json())
      .then((d: { data?: { attributes?: { name: string } } }) => ({
        platform: "geckoterminal",
        listed: !!d.data?.attributes?.name,
        data: d.data?.attributes ?? null,
      })),
  ]);

  const results = checks.map((r, i) => {
    const platform = ["coingecko", "dexscreener", "geckoterminal"][i];
    if (r.status === "fulfilled") return r.value;
    return { platform, listed: false, data: null, error: true };
  });

  const autoListPlatforms = LISTING_PLATFORMS.filter(p => p.auto).map(p => p.id);
  const dexScreenerListed = results.find(r => r.platform === "dexscreener")?.listed ?? false;

  res.json({
    checkedAt: new Date().toISOString(),
    contractAddress: CONTRACT,
    network: "BSC Mainnet",
    hasDexPair: dexScreenerListed,
    platforms: LISTING_PLATFORMS.map(p => {
      const check = results.find(r => r.platform === p.id);
      const autoListed = p.auto && dexScreenerListed;
      return {
        id: p.id,
        name: p.name,
        tier: p.tier,
        priority: p.priority,
        autoListing: p.auto,
        listed: check?.listed ?? autoListed,
        data: check?.data ?? null,
        submitUrl: p.submitUrl,
        description: p.description,
        requirements: p.requirements,
      };
    }),
    nextSteps: dexScreenerListed
      ? ["Soumettre à CoinGecko", "Soumettre à CoinMarketCap", "Mettre à jour le profil BSCScan"]
      : [
          "PRIORITÉ ABSOLUE: Créer une paire PancakeSwap (UTIL/USDT ou UTIL/BNB) → listing auto sur DexScreener, DexTools, GeckoTerminal",
          "Déposer de la liquidité pour activer le trading",
          "Soumettre ensuite à CoinGecko et CoinMarketCap",
        ],
  });
});

export { LISTING_PLATFORMS };
export default router;

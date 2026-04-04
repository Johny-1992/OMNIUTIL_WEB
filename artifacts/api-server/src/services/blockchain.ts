import { ethers } from "ethers";

const BSC_RPC_URLS = [
  "https://bsc-dataseed.binance.org/",
  "https://bsc-dataseed1.defibit.io/",
  "https://bsc-dataseed1.ninicoin.io/",
  "https://bsc-dataseed2.defibit.io/",
];

const CONTRACT_ADDRESS = "0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B";

const UTIL_ABI = [
  "function totalSupply() view returns (uint256)",
  "function mintedThisYear() view returns (uint256)",
  "function MAX_ANNUAL_MINT() view returns (uint256)",
  "function CREATOR() view returns (address)",
  "function TREASURY() view returns (address)",
  "function AI_COORDINATOR() view returns (address)",
  "function lastInflationReset() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function CREATOR_FEE() view returns (uint256)",
  "function TREASURY_FEE() view returns (uint256)",
];

let _provider: ethers.JsonRpcProvider | null = null;
let _contract: ethers.Contract | null = null;
let _providerIndex = 0;

function getProvider(): ethers.JsonRpcProvider {
  if (!_provider) {
    _provider = new ethers.JsonRpcProvider(BSC_RPC_URLS[_providerIndex]);
  }
  return _provider;
}

function getContract(): ethers.Contract {
  if (!_contract) {
    _contract = new ethers.Contract(CONTRACT_ADDRESS, UTIL_ABI, getProvider());
  }
  return _contract;
}

function resetProvider() {
  _providerIndex = (_providerIndex + 1) % BSC_RPC_URLS.length;
  _provider = null;
  _contract = null;
}

async function callWithFallback<T>(fn: () => Promise<T>): Promise<T> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < BSC_RPC_URLS.length; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err as Error;
      resetProvider();
    }
  }
  throw lastError;
}

export interface ContractInfo {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  network: string;
  chainId: number;
  totalSupply: number;
  mintedThisYear: number;
  maxAnnualMint: number;
  remainingMintable: number;
  ownerWallet: string;
  treasuryWallet: string;
  aiCoordinator: string;
  lastInflationReset: string;
  creatorFeePercent: number;
  treasuryFeePercent: number;
  verified: boolean;
  explorerUrl: string;
}

export interface PriceInfo {
  priceUSDT: number | null;
  listed: boolean;
  source: string;
  contractAddress: string;
  network: string;
  explorerUrl: string;
  message: string;
}

const ONE_ETHER = BigInt("1000000000000000000");

export async function getContractInfo(): Promise<ContractInfo> {
  return callWithFallback(async () => {
    const contract = getContract();
    const provider = getProvider();

    const [
      name,
      symbol,
      decimals,
      totalSupplyRaw,
      mintedThisYearRaw,
      maxAnnualMintRaw,
      creator,
      treasury,
      aiCoordinator,
      lastInflationResetRaw,
      network,
    ] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply(),
      contract.mintedThisYear(),
      contract.MAX_ANNUAL_MINT(),
      contract.CREATOR(),
      contract.TREASURY(),
      contract.AI_COORDINATOR(),
      contract.lastInflationReset(),
      provider.getNetwork(),
    ]);

    let creatorFeePercent = 0.5;
    let treasuryFeePercent = 0.5;
    try {
      const [creatorFeeRaw, treasuryFeeRaw] = await Promise.all([
        contract.CREATOR_FEE(),
        contract.TREASURY_FEE(),
      ]);
      creatorFeePercent = Number(creatorFeeRaw) / 10;
      treasuryFeePercent = Number(treasuryFeeRaw) / 10;
    } catch {
    }

    const dec = Number(decimals);
    const divisor = BigInt(10) ** BigInt(dec);

    const totalSupply = Number(BigInt(totalSupplyRaw) / divisor);
    const mintedThisYear = Number(BigInt(mintedThisYearRaw) / divisor);
    const maxAnnualMint = Number(BigInt(maxAnnualMintRaw) / divisor);
    const lastReset = new Date(Number(lastInflationResetRaw) * 1000).toISOString();

    return {
      address: CONTRACT_ADDRESS,
      name: String(name),
      symbol: String(symbol),
      decimals: dec,
      network: "BSC Mainnet",
      chainId: Number(network.chainId),
      totalSupply,
      mintedThisYear,
      maxAnnualMint,
      remainingMintable: maxAnnualMint - mintedThisYear,
      ownerWallet: String(creator),
      treasuryWallet: String(treasury),
      aiCoordinator: String(aiCoordinator),
      lastInflationReset: lastReset,
      creatorFeePercent,
      treasuryFeePercent,
      verified: true,
      explorerUrl: `https://bscscan.com/token/${CONTRACT_ADDRESS}`,
    };
  });
}

export async function getUtilPrice(): Promise<PriceInfo> {
  const explorerUrl = `https://bscscan.com/token/${CONTRACT_ADDRESS}`;

  try {
    const dexRes = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (dexRes.ok) {
      const data = await dexRes.json() as { pairs: Array<{ priceUsd: string; dexId: string; pairAddress: string }> | null };
      if (data.pairs && data.pairs.length > 0) {
        const pair = data.pairs[0];
        return {
          priceUSDT: parseFloat(pair.priceUsd),
          listed: true,
          source: `DexScreener / ${pair.dexId}`,
          contractAddress: CONTRACT_ADDRESS,
          network: "BSC Mainnet",
          explorerUrl,
          message: "Prix en temps réel depuis le DEX",
        };
      }
    }
  } catch {
  }

  try {
    const cgRes = await fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/binance-smart-chain?contract_addresses=${CONTRACT_ADDRESS}&vs_currencies=usd`,
      { signal: AbortSignal.timeout(8000) }
    );
    if (cgRes.ok) {
      const data = await cgRes.json() as Record<string, { usd?: number }>;
      const lowerKey = CONTRACT_ADDRESS.toLowerCase();
      if (data[lowerKey]?.usd) {
        return {
          priceUSDT: data[lowerKey].usd!,
          listed: true,
          source: "CoinGecko",
          contractAddress: CONTRACT_ADDRESS,
          network: "BSC Mainnet",
          explorerUrl,
          message: "Prix en temps réel depuis CoinGecko",
        };
      }
    }
  } catch {
  }

  return {
    priceUSDT: null,
    listed: false,
    source: "BSCScan",
    contractAddress: CONTRACT_ADDRESS,
    network: "BSC Mainnet",
    explorerUrl,
    message: "Token non encore listé sur DEX. Vérifiez BSCScan pour la valeur d'échange actuelle.",
  };
}

export async function getWalletBalance(address: string): Promise<number> {
  return callWithFallback(async () => {
    const contract = getContract();
    const raw = await contract.balanceOf(address);
    const dec = await contract.decimals();
    const divisor = BigInt(10) ** BigInt(Number(dec));
    return Number(BigInt(raw) / divisor);
  });
}

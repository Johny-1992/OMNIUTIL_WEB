const envConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'OMNIUTIL INFRASTRUCTURE',
  siteVariant: process.env.NEXT_PUBLIC_SITE_VARIANT || 'v9.0-SOUVERAIN',
  siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Infrastructure mondiale de récompense sur consommation réelle (CPU + IA).",
  ogUrl: process.env.NEXT_PUBLIC_OG_URL || 'https://omniutil-web.vercel.app',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  partnerApiPath: process.env.NEXT_PUBLIC_PARTNER_API_PATH || '/api/graft',
  claimApiPath: process.env.NEXT_PUBLIC_CLAIM_API_PATH || '/api/claim',
  exchangeApiPath: process.env.NEXT_PUBLIC_EXCHANGE_API_PATH || '/api/exchange',
  utilPrice: Number(process.env.NEXT_PUBLIC_UTIL_PRICE || 3.65),
  utilPriceAnchor: Number(process.env.NEXT_PUBLIC_UTIL_PRICE_ANCHOR || process.env.UTIL_PRICE_ANCHOR || 3650.96),
  contractBsc: process.env.NEXT_PUBLIC_CONTRACT_BSC || process.env.CONTRACT_BSC || '0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B',
  ownerWallet: process.env.NEXT_PUBLIC_OWNER_WALLET || process.env.OWNER_WALLET || '0x40BB46B9D10Dd121e7D2150EC3784782ae648090',
  deploymentBranch: process.env.NEXT_PUBLIC_DEPLOYMENT_BRANCH || 'v0/johny-1992',
  federatedSource: process.env.NEXT_PUBLIC_FEDERATED_SOURCE || 'omniutil-web',
};

export default envConfig;

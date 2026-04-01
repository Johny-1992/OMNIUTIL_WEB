export const OMNI_CORE_ENGINE = {
  OWNER_WALLET: "0x40BB46B9D10Dd121e7D2150EC3784782ae648090",
  TREASURY_WALLET: "0xB13B61a6a84ABfAEfF17E92E41ee6F0eBF42693B",
  BASE_PRICE_UTIL: 3650,
  AUTHOR_FEE: 0.005, // 0.5%
  INFRA_SUPPORT_FEE: 0.005, // 0.5%
  
  calculateMerit: (spentAmount: number, currencyRate: number, ctoRate: number) => {
    const merit = (spentAmount * currencyRate * (ctoRate / 100)) / OMNI_CORE_ENGINE.BASE_PRICE_UTIL;
    const taxes = merit * (OMNI_CORE_ENGINE.AUTHOR_FEE + OMNI_CORE_ENGINE.INFRA_SUPPORT_FEE);
    return { meritDistributable: merit - taxes, totalTax: taxes };
  }
};

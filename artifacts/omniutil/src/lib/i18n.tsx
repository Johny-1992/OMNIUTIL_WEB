import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "FR" | "EN" | "ES" | "ZH" | "AR" | "HI" | "PT";

const translations: Record<Language, Record<string, string>> = {
  FR: {
    hero_title: "L'Infrastructure Mondiale de Récompenses sur Consommation Réelle",
    integrate_btn: "Greffer votre écosystème",
    total_partners: "Partenaires",
    total_users: "Utilisateurs",
    total_rewards: "Récompenses",
    price: "Prix UTIL",
    admin_dash: "Coordinateur IA Global",
    partner_dash: "Tableau de Bord Partenaire",
    users_explorer: "Explorateur Utilisateurs",
    partners_dir: "Annuaire Partenaires",
    apply: "Devenir Partenaire",
    language: "Langue",
    description: "OmniUtil est le premier système d'infrastructure de récompense sur la consommation universelle. Un coordinateur IA sur la BSC qui récompense automatiquement vos utilisateurs.",
    apply_step1: "Identification",
    apply_step2: "Taux de récompense",
    apply_step3: "API de Facturation",
    apply_step4: "Conditions",
    apply_step5: "Validation",
    apply_submit: "Soumettre",
    next: "Suivant",
    prev: "Précédent",
    name: "Nom",
    email: "Email",
    ecosystem_type: "Type d'écosystème",
    wallet: "Portefeuille BSC",
    reward_rate: "Taux de récompense (%)",
    api_endpoint: "Endpoint API",
    terms: "Accepter les conditions",
  },
  EN: {
    hero_title: "The Global Infrastructure for Real Consumption Rewards",
    integrate_btn: "Integrate your ecosystem",
    total_partners: "Partners",
    total_users: "Users",
    total_rewards: "Rewards",
    price: "UTIL Price",
    admin_dash: "Global AI Coordinator",
    partner_dash: "Partner Dashboard",
    users_explorer: "Users Explorer",
    partners_dir: "Partners Directory",
    apply: "Become a Partner",
    language: "Language",
    description: "OmniUtil is the first universal consumption reward infrastructure system. An AI coordinator on BSC that automatically rewards your users.",
    apply_step1: "Identification",
    apply_step2: "Reward Rate",
    apply_step3: "Billing API",
    apply_step4: "Terms",
    apply_step5: "Validation",
    apply_submit: "Submit",
    next: "Next",
    prev: "Previous",
    name: "Name",
    email: "Email",
    ecosystem_type: "Ecosystem Type",
    wallet: "BSC Wallet",
    reward_rate: "Reward Rate (%)",
    api_endpoint: "API Endpoint",
    terms: "Accept Terms",
  },
  ES: {
    hero_title: "La Infraestructura Global de Recompensas de Consumo Real",
    integrate_btn: "Integra tu ecosistema",
    total_partners: "Socios",
    total_users: "Usuarios",
    total_rewards: "Recompensas",
    price: "Precio UTIL",
    admin_dash: "Coordinador de IA Global",
    partner_dash: "Panel de Socios",
    users_explorer: "Explorador de Usuarios",
    partners_dir: "Directorio de Socios",
    apply: "Convertirse en Socio",
    language: "Idioma",
    description: "OmniUtil es el primer sistema de infraestructura de recompensas de consumo universal.",
    apply_step1: "Identificación",
    apply_step2: "Tasa de recompensa",
    apply_step3: "API de Facturación",
    apply_step4: "Términos",
    apply_step5: "Validación",
    apply_submit: "Enviar",
    next: "Siguiente",
    prev: "Anterior",
    name: "Nombre",
    email: "Correo electrónico",
    ecosystem_type: "Tipo de ecosistema",
    wallet: "Billetera BSC",
    reward_rate: "Tasa de recompensa (%)",
    api_endpoint: "Endpoint API",
    terms: "Aceptar Términos",
  },
  ZH: {
    hero_title: "全球真实消费奖励基础设施",
    integrate_btn: "整合您的生态系统",
    total_partners: "合作伙伴",
    total_users: "用户",
    total_rewards: "奖励",
    price: "UTIL 价格",
    admin_dash: "全球AI协调器",
    partner_dash: "合作伙伴面板",
    users_explorer: "用户浏览器",
    partners_dir: "合作伙伴目录",
    apply: "成为合作伙伴",
    language: "语言",
    description: "OmniUtil 是首个通用消费奖励基础设施系统。",
    apply_step1: "认证",
    apply_step2: "奖励率",
    apply_step3: "计费 API",
    apply_step4: "条款",
    apply_step5: "验证",
    apply_submit: "提交",
    next: "下一步",
    prev: "上一步",
    name: "名称",
    email: "邮箱",
    ecosystem_type: "生态系统类型",
    wallet: "BSC 钱包",
    reward_rate: "奖励率 (%)",
    api_endpoint: "API 接口",
    terms: "接受条款",
  },
  AR: {
    hero_title: "البنية التحتية العالمية لمكافآت الاستهلاك الحقيقي",
    integrate_btn: "ادمج نظامك البيئي",
    total_partners: "الشركاء",
    total_users: "المستخدمين",
    total_rewards: "المكافآت",
    price: "سعر UTIL",
    admin_dash: "المنسق الذكي العالمي",
    partner_dash: "لوحة تحكم الشريك",
    users_explorer: "مستكشف المستخدمين",
    partners_dir: "دليل الشركاء",
    apply: "كن شريكاً",
    language: "اللغة",
    description: "OmniUtil هو أول نظام بنية تحتية عالمي لمكافآت الاستهلاك.",
    apply_step1: "تحديد",
    apply_step2: "معدل المكافأة",
    apply_step3: "واجهة الفواتير",
    apply_step4: "الشروط",
    apply_step5: "التحقق",
    apply_submit: "إرسال",
    next: "التالي",
    prev: "السابق",
    name: "الاسم",
    email: "البريد الإلكتروني",
    ecosystem_type: "نوع النظام البيئي",
    wallet: "محفظة BSC",
    reward_rate: "معدل المكافأة (%)",
    api_endpoint: "رابط واجهة برمجة التطبيقات",
    terms: "قبول الشروط",
  },
  HI: {
    hero_title: "वास्तविक खपत पुरस्कारों के लिए वैश्विक बुनियादी ढांचा",
    integrate_btn: "अपने पारिस्थितिकी तंत्र को एकीकृत करें",
    total_partners: "भागीदार",
    total_users: "उपयोगकर्ता",
    total_rewards: "पुरस्कार",
    price: "UTIL मूल्य",
    admin_dash: "ग्लोबल AI कोऑर्डिनेटर",
    partner_dash: "पार्टनर डैशबोर्ड",
    users_explorer: "उपयोगकर्ता एक्सप्लोरर",
    partners_dir: "पार्टनर निर्देशिका",
    apply: "भागीदार बनें",
    language: "भाषा",
    description: "OmniUtil पहला सार्वभौमिक खपत इनाम बुनियादी ढांचा प्रणाली है।",
    apply_step1: "पहचान",
    apply_step2: "इनाम दर",
    apply_step3: "बिलिंग API",
    apply_step4: "शर्तें",
    apply_step5: "सत्यापन",
    apply_submit: "जमा करें",
    next: "अगला",
    prev: "पिछला",
    name: "नाम",
    email: "ईमेल",
    ecosystem_type: "पारिस्थितिकी तंत्र का प्रकार",
    wallet: "BSC वॉलेट",
    reward_rate: "इनाम दर (%)",
    api_endpoint: "API एंडपॉइंट",
    terms: "शर्तें स्वीकार करें",
  },
  PT: {
    hero_title: "A Infraestrutura Global de Recompensas de Consumo Real",
    integrate_btn: "Integre seu ecossistema",
    total_partners: "Parceiros",
    total_users: "Usuários",
    total_rewards: "Recompensas",
    price: "Preço UTIL",
    admin_dash: "Coordenador de IA Global",
    partner_dash: "Painel do Parceiro",
    users_explorer: "Explorador de Usuários",
    partners_dir: "Diretório de Parceiros",
    apply: "Torne-se um Parceiro",
    language: "Idioma",
    description: "OmniUtil é o primeiro sistema de infraestrutura de recompensas de consumo universal.",
    apply_step1: "Identificação",
    apply_step2: "Taxa de Recompensa",
    apply_step3: "API de Faturamento",
    apply_step4: "Termos",
    apply_step5: "Validação",
    apply_submit: "Enviar",
    next: "Próximo",
    prev: "Anterior",
    name: "Nome",
    email: "E-mail",
    ecosystem_type: "Tipo de Ecossistema",
    wallet: "Carteira BSC",
    reward_rate: "Taxa de Recompensa (%)",
    api_endpoint: "Endpoint da API",
    terms: "Aceitar Termos",
  },
};

const flags: Record<Language, string> = {
  FR: "🇫🇷",
  EN: "🇬🇧",
  ES: "🇪🇸",
  ZH: "🇨🇳",
  AR: "🇦🇪",
  HI: "🇮🇳",
  PT: "🇵🇹",
};

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  flags: Record<Language, string>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("lang");
    return (saved as Language) || "FR";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    if (lang === "AR") {
      document.dir = "rtl";
    } else {
      document.dir = "ltr";
    }
  }, [lang]);

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t, flags }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { useCreatePartnerApplication } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle2, ChevronRight, Zap, ExternalLink,
  Building2, Coins, Globe, FileCheck, Send
} from "lucide-react";

const CONTRACT = "0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B";

type EcoType = "mobile" | "tv" | "ebank" | "ecommerce" | "casino" | "hotel" | "sports_betting" | "supermarket" | "bar" | "network" | "other";

const ECOSYSTEM_TYPES: { value: EcoType; icon: string }[] = [
  { value: "mobile", icon: "📡" },
  { value: "tv", icon: "📺" },
  { value: "ebank", icon: "🏦" },
  { value: "ecommerce", icon: "🛒" },
  { value: "casino", icon: "🎰" },
  { value: "hotel", icon: "🏨" },
  { value: "sports_betting", icon: "⚽" },
  { value: "supermarket", icon: "🛍️" },
  { value: "bar", icon: "🍸" },
  { value: "network", icon: "🌐" },
  { value: "other", icon: "⚙️" },
];

const STEP_ICONS = [
  <Building2 className="w-4 h-4" />,
  <Coins className="w-4 h-4" />,
  <Globe className="w-4 h-4" />,
  <FileCheck className="w-4 h-4" />,
  <Send className="w-4 h-4" />,
];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-300 ${
            i + 1 < current ? "bg-green-500/20 text-green-400 border border-green-500/30" :
            i + 1 === current ? "bg-amber-500/20 text-amber-400 border border-amber-500/40" :
            "bg-white/3 text-zinc-600 border border-[#1a1a1a]"
          }`}>
            {i + 1 < current ? <CheckCircle2 className="w-3 h-3" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-px w-6 transition-all duration-300 ${i + 1 < current ? "bg-green-500/30" : "bg-[#1a1a1a]"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({
  label, children, required
}: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-zinc-400 flex items-center gap-1">
        {label} {required && <span className="text-amber-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = "w-full bg-black/40 border border-[#1c1c1c] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10 transition-all font-mono";

export default function PartnerApply() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const createApplication = useCreatePartnerApplication();
  const [walletError, setWalletError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    ecosystemType: "mobile" as EcoType,
    contactName: "",
    contactEmail: "",
    country: "",
    estimatedUsers: 0,
    description: "",
    walletAddress: "",
    rewardRate: 2,
    billingApiEndpoint: "",
    billingApiKey: "",
    acceptedTerms: false,
  });

  const update = (patch: Partial<typeof formData>) =>
    setFormData(prev => ({ ...prev, ...patch }));

  const validateWallet = (v: string) => {
    if (!v.startsWith("0x") || v.length !== 42) {
      setWalletError(t("wallet_invalid"));
      return false;
    }
    setWalletError("");
    return true;
  };

  const handleNext = () => {
    if (step === 2 && formData.walletAddress && !validateWallet(formData.walletAddress)) return;
    setStep(s => s + 1);
  };

  const handleSubmit = () => {
    if (!formData.acceptedTerms) return;
    if (formData.walletAddress && !validateWallet(formData.walletAddress)) return;
    createApplication.mutate(
      { data: formData },
      {
        onSuccess: () => { setStep(6); },
        onError: () => {
          toast({ title: "Erreur", description: "Échec de la soumission. Réessayez.", variant: "destructive" });
        }
      }
    );
  };

  if (step === 6) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md space-y-5"
        >
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            <div className="relative w-20 h-20 bg-[#0c0c0c] border border-green-500/30 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-green-400" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-white">{t("step_complete")}</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">{t("step_complete_desc")}</p>
          <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl p-4 text-left space-y-2">
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Récapitulatif</p>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Entreprise</span>
              <span className="text-white font-mono">{formData.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Taux UTIL</span>
              <span className="text-amber-400 font-mono">{formData.rewardRate}%</span>
            </div>
          </div>
          <a href={`https://bscscan.com/token/${CONTRACT}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-amber-400 transition-colors">
            {t("view_bscscan")} <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/8 border border-amber-500/15 text-amber-400 text-xs font-mono mb-4 tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            {t("ecosystem_gateway")}
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">{t("apply")}</h1>
          <p className="text-xs text-zinc-500 mt-2">{t("live_bsc")}</p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mb-6">
          <StepIndicator current={step} total={5} />
        </div>

        {/* Card */}
        <div className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">

          {/* Step Header */}
          <div className="flex items-center justify-between p-5 border-b border-[#141414] bg-[#0a0a0a]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                {STEP_ICONS[step - 1]}
              </div>
              <h2 className="text-sm font-bold text-white">{t(`apply_step${step}`)}</h2>
            </div>
            <span className="text-[10px] font-mono text-amber-400/60">{step} / 5</span>
          </div>

          {/* Step Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <Field label={t("name")} required>
                    <input className={inputClass} placeholder="Airtel Africa, Canal+, Orange Money..." value={formData.name} onChange={e => update({ name: e.target.value })} />
                  </Field>

                  <Field label={t("ecosystem_type")} required>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {ECOSYSTEM_TYPES.map(eco => (
                        <button
                          key={eco.value}
                          type="button"
                          onClick={() => update({ ecosystemType: eco.value })}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border text-center transition-all ${
                            formData.ecosystemType === eco.value
                              ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                              : "bg-black/20 border-[#1c1c1c] text-zinc-500 hover:border-[#2a2a2a] hover:text-zinc-300"
                          }`}
                        >
                          <span className="text-xl">{eco.icon}</span>
                          <span className="text-[9px] font-mono leading-tight">
                            {t(`ecosystem_${eco.value}`).split(" ")[0]}
                          </span>
                        </button>
                      ))}
                    </div>
                  </Field>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label={t("contact_name")}>
                      <input className={inputClass} placeholder="CEO, CTO..." value={formData.contactName} onChange={e => update({ contactName: e.target.value })} />
                    </Field>
                    <Field label={t("country")}>
                      <input className={inputClass} placeholder="Cameroun, Côte d'Ivoire..." value={formData.country} onChange={e => update({ country: e.target.value })} />
                    </Field>
                  </div>

                  <Field label={t("email")} required>
                    <input className={inputClass} type="email" placeholder="ceo@airtel.africa" value={formData.contactEmail} onChange={e => update({ contactEmail: e.target.value })} />
                  </Field>

                  <Field label={t("estimated_users")}>
                    <input className={inputClass} type="number" min={0} placeholder="1000000" value={formData.estimatedUsers || ""} onChange={e => update({ estimatedUsers: parseInt(e.target.value) || 0 })} />
                  </Field>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <Field label={t("wallet")}>
                    <input
                      className={`${inputClass} ${walletError ? "border-red-500/40 focus:border-red-500/60" : ""}`}
                      placeholder="0x..."
                      value={formData.walletAddress}
                      onChange={e => { update({ walletAddress: e.target.value }); setWalletError(""); }}
                      onBlur={e => e.target.value && validateWallet(e.target.value)}
                    />
                    {walletError && <p className="text-xs text-red-400 mt-1">{walletError}</p>}
                    <p className="text-[10px] text-zinc-600 mt-1">Ce wallet recevra les frais de réseau UTIL</p>
                  </Field>

                  <Field label={`${t("reward_rate")} — ${formData.rewardRate}%`} required>
                    <div className="space-y-3 pt-1">
                      <Slider
                        min={0.1}
                        max={20}
                        step={0.1}
                        value={[formData.rewardRate]}
                        onValueChange={([v]) => update({ rewardRate: v })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                        <span>0.1% min</span>
                        <div className="text-center">
                          <span className="text-lg font-black text-amber-400">{formData.rewardRate}%</span>
                          <span className="block text-zinc-600">par UTIL distribué</span>
                        </div>
                        <span>20% max</span>
                      </div>
                    </div>
                  </Field>

                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-3 text-xs text-zinc-400 leading-relaxed">
                    <Zap className="w-3.5 h-3.5 text-amber-400 inline mr-1.5" />
                    {t("fee_info")}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <Field label={t("api_endpoint")}>
                    <input className={inputClass} placeholder="https://api.yourcompany.com/billing/webhook" value={formData.billingApiEndpoint} onChange={e => update({ billingApiEndpoint: e.target.value })} />
                  </Field>
                  <Field label="API Key">
                    <input className={inputClass} type="password" placeholder="sk-..." value={formData.billingApiKey} onChange={e => update({ billingApiKey: e.target.value })} />
                    <p className="text-[10px] text-zinc-600 mt-1">Chiffré et stocké de manière sécurisée. Non partageable.</p>
                  </Field>
                  <Field label={t("description_short")}>
                    <textarea className={`${inputClass} resize-none`} rows={3} placeholder="Décrivez votre écosystème, vos produits, et votre modèle de facturation..." value={formData.description} onChange={e => update({ description: e.target.value })} />
                  </Field>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="bg-black/40 border border-[#1a1a1a] rounded-xl p-4 space-y-3 text-sm text-zinc-400 max-h-64 overflow-y-auto">
                    <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Conditions OmniUtil v1.0</p>
                    <p>• <span className="text-white font-medium">Frais automatiques :</span> 0.5% Créateur + 0.5% Trésorerie déduits sur chaque transaction UTIL, automatiquement et à vie, via smart contract.</p>
                    <p>• <span className="text-white font-medium">Supply annuelle :</span> 1,000,000 UTIL maximum par an, renouvelables. Le plafond est enforced on-chain par le smart contract.</p>
                    <p>• <span className="text-white font-medium">Contrat BSC :</span> <a href={`https://bscscan.com/token/${CONTRACT}`} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 break-all">{CONTRACT}</a></p>
                    <p>• <span className="text-white font-medium">Wallets auto-générés :</span> OmniUtil génère un wallet BSC unique par utilisateur de chaque écosystème partenaire.</p>
                    <p>• <span className="text-white font-medium">Échange :</span> Les UTIL peuvent être échangés contre USDT, services, ou transférés entre utilisateurs du même écosystème.</p>
                    <p>• <span className="text-white font-medium">Approbation :</span> Toute candidature est soumise à l'approbation du Coordinateur IA Global d'OmniUtil.</p>
                    <p>• <span className="text-white font-medium">Anti-fraude :</span> Des mécanismes anti-fraude automatisés sont enforced on-chain et hors-chaîne.</p>
                    <p>• <span className="text-white font-medium">Données :</span> Les données de facturation sont utilisées exclusivement pour calculer les récompenses UTIL.</p>
                  </div>
                  <div className="flex items-start gap-3 bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
                    <Checkbox
                      id="terms"
                      checked={formData.acceptedTerms}
                      onCheckedChange={c => update({ acceptedTerms: !!c })}
                      className="mt-0.5 border-amber-500/30 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />
                    <label htmlFor="terms" className="text-sm text-zinc-300 cursor-pointer leading-relaxed">
                      {t("terms")}
                    </label>
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{t("apply_step5")}</p>
                  
                  <div className="bg-black/30 border border-[#1a1a1a] rounded-xl overflow-hidden">
                    {[
                      { label: t("name"), value: formData.name || "—" },
                      { label: t("ecosystem_type"), value: t(`ecosystem_${formData.ecosystemType}`) },
                      { label: t("email"), value: formData.contactEmail || "—" },
                      { label: t("country"), value: formData.country || "—" },
                      { label: t("estimated_users"), value: formData.estimatedUsers.toLocaleString() },
                      { label: t("reward_rate"), value: `${formData.rewardRate}%` },
                      { label: t("wallet"), value: formData.walletAddress ? `${formData.walletAddress.slice(0, 10)}...${formData.walletAddress.slice(-6)}` : "—" },
                      { label: t("api_endpoint"), value: formData.billingApiEndpoint || "—" },
                    ].map((row, i) => (
                      <div key={i} className={`flex justify-between items-center px-4 py-2.5 text-sm ${i % 2 === 0 ? "bg-white/1" : ""} border-b border-[#141414] last:border-0`}>
                        <span className="text-zinc-500 flex-shrink-0 mr-4">{row.label}</span>
                        <span className="text-white font-mono text-right truncate">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Zap className="w-3 h-3 text-amber-500" />
                    {t("fee_info")}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-5 border-t border-[#141414] bg-[#0a0a0a]">
            <Button
              variant="outline"
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className="border-[#1a1a1a] bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white h-9 text-sm"
            >
              {t("prev")}
            </Button>

            {step < 5 ? (
              <Button
                onClick={handleNext}
                disabled={step === 1 && (!formData.name || !formData.contactEmail)}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold h-9 text-sm px-5 gap-2"
              >
                {t("next")} <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!formData.acceptedTerms || createApplication.isPending}
                className="bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-bold h-9 text-sm px-5 gap-2"
              >
                {createApplication.isPending ? (
                  <><span className="animate-spin">⚙️</span> Traitement...</>
                ) : (
                  <><Send className="w-3.5 h-3.5" /> {t("apply_submit")}</>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreatePartnerApplication } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function PartnerApply() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const createApplication = useCreatePartnerApplication();

  const [formData, setFormData] = useState({
    name: "",
    ecosystemType: "mobile" as const,
    contactName: "",
    contactEmail: "",
    country: "",
    estimatedUsers: 0,
    description: "",
    walletAddress: "",
    rewardRate: 1,
    billingApiEndpoint: "",
    billingApiKey: "",
    acceptedTerms: false,
  });

  const handleSubmit = () => {
    createApplication.mutate(
      { data: formData },
      {
        onSuccess: () => {
          toast({
            title: "Application Submitted",
            description: "Your application is pending AI review.",
          });
          setStep(6);
        },
        onError: (err) => {
          toast({
            title: "Error",
            description: "Failed to submit application.",
            variant: "destructive"
          });
        }
      }
    );
  };

  if (step === 6) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md bg-card p-8 rounded-xl border border-border">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-8 h-8 bg-primary rounded-full animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Application Processing</h2>
          <p className="text-muted-foreground">The Global AI Coordinator is analyzing your ecosystem parameters. You will receive an email upon approval.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-secondary p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Ecosystem Integration</h2>
          <div className="text-sm font-mono text-primary">Step {step} / 5</div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
              <h3 className="text-lg font-medium">{t("apply_step1")}</h3>
              <Input placeholder={t("name")} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <Select value={formData.ecosystemType} onValueChange={(v: any) => setFormData({...formData, ecosystemType: v})}>
                <SelectTrigger>
                  <SelectValue placeholder={t("ecosystem_type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile">Mobile</SelectItem>
                  <SelectItem value="tv">TV</SelectItem>
                  <SelectItem value="ebank">E-Bank</SelectItem>
                  <SelectItem value="ecommerce">E-Commerce</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder={t("email")} value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} />
              <Input placeholder="Contact Name" value={formData.contactName} onChange={e => setFormData({...formData, contactName: e.target.value})} />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
              <h3 className="text-lg font-medium">{t("apply_step2")}</h3>
              <Input placeholder={t("wallet")} value={formData.walletAddress} onChange={e => setFormData({...formData, walletAddress: e.target.value})} />
              <div className="space-y-4">
                <div className="flex justify-between">
                  <label>{t("reward_rate")}</label>
                  <span className="font-mono text-primary">{formData.rewardRate}%</span>
                </div>
                <Slider min={0.1} max={20} step={0.1} value={[formData.rewardRate]} onValueChange={([v]) => setFormData({...formData, rewardRate: v})} />
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
              <h3 className="text-lg font-medium">{t("apply_step3")}</h3>
              <Input placeholder={t("api_endpoint")} value={formData.billingApiEndpoint} onChange={e => setFormData({...formData, billingApiEndpoint: e.target.value})} />
              <Input type="password" placeholder="API Key" value={formData.billingApiKey} onChange={e => setFormData({...formData, billingApiKey: e.target.value})} />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
              <h3 className="text-lg font-medium">{t("apply_step4")}</h3>
              <div className="p-4 bg-secondary/50 rounded-lg text-sm text-muted-foreground space-y-2">
                <p>• 0.5% Creator Fee</p>
                <p>• 0.5% Treasury Fee</p>
                <p>• Anti-fraud protocols enforced</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Checkbox id="terms" checked={formData.acceptedTerms} onCheckedChange={(c) => setFormData({...formData, acceptedTerms: !!c})} />
                <label htmlFor="terms" className="text-sm cursor-pointer">{t("terms")}</label>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
              <h3 className="text-lg font-medium">{t("apply_step5")}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-muted-foreground">Ecosystem</div>
                <div>{formData.name}</div>
                <div className="text-muted-foreground">Reward Rate</div>
                <div>{formData.rewardRate}%</div>
                <div className="text-muted-foreground">Wallet</div>
                <div className="font-mono text-xs">{formData.walletAddress || "Not provided"}</div>
              </div>
            </motion.div>
          )}

        </div>
        
        <div className="p-6 bg-secondary/30 border-t border-border flex justify-between">
          <Button variant="outline" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}>
            {t("prev")}
          </Button>
          {step < 5 ? (
            <Button onClick={() => setStep(s => s + 1)} className="bg-primary text-primary-foreground">
              {t("next")}
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!formData.acceptedTerms || createApplication.isPending} className="bg-primary text-primary-foreground">
              {createApplication.isPending ? "Processing..." : t("apply_submit")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

import { Link, useLocation } from "wouter";
import { useI18n } from "@/lib/i18n";
import { ReactNode } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Terminal, Database, Users, LayoutDashboard, FileSignature } from "lucide-react";

export function Layout({ children }: { children: ReactNode }) {
  const { lang, setLang, t, flags } = useI18n();
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "OmniUtil Home", icon: <Terminal className="w-4 h-4" /> },
    { href: "/dashboard", label: t("admin_dash"), icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: "/partner/dashboard", label: t("partner_dash"), icon: <Database className="w-4 h-4" /> },
    { href: "/users", label: t("users_explorer"), icon: <Users className="w-4 h-4" /> },
    { href: "/partners", label: t("partners_dir"), icon: <FileSignature className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <Link href="/">
            <div className="font-mono font-bold text-xl tracking-tighter text-primary cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
              OMNIUTIL
            </div>
          </Link>
        </div>
        <div className="p-4 flex-1">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${location === item.href ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"}`}>
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-border">
          <Select value={lang} onValueChange={(v: any) => setLang(v)}>
            <SelectTrigger className="w-full bg-background border-border">
              <SelectValue placeholder={t("language")} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(flags).map(([key, emoji]) => (
                <SelectItem key={key} value={key}>
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{emoji}</span> {key}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Futuristic grid background effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] z-0" />
        
        <div className="flex-1 overflow-y-auto z-10 relative">
          {children}
        </div>
      </main>
    </div>
  );
}

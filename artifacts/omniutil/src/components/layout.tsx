import { Link, useLocation } from "wouter";
import { useI18n } from "@/lib/i18n";
import { ReactNode, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Terminal, Database, Users, LayoutDashboard,
  FileSignature, ChevronRight, Globe, ExternalLink, Menu, X
} from "lucide-react";
import { useGetContractInfo } from "@workspace/api-client-react";

const CONTRACT_ADDRESS = "0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B";

export function Layout({ children }: { children: ReactNode }) {
  const { lang, setLang, t, flags } = useI18n();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: contract } = useGetContractInfo();

  const shortAddr = `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`;

  const navItems = [
    { href: "/", label: "OmniUtil", icon: <Terminal className="w-4 h-4" /> },
    { href: "/dashboard", label: t("admin_dash"), icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: "/partner/dashboard", label: t("partner_dash"), icon: <Database className="w-4 h-4" /> },
    { href: "/users", label: t("users_explorer"), icon: <Users className="w-4 h-4" /> },
    { href: "/partners", label: t("partners_dir"), icon: <FileSignature className="w-4 h-4" /> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-[#1c1c1c]">
        <Link href="/" onClick={() => setMobileOpen(false)}>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <div className="w-3 h-3 bg-amber-500 rounded-sm animate-pulse" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-[#0a0a0a]" />
            </div>
            <div>
              <div className="font-mono font-black text-lg tracking-widest text-white leading-none">OMNIUTIL</div>
              <div className="text-[9px] font-mono text-amber-500/60 tracking-widest uppercase">BSC MAINNET</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map((item) => {
          const active = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 text-sm rounded-lg transition-all group ${
                active
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={active ? "text-amber-400" : "text-zinc-600 group-hover:text-zinc-300 transition-colors"}>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </div>
              {active && <ChevronRight className="w-3 h-3 text-amber-500" />}
            </Link>
          );
        })}
      </nav>

      {/* Contract Badge */}
      <div className="p-3">
        <a
          href={`https://bscscan.com/token/${CONTRACT_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 rounded-lg bg-white/3 border border-amber-500/10 hover:border-amber-500/30 transition-all group"
        >
          <div className="min-w-0">
            <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-0.5">
              {contract?.symbol ?? "UTIL"} · {contract?.network ?? "BSC Mainnet"}
            </div>
            <div className="font-mono text-xs text-amber-400/70 group-hover:text-amber-400 transition-colors truncate">
              {shortAddr}
            </div>
          </div>
          <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-amber-400 transition-colors flex-shrink-0 ml-2" />
        </a>
      </div>

      {/* Language */}
      <div className="p-3 border-t border-[#1c1c1c]">
        <Select value={lang} onValueChange={(v: any) => setLang(v)}>
          <SelectTrigger className="w-full bg-white/3 border-white/8 text-sm text-zinc-300 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-zinc-500" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-[#111] border-[#1c1c1c]">
            {Object.entries(flags).map(([key, emoji]) => (
              <SelectItem key={key} value={key} className="text-zinc-300 hover:text-white focus:bg-amber-500/10 focus:text-amber-300">
                <span className="flex items-center gap-2">
                  <span>{emoji}</span>
                  <span className="font-mono text-xs tracking-wider">{key}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#060606] text-foreground flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-56 border-r border-[#1a1a1a] bg-[#080808] flex-col flex-shrink-0 fixed h-full z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[#080808] border-b border-[#1a1a1a] flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <div className="w-2 h-2 bg-amber-500 rounded-sm animate-pulse" />
          </div>
          <span className="font-mono font-black tracking-widest text-sm text-white">OMNIUTIL</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-zinc-400 hover:text-white transition-colors">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <aside className="w-64 h-full bg-[#080808] border-r border-[#1a1a1a]" onClick={e => e.stopPropagation()}>
            <div className="pt-14 h-full">
              <SidebarContent />
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-56 flex flex-col min-h-screen relative overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-[0.015]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,170,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,170,0,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/3 rounded-full blur-[100px] pointer-events-none z-0" />

        <div className="flex-1 overflow-y-auto z-10 relative pt-14 md:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}

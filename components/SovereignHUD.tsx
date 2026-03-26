import { motion } from 'framer-motion';

export const SovereignHUD = ({ children, valuation, version }: any) => (
  <div className="min-h-screen bg-[#0a0a0a] text-[#06b6d4] font-mono overflow-hidden relative">
    <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#06b6d411_1px,transparent_1px),linear-gradient(to_bottom,#06b6d411_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    
    <header className="relative z-10 flex justify-between p-4 border-b border-[#06b6d433] bg-black/40 backdrop-blur-md">
      <div className="flex flex-col">
        <span className="text-[10px] opacity-50 tracking-[0.3em]">OMNI_PROTOCOL</span>
        <span className="text-lg font-black tracking-tighter">{version}</span>
      </div>
      <div className="text-right">
        <span className="block text-xl font-black text-white">{valuation}</span>
        <span className="text-[10px] opacity-70 uppercase font-bold">Node: Washington iad1</span>
      </div>
    </header>

    <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center">
      <div className="relative flex items-center justify-center mb-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[350px] h-[350px] border border-[#06b6d422] rounded-full border-t-[#06b6d4] shadow-[0_0_30px_-10px_#06b6d4]"
        />
        <div className="z-20 p-6 bg-black/60 backdrop-blur-2xl border border-[#06b6d444] rounded-xl shadow-2xl">
          {children} 
        </div>
      </div>
    </main>

    <footer className="fixed bottom-0 w-full p-2 text-[8px] flex justify-between opacity-40 border-t border-[#06b6d411] bg-black/80">
      <span>LOGIC_INTEGRITY: 100% (V300_BASE)</span>
      <span>SOUVERAINETÉ DIGITALE EXÉCUTÉE</span>
    </footer>
  </div>
);

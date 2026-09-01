import Heatmap from "@/components/Heatmap";
import QuickAdd from "@/components/QuickAdd";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8 tracking-tighter">Frictionless Habits</h1>
      </div>
      
      {/* Stats Section Placeholder */}
      <div className="flex gap-16 mb-16 text-center">
        <div>
          <div className="text-3xl font-bold text-primary">19 <span className="text-sm text-gray-400 font-normal">días</span></div>
          <div className="text-gray-400">Días activos</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary">0 <span className="text-sm text-gray-400 font-normal">días</span></div>
          <div className="text-gray-400">Racha actual</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-primary">2 <span className="text-sm text-gray-400 font-normal">días</span></div>
          <div className="text-gray-400">Racha más larga</div>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="w-full max-w-4xl p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 mb-12 overflow-hidden shadow-xl">
        <Heatmap />
      </div>

      {/* Quick Add Section */}
      <QuickAdd />
    </main>
  );
}

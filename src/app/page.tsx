import Heatmap from "@/components/Heatmap";

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

      {/* Quick Add Placeholder */}
      <div className="w-full max-w-xl text-center">
        <h2 className="text-xl font-semibold mb-6">Actividad de hoy</h2>
        <div className="flex justify-center gap-4 mb-8">
          <button className="px-6 py-3 rounded-full bg-slate-800 border border-slate-700 hover:border-primary/50 transition-colors">
            📖 Leer
          </button>
          <button className="px-6 py-3 rounded-full bg-slate-800 border border-slate-700 hover:border-primary/50 transition-colors">
            🏃‍♂️ Correr
          </button>
          <button className="px-6 py-3 rounded-full bg-slate-800 border border-slate-700 hover:border-primary/50 transition-colors">
            💧 Agua
          </button>
        </div>
        <input 
          type="text" 
          placeholder="O simplemente escribe qué hiciste hoy..." 
          className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-6 py-4 outline-none focus:border-primary transition-colors text-white placeholder-slate-500"
        />
      </div>
    </main>
  );
}

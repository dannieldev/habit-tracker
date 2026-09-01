"use client";

import Heatmap from "@/components/Heatmap";
import QuickAdd from "@/components/QuickAdd";
import { useAuth } from "@/components/AuthProvider";

export default function Home() {
  const { user, loading, signInWithGoogle, logout } = useAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-primary">Cargando...</div>;
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center max-w-md">
          <h1 className="text-5xl font-bold mb-6 tracking-tighter text-primary drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]">Frictionless Habits</h1>
          <p className="text-slate-400 mb-8">El mapa de calor de tu vida. Registra tus hábitos diarios sin fricción usando IA.</p>
          <button 
            onClick={signInWithGoogle}
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors shadow-lg hover:shadow-white/20"
          >
            Iniciar sesión con Google
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 pt-12">
      <div className="z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between font-mono text-sm mb-12 gap-4">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tighter text-white text-center md:text-left mb-4 md:mb-0">Frictionless Habits</h1>
        <div className="flex items-center gap-4 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700/50">
          <img src={user.photoURL || ""} alt="User profile" className="w-8 h-8 rounded-full border border-slate-700" />
          <span className="text-slate-300 hidden md:inline">{user.displayName}</span>
          <button onClick={logout} className="text-sm px-4 py-1.5 rounded-full border border-slate-700 hover:border-slate-500 hover:text-white transition-colors text-slate-400">
            Salir
          </button>
        </div>
      </div>
      
      {/* Stats Section Placeholder */}
      <div className="flex gap-12 md:gap-16 mb-12 text-center flex-wrap justify-center">
        <div>
          <div className="text-4xl font-bold text-primary drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">19 <span className="text-lg text-slate-500 font-normal">días</span></div>
          <div className="text-slate-400 text-sm mt-1 uppercase tracking-wider font-semibold">Activos</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-primary drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">0 <span className="text-lg text-slate-500 font-normal">días</span></div>
          <div className="text-slate-400 text-sm mt-1 uppercase tracking-wider font-semibold">Racha actual</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-primary drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">2 <span className="text-lg text-slate-500 font-normal">días</span></div>
          <div className="text-slate-400 text-sm mt-1 uppercase tracking-wider font-semibold">Más larga</div>
        </div>
      </div>

      {/* Heatmap Section */}
      <div className="w-full max-w-4xl p-6 md:p-8 rounded-3xl bg-slate-800/30 border border-slate-700/50 mb-12 overflow-hidden shadow-2xl backdrop-blur-sm">
        <Heatmap />
      </div>

      {/* Quick Add Section */}
      <QuickAdd />
    </main>
  );
}

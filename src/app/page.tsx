"use client";

import Heatmap from "@/components/Heatmap";
import QuickAdd from "@/components/QuickAdd";
import { useAuth } from "@/components/AuthProvider";

export default function Home() {
  const { user, loading, signInWithGoogle, logout } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <span className="material-symbols-outlined text-primary text-5xl animate-spin">refresh</span>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-surface relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] rounded-full bg-pulse-purple/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-[40%] -right-[20%] w-[50%] h-[50%] rounded-full bg-emerald-glow/10 blur-[80px] pointer-events-none" />
        
        <div className="text-center max-w-md relative z-10 px-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(78,222,163,0.4)] mx-auto mb-6">
            <span className="material-symbols-outlined text-on-primary text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-3 tracking-tight text-on-surface">
            Frictionless<br /><span className="text-primary">Habits</span>
          </h1>
          <p className="text-on-surface-variant mb-10">Stay consistent. Build momentum.</p>
          <button
            onClick={signInWithGoogle}
            className="px-8 py-4 bg-primary text-on-primary font-bold rounded-full hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(78,222,163,0.3)] text-base"
          >
            Iniciar sesión con Google
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-72 bg-surface-container-lowest border-r border-glass-border z-50 flex-col pt-10 pb-10">
        <div className="px-8 mb-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(78,222,163,0.4)]">
            <span className="material-symbols-outlined text-on-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
          </div>
          <span className="text-xl font-bold text-on-surface tracking-tight">Frictionless</span>
        </div>
        <nav className="flex-1 px-4 flex flex-col gap-1">
          <a href="#" className="flex items-center px-6 py-4 rounded-xl transition-all duration-300 bg-primary-container/20 text-primary border border-primary/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="material-symbols-outlined mr-4">waves</span>Flow
          </a>
          <a href="#" className="flex items-center px-6 py-4 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-300">
            <span className="material-symbols-outlined mr-4">insights</span>Insights
          </a>
          <a href="#" className="flex items-center px-6 py-4 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all duration-300">
            <span className="material-symbols-outlined mr-4">center_focus_strong</span>Focus Modes
          </a>
        </nav>
        <div className="px-8 mt-auto">
          <div className="p-4 rounded-xl bg-surface-container-low border border-glass-border">
            <div className="text-[11px] font-bold tracking-widest text-primary mb-2 uppercase">Pro Status</div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-3/4 shadow-[0_0_8px_rgba(78,222,163,0.5)]" />
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 md:pl-72">
        {/* Desktop Header */}
        <header className="hidden md:flex fixed top-0 left-72 right-0 h-20 bg-surface/70 backdrop-blur-xl border-b border-glass-border z-40 items-center justify-between px-10">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined">search</span>
            <input type="text" placeholder="Search habits..." className="bg-transparent border-none outline-none text-sm w-64 placeholder:text-outline" />
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-pulse-purple rounded-full" />
            </button>
            <button onClick={logout} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(78,222,163,0.3)] ring-2 ring-glass-border">
                {user.photoURL
                  ? <img src={user.photoURL} alt="profile" className="w-full h-full rounded-full object-cover" />
                  : <span className="material-symbols-outlined text-on-primary text-[22px]">person</span>
                }
              </div>
            </button>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.2)]">
          <div className="h-16 flex items-center justify-between px-5">
            <span className="text-xl font-extrabold text-primary tracking-tight">FRICTIONLESS</span>
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center" onClick={logout}>
              {user.photoURL
                ? <img src={user.photoURL} alt="profile" className="w-full h-full rounded-full object-cover" />
                : <span className="material-symbols-outlined text-on-primary-container text-[18px]">person</span>
              }
            </div>
          </div>
        </header>

        <main className="pt-16 md:pt-20 min-h-screen relative overflow-hidden">
          {/* Ambient glows */}
          <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-pulse-purple/10 blur-[100px] pointer-events-none" />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-glow/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col w-full px-5 md:px-10 gap-6 md:gap-8 pb-40 md:pb-16 pt-6">
            
            {/* Mobile page title */}
            <div className="md:hidden flex flex-col gap-1">
              <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">
                Focus <span className="text-primary">Zone</span>
              </h1>
              <p className="text-sm text-on-surface-variant">Stay consistent. Build momentum.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mt-0 md:mt-4">
              {/* Active Days */}
              <div className="col-span-2 md:col-span-1 relative bg-surface/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 overflow-hidden group border border-glass-border hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-glow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-glow/20 rounded-full blur-2xl" />
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-emerald-glow text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                      <span className="text-[11px] font-bold tracking-widest text-on-surface-variant uppercase">Active Days</span>
                    </div>
                    <div className="text-4xl font-extrabold text-on-surface flex items-baseline gap-2">
                      19 <span className="text-sm text-on-surface-variant/60 font-normal">/ 30</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-glow to-pulse-purple opacity-50 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
              {/* Current Streak */}
              <div className="relative bg-surface/80 backdrop-blur-xl rounded-2xl p-5 overflow-hidden group border border-glass-border hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-shadow duration-300">
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant text-xl">electric_bolt</span>
                    <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">Current</span>
                  </div>
                  <div className="text-3xl font-extrabold text-on-surface flex items-baseline gap-1">
                    0 <span className="text-xs text-on-surface-variant/60 font-normal">days</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1 rounded-full mt-auto">
                    <div className="h-full bg-surface-variant rounded-full w-[5%]" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-glow to-pulse-purple opacity-50 group-hover:w-full transition-all duration-500 ease-out delay-75" />
              </div>
              {/* Longest Streak */}
              <div className="relative bg-surface/80 backdrop-blur-xl rounded-2xl p-5 overflow-hidden group border border-glass-border hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-shadow duration-300">
                <div className="absolute -right-2 -bottom-2 w-16 h-16 bg-pulse-purple/20 blur-[20px] rounded-full pointer-events-none" />
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-pulse-purple text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                    <span className="text-[10px] font-bold tracking-widest text-on-surface-variant uppercase">Longest</span>
                  </div>
                  <div className="text-3xl font-extrabold text-on-surface flex items-baseline gap-1">
                    2 <span className="text-xs text-on-surface-variant/60 font-normal">days</span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-1 rounded-full mt-auto">
                    <div className="h-full bg-secondary rounded-full w-[20%] shadow-[0_0_8px_rgba(221,183,255,0.6)]" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-pulse-purple to-emerald-glow opacity-50 group-hover:w-full transition-all duration-500 ease-out delay-150" />
              </div>
            </div>

            {/* Heatmap Card */}
            <div className="bg-surface/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <Heatmap />
              </div>
            </div>

            {/* Quick Add / Protocol */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface/80 backdrop-blur-xl border border-glass-border rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
                <QuickAdd />
              </div>
              {/* Smart Input — Desktop only inline here, Mobile is floating */}
              <div className="hidden md:flex bg-surface/80 backdrop-blur-xl border border-glass-border rounded-2xl p-8 shadow-xl relative flex-col justify-center">
                <label className="text-[11px] font-bold tracking-widest text-primary mb-4 block uppercase">NLP Logging</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-glow to-pulse-purple rounded-xl opacity-20 blur-md group-focus-within:opacity-50 transition-opacity duration-500" />
                  <div className="relative bg-[#1a1f33] border border-glass-border rounded-xl p-2 flex items-center gap-3 group-focus-within:border-emerald-glow/50 group-focus-within:bg-[#1e2540] transition-colors">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center relative shrink-0">
                      <div className="absolute inset-0 bg-emerald-glow/20 rounded-lg blur-sm group-focus-within:animate-pulse" />
                      <span className="material-symbols-outlined text-emerald-glow relative z-10 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Or just type what you did today..."
                      className="bg-transparent border-none outline-none w-full text-xl font-bold text-on-surface placeholder:text-outline py-3"
                    />
                    <button className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0 hover:bg-surface-container-high transition-colors text-on-surface-variant group-focus-within:text-primary">
                      <span className="material-symbols-outlined">send</span>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant/60 mt-4 ml-1">Try: "Ran 5k and read for 20 mins"</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-surface-container-low/80 backdrop-blur-xl border-t border-glass-border">
        <div className="h-20 flex justify-around items-center px-6">
          <a href="#" className="flex flex-col items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
            <span className="text-[10px] font-bold tracking-widest uppercase">Flow</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-[28px]">analytics</span>
            <span className="text-[10px] font-bold tracking-widest uppercase">Insights</span>
          </a>
          <a href="#" className="flex flex-col items-center gap-1 text-on-surface-variant">
            <span className="material-symbols-outlined text-[28px]">center_focus_strong</span>
            <span className="text-[10px] font-bold tracking-widest uppercase">Focus</span>
          </a>
        </div>
      </nav>
    </div>
  );
}

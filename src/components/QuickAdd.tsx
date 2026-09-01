"use client";

import { useState } from "react";

const initialHabits = [
  { id: 1, name: "Read 30m", icon: "menu_book" },
  { id: 2, name: "Run 5k", icon: "directions_run" },
  { id: 3, name: "Water 2L", icon: "water_drop" },
  { id: 4, name: "Meditate 10m", icon: "self_improvement" }
];

export default function QuickAdd() {
  const [activeHabits, setActiveHabits] = useState<number[]>([2]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleHabit = (id: number) => {
    setActiveHabits(prev =>
      prev.includes(id) ? prev.filter(hId => hId !== id) : [...prev, id]
    );
  };

  const handleSmartSubmit = async () => {
    if (!inputValue.trim() || isProcessing) return;
    setIsProcessing(true);
    const text = inputValue;
    setInputValue("");
    try {
      const response = await fetch("/api/parse-habit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, availableHabits: initialHabits })
      });
      if (response.ok) {
        const { habitIds } = await response.json();
        if (Array.isArray(habitIds) && habitIds.length > 0) {
          setActiveHabits(prev => Array.from(new Set([...prev, ...habitIds])));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Today's Protocol (desktop pills / mobile list) */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-on-surface tracking-tight">Today's Protocol</h3>

        {/* Desktop: pill buttons */}
        <div className="hidden md:flex flex-wrap gap-4">
          {initialHabits.map((habit) => {
            const isActive = activeHabits.includes(habit.id);
            return (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`px-6 py-3 rounded-full flex items-center gap-2 text-base font-semibold transition-all duration-300 ${
                  isActive
                    ? "border border-primary/50 bg-primary-container/20 text-primary shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    : "border border-glass-border bg-surface-container-low text-on-surface-variant hover:border-primary/50"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  {habit.icon}
                </span>
                {habit.name}
              </button>
            );
          })}
          <button className="px-6 py-3 rounded-full border border-dashed border-glass-border bg-transparent text-on-surface-variant/70 flex items-center justify-center hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        {/* Mobile: full-width toggle rows */}
        <div className="flex flex-col gap-3 md:hidden">
          {initialHabits.map((habit) => {
            const isActive = activeHabits.includes(habit.id);
            return (
              <button
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`w-full relative overflow-hidden bg-surface-container/60 backdrop-blur-md border rounded-[20px] p-1 flex items-center transition-all duration-300 active:scale-[0.98] ${
                  isActive ? "border-primary/40" : "border-glass-border hover:border-primary/30"
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
                )}
                <div className="w-full flex items-center justify-between px-4 py-3 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                      isActive
                        ? "bg-primary/20 border-primary/50 shadow-[0_0_15px_rgba(78,222,163,0.3)]"
                        : "bg-surface-variant border-glass-border"
                    }`}>
                      <span className="material-symbols-outlined text-[20px] text-primary" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                        {habit.icon}
                      </span>
                    </div>
                    <span className={`text-base font-bold ${isActive ? "text-on-surface" : "text-on-surface-variant"}`}>
                      {habit.name}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-primary shadow-[0_0_12px_rgba(78,222,163,0.4)]"
                      : "border-2 border-surface-variant"
                  }`}>
                    {isActive && (
                      <span className="material-symbols-outlined text-[18px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Smart Input - desktop inline, mobile floating */}
      {/* Desktop */}
      <div className="hidden md:block relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-glow to-pulse-purple rounded-xl opacity-20 blur-md group-focus-within:opacity-50 transition-opacity duration-500" />
        <div className="relative bg-[#1a1f33] border border-glass-border rounded-xl p-2 flex items-center gap-3 transition-colors group-focus-within:border-emerald-glow/50 group-focus-within:bg-[#1e2540]">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center relative shrink-0">
            <div className="absolute inset-0 bg-emerald-glow/20 rounded-lg blur-sm group-focus-within:animate-pulse" />
            <span className="material-symbols-outlined text-emerald-glow relative z-10 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSmartSubmit()}
            placeholder="Or just type what you did today..."
            className="bg-transparent border-none outline-none w-full text-xl font-bold text-on-surface placeholder:text-outline py-3"
          />
          <button
            onClick={handleSmartSubmit}
            disabled={isProcessing}
            className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center shrink-0 hover:bg-surface-container-high transition-colors text-on-surface-variant group-focus-within:text-primary"
          >
            <span className="material-symbols-outlined">{isProcessing ? "hourglass_empty" : "send"}</span>
          </button>
        </div>
        <p className="text-sm text-on-surface-variant/60 mt-4 ml-1">Try: "Ran 5k and read for 20 mins"</p>
      </div>

      {/* Mobile Floating Input */}
      <div className="fixed bottom-24 left-0 w-full px-5 z-40 pointer-events-none flex justify-center md:hidden">
        <div className="w-full max-w-[400px] bg-[#1a233b]/90 backdrop-blur-2xl border border-glass-border rounded-full p-2 flex items-center shadow-[0_8px_32px_rgba(0,0,0,0.4)] pointer-events-auto focus-within:border-primary focus-within:shadow-[0_0_24px_rgba(78,222,163,0.2)] transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-pulse-purple flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.4)]">
            <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSmartSubmit()}
            placeholder="Log activity (e.g. 'Ran 5k')"
            className="bg-transparent border-none outline-none text-on-surface placeholder:text-on-surface-variant/50 w-full px-4 text-sm"
          />
          <button
            onClick={handleSmartSubmit}
            disabled={isProcessing}
            className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center shrink-0 hover:bg-primary hover:text-on-primary transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-[20px]">{isProcessing ? "hourglass_empty" : "send"}</span>
          </button>
        </div>
      </div>
    </>
  );
}

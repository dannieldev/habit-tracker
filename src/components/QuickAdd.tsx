"use client";

import { useState } from "react";

// In the future this will be fetched from Firebase
const initialHabits = [
  { id: 1, name: "Leer", icon: "📖" },
  { id: 2, name: "Correr", icon: "🏃‍♂️" },
  { id: 3, name: "Agua", icon: "💧" },
  { id: 4, name: "Meditar", icon: "🧘‍♂️" }
];

export default function QuickAdd() {
  const [activeHabits, setActiveHabits] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState("");

  const toggleHabit = (id: number) => {
    setActiveHabits(prev => 
      prev.includes(id) 
        ? prev.filter(hId => hId !== id) 
        : [...prev, id]
    );
    // Here we would sync with Firebase
  };

  const handleSmartInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      console.log("Processing Smart Input:", inputValue);
      // Here we would call the AI API to parse the natural language
      setInputValue("");
    }
  };

  return (
    <div className="w-full max-w-xl text-center">
      <h2 className="text-xl font-semibold mb-6">Actividad de hoy</h2>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {initialHabits.map((habit) => {
          const isActive = activeHabits.includes(habit.id);
          return (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`px-6 py-3 rounded-full transition-all duration-300 border ${
                isActive 
                  ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
                  : 'bg-slate-800 border-slate-700 hover:border-primary/50 text-slate-300'
              }`}
            >
              {habit.icon} {habit.name}
            </button>
          );
        })}
        
        {/* Button to add a new habit definition */}
        <button className="px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-white border-dashed transition-colors">
          + Nuevo
        </button>
      </div>

      <div className="relative group">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleSmartInputSubmit}
          placeholder="O escribe qué hiciste hoy (ej. corrí 5km)..." 
          className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-6 py-4 outline-none focus:border-primary transition-all duration-300 text-white placeholder-slate-500 shadow-lg group-hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-50 group-focus-within:opacity-100 transition-opacity">
          ✨ AI
        </div>
      </div>
    </div>
  );
}

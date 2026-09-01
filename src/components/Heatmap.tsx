"use client";

import { useMemo } from "react";
import { subDays, format, isSameDay } from "date-fns";

// Mock data for the prototype (this will later come from Firebase)
// 0 = no activity, 4 = very high activity
const generateMockData = () => {
  const data = [];
  for (let i = 0; i < 365; i++) {
    const date = subDays(new Date(), i);
    // Random activity level, heavily weighted towards 0
    const level = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
    data.push({ date, level });
  }
  return data;
};

export default function Heatmap() {
  const days = useMemo(() => generateMockData().reverse(), []);

  // Calculate grid
  const weeks = [];
  let currentWeek = [];

  days.forEach((day, i) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || i === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const getColor = (level: number) => {
    switch (level) {
      case 1: return "bg-primary/30";
      case 2: return "bg-primary/50";
      case 3: return "bg-primary/70";
      case 4: return "bg-primary shadow-[0_0_8px_rgba(16,185,129,0.6)]"; // Emerald glow
      default: return "bg-slate-800";
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex gap-2 overflow-x-auto pb-4 max-w-full">
        {weeks.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-2">
            {week.map((day, dayIdx) => (
              <div
                key={dayIdx}
                title={`${format(day.date, "MMM dd, yyyy")} - Level ${day.level}`}
                className={`w-4 h-4 rounded-sm transition-colors duration-200 ${getColor(day.level)} hover:ring-2 hover:ring-white`}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
        <span>Menos</span>
        <div className={`w-3 h-3 rounded-sm ${getColor(0)}`} />
        <div className={`w-3 h-3 rounded-sm ${getColor(1)}`} />
        <div className={`w-3 h-3 rounded-sm ${getColor(2)}`} />
        <div className={`w-3 h-3 rounded-sm ${getColor(3)}`} />
        <div className={`w-3 h-3 rounded-sm ${getColor(4)}`} />
        <span>Más</span>
      </div>
    </div>
  );
}

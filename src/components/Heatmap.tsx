"use client";

import { useMemo } from "react";
import { subDays, format } from "date-fns";

const generateMockData = () => {
  const data = [];
  for (let i = 0; i < 365; i++) {
    const date = subDays(new Date(), i);
    const level = Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0;
    data.push({ date, level });
  }
  return data;
};

export default function Heatmap() {
  const days = useMemo(() => generateMockData().reverse(), []);

  const weeks: typeof days[] = [];
  let currentWeek: typeof days = [];
  days.forEach((day, i) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || i === days.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const getCellClass = (level: number) => {
    switch (level) {
      case 1: return "bg-heatmap-1 border border-primary/20";
      case 2: return "bg-heatmap-2 border border-primary/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]";
      case 3: return "bg-heatmap-3 border border-primary/60 shadow-[0_0_12px_rgba(16,185,129,0.4)]";
      case 4: return "bg-heatmap-4 border border-primary shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_0_16px_rgba(16,185,129,0.6)]";
      default: return "bg-heatmap-0 border border-glass-border";
    }
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayLabels = ["Mon", "", "Wed", "", "Fri", "", ""];

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-on-surface tracking-tight">Consistency</h2>
        <div className="flex items-center gap-3 text-xs text-on-surface-variant">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-heatmap-0 border border-glass-border" />
            <div className="w-3 h-3 rounded-sm bg-heatmap-1 border border-glass-border/30" />
            <div className="w-3 h-3 rounded-sm bg-heatmap-2 shadow-[inset_0_0_4px_rgba(255,255,255,0.2)]" />
            <div className="w-3 h-3 rounded-sm bg-heatmap-3 shadow-[inset_0_0_8px_rgba(255,255,255,0.3)]" />
            <div className="w-3 h-3 rounded-sm bg-heatmap-4 shadow-[0_0_10px_rgba(16,185,129,0.5),inset_0_0_8px_rgba(255,255,255,0.4)]" />
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-4">
        <div className="inline-flex flex-col gap-2 min-w-max">
          {/* Month labels */}
          <div className="flex gap-[6px] ml-8 text-[10px] text-on-surface-variant/50 font-bold tracking-wider">
            {months.map((m, i) => (
              <div key={i} className="w-[52px]">{m}</div>
            ))}
          </div>
          {/* Grid */}
          {[0,1,2,3,4,5,6].map((row) => (
            <div key={row} className="flex gap-[6px] items-center">
              <div className="w-6 text-[10px] text-on-surface-variant/40 font-bold tracking-wider text-right pr-1">
                {dayLabels[row]}
              </div>
              {weeks.map((week, weekIdx) => (
                <div
                  key={weekIdx}
                  title={week[row] ? format(week[row].date, "MMM dd, yyyy") : ""}
                  className={`w-3 h-3 rounded-[3px] transition-all duration-300 hover:scale-150 hover:z-20 cursor-pointer ${
                    week[row] ? getCellClass(week[row].level) : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

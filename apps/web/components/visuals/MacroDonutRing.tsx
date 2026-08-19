"use client";

import React from 'react';

interface MacroDonutRingProps {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  fiber: number;
  size?: number;
}

export function MacroDonutRing({
  calories,
  carbs,
  protein,
  fat,
  fiber,
  size = 180
}: MacroDonutRingProps) {
  const totalGrams = carbs + protein + fat || 1;
  const carbPct = Math.round((carbs / totalGrams) * 100);
  const protPct = Math.round((protein / totalGrams) * 100);
  const fatPct = Math.round((fat / totalGrams) * 100);

  // SVG calculations for 3 arcs
  const radius = 70;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;

  const carbOffset = 0;
  const carbLength = (carbPct / 100) * circumference;

  const protOffset = -carbLength;
  const protLength = (protPct / 100) * circumference;

  const fatOffset = -(carbLength + protLength);
  const fatLength = (fatPct / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
          {/* Base track */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="#1e293b"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Carbs (Cyan) */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="#06b6d4"
            strokeWidth={strokeWidth}
            strokeDasharray={`${carbLength} ${circumference}`}
            strokeDashoffset={carbOffset}
            strokeLinecap="round"
            fill="transparent"
          />
          {/* Protein (Emerald) */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="#10b981"
            strokeWidth={strokeWidth}
            strokeDasharray={`${protLength} ${circumference}`}
            strokeDashoffset={protOffset}
            strokeLinecap="round"
            fill="transparent"
          />
          {/* Healthy Fat (Amber) */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="#f59e0b"
            strokeWidth={strokeWidth}
            strokeDasharray={`${fatLength} ${circumference}`}
            strokeDashoffset={fatOffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Calorie Readout */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-extrabold tracking-tight text-white font-mono">
            {calories}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            Kcal / Day
          </span>
        </div>
      </div>

      {/* Macro Legend */}
      <div className="grid grid-cols-3 gap-3 w-full mt-4 text-center">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="text-[11px] font-semibold text-slate-400">Carbs</span>
          </div>
          <div className="text-sm font-bold text-white font-mono">{carbs}g</div>
          <div className="text-[10px] text-cyan-400 font-semibold">{carbPct}%</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] font-semibold text-slate-400">Protein</span>
          </div>
          <div className="text-sm font-bold text-white font-mono">{protein}g</div>
          <div className="text-[10px] text-emerald-400 font-semibold">{protPct}%</div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-[11px] font-semibold text-slate-400">Lipids</span>
          </div>
          <div className="text-sm font-bold text-white font-mono">{fat}g</div>
          <div className="text-[10px] text-amber-400 font-semibold">{fatPct}%</div>
        </div>
      </div>

      <div className="w-full mt-2 text-center text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 py-1.5 rounded-lg">
        Active Soluble Fiber: {fiber}g / day
      </div>
    </div>
  );
}

"use client";

import React from 'react';

interface GlycemicMeterProps {
  score: number; // 0 to 20+
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function GlycemicMeter({ score, label = "Glycemic Load", size = 'md' }: GlycemicMeterProps) {
  // Determine status
  const isLow = score <= 10;
  const isMedium = score > 10 && score <= 19;
  const isHigh = score >= 20;

  const colorClass = isLow 
    ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' 
    : isMedium 
    ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' 
    : 'text-rose-400 border-rose-500/30 bg-rose-500/10';

  const strokeColor = isLow ? '#10b981' : isMedium ? '#f59e0b' : '#f43f5e';
  const percentage = Math.min(100, Math.max(5, (score / 25) * 100));

  const strokeDashoffset = 100 - percentage;

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-slate-800"
            strokeWidth="3"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            strokeDasharray="100, 100"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            strokeWidth="3.2"
            stroke={strokeColor}
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="absolute text-xs font-bold font-mono text-slate-100">
          {score}
        </span>
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">{label}</div>
        <div className={`text-xs font-semibold px-2 py-0.5 rounded-full border inline-block mt-0.5 ${colorClass}`}>
          {isLow ? 'Low Impact' : isMedium ? 'Moderate Impact' : 'High Surge'}
        </div>
      </div>
    </div>
  );
}

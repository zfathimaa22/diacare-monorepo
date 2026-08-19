"use client";

import React, { useState } from 'react';

export function Glucose24hCurve() {
  const [showComparison, setShowComparison] = useState(true);

  return (
    <div className="w-full bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              24-Hour Glycemic Wave Projection
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time simulation of postprandial glucose excursions vs optimal metabolic range
          </p>
        </div>
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 transition-colors"
        >
          {showComparison ? 'Hide Unoptimized Curve' : 'Show Spike Comparison'}
        </button>
      </div>

      {/* Interactive SVG Curve */}
      <div className="relative w-full h-48 sm:h-56">
        <svg className="w-full h-full" viewBox="0 0 800 240" preserveAspectRatio="none">
          <defs>
            <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Target Glycemic Safe Zone Shading (70 to 140 mg/dL) */}
          <rect x="0" y="80" width="800" height="90" fill="#10b981" fillOpacity="0.06" rx="6" />

          {/* Grid lines */}
          <line x1="0" y1="60" x2="800" y2="60" stroke="#334155" strokeDasharray="4 4" strokeWidth="0.8" />
          <line x1="0" y1="120" x2="800" y2="120" stroke="#334155" strokeDasharray="4 4" strokeWidth="0.8" />
          <line x1="0" y1="170" x2="800" y2="170" stroke="#334155" strokeDasharray="4 4" strokeWidth="0.8" />

          {/* Axis Labels */}
          <text x="10" y="55" fill="#64748b" fontSize="10" fontFamily="monospace">180 mg/dL (Spike Threshold)</text>
          <text x="10" y="115" fill="#10b981" fontSize="10" fontFamily="monospace">120 mg/dL (Target Postprandial)</text>
          <text x="10" y="165" fill="#64748b" fontSize="10" fontFamily="monospace">80 mg/dL (Fasting Baseline)</text>

          {/* Unoptimized Red Curve */}
          {showComparison && (
            <>
              <path
                d="M 0 160 Q 100 30, 200 155 T 400 35 T 600 40 T 800 165"
                fill="url(#roseGrad)"
                stroke="#f43f5e"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
            </>
          )}

          {/* DiaCare Optimized Smooth Emerald Curve */}
          <path
            d="M 0 160 Q 100 115, 200 130 T 400 110 T 600 118 T 800 155"
            fill="url(#emeraldGrad)"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Meal Marker Points */}
          <circle cx="120" cy="120" r="5" fill="#06b6d4" className="animate-ping" />
          <circle cx="120" cy="120" r="4" fill="#06b6d4" />
          <text x="130" y="125" fill="#06b6d4" fontSize="11" fontWeight="bold">Breakfast (08:00)</text>

          <circle cx="340" cy="115" r="4" fill="#10b981" />
          <text x="350" y="120" fill="#10b981" fontSize="11" fontWeight="bold">Lunch (13:30)</text>

          <circle cx="560" cy="120" r="4" fill="#f59e0b" />
          <text x="570" y="125" fill="#f59e0b" fontSize="11" fontWeight="bold">Dinner (20:00)</text>

          <circle cx="720" cy="150" r="4" fill="#8b5cf6" />
          <text x="640" y="180" fill="#8b5cf6" fontSize="10" fontWeight="bold">Bedtime Shield (22:00)</text>
        </svg>
      </div>

      {/* Bottom Timeline & Legend */}
      <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 mt-2 text-xs text-slate-400 font-mono">
        <span>06:00 AM</span>
        <span>10:00 AM</span>
        <span>02:00 PM</span>
        <span>06:00 PM</span>
        <span>10:00 PM</span>
        <span>02:00 AM</span>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-3 pt-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-emerald-400 rounded-full"></span>
          <span className="text-slate-200 font-medium">DiaCare Clinical Plan: Smooth Wave</span>
        </div>
        {showComparison && (
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-rose-500 rounded-full"></span>
            <span className="text-slate-400">Standard Diet: Severe Spikes & Crashes</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/20 border border-emerald-500/40"></span>
          <span className="text-emerald-400">Target Range (70-140 mg/dL)</span>
        </div>
      </div>
    </div>
  );
}

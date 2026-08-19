"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Scale, 
  Clock, 
  Apple, 
  CheckCircle2, 
  ChevronRight,
  TrendingDown,
  Layers,
  UtensilsCrossed,
  FileSpreadsheet
} from 'lucide-react';
import { MacroDonutRing } from '@/components/visuals/MacroDonutRing';
import { Glucose24hCurve } from '@/components/visuals/Glucose24hCurve';
import { GlycemicMeter } from '@/components/visuals/GlycemicMeter';

export default function MarketingLandingPage() {
  const [selectedType, setSelectedType] = useState<'TYPE_2' | 'TYPE_1' | 'PRE_DIABETES' | 'GESTATIONAL'>('TYPE_2');
  const [patientWeight, setPatientWeight] = useState(78);
  const [patientHba1c, setPatientHba1c] = useState(7.4);

  // Dynamic preview calculation
  const calculatedCalories = Math.round(10 * patientWeight + 6.25 * 175 - 5 * 48 + 5) * 1.35;
  const targetDeficitCal = selectedType === 'TYPE_2' ? Math.round(calculatedCalories - 350) : Math.round(calculatedCalories);
  const carbBudget = Math.round((targetDeficitCal * 0.40) / 4);

  return (
    <div className="space-y-24 py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* 1. Hero Section */}
      <section className="relative pt-6 sm:pt-12 text-center flex flex-col items-center">
        {/* Glow ambient background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ADA & EASD Evidence-Based Clinical Nutrition</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.1]">
          Precision Metabolic Nutrition for{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Diabetic Stability
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
          Dynamic 7-day medical meal plans calibrated for glycemic index, dawn phenomenon buffering, and comorbidity renal protection.
        </p>

        {/* CTA Button Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-extrabold text-sm sm:text-base hover:scale-105 transition-all shadow-xl shadow-emerald-500/25"
          >
            <span>Create Personalized Diet Plan</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#calculator"
            className="px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm sm:text-base transition-colors"
          >
            Try Interactive Simulator
          </Link>
        </div>

        {/* Visual Hero Preview Card */}
        <div className="w-full mt-14 max-w-5xl">
          <Glucose24hCurve />
        </div>
      </section>

      {/* 2. Interactive Metabolic Calculator Simulator */}
      <section id="calculator" className="scroll-mt-24">
        <div className="text-center mb-10">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 mb-2">
            Instant Metabolic Engine
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Simulate Your Personalized Diabetic Target
          </h3>
        </div>

        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Diabetes Classification
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'TYPE_2', label: 'Type 2' },
                  { id: 'TYPE_1', label: 'Type 1' },
                  { id: 'PRE_DIABETES', label: 'Pre-DM' },
                  { id: 'GESTATIONAL', label: 'Gestational' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id as any)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedType === type.id
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-300">Body Weight</span>
                  <span className="text-emerald-400 font-mono">{patientWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="140"
                  value={patientWeight}
                  onChange={(e) => setPatientWeight(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-300">Current HbA1c Level</span>
                  <span className="text-cyan-400 font-mono">{patientHba1c}%</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="13.0"
                  step="0.1"
                  value={patientHba1c}
                  onChange={(e) => setPatientHba1c(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3.5">
                <div className="text-[11px] text-slate-400 font-semibold">Target Daily Carb Budget</div>
                <div className="text-xl font-black text-cyan-400 font-mono mt-0.5">{carbBudget}g</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Partitioned across 5 structured meals</div>
              </div>

              <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-3.5">
                <div className="text-[11px] text-slate-400 font-semibold">Max Glycemic Load / Meal</div>
                <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">&le; 10 GL</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Strict low postprandial impact</div>
              </div>
            </div>
          </div>

          {/* Visualization Column */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <MacroDonutRing
              calories={targetDeficitCal}
              carbs={carbBudget}
              protein={Math.round((targetDeficitCal * 0.25) / 4)}
              fat={Math.round((targetDeficitCal * 0.35) / 9)}
              fiber={38}
            />
          </div>
        </div>
      </section>

      {/* 3. Clinical Science & Four Pillars */}
      <section id="features">
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 mb-2">
            Medical Nutrition Therapy
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Four Pillars of Diabetic Plaque & Glucose Defense
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-800/80">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4 text-cyan-400">
              <Scale className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Low Glycemic Load</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every curated recipe maintains a Glycemic Load under 10, neutralizing acute beta-cell stress.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-800/80">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4 text-emerald-400">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Dawn-to-Dusk Timing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Specialized morning buffers protect against cortisol surges while casein shields nocturnal hypoglycemia.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-800/80">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400">
              <Apple className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Viscous Soluble Fiber</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Exceeds 35g daily target with beta-glucan and psyllium to trap carbs and reduce LDL cholesterol.
            </p>
          </div>

          <div className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-800/80">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mb-4 text-rose-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-white mb-2">Renal & Vascular Guard</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated safety guardrails calibrate protein down to 0.8g/kg when eGFR falls below 60 mL/min.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Dietary Archetypes Preview */}
      <section id="archetypes">
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 mb-2">
            Diverse Cultural Protocols
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Tailored for Every Kitchen and Culture
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-800/80 space-y-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400">
              Mediterranean Cardio
            </span>
            <h4 className="text-lg font-bold text-white">Wild Salmon & Extra Virgin Olive Oil</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rich in polyphenols, high MUFA ratios, wild fatty fish for anti-inflammatory endothelial defense.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-800/80 space-y-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-400">
              South Asian / Indian
            </span>
            <h4 className="text-lg font-bold text-white">Foxtail Millet, Methi & Sprouted Moong</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Replaces refined rice and maida with low-GI ancient millets, bitter gourd, and fenugreek fiber.
            </p>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-slate-800/80 space-y-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400">
              Keto & Low-Carb
            </span>
            <h4 className="text-lg font-bold text-white">Avocado, Pasture Eggs & Herb Chicken</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Under 50g net carbs per day for dramatic postprandial glucose flattening and fast insulin sensitivity recovery.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Final CTA Callout */}
      <section className="relative glass-card rounded-3xl p-8 sm:p-14 border border-emerald-500/30 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-cyan-500/10 pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <h3 className="text-3xl sm:text-4xl font-black text-white">
            Take Control of Your Glycemic Journey Today
          </h3>
          <p className="text-sm text-slate-300">
            Generate your personalized 7-day clinical meal plan with instant recipe swaps and printable shopping lists.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-extrabold text-base hover:scale-105 transition-all shadow-xl shadow-emerald-500/30"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  HeartPulse, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  ShieldAlert, 
  Clock, 
  Flame, 
  TrendingDown, 
  Plus, 
  CheckCircle2, 
  ChefHat, 
  RefreshCw,
  FileText
} from 'lucide-react';
import { MacroDonutRing } from '@/components/visuals/MacroDonutRing';
import { Glucose24hCurve } from '@/components/visuals/Glucose24hCurve';
import { GlycemicMeter } from '@/components/visuals/GlycemicMeter';
import { CLINICAL_RECIPES } from '@/lib/api-client';

export default function DashboardMainPage() {
  const [activeDay, setActiveDay] = useState(1);

  const patient = {
    name: 'Eleanor Vance',
    age: 52,
    gender: 'Female',
    diabetesType: 'Type 2 Diabetes',
    hba1c: 7.2,
    fbs: 128,
    ppbg: 154,
    bmi: 25.8,
    weightKg: 74,
    medications: ['Metformin 500mg BID'],
    archetype: 'Mediterranean Cardio-Diabetic'
  };

  const prescription = {
    calories: 1650,
    carbsGrams: 165,
    proteinGrams: 105,
    fatGrams: 64,
    fiberGrams: 38,
    maxGlPerMeal: 10
  };

  const todayMeals = [
    {
      time: '08:00 AM',
      type: 'Breakfast',
      recipe: CLINICAL_RECIPES[0],
      gl: 5.8
    },
    {
      time: '11:00 AM',
      type: 'Morning Snack',
      recipe: CLINICAL_RECIPES[5],
      gl: 2.1
    },
    {
      time: '01:30 PM',
      type: 'Lunch',
      recipe: CLINICAL_RECIPES[2],
      gl: 7.2
    },
    {
      time: '08:00 PM',
      type: 'Dinner',
      recipe: CLINICAL_RECIPES[3],
      gl: 3.8
    },
    {
      time: '10:00 PM',
      type: 'Bedtime Shield',
      recipe: CLINICAL_RECIPES[6],
      gl: 0.8
    }
  ];

  return (
    <div className="space-y-8">
      {/* 1. Patient Clinical Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                {patient.diabetesType}
              </span>
              <span className="text-xs text-slate-400 font-mono">Profile ID: DIA-8921</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {patient.name}
            </h1>
            <p className="text-xs text-slate-300 mt-1 font-medium">
              Protocol: <span className="text-cyan-400">{patient.archetype}</span> | Daily Energy Budget: <span className="text-emerald-400 font-bold">{prescription.calories} kcal</span>
            </p>
          </div>

          {/* Quick Biomarker Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Current HbA1c</div>
              <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">{patient.hba1c}%</div>
              <div className="text-[9px] text-emerald-500 font-semibold flex items-center justify-center gap-0.5 mt-0.5">
                <TrendingDown className="w-2.5 h-2.5" /> -0.4% from baseline
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Fasting Glucose</div>
              <div className="text-lg font-black text-cyan-400 font-mono mt-0.5">{patient.fbs}</div>
              <div className="text-[9px] text-slate-400">mg / dL</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Target Carbs</div>
              <div className="text-lg font-black text-amber-400 font-mono mt-0.5">{prescription.carbsGrams}g</div>
              <div className="text-[9px] text-slate-400">40% energy split</div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Active Fiber</div>
              <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">{prescription.fiberGrams}g</div>
              <div className="text-[9px] text-slate-400">Viscous protection</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visual Macro Ring & Projected 24-hr Curve Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Macro Donut Visual Card */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-slate-800/80 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Daily Macronutrient Target
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Mifflin-St Jeor
            </span>
          </div>

          <div className="my-2">
            <MacroDonutRing
              calories={prescription.calories}
              carbs={prescription.carbsGrams}
              protein={prescription.proteinGrams}
              fat={prescription.fatGrams}
              fiber={prescription.fiberGrams}
            />
          </div>

          <Link
            href="/diet-plans"
            className="w-full mt-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors text-center border border-slate-700 block"
          >
            Inspect Full 7-Day Plan
          </Link>
        </div>

        {/* 24-hr Glycemic Curve */}
        <div className="lg:col-span-8 space-y-6">
          <Glucose24hCurve />

          {/* Clinical Alert Callout */}
          <div className="glass-card rounded-2xl p-4 border border-emerald-500/30 bg-emerald-950/20 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Dawn Phenomenon & Nocturnal Hypo Guard Active
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Breakfast carbohydrate is buffered with soluble fiber and healthy fats to counter morning cortisol surges. A 10 PM casein Greek yogurt shield prevents early morning 3 AM hypoglycemia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Today's Visual Meal Timeline Preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white">Today&apos;s Diabetic Schedule</h2>
            <p className="text-xs text-slate-400">Pre-calibrated low glycemic meals aligned to your prescription</p>
          </div>
          <Link
            href="/diet-plans"
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <span>View Full 7 Days</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {todayMeals.map((item, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-4 border border-slate-800/80 flex flex-col justify-between hover:border-emerald-500/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
                  <span>{item.time}</span>
                  <span className="text-emerald-400 font-semibold">{item.type}</span>
                </div>

                <img
                  src={item.recipe.imageUrl}
                  alt={item.recipe.name}
                  className="w-full h-28 rounded-xl object-cover mb-3"
                />

                <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                  {item.recipe.name}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 font-semibold border border-emerald-500/20">
                  GL: {item.gl}
                </span>
                <span className="text-xs font-mono font-bold text-slate-300">
                  {item.recipe.calories} kcal
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

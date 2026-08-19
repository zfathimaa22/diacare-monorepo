"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CalendarDays, 
  Sparkles, 
  Printer, 
  ShoppingCart, 
  RefreshCw, 
  Flame, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  Filter
} from 'lucide-react';
import { ClinicalApiClient } from '@/lib/api-client';
import { SevenDayDietPlan, DayPlanData, MealItem, PatientIntakeData } from '@/types';
import { MealCard } from '@/components/visuals/MealCard';
import { MacroDonutRing } from '@/components/visuals/MacroDonutRing';

export default function DietPlansPage() {
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [dietPlan, setDietPlan] = useState<SevenDayDietPlan | null>(null);

  useEffect(() => {
    // Default intake if none in storage
    let intake: PatientIntakeData = {
      age: 52,
      gender: 'FEMALE',
      heightCm: 165,
      weightKg: 74,
      activityLevel: 'LIGHT',
      diabetesType: 'TYPE_2',
      hba1c: 7.2,
      fastingBloodSugar: 128,
      medications: ['Metformin'],
      allergies: [],
      dietaryArchetype: 'MEDITERRANEAN'
    };

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('diacare_active_intake');
      if (stored) {
        try {
          intake = JSON.parse(stored);
        } catch (e) {}
      }
    }

    const generated = ClinicalApiClient.generate7DayPlan(intake);
    setDietPlan(generated);
  }, []);

  if (!dietPlan) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center gap-3 text-emerald-400 font-bold">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <span>Generating Dynamic 7-Day Diabetic Matrix...</span>
        </div>
      </div>
    );
  }

  const currentDay = dietPlan.days[activeDayIndex];

  const handleSwapMealOnDay = (mealIndex: number, newMeal: MealItem) => {
    const updatedDays = [...dietPlan.days];
    updatedDays[activeDayIndex].meals[mealIndex] = newMeal;

    // Recalculate day totals
    const meals = updatedDays[activeDayIndex].meals;
    updatedDays[activeDayIndex].totalCalories = meals.reduce((acc, m) => acc + m.calories, 0);
    updatedDays[activeDayIndex].totalCarbs = meals.reduce((acc, m) => acc + m.carbs, 0);
    updatedDays[activeDayIndex].totalProtein = meals.reduce((acc, m) => acc + m.protein, 0);
    updatedDays[activeDayIndex].totalFat = meals.reduce((acc, m) => acc + m.fat, 0);
    updatedDays[activeDayIndex].totalFiber = meals.reduce((acc, m) => acc + m.fiber, 0);

    setDietPlan({
      ...dietPlan,
      days: updatedDays
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {dietPlan.archetype.replace('_', ' ')}
            </span>
            <span className="text-xs text-slate-400 font-mono">GL &le; 10 / Meal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            7-Day Personalized Meal Schedule
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Each day is pre-balanced to maintain consistent glycemic control and dawn phenomenon safety
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/grocery-list"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold text-slate-200 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-cyan-400" />
            <span>Shopping List</span>
          </Link>
          <Link
            href="/print-plan"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Clinical Plan</span>
          </Link>
        </div>
      </div>

      {/* 7-Day Tab Selector Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {dietPlan.days.map((day, idx) => {
          const isSelected = activeDayIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveDayIndex(idx)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border-emerald-400 text-white shadow-lg shadow-emerald-500/15'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Day {day.dayNumber}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>}
              </div>
              <div className="text-sm font-extrabold text-white">{day.dayName}</div>
              <div className="text-[11px] font-mono text-emerald-400 mt-1 font-semibold">
                {day.totalCalories} kcal
              </div>
            </button>
          );
        })}
      </div>

      {/* Day Overview Summary Bar */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {currentDay.dayName} Daily Prescription Summary
          </div>
          <div className="text-2xl font-black text-white mt-1">
            {currentDay.totalCalories} Calories Total
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Average Meal Glycemic Load: <span className="text-emerald-400 font-bold">{currentDay.avgGlycemicLoad}</span> (Low Glycemic Impact)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-center">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2">
            <div className="text-[10px] text-cyan-400 font-semibold">Carbs</div>
            <div className="text-sm font-bold text-white font-mono">{currentDay.totalCarbs}g</div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2">
            <div className="text-[10px] text-emerald-400 font-semibold">Protein</div>
            <div className="text-sm font-bold text-white font-mono">{currentDay.totalProtein}g</div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2">
            <div className="text-[10px] text-amber-400 font-semibold">Lipids</div>
            <div className="text-sm font-bold text-white font-mono">{currentDay.totalFat}g</div>
          </div>
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2">
            <div className="text-[10px] text-emerald-400 font-semibold">Soluble Fiber</div>
            <div className="text-sm font-bold text-white font-mono">{currentDay.totalFiber}g</div>
          </div>
        </div>
      </div>

      {/* Meals Grid for the Active Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDay.meals.map((meal, mealIdx) => (
          <MealCard
            key={meal.id}
            meal={meal}
            onSwapMeal={(newMeal) => handleSwapMealOnDay(mealIdx, newMeal)}
          />
        ))}
      </div>
    </div>
  );
}

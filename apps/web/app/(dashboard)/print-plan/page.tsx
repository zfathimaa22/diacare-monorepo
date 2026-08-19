"use client";

import React from 'react';
import { HeartPulse, Printer, ShieldAlert, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { CLINICAL_RECIPES } from '@/lib/api-client';

export default function PrintPlanPage() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between no-print">
        <Link
          href="/diet-plans"
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Interactive Matrix</span>
        </Link>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Printable Clinical Document */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl text-slate-200 print:bg-white print:text-black print:border-none print:p-0">
        {/* Document Header */}
        <div className="flex items-start justify-between border-b border-slate-800 print:border-slate-300 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white print:text-black">DiaCare Clinical Nutrition Protocol</h1>
              <p className="text-xs text-slate-400 print:text-slate-600">Personalized Medical Nutrition Therapy (MNT)</p>
            </div>
          </div>

          <div className="text-right text-xs font-mono text-slate-400 print:text-slate-600">
            <div>Date: {new Date().toLocaleDateString()}</div>
            <div>Ref: DIA-MED-2026</div>
          </div>
        </div>

        {/* Patient Profile & Targets */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-200 mb-8 text-xs">
          <div>
            <span className="text-slate-400 print:text-slate-500 uppercase font-bold text-[10px]">Patient Name</span>
            <div className="font-bold text-white print:text-black text-sm">Eleanor Vance</div>
          </div>
          <div>
            <span className="text-slate-400 print:text-slate-500 uppercase font-bold text-[10px]">Diagnosis</span>
            <div className="font-bold text-emerald-400 print:text-emerald-700 text-sm">Type 2 Diabetes</div>
          </div>
          <div>
            <span className="text-slate-400 print:text-slate-500 uppercase font-bold text-[10px]">Daily Energy Budget</span>
            <div className="font-bold text-white print:text-black text-sm font-mono">1650 kcal / day</div>
          </div>
          <div>
            <span className="text-slate-400 print:text-slate-500 uppercase font-bold text-[10px]">Glycemic Limit</span>
            <div className="font-bold text-cyan-400 print:text-cyan-700 text-sm font-mono">&le; 10 GL / meal</div>
          </div>
        </div>

        {/* 7-Day Meal Schedule Table */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 print:text-slate-700 mb-3">
            7-Day Structured Meal Schedule
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 print:border-slate-300 rounded-xl overflow-hidden">
              <thead className="bg-slate-950/80 print:bg-slate-100 text-slate-300 print:text-slate-800 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3 border-b border-slate-800 print:border-slate-300">Day</th>
                  <th className="p-3 border-b border-slate-800 print:border-slate-300">Breakfast (08:00)</th>
                  <th className="p-3 border-b border-slate-800 print:border-slate-300">Lunch (13:30)</th>
                  <th className="p-3 border-b border-slate-800 print:border-slate-300">Dinner (20:00)</th>
                  <th className="p-3 border-b border-slate-800 print:border-slate-300">Bedtime (22:00)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-slate-200 font-sans">
                {dayNames.map((day, idx) => {
                  const isAlt = idx % 2 === 1;
                  return (
                    <tr key={idx} className="hover:bg-slate-950/40 print:hover:bg-transparent">
                      <td className="p-3 font-bold text-white print:text-black">{day}</td>
                      <td className="p-3 text-slate-300 print:text-slate-800">
                        {isAlt ? 'Avocado & Egg Scramble' : 'Steel-Cut Oats with Chia & Cinnamon'}
                      </td>
                      <td className="p-3 text-slate-300 print:text-slate-800">
                        {isAlt ? 'Tofu Edamame Bowl' : 'Foxtail Millet & Moong Khichdi'}
                      </td>
                      <td className="p-3 text-slate-300 print:text-slate-800">
                        {isAlt ? 'Herb Chicken with Broccoli' : 'Wild Salmon with Quinoa & Asparagus'}
                      </td>
                      <td className="p-3 text-emerald-400 print:text-emerald-800 font-medium">
                        Greek Yogurt + Flaxseed
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinical Guardrails & Emergency Protocols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-950/20 print:bg-slate-50 border border-emerald-500/20 print:border-slate-200">
            <h4 className="font-bold text-emerald-400 print:text-emerald-800 mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Prioritized Food Choices</span>
            </h4>
            <p className="text-slate-300 print:text-slate-700 leading-relaxed text-[11px]">
              Steel-cut oats, foxtail/kodo millets, wild salmon, chia/flaxseeds, extra virgin olive oil, bitter gourd, raw almonds, spinach, Greek yogurt.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/20 print:bg-slate-50 border border-rose-500/20 print:border-slate-200">
            <h4 className="font-bold text-rose-400 print:text-rose-800 mb-1 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Emergency Rule of 15 (Hypoglycemia)</span>
            </h4>
            <p className="text-slate-300 print:text-slate-700 leading-relaxed text-[11px]">
              If blood sugar drops below 70 mg/dL: Take 15g fast-acting carbs (1/2 cup juice or 4 glucose tablets). Rest 15 minutes, recheck glucose. Repeat if still below 70.
            </p>
          </div>
        </div>

        {/* Doctor Signature Footer */}
        <div className="mt-12 pt-6 border-t border-slate-800 print:border-slate-300 flex justify-between items-end text-xs text-slate-400 print:text-slate-600">
          <div>
            <div>Prescribing Clinical Nutritionist: Dr. Jordan Hayes, RD, CDE</div>
            <div>License: CA-MNT-98214</div>
          </div>
          <div className="text-right border-t border-slate-700 print:border-slate-400 pt-1 w-48 text-center font-serif italic text-slate-300 print:text-black">
            Dr. Jordan Hayes
          </div>
        </div>
      </div>
    </div>
  );
}

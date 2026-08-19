"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  UserPlus, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Scale, 
  ShieldCheck, 
  Heart, 
  Pill, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { PatientIntakeData, DietaryArchetype, DiabetesType, ActivityLevel } from '@diacare/shared-types';
import { ClinicalApiClient } from '@/lib/api-client';
import { MacroDonutRing } from '@/components/visuals/MacroDonutRing';

export default function PatientIntakePage() {
  const router = useRouter();

  const [formData, setFormData] = useState<PatientIntakeData>({
    age: 54,
    gender: 'FEMALE',
    heightCm: 165,
    weightKg: 76,
    activityLevel: 'LIGHT',
    diabetesType: 'TYPE_2',
    hba1c: 7.6,
    fastingBloodSugar: 138,
    postPrandialSugar: 168,
    bloodPressureSys: 130,
    bloodPressureDia: 85,
    eGfr: 82,
    medications: ['Metformin 500mg BID'],
    allergies: [],
    dietaryArchetype: 'MEDITERRANEAN',
  });

  const [activeStep, setActiveStep] = useState(1);
  const [selectedMeds, setSelectedMeds] = useState<string[]>(['Metformin']);

  const prescription = ClinicalApiClient.calculatePrescription(formData);

  const handleMedicationToggle = (med: string) => {
    let updated: string[];
    if (selectedMeds.includes(med)) {
      updated = selectedMeds.filter(m => m !== med);
    } else {
      updated = [...selectedMeds, med];
    }
    setSelectedMeds(updated);
    setFormData({ ...formData, medications: updated });
  };

  const handleGeneratePlan = () => {
    // Save to localStorage or session for dynamic matrix
    if (typeof window !== 'undefined') {
      localStorage.setItem('diacare_active_intake', JSON.stringify(formData));
    }
    router.push('/diet-plans');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Clinical Assessment
            </span>
            <span className="text-xs text-slate-400 font-mono">Step {activeStep} of 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Personalized Diabetic Intake Wizard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Calibrate Mifflin-St Jeor caloric limits and glycemic load tolerances
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                activeStep === step
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400'
              }`}
            >
              {step}
            </button>
          ))}
        </div>
      </div>

      {/* Wizard Form Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: Biometrics & Diabetes Classification */}
          {activeStep === 1 && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6 animate-in fade-in">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-400" />
                <span>Biometrics & Diabetes Type</span>
              </h3>

              {/* Diabetes Type */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Diabetes Classification
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'TYPE_2', label: 'Type 2 Diabetes', desc: 'Insulin Resistance & Lifestyle' },
                    { id: 'TYPE_1', label: 'Type 1 Diabetes', desc: 'Insulin Dependent & Carb Match' },
                    { id: 'PRE_DIABETES', label: 'Pre-Diabetes', desc: 'Impaired Fasting / Glucose' },
                    { id: 'GESTATIONAL', label: 'Gestational (GDM)', desc: 'Pregnancy Glycemic Protocol' }
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setFormData({ ...formData, diabetesType: item.id as any })}
                      className={`cursor-pointer p-3 rounded-2xl border transition-all ${
                        formData.diabetesType === item.id
                          ? 'bg-emerald-500/15 border-emerald-400 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white">{item.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Age, Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Biological Sex
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['FEMALE', 'MALE'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFormData({ ...formData, gender: g as any })}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          formData.gender === g
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Height & Weight */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.heightCm}
                    onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white font-mono"
                  />
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Physical Activity Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'SEDENTARY', label: 'Sedentary' },
                    { id: 'LIGHT', label: 'Light (1-3 d/wk)' },
                    { id: 'MODERATE', label: 'Moderate (3-5 d/wk)' }
                  ].map((act) => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, activityLevel: act.id as any })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        formData.activityLevel === act.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400'
                      }`}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-colors"
                >
                  <span>Next: Clinical Biomarkers</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Clinical Biomarkers & Medications */}
          {activeStep === 2 && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6 animate-in fade-in">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span>Lab Biomarkers & Medications</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    HbA1c (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.hba1c}
                    onChange={(e) => setFormData({ ...formData, hba1c: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-cyan-400 font-bold font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Fasting Sugar (mg/dL)
                  </label>
                  <input
                    type="number"
                    value={formData.fastingBloodSugar || 130}
                    onChange={(e) => setFormData({ ...formData, fastingBloodSugar: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    eGFR (mL/min/1.73m²)
                  </label>
                  <input
                    type="number"
                    value={formData.eGfr || 85}
                    onChange={(e) => setFormData({ ...formData, eGfr: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">Caps protein if below 60</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Blood Pressure (Sys / Dia)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={formData.bloodPressureSys || 128}
                      onChange={(e) => setFormData({ ...formData, bloodPressureSys: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white font-mono"
                      placeholder="120"
                    />
                    <span className="text-slate-600">/</span>
                    <input
                      type="number"
                      value={formData.bloodPressureDia || 82}
                      onChange={(e) => setFormData({ ...formData, bloodPressureDia: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white font-mono"
                      placeholder="80"
                    />
                  </div>
                </div>
              </div>

              {/* Medication Selection */}
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Active Diabetic Medications
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Metformin',
                    'Insulin (Basal/Bolus)',
                    'Sulfonylurea (Glimepiride)',
                    'SGLT2 Inhibitor',
                    'GLP-1 RA',
                    'DPP-4 Inhibitor'
                  ].map((med) => {
                    const isSelected = selectedMeds.includes(med);
                    return (
                      <button
                        key={med}
                        type="button"
                        onClick={() => handleMedicationToggle(med)}
                        className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-400 text-amber-300'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="truncate">{med}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-colors"
                >
                  <span>Next: Dietary Archetype</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Dietary Archetype & Final Generation */}
          {activeStep === 3 && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800/80 space-y-6 animate-in fade-in">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                <span>Dietary Archetype & Cultural Preference</span>
              </h3>

              <div className="space-y-3">
                {[
                  {
                    id: 'MEDITERRANEAN',
                    title: 'Mediterranean Cardio-Diabetic',
                    desc: 'EVOO, wild fatty fish, antioxidant berries, whole grains, nuts',
                    tag: 'Gold Standard'
                  },
                  {
                    id: 'SOUTH_ASIAN',
                    title: 'South Asian / Indian Diabetic',
                    desc: 'Foxtail millets, sprouted moong, karela, methi seeds, low-GI dals',
                    tag: 'Millet-Powered'
                  },
                  {
                    id: 'KETO_LOW_CARB',
                    title: 'Clinical Low-Carb / Keto',
                    desc: 'Under 50g net carbs, healthy fats, pasture eggs, cruciferous greens',
                    tag: 'Spike Neutralizer'
                  },
                  {
                    id: 'DASH_CARDIO',
                    title: 'DASH Hypertensive-Diabetic',
                    desc: 'Low sodium, high potassium and magnesium, lean poultry, legumes',
                    tag: 'Blood Pressure Shield'
                  },
                  {
                    id: 'PLANT_BASED',
                    title: 'Plant-Based Diabetic Protocol',
                    desc: 'Tofu, edamame, lentils, seeds, high prebiotic viscous fibers',
                    tag: '100% Vegan'
                  }
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setFormData({ ...formData, dietaryArchetype: item.id as any })}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      formData.dietaryArchetype === item.id
                        ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 border-emerald-400 text-white shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-white">{item.title}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                    </div>
                    {formData.dietaryArchetype === item.id && (
                      <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-xs font-bold text-slate-300"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleGeneratePlan}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-sm hover:scale-105 transition-all shadow-xl shadow-emerald-500/30"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate 7-Day Plan</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Live Prescription Preview (Right Column) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-800/80 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Calculated Prescription
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                Live Preview
              </span>
            </div>

            <MacroDonutRing
              calories={prescription.calories}
              carbs={prescription.carbsGrams}
              protein={prescription.proteinGrams}
              fat={prescription.fatGrams}
              fiber={prescription.fiberGrams}
            />

            {/* Clinical Alert Box */}
            <div className="w-full mt-6 space-y-2">
              {prescription.clinicalAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                    alert.type === 'CRITICAL'
                      ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      : alert.type === 'WARNING'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 mb-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{alert.title}</span>
                  </div>
                  <div className="text-[11px] text-slate-300">{alert.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

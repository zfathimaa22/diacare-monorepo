"use client";

import React, { useState } from 'react';
import { MealItem, RecipeData } from '@diacare/shared-types';
import { GlycemicMeter } from './GlycemicMeter';
import { CLINICAL_RECIPES } from '@/lib/api-client';
import { Clock, RefreshCw, ChefHat, Sparkles, X, Check } from 'lucide-react';

interface MealCardProps {
  meal: MealItem;
  onSwapMeal?: (newMeal: MealItem) => void;
}

export function MealCard({ meal, onSwapMeal }: MealCardProps) {
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);

  // Available alternatives for swapping
  const alternatives = CLINICAL_RECIPES.filter(r => r.name !== meal.name);

  const handleSwap = (recipe: RecipeData) => {
    if (onSwapMeal) {
      onSwapMeal({
        ...meal,
        name: recipe.name,
        description: `Glycemic Load: ${recipe.glycemicLoad} | Prep: ${recipe.prepTimeMins} mins`,
        calories: recipe.calories,
        carbs: recipe.carbs,
        netCarbs: recipe.netCarbs,
        protein: recipe.protein,
        fat: recipe.fat,
        fiber: recipe.fiber,
        glycemicIndex: recipe.glycemicIndex,
        glycemicLoad: recipe.glycemicLoad,
        instructions: recipe.steps,
        ingredients: recipe.ingredients,
        imageUrl: recipe.imageUrl,
        tags: recipe.diabetesTags,
        clinicalBenefit: recipe.clinicalBenefit
      });
    }
    setShowSwapModal(false);
  };

  return (
    <>
      <div className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-800/80 bg-slate-900/60">
        {/* Top Image & Meal Header */}
        <div className="relative h-44 w-full overflow-hidden group">
          <img
            src={meal.imageUrl || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600'}
            alt={meal.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          {/* Meal Type Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700/80 backdrop-blur-md">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              {meal.mealType.replace('_', ' ')}
            </span>
          </div>

          {/* Timing Pill */}
          {meal.timing && (
            <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-700/80 backdrop-blur-md text-[11px] text-slate-300 font-mono">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span>{meal.timing}</span>
            </div>
          )}

          {/* Title & Tags */}
          <div className="absolute bottom-3 left-3 right-3">
            <h4 className="text-base font-bold text-white leading-snug drop-shadow-md">
              {meal.name}
            </h4>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {meal.tags?.slice(0, 2).map((t, idx) => (
                <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          {/* Glycemic Load Meter */}
          <div className="py-2 border-b border-slate-800/80">
            <GlycemicMeter score={meal.glycemicLoad} label="Meal Glycemic Impact" />
          </div>

          {/* Macro Breakdown Grid */}
          <div className="grid grid-cols-4 gap-2 my-3 text-center">
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-1.5">
              <div className="text-[10px] text-slate-400 font-medium">Energy</div>
              <div className="text-xs font-bold text-white font-mono">{meal.calories} kcal</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-1.5">
              <div className="text-[10px] text-cyan-400 font-medium">Carbs</div>
              <div className="text-xs font-bold text-white font-mono">{meal.carbs}g</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-1.5">
              <div className="text-[10px] text-emerald-400 font-medium">Protein</div>
              <div className="text-xs font-bold text-white font-mono">{meal.protein}g</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-1.5">
              <div className="text-[10px] text-amber-400 font-medium">Fiber</div>
              <div className="text-xs font-bold text-white font-mono">{meal.fiber}g</div>
            </div>
          </div>

          {/* Clinical Benefit Note */}
          {meal.clinicalBenefit && (
            <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-2.5 my-2 flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                {meal.clinicalBenefit}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => setShowRecipeModal(true)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs font-semibold text-slate-200 transition-colors border border-slate-700"
            >
              <ChefHat className="w-3.5 h-3.5 text-cyan-400" />
              <span>Recipe Guide</span>
            </button>

            <button
              onClick={() => setShowSwapModal(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-semibold text-emerald-300 transition-colors border border-emerald-500/30"
              title="Swap for alternative dish"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Swap</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Modal */}
      {showRecipeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowRecipeModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {meal.mealType.replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-400 font-mono">GL: {meal.glycemicLoad} | GI: {meal.glycemicIndex}</span>
            </div>

            <h3 className="text-xl font-extrabold text-white mb-4">{meal.name}</h3>

            <div className="mb-5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Required Ingredients</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {meal.ingredients?.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Preparation Instructions</h4>
              <ol className="space-y-2.5 text-xs text-slate-300">
                {meal.instructions?.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed mt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowRecipeModal(false)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Swap Meal Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowSwapModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
              <h3 className="text-lg font-bold text-white">Select Alternative Diabetic Dish</h3>
            </div>
            <p className="text-xs text-slate-400 mb-5">
              All dishes below are pre-calibrated to maintain equivalent carbohydrate and glycemic targets.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {alternatives.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => handleSwap(recipe)}
                  className="group cursor-pointer bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3.5 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {recipe.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          GL: {recipe.glycemicLoad}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {recipe.calories} kcal
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">{recipe.cuisine}</span>
                    <span className="text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Choose <Check className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

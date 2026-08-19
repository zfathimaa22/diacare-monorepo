"use client";

import React, { useState } from 'react';
import { CLINICAL_RECIPES } from '@/lib/api-client';
import { RecipeData } from '@diacare/shared-types';
import { GlycemicMeter } from '@/components/visuals/GlycemicMeter';
import { Search, Filter, Clock, Flame, Sparkles, ChefHat, X } from 'lucide-react';

export default function RecipeBankPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalRecipe, setActiveModalRecipe] = useState<RecipeData | null>(null);

  const categories = ['ALL', 'BREAKFAST', 'LUNCH', 'DINNER', 'SNACK', 'BEDTIME_SNACK'];

  const filtered = CLINICAL_RECIPES.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.diabetesTags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === 'ALL' || r.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Low-Glycemic Culinary Bank
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Diabetic Recipe & Glycemic Index Library
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Every dish is tested for glycemic load, fiber density, and dawn-to-dusk metabolic safety
          </p>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes, ingredients, tags..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-sans"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((recipe) => (
          <div
            key={recipe.id}
            className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-slate-800/80 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-bold text-emerald-400 uppercase">
                  {recipe.category.replace('_', ' ')}
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] text-slate-300 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{recipe.prepTimeMins} mins</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-base font-bold text-white">{recipe.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {recipe.diabetesTags.map((tag, idx) => (
                      <span key={idx} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <GlycemicMeter score={recipe.glycemicLoad} label="Glycemic Impact" />

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2">
                    <div className="text-[10px] text-slate-400">Calories</div>
                    <div className="text-xs font-bold text-white font-mono">{recipe.calories}</div>
                  </div>
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2">
                    <div className="text-[10px] text-cyan-400">Carbs</div>
                    <div className="text-xs font-bold text-white font-mono">{recipe.carbs}g</div>
                  </div>
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2">
                    <div className="text-[10px] text-emerald-400">Protein</div>
                    <div className="text-xs font-bold text-white font-mono">{recipe.protein}g</div>
                  </div>
                  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-2">
                    <div className="text-[10px] text-amber-400">Fiber</div>
                    <div className="text-xs font-bold text-white font-mono">{recipe.fiber}g</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-slate-300 leading-relaxed flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{recipe.clinicalBenefit}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => setActiveModalRecipe(recipe)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors flex items-center justify-center gap-2 border border-slate-700"
              >
                <ChefHat className="w-4 h-4 text-emerald-400" />
                <span>View Full Recipe & Steps</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {activeModalRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModalRecipe(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                {activeModalRecipe.category.replace('_', ' ')}
              </span>
              <span className="text-xs text-slate-400 font-mono">GL: {activeModalRecipe.glycemicLoad} | GI: {activeModalRecipe.glycemicIndex}</span>
            </div>

            <h3 className="text-xl font-extrabold text-white mb-4">{activeModalRecipe.name}</h3>

            <div className="mb-5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Required Ingredients</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                {activeModalRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Step-by-Step Cooking</h4>
              <ol className="space-y-2.5 text-xs text-slate-300">
                {activeModalRecipe.steps.map((step, idx) => (
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
                onClick={() => setActiveModalRecipe(null)}
                className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { ShoppingCart, Check, Printer, Sparkles, Apple, Fish, Wheat, Coffee, Layers } from 'lucide-react';

export default function GroceryListPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const categories = [
    {
      name: 'Produce & Metabolic Superfoods',
      icon: Apple,
      color: 'text-emerald-400',
      items: [
        { name: 'Fresh wild blueberries (antioxidant buffer)', qty: '2 pints' },
        { name: 'Organic baby spinach & kale', qty: '3 large tubs' },
        { name: 'Fresh asparagus spears', qty: '2 bunches' },
        { name: 'Hass avocados (ripe)', qty: '6 whole' },
        { name: 'Purple cabbage (isoflavone support)', qty: '1 head' },
        { name: 'Fresh ginger root & Ceylon cinnamon', qty: '1 pack' },
      ]
    },
    {
      name: 'Lean Proteins & Marine EPA/DHA',
      icon: Fish,
      color: 'text-cyan-400',
      items: [
        { name: 'Wild Alaskan salmon fillets', qty: '4 fillets (600g)' },
        { name: 'Pasture-raised organic eggs', qty: '2 dozen' },
        { name: 'Organic firm tofu & shelled edamame', qty: '2 packs' },
        { name: 'Skinless organic chicken breast', qty: '800g' },
        { name: 'Plain 2% Greek yogurt (nocturnal casein)', qty: '2 large tubs' },
      ]
    },
    {
      name: 'Ancient Millets, Complex Carbs & Seeds',
      icon: Wheat,
      color: 'text-amber-400',
      items: [
        { name: 'Steel-cut oats (viscous beta-glucan)', qty: '1 bag' },
        { name: 'Foxtail millet / Kodo millet', qty: '500g' },
        { name: 'Sprouted green moong dal', qty: '500g' },
        { name: 'Tricolor quinoa', qty: '1 bag' },
        { name: 'Raw chia seeds & ground flaxseed', qty: '1 jar each' },
        { name: 'Raw walnuts & dry roasted chickpeas', qty: '2 bags' },
      ]
    },
    {
      name: 'Healthy Fats, Spices & Infusions',
      icon: Coffee,
      color: 'text-rose-400',
      items: [
        { name: 'Extra virgin olive oil (cold-pressed)', qty: '1 bottle (750ml)' },
        { name: 'Raw sesame tahini', qty: '1 jar' },
        { name: 'Organic whole leaf green tea', qty: '1 box' },
        { name: 'Ground turmeric & whole cumin seeds', qty: '1 jar each' },
      ]
    }
  ];

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Smart Shopping Guide
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            7-Day Diabetic Grocery Basket
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            All ingredients organized by supermarket aisle for your weekly meal matrix
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold text-slate-200 transition-colors shadow-md no-print"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>Print Grocery Checklist</span>
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-6">
        {categories.map((cat, catIdx) => {
          const Icon = cat.icon;
          return (
            <div key={catIdx} className="glass-card rounded-3xl p-6 border border-slate-800/80">
              <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800/80">
                <div className={`p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 ${cat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">{cat.name}</h3>
                  <span className="text-[10px] text-slate-500 font-mono">{cat.items.length} items to pick</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.items.map((item, itemIdx) => {
                  const itemId = `${catIdx}-${itemIdx}`;
                  const isChecked = checkedItems[itemId];
                  return (
                    <div
                      key={itemIdx}
                      onClick={() => toggleCheck(itemId)}
                      className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-950/30 border-emerald-500/40 opacity-60 line-through'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                              : 'border-slate-700 bg-slate-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold text-slate-200">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-cyan-400 font-bold ml-2 shrink-0">
                        {item.qty}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Activity, Sparkles, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#090d16] bg-mesh-pattern flex flex-col justify-between">
      {/* Top Floating Glass Header */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 py-4 backdrop-blur-xl bg-slate-950/60 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-white">DiaCare</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">AI</span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                Clinical Diabetic Nutrition
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="#features" className="hover:text-emerald-400 transition-colors">
              Clinical Science
            </Link>
            <Link href="#calculator" className="hover:text-emerald-400 transition-colors">
              Interactive Simulator
            </Link>
            <Link href="#archetypes" className="hover:text-emerald-400 transition-colors">
              Dietary Archetypes
            </Link>
            <Link href="#faq" className="hover:text-emerald-400 transition-colors">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold px-4 py-2 text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 text-xs sm:text-sm font-extrabold hover:opacity-95 transition-all shadow-lg shadow-emerald-500/25 hover:scale-[1.02]"
            >
              <span>Launch App</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-12 px-4 sm:px-8 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <HeartPulse className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white text-sm">DiaCare AI Medical Nutrition Therapy</span>
          </div>
          <p className="text-slate-500 text-center md:text-left">
            Clinical guidelines derived from ADA (American Diabetes Association) and EASD protocols.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="hover:text-emerald-400 transition-colors">App Portal</Link>
            <Link href="/login" className="hover:text-emerald-400 transition-colors">Patient Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

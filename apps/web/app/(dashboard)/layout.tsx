"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HeartPulse, 
  LayoutDashboard, 
  UserPlus, 
  CalendarDays, 
  BookOpen, 
  ShoppingCart, 
  Printer, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  Activity
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: 'Metabolic Overview', icon: LayoutDashboard },
    { href: '/patient-intake', label: 'Patient Assessment', icon: UserPlus },
    { href: '/diet-plans', label: '7-Day Meal Matrix', icon: CalendarDays },
    { href: '/recipes', label: 'Diabetic Recipe Bank', icon: BookOpen },
    { href: '/grocery-list', label: 'Smart Grocery Guide', icon: ShoppingCart },
    { href: '/print-plan', label: 'Printable Clinical Plan', icon: Printer },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] bg-mesh-pattern flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-950/80 border-b border-slate-800 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <span className="font-extrabold text-white text-base">DiaCare AI</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-72 bg-slate-950/90 border-r border-slate-800/80 backdrop-blur-2xl flex flex-col justify-between p-6 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          {/* Logo */}
          <Link href="/" className="hidden md:flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-extrabold tracking-tight text-white">DiaCare</span>
                <span className="text-xs px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">PRO</span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                Clinical Diet System
              </p>
            </div>
          </Link>

          {/* Nav List */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile / Quick Action */}
        <div className="space-y-4 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
              EV
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">Eleanor Vance</div>
              <div className="text-[10px] text-emerald-400 font-medium">Type 2 Protocol Active</div>
            </div>
          </div>

          <Link
            href="/login"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors px-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-slate-950/40 border-b border-slate-800/60 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Clinical Session: Type 2 Diabetes Care Plan
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Target GL: &le; 10 / meal</span>
            </div>
            <Link
              href="/patient-intake"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>New Assessment</span>
            </Link>
          </div>
        </header>

        {/* Child Pages */}
        <div className="p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

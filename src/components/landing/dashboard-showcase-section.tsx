"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  CreditCard,
  Lightbulb,
  BarChart3,
  Settings,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export function DashboardShowcaseSection() {
  return (
    <section className="py-20 md:py-28 bg-[#070b12] border-t border-white/[0.07] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Production Platform Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            The complete operating system for contractor payments.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            From pre-bid client evaluation to automated multi-channel invoice dispatch, ONcue puts financial intelligence directly at your fingertips.
          </p>
        </motion.div>

        {/* Large Full-Width Dashboard Mockup Container with Motion & Floating Widgets */}
        <div className="relative">
          {/* Floating Pill Widget 1: Recent Settlement */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hidden lg:flex absolute -top-5 left-12 z-20 items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-mono shadow-2xl backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-white font-medium">+$12,000 CAD Settled</span>
            <span className="text-slate-400 font-normal">• Apex Infrastructure</span>
          </motion.div>

          {/* Floating Pill Widget 2: Risk Shield */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="hidden lg:flex absolute -bottom-5 right-12 z-20 items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/90 border border-amber-500/30 text-amber-400 text-xs font-mono shadow-2xl backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-white font-medium">AI Risk Shield Active</span>
            <span className="text-slate-400 font-normal">• 99.4% Calibrated</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="fintech-card glow-border rounded-2xl bg-[#0a0f1c] shadow-2xl overflow-hidden"
          >
            {/* Top Window Bar */}
            <div className="h-11 bg-slate-950/90 px-4 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-3 hidden sm:inline">
                  ONcue Platform — Alex (Apex Contracting Services)
                </span>
              </div>

              <Link href="/app">
                <Button size="sm" className="bg-amber-500 hover:bg-amber-400 shimmer-btn text-slate-950 font-bold text-xs h-7 px-3 gap-1 rounded-md">
                  <span>Launch Live App Demo</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </Link>
            </div>

            {/* App Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
              {/* Sidebar Preview */}
              <div className="hidden md:block md:col-span-3 lg:col-span-2 border-r border-white/5 bg-slate-950/40 p-4 space-y-6">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 px-2">
                    Main Navigation
                  </div>
                  <nav className="space-y-1 text-xs">
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/25">
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Overview</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200">
                      <Users className="w-4 h-4" />
                      <span>Clients</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200">
                      <Briefcase className="w-4 h-4" />
                      <span>Projects</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200">
                      <FileText className="w-4 h-4" />
                      <span>Invoices</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200">
                      <CreditCard className="w-4 h-4" />
                      <span>Payments</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200">
                      <Lightbulb className="w-4 h-4" />
                      <span>Insights</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200">
                      <BarChart3 className="w-4 h-4" />
                      <span>Analytics</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </div>
                  </nav>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-1 text-[11px]">
                  <div className="text-slate-400 font-medium">Active Workspace</div>
                  <div className="text-white font-semibold">Apex Contracting</div>
                  <div className="text-emerald-400 font-mono text-[10px]">Verified Trade User</div>
                </div>
              </div>

              {/* Main Dashboard Area */}
              <div className="md:col-span-9 lg:col-span-10 p-5 sm:p-7 space-y-6">
                {/* Dashboard Greeting Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight">
                      Good morning, Alex
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Here is your cash flow health and risk telemetry for this week.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-xs text-slate-300 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Live Sync • Net 15 Rules
                    </span>
                  </div>
                </div>

                {/* Exact Payment Overview 4 KPIs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-colors">
                    <div className="text-xs text-slate-400">Expected this month</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                      $24,800
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-0.5 font-mono">3 draws scheduled</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-colors">
                    <div className="text-xs text-slate-400">Outstanding</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300 mt-1">
                      $8,400
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">Northstar + Westmount</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-colors">
                    <div className="text-xs text-slate-400">Overdue</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-rose-400 mt-1">
                      $2,100
                    </div>
                    <div className="text-[10px] text-rose-400/80 mt-0.5 font-mono">Escalation active</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-colors">
                    <div className="text-xs text-slate-400">Collection rate</div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                      93%
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-0.5 font-mono">+4% vs last month</div>
                  </div>
                </div>

                {/* Dashboard Sub-Panels: Upcoming Payments & AI Risk Alerts */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Upcoming Payments (7 cols) */}
                  <div className="lg:col-span-7 p-4.5 rounded-xl bg-slate-900/40 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Upcoming Payments
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">Sep 2026</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5 flex items-center justify-between hover:border-white/15 transition-colors">
                        <div>
                          <div className="font-semibold text-white">Northstar Renovations</div>
                          <div className="text-[11px] text-slate-400">INV-1042 • Materials & Prep</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-white">$4,800 CAD</div>
                          <div className="text-[10px] text-amber-400">Due Sep 18</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5 flex items-center justify-between hover:border-white/15 transition-colors">
                        <div>
                          <div className="font-semibold text-white">Apex Infrastructure Partners</div>
                          <div className="text-[11px] text-slate-400">INV-1039 • Phase 1 Completion</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-emerald-400">$12,000 CAD</div>
                          <div className="text-[10px] text-emerald-400">Settled Sep 08</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Risk Alerts & Activity (5 cols) */}
                  <div className="lg:col-span-5 p-4.5 rounded-xl bg-slate-900/40 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                        <span>Risk Alerts & AI Insights</span>
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-300">
                        <div className="font-semibold text-rose-200">Westmount Holdback Risk</div>
                        <p className="text-[11px] text-rose-300/80 mt-0.5">
                          Invoice INV-1041 is 14 days overdue. Stage 3 automated escalation dispatched.
                        </p>
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
                        <div className="font-semibold text-emerald-200">Deposit Recommended</div>
                        <p className="text-[11px] text-emerald-300/80 mt-0.5">
                          New prospect detected. Milestone drawdown structure suggested.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

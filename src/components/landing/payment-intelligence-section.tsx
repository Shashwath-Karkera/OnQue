"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, TrendingUp, Sparkles, DollarSign, Calendar } from "lucide-react";

export function PaymentIntelligenceSection() {
  const [activeTab, setActiveTab] = useState<"6m" | "12m" | "all">("6m");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Realistic Canadian dollar payments history
  const monthlyData = [
    { month: "Apr", amountCAD: 12000, daysLate: 0, status: "On Time", height: 85, project: "Framing Phase 1" },
    { month: "May", amountCAD: 3400, daysLate: 1, status: "Paid +1d", height: 40, project: "Site Mobilization" },
    { month: "Jun", amountCAD: 8200, daysLate: 0, status: "On Time", height: 70, project: "Rough-in Electrical" },
    { month: "Jul", amountCAD: 5800, daysLate: 2, status: "Paid +2d", height: 55, project: "Boarding & Taping" },
    { month: "Aug", amountCAD: 14000, daysLate: 0, status: "On Time", height: 95, project: "Substantial Completion" },
    { month: "Sep", amountCAD: 4800, daysLate: 0, status: "Current", height: 50, project: "Commercial Painting" },
  ];

  return (
    <section id="payment-intelligence" className="py-20 md:py-28 bg-[#080c14] border-t border-white/[0.07] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Pre-Engagement Deep Dive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Know the payment behavior before you start the job.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every client profile is backed by aggregated, verified trade invoice data. See exactly how many days they take to disburse funds, how they handle retainage, and their overall reliability rating.
          </p>
        </motion.div>

        {/* Client Intelligence Card Showcase with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="fintech-card glow-border rounded-2xl p-6 sm:p-8 bg-[#0d1322] shadow-2xl"
        >
          {/* Profile Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold font-mono text-xl shrink-0 shadow-lg">
                NR
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Northstar Renovations
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Client
                  </span>
                  <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-white/[0.04]">
                    ID: CAN-ON-48921
                  </span>
                </div>
                <p className="text-sm text-slate-400 mt-1">
                  General Contracting & Commercial Fit-Outs • Toronto, Ontario
                </p>
              </div>
            </div>

            {/* Reliability Score Callout */}
            <div className="flex items-center gap-4 bg-slate-900/90 px-5 py-3 rounded-xl border border-white/10 shrink-0">
              <div>
                <div className="text-xs text-slate-400">Payment Reliability Score</div>
                <div className="text-3xl font-black font-mono text-emerald-400">
                  92 <span className="text-sm font-normal text-slate-400">/ 100</span>
                </div>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="text-left">
                <span className="inline-block px-3 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  Low Risk
                </span>
                <div className="text-[11px] text-slate-400 mt-0.5">Top 8% in Ontario</div>
              </div>
            </div>
          </div>

          {/* Payment Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 my-8">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-all">
              <div className="text-xs text-slate-400 font-medium">Total Invoices</div>
              <div className="text-xl font-bold font-mono text-white mt-1">24</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Across 4 quarters</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-all">
              <div className="text-xs text-slate-400 font-medium">Paid Invoices</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">22</div>
              <div className="text-[11px] text-emerald-400/80 mt-0.5">91.6% on terms</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-all">
              <div className="text-xs text-slate-400 font-medium">Late Payments</div>
              <div className="text-xl font-bold font-mono text-amber-400 mt-1">2</div>
              <div className="text-[11px] text-slate-400 mt-0.5">&lt; 3 days late only</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-all">
              <div className="text-xs text-slate-400 font-medium">Partial Payments</div>
              <div className="text-xl font-bold font-mono text-slate-200 mt-1">0</div>
              <div className="text-[11px] text-emerald-400 mt-0.5">Zero holdbacks</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-all">
              <div className="text-xs text-slate-400 font-medium">Avg Payment Delay</div>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-1">1.8 days</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Benchmark: 16.4d</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/15 transition-all">
              <div className="text-xs text-slate-400 font-medium">Total Paid (CAD)</div>
              <div className="text-xl font-bold font-mono text-white mt-1">$48,200</div>
              <div className="text-[11px] text-slate-400 mt-0.5">CAD currency</div>
            </div>
          </div>

          {/* Interactive Animated Payment Behavior Chart */}
          <div className="p-5 sm:p-6 rounded-xl bg-slate-900/40 border border-white/5 relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Payment Performance History & Settlement Velocity
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Monthly disbursement consistency with verified CAD invoice amounts
                </p>
              </div>

              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-white/10 text-xs">
                {(["6m", "12m", "all"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeTab === t
                        ? "bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Interactive Animated Bar Chart */}
            <div className="grid grid-cols-6 gap-3 sm:gap-6 pt-6 pb-2 items-end border-b border-white/5 min-h-[200px] relative">
              {monthlyData.map((item, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="flex flex-col items-center gap-2 group cursor-pointer relative"
                >
                  {/* Floating tooltip on hover */}
                  {hoveredIdx === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-14 z-30 px-3 py-1.5 rounded-lg bg-slate-950 border border-white/20 text-center shadow-xl pointer-events-none whitespace-nowrap"
                    >
                      <div className="text-[11px] font-bold text-white">${item.amountCAD.toLocaleString()} CAD</div>
                      <div className="text-[9px] text-slate-400">{item.project} • {item.status}</div>
                    </motion.div>
                  )}

                  <div className="text-[11px] font-mono text-slate-400 group-hover:text-amber-300 transition-colors">
                    ${item.amountCAD.toLocaleString()}
                  </div>

                  <div className="w-full max-w-[48px] bg-slate-950/80 rounded-t-lg overflow-hidden flex flex-col justify-end h-36 p-1 border border-white/10 group-hover:border-amber-500/50 transition-all">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${item.height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                      className={`w-full rounded-t transition-all duration-300 ${
                        item.daysLate === 0
                          ? "bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:from-emerald-500 group-hover:to-emerald-300"
                          : "bg-gradient-to-t from-amber-600 to-amber-400 group-hover:from-amber-500 group-hover:to-amber-300"
                      }`}
                    />
                  </div>

                  <div className="text-center">
                    <div className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                      {item.month}
                    </div>
                    <div
                      className={`text-[10px] font-mono ${
                        item.daysLate === 0 ? "text-emerald-400" : "text-amber-400"
                      }`}
                    >
                      {item.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Legend & Summary Note */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                  <span>Paid On Terms</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                  <span>Minor Friday Batch Delay (&lt; 2d)</span>
                </div>
              </div>
              <div className="text-slate-300 font-mono text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span>Current Outstanding: $6,400 CAD (INV-1042)</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

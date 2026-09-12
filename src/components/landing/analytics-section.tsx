"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle2, DollarSign, Clock, BarChart3 } from "lucide-react";

export function AnalyticsSection() {
  const [activeBar, setActiveBar] = useState<number | null>(null);

  // Monthly cash flow numbers (CAD)
  const cashflowTrend = [
    { month: "May", billed: 28000, collected: 27500 },
    { month: "Jun", billed: 34000, collected: 33800 },
    { month: "Jul", billed: 39500, collected: 38200 },
    { month: "Aug", billed: 46200, collected: 45000 },
    { month: "Sep", billed: 36500, collected: 39700 },
  ];

  return (
    <section id="analytics" className="py-20 md:py-28 bg-[#070b12] border-t border-white/[0.07] relative overflow-hidden">
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
            <span>Performance Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Financial analytics engineered for trade operations.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Gain clear visibility into your true collection speed, cashflow predictability, and client risk distribution without clunky spreadsheets.
          </p>
        </motion.div>

        {/* Analytics Top Cards with Motion */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="fintech-card rounded-xl p-5 bg-[#0d1322] hover:border-amber-500/30 transition-colors"
          >
            <div className="text-xs text-slate-400 font-medium">Total Revenue (YTD)</div>
            <div className="text-2xl font-bold font-mono text-white mt-1.5">$184,200</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
              <TrendingUp className="w-3 h-3" />
              +18.4% vs last year
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="fintech-card rounded-xl p-5 bg-[#0d1322] hover:border-amber-500/30 transition-colors"
          >
            <div className="text-xs text-slate-400 font-medium">Outstanding Payments</div>
            <div className="text-2xl font-bold font-mono text-amber-300 mt-1.5">$14,800</div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">Under standard terms</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.16 }}
            className="fintech-card rounded-xl p-5 bg-[#0d1322] hover:border-rose-500/30 transition-colors"
          >
            <div className="text-xs text-slate-400 font-medium">Overdue Payments</div>
            <div className="text-2xl font-bold font-mono text-rose-400 mt-1.5">$2,100</div>
            <div className="text-[11px] text-rose-400/80 mt-1 font-mono">Down 68% with ONcue</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.24 }}
            className="fintech-card rounded-xl p-5 bg-[#0d1322] hover:border-emerald-500/30 transition-colors"
          >
            <div className="text-xs text-slate-400 font-medium">Average Payment Time</div>
            <div className="text-2xl font-bold font-mono text-emerald-400 mt-1.5">14.2 days</div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">Industry avg: 33.6d</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.32 }}
            className="fintech-card rounded-xl p-5 bg-[#0d1322] col-span-2 sm:col-span-1 hover:border-emerald-500/30 transition-colors"
          >
            <div className="text-xs text-slate-400 font-medium">Collection Rate</div>
            <div className="text-2xl font-bold font-mono text-white mt-1.5">96.4%</div>
            <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3 h-3" />
              Top quintile in Ontario
            </div>
          </motion.div>
        </div>

        {/* Financial Dashboard Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="fintech-card glow-border rounded-2xl p-6 sm:p-8 bg-[#0d1322] shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>Revenue Billed vs Funds Collected</span>
                <span className="text-xs font-mono text-slate-400 font-normal">(Canadian Dollars)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                5-month rolling liquidity performance tracking actual disbursements against billings
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-700" />
                <span className="text-slate-300">Billed Volume</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
                <span className="text-amber-400 font-semibold">Funds Settled</span>
              </div>
            </div>
          </div>

          {/* SVG Restrained Financial Chart with Interactive Hover */}
          <div className="pt-6">
            <div className="grid grid-cols-5 gap-3 sm:gap-6 items-end h-48 pb-3 border-b border-white/5 relative">
              {cashflowTrend.map((item, idx) => {
                const billedHeight = Math.round((item.billed / 50000) * 100);
                const collectedHeight = Math.round((item.collected / 50000) * 100);

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveBar(idx)}
                    onMouseLeave={() => setActiveBar(null)}
                    className="flex flex-col items-center gap-2 group h-full justify-end cursor-pointer relative"
                  >
                    {activeBar === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-12 z-20 px-2.5 py-1 bg-slate-950 border border-white/20 rounded-md text-[10px] font-mono whitespace-nowrap shadow-xl"
                      >
                        <span className="text-slate-300">Billed: ${item.billed.toLocaleString()}</span>
                        <span className="text-amber-400 font-bold ml-1.5">
                          Settled: ${item.collected.toLocaleString()}
                        </span>
                      </motion.div>
                    )}

                    <div className="flex items-end gap-1.5 sm:gap-2.5 h-full">
                      {/* Billed Bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${billedHeight}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className="w-3.5 sm:w-6 bg-slate-800 rounded-t transition-all group-hover:bg-slate-700"
                        title={`Billed: $${item.billed.toLocaleString()}`}
                      />
                      {/* Collected Bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${collectedHeight}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 + 0.1 }}
                        className="w-3.5 sm:w-6 bg-gradient-to-t from-amber-600 to-amber-400 rounded-t transition-all group-hover:from-amber-500 group-hover:to-amber-300"
                        title={`Collected: $${item.collected.toLocaleString()}`}
                      />
                    </div>
                    <div className="text-xs font-medium text-slate-300 group-hover:text-amber-300 transition-colors">
                      {item.month}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      ${(item.collected / 1000).toFixed(1)}k
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
              <span>98.8% of billed invoices settled within 15 calendar days with ONcue milestone templates.</span>
              <span className="font-mono text-emerald-400 font-semibold">Zero Bad Debt Recorded in 2026</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

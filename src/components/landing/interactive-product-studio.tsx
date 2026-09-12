"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Clock,
  DollarSign,
  Bell,
  Mail,
  MessageSquare,
  Sliders,
  Check,
  ShieldCheck,
  Layers,
  ArrowRight,
  FileText,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MOCK_INVOICES } from "@/lib/mock-data";

export function InteractiveProductStudio() {
  const [activeTab, setActiveTab] = useState<"intelligence" | "plans" | "reminders" | "analytics">(
    "intelligence"
  );

  // Milestone tuner states
  const [totalValue, setTotalValue] = useState(12000);
  const [m1Pct, setM1Pct] = useState(20);
  const [m2Pct, setM2Pct] = useState(30);
  const [m3Pct, setM3Pct] = useState(30);
  const [m4Pct, setM4Pct] = useState(20);
  const [accepted, setAccepted] = useState(false);

  // Monthly chart data (CAD)
  const monthlyData = [
    { month: "Apr", amountCAD: 12000, daysLate: 0, status: "On Time", height: 85 },
    { month: "May", amountCAD: 3400, daysLate: 1, status: "Paid +1d", height: 40 },
    { month: "Jun", amountCAD: 8200, daysLate: 0, status: "On Time", height: 70 },
    { month: "Jul", amountCAD: 5800, daysLate: 2, status: "Paid +2d", height: 55 },
    { month: "Aug", amountCAD: 14000, daysLate: 0, status: "On Time", height: 95 },
    { month: "Sep", amountCAD: 4800, daysLate: 0, status: "Current", height: 50 },
  ];

  return (
    <section id="product-studio" className="py-20 md:py-28 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Studio Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Interactive Product Studio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 mb-4">
            Financial intelligence from first bid to final draw.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Click through the core capabilities below to explore how ONcue underwrites prospective clients, builds milestone structures, and automates payment recovery.
          </p>
        </div>

        {/* Clean Light-Mode Studio Tabs Bar */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 overflow-x-auto max-w-2xl mb-8">
          {[
            { id: "intelligence", label: "01. Client Intelligence" },
            { id: "plans", label: "02. Milestone Plans" },
            { id: "reminders", label: "03. Automated Follow-ups" },
            { id: "analytics", label: "04. Cashflow Analytics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setAccepted(false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === tab.id
                  ? "bg-white text-slate-950 shadow-sm border border-slate-200"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Studio Interactive Display Surface */}
        <div className="fintech-card rounded-2xl p-6 sm:p-10 bg-white border border-slate-200 shadow-xl min-h-[480px]">
          <AnimatePresence mode="wait">
            {/* TAB 1: CLIENT INTELLIGENCE */}
            {activeTab === "intelligence" && (
              <motion.div
                key="intelligence"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* Profile Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-bold font-mono text-xl shrink-0">
                      NR
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                          Northstar Renovations
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified Client
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">
                        General Contracting & Commercial Fit-Outs • Toronto, ON
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 bg-slate-50 px-6 py-3.5 rounded-xl border border-slate-100 shrink-0">
                    <div>
                      <div className="text-xs text-slate-500 font-medium">Payment Reliability Score</div>
                      <div className="text-3xl font-black font-mono text-emerald-600">
                        92 <span className="text-sm font-normal text-slate-400">/ 100</span>
                      </div>
                    </div>
                    <div className="h-10 w-px bg-slate-200" />
                    <div>
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                        Low Risk
                      </span>
                      <div className="text-[11px] text-slate-500 mt-0.5">Top 8% in Ontario</div>
                    </div>
                  </div>
                </div>

                {/* Canadian CAD Financial Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500">Total Invoices</div>
                    <div className="text-lg font-bold font-mono text-slate-950 mt-1">24</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">4 quarters recorded</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500">Paid Invoices</div>
                    <div className="text-lg font-bold font-mono text-emerald-600 mt-1">22</div>
                    <div className="text-[10px] text-emerald-600 mt-0.5">91.6% on terms</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500">Late Payments</div>
                    <div className="text-lg font-bold font-mono text-amber-600 mt-1">2</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">&lt; 3 days late only</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500">Partial Payments</div>
                    <div className="text-lg font-bold font-mono text-slate-950 mt-1">0</div>
                    <div className="text-[10px] text-emerald-600 mt-0.5">Zero holdbacks</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500">Avg Payment Delay</div>
                    <div className="text-lg font-bold font-mono text-emerald-600 mt-1">1.8 days</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Below 16.4d trade avg</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-xs text-slate-500">Total Paid (CAD)</div>
                    <div className="text-lg font-bold font-mono text-slate-950 mt-1">$48,200</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Canadian dollars</div>
                  </div>
                </div>

                {/* Monthly Payment Chart */}
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span>Disbursement Consistency Over Time</span>
                      </h4>
                      <p className="text-xs text-slate-500">Verified Canadian CAD draw history</p>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      Current Outstanding: $6,400 CAD (INV-1042)
                    </span>
                  </div>

                  <div className="grid grid-cols-6 gap-3 sm:gap-6 pt-4 pb-2 items-end border-b border-slate-200 min-h-[160px]">
                    {monthlyData.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1.5 group">
                        <div className="text-[11px] font-mono text-slate-600 font-medium">
                          ${item.amountCAD.toLocaleString()}
                        </div>
                        <div className="w-full max-w-[40px] bg-slate-200/80 rounded-t-lg overflow-hidden flex flex-col justify-end h-28 p-0.5">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${item.height}%` }}
                            transition={{ duration: 0.6, delay: idx * 0.08 }}
                            className={`w-full rounded-t ${
                              item.daysLate === 0 ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                        </div>
                        <div className="text-xs font-semibold text-slate-800">{item.month}</div>
                        <div className="text-[10px] font-mono text-slate-500">{item.status}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Underwriting Recommendation */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      <strong>AI Recommendation:</strong> Consistent payment behavior over 6 months. Safe for standard Net 15 terms with a 20% mobilization deposit.
                    </span>
                  </div>
                  <Link href="/app/clients/northstar-renovations" className="text-amber-800 font-bold shrink-0 hover:underline">
                    View Complete Profile →
                  </Link>
                </div>
              </motion.div>
            )}

            {/* TAB 2: MILESTONE PLANS */}
            {activeTab === "plans" && (
              <motion.div
                key="plans"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">
                      Project Schedule Architecture
                    </span>
                    <h3 className="text-2xl font-bold text-slate-950 tracking-tight mt-0.5">
                      Commercial Interior Painting
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Client: Northstar Renovations • 4-week estimated duration
                    </p>
                  </div>

                  <div className="bg-slate-50 px-5 py-2.5 rounded-xl border border-slate-100 text-right">
                    <div className="text-xs text-slate-500">Contract Total Value</div>
                    <div className="text-2xl font-bold font-mono text-slate-950">
                      ${totalValue.toLocaleString()} CAD
                    </div>
                  </div>
                </div>

                {/* Interactive Milestone Tuner */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Milestone Breakdown & Draw Allocation</span>
                    <span className="font-mono text-emerald-700 font-bold">100% Balanced</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* M1 */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-xs font-mono text-amber-700 font-bold">
                        {m1Pct}% — Upfront Draw
                      </div>
                      <div className="text-xl font-bold font-mono text-slate-950">
                        ${((totalValue * m1Pct) / 100).toLocaleString()} CAD
                      </div>
                      <div className="text-xs font-semibold text-slate-900">Project Start</div>
                      <p className="text-[11px] text-slate-500">
                        Mobilization, site prep, and immediate material procurement.
                      </p>
                    </div>

                    {/* M2 */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-xs font-mono text-amber-700 font-bold">
                        {m2Pct}% — Draw 1
                      </div>
                      <div className="text-xl font-bold font-mono text-slate-950">
                        ${((totalValue * m2Pct) / 100).toLocaleString()} CAD
                      </div>
                      <div className="text-xs font-semibold text-slate-900">Materials & Preparation</div>
                      <p className="text-[11px] text-slate-500">
                        Priming completed, wall sanding & surface protection verified.
                      </p>
                    </div>

                    {/* M3 */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-xs font-mono text-amber-700 font-bold">
                        {m3Pct}% — Draw 2
                      </div>
                      <div className="text-xl font-bold font-mono text-slate-950">
                        ${((totalValue * m3Pct) / 100).toLocaleString()} CAD
                      </div>
                      <div className="text-xs font-semibold text-slate-900">Midpoint Completion</div>
                      <p className="text-[11px] text-slate-500">
                        First coat finish, trim installation, client inspection walk.
                      </p>
                    </div>

                    {/* M4 */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-xs font-mono text-amber-700 font-bold">
                        {m4Pct}% — Final Draw
                      </div>
                      <div className="text-xl font-bold font-mono text-slate-950">
                        ${((totalValue * m4Pct) / 100).toLocaleString()} CAD
                      </div>
                      <div className="text-xs font-semibold text-slate-900">Final Completion</div>
                      <p className="text-[11px] text-slate-500">
                        Punch-list clearance and final sign-off release.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-slate-500 max-w-md">
                    Payment structures can be adjusted by the contractor at any stage. Attach conditional sign-offs or holdback releases.
                  </p>

                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      onClick={() => setAccepted(true)}
                      className={`font-bold h-9 px-6 text-xs transition-all ${
                        accepted
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-amber-500 hover:bg-amber-600 text-slate-950"
                      }`}
                    >
                      {accepted ? "Plan Accepted ✓" : "Accept Plan"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: AUTOMATED REMINDERS */}
            {activeTab === "reminders" && (
              <motion.div
                key="reminders"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                      Spend less time chasing invoices.
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Multi-channel automated sequence delivering polite notices via SMS & Email.
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Automated Engine Active
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      step: "01",
                      timing: "3 days before due date",
                      status: "Payment reminder sent",
                      desc: "Friendly heads-up with 1-click Interac e-Transfer and EFT payment instructions.",
                      channels: ["Email", "SMS"],
                      color: "text-slate-900",
                    },
                    {
                      step: "02",
                      timing: "Due date",
                      status: "Payment due notification",
                      desc: "Formal remittance receipt request verifying milestone sign-off maturity.",
                      channels: ["Email", "SMS"],
                      color: "text-amber-700",
                    },
                    {
                      step: "03",
                      timing: "3 days overdue",
                      status: "Follow-up reminder",
                      desc: "Automated accounting escalation with work-stoppage terms attached.",
                      channels: ["Email", "SMS"],
                      color: "text-rose-700",
                    },
                  ].map((rem, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-mono font-bold text-xs text-amber-700 shadow-sm">
                          {rem.step}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-500">{rem.timing}</span>
                            <span className="text-slate-300">•</span>
                            <span className={`text-sm font-bold ${rem.color}`}>{rem.status}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">{rem.desc}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-white text-slate-700 border border-slate-200 font-mono">
                          <Mail className="w-3.5 h-3.5 text-amber-600" />
                          Email
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-white text-slate-700 border border-slate-200 font-mono">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                          SMS
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 flex items-center justify-between">
                  <span>Contractors using automated follow-ups get settled 19 days faster on average.</span>
                  <Link href="/app/settings" className="text-amber-800 font-bold hover:underline">
                    Configure Rules in Settings →
                  </Link>
                </div>
              </motion.div>
            )}

            {/* TAB 4: CASHFLOW ANALYTICS */}
            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-950 tracking-tight">
                      Financial analytics engineered for trade operations.
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Real-time visibility into collection speed, regional benchmarks, and cash predictability.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500">Total Revenue (YTD)</div>
                    <div className="text-2xl font-bold font-mono text-slate-950 mt-1">$184,200</div>
                    <div className="text-[10px] text-emerald-600 mt-1 font-medium">+18.4% vs last year</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500">Outstanding Payments</div>
                    <div className="text-2xl font-bold font-mono text-slate-950 mt-1">$14,800</div>
                    <div className="text-[10px] text-slate-500 mt-1">Under standard terms</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500">Overdue Payments</div>
                    <div className="text-2xl font-bold font-mono text-rose-600 mt-1">$2,100</div>
                    <div className="text-[10px] text-rose-600 mt-1">Down 68% with ONcue</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-xs text-slate-500">Average Payment Time</div>
                    <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">14.2 days</div>
                    <div className="text-[10px] text-slate-500 mt-1">Industry avg: 33.6d</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                    <div className="text-xs text-slate-500">Collection Rate</div>
                    <div className="text-2xl font-bold font-mono text-slate-950 mt-1">96.4%</div>
                    <div className="text-[10px] text-emerald-600 mt-1 font-medium">Top tier in Ontario</div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                  <span>98.8% of billed milestone draws settled on schedule. Zero bad debt recorded.</span>
                  <Link href="/app/analytics" className="text-amber-800 font-bold hover:underline">
                    View Full Analytics Dashboard →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

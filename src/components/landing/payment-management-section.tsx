"use client";

import * as React from "react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MOCK_INVOICES } from "@/lib/mock-data";

export function PaymentManagementSection() {
  const [filter, setFilter] = useState<"All" | "Pending" | "Overdue" | "Paid">("All");

  const invoices = MOCK_INVOICES.filter(
    (inv) => filter === "All" || inv.status === filter
  );

  return (
    <section id="payment-management" className="py-20 md:py-28 bg-[#080c14] border-t border-white/[0.07] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
            Cash Flow Execution
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            From the first invoice to the final payment.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            ONcue tracks every dollar across all active jobs. Monitor milestone draws, overdue flags, and automated reminder queues in one streamlined view.
          </p>
        </div>

        {/* Dashboard Cards Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
          <div className="fintech-card card-specular rounded-xl p-4.5 bg-[#0d1322]">
            <div className="text-xs text-slate-400">Upcoming Payments</div>
            <div className="text-xl font-bold font-mono text-white mt-1">$14,400</div>
            <div className="text-[11px] text-slate-400 mt-0.5">3 milestones queued</div>
          </div>

          <div className="fintech-card card-specular rounded-xl p-4.5 bg-[#0d1322]">
            <div className="text-xs text-slate-400">Pending Payments</div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1">$4,800</div>
            <div className="text-[11px] text-amber-400/80 mt-0.5">INV-1042 due Sep 18</div>
          </div>

          <div className="fintech-card card-specular rounded-xl p-4.5 bg-[#0d1322]">
            <div className="text-xs text-slate-400">Overdue Payments</div>
            <div className="text-xl font-bold font-mono text-rose-400 mt-1">$3,200</div>
            <div className="text-[11px] text-rose-400/80 mt-0.5">1 invoice flagged</div>
          </div>

          <div className="fintech-card card-specular rounded-xl p-4.5 bg-[#0d1322]">
            <div className="text-xs text-slate-400">Paid Invoices (MTD)</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">$19,800</div>
            <div className="text-[11px] text-emerald-400/80 mt-0.5">100% settled</div>
          </div>

          <div className="fintech-card card-specular rounded-xl p-4.5 bg-[#0d1322] col-span-2 sm:col-span-1">
            <div className="text-xs text-slate-400">Outstanding Balance</div>
            <div className="text-xl font-bold font-mono text-white mt-1">$8,000</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Canadian Dollars (CAD)</div>
          </div>
        </div>

        {/* Invoice Table Container */}
        <div className="fintech-card card-specular rounded-2xl bg-[#0d1322] border border-white/10 overflow-hidden shadow-2xl">
          {/* Table Header Controls */}
          <div className="p-4 sm:p-5 border-b border-white/[0.07] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight">Active Invoices</span>
              <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-white/[0.04]">
                {invoices.length} Records
              </span>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-white/10 text-xs">
              {(["All", "Pending", "Overdue", "Paid"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    filter === s
                      ? "bg-amber-500/20 text-amber-300 font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 uppercase font-mono tracking-wider bg-slate-950/40">
                  <th className="py-3 px-5">Client</th>
                  <th className="py-3 px-5">Invoice</th>
                  <th className="py-3 px-5">Project / Milestone</th>
                  <th className="py-3 px-5">Amount (CAD)</th>
                  <th className="py-3 px-5">Due Date</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="py-3.5 px-5 font-medium text-white">
                      <Link href={`/app/clients/${inv.clientId}`} className="hover:text-amber-400">
                        {inv.clientName}
                      </Link>
                    </td>
                    <td className="py-3.5 px-5 font-mono text-slate-300">{inv.id}</td>
                    <td className="py-3.5 px-5 text-slate-300">
                      <div>{inv.projectName}</div>
                      <div className="text-[11px] text-slate-400">{inv.milestone}</div>
                    </td>
                    <td className="py-3.5 px-5 font-mono font-bold text-white">
                      ${inv.amountCAD.toLocaleString()} CAD
                    </td>
                    <td className="py-3.5 px-5 text-slate-300 font-mono">{inv.dueDate}</td>
                    <td className="py-3.5 px-5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium text-[11px] ${
                          inv.status === "Paid"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : inv.status === "Pending"
                            ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                            : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <Link
                        href={`/app/invoices/${inv.id}`}
                        className="text-xs text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Card View */}
          <div className="md:hidden divide-y divide-white/5">
            {invoices.map((inv) => (
              <div key={inv.id} className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-sm font-semibold text-white">{inv.clientName}</h5>
                    <span className="text-xs font-mono text-slate-400">{inv.id}</span>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium text-xs ${
                      inv.status === "Paid"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : inv.status === "Pending"
                        ? "bg-amber-500/15 text-amber-400"
                        : "bg-rose-500/15 text-rose-400"
                    }`}
                  >
                    {inv.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400">{inv.milestone}</div>
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="font-mono font-bold text-white text-sm">
                    ${inv.amountCAD.toLocaleString()} CAD
                  </span>
                  <span className="text-slate-400 font-mono">Due {inv.dueDate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Footer */}
          <div className="p-3.5 sm:px-5 bg-slate-950/60 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Automated payment reminders active on all pending records</span>
            <Link href="/app/invoices" className="text-amber-400 hover:text-amber-300 font-medium">
              View all 24 invoices in app →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

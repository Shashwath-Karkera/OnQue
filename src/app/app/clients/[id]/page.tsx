"use client";

import * as React from "react";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Plus,
  CreditCard,
  Building2,
  Layers,
  Calendar,
  FileText,
  TrendingUp,
  ShieldCheck,
  Percent,
  Clock,
} from "lucide-react";

export default function ClientProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<
    "overview" | "payments" | "projects" | "activity"
  >("overview");

  const isNorthstar = params?.id === "1" || params?.id === "northstar-renovations";

  const client = {
    name: isNorthstar ? "Northstar Renovations" : "Apex Construction Group",
    trade: isNorthstar ? "General Contractor" : "Commercial General Contractor",
    location: isNorthstar ? "Toronto, Canada" : "Mississauga, Canada",
    score: isNorthstar ? 92 : 71,
    risk: isNorthstar ? "Low Risk" : "Medium Risk",
    invoicesCount: isNorthstar ? 24 : 18,
    onTimeCount: isNorthstar ? 22 : 13,
    avgDelay: isNorthstar ? "1.8 days" : "6.2 days",
    totalSettled: isNorthstar ? "$148,200" : "$94,400",
    outstanding: isNorthstar ? "$6,400" : "$12,800",
  };

  return (
    <div className="space-y-8">
      {/* 1. Header with Breadcrumb & Action Buttons */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-[#8492A6]">
          <Link
            href="/app/clients"
            className="hover:text-[#F0F3F6] flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Clients</span>
          </Link>
          <span>/</span>
          <span className="text-[#F0F3F6] font-medium">{client.name}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#22262B]">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F0F3F6]">
                {client.name}
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  client.risk === "Low Risk"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}
              >
                {client.risk}
              </span>
            </div>
            <p className="text-xs text-[#8492A6] mt-1">
              {client.trade} · {client.location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/app/projects"
              className="px-3.5 py-1.5 rounded-lg bg-[#161A1D] hover:bg-[#22262B] border border-white/10 text-xs font-medium text-[#F0F3F6] transition-colors"
            >
              New Project
            </Link>
            <Link
              href="/app/payments"
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-xs font-medium text-white transition-all shadow-[0_4px_16px_rgba(37,99,235,0.3)]"
            >
              Record Payment
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Attractive Glassmorphic Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Score */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-emerald-500/40 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6] uppercase tracking-wider font-mono">
              Reliability
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl sm:text-4xl font-bold text-[#F0F3F6] font-mono">
              {client.score}
            </span>
            <span className="text-xs text-[#8492A6]">/ 100</span>
          </div>
          <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>High Reliability Score</span>
          </div>
        </div>

        {/* Card 2: Settlement Record */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-blue-500/40 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6] uppercase tracking-wider font-mono">
              Settlement
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F6] mt-2 font-mono">
            {client.onTimeCount} of {client.invoicesCount}
          </div>
          <div className="text-xs text-[#8492A6] mt-2">
            92% settled strictly on time
          </div>
        </div>

        {/* Card 3: Avg Delay */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-cyan-500/40 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6] uppercase tracking-wider font-mono">
              Avg Delay
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F6] mt-2 font-mono">
            {client.avgDelay}
          </div>
          <div className="text-xs text-[#8492A6] mt-2">
            Standard: Net 15 Days
          </div>
        </div>

        {/* Card 4: Settled Volume */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-amber-500/40 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6] uppercase tracking-wider font-mono">
              Volume
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F6] mt-2 font-mono">
            {client.totalSettled}
          </div>
          <div className="text-xs text-amber-400/90 mt-2 font-mono">
            {client.outstanding} active outstanding
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="border-b border-[#22262B]">
        <nav className="flex items-center gap-8 text-xs font-medium text-[#8492A6]">
          {(["overview", "payments", "projects", "activity"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 capitalize transition-colors ${
                  activeTab === tab
                    ? "text-[#F0F3F6] border-b-2 border-[#3B82F6]"
                    : "hover:text-[#F0F3F6]"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Tab: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* ONcue AI Insight Glass Card */}
          <div className="rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-[#141820]/80 to-[#0E1117] p-5 shadow-xl backdrop-blur-md flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wider font-mono text-[#F0F3F6] flex items-center gap-2">
                <span>ONcue Payment Intelligence</span>
                <span className="text-[10px] text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Calibrated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed">
                Payment behavior has remained consistent over the last 6 months.
                Most invoices are paid within the agreed Net 15 schedule. Minor
                delays only occurred on retainage closeouts exceeding $25,000.
              </p>
            </div>
          </div>

          {/* Recommended Terms in 3 Interactive Cards */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Recommended Contract Terms</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md hover:border-blue-500/40 transition-colors">
                <div className="text-xs text-[#8492A6]">Upfront Deposit</div>
                <div className="text-xl font-bold text-[#F0F3F6] mt-2">
                  20% Upfront
                </div>
                <div className="text-[11px] text-[#8492A6] mt-1">
                  Protects initial mobilization & materials
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md hover:border-blue-500/40 transition-colors">
                <div className="text-xs text-[#8492A6]">Payment Window</div>
                <div className="text-xl font-bold text-[#F0F3F6] mt-2">
                  Net 15 Days
                </div>
                <div className="text-[11px] text-[#8492A6] mt-1">
                  Matches client historical turnaround
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md hover:border-blue-500/40 transition-colors">
                <div className="text-xs text-[#8492A6]">Billing Schedule</div>
                <div className="text-xl font-bold text-[#F0F3F6] mt-2">
                  Milestone Draws
                </div>
                <div className="text-[11px] text-[#8492A6] mt-1">
                  Rough-in, inspection, final completion
                </div>
              </div>
            </div>
          </div>

          {/* Payment Behavior Statistics Breakdown Card */}
          <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#141820]/80 to-[#0E1117] p-6 shadow-xl backdrop-blur-md space-y-4">
            <div className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Historical Settlement Breakdown
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-lg bg-[#0A0D12] border border-white/5">
                <div className="text-xs text-[#8492A6]">On-time Payments</div>
                <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">
                  22 (92%)
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0A0D12] border border-white/5">
                <div className="text-xs text-[#8492A6]">Late Payments</div>
                <div className="text-xl font-bold text-[#F0F3F6] mt-1 font-mono">
                  2 (8%)
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0A0D12] border border-white/5">
                <div className="text-xs text-[#8492A6]">Partial Payments</div>
                <div className="text-xl font-bold text-[#F0F3F6] mt-1 font-mono">
                  0 (0%)
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0A0D12] border border-white/5">
                <div className="text-xs text-[#8492A6]">Disputed Invoices</div>
                <div className="text-xl font-bold text-[#F0F3F6] mt-1 font-mono">
                  0 (0%)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: PAYMENTS */}
      {activeTab === "payments" && (
        <div className="rounded-xl border border-white/10 bg-[#111417] p-5 shadow-xl backdrop-blur-md">
          <div className="overflow-x-auto rounded-lg border border-white/5 bg-[#0A0D12]">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/5 text-[#8492A6] bg-[#0E1218]">
                  <th className="py-3 px-4 font-medium">Invoice</th>
                  <th className="py-3 px-4 font-medium">Amount</th>
                  <th className="py-3 px-4 font-medium">Issued</th>
                  <th className="py-3 px-4 font-medium">Due</th>
                  <th className="py-3 px-4 font-medium">Paid</th>
                  <th className="py-3 px-4 font-medium">Delay</th>
                  <th className="py-3 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3.5 px-4 font-mono text-[#F0F3F6]">
                    INV-2024-041
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#F0F3F6] font-mono">
                    $12,400
                  </td>
                  <td className="py-3.5 px-4 text-[#8492A6]">Sep 29, 2024</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">Oct 14, 2024</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">Oct 13, 2024</td>
                  <td className="py-3.5 px-4 text-emerald-400">On time</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Paid
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono text-[#F0F3F6]">
                    INV-2024-038
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#F0F3F6] font-mono">
                    $8,600
                  </td>
                  <td className="py-3.5 px-4 text-[#8492A6]">Sep 13, 2024</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">Sep 28, 2024</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">Sep 30, 2024</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">+2 days</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Paid
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-mono text-[#F0F3F6]">
                    INV-2024-049
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#F0F3F6] font-mono">
                    $6,400
                  </td>
                  <td className="py-3.5 px-4 text-[#8492A6]">Oct 18, 2024</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">Nov 02, 2024</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">—</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">—</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: PROJECTS */}
      {activeTab === "projects" && (
        <div className="rounded-xl border border-white/10 bg-[#111417] p-5 shadow-xl backdrop-blur-md">
          <div className="overflow-x-auto rounded-lg border border-white/5 bg-[#0A0D12]">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/5 text-[#8492A6] bg-[#0E1218]">
                  <th className="py-3 px-4 font-medium">Project Name</th>
                  <th className="py-3 px-4 font-medium">Contract Value</th>
                  <th className="py-3 px-4 font-medium">Start Date</th>
                  <th className="py-3 px-4 font-medium">Outstanding</th>
                  <th className="py-3 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                    Bay Street Office Fit-out
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#F0F3F6]">$48,000</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">Aug 15, 2024</td>
                  <td className="py-3.5 px-4 font-mono text-[#F0F3F6]">$6,400</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      In Progress
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                    Yorkville Retail Expansion
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#F0F3F6]">$32,500</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">May 10, 2024</td>
                  <td className="py-3.5 px-4 font-mono text-emerald-400">$0</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: ACTIVITY */}
      {activeTab === "activity" && (
        <div className="rounded-xl border border-white/10 bg-[#111417] p-6 shadow-xl backdrop-blur-md space-y-4">
          <div className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
            Recent Activity Feed
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 text-[#A0AEC0] p-3 rounded-lg bg-[#0A0D12] border border-white/5">
              <span className="font-mono text-emerald-400 font-semibold shrink-0">Oct 13:</span>
              <span>Invoice #INV-2024-041 paid in full ($12,400 via EFT).</span>
            </div>
            <div className="flex items-start gap-3 text-[#A0AEC0] p-3 rounded-lg bg-[#0A0D12] border border-white/5">
              <span className="font-mono text-blue-400 font-semibold shrink-0">Sep 29:</span>
              <span>Milestone 2 completed on Bay Street Office Fit-out.</span>
            </div>
            <div className="flex items-start gap-3 text-[#A0AEC0] p-3 rounded-lg bg-[#0A0D12] border border-white/5">
              <span className="font-mono text-amber-400 font-semibold shrink-0">Sep 30:</span>
              <span>Invoice #INV-2024-038 settled with 2-day grace period.</span>
            </div>
          </div>
        </div>
      )}

      {/* Subtle Informational Disclaimer */}
      <div className="text-[11px] text-[#555E6C] leading-relaxed pt-2">
        Risk indicators are based on available payment history and are intended
        for informational purposes only. They do not guarantee future payment
        behavior.
      </div>
    </div>
  );
}

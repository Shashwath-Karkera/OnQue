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
} from "lucide-react";

export default function ClientProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<
    "overview" | "payments" | "projects" | "activity"
  >("overview");

  // Normalized client details for highest quality presentation
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
              <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
                {client.name}
              </h1>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium border ${
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
              className="px-3.5 py-1.5 rounded-md bg-[#161A1D] hover:bg-[#22262B] border border-[#22262B] text-xs font-medium text-[#F0F3F6] transition-colors"
            >
              New Project
            </Link>
            <Link
              href="/app/payments"
              className="px-3.5 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-medium text-white transition-colors shadow-sm"
            >
              Record Payment
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Single Unified Summary Area (NOT 5 different cards) */}
      <div className="p-6 rounded-lg bg-[#111417] border border-[#22262B]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Score & Risk */}
          <div className="md:border-r border-[#22262B] md:pr-6">
            <div className="text-xs font-mono uppercase tracking-wider text-[#8492A6]">
              Payment Reliability
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-semibold text-[#F0F3F6]">
                {client.score}
              </span>
              <span className="text-sm text-[#8492A6]">/ 100</span>
            </div>
            <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{client.risk}</span>
            </div>
          </div>

          {/* Settlement Track */}
          <div className="md:border-r border-[#22262B] md:pr-6">
            <div className="text-xs font-mono uppercase tracking-wider text-[#8492A6]">
              Settlement Record
            </div>
            <div className="text-2xl font-semibold text-[#F0F3F6] mt-2">
              {client.onTimeCount} of {client.invoicesCount}
            </div>
            <div className="text-xs text-[#8492A6] mt-1">
              Invoices settled strictly on time
            </div>
          </div>

          {/* Average Delay */}
          <div className="md:border-r border-[#22262B] md:pr-6">
            <div className="text-xs font-mono uppercase tracking-wider text-[#8492A6]">
              Average Payment Delay
            </div>
            <div className="text-2xl font-semibold text-[#F0F3F6] mt-2 font-mono">
              {client.avgDelay}
            </div>
            <div className="text-xs text-[#8492A6] mt-1">
              Contracted terms: Net 15
            </div>
          </div>

          {/* Financial Volume */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#8492A6]">
              Settled Volume
            </div>
            <div className="text-2xl font-semibold text-[#F0F3F6] mt-2 font-mono">
              {client.totalSettled}
            </div>
            <div className="text-xs text-[#8492A6] mt-1">
              {client.outstanding} active outstanding
            </div>
          </div>
        </div>
      </div>

      {/* 3. Clean Tabs */}
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
        <div className="space-y-8">
          {/* ONcue AI Insight */}
          <div className="p-5 rounded-lg border border-[#22262B] bg-[#161A1D]/50 flex items-start gap-3.5">
            <Sparkles className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wider font-mono text-[#F0F3F6]">
                ONcue Payment Intelligence
              </div>
              <p className="text-xs text-[#A0AEC0] leading-relaxed">
                Payment behavior has remained consistent over the last 6 months.
                Most invoices are paid within the agreed terms. Average delay is
                minimal (1.8 days), primarily concentrated around end-of-year
                retainage closeouts.
              </p>
            </div>
          </div>

          {/* Recommended Terms (Extremely Clean) */}
          <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-4">
            <div className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Recommended Contract Terms
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-md border border-[#22262B] bg-[#0B0D0F]">
                <div className="text-xs text-[#8492A6]">Upfront Deposit</div>
                <div className="text-lg font-semibold text-[#F0F3F6] mt-1">
                  20% Upfront
                </div>
                <div className="text-[11px] text-[#8492A6] mt-0.5">
                  Standard material commitment
                </div>
              </div>

              <div className="p-4 rounded-md border border-[#22262B] bg-[#0B0D0F]">
                <div className="text-xs text-[#8492A6]">Payment Window</div>
                <div className="text-lg font-semibold text-[#F0F3F6] mt-1">
                  Net 15 Days
                </div>
                <div className="text-[11px] text-[#8492A6] mt-0.5">
                  Matches client historical turnaround
                </div>
              </div>

              <div className="p-4 rounded-md border border-[#22262B] bg-[#0B0D0F]">
                <div className="text-xs text-[#8492A6]">Billing Schedule</div>
                <div className="text-lg font-semibold text-[#F0F3F6] mt-1">
                  Milestone-Based Billing
                </div>
                <div className="text-[11px] text-[#8492A6] mt-0.5">
                  Rough-in, inspection, final completion
                </div>
              </div>
            </div>
          </div>

          {/* Payment Behavior Statistics Breakdown */}
          <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-4">
            <div className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Payment Behavior Breakdown
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-[#8492A6]">On-time Payments</div>
                <div className="text-xl font-semibold text-emerald-400 mt-1 font-mono">
                  22 (92%)
                </div>
              </div>
              <div>
                <div className="text-xs text-[#8492A6]">Late Payments</div>
                <div className="text-xl font-semibold text-[#F0F3F6] mt-1 font-mono">
                  2 (8%)
                </div>
              </div>
              <div>
                <div className="text-xs text-[#8492A6]">Partial Payments</div>
                <div className="text-xl font-semibold text-[#F0F3F6] mt-1 font-mono">
                  0 (0%)
                </div>
              </div>
              <div>
                <div className="text-xs text-[#8492A6]">Disputed Invoices</div>
                <div className="text-xl font-semibold text-[#F0F3F6] mt-1 font-mono">
                  0 (0%)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: PAYMENTS */}
      {activeTab === "payments" && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#22262B] text-[#8492A6] bg-[#0E1114]">
                  <th className="py-3 px-4 font-medium">Invoice</th>
                  <th className="py-3 px-4 font-medium">Amount</th>
                  <th className="py-3 px-4 font-medium">Issued</th>
                  <th className="py-3 px-4 font-medium">Due</th>
                  <th className="py-3 px-4 font-medium">Paid</th>
                  <th className="py-3 px-4 font-medium">Delay</th>
                  <th className="py-3 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22262B]">
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
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
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
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#22262B] text-[#8492A6] bg-[#0E1114]">
                  <th className="py-3 px-4 font-medium">Project Name</th>
                  <th className="py-3 px-4 font-medium">Contract Value</th>
                  <th className="py-3 px-4 font-medium">Start Date</th>
                  <th className="py-3 px-4 font-medium">Outstanding</th>
                  <th className="py-3 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22262B]">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                    Bay Street Office Fit-out
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#F0F3F6]">$48,000</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">Aug 15, 2024</td>
                  <td className="py-3.5 px-4 font-mono text-[#F0F3F6]">$6,400</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
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
                    <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
        <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-4">
          <div className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
            Recent Timeline
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 text-[#A0AEC0]">
              <span className="font-mono text-[#8492A6] shrink-0">Oct 13:</span>
              <span>Invoice #INV-2024-041 paid in full ($12,400 via EFT).</span>
            </div>
            <div className="flex items-start gap-3 text-[#A0AEC0]">
              <span className="font-mono text-[#8492A6] shrink-0">Sep 29:</span>
              <span>Milestone 2 completed on Bay Street Office Fit-out.</span>
            </div>
            <div className="flex items-start gap-3 text-[#A0AEC0]">
              <span className="font-mono text-[#8492A6] shrink-0">Sep 30:</span>
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

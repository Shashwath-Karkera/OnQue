"use client";

import * as React from "react";
import Link from "next/link";
import {
  DollarSign,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Plus,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  ArrowUpRight,
  CreditCard,
  Building,
  Sparkles,
  ChevronRight,
  Layers,
} from "lucide-react";

const RECENT_PAYMENTS = [
  {
    client: "Northstar Renovations",
    invoice: "INV-2024-041",
    amount: "$12,400",
    dueDate: "Oct 14, 2024",
    status: "Paid",
    delay: "On time",
  },
  {
    client: "Apex Construction Group",
    invoice: "INV-2024-039",
    amount: "$8,400",
    dueDate: "Oct 02, 2024",
    status: "Paid",
    delay: "+3 days",
  },
  {
    client: "Summit Commercial Fitouts",
    invoice: "INV-2024-045",
    amount: "$15,200",
    dueDate: "Nov 01, 2024",
    status: "Pending",
    delay: "Due in 12 days",
  },
  {
    client: "Vanguard Properties",
    invoice: "INV-2024-032",
    amount: "$6,800",
    dueDate: "Sep 18, 2024",
    status: "Overdue",
    delay: "14 days late",
  },
];

const ATTENTION_CARDS = [
  {
    id: 1,
    title: "Vanguard Properties — Invoice #1032 is 14 days overdue",
    detail: "$6,800 outstanding for HVAC rough-in phase. AI recommends pausing finish trim staging.",
    level: "high",
    tag: "High Action Required",
    link: "/app/invoices",
    icon: AlertTriangle,
  },
  {
    id: 2,
    title: "Upcoming payment due: Summit Commercial ($15,200)",
    detail: "Milestone 2 sign-off complete. Automated Net 15 reminder scheduled in 48 hours.",
    level: "normal",
    tag: "Scheduled Settlement",
    link: "/app/payments",
    icon: Clock,
  },
  {
    id: 3,
    title: "Apex Construction risk indicator changed to Medium Risk",
    detail: "Average payment delay has extended from 2.1 to 6.2 days over last 2 billing cycles.",
    level: "medium",
    tag: "Reliability Alert",
    link: "/app/clients/2",
    icon: ShieldAlert,
  },
];

export default function AppDashboardPage() {
  return (
    <div className="space-y-8">
      {/* 1. Header with Gradient Accent */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#22262B]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F0F3F6] flex items-center gap-2">
            <span>Good morning, Shashwath</span>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          </h1>
          <p className="text-xs sm:text-sm text-[#8492A6] mt-1">
            Here's what needs your attention today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/app/clients"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs font-medium transition-all shadow-[0_4px_16px_rgba(37,99,235,0.3)] flex items-center gap-1.5 active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Client</span>
          </Link>
        </div>
      </div>

      {/* 2. Attractive Glassmorphic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-blue-500/40 hover:shadow-[0_8px_24px_rgba(37,99,235,0.15)] hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6]">Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F6] mt-3 font-mono">
            $42,800
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% from last month</span>
          </div>
        </div>

        {/* Card 2: Outstanding */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-cyan-500/40 hover:shadow-[0_8px_24px_rgba(6,182,212,0.15)] hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6]">Outstanding</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F6] mt-3 font-mono">
            $8,400
          </div>
          <div className="text-[11px] text-[#8492A6] mt-2">
            Across 3 active milestones
          </div>
        </div>

        {/* Card 3: Active Clients */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-emerald-500/40 hover:shadow-[0_8px_24px_rgba(16,185,129,0.15)] hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6]">Active Clients</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F6] mt-3 font-mono">
            6
          </div>
          <div className="text-[11px] text-emerald-400/90 mt-2">
            4 Low Risk · 2 Monitored
          </div>
        </div>

        {/* Card 4: Overdue */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-rose-500/40 hover:shadow-[0_8px_24px_rgba(244,63,94,0.15)] hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-500/0 via-rose-500/50 to-rose-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6]">Overdue</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-rose-400 mt-3 font-mono">
            2
          </div>
          <div className="text-[11px] text-rose-400/80 mt-2">
            Requires follow-up notice
          </div>
        </div>
      </div>

      {/* 3. Attention Required (Card Grid rather than plain list) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Attention Required
            </h2>
          </div>
          <span className="text-xs font-mono text-[#8492A6]">3 priority actions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ATTENTION_CARDS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.link}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#141820]/90 to-[#0E1117] p-5 shadow-lg backdrop-blur-md transition-all hover:border-blue-500/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:-translate-y-1 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${item.level === "high"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : item.level === "medium"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                    >
                      {item.tag}
                    </span>
                    <Icon
                      className={`w-4 h-4 ${item.level === "high"
                        ? "text-rose-400"
                        : item.level === "medium"
                          ? "text-amber-400"
                          : "text-blue-400"
                        }`}
                    />
                  </div>

                  <h3 className="text-xs font-semibold text-[#F0F3F6] group-hover:text-blue-400 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#8492A6] leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-white/5 flex items-center justify-between text-xs text-blue-400 font-medium group-hover:text-blue-300">
                  <span>Take action</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 4. Recent Payments (Card wrapper with beautiful header) */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#141820]/80 to-[#0E1117] p-5 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-[#F0F3F6]">
              Recent Payments & Remittances
            </h2>
          </div>
          <Link
            href="/app/payments"
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium transition-colors"
          >
            <span>View all ledger entries</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg border border-white/5 bg-[#0A0D12]/70">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/5 text-[#8492A6] bg-[#0E1218]/60">
                <th className="py-3 px-4 font-medium">Client</th>
                <th className="py-3 px-4 font-medium">Invoice</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium">Due Date</th>
                <th className="py-3 px-4 font-medium">Delay Track</th>
                <th className="py-3 px-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {RECENT_PAYMENTS.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                    {row.client}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#8492A6]">
                    {row.invoice}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#F0F3F6] font-mono">
                    {row.amount}
                  </td>
                  <td className="py-3.5 px-4 text-[#8492A6]">{row.dueDate}</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">{row.delay}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${row.status === "Paid"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : row.status === "Pending"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Settlement Velocity Trend Card */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#141820]/80 to-[#0E1117] p-6 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
                Settlement Velocity Trend
              </h3>
            </div>
            <p className="text-xs text-[#8492A6] mt-1">
              Average days to receive funds upon invoice generation over past 6 months
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 self-start sm:self-auto">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>-3.2 days improvement</span>
          </div>
        </div>

        {/* Dynamic Glassmorphic Bar Graph */}
        <div className="h-32 flex items-end justify-between gap-3 pt-6 border-b border-white/5 pb-3">
          {[
            { month: "May", days: 12.4, val: 55 },
            { month: "Jun", days: 10.8, val: 48 },
            { month: "Jul", days: 9.1, val: 40 },
            { month: "Aug", days: 7.6, val: 34 },
            { month: "Sep", days: 5.2, val: 24 },
            { month: "Oct (MTD)", days: 4.8, val: 22 },
          ].map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="text-[10px] font-mono text-[#8492A6]">
                {item.days}d
              </div>
              <div
                className="w-full max-w-[48px] bg-gradient-to-t from-blue-900/40 via-blue-600/60 to-blue-500 rounded-t-md hover:from-blue-600 hover:to-cyan-400 transition-all cursor-pointer shadow-[0_2px_8px_rgba(37,99,235,0.2)]"
                style={{ height: `${item.val * 1.5}px` }}
              />
              <div className="text-[11px] text-[#8492A6] font-mono">
                {item.month}
              </div>
            </div>
          ))}
        </div>

        <div className="text-[11px] text-[#8492A6] flex flex-col sm:flex-row items-center justify-between gap-2 pt-1">
          <span>Target contractual settlement: Net 15 days</span>
          <span className="text-[#F0F3F6] font-medium">Current portfolio median: 4.8 days</span>
        </div>
      </div>
    </div>
  );
}

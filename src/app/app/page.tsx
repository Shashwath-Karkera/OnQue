"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  DollarSign,
  Users,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Building,
  Sparkles,
  ChevronRight,
  Layers,
} from "lucide-react";

export default function AppDashboardPage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<{
    totalRevenueSettled: number;
    totalOutstanding: number;
    activeClientsCount: number;
    overdueInvoicesCount: number;
    averageDelayDays: number;
    recentPayments: any[];
    attentionCards: any[];
    velocityTrend?: { month: string; days: number; val: number; count: number }[];
  }>({
    totalRevenueSettled: 0,
    totalOutstanding: 0,
    activeClientsCount: 0,
    overdueInvoicesCount: 0,
    averageDelayDays: 0,
    recentPayments: [],
    attentionCards: [],
    velocityTrend: [],
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/analytics").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([userData, analyticsData]) => {
        if (userData?.user) {
          setUser(userData.user);
        }
        if (analyticsData?.metrics) {
          setMetrics(analyticsData.metrics);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const attentionCardsToRender = metrics.attentionCards || [];

  const paymentsToRender = (metrics.recentPayments || []).map((p: any) => ({
    client: p.client_name || "Direct Client",
    invoice: p.invoice_number || "INV-SETTLED",
    amount: formatCurrency(Number(p.amount_cad || 0)),
    dueDate: p.due_date
      ? new Date(p.due_date).toLocaleDateString("en-CA", {
          month: "short",
          day: "numeric",
        })
      : "-",
    delay: p.delay_days > 0 ? `+${p.delay_days}d late` : "Settled on time",
    status: p.settlement_status || "Paid",
  }));

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-8 antialiased">
      {/* 1. Header with Gradient Accent & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#22262B]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F0F3F6] flex items-center gap-2">
            <span>{getGreeting()}, {user?.name ? user.name.split(" ")[0] : "Contractor"}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </h1>
          <p className="text-xs sm:text-sm text-[#8492A6] mt-1">
            Real-time payment intelligence and settlement metrics from Neon database.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/app/projects"
            className="px-3.5 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors shadow-sm"
          >
            + New Project
          </Link>
          <Link
            href="/app/invoices"
            className="px-3 py-2 rounded-md bg-[#161A1D] hover:bg-[#20252B] border border-[#22262B] text-xs font-medium text-[#F0F3F6] transition-colors"
          >
            + Bill Client
          </Link>
          <Link
            href="/app/payments"
            className="px-3 py-2 rounded-md bg-[#161A1D] hover:bg-[#20252B] border border-[#22262B] text-xs font-medium text-emerald-400 transition-colors"
          >
            Record Payment
          </Link>
        </div>
      </div>

      {/* Simplified 3-Step Life Cycle Guide */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-r from-blue-950/20 via-[#111417] to-emerald-950/20 p-4 shadow-md">
        <div className="text-[11px] font-mono text-[#8492A6] uppercase tracking-wider mb-2 font-semibold flex items-center gap-2">
          <span>Simple 3-Step Project Workflow</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link
            href="/app/projects"
            className="p-3 rounded-lg bg-[#0B0D0F]/70 border border-white/5 hover:border-blue-500/30 transition-colors group flex items-start gap-3"
          >
            <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
              1
            </div>
            <div>
              <div className="text-xs font-semibold text-[#F0F3F6] group-hover:text-blue-400 transition-colors">
                Start a Project
              </div>
              <div className="text-[11px] text-[#8492A6] mt-0.5">
                Set contract total & client
              </div>
            </div>
          </Link>

          <Link
            href="/app/invoices"
            className="p-3 rounded-lg bg-[#0B0D0F]/70 border border-white/5 hover:border-blue-500/30 transition-colors group flex items-start gap-3"
          >
            <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
              2
            </div>
            <div>
              <div className="text-xs font-semibold text-[#F0F3F6] group-hover:text-blue-400 transition-colors">
                Bill Milestone Invoices
              </div>
              <div className="text-[11px] text-[#8492A6] mt-0.5">
                Send progress draws as work completes
              </div>
            </div>
          </Link>

          <Link
            href="/app/payments"
            className="p-3 rounded-lg bg-[#0B0D0F]/70 border border-white/5 hover:border-emerald-500/30 transition-colors group flex items-start gap-3"
          >
            <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
              3
            </div>
            <div>
              <div className="text-xs font-semibold text-[#F0F3F6] group-hover:text-emerald-400 transition-colors">
                Settle Payments
              </div>
              <div className="text-[11px] text-[#8492A6] mt-0.5">
                Record receipts & update reliability score
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 2. Attractive Glassmorphic Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-blue-500/40 hover:shadow-[0_8px_24px_rgba(37,99,235,0.15)] hover:-translate-y-0.5">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6]">Total Settled</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F6] mt-3 font-mono">
            {formatCurrency(metrics.totalRevenueSettled)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>Cleared via Remittance Ledger</span>
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
            {formatCurrency(metrics.totalOutstanding)}
          </div>
          <div className="text-[11px] text-[#8492A6] mt-2">
            Active milestone exposure
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
            {metrics.activeClientsCount}
          </div>
          <div className="text-[11px] text-emerald-400/90 mt-2">
            Avg delay: {metrics.averageDelayDays}d
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
            {metrics.overdueInvoicesCount}
          </div>
          <div className="text-[11px] text-rose-400/80 mt-2">
            Requires automated notice
          </div>
        </div>
      </div>

      {/* 3. Attention Required */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Attention Required
            </h2>
          </div>
          <span className="text-xs font-mono text-[#8492A6]">Priority actions</span>
        </div>

        {attentionCardsToRender.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#141820]/90 to-[#0E1117] p-6 text-center shadow-lg backdrop-blur-md">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-semibold text-[#F0F3F6]">All Accounts In Good Standing</h3>
            <p className="text-[11px] text-[#8492A6] mt-1">
              Zero overdue milestone holdbacks or payment delays detected in your Neon ledger.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {attentionCardsToRender.map((item: any) => {
              const isHigh = item.level === "high";
              return (
                <Link
                  key={item.id}
                  href={item.link || "/app/invoices"}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#141820]/90 to-[#0E1117] p-5 shadow-lg backdrop-blur-md transition-all hover:border-blue-500/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
                          isHigh
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {item.tag || "Action Required"}
                      </span>
                      <AlertTriangle
                        className={`w-4 h-4 ${isHigh ? "text-rose-400" : "text-amber-400"}`}
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
        )}
      </div>

      {/* 4. Recent Payments */}
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
              {paymentsToRender.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8492A6] text-xs">
                    No remittances recorded yet in Neon. Click &quot;Record Payment&quot; in the Payments page to track settlements.
                  </td>
                </tr>
              ) : (
                paymentsToRender.map((row: any, i: number) => (
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
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                          row.status === "Paid" || row.status === "Completed"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
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
              Average days to receive full milestone settlement across 6 months from Neon.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
            <span className="text-[11px] font-mono text-[#A0AEC0]">Avg Days to Clear</span>
          </div>
        </div>

        {/* Minimalist Bar Chart Representation from Live Neon Data */}
        <div className="h-36 pt-4 flex items-end justify-between gap-3 border-b border-white/5 pb-2">
          {metrics.velocityTrend && metrics.velocityTrend.length > 0 ? (
            metrics.velocityTrend.map((item) => (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="text-[10px] font-mono text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.days}d
                </div>
                <div
                  className={`w-full max-w-[48px] rounded-t-md transition-all cursor-pointer ${
                    item.days > 0
                      ? "bg-gradient-to-t from-blue-900/40 via-blue-600/60 to-blue-500 hover:from-blue-600 hover:to-cyan-400 shadow-[0_2px_8px_rgba(37,99,235,0.2)]"
                      : "bg-[#1A1F26] hover:bg-[#222832]"
                  }`}
                  style={{ height: `${Math.max(6, item.val * 1.4)}px` }}
                />
                <div className="text-[11px] text-[#8492A6] font-mono">
                  {item.month}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center text-xs text-[#8492A6] py-10">
              Synchronizing settlement metrics from Neon...
            </div>
          )}
        </div>

        <div className="text-[11px] text-[#8492A6] flex flex-col sm:flex-row items-center justify-between gap-2 pt-1">
          <span>Target contractual settlement: Net 15 days</span>
          <span className="text-[#F0F3F6] font-medium">
            Current portfolio median: {metrics.averageDelayDays > 0 ? `${metrics.averageDelayDays} days` : "0 days (No delays recorded)"}
          </span>
        </div>
      </div>
    </div>
  );
}

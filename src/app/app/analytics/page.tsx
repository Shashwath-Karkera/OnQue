"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { TrendingUp, Clock, DollarSign, ArrowUpRight, Loader2, ShieldCheck, AlertTriangle } from "lucide-react";

interface MonthlyVelocity {
  month: string;
  days: number;
  val: number;
  count: number;
}

interface RiskDistribution {
  tier: "Low Risk" | "Medium Risk" | "High Risk";
  clientsCount: number;
  invoicesCount: number;
  onTimeRate: number;
  outstandingCAD: number;
}

interface AnalyticsData {
  totalInvoiced: number;
  totalRevenueSettled: number;
  totalOutstanding: number;
  activeClientsCount: number;
  overdueInvoicesCount: number;
  averageDelayDays: number;
  velocityTrend: MonthlyVelocity[];
  riskDistribution: RiskDistribution[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res?.metrics) {
          setData(res.metrics);
        }
      })
      .catch((err) => console.error("Failed to load analytics:", err))
      .finally(() => setLoading(false));
  }, []);

  const formatCAD = (amount: number | string | undefined) => {
    const val = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3 text-xs text-[#8492A6]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span>Loading real analytics and ledger distributions from Neon...</span>
      </div>
    );
  }

  const metrics: AnalyticsData = data || {
    totalInvoiced: 0,
    totalRevenueSettled: 0,
    totalOutstanding: 0,
    activeClientsCount: 0,
    overdueInvoicesCount: 0,
    averageDelayDays: 0,
    velocityTrend: [],
    riskDistribution: [
      { tier: "Low Risk", clientsCount: 0, invoicesCount: 0, onTimeRate: 100, outstandingCAD: 0 },
      { tier: "Medium Risk", clientsCount: 0, invoicesCount: 0, onTimeRate: 0, outstandingCAD: 0 },
      { tier: "High Risk", clientsCount: 0, invoicesCount: 0, onTimeRate: 0, outstandingCAD: 0 },
    ],
  };

  const realizationPct =
    metrics.totalInvoiced > 0
      ? ((metrics.totalRevenueSettled / metrics.totalInvoiced) * 100).toFixed(1)
      : "100.0";

  return (
    <div className="space-y-10 antialiased">
      {/* 1. Header */}
      <div className="pb-2 border-b border-[#22262B]">
        <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
          Analytics
        </h1>
        <p className="text-xs text-[#8492A6] mt-1">
          Settlement metrics, collection velocity, and cash flow predictability synchronized from Neon.
        </p>
      </div>

      {/* 2. Core Metrics from Live Neon DB */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Total Invoiced</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] mt-1.5 font-mono">
            {formatCAD(metrics.totalInvoiced)}
          </div>
          <div className="text-[11px] text-[#8492A6] mt-1">All contractual draws</div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Collected Volume</div>
          <div className="text-2xl font-semibold text-emerald-400 mt-1.5 font-mono">
            {formatCAD(metrics.totalRevenueSettled)}
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-1">{realizationPct}% realization</div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Outstanding</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] mt-1.5 font-mono">
            {formatCAD(metrics.totalOutstanding)}
          </div>
          <div className="text-[11px] text-[#8492A6] mt-1">{metrics.activeClientsCount} active clients</div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Overdue Balance</div>
          <div className="text-2xl font-semibold text-rose-400 mt-1.5 font-mono">
            {metrics.overdueInvoicesCount > 0 ? `${metrics.overdueInvoicesCount} overdue` : "Zero overdue"}
          </div>
          <div className="text-[11px] text-rose-400/80 mt-1">Requires immediate notice</div>
        </div>
      </div>

      {/* 3. Primary Chart: Settlement Velocity & Average Delay from Neon */}
      <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-[#F0F3F6]">
              Average Payment Delay Trend
            </h2>
            <p className="text-xs text-[#8492A6] mt-0.5">
              Days past invoice due date across all completed milestone settlements stored in Neon
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Portfolio median: {metrics.averageDelayDays} days</span>
          </div>
        </div>

        {/* Dynamic Bar Chart */}
        <div className="h-44 flex items-end justify-between gap-4 pt-6 border-b border-[#22262B] pb-3">
          {metrics.velocityTrend && metrics.velocityTrend.length > 0 ? (
            metrics.velocityTrend.map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[11px] font-mono text-[#8492A6]">
                  {bar.days > 0 ? `${bar.days}d` : "0d"}
                </span>
                <div
                  className={`w-full max-w-[56px] rounded-t transition-colors ${
                    bar.days > 0
                      ? "bg-gradient-to-t from-blue-900/40 via-blue-600/60 to-blue-500 hover:from-blue-600 hover:to-cyan-400"
                      : "bg-[#161A1D] hover:bg-[#20252B]"
                  }`}
                  style={{ height: `${Math.max(8, bar.val * 1.5)}px` }}
                />
                <span className="text-[11px] text-[#555E6C] font-mono mt-1">
                  {bar.month}
                </span>
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center text-xs text-[#8492A6] py-10">
              Zero recorded settlement remittance delays in Neon.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-[#8492A6]">
          <span>Target contractual settlement: Net 15 days</span>
          <span className="text-[#F0F3F6]">
            Your Average: {metrics.averageDelayDays > 0 ? `${metrics.averageDelayDays} days` : "0 days (No delays recorded)"}
          </span>
        </div>
      </div>

      {/* 4. Payment Reliability Distribution Table from Neon */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-[#F0F3F6]">
          Client Payment Reliability Distribution
        </h3>

        <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#22262B] text-[#8492A6] bg-[#0E1114]">
                <th className="py-3 px-4 font-medium">Risk Tier</th>
                <th className="py-3 px-4 font-medium">Clients</th>
                <th className="py-3 px-4 font-medium">Associated Invoices</th>
                <th className="py-3 px-4 font-medium">On-time Proportion</th>
                <th className="py-3 px-4 font-medium text-right">Outstanding Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22262B]">
              {metrics.riskDistribution.map((tier) => (
                <tr key={tier.tier} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-medium">
                    <span
                      className={
                        tier.tier === "Low Risk"
                          ? "text-emerald-400"
                          : tier.tier === "Medium Risk"
                          ? "text-amber-400"
                          : "text-rose-400"
                      }
                    >
                      {tier.tier} {tier.tier === "Low Risk" ? "(80+)" : tier.tier === "Medium Risk" ? "(60-79)" : "(<60)"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#F0F3F6] font-mono">
                    {tier.clientsCount} client{tier.clientsCount !== 1 ? "s" : ""}
                  </td>
                  <td className="py-3 px-4 text-[#A0AEC0] font-mono">
                    {tier.invoicesCount} invoice{tier.invoicesCount !== 1 ? "s" : ""}
                  </td>
                  <td
                    className={`py-3 px-4 font-mono ${
                      tier.tier === "Low Risk"
                        ? "text-emerald-400"
                        : tier.tier === "Medium Risk"
                        ? "text-amber-400"
                        : "text-rose-400"
                    }`}
                  >
                    {tier.onTimeRate}%
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-[#F0F3F6]">
                    {formatCAD(tier.outstandingCAD)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

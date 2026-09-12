"use client";

import * as React from "react";
import { TrendingUp, Clock, DollarSign, ArrowUpRight } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-10">
      {/* 1. Header */}
      <div className="pb-2 border-b border-[#22262B]">
        <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
          Analytics
        </h1>
        <p className="text-xs text-[#8492A6] mt-1">
          Settlement metrics, collection velocity, and cash flow predictability.
        </p>
      </div>

      {/* 2. Core Metrics (Simple, uncluttered) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Total Invoiced</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] mt-1.5 font-mono">
            $156,600
          </div>
          <div className="text-[11px] text-[#8492A6] mt-1">Trailing 12 months</div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Collected Volume</div>
          <div className="text-2xl font-semibold text-emerald-400 mt-1.5 font-mono">
            $148,200
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-1">94.6% realization</div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Outstanding</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] mt-1.5 font-mono">
            $8,400
          </div>
          <div className="text-[11px] text-[#8492A6] mt-1">3 active draws</div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Overdue Balance</div>
          <div className="text-2xl font-semibold text-rose-400 mt-1.5 font-mono">
            $6,800
          </div>
          <div className="text-[11px] text-rose-400/80 mt-1">1 client overdue</div>
        </div>
      </div>

      {/* 3. Primary Chart: Settlement Velocity & Average Delay (One large, clear chart) */}
      <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-[#F0F3F6]">
              Average Payment Delay Trend
            </h2>
            <p className="text-xs text-[#8492A6] mt-0.5">
              Days past invoice due date across all completed milestone settlements
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Down from 12.4d to 4.8d</span>
          </div>
        </div>

        {/* Large Clean Bar Chart */}
        <div className="h-44 flex items-end justify-between gap-4 pt-6 border-b border-[#22262B] pb-3">
          {[
            { period: "May 2024", delay: "12.4 days", height: 75 },
            { period: "Jun 2024", delay: "10.8 days", height: 65 },
            { period: "Jul 2024", delay: "9.1 days", height: 55 },
            { period: "Aug 2024", delay: "7.6 days", height: 46 },
            { period: "Sep 2024", delay: "5.2 days", height: 32 },
            { period: "Oct 2024 (MTD)", delay: "4.8 days", height: 28 },
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[11px] font-mono text-[#8492A6]">
                {bar.delay}
              </span>
              <div
                className="w-full max-w-[56px] rounded-t bg-[#161A1D] hover:bg-[#2563EB] transition-colors"
                style={{ height: `${bar.height * 1.5}px` }}
              />
              <span className="text-[11px] text-[#555E6C] font-mono mt-1">
                {bar.period}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-[#8492A6]">
          <span>Industry Average Trade Delay: 14.2 days</span>
          <span className="text-[#F0F3F6]">Your Average: 4.8 days</span>
        </div>
      </div>

      {/* 4. Payment Reliability Distribution Table */}
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
                <th className="py-3 px-4 font-medium">Settled Invoices</th>
                <th className="py-3 px-4 font-medium">On-time Proportion</th>
                <th className="py-3 px-4 font-medium text-right">Outstanding Volume</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22262B]">
              <tr>
                <td className="py-3 px-4 text-emerald-400 font-medium">Low Risk (80+)</td>
                <td className="py-3 px-4 text-[#F0F3F6]">4 clients</td>
                <td className="py-3 px-4 text-[#A0AEC0]">47 invoices</td>
                <td className="py-3 px-4 font-mono text-emerald-400">93.6%</td>
                <td className="py-3 px-4 text-right font-mono text-[#F0F3F6]">$6,400</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-amber-400 font-medium">Medium Risk (60-79)</td>
                <td className="py-3 px-4 text-[#F0F3F6]">1 client</td>
                <td className="py-3 px-4 text-[#A0AEC0]">18 invoices</td>
                <td className="py-3 px-4 font-mono text-amber-400">71.0%</td>
                <td className="py-3 px-4 text-right font-mono text-[#F0F3F6]">$12,800</td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-rose-400 font-medium">High Risk (&lt;60)</td>
                <td className="py-3 px-4 text-[#F0F3F6]">1 client</td>
                <td className="py-3 px-4 text-[#A0AEC0]">12 invoices</td>
                <td className="py-3 px-4 font-mono text-rose-400">41.6%</td>
                <td className="py-3 px-4 text-right font-mono text-rose-400">$6,800</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="space-y-10">
      {/* 1. Header */}
      <div className="pb-2 border-b border-[#22262B]">
        <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
          Payment Intelligence
        </h1>
        <p className="text-xs text-[#8492A6] mt-1">
          Turn empirical payment history into actionable contract terms and risk prevention.
        </p>
      </div>

      {/* 2. Structured Payment Intelligence Snapshot */}
      <div className="p-6 rounded-lg bg-[#111417] border border-[#22262B]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="sm:border-r border-[#22262B] sm:pr-6">
            <div className="text-xs font-mono uppercase tracking-wider text-[#8492A6]">
              Client Portfolio Risk
            </div>
            <div className="text-2xl font-semibold text-amber-400 mt-2 font-mono">
              Medium (Overall)
            </div>
            <div className="text-xs text-[#8492A6] mt-1">
              4 of 6 accounts low risk · 1 flagged for delay
            </div>
          </div>

          <div className="sm:border-r border-[#22262B] sm:pr-6">
            <div className="text-xs font-mono uppercase tracking-wider text-[#8492A6]">
              Portfolio Settlement Trend
            </div>
            <div className="text-2xl font-semibold text-emerald-400 mt-2 font-mono flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Improving
            </div>
            <div className="text-xs text-[#8492A6] mt-1">
              Average delay decreased 3.2 days this quarter
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#8492A6]">
              Median Reliability
            </div>
            <div className="text-2xl font-semibold text-[#F0F3F6] mt-2 font-mono">
              78 / 100
            </div>
            <div className="text-xs text-[#8492A6] mt-1">
              Based on 74 verified trade transactions
            </div>
          </div>
        </div>
      </div>

      {/* 3. Key Findings (3-4 concise findings) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-[#F0F3F6]">
            Key Behavioral Findings
          </h2>
          <p className="text-xs text-[#8492A6] mt-0.5">
            Empirical observations synthesized from invoice settlement cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-lg border border-[#22262B] bg-[#111417] space-y-2">
            <div className="text-xs font-semibold text-[#F0F3F6]">
              Late payments are increasing on Vanguard
            </div>
            <p className="text-xs text-[#8492A6] leading-relaxed">
              The client has paid 4 of the last 6 invoices after the due date,
              reaching an average delay of 18.4 days.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-[#22262B] bg-[#111417] space-y-2">
            <div className="text-xs font-semibold text-[#F0F3F6]">
              Average delay has increased on Apex
            </div>
            <p className="text-xs text-[#8492A6] leading-relaxed">
              Average delay increased from 2.1 to 5.4 days over the last three
              months, indicating tighter general contractor cash flows.
            </p>
          </div>

          <div className="p-5 rounded-lg border border-[#22262B] bg-[#111417] space-y-2">
            <div className="text-xs font-semibold text-[#F0F3F6]">
              Outstanding balance is rising
            </div>
            <p className="text-xs text-[#8492A6] leading-relaxed">
              Current uncollected milestone volume is $8,400 across all clients,
              which is 14% higher than your trailing 6-month average.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Recommended Action & Reasoning */}
      <div className="p-6 rounded-lg border border-[#22262B] bg-[#161A1D]/60 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#3B82F6]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-[#F0F3F6]">
            Recommended Contractor Action
          </h3>
        </div>

        <p className="text-sm font-medium text-[#F0F3F6] leading-relaxed">
          "Consider milestone-based billing and requesting an upfront deposit of at
          least 30% for upcoming contracts with Vanguard Properties and Apex
          Construction."
        </p>

        <div className="text-xs text-[#8492A6] leading-relaxed pt-2 border-t border-[#22262B]">
          <span className="font-semibold text-[#A0AEC0]">Analytical Reason:</span>{" "}
          Requiring upfront material deposits insulates your business against
          trade holdbacks and extended closeout delays. For low-risk accounts like
          Northstar Renovations, standard Net 15 terms remain appropriate.
        </div>
      </div>

      {/* 5. Disclaimer */}
      <div className="text-[11px] text-[#555E6C] leading-relaxed">
        Payment intelligence indicators are calculated from user-recorded billing
        cycles and payment receipts. They are provided solely for operational
        decision support and do not constitute financial guarantees.
      </div>
    </div>
  );
}

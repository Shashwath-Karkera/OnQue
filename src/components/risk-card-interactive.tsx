"use client";

import * as React from "react";
import { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Clock,
  DollarSign,
  Info,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface InvoiceBar {
  id: string;
  daysLate: number;
  amount: string;
  status: string;
}

interface ClientProfile {
  id: string;
  name: string;
  type: string;
  invoicesCount: number;
  since: string;
  score: number;
  riskBand: "Low" | "Moderate" | "Elevated" | "High";
  confidence: string;
  avgDaysLate: number;
  onTermsRate: number;
  outstanding: string;
  verdict: string;
  recommendedDeposit: number; // percentage
  maxExposure: string;
  invoices: InvoiceBar[];
}

const CLIENT_PROFILES: ClientProfile[] = [
  {
    id: "halcyon",
    name: "Halcyon Property Group",
    type: "Commercial General Contractor",
    invoicesCount: 14,
    since: "2023",
    score: 62,
    riskBand: "Elevated",
    confidence: "Strong data • 14 invoices",
    avgDaysLate: 27,
    onTermsRate: 21,
    outstanding: "$18,400",
    verdict:
      "Reliable payer eventually, but consistently stalls 3 to 4 weeks past terms and drags payments longer on billings above $8,000.",
    recommendedDeposit: 35,
    maxExposure: "$12,000",
    invoices: [
      { id: "INV-101", daysLate: 1, amount: "$4,200", status: "Paid on terms" },
      { id: "INV-102", daysLate: 0, amount: "$2,800", status: "Paid early" },
      { id: "INV-103", daysLate: 9, amount: "$5,100", status: "Paid +9d" },
      { id: "INV-104", daysLate: 2, amount: "$3,600", status: "Paid on terms" },
      { id: "INV-105", daysLate: 26, amount: "$9,800", status: "Paid +26d" },
      { id: "INV-106", daysLate: 14, amount: "$6,200", status: "Paid +14d" },
      { id: "INV-107", daysLate: 3, amount: "$4,400", status: "Paid on terms" },
      { id: "INV-108", daysLate: 38, amount: "$14,500", status: "Paid +38d (2 reminders)" },
      { id: "INV-109", daysLate: 21, amount: "$8,900", status: "Paid +21d" },
      { id: "INV-110", daysLate: 7, amount: "$5,000", status: "Paid +7d" },
      { id: "INV-111", daysLate: 44, amount: "$16,200", status: "Paid +44d (Disputed)" },
      { id: "INV-112", daysLate: 19, amount: "$7,300", status: "Paid +19d" },
      { id: "INV-113", daysLate: 31, amount: "$11,200", status: "Paid +31d" },
      { id: "INV-114", daysLate: 29, amount: "$18,400", status: "Currently Open" },
    ],
  },
  {
    id: "apex",
    name: "Apex Infrastructure Partners",
    type: "Tier 1 Commercial",
    invoicesCount: 22,
    since: "2021",
    score: 94,
    riskBand: "Low",
    confidence: "High confidence • 22 invoices",
    avgDaysLate: 3,
    onTermsRate: 95,
    outstanding: "$4,150",
    verdict:
      "Premier Tier 1 partner. Streamlined AP department with automated scheduled ACH disbursements. Standard Net 30 terms are well-respected.",
    recommendedDeposit: 15,
    maxExposure: "$45,000",
    invoices: [
      { id: "INV-201", daysLate: 0, amount: "$8,500", status: "Paid on terms" },
      { id: "INV-202", daysLate: 0, amount: "$12,400", status: "Paid on terms" },
      { id: "INV-203", daysLate: 2, amount: "$9,200", status: "Paid +2d" },
      { id: "INV-204", daysLate: 0, amount: "$15,000", status: "Paid on terms" },
      { id: "INV-205", daysLate: 0, amount: "$7,800", status: "Paid on terms" },
      { id: "INV-206", daysLate: 4, amount: "$22,000", status: "Paid +4d" },
      { id: "INV-207", daysLate: 0, amount: "$11,100", status: "Paid on terms" },
      { id: "INV-208", daysLate: 1, amount: "$18,400", status: "Paid on terms" },
      { id: "INV-209", daysLate: 0, amount: "$14,000", status: "Paid on terms" },
      { id: "INV-210", daysLate: 3, amount: "$6,900", status: "Paid +3d" },
      { id: "INV-211", daysLate: 0, amount: "$19,500", status: "Paid on terms" },
      { id: "INV-212", daysLate: 0, amount: "$12,300", status: "Paid on terms" },
      { id: "INV-213", daysLate: 1, amount: "$8,400", status: "Paid on terms" },
      { id: "INV-214", daysLate: 0, amount: "$4,150", status: "Currently Open" },
    ],
  },
  {
    id: "vanguard",
    name: "Vanguard Urban Developers",
    type: "Speculative Residential",
    invoicesCount: 9,
    since: "2024",
    score: 38,
    riskBand: "High",
    confidence: "Moderate data • 9 invoices",
    avgDaysLate: 52,
    onTermsRate: 8,
    outstanding: "$46,800",
    verdict:
      "Severe cash-flow strain and frequent retainage disputes. Payment delays increase dramatically towards project wrap-up. Proceed with maximum protection.",
    recommendedDeposit: 50,
    maxExposure: "$8,000",
    invoices: [
      { id: "INV-301", daysLate: 12, amount: "$5,000", status: "Paid +12d" },
      { id: "INV-302", daysLate: 28, amount: "$8,400", status: "Paid +28d" },
      { id: "INV-303", daysLate: 45, amount: "$14,200", status: "Paid +45d" },
      { id: "INV-304", daysLate: 39, amount: "$11,500", status: "Paid +39d" },
      { id: "INV-305", daysLate: 64, amount: "$22,000", status: "Paid +64d (Disputed)" },
      { id: "INV-306", daysLate: 58, amount: "$19,000", status: "Paid +58d" },
      { id: "INV-307", daysLate: 71, amount: "$27,500", status: "Paid +71d (3 notices)" },
      { id: "INV-308", daysLate: 52, amount: "$18,000", status: "Paid +52d" },
      { id: "INV-309", daysLate: 60, amount: "$46,800", status: "Currently Overdue" },
    ],
  },
];

export function RiskCardInteractive() {
  const [activeClient, setActiveClient] = useState<ClientProfile>(
    CLIENT_PROFILES[0]
  );
  const [hoveredInvoice, setHoveredInvoice] = useState<InvoiceBar | null>(null);
  const [jobAmount, setJobAmount] = useState<number>(20000);

  const getRiskBandBadge = (band: ClientProfile["riskBand"]) => {
    switch (band) {
      case "Low":
        return (
          <Badge variant="lowRisk" className="gap-1 px-3 py-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Low Risk
          </Badge>
        );
      case "Moderate":
        return (
          <Badge variant="moderateRisk" className="gap-1 px-3 py-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            Moderate Risk
          </Badge>
        );
      case "Elevated":
        return (
          <Badge variant="elevatedRisk" className="gap-1 px-3 py-1 font-semibold">
            <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
            Elevated Risk
          </Badge>
        );
      case "High":
        return (
          <Badge variant="highRisk" className="gap-1 px-3 py-1 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            High Risk
          </Badge>
        );
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400 border-emerald-500/40 bg-emerald-500/10";
    if (score >= 60) return "text-amber-400 border-amber-500/40 bg-amber-500/10";
    if (score >= 45) return "text-orange-400 border-orange-500/40 bg-orange-500/10";
    return "text-rose-400 border-rose-500/40 bg-rose-500/10";
  };

  // Calculate dynamic upfront deposit based on simulated job size
  const calculatedDeposit = Math.round(
    (jobAmount * activeClient.recommendedDeposit) / 100
  );

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-3">
      {/* Client Preset Switcher */}
      <div className="flex items-center justify-between gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl backdrop-blur-md overflow-x-auto">
        {CLIENT_PROFILES.map((client) => {
          const isSelected = activeClient.id === client.id;
          return (
            <button
              key={client.id}
              onClick={() => {
                setActiveClient(client);
                setHoveredInvoice(null);
              }}
              className={`flex-1 min-w-[120px] py-1.5 px-3 rounded-lg text-xs font-medium transition-all text-center truncate ${
                isSelected
                  ? "bg-slate-800 text-white font-semibold shadow-inner border border-slate-700/60"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <span className="truncate block">{client.name.split(" ")[0]}</span>
              <span
                className={`text-[10px] ${
                  client.riskBand === "Low"
                    ? "text-emerald-400"
                    : client.riskBand === "High"
                    ? "text-rose-400"
                    : "text-orange-400"
                }`}
              >
                Score {client.score} • {client.riskBand}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Live Card */}
      <Card className="border border-slate-800/90 bg-gradient-to-b from-slate-900/95 to-slate-950/95 shadow-2xl p-6 sm:p-7 relative overflow-hidden card-glow">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800/70">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                {activeClient.name}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-2 flex-wrap">
              <span>{activeClient.type}</span>
              <span className="text-slate-600">•</span>
              <span>{activeClient.invoicesCount} Invoices</span>
              <span className="text-slate-600">•</span>
              <span>Since {activeClient.since}</span>
            </p>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div
              className={`flex items-center justify-center w-14 h-14 rounded-2xl border-2 font-mono font-bold text-2xl tracking-tighter ${getScoreColor(
                activeClient.score
              )}`}
            >
              {activeClient.score}
            </div>
            {getRiskBandBadge(activeClient.riskBand)}
          </div>
        </div>

        {/* Ledger Bar Chart Visualizer */}
        <div className="pt-5 pb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Historical Invoice Ledger</span>
            </div>
            <span className="text-[11px] text-slate-400">
              Depth = Days past agreed terms
            </span>
          </div>

          <div className="h-28 w-full bg-slate-950/70 rounded-xl border border-slate-800/60 p-3 flex items-end justify-between gap-1.5 relative overflow-hidden">
            {/* Zero line threshold */}
            <div className="absolute top-[28px] left-0 right-0 border-t border-dashed border-slate-800/80 pointer-events-none" />

            {activeClient.invoices.map((inv, idx) => {
              const maxDays = 75;
              const heightPct = Math.min(
                100,
                Math.max(12, Math.round((inv.daysLate / maxDays) * 100))
              );
              const isZero = inv.daysLate <= 2;
              const isHovered = hoveredInvoice?.id === inv.id;

              return (
                <div
                  key={inv.id}
                  onMouseEnter={() => setHoveredInvoice(inv)}
                  className="flex-1 h-full flex flex-col justify-end items-center group cursor-pointer relative"
                >
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-sm transition-all duration-200 ${
                      isZero
                        ? "bg-emerald-500/70 group-hover:bg-emerald-400"
                        : inv.daysLate > 30
                        ? "bg-rose-500/80 group-hover:bg-rose-400 group-hover:shadow-[0_0_12px_rgba(244,63,94,0.6)]"
                        : "bg-amber-500/70 group-hover:bg-amber-400 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    } ${isHovered ? "ring-2 ring-white scale-y-105" : ""}`}
                  />
                  <span className="text-[9px] text-slate-400 mt-1 font-mono">
                    #{idx + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Hover details / active invoice banner */}
          <div className="mt-2 min-h-[26px] text-xs flex items-center justify-between text-slate-300 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/60">
            {hoveredInvoice ? (
              <>
                <span className="font-mono text-amber-400 font-semibold">
                  {hoveredInvoice.id}: {hoveredInvoice.amount}
                </span>
                <span className="text-slate-400">
                  Delay:{" "}
                  <b className="text-white">
                    {hoveredInvoice.daysLate === 0
                      ? "On time"
                      : `+${hoveredInvoice.daysLate} days`}
                  </b>
                </span>
                <span className="text-[11px] text-slate-400">
                  {hoveredInvoice.status}
                </span>
              </>
            ) : (
              <span className="text-slate-400 text-[11px] italic">
                Hover over any invoice bar above to inspect historical payment delay & details
              </span>
            )}
          </div>
        </div>

        {/* 3 Core Stats */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/70 text-center">
          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <span className="block text-lg sm:text-xl font-bold font-mono text-white">
              {activeClient.avgDaysLate}d
            </span>
            <span className="text-[11px] text-slate-400">Avg Days Late</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <span className="block text-lg sm:text-xl font-bold font-mono text-emerald-400">
              {activeClient.onTermsRate}%
            </span>
            <span className="text-[11px] text-slate-400">Paid on Terms</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/40">
            <span className="block text-lg sm:text-xl font-bold font-mono text-amber-400">
              {activeClient.outstanding}
            </span>
            <span className="text-[11px] text-slate-400">Current Exposure</span>
          </div>
        </div>

        {/* AI Payment Verdict */}
        <div className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 relative">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              <span className="font-semibold text-amber-300 block mb-1">
                ONcue AI Payment Verdict:
              </span>
              {activeClient.verdict}
            </div>
          </div>
        </div>

        {/* Dynamic Contract Advisor Simulation */}
        <div className="mt-4 pt-3 border-t border-slate-800/60">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-amber-400" />
              Simulate Proposed Contract Value:
            </span>
            <span className="font-mono text-amber-400 font-bold">
              ${jobAmount.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min="5000"
            max="100000"
            step="5000"
            value={jobAmount}
            onChange={(e) => setJobAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />

          <div className="flex items-center justify-between text-xs mt-3 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/60">
            <div className="text-slate-400">
              Mandatory Upfront Deposit:{" "}
              <b className="text-white font-mono font-semibold">
                {activeClient.recommendedDeposit}% (${calculatedDeposit.toLocaleString()})
              </b>
            </div>
            <div className="text-slate-400 text-right">
              Cap Exposure At:{" "}
              <b className="text-white font-mono font-semibold">
                {activeClient.maxExposure}
              </b>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

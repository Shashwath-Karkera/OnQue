"use client";

import * as React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Search,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface CheckClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface RiskResult {
  clientName: string;
  clientType: string;
  score: number;
  riskBand: "Low" | "Moderate" | "Elevated" | "High";
  confidence: string;
  invoiceCount: number;
  averageDelayDays: number;
  depositRecommended: string;
  recommendedTerms: string;
}

export function CheckClientModal({ open, onOpenChange }: CheckClientModalProps) {
  const [clientName, setClientName] = useState("");
  const [clientType, setClientType] = useState("Commercial General Contractor");
  const [invoiceCount, setInvoiceCount] = useState(12);
  const [delayDays, setDelayDays] = useState(18);
  const [contractAmount, setContractAmount] = useState(25000);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RiskResult | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/risk-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          clientType,
          invoiceCount,
          averageDelayDays: delayDays,
          contractAmount,
        }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        setResult(json.data);
      }
    } catch (err) {
      console.error("Error analyzing client risk", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskBadge = (band: string) => {
    switch (band) {
      case "Low":
        return <Badge variant="lowRisk">Low Risk</Badge>;
      case "Moderate":
        return <Badge variant="moderateRisk">Moderate Risk</Badge>;
      case "Elevated":
        return <Badge variant="elevatedRisk">Elevated Risk</Badge>;
      case "High":
        return <Badge variant="highRisk">High Risk</Badge>;
      default:
        return <Badge>{band}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] bg-slate-950 border-slate-800 text-slate-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-white">
            <Building2 className="w-5 h-5 text-amber-400" />
            Check Client Payment Risk
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Query ONcue payment intelligence to evaluate client delinquency patterns,
            expected delay, and recommended contract terms.
          </DialogDescription>
        </DialogHeader>

        {!result ? (
          <form onSubmit={handleAnalyze} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Client / Company Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Construction LLC or Meridian Builders"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/60"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Client Category
                </label>
                <select
                  value={clientType}
                  onChange={(e) => setClientType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                >
                  <option value="Commercial General Contractor">Commercial GC</option>
                  <option value="Residential Home Builder">Residential Builder</option>
                  <option value="Property Management Group">Property Management</option>
                  <option value="Private Property Owner">Private Owner</option>
                  <option value="Architectural / Engineering">Architect / Firm</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Proposed Job ($)
                </label>
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={contractAmount}
                  onChange={(e) => setContractAmount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Invoices Tracked
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={invoiceCount}
                  onChange={(e) => setInvoiceCount(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Avg Historical Delay (days)
                </label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={delayDays}
                  onChange={(e) => setDelayDays(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading || !clientName.trim()}
                className="w-full h-11 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Querying Risk Intelligence Engine...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Analyze Client Payment Risk
                  </>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-white">{result.clientName}</h4>
                <p className="text-xs text-slate-400">{result.clientType}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">
                    Confidence: {result.confidence} ({result.invoiceCount} invoices)
                  </span>
                </div>
              </div>

              <div className="text-right flex flex-col items-end gap-1">
                <div className="text-2xl font-mono font-bold text-amber-400">
                  {result.score}
                  <span className="text-xs text-slate-400">/100</span>
                </div>
                {getRiskBadge(result.riskBand)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-xs text-slate-400">Required Deposit</div>
                <div className="text-lg font-bold font-mono text-emerald-400">
                  {result.depositRecommended}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-xs text-slate-400">Avg Payment Delay</div>
                <div className="text-lg font-bold font-mono text-orange-400">
                  +{result.averageDelayDays} days
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-slate-200">
              <span className="font-semibold text-amber-300 block mb-1">
                Recommended Contract Safeguards:
              </span>
              {result.recommendedTerms}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setResult(null)}
              >
                Evaluate Another Client
              </Button>
              <Button
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                onClick={() => onOpenChange(false)}
              >
                <CheckCircle2 className="w-4 h-4" /> Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

"use client";

import * as React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Sparkles } from "lucide-react";

interface PaymentPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentPlanModal({ open, onOpenChange }: PaymentPlanModalProps) {
  const [totalValue, setTotalValue] = useState(12000);
  const [m1Pct, setM1Pct] = useState(20);
  const [m2Pct, setM2Pct] = useState(30);
  const [m3Pct, setM3Pct] = useState(30);
  const [m4Pct, setM4Pct] = useState(20);
  const [saved, setSaved] = useState(false);

  const totalPct = m1Pct + m2Pct + m3Pct + m4Pct;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onOpenChange(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-[#0d1322] border border-white/10 text-slate-100 p-0 overflow-hidden shadow-2xl rounded-2xl">
        <DialogHeader className="p-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Payment Schedule Engine
            </span>
          </div>
          <DialogTitle className="text-xl font-bold text-white tracking-tight">
            Customize Project Payment Plan
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-400">
            Project: Commercial Interior Painting • Canadian Dollars ($CAD)
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Total Value Input */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-400 font-medium">Contract Total Value</div>
              <div className="text-xl font-mono font-bold text-white mt-0.5">
                ${totalValue.toLocaleString()} CAD
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {[8000, 12000, 24000].map((v) => (
                <button
                  key={v}
                  onClick={() => setTotalValue(v)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-colors ${
                    totalValue === v
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-slate-800 text-slate-400 hover:text-slate-200 border border-white/5"
                  }`}
                >
                  ${v.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Milestones Tuner */}
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Milestone Breakdown</span>
              <span className={`font-mono font-semibold ${totalPct === 100 ? "text-emerald-400" : "text-rose-400"}`}>
                Total: {totalPct}% {totalPct !== 100 && "(Must equal 100%)"}
              </span>
            </div>

            {/* M1 */}
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">1. Project Start (Upfront Deposit)</span>
                <span className="font-mono text-amber-400 font-bold">
                  {m1Pct}% — ${((totalValue * m1Pct) / 100).toLocaleString()} CAD
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={m1Pct}
                onChange={(e) => setM1Pct(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* M2 */}
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">2. Materials & Preparation</span>
                <span className="font-mono text-amber-400 font-bold">
                  {m2Pct}% — ${((totalValue * m2Pct) / 100).toLocaleString()} CAD
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={m2Pct}
                onChange={(e) => setM2Pct(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* M3 */}
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">3. Midpoint Completion</span>
                <span className="font-mono text-amber-400 font-bold">
                  {m3Pct}% — ${((totalValue * m3Pct) / 100).toLocaleString()} CAD
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={m3Pct}
                onChange={(e) => setM3Pct(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* M4 */}
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">4. Final Completion & Sign-off</span>
                <span className="font-mono text-amber-400 font-bold">
                  {m4Pct}% — ${((totalValue * m4Pct) / 100).toLocaleString()} CAD
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={m4Pct}
                onChange={(e) => setM4Pct(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {saved && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Payment terms saved to project schedule successfully!</span>
            </div>
          )}
        </div>

        <div className="p-4 px-6 bg-slate-950/80 border-t border-white/10 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="border-white/10 bg-slate-900 text-slate-300 hover:text-white"
          >
            Cancel
          </Button>

          <Button
            size="sm"
            onClick={handleSave}
            disabled={totalPct !== 100}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
          >
            Save Milestone Structure
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

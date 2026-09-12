"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Sliders, Check, RefreshCw } from "lucide-react";

interface SmartPaymentPlansSectionProps {
  onCustomizeClick: () => void;
}

export function SmartPaymentPlansSection({ onCustomizeClick }: SmartPaymentPlansSectionProps) {
  const [accepted, setAccepted] = useState(false);
  const [totalValue, setTotalValue] = useState(12000);

  const milestones = [
    {
      pct: 20,
      title: "Project Start",
      label: "Upfront Deposit",
      desc: "Mobilization, site prep, and immediate material procurement.",
    },
    {
      pct: 30,
      title: "Materials & Preparation",
      label: "Draw 1",
      desc: "Priming completed, wall sanding & surface protection verified.",
    },
    {
      pct: 30,
      title: "Midpoint Completion",
      label: "Draw 2",
      desc: "First coat finish, trim installation, client inspection walk.",
    },
    {
      pct: 20,
      title: "Final Completion",
      label: "Final Draw",
      desc: "Punch-list clearance and final sign-off release.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#070b12] border-t border-white/[0.07] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Milestone Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Build payment plans that work for your project.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Stop agreeing to risky 50% end-of-job terms. ONcue suggests optimal milestone breakdowns calibrated to the client&apos;s past payment speed, project scope, and front-loaded material costs.
          </p>
        </motion.div>

        {/* Plan Showcase Card with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="fintech-card glow-border rounded-2xl p-6 sm:p-8 bg-[#0d1322] max-w-4xl shadow-2xl"
        >
          {/* Project Details Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Project Profile
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                Commercial Interior Painting
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Client: Northstar Renovations • 4-week estimated duration
              </p>
            </div>

            <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-white/10 shrink-0">
              <div className="text-right">
                <div className="text-[11px] text-slate-400">Contract Total Value</div>
                <div className="text-2xl font-bold font-mono text-white">
                  ${totalValue.toLocaleString()} CAD
                </div>
              </div>
            </div>
          </div>

          {/* AI Suggested Plan Milestones */}
          <div className="my-7">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                  AI Suggested Plan (Risk-Calibrated)
                </span>
              </div>
              <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                100% Cash-Flow Balanced
              </span>
            </div>

            {/* 4 Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {milestones.map((m, idx) => {
                const amount = (totalValue * m.pct) / 100;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -3, transition: { duration: 0.15 } }}
                    className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 relative group hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        {m.pct}% — {m.label}
                      </span>
                    </div>

                    <div className="text-xl font-bold font-mono text-white">
                      ${amount.toLocaleString()} CAD
                    </div>

                    {/* Milestone Progress Fill */}
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.15 }}
                        className="h-full bg-amber-500 rounded-full"
                      />
                    </div>

                    <div className="text-xs font-semibold text-slate-200 pt-1">
                      {m.title}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {m.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Action Row & Explanation */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-xs text-slate-400 max-w-md">
              Payment structures are fully customizable by the contractor. Adjust percentages, add retainage milestones, or attach conditional sign-offs.
            </p>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onCustomizeClick}
                className="border-white/15 bg-slate-900 text-slate-200 hover:text-white h-9 px-4 text-xs font-semibold flex items-center gap-1.5 hover:border-amber-500/40 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Customize</span>
              </Button>

              <Button
                size="sm"
                onClick={() => setAccepted(true)}
                className={`text-slate-950 font-bold h-9 px-5 text-xs transition-all ${
                  accepted
                    ? "bg-emerald-400 hover:bg-emerald-300"
                    : "bg-amber-500 hover:bg-amber-400 shimmer-btn"
                }`}
              >
                {accepted ? "Plan Accepted ✓" : "Accept Plan"}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

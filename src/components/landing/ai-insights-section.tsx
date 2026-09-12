import * as React from "react";
import { Sparkles, Check } from "lucide-react";

export function AiInsightsSection() {
  return (
    <section id="ai-insights" className="py-20 md:py-28 bg-[#070b12] border-t border-white/[0.07] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-amber-400 text-xs font-mono uppercase tracking-wider mb-4">
            Financial Intelligence Layer
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            AI that helps you understand the numbers.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            ONcue analyzes structured payment information and historical behavior to turn complex payment data into practical insights.
          </p>
        </div>

        {/* Business Intelligence Output Panel */}
        <div className="fintech-card card-specular rounded-2xl p-6 sm:p-8 bg-[#0d1322] border border-white/10 max-w-4xl shadow-2xl">
          {/* Top intelligence bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.07]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                Automated Underwriting & Risk Synthesis
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Model: ONcue Payment-Calibrated v2.4
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Score & Risk Overview */}
            <div className="md:col-span-5 p-5 rounded-xl bg-slate-900/60 border border-white/5 space-y-4">
              <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Payment Risk Analysis
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold font-mono text-emerald-400">
                  92 <span className="text-lg font-normal text-slate-500">/ 100</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  Low Risk
                </span>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/5">
                Evaluated against 41,000+ commercial construction invoices across Canada. Calibrated for general contracting & specialty trade terms.
              </div>

              <div className="pt-2 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Dispute Probability</span>
                  <span className="font-mono text-emerald-400 font-medium">0.8% (Very Low)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Cash Flow Stress</span>
                  <span className="font-mono text-emerald-400 font-medium">Nominal</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Holdback Retention Risk</span>
                  <span className="font-mono text-slate-200 font-medium">Negligible</span>
                </div>
              </div>
            </div>

            {/* Right: Synthesis & Recommended Approach */}
            <div className="md:col-span-7 space-y-6">
              {/* Historical Synthesis Quote */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  Behavioral Synthesis
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  &ldquo;Northstar Renovations has completed 24 recorded invoices, with 22 paid on time. Recent payment behavior remains consistent, with an average delay of 1.8 days.&rdquo;
                </p>
              </div>

              {/* Exact Recommended Approach */}
              <div className="p-5 rounded-xl bg-amber-500/[0.04] border border-amber-500/20">
                <div className="text-xs font-mono text-amber-300 uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Recommended Approach</span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Check className="w-3-h-3" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Use milestone-based payments
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Structure draws aligned to measurable job milestones (mobilization, rough-in, midpoint, and completion).
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Request a 20% upfront payment
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Covers initial supplies, permits, and equipment staging prior to physical trade deployment.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-md bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        Set clear payment terms before starting
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Specify Net 15 terms with automatic reminder triggers and written sign-off protocols.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

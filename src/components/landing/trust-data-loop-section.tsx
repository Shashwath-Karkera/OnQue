import * as React from "react";
import { ArrowRight, Database, BrainCircuit, Lightbulb, Compass, Award, RefreshCw } from "lucide-react";

export function TrustDataLoopSection() {
  const loopNodes = [
    {
      title: "Payment Experience",
      detail: "Invoices issued, payment dates, holdbacks, and communications recorded.",
      icon: RefreshCw,
    },
    {
      title: "Structured Data",
      detail: "Clean standardization into trade classification, job sizes, and payment latency.",
      icon: Database,
    },
    {
      title: "Pattern Analysis",
      detail: "Correlating client habits, seasonal slows, and project-type delay trends.",
      icon: BrainCircuit,
    },
    {
      title: "AI Insight",
      detail: "Calibrating 0–100 reliability scores and identifying risk anomalies.",
      icon: Lightbulb,
    },
    {
      title: "Better Guidance",
      detail: "Actionable milestone structures, upfront deposit percentages, and terms.",
      icon: Compass,
    },
    {
      title: "Better Future Decisions",
      detail: "Contractors sign protected contracts with reliable, verified partners.",
      icon: Award,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#080c14] border-t border-white/[0.07] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            Network Intelligence Flywheel
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Every payment experience makes ONcue smarter.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            As contractors log invoices and settle milestone draws across Canada, our intelligence engine sharpens delay predictions and strengthens payment standards for the entire trade community.
          </p>
        </div>

        {/* Visual Product Loop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative">
          {loopNodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div
                key={idx}
                className="fintech-card card-specular fintech-card-hover rounded-2xl p-6 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-amber-400">
                      {idx + 1}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-slate-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {node.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {node.detail}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Loop Stage 0{idx + 1}</span>
                  {idx < 5 ? (
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400/60" />
                  ) : (
                    <span className="text-emerald-400 font-semibold">Continuous Cycle</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

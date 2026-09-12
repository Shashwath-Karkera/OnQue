import * as React from "react";
import { UploadCloud, Cpu, ShieldCheck, ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Import Your Invoice History",
      description:
        "Upload past CSV invoices or link your accounting tool. ONcue maps invoice dates, partial payments, follow-ups, and actual paid dates.",
      icon: UploadCloud,
    },
    {
      step: "02",
      title: "Score the Client's Real Behavior",
      description:
        "Our engine calculates a 0–100 ONcue Score with a clear confidence band. We evaluate average delay, payment variance, and size sensitivity.",
      icon: Cpu,
    },
    {
      step: "03",
      title: "Get Bulletproof Contract Terms",
      description:
        "The AI Pre-Engagement Advisor tells you exactly what deposit to demand, how to split milestones, and what maximum exposure limit to carry.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-amber-400 uppercase mb-3">
            How It Works
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Stop guessing if a client will pay on time.
          </h3>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Three simple steps to safeguard your cash flow before mobilization begins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-700 group-hover:text-amber-500/60 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-xs text-amber-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

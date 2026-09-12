"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, History, BrainCircuit, CheckCheck, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Find Your Client",
      description: "Search for or add a client you're considering working with across verified Canadian businesses.",
      icon: Search,
      tag: "Directory & Search",
    },
    {
      number: "02",
      title: "Understand Their History",
      description: "Review available payment history, patterns, delay days, and relevant sub-trade experiences.",
      icon: History,
      tag: "Historical Records",
    },
    {
      number: "03",
      title: "Get Intelligent Insights",
      description: "ONcue analyzes payment behavior and identifies potential risk indicators, holdbacks, and disputes.",
      icon: BrainCircuit,
      tag: "Behavioral Analytics",
    },
    {
      number: "04",
      title: "Make a Smarter Decision",
      description: "Get practical recommendations for payment terms, deposits, and milestone schedules before you sign.",
      icon: CheckCheck,
      tag: "Safeguards & Terms",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white border-t border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>Workflow Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            How ONcue Works
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From initial client discovery to milestone contract finalization, ONcue gives you an unfair advantage in protecting your cash flow.
          </p>
        </motion.div>

        {/* 4 Connected Step Cards with Clean Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Subtle connecting bar for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] bg-slate-200 -translate-y-12 pointer-events-none -z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-slate-50/80 hover:bg-white border border-slate-200/90 rounded-2xl p-6 relative flex flex-col justify-between z-10 group shadow-[0_2px_10px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_24px_-4px_rgba(15,23,42,0.06)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-amber-800 px-2.5 py-1 rounded-md bg-amber-100/70 border border-amber-200">
                      STEP {step.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm group-hover:text-amber-600 group-hover:border-amber-300 transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight group-hover:text-amber-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">{step.tag}</span>
                  {idx < 3 ? (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                  ) : (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

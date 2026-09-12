"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Bell, CheckCircle2, ArrowRight } from "lucide-react";

export function AutomatedRemindersSection() {
  const steps = [
    {
      timing: "3 days before due date",
      status: "Payment reminder sent",
      channels: ["Email", "SMS"],
      description: "Courteous heads-up with 1-click Interac e-Transfer and EFT payment details.",
      color: "text-slate-200",
      badge: "bg-slate-800 text-slate-300",
    },
    {
      timing: "Due date",
      status: "Payment due notification",
      channels: ["Email", "SMS"],
      description: "Friendly formal notification verifying invoice maturity and direct remittance receipt link.",
      color: "text-amber-400",
      badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    },
    {
      timing: "3 days overdue",
      status: "Follow-up reminder",
      channels: ["Email", "SMS"],
      description: "Direct accounting escalation with work-stoppage clause notification if applicable.",
      color: "text-rose-400",
      badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#080c14] border-t border-white/[0.07] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Automated Follow-ups</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Spend less time chasing invoices.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Eliminate awkward follow-up phone calls. ONcue delivers polished, automated notifications via Email and SMS on a proven timeline that gets contractors paid 19 days faster.
          </p>
        </motion.div>

        {/* Realistic Reminder Timeline with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="fintech-card glow-border rounded-2xl p-6 sm:p-8 bg-[#0d1322] max-w-4xl shadow-2xl"
        >
          <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Automated Follow-up Sequence
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Active Dispatch Engine
            </span>
          </div>

          <div className="relative space-y-6">
            {/* Vertical connecting glowing line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-slate-700 via-amber-500/40 to-rose-500/40 -z-0" />

            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="relative z-10 flex items-start gap-4 sm:gap-6 group"
              >
                {/* Node indicator */}
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-white shrink-0 shadow-sm group-hover:border-amber-500/40 group-hover:scale-105 transition-all">
                  0{idx + 1}
                </div>

                {/* Content Box */}
                <div className="flex-1 p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-white/5 space-y-2 group-hover:border-white/15 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-slate-400">
                        {step.timing}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-600 hidden sm:inline" />
                      <span className={`text-sm font-bold ${step.color}`}>
                        {step.status}
                      </span>
                    </div>

                    {/* Channels indicators */}
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5 font-mono">
                        <Mail className="w-3 h-3 text-amber-400" />
                        Email
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5 font-mono">
                        <MessageSquare className="w-3 h-3 text-emerald-400" />
                        SMS
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
            <span>Reminders are personalized with your company branding and contract invoice number.</span>
            <span className="text-amber-400 font-medium font-mono">100% Automated Workflow</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

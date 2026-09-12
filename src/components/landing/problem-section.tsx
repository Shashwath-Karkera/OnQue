"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { HelpCircle, Clock, FileSpreadsheet } from "lucide-react";

export function ProblemSection() {
  const cards = [
    {
      title: "Unknown Payment History",
      desc: "You don't always know whether a client consistently pays invoices on time. Without objective data, you rely on subjective references or optimistic sales conversations.",
      icon: HelpCircle,
      tag: "Pre-job Blindspot",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      iconBg: "bg-amber-50 text-amber-600 border-amber-200/60",
      topBorder: "group-hover:border-t-amber-500",
    },
    {
      title: "Payment Delays",
      desc: "Late and partial payments can disrupt cash flow and create unnecessary follow-ups. Every delayed invoice drains operating capital and forces you to play bank for your clients.",
      icon: Clock,
      tag: "24+ Days Average Delay",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      iconBg: "bg-rose-50 text-rose-600 border-rose-200/60",
      topBorder: "group-hover:border-t-rose-500",
    },
    {
      title: "No Clear Risk Picture",
      desc: "Payment information is often scattered across invoices, conversations, and personal records. There is no centralized intelligence to guide contract terms or protect your margins.",
      icon: FileSpreadsheet,
      tag: "Fragmented Records",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      iconBg: "bg-blue-50 text-blue-600 border-blue-200/60",
      topBorder: "group-hover:border-t-blue-500",
    },
  ];

  return (
    <section className="py-20 md:py-28 border-t border-slate-200/80 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Motion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-14 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>The Contractor Reality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            You shouldn&apos;t have to guess if you&apos;ll get paid.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Too many contractors enter contracts on good faith, fronting thousands of dollars in materials and payroll, only to discover their client has a chronic history of slow-paying, disputing scope, or holding back final draws.
          </p>
        </motion.div>

        {/* 3 Interactive Motion Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`bg-white border border-slate-200/90 rounded-2xl p-7 flex flex-col justify-between group relative overflow-hidden shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_30px_-4px_rgba(15,23,42,0.08)] transition-all duration-300 border-t-2 ${card.topBorder}`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl ${card.iconBg} border flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-all duration-300`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-amber-700 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 text-xs font-mono text-slate-500 flex items-center justify-between">
                  <span>Risk factor</span>
                  <span className={`px-2.5 py-1 rounded-md border text-xs font-semibold ${card.badgeColor}`}>
                    {card.tag}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

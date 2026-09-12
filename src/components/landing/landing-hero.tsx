"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Search,
} from "lucide-react";

interface LandingHeroProps {
  onCheckClientClick: () => void;
}

const HERO_PROFILES = [
  {
    name: "Northstar Renovations",
    trade: "General Contracting & Commercial Fit-Outs",
    location: "Toronto, ON",
    score: 92,
    riskBand: "Low Risk",
    invoices: 24,
    paidOnTime: 22,
    delay: "1.8 days",
    totalPaid: "$48,200",
    outstanding: "$6,400",
    quote:
      "Payment behavior has remained consistent over the last 6 months. For a project of this size, consider milestone-based payments.",
    safeguard: "20% Upfront Draw",
  },
  {
    name: "Westmount Commercial",
    trade: "Hospitality & Retail General Contractor",
    location: "Montreal, QC",
    score: 64,
    riskBand: "Moderate Risk",
    invoices: 16,
    paidOnTime: 9,
    delay: "18.5 days",
    totalPaid: "$32,400",
    outstanding: "$18,400",
    quote:
      "Consistently delays payments 2-3 weeks. Subcontractor retainage holdback risk. Require 35% upfront deposit before framing.",
    safeguard: "35% Upfront Deposit",
  },
  {
    name: "Apex Infrastructure",
    trade: "Tier 1 Commercial Development",
    location: "Vancouver, BC",
    score: 96,
    riskBand: "Low Risk",
    invoices: 38,
    paidOnTime: 37,
    delay: "0.9 days",
    totalPaid: "$94,500",
    outstanding: "$12,000",
    quote:
      "Premier institutional payer with automated EFT disbursements. Standard Net 30 terms well respected across all trades.",
    safeguard: "Standard Net 30 Terms",
  },
];

export function LandingHero({ onCheckClientClick }: LandingHeroProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const profile = HERO_PROFILES[activeIdx];

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-dot-light">
      {/* Soft light amber ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-amber-200/40 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left: Core Value Messaging */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Category Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Payment Intelligence Platform</span>
              <span className="text-slate-300">|</span>
              <span className="text-amber-700 font-mono text-[11px]">For Contractors & Trades</span>
            </div>

            {/* Exact Required Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12] mb-6">
              Stop Chasing Payments.{" "}
              <span className="text-slate-900 block">
                Start Making{" "}
                <span className="text-amber-600">Smarter Decisions.</span>
              </span>
            </h1>

            {/* Exact Required Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              ONcue helps contractors understand client payment behavior, manage payment
              schedules, and use AI-powered insights to reduce payment risk before and
              during every project.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-4">
              <Link href="/app" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 h-12 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <a href="#product-studio" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-slate-300 bg-white hover:bg-slate-50 text-slate-800 h-12 rounded-xl px-7 text-sm shadow-sm"
                >
                  See How It Works
                </Button>
              </a>
            </div>

            {/* Exact Required Trust-Oriented Line */}
            <div className="text-xs text-slate-500 font-medium tracking-wide mb-8">
              Built for contractors who value their time and cash flow.
            </div>

            {/* Interactive Search Bar Teaser */}
            <div className="p-3 rounded-xl bg-white border border-slate-200 w-full max-w-md flex items-center justify-between gap-3 shadow-sm hover:border-amber-400 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-700 font-medium">
                  Check a prospective client&apos;s payment history
                </span>
              </div>
              <button
                onClick={onCheckClientClick}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors"
              >
                <span>Check</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Right: Clean White Elevated Product Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6 w-full"
          >
            <div className="fintech-card rounded-2xl p-6 sm:p-7 bg-white border border-slate-200 shadow-xl relative">
              {/* Window Header with Client Switcher Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="text-xs font-mono text-slate-500 ml-2">
                    Payment Intelligence Preview
                  </span>
                </div>

                {/* Switcher Pills */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
                  {HERO_PROFILES.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                        activeIdx === idx
                          ? "bg-white text-slate-950 font-bold shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {p.name.split(" ")[0]} ({p.score})
                    </button>
                  ))}
                </div>
              </div>

              {/* Animated Client Profile Data */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={profile.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Client Info & Score */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-amber-700 font-bold mb-1">
                        Client Underwriting
                      </div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                          {profile.name}
                        </h3>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {profile.trade} • {profile.location}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-100">
                      <div className="text-right">
                        <div className="text-[11px] text-slate-500">Payment Reliability</div>
                        <div
                          className={`text-3xl font-black font-mono ${
                            profile.score >= 80 ? "text-emerald-600" : "text-amber-600"
                          }`}
                        >
                          {profile.score}{" "}
                          <span className="text-sm font-normal text-slate-400">/ 100</span>
                        </div>
                      </div>
                      <div
                        className={`mt-1 px-3 py-0.5 rounded-full text-xs font-bold ${
                          profile.score >= 80
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {profile.riskBand}
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[11px] text-slate-500">Total Invoices</div>
                      <div className="text-base font-bold font-mono text-slate-950 mt-0.5">
                        {profile.invoices} invoices
                      </div>
                      <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
                        {profile.paidOnTime} on terms
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[11px] text-slate-500">Avg Payment Delay</div>
                      <div
                        className={`text-base font-bold font-mono mt-0.5 ${
                          profile.score >= 80 ? "text-emerald-600" : "text-amber-600"
                        }`}
                      >
                        {profile.delay}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Trade avg: 16.4d</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[11px] text-slate-500">Total Paid (CAD)</div>
                      <div className="text-base font-bold font-mono text-slate-950 mt-0.5">
                        {profile.totalPaid}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Canadian dollars</div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-3 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-slate-500">Outstanding Balance</span>
                        <div className="text-base font-bold font-mono text-slate-950">
                          {profile.outstanding} CAD
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
                        INV-1042 due Sep 18
                      </span>
                    </div>
                  </div>

                  {/* AI Insight Box in Light Mode */}
                  <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                          AI Insight
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Confidence: 96%</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      &ldquo;{profile.quote}&rdquo;
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-600">Recommended Safeguard:</span>
                      <span className="font-mono font-bold text-amber-800">{profile.safeguard}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Verified on Canadian Trade Registry
                </span>
                <Link
                  href="/app/clients/northstar-renovations"
                  className="text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
                >
                  <span>Open Full Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

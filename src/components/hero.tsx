"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { RiskCardInteractive } from "@/components/risk-card-interactive";
import {
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle,
  FileCheck2,
  Lock,
  TrendingDown,
} from "lucide-react";

interface HeroProps {
  onCheckClientClick: () => void;
}

export function Hero({ onCheckClientClick }: HeroProps) {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Background Gradients & Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Headline & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />

              <span className="text-slate-500">|</span>
              <span className="text-slate-300 font-normal">Pre-Engagement Risk Scoring</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Know how a client pays{" "}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                before you start the job.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              ONcue analyzes historical invoice patterns — tracking every late payment,
              partial deposit, and broken promise — to deliver a 0–100 risk score, delay
              predictions, and battle-tested contract terms before you sign.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
              <Button
                size="lg"
                onClick={onCheckClientClick}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 h-12 rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group"
              >
                <span>Check a Client Risk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200 h-12 rounded-xl px-6"
                >
                  See How It Works
                </Button>
              </a>
            </div>

            {/* Trust and Key Points */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2,400+ Active Contractors</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Zero card required to start</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Private & Encrypted Data</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Client Risk Card Prototype */}
          <div className="lg:col-span-6 w-full flex justify-center" id="risk-reads">
            <RiskCardInteractive />
          </div>
        </div>

        {/* Proof Metrics Banner */}
        <div className="mt-16 sm:mt-24 pt-10 border-t border-slate-800/80">
          <p className="text-center text-xs uppercase tracking-widest text-slate-500 font-semibold mb-8">
            Empowering contractors across electrical, mechanical, framing, plumbing & general contracting
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mb-1">
                41,000+
              </div>
              <div className="text-xs text-slate-400">Invoices Analyzed</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 mb-1">
                $14.2M
              </div>
              <div className="text-xs text-slate-400">Delinquent Debt Prevented</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 mb-1">
                19 Days
              </div>
              <div className="text-xs text-slate-400">Average Delay Detected Early</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-400 mb-1">
                99.4%
              </div>
              <div className="text-xs text-slate-400">Prediction Calibration</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

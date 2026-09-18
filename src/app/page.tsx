"use client";

import React, { useState } from "react";
import Link from "next/link";
import { OncueBrand } from "@/components/brand/oncue-brand";
import { SiteFooter } from "@/components/brand/site-footer";
import { PricingSection } from "@/components/pricing/pricing-section";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  FileText,
  CreditCard,
  Building,
  Layers,
  Sparkles,
  ChevronRight,
  BarChart3,
  Scale,
  Lock,
} from "lucide-react";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"summary" | "milestones">("summary");

  return (
    <div className="min-h-screen bg-[#070708] text-[#F4F4F5] flex flex-col selection:bg-[#F95721]/30 selection:text-white">
      {/* 1. Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070708]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <OncueBrand size="md" />
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#A1A1AA]">
            <a href="#how-it-works" className="hover:text-[#F4F4F5] transition-colors">
              How it works
            </a>
            <a href="#intelligence" className="hover:text-[#F4F4F5] transition-colors">
              Payment Intelligence
            </a>
            <a href="#pricing" className="hover:text-[#F4F4F5] transition-colors">
              Pricing
            </a>
            <Link href="/about" className="hover:text-[#F4F4F5] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#F4F4F5] transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/app"
              className="text-sm font-medium text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors px-3 py-1.5"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center relative">
          {/* Subtle Silver Specular Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-white/[0.04] to-transparent rounded-full blur-[140px] pointer-events-none" />

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F4F4F5] leading-[1.15] mb-6">
            Stop Chasing Payments.
            <br />
            <span className="silver-gradient-text">Start Making Smarter Decisions.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed mb-10">
            ONcue helps contractors understand client payment behavior, predict
            delays before breaking ground, and structure milestone schedules that
            protect job profitability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              href="/app"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full copper-cta font-medium text-sm flex items-center justify-center gap-2 group"
            >
              <span>Explore Intelligence Platform</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#product-preview"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full silver-pill text-sm font-medium text-[#E4E4E7] flex items-center justify-center gap-2"
            >
              See Product Preview
            </a>
          </div>
        </section>

        {/* 3. Product Preview in a Polished Silver-Obsidian Frame */}
        <section id="product-preview" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="rounded-2xl silver-card-elevated overflow-hidden">
            {/* Top window bar */}
            <div className="h-10 px-4 bg-[#0A0A0D] border-b border-white/[0.08] flex items-center justify-between text-xs text-[#A1A1AA]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="ml-3 font-mono text-[11px] text-zinc-400 hidden sm:inline">
                  app.oncue.io/clients/northstar-renovations
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#A1A1AA]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Demo Profile
              </div>
            </div>

            {/* Inner Mockup View */}
            <div className="p-4 sm:p-8 space-y-6">
              {/* Client Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                <div>
                  <div className="text-xs font-mono text-[#A1A1AA] mb-1">
                    Clients / Northstar Renovations
                  </div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#F4F4F5]">
                      Northstar Renovations
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Low Risk
                    </span>
                  </div>
                  <p className="text-xs text-[#A1A1AA] mt-1">
                    Commercial General Contractor · Toronto, ON · Active Client
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs text-[#A1A1AA]">
                    Net 15 Days
                  </div>
                  <div className="px-3.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs text-[#A1A1AA]">
                    20% Upfront
                  </div>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="silver-card rounded-xl p-4">
                  <div className="text-xs text-[#A1A1AA]">Reliability Score</div>
                  <div className="text-2xl font-bold text-[#F4F4F5] mt-1 font-mono">
                    92 <span className="text-xs font-normal text-[#A1A1AA]">/100</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">High promptness</div>
                </div>
                <div className="silver-card rounded-xl p-4">
                  <div className="text-xs text-[#A1A1AA]">On-Time Rate</div>
                  <div className="text-2xl font-bold text-[#F4F4F5] mt-1 font-mono">
                    92%
                  </div>
                  <div className="text-[11px] text-[#A1A1AA] mt-1">22 of 24 invoices</div>
                </div>
                <div className="silver-card rounded-xl p-4">
                  <div className="text-xs text-[#A1A1AA]">Average Delay</div>
                  <div className="text-2xl font-bold text-[#F4F4F5] mt-1 font-mono">
                    +1.8d
                  </div>
                  <div className="text-[11px] text-[#A1A1AA] mt-1">Past due date</div>
                </div>
                <div className="silver-card rounded-xl p-4">
                  <div className="text-xs text-[#A1A1AA]">Total Volume</div>
                  <div className="text-2xl font-bold text-[#F4F4F5] mt-1 font-mono">
                    $184K
                  </div>
                  <div className="text-[11px] text-[#A1A1AA] mt-1">Across 3 projects</div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center gap-6 border-b border-white/[0.08] text-xs font-medium text-[#A1A1AA]">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`pb-2 transition-colors ${
                    activeTab === "summary"
                      ? "text-[#F4F4F5] border-b-2 border-[#F95721] font-semibold"
                      : "hover:text-[#F4F4F5]"
                  }`}
                >
                  Overview & Intelligence
                </button>
                <button
                  onClick={() => setActiveTab("milestones")}
                  className={`pb-2 transition-colors ${
                    activeTab === "milestones"
                      ? "text-[#F4F4F5] border-b-2 border-[#F95721] font-semibold"
                      : "hover:text-[#F4F4F5]"
                  }`}
                >
                  Recommended Payment Terms
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "summary" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl silver-card flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#F95721] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-[#F4F4F5]">
                        ONcue Payment Intelligence Finding
                      </div>
                      <p className="text-xs text-[#A1A1AA] mt-1 leading-relaxed">
                        Payment behavior has remained consistent over the last 6 months.
                        Most invoices are settled within the agreed Net 15 schedule. Minor
                        delays only occurred on retainage closeouts exceeding $25,000.
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0A0A0D]">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-white/[0.08] text-[#A1A1AA] bg-[#111114]">
                          <th className="py-2.5 px-4 font-medium">Invoice #</th>
                          <th className="py-2.5 px-4 font-medium">Project</th>
                          <th className="py-2.5 px-4 font-medium">Amount</th>
                          <th className="py-2.5 px-4 font-medium">Due Date</th>
                          <th className="py-2.5 px-4 font-medium">Delay</th>
                          <th className="py-2.5 px-4 font-medium text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05]">
                        <tr>
                          <td className="py-3 px-4 font-mono text-[#F4F4F5]">INV-2024-041</td>
                          <td className="py-3 px-4 text-[#A1A1AA]">Bay Street Office Fit-out</td>
                          <td className="py-3 px-4 font-semibold text-[#F4F4F5] font-mono">$12,400</td>
                          <td className="py-3 px-4 text-[#A1A1AA]">Oct 14, 2024</td>
                          <td className="py-3 px-4 text-emerald-400">On time</td>
                          <td className="py-3 px-4 text-right">
                            <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Paid
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-mono text-[#F4F4F5]">INV-2024-038</td>
                          <td className="py-3 px-4 text-[#A1A1AA]">Yorkville Retail Expansion</td>
                          <td className="py-3 px-4 font-semibold text-[#F4F4F5] font-mono">$8,600</td>
                          <td className="py-3 px-4 text-[#A1A1AA]">Sep 28, 2024</td>
                          <td className="py-3 px-4 text-[#A1A1AA]">+2 days</td>
                          <td className="py-3 px-4 text-right">
                            <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Paid
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "milestones" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-xl silver-card">
                    <div className="text-xs text-[#A1A1AA]">Deposit Required</div>
                    <div className="text-lg font-bold text-[#F4F4F5] mt-1">20% Upfront</div>
                    <div className="text-[11px] text-[#A1A1AA] mt-0.5">Locks mobilization costs</div>
                  </div>
                  <div className="p-4 rounded-xl silver-card">
                    <div className="text-xs text-[#A1A1AA]">Payment Terms</div>
                    <div className="text-lg font-bold text-[#F4F4F5] mt-1">Net 15 Days</div>
                    <div className="text-[11px] text-[#A1A1AA] mt-0.5">High promptness record</div>
                  </div>
                  <div className="p-4 rounded-xl silver-card">
                    <div className="text-xs text-[#A1A1AA]">Billing Structure</div>
                    <div className="text-lg font-bold text-[#F4F4F5] mt-1">Milestone Billed</div>
                    <div className="text-[11px] text-[#A1A1AA] mt-0.5">Tied to inspection sign-offs</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. The Problem in Clean Silver Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F4F4F5] mb-2">
              The Contractor Cash Flow Dilemma
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA]">
              Why traditional credit checks fail construction and trade businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="silver-card rounded-xl p-6 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-[#F4F4F5]">Unilateral Risk</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Contractors finance materials, equipment rental, and payroll out of pocket. If a client stretches payment 90 days, you absorb all the financing burden.
              </p>
            </div>

            <div className="silver-card rounded-xl p-6 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-[#F4F4F5]">Zero Pre-Work Insight</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Clients scrutinize your references, licenses, and insurance. Contractors have had zero standardized tools to check if a client actually pays on time.
              </p>
            </div>

            <div className="silver-card rounded-xl p-6 space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#F95721]/10 border border-[#F95721]/20 flex items-center justify-center text-[#F95721]">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-[#F4F4F5]">Awkward Collections</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Chasing overdue payments turns you into an unpaid collections agent instead of focusing on great craftsmanship and growing your trade enterprise.
              </p>
            </div>
          </div>
        </section>

        {/* 5. How It Works in 4 Connected Silver Cards */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F4F4F5] mb-2">
              How ONcue Protects Your Business
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA]">
              A disciplined, 4-stage operational framework.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="silver-card rounded-xl p-6 space-y-2">
              <div className="font-mono text-xs font-bold text-zinc-300">STAGE 01</div>
              <h3 className="text-sm font-semibold text-[#F4F4F5]">Evaluate Client</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Look up payment reliability, settlement turnaround, and dispute rates before submitting an estimate.
              </p>
            </div>

            <div className="silver-card rounded-xl p-6 space-y-2">
              <div className="font-mono text-xs font-bold text-zinc-300">STAGE 02</div>
              <h3 className="text-sm font-semibold text-[#F4F4F5]">Structure Terms</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Get recommended upfront deposit percentages (20%–35%) and Net windows calibrated to client risk.
              </p>
            </div>

            <div className="silver-card rounded-xl p-6 space-y-2">
              <div className="font-mono text-xs font-bold text-zinc-300">STAGE 03</div>
              <h3 className="text-sm font-semibold text-[#F4F4F5]">Track Milestones</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Link invoices to tangible work stages. Automatic reminders trigger before due dates so funds arrive promptly.
              </p>
            </div>

            <div className="silver-card rounded-xl p-6 space-y-2">
              <div className="font-mono text-xs font-bold text-zinc-300">STAGE 04</div>
              <h3 className="text-sm font-semibold text-[#F4F4F5]">Record & Build Data</h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Every settled invoice updates client metrics, strengthening ongoing intelligence and negotiating leverage.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Payment Intelligence Table in Silver Card */}
        <section id="intelligence" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="silver-card-elevated rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#F4F4F5]">
                Payment Reliability Benchmarks
              </h2>
              <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
                Empirical scoring based on verified trade transactions, not bank credit card inquiries.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0A0A0D]">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-[#111114] text-[#A1A1AA]">
                    <th className="py-3 px-4 font-medium">Sample Entity</th>
                    <th className="py-3 px-4 font-medium">Reliability Score</th>
                    <th className="py-3 px-4 font-medium">On-Time Rate</th>
                    <th className="py-3 px-4 font-medium">Average Delay</th>
                    <th className="py-3 px-4 font-medium">Risk Level</th>
                    <th className="py-3 px-4 font-medium">Recommended Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <tr>
                    <td className="py-3 px-4 font-medium text-[#F4F4F5]">Northstar Renovations</td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#F4F4F5]">92 / 100</td>
                    <td className="py-3 px-4 text-emerald-400">92% (22/24)</td>
                    <td className="py-3 px-4 text-[#A1A1AA]">1.8 days</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Low Risk
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#A1A1AA]">Standard Net 15, 20% deposit</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-[#F4F4F5]">Apex Construction Group</td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#F4F4F5]">71 / 100</td>
                    <td className="py-3 px-4 text-amber-400">71% (13/18)</td>
                    <td className="py-3 px-4 text-[#A1A1AA]">6.2 days</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Medium Risk
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#A1A1AA]">Milestone escrow, 35% upfront</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-[#F4F4F5]">Vanguard Properties</td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#F4F4F5]">44 / 100</td>
                    <td className="py-3 px-4 text-rose-400">42% (5/12)</td>
                    <td className="py-3 px-4 text-rose-400">18.4 days</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        High Risk
                      </span>
                    </td>
                    <td className="py-3 px-4 text-rose-300">50% deposit, weekly draws only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7. Simple, Transparent Pricing Section */}
        <PricingSection />

        {/* 8. Final CTA in Silver Container */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="rounded-3xl silver-card-elevated p-8 sm:p-14 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F4F5]">
              Protect your trade business today.
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
              Gain immediate visibility into client payment histories, manage invoices,
              and operate with financial clarity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/app"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full copper-cta font-medium text-sm flex items-center justify-center gap-2 group"
              >
                <span>Open Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full silver-pill text-sm font-medium text-[#E4E4E7] flex items-center justify-center"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 9. Proper Professional Footer */}
      <SiteFooter />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { OncueBrand } from "@/components/brand/oncue-brand";
import { SiteFooter } from "@/components/brand/site-footer";
import { ThemeToggle } from "@/components/theme/theme-toggle";
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
  const [activeTab, setActiveTab] = useState<"summary" | "milestones" | "invoices">("summary");

  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#F0F3F6] flex flex-col selection:bg-blue-600/30 selection:text-white">
      {/* 1. Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-[#22262B] bg-[#0B0D0F]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <OncueBrand size="md" />
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#8492A6]">
            <a href="#how-it-works" className="hover:text-[#F0F3F6] transition-colors">
              How it works
            </a>
            <a href="#intelligence" className="hover:text-[#F0F3F6] transition-colors">
              Payment Intelligence
            </a>
            <a href="#recommendations" className="hover:text-[#F0F3F6] transition-colors">
              Recommendations
            </a>
            <Link href="/about" className="hover:text-[#F0F3F6] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#F0F3F6] transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/app"
              className="text-sm font-medium text-[#8492A6] hover:text-[#F0F3F6] transition-colors hidden sm:inline-block"
            >
              Sign In
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs sm:text-sm font-medium transition-all shadow-[0_4px_16px_rgba(37,99,235,0.3)]"
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">


          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F0F3F6] leading-[1.15] mb-6">
            Stop Chasing Payments.
            <br />
            <span className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F0F3F6] leading-[1.15] mb-6">Start Making Smarter Decisions.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#8492A6] max-w-2xl mx-auto leading-relaxed mb-10">
            ONcue helps contractors understand client payment behavior, predict
            delays before breaking ground, and structure milestone schedules that
            protect job profitability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-medium transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,99,235,0.35)]"
            >
              <span>Open ONcue Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#product-preview"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#161A1D] hover:bg-[#22262B] border border-white/10 text-sm font-medium text-[#F0F3F6] transition-colors flex items-center justify-center"
            >
              See Product Preview
            </a>
          </div>
        </section>

        {/* 3. Product Preview in a Premium Glass Frame */}
        <section id="product-preview" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#141820]/95 to-[#0E1117] shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Top window bar */}
            <div className="h-10 px-4 bg-[#0A0D12]/90 border-b border-white/10 flex items-center justify-between text-xs text-[#8492A6]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2A313C]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#2A313C]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#2A313C]" />
                <span className="ml-3 font-mono text-[11px] text-[#555E6C] hidden sm:inline">
                  app.oncue.io/clients/northstar-renovations
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Demo Profile
              </div>
            </div>

            {/* Inner Mockup View */}
            <div className="p-4 sm:p-8 space-y-6">
              {/* Client Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <div className="text-xs font-mono text-[#8492A6] mb-1">
                    Clients / Northstar Renovations
                  </div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#F0F3F6]">
                      Northstar Renovations
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Low Risk
                    </span>
                  </div>
                  <p className="text-xs text-[#8492A6] mt-1">
                    Commercial General Contractor · Toronto, Canada · Member since 2024
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/app/clients/1"
                    className="px-3.5 py-1.5 rounded-lg bg-[#161A1D] hover:bg-[#22262B] border border-white/10 text-xs font-medium text-[#F0F3F6] transition-colors"
                  >
                    View Full Profile
                  </Link>
                  <Link
                    href="/app/payments"
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition-colors shadow-sm"
                  >
                    Record Payment
                  </Link>
                </div>
              </div>

              {/* 4 Cards Grid for Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-4 shadow-md">
                  <div className="text-xs text-[#8492A6]">Payment Reliability</div>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="text-3xl font-bold text-[#F0F3F6] font-mono">92</span>
                    <span className="text-xs text-[#8492A6]">/ 100</span>
                  </div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" /> High Confidence
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-4 shadow-md">
                  <div className="text-xs text-[#8492A6]">Settlement Track</div>
                  <div className="text-2xl font-bold text-[#F0F3F6] mt-1.5 font-mono">22 of 24</div>
                  <div className="text-xs text-[#8492A6] mt-1">
                    Invoices settled strictly on time
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-4 shadow-md">
                  <div className="text-xs text-[#8492A6]">Average Payment Delay</div>
                  <div className="text-2xl font-bold text-[#F0F3F6] mt-1.5 font-mono">1.8 days</div>
                  <div className="text-xs text-[#8492A6] mt-1">
                    Industry avg: 14.2 days
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#0A0D12] p-4 shadow-md">
                  <div className="text-xs text-[#8492A6]">Total Settled Volume</div>
                  <div className="text-2xl font-bold text-[#F0F3F6] mt-1.5 font-mono">$148,200</div>
                  <div className="text-xs text-[#8492A6] mt-1">
                    $6,400 active outstanding
                  </div>
                </div>
              </div>

              {/* Mini Tabs for preview */}
              <div className="flex items-center gap-6 border-b border-white/10 text-xs font-medium text-[#8492A6]">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`pb-2 transition-colors ${activeTab === "summary"
                    ? "text-[#F0F3F6] border-b-2 border-[#3B82F6]"
                    : "hover:text-[#F0F3F6]"
                    }`}
                >
                  Overview & Intelligence
                </button>
                <button
                  onClick={() => setActiveTab("milestones")}
                  className={`pb-2 transition-colors ${activeTab === "milestones"
                    ? "text-[#F0F3F6] border-b-2 border-[#3B82F6]"
                    : "hover:text-[#F0F3F6]"
                    }`}
                >
                  Recommended Payment Terms
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "summary" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-950/20 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-[#F0F3F6]">
                        ONcue Payment Intelligence Finding
                      </div>
                      <p className="text-xs text-[#8492A6] mt-1 leading-relaxed">
                        Payment behavior has remained consistent over the last 6 months.
                        Most invoices are settled within the agreed Net 15 schedule. Minor
                        delays only occurred on retainage closeouts exceeding $25,000.
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#0A0D12]">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-white/5 text-[#8492A6] bg-[#0E1218]">
                          <th className="py-2.5 px-4 font-medium">Invoice #</th>
                          <th className="py-2.5 px-4 font-medium">Project</th>
                          <th className="py-2.5 px-4 font-medium">Amount</th>
                          <th className="py-2.5 px-4 font-medium">Due Date</th>
                          <th className="py-2.5 px-4 font-medium">Delay</th>
                          <th className="py-2.5 px-4 font-medium text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        <tr>
                          <td className="py-3 px-4 font-mono text-[#F0F3F6]">INV-2024-041</td>
                          <td className="py-3 px-4 text-[#A0AEC0]">Bay Street Office Fit-out</td>
                          <td className="py-3 px-4 font-semibold text-[#F0F3F6] font-mono">$12,400</td>
                          <td className="py-3 px-4 text-[#8492A6]">Oct 14, 2024</td>
                          <td className="py-3 px-4 text-emerald-400">On time</td>
                          <td className="py-3 px-4 text-right">
                            <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Paid
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-mono text-[#F0F3F6]">INV-2024-038</td>
                          <td className="py-3 px-4 text-[#A0AEC0]">Yorkville Retail Expansion</td>
                          <td className="py-3 px-4 font-semibold text-[#F0F3F6] font-mono">$8,600</td>
                          <td className="py-3 px-4 text-[#8492A6]">Sep 28, 2024</td>
                          <td className="py-3 px-4 text-[#8492A6]">+2 days</td>
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
                  <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12]">
                    <div className="text-xs text-[#8492A6]">Deposit Required</div>
                    <div className="text-lg font-bold text-[#F0F3F6] mt-1">20% Upfront</div>
                    <div className="text-[11px] text-[#8492A6] mt-0.5">Locks mobilization costs</div>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12]">
                    <div className="text-xs text-[#8492A6]">Payment Terms</div>
                    <div className="text-lg font-bold text-[#F0F3F6] mt-1">Net 15 Days</div>
                    <div className="text-[11px] text-[#8492A6] mt-0.5">High promptness record</div>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12]">
                    <div className="text-xs text-[#8492A6]">Billing Structure</div>
                    <div className="text-lg font-bold text-[#F0F3F6] mt-1">Milestone Billed</div>
                    <div className="text-[11px] text-[#8492A6] mt-0.5">Tied to inspection sign-offs</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. The Problem in Clean Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F0F3F6] mb-2">
              The Contractor Cash Flow Dilemma
            </h2>
            <p className="text-xs sm:text-sm text-[#8492A6]">
              Why traditional credit checks fail the construction and trade trades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-6 shadow-lg backdrop-blur-md space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-[#F0F3F6]">Unilateral Risk</h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Contractors finance materials, equipment rental, and payroll out of pocket. If a client stretches payment 90 days, you absorb all the financing burden.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-6 shadow-lg backdrop-blur-md space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-[#F0F3F6]">Zero Pre-Work Insight</h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Clients scrutinize your references, licenses, and insurance. Contractors have had zero standardized tools to check if a client actually pays on time.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-6 shadow-lg backdrop-blur-md space-y-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-[#F0F3F6]">Awkward Collections</h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Chasing overdue payments turns you into an unpaid collections agent instead of focusing on great craftsmanship and growing your trade enterprise.
              </p>
            </div>
          </div>
        </section>

        {/* 5. How It Works in 4 Connected Cards */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F0F3F6] mb-2">
              How ONcue Protects Your Business
            </h2>
            <p className="text-xs sm:text-sm text-[#8492A6]">
              A disciplined, 4-stage operational framework.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-6 shadow-lg backdrop-blur-md space-y-2">
              <div className="font-mono text-xs font-bold text-blue-400">STAGE 01</div>
              <h3 className="text-sm font-semibold text-[#F0F3F6]">Evaluate Client</h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Look up payment reliability, settlement turnaround, and dispute rates before submitting an estimate.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-6 shadow-lg backdrop-blur-md space-y-2">
              <div className="font-mono text-xs font-bold text-blue-400">STAGE 02</div>
              <h3 className="text-sm font-semibold text-[#F0F3F6]">Structure Terms</h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Get recommended upfront deposit percentages (20%–35%) and Net windows calibrated to client risk.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-6 shadow-lg backdrop-blur-md space-y-2">
              <div className="font-mono text-xs font-bold text-blue-400">STAGE 03</div>
              <h3 className="text-sm font-semibold text-[#F0F3F6]">Track Milestones</h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Link invoices to tangible work stages. Automatic reminders trigger before due dates so funds arrive promptly.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-6 shadow-lg backdrop-blur-md space-y-2">
              <div className="font-mono text-xs font-bold text-blue-400">STAGE 04</div>
              <h3 className="text-sm font-semibold text-[#F0F3F6]">Record & Build Data</h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Every settled invoice updates client metrics, strengthening ongoing intelligence and negotiating leverage.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Payment Intelligence Table in Card */}
        <section id="intelligence" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#141820]/95 to-[#0E1117] p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#F0F3F6]">
                Payment Reliability Benchmarks
              </h2>
              <p className="text-xs sm:text-sm text-[#8492A6] mt-1">
                Empirical scoring based on verified trade transactions, not bank credit card inquiries.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#0A0D12]">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-white/5 bg-[#0E1218] text-[#8492A6]">
                    <th className="py-3 px-4 font-medium">Sample Entity</th>
                    <th className="py-3 px-4 font-medium">Reliability Score</th>
                    <th className="py-3 px-4 font-medium">On-Time Rate</th>
                    <th className="py-3 px-4 font-medium">Average Delay</th>
                    <th className="py-3 px-4 font-medium">Risk Level</th>
                    <th className="py-3 px-4 font-medium">Recommended Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="py-3 px-4 font-medium text-[#F0F3F6]">Northstar Renovations</td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#F0F3F6]">92 / 100</td>
                    <td className="py-3 px-4 text-emerald-400">92% (22/24)</td>
                    <td className="py-3 px-4 text-[#8492A6]">1.8 days</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Low Risk
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#A0AEC0]">Standard Net 15, 20% deposit</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-[#F0F3F6]">Apex Construction Group</td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#F0F3F6]">71 / 100</td>
                    <td className="py-3 px-4 text-amber-400">71% (13/18)</td>
                    <td className="py-3 px-4 text-[#8492A6]">6.2 days</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        Medium Risk
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#A0AEC0]">Milestone escrow, 35% upfront</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-[#F0F3F6]">Vanguard Properties</td>
                    <td className="py-3 px-4 font-mono font-semibold text-[#F0F3F6]">44 / 100</td>
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

        {/* 7. Final CTA in Premium Glass Container */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#141820]/90 to-[#0A0D12] p-8 sm:p-14 shadow-2xl backdrop-blur-xl space-y-6">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F0F3F6]">
              Protect your trade business today.
            </h2>
            <p className="text-sm sm:text-base text-[#8492A6] max-w-xl mx-auto leading-relaxed">
              Gain immediate visibility into client payment histories, manage invoices,
              and operate with financial clarity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                href="/app"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-medium transition-all shadow-[0_4px_20px_rgba(37,99,235,0.35)]"
              >
                Open Dashboard
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#161A1D] hover:bg-[#22262B] border border-white/10 text-sm font-medium text-[#F0F3F6] transition-colors"
              >
                Talk to Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Proper Professional Footer */}
      <SiteFooter />
    </div>
  );
}

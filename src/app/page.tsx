"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { OncueBrand } from "@/components/brand/oncue-brand";
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
} from "lucide-react";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"summary" | "milestones" | "invoices">("summary");

  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#F0F3F6] flex flex-col selection:bg-blue-600/30 selection:text-white">
      {/* 1. Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-[#22262B] bg-[#0B0D0F]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
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
          <div className="flex items-center gap-4">
            <Link
              href="/app"
              className="text-sm font-medium text-[#8492A6] hover:text-[#F0F3F6] transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-colors shadow-sm"
            >
              Launch Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22262B] bg-[#111417] text-xs font-mono text-[#8492A6] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            Payment Intelligence for Contractors & Trades
          </div>

          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-[#F0F3F6] leading-[1.1] mb-6">
            Stop Chasing Payments.
            <br />
            <span className="text-[#8492A6]">Start Making Smarter Decisions.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#8492A6] max-w-2xl mx-auto leading-relaxed mb-10">
            ONcue helps contractors understand client payment behavior, predict
            delays before breaking ground, and structure milestone schedules that
            protect job profitability.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app"
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Open ONcue Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#product-preview"
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#161A1D] hover:bg-[#22262B] border border-[#22262B] text-sm font-medium text-[#F0F3F6] transition-colors flex items-center justify-center"
            >
              See Product Preview
            </a>
          </div>
        </section>

        {/* 3. Product Preview (Single realistic application mockup - Linear / Stripe style) */}
        <section id="product-preview" className="max-w-6xl mx-auto px-6 pb-24">
          <div className="rounded-xl border border-[#22262B] bg-[#111417] shadow-2xl overflow-hidden">
            {/* Top window bar */}
            <div className="h-10 px-4 bg-[#0E1114] border-b border-[#22262B] flex items-center justify-between text-xs text-[#8492A6]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2A313C]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#2A313C]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#2A313C]" />
                <span className="ml-3 font-mono text-[11px] text-[#555E6C]">
                  app.oncue.io/clients/northstar-renovations
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Demo Data
              </div>
            </div>

            {/* Inner Mockup View */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Breadcrumb & Client Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#22262B]">
                <div>
                  <div className="text-xs font-mono text-[#8492A6] mb-1">
                    Clients / Northstar Renovations
                  </div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-semibold text-[#F0F3F6]">
                      Northstar Renovations
                    </h2>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
                    className="px-3.5 py-1.5 rounded bg-[#161A1D] hover:bg-[#22262B] border border-[#22262B] text-xs font-medium text-[#F0F3F6] transition-colors"
                  >
                    View Full Profile
                  </Link>
                  <Link
                    href="/app/payments"
                    className="px-3.5 py-1.5 rounded bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-medium text-white transition-colors"
                  >
                    Record Payment
                  </Link>
                </div>
              </div>

              {/* Single Unified Summary Area (NOT 5 separate cards) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-5 rounded-lg bg-[#0B0D0F] border border-[#22262B]">
                <div>
                  <div className="text-xs text-[#8492A6] mb-1">Payment Reliability</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold text-[#F0F3F6]">92</span>
                    <span className="text-xs text-[#8492A6]">/ 100</span>
                  </div>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> High Confidence
                  </div>
                </div>

                <div>
                  <div className="text-xs text-[#8492A6] mb-1">Settlement Track</div>
                  <div className="text-xl font-semibold text-[#F0F3F6]">22 of 24</div>
                  <div className="text-xs text-[#8492A6] mt-1">
                    Invoices settled strictly on time
                  </div>
                </div>

                <div>
                  <div className="text-xs text-[#8492A6] mb-1">Average Payment Delay</div>
                  <div className="text-xl font-semibold text-[#F0F3F6]">1.8 days</div>
                  <div className="text-xs text-[#8492A6] mt-1">
                    Industry avg: 14.2 days
                  </div>
                </div>

                <div>
                  <div className="text-xs text-[#8492A6] mb-1">Total Settled Volume</div>
                  <div className="text-xl font-semibold text-[#F0F3F6]">$148,200</div>
                  <div className="text-xs text-[#8492A6] mt-1">
                    $6,400 active outstanding
                  </div>
                </div>
              </div>

              {/* Mini Tabs for preview */}
              <div className="flex items-center gap-6 border-b border-[#22262B] text-xs font-medium text-[#8492A6]">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={`pb-2 transition-colors ${
                    activeTab === "summary"
                      ? "text-[#F0F3F6] border-b-2 border-[#3B82F6]"
                      : "hover:text-[#F0F3F6]"
                  }`}
                >
                  Overview & Intelligence
                </button>
                <button
                  onClick={() => setActiveTab("milestones")}
                  className={`pb-2 transition-colors ${
                    activeTab === "milestones"
                      ? "text-[#F0F3F6] border-b-2 border-[#3B82F6]"
                      : "hover:text-[#F0F3F6]"
                  }`}
                >
                  Recommended Payment Terms
                </button>
                <button
                  onClick={() => setActiveTab("invoices")}
                  className={`pb-2 transition-colors ${
                    activeTab === "invoices"
                      ? "text-[#F0F3F6] border-b-2 border-[#3B82F6]"
                      : "hover:text-[#F0F3F6]"
                  }`}
                >
                  Recent Invoices
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "summary" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-md border border-[#22262B] bg-[#161A1D]/60 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-[#F0F3F6]">
                        ONcue Payment Intelligence Finding
                      </div>
                      <p className="text-xs text-[#8492A6] mt-1 leading-relaxed">
                        Payment behavior has remained consistent over the last 6 months.
                        Most invoices are settled within the agreed Net 15 schedule. Minor
                        delays only occurred on retainage closeouts exceeding $25,000.
                      </p>
                    </div>
                  </div>

                  {/* Clean Table: Recent Payments */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-[#22262B] text-[#8492A6]">
                          <th className="py-2.5 font-medium">Invoice #</th>
                          <th className="py-2.5 font-medium">Project</th>
                          <th className="py-2.5 font-medium">Amount</th>
                          <th className="py-2.5 font-medium">Due Date</th>
                          <th className="py-2.5 font-medium">Delay</th>
                          <th className="py-2.5 font-medium text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#22262B]/50">
                        <tr>
                          <td className="py-3 font-mono text-[#F0F3F6]">INV-2024-041</td>
                          <td className="py-3 text-[#A0AEC0]">Bay Street Office Fit-out</td>
                          <td className="py-3 font-medium text-[#F0F3F6]">$12,400</td>
                          <td className="py-3 text-[#8492A6]">Oct 14, 2024</td>
                          <td className="py-3 text-emerald-400">On time</td>
                          <td className="py-3 text-right">
                            <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Paid
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 font-mono text-[#F0F3F6]">INV-2024-038</td>
                          <td className="py-3 text-[#A0AEC0]">Yorkville Retail Expansion</td>
                          <td className="py-3 font-medium text-[#F0F3F6]">$8,600</td>
                          <td className="py-3 text-[#8492A6]">Sep 28, 2024</td>
                          <td className="py-3 text-[#8492A6]">+2 days</td>
                          <td className="py-3 text-right">
                            <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Paid
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 font-mono text-[#F0F3F6]">INV-2024-049</td>
                          <td className="py-3 text-[#A0AEC0]">King West HVAC Rough-in</td>
                          <td className="py-3 font-medium text-[#F0F3F6]">$6,400</td>
                          <td className="py-3 text-[#8492A6]">Nov 02, 2024</td>
                          <td className="py-3 text-[#8492A6]">—</td>
                          <td className="py-3 text-right">
                            <span className="px-2 py-0.5 rounded text-[11px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              Pending
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "milestones" && (
                <div className="p-4 rounded-md border border-[#22262B] bg-[#0B0D0F] space-y-3 text-xs">
                  <div className="text-sm font-semibold text-[#F0F3F6]">
                    Suggested Contract Terms: Northstar Renovations
                  </div>
                  <p className="text-[#8492A6] leading-relaxed">
                    Based on Northstar's 92/100 reliability score and zero dispute history:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="p-3 rounded border border-[#22262B] bg-[#111417]">
                      <div className="text-[#8492A6]">Deposit Required</div>
                      <div className="text-base font-semibold text-[#F0F3F6] mt-1">20% Upfront</div>
                      <div className="text-[11px] text-[#8492A6] mt-0.5">Locks mobilization costs</div>
                    </div>
                    <div className="p-3 rounded border border-[#22262B] bg-[#111417]">
                      <div className="text-[#8492A6]">Payment Terms</div>
                      <div className="text-base font-semibold text-[#F0F3F6] mt-1">Net 15 Days</div>
                      <div className="text-[11px] text-[#8492A6] mt-0.5">High promptness record</div>
                    </div>
                    <div className="p-3 rounded border border-[#22262B] bg-[#111417]">
                      <div className="text-[#8492A6]">Billing Structure</div>
                      <div className="text-base font-semibold text-[#F0F3F6] mt-1">Milestone Billed</div>
                      <div className="text-[11px] text-[#8492A6] mt-0.5">Tied to inspection sign-offs</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "invoices" && (
                <div className="p-4 rounded-md border border-[#22262B] bg-[#0B0D0F] text-xs text-[#8492A6] text-center py-8">
                  Showing latest 3 of 24 settled invoices. Explore all records in the live dashboard.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#22262B]" />
        </div>

        {/* 4. The Problem */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8492A6] mb-3">
            The Contractor Dilemma
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F0F3F6] mb-6">
            You don't discover a client won't pay until the drywall is up.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[#F0F3F6]">Unilateral Risk</div>
              <p className="text-sm text-[#8492A6] leading-relaxed">
                Contractors finance materials, tools, and labor out of pocket. If a
                client holds back retainage for 90 days, your cash flow suffocates.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[#F0F3F6]">Zero Pre-Work Insight</div>
              <p className="text-sm text-[#8492A6] leading-relaxed">
                Clients check your references, insurance, and past work. You have zero
                tools to check if they actually pay their subcontractors on time.
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-semibold text-[#F0F3F6]">Awkward Collections</div>
              <p className="text-sm text-[#8492A6] leading-relaxed">
                Chasing overdue payments turns you into an unpaid collections agent
                instead of building your business and delivering great craft.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#22262B]" />
        </div>

        {/* 5. How ONcue Works (4 Clear, Disciplined Steps) */}
        <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8492A6] mb-3">
            Operational Workflow
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F0F3F6] mb-12">
            How ONcue protects your cash flow.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="font-mono text-xs text-[#3B82F6]">01</div>
              <h3 className="text-base font-semibold text-[#F0F3F6]">Evaluate Client</h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Look up past payment reliability, average settlement delays, and
                historical dispute rates before submitting your estimate.
              </p>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-xs text-[#3B82F6]">02</div>
              <h3 className="text-base font-semibold text-[#F0F3F6]">Structure Terms</h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Get recommended upfront deposit percentages and Net payment windows
                tailored specifically to the client's risk profile.
              </p>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-xs text-[#3B82F6]">03</div>
              <h3 className="text-base font-semibold text-[#F0F3F6]">Track Milestones</h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Link invoices to tangible work stages. Automatic reminders trigger
                before due dates so payments arrive on schedule.
              </p>
            </div>

            <div className="space-y-3">
              <div className="font-mono text-xs text-[#3B82F6]">04</div>
              <h3 className="text-base font-semibold text-[#F0F3F6]">Record & Build Data</h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Every settled invoice updates client metrics, strengthening your
                ongoing intelligence and negotiating power.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#22262B]" />
        </div>

        {/* 6. Payment Intelligence (Data Table style) */}
        <section id="intelligence" className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8492A6] mb-3">
            Empirical Scoring
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F0F3F6] mb-4">
            Payment Reliability, not arbitrary credit guesses.
          </h2>
          <p className="text-sm text-[#8492A6] max-w-2xl mb-8">
            Commercial credit bureaus look at bank credit cards. ONcue measures
            the single metric that matters to contractors: do they pay their trade
            vendors according to agreed terms?
          </p>

          <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#22262B] bg-[#0E1114] text-[#8492A6]">
                  <th className="py-3 px-4 font-medium">Sample Entity</th>
                  <th className="py-3 px-4 font-medium">Reliability Score</th>
                  <th className="py-3 px-4 font-medium">On-Time Rate</th>
                  <th className="py-3 px-4 font-medium">Average Delay</th>
                  <th className="py-3 px-4 font-medium">Risk Level</th>
                  <th className="py-3 px-4 font-medium">Recommended Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22262B]">
                <tr>
                  <td className="py-3 px-4 font-medium text-[#F0F3F6]">
                    Northstar Renovations
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-[#F0F3F6]">
                    92 / 100
                  </td>
                  <td className="py-3 px-4 text-emerald-400">92% (22/24)</td>
                  <td className="py-3 px-4 text-[#8492A6]">1.8 days</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Low Risk
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#A0AEC0]">Standard Net 15, 20% deposit</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#F0F3F6]">
                    Apex Construction Group
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-[#F0F3F6]">
                    71 / 100
                  </td>
                  <td className="py-3 px-4 text-amber-400">71% (13/18)</td>
                  <td className="py-3 px-4 text-[#8492A6]">6.2 days</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Medium Risk
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#A0AEC0]">Milestone escrow, 35% upfront</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#F0F3F6]">
                    Vanguard Properties
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-[#F0F3F6]">
                    44 / 100
                  </td>
                  <td className="py-3 px-4 text-rose-400">42% (5/12)</td>
                  <td className="py-3 px-4 text-rose-400">18.4 days</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      High Risk
                    </span>
                  </td>
                  <td className="py-3 px-4 text-rose-300">50% deposit, weekly draws only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#22262B]" />
        </div>

        {/* 7. AI Recommendations & Decision Engine */}
        <section id="recommendations" className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8492A6] mb-3">
            Decision Support
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F0F3F6] mb-4">
            Turn payment history into practical terms.
          </h2>
          <p className="text-sm text-[#8492A6] max-w-2xl mb-10">
            ONcue doesn't just display historical charts. It translates data into
            contract-ready terms so you avoid uncomfortable mid-project negotiations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-3">
              <div className="text-xs font-mono text-[#3B82F6]">Deposit Protection</div>
              <h3 className="text-base font-semibold text-[#F0F3F6]">
                Calibrated Upfronts
              </h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Calculates material exposure relative to client track record. If a
                client has a history of slow draws, ONcue recommends raising the
                deposit from 15% to 35% before staging equipment.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-3">
              <div className="text-xs font-mono text-[#3B82F6]">Milestone Gating</div>
              <h3 className="text-base font-semibold text-[#F0F3F6]">
                Phase-Linked Releases
              </h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Break contracts into verifiable progress milestones: rough-in,
                inspection, trim, and sign-off. Work pauses automatically before
                material investments if previous draws remain unpaid.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-3">
              <div className="text-xs font-mono text-[#3B82F6]">Early Warning</div>
              <h3 className="text-base font-semibold text-[#F0F3F6]">
                Trend Shift Detection
              </h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                Receive proactive alerts when an established client begins delaying
                payments to other suppliers or experiencing sudden dispute spikes.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-[#22262B]" />
        </div>

        {/* 8. Final Call to Action */}
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F0F3F6] mb-4">
            Protect your trade business today.
          </h2>
          <p className="text-base text-[#8492A6] max-w-xl mx-auto mb-8 leading-relaxed">
            Gain immediate visibility into client payment histories, manage invoices,
            and operate with financial clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app"
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-colors shadow-sm"
            >
              Open Dashboard
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#161A1D] hover:bg-[#22262B] border border-[#22262B] text-sm font-medium text-[#F0F3F6] transition-colors"
            >
              Talk to Our Team
            </Link>
          </div>
        </section>
      </main>

      {/* 9. Footer */}
      <footer className="border-t border-[#22262B] bg-[#0B0D0F] py-12 text-xs text-[#8492A6]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <OncueBrand size="sm" />
            <span className="text-[11px] text-[#555E6C] mt-1">
              Payment intelligence for contractors & trades.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/" className="hover:text-[#F0F3F6] transition-colors">
              Product
            </Link>
            <Link href="/about" className="hover:text-[#F0F3F6] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#F0F3F6] transition-colors">
              Contact
            </Link>
            <Link href="/app" className="hover:text-[#F0F3F6] transition-colors">
              Dashboard
            </Link>
            <a
              href="mailto:support@oncue.io"
              className="hover:text-[#F0F3F6] transition-colors"
            >
              support@oncue.io
            </a>
          </div>

          <div className="text-[11px] text-[#555E6C]">
            © {new Date().getFullYear()} ONcue Technologies Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

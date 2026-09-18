import Link from "next/link";
import { OncueBrand } from "@/components/brand/oncue-brand";
import { SiteFooter } from "@/components/brand/site-footer";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  TrendingUp,
  Scale,
  Users,
  FileCheck,
  Target,
  Award,
  Sparkles,
  Layers,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "About Us — ONcue Payment Intelligence",
  description:
    "Why ONcue was founded: bringing payment transparency, objective reliability metrics, and cash flow protection to contractors.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#070708] text-[#F4F4F5] flex flex-col selection:bg-[#F95721]/30 selection:text-white">
      {/* 1. Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070708]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <OncueBrand size="md" />
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#A1A1AA]">
            <Link href="/" className="hover:text-[#F4F4F5] transition-colors">
              Product
            </Link>
            <Link
              href="/about"
              className="text-[#F4F4F5] font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#F4F4F5] transition-colors"
            >
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
            <Link
              href="/app"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg copper-cta text-white text-xs sm:text-sm font-medium transition-all shadow-sm"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F4F4F5] leading-[1.15] mb-6 max-w-4xl mx-auto">
            Contractors shouldn't have to guess who pays on time.
          </h1>

          <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto">
            ONcue was built by builders and financial engineers to bring radical
            transparency, objective payment intelligence, and automated contract
            protection to independent contractors.
          </p>
        </section>

        {/* 3. Impact Stats in Silver Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="silver-card rounded-xl p-6">
              <div className="text-xs text-[#A1A1AA] uppercase font-mono tracking-wider">
                Volume Evaluated
              </div>
              <div className="text-3xl font-bold text-[#F4F4F5] font-mono mt-2">
                $148M+
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                Verified trade disbursements
              </div>
            </div>

            <div className="silver-card rounded-xl p-6">
              <div className="text-xs text-[#A1A1AA] uppercase font-mono tracking-wider">
                Delay Reduction
              </div>
              <div className="text-3xl font-bold text-emerald-400 font-mono mt-2">
                -9.4 Days
              </div>
              <div className="text-xs text-emerald-400/90 mt-1">
                Average collection acceleration
              </div>
            </div>

            <div className="silver-card rounded-xl p-6">
              <div className="text-xs text-[#A1A1AA] uppercase font-mono tracking-wider">
                Active Trades
              </div>
              <div className="text-3xl font-bold text-[#F4F4F5] font-mono mt-2">
                2,400+
              </div>
              <div className="text-xs text-[#A1A1AA] mt-1">
                Subcontractors & general trades
              </div>
            </div>

            <div className="silver-card rounded-xl p-6">
              <div className="text-xs text-[#A1A1AA] uppercase font-mono tracking-wider">
                Unpaid Exposure
              </div>
              <div className="text-3xl font-bold text-[#F4F4F5] font-mono mt-2">
                &lt; 0.4%
              </div>
              <div className="text-xs text-[#A1A1AA] mt-1">
                With calibrated milestone terms
              </div>
            </div>
          </div>
        </section>

        {/* 4. The Problem vs. The Solution */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Old Reality */}
            <div className="silver-card rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-400">
                The Industry Problem
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#F4F4F5]">
                Contractors finance the job before receiving a dollar.
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Trade contractors pay upfront for materials, sub-tier labor, and
                permits. When general contractors or commercial developers stretch
                payments out to 60 or 90 days, the trade owner absorbs all the risk.
              </p>
              <ul className="space-y-2.5 text-xs text-[#A1A1AA] pt-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Zero visibility into real client payment turnaround before bidding
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Awkward, unpaid collection follow-ups that burn valuable time
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Arbitrary retainage holdbacks that crush contractor margins
                </li>
              </ul>
            </div>

            {/* The ONcue Solution */}
            <div className="silver-card rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F95721]/10 border border-[#F95721]/20 text-xs font-mono text-[#F95721]">
                The ONcue Solution
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#F4F4F5]">
                Objective intelligence before contract signature.
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                ONcue replaces awkward guessing with empirical settlement metrics,
                calibrated upfront deposit recommendations, and milestone-linked
                draw schedules that keep your cash flow protected.
              </p>
              <ul className="space-y-2.5 text-xs text-[#A1A1AA] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Empirical payment reliability scores (0–100) based on real records
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Suggested upfront deposits (20%–35%) calibrated to client risk
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  Milestone triggers tied to inspection sign-offs, not arbitrary dates
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. Core Operating Principles */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#F4F4F5] mb-2">
              Our Core Principles
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA]">
              Built with discipline to serve the trade professionals who build our world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="silver-card rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#F95721]">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#F4F4F5]">
                Objective Scoring
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Zero arbitrary ratings or subjective reviews. Payment reliability
                is derived purely from invoice timestamps, settlement delays, and
                verified dispute outcomes.
              </p>
            </div>

            <div className="silver-card rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#F4F4F5]">
                Contractor Confidentiality
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Your private job economics, customer lists, and proprietary profit
                margins remain strictly confidential. Network insights are
                anonymized to protect your business.
              </p>
            </div>

            <div className="silver-card rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#F95721]/10 border border-[#F95721]/20 flex items-center justify-center text-[#F95721]">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#F4F4F5]">
                Actionable Terms
              </h3>
              <p className="text-xs text-[#A1A1AA] leading-relaxed">
                Information without action is useless. ONcue calculates contract
                clauses, upfront mobilization deposits, and draw milestones you can
                directly paste into your estimates.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Professional Site Footer */}
      <SiteFooter />
    </div>
  );
}

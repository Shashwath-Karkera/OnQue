import Link from "next/link";
import { OncueBrand } from "@/components/brand/oncue-brand";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  TrendingUp,
  Scale,
  Users,
  FileCheck,
} from "lucide-react";

export const metadata = {
  title: "About Us — ONcue Payment Intelligence",
  description:
    "Why ONcue was founded: bringing payment transparency, objective reliability metrics, and cash flow protection to contractors.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#F0F3F6] flex flex-col selection:bg-blue-600/30 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-[#22262B] bg-[#0B0D0F]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <OncueBrand size="md" />
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#8492A6]">
            <Link href="/" className="hover:text-[#F0F3F6] transition-colors">
              Product
            </Link>
            <Link
              href="/about"
              className="text-[#F0F3F6] font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#F0F3F6] transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/app"
              className="text-sm font-medium text-[#F0F3F6] hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium transition-colors shadow-sm"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22262B] bg-[#111417] text-xs font-mono text-[#8492A6] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
            Mission & Principles
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[#F0F3F6] leading-tight mb-6">
            Leveling the payment playing field for independent contractors.
          </h1>
          <p className="text-lg text-[#8492A6] leading-relaxed max-w-2xl">
            Contractors carry immense upfront risk — labor payroll, materials,
            and permits — before receiving a dollar. ONcue delivers objective
            payment intelligence so trade professionals can make informed
            decisions before breaking ground.
          </p>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px bg-[#22262B]" />
        </div>

        {/* Origin Story */}
        <section className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-sm font-mono uppercase tracking-wider text-[#8492A6]">
            The Problem
          </div>
          <div className="md:col-span-2 space-y-6 text-[#A0AEC0] leading-relaxed">
            <p>
              In North America alone, commercial and residential contractors lose
              tens of billions annually to delayed retainages, unpaid change
              orders, and unexpected client insolvency. Historically, client credit
              checks were either non-existent, prohibitively expensive, or solely
              focused on bank credit lines rather than real vendor payment habits.
            </p>
            <p>
              Clients check contractors' references, licenses, and insurance
              before hiring. But contractors have had zero standardized ways to
              verify whether a client consistently honors Net 15 terms or routinely
              stretches payments out to 90 days.
            </p>
            <p className="text-[#F0F3F6] font-medium">
              ONcue was built to eliminate this asymmetry. We turn real
              contractor-to-client payment histories into objective reliability
              metrics, smart milestone templates, and automated risk detection.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="h-px bg-[#22262B]" />
        </div>

        {/* Core Principles */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-sm font-mono uppercase tracking-wider text-[#8492A6] mb-8">
            Operating Principles
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417]">
              <Scale className="w-5 h-5 text-[#3B82F6] mb-4" />
              <h3 className="text-base font-semibold text-[#F0F3F6] mb-2">
                Objective, Data-First Scoring
              </h3>
              <p className="text-sm text-[#8492A6] leading-relaxed">
                We don't manufacture arbitrary ratings. Payment reliability is
                strictly derived from empirical metrics: on-time settlement rate,
                average delay in days, dispute frequency, and historical milestone
                completion.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417]">
              <ShieldCheck className="w-5 h-5 text-[#10B981] mb-4" />
              <h3 className="text-base font-semibold text-[#F0F3F6] mb-2">
                Preserve Contractor Confidentiality
              </h3>
              <p className="text-sm text-[#8492A6] leading-relaxed">
                Your private job economics, customer lists, and proprietary margins
                remain strictly yours. Aggregate insights protect contractor
                identities while empowering the collective trade community.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417]">
              <FileCheck className="w-5 h-5 text-[#F59E0B] mb-4" />
              <h3 className="text-base font-semibold text-[#F0F3F6] mb-2">
                Actionable Contract Terms
              </h3>
              <p className="text-sm text-[#8492A6] leading-relaxed">
                A risk score is only helpful if you know what to do with it. ONcue
                recommends protective deposit thresholds, Net terms, and milestone
                schedules calibrated to each client's specific track record.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417]">
              <Building2 className="w-5 h-5 text-[#8B5CF6] mb-4" />
              <h3 className="text-base font-semibold text-[#F0F3F6] mb-2">
                Built for High-Stakes Operations
              </h3>
              <p className="text-sm text-[#8492A6] leading-relaxed">
                Designed with the calm precision of modern financial tools. Zero
                fluff, zero neon distractions, and rapid keyboard-friendly
                workflows for busy professionals on job sites or in the back office.
              </p>
            </div>
          </div>
        </section>

        {/* Disclaimer Note */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="p-5 rounded-md border border-[#22262B] bg-[#111417]/50 text-xs text-[#8492A6] leading-relaxed">
            <span className="font-semibold text-[#C0CAD6]">Informational Notice:</span>{" "}
            Payment reliability metrics generated by ONcue are derived from
            user-submitted historical billing records and verified payment
            schedules. ONcue is an operational intelligence tool, not a credit
            reporting bureau. Indicators do not constitute financial guarantees.
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#22262B] bg-[#0B0D0F] py-10 text-xs text-[#8492A6]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <OncueBrand size="sm" />
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-[#F0F3F6] transition-colors">
              Product
            </Link>
            <Link href="/about" className="hover:text-[#F0F3F6] transition-colors">
              About
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#F0F3F6] transition-colors"
            >
              Contact
            </Link>
            <Link href="/app" className="hover:text-[#F0F3F6] transition-colors">
              Dashboard
            </Link>
          </div>
          <div>© {new Date().getFullYear()} ONcue Technologies Inc.</div>
        </div>
      </footer>
    </div>
  );
}

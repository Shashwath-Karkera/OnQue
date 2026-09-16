import Link from "next/link";
import { OncueBrand } from "@/components/brand/oncue-brand";
import { SiteFooter } from "@/components/brand/site-footer";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  Shield,
  Lock,
  EyeOff,
  Database,
  FileCheck,
  UserCheck,
  Server,
  KeyRound,
  Download,
  Trash2,
  Scale,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Building2,
  Layers,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy — ONcue Payment Intelligence",
  description:
    "How ONcue protects contractor confidentiality, secures trade payment records, and ensures zero data commercialization.",
};

const PRIVACY_PILLARS = [
  {
    icon: EyeOff,
    title: "Zero Data Commercialization",
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "from-blue-950/30 to-blue-900/10",
    summary:
      "We never sell, rent, monetize, or broker your contractor financial records, customer rosters, or bidding history to third-party advertisers, data brokers, or credit agencies.",
  },
  {
    icon: Lock,
    title: "Proprietary Economics Isolation",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "from-emerald-950/30 to-emerald-900/10",
    summary:
      "Your labor markups, job profit margins, material costs, and private subcontract agreements remain strictly encrypted and isolated in your private tenant partition.",
  },
  {
    icon: Database,
    title: "Anonymized Network Insights",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    bg: "from-cyan-950/30 to-cyan-900/10",
    summary:
      "Only empirical settlement latency (e.g. 'paid in 18 days vs. Net 15') is aggregated across the network to generate reliability scores without ever disclosing which contractor performed the work.",
  },
  {
    icon: KeyRound,
    title: "Banking-Grade Encryption",
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "from-amber-950/30 to-amber-900/10",
    summary:
      "All invoice data and banking metadata are protected with AES-256 at rest and TLS 1.3 in transit with SOC2 Type II aligned storage infrastructure.",
  },
];

const SECTIONS = [
  {
    id: "information-we-collect",
    number: "01",
    title: "Information We Collect",
    subtitle: "Precise, purpose-bound trade data",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-[#8492A6] leading-relaxed">
        <p>
          ONcue collects only operational data strictly required to deliver
          contractor payment intelligence, milestone tracking, and credit risk
          synthesis:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12]">
            <div className="font-semibold text-[#F0F3F6] mb-1.5 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Contractor Identity</span>
            </div>
            <p className="text-xs text-[#8492A6]">
              Business legal trade name, designated administrator work email,
              business phone number, trade classification (e.g. Electrical,
              Drywall), and billing country.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12]">
            <div className="font-semibold text-[#F0F3F6] mb-1.5 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Invoice & Draw Metadata</span>
            </div>
            <p className="text-xs text-[#8492A6]">
              Invoice identifier, stated due dates, milestone descriptions,
              settlement dates, payment method type (EFT, Interac, Check), and
              payment timing deltas.
            </p>
          </div>
        </div>
        <p className="text-xs text-[#555E6C]">
          We explicitly do NOT scrape your personal device contacts, track your
          GPS coordinates outside of job address verification, or analyze bank
          accounts unrelated to verified invoice payments.
        </p>
      </div>
    ),
  },
  {
    id: "how-we-use-information",
    number: "02",
    title: "How We Use & Compute Intelligence",
    subtitle: "Empirical calculations that empower your business",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-[#8492A6] leading-relaxed">
        <p>
          We use operational billing records strictly for the following
          authorized objectives:
        </p>
        <div className="space-y-2.5">
          <div className="p-3.5 rounded-lg bg-[#0A0D12] border border-white/5 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F0F3F6] block text-xs sm:text-sm">
                Compute Payment Reliability Scoring (0–100)
              </strong>
              <span className="text-xs text-[#8492A6]">
                Analyzing historical settlement velocity against contractual Net
                terms to give contractors advance insight before bidding.
              </span>
            </div>
          </div>
          <div className="p-3.5 rounded-lg bg-[#0A0D12] border border-white/5 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F0F3F6] block text-xs sm:text-sm">
                Calibrate Recommended Contract Terms
              </strong>
              <span className="text-xs text-[#8492A6]">
                Recommending protective upfront deposit percentages (20%–35%)
                and milestone gating to prevent unrecoverable out-of-pocket
                material exposure.
              </span>
            </div>
          </div>
          <div className="p-3.5 rounded-lg bg-[#0A0D12] border border-white/5 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#F0F3F6] block text-xs sm:text-sm">
                Automated Milestone Reminders & Tracking
              </strong>
              <span className="text-xs text-[#8492A6]">
                Triggering professional courtesy notifications to accounts
                payable contacts prior to scheduled draw maturities.
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "data-isolation",
    number: "03",
    title: "Data Anonymization & Trade Secrecy",
    subtitle: "Protecting your competitive edge",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-[#8492A6] leading-relaxed">
        <p>
          Every trade business possesses hard-won customer relationships and
          pricing advantages. We uphold a strict cryptographic separation
          model:
        </p>
        <div className="p-5 rounded-xl border border-blue-500/20 bg-blue-950/20 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#F0F3F6] uppercase font-mono tracking-wider">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>The ONcue Cryptographic Anonymization Protocol</span>
          </div>
          <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed">
            When an invoice settlement is registered, the linkage between your
            specific trade business and the hiring client is severed in our
            network aggregation layer. The scoring engine records solely that an
            unnamed contractor completed an invoice on specific terms. No competing
            subcontractor can ever view your bid amounts, your customer list, or
            your billing margins.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "contractor-rights",
    number: "04",
    title: "Your Rights & Full Data Ownership",
    subtitle: "You own your data at all times",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-[#8492A6] leading-relaxed">
        <p>
          As an independent business entity, you maintain unconditional rights
          over all records stored on ONcue:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12] space-y-2">
            <Download className="w-4 h-4 text-blue-400" />
            <div className="font-semibold text-xs text-[#F0F3F6]">Export Anytime</div>
            <p className="text-[11px] text-[#8492A6]">
              Download complete CSV/JSON audits of your entire client registry,
              invoice history, and receipts in one click.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12] space-y-2">
            <Trash2 className="w-4 h-4 text-rose-400" />
            <div className="font-semibold text-xs text-[#F0F3F6]">Permanent Erasure</div>
            <p className="text-[11px] text-[#8492A6]">
              Request total deletion of your business tenant data. Records are
              purged from operational databases within 30 days.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12] space-y-2">
            <Scale className="w-4 h-4 text-emerald-400" />
            <div className="font-semibold text-xs text-[#F0F3F6]">Dispute Correction</div>
            <p className="text-[11px] text-[#8492A6]">
              If a client record contains verified inaccuracies, our dispute
              desk reviews supporting documentation within 2 business days.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "security-standards",
    number: "05",
    title: "Infrastructure & Security Architecture",
    subtitle: "Built like modern financial rails",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-[#8492A6] leading-relaxed">
        <p>
          We partner with tier-1 enterprise infrastructure providers adhering to
          strict international standards:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="p-3 rounded-lg border border-white/5 bg-[#0A0D12] text-center">
            <div className="text-lg font-bold text-[#F0F3F6] font-mono">AES-256</div>
            <div className="text-[10px] text-[#8492A6] mt-0.5">At-Rest Encryption</div>
          </div>
          <div className="p-3 rounded-lg border border-white/5 bg-[#0A0D12] text-center">
            <div className="text-lg font-bold text-[#F0F3F6] font-mono">TLS 1.3</div>
            <div className="text-[10px] text-[#8492A6] mt-0.5">In-Transit Encryption</div>
          </div>
          <div className="p-3 rounded-lg border border-white/5 bg-[#0A0D12] text-center">
            <div className="text-lg font-bold text-[#F0F3F6] font-mono">2FA</div>
            <div className="text-[10px] text-[#8492A6] mt-0.5">MFA Authentication</div>
          </div>
          <div className="p-3 rounded-lg border border-white/5 bg-[#0A0D12] text-center">
            <div className="text-lg font-bold text-[#F0F3F6] font-mono">SOC 2</div>
            <div className="text-[10px] text-[#8492A6] mt-0.5">Aligned Storage</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "policy-updates",
    number: "06",
    title: "Governance & Contact Channels",
    subtitle: "Open accountability with our Privacy Officer",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-[#8492A6] leading-relaxed">
        <p>
          This policy is reviewed quarterly to reflect technological
          improvements and evolving privacy regulations (including PIPEDA in
          Canada and relevant state/provincial guidelines).
        </p>
        <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-semibold text-xs text-[#F0F3F6]">
              Designated Data Protection Desk
            </div>
            <div className="text-xs text-[#8492A6] mt-0.5">
              Email: <span className="font-mono text-blue-400">privacy@oncue.io</span>
              <br />
              Address: Bay Street Financial District, Toronto, ON M5J 2T3, Canada
            </div>
          </div>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors shrink-0 text-center"
          >
            Contact Privacy Officer
          </Link>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#F0F3F6] flex flex-col selection:bg-blue-600/30 selection:text-white">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-[#22262B] bg-[#0B0D0F]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <OncueBrand size="md" />
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#8492A6]">
            <Link href="/" className="hover:text-[#F0F3F6] transition-colors">
              Product
            </Link>
            <Link href="/about" className="hover:text-[#F0F3F6] transition-colors">
              About
            </Link>
            <Link
              href="/privacy"
              className="text-[#F0F3F6] font-medium transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#F0F3F6] transition-colors">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-[#F0F3F6] transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/app"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-xs sm:text-sm font-medium transition-all shadow-[0_4px_16px_rgba(37,99,235,0.3)]"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">


          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F0F3F6] leading-[1.15] mb-6 max-w-4xl mx-auto">
            Your private trade economics belong to you
          </h1>

          <p className="text-base sm:text-lg text-[#8492A6] leading-relaxed max-w-2xl mx-auto">
            ONcue was architected with a fundamental principle: empower
            contractors with collective payment intelligence without ever
            compromising individual pricing secrecy or client relationships.
          </p>
        </section>

        {/* 3. The 4 Privacy Pillars in Elevated Glass Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRIVACY_PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className={`rounded-xl border ${pillar.border} bg-gradient-to-b ${pillar.bg} p-6 shadow-xl backdrop-blur-md space-y-3 flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${pillar.color}`} />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-[#F0F3F6] leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#8492A6] leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1 text-[11px] font-mono text-[#555E6C]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Guaranteed in Code</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Detailed Policy Sections */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#22262B]">
            <h2 className="text-lg font-semibold text-[#F0F3F6] uppercase font-mono tracking-wider">
              Complete Policy Specification
            </h2>
            <span className="text-xs font-mono text-[#8492A6]">
              6 Core Articles
            </span>
          </div>

          <div className="space-y-6">
            {SECTIONS.map((sec) => (
              <div
                key={sec.id}
                id={sec.id}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5"
              >
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/5">
                  <div>
                    <div className="text-xs font-mono font-bold text-blue-400 mb-1">
                      ARTICLE {sec.number}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#F0F3F6]">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-[#8492A6] mt-0.5">
                      {sec.subtitle}
                    </p>
                  </div>
                </div>

                <div>{sec.content}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 5. Professional Site Footer */}
      <SiteFooter />
    </div>
  );
}

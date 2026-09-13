import Link from "next/link";
import { OncueBrand } from "@/components/brand/oncue-brand";
import { SiteFooter } from "@/components/brand/site-footer";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import {
  Scale,
  FileCheck,
  ShieldAlert,
  CreditCard,
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  HelpCircle,
  Building2,
  FileText,
} from "lucide-react";

export const metadata = {
  title: "Terms of Service — ONcue Payment Intelligence",
  description:
    "Terms of Service governing the use of ONcue contractor payment intelligence, credit risk evaluation, and milestone management tools.",
};

const TERMS_HIGHLIGHTS = [
  {
    icon: Scale,
    title: "Contractor Autonomy",
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "from-blue-950/30 to-blue-900/10",
    summary:
      "You retain 100% legal ownership of your business records and complete autonomy over your contract terms, client relationships, and bidding prices.",
  },
  {
    icon: ShieldAlert,
    title: "Informational Decision Support",
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "from-amber-950/30 to-amber-900/10",
    summary:
      "Payment reliability indicators and AI suggestions are advisory tools derived from empirical billing history. They do not constitute financial guarantees or credit bureau scores.",
  },
  {
    icon: FileCheck,
    title: "Data Authenticity Covenant",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "from-emerald-950/30 to-emerald-900/10",
    summary:
      "Contractors agree to submit authentic, verifiable billing records. Fabricated dispute claims or fraudulent records are strictly prohibited to preserve network integrity.",
  },
  {
    icon: Lock,
    title: "Fair Use & IP Protection",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    bg: "from-cyan-950/30 to-cyan-900/10",
    summary:
      "ONcue proprietary algorithms, risk formulas, and software interfaces are protected intellectual property. Reverse-engineering or unauthorized scraping is forbidden.",
  },
];

const ARTICLES = [
  {
    number: "01",
    id: "acceptance-and-scope",
    title: "Acceptance of Terms & Scope of Service",
    subtitle: "Mutual agreement between contractor entity and ONcue",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-[#8492A6] leading-relaxed">
        <p>
          By creating an ONcue account, accessing the dashboard, or utilizing our
          API endpoints, you enter into a legally binding agreement with{" "}
          <strong className="text-[#F0F3F6]">ONcue Technologies Inc.</strong> on
          behalf of yourself and the business entity you represent.
        </p>
        <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12]">
          <h4 className="text-xs font-semibold text-[#F0F3F6] mb-1">
            Scope of Service
          </h4>
          <p className="text-xs text-[#8492A6]">
            ONcue provides cloud-based software tools for trade contractors,
            subcontractors, and construction enterprises. Services include
            pre-contract client payment reliability analysis, milestone billing
            tracking, automated payment reminders, and contract deposit
            recommendations.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    id: "nature-of-intelligence",
    title: "Nature of Payment Intelligence & Disclaimers",
    subtitle: "Critical operational clarity on reliability metrics",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-[#8492A6] leading-relaxed">
        <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-950/15 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase font-mono tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Important Legal Clarification</span>
          </div>
          <p className="text-xs sm:text-sm text-[#F0F3F6] leading-relaxed">
            ONcue is NOT a consumer credit reporting agency under the Fair Credit
            Reporting Act (FCRA) or provincial equivalents. Payment reliability
            scores (0–100) and risk indicators represent statistical evaluations
            derived from user-recorded billing events and payment timelines.
          </p>
        </div>
        <p>
          ONcue does NOT guarantee that any prospective client will pay according
          to terms, nor does it guarantee against client insolvency, trade
          disputes, or mechanical liens. All final contract terms, credit
          extensions, and mobilization decisions remain solely the commercial
          responsibility of the contractor.
        </p>
      </div>
    ),
  },
  {
    number: "03",
    id: "user-accounts-and-security",
    title: "Account Security & Authorized Trade Representatives",
    subtitle: "Safeguarding your enterprise credentials",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-[#8492A6] leading-relaxed">
        <p>
          You are responsible for maintaining the confidentiality of your
          credentials and for all activities conducted under your organization’s
          account:
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              You must provide accurate legal business identification, including
              trade registration and valid corporate contact info.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              Multi-factor authentication (MFA) must be maintained for accounts
              executing payment tracking and ledger modifications.
            </span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              You must notify ONcue immediately at{" "}
              <span className="text-[#F0F3F6] font-mono">security@oncue.io</span> of
              any unauthorized account breach.
            </span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    number: "04",
    id: "billing-and-subscriptions",
    title: "Subscriptions, Fees & Cancellation",
    subtitle: "Transparent, honest contractor pricing",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-[#8492A6] leading-relaxed">
        <p>
          ONcue services are billed on a monthly or annual subscription schedule
          as selected during plan checkout:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12]">
            <div className="font-semibold text-xs text-[#F0F3F6] mb-1">
              No Hidden Fees or Lock-ins
            </div>
            <p className="text-xs text-[#8492A6]">
              All subscription rates are clearly quoted in local currency (CAD or
              USD). There are zero per-invoice settlement percentages or surprise
              contract break fees.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12]">
            <div className="font-semibold text-xs text-[#F0F3F6] mb-1">
              30-Day Export & Cancellation
            </div>
            <p className="text-xs text-[#8492A6]">
              Cancel anytime through your account settings. You retain full access
              through the end of your billing cycle and can export all records.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "05",
    id: "limitation-of-liability",
    title: "Limitation of Liability & Indemnification",
    subtitle: "Industry standard liability boundaries",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-[#8492A6] leading-relaxed">
        <p>
          To the maximum extent permitted by applicable law, in no event shall
          ONcue Technologies Inc., its founders, employees, or infrastructure
          partners be liable for any indirect, punitive, incidental, special,
          consequential, or exemplary damages, including lost profits, loss of
          goodwill, or project delays arising from your use of the platform.
        </p>
        <p>
          ONcue’s aggregate cumulative liability for any claims arising from the
          service shall not exceed the total fees paid by you to ONcue during the
          twelve (12) months preceding the incident.
        </p>
      </div>
    ),
  },
  {
    number: "06",
    id: "governing-law",
    title: "Governing Law & Dispute Resolution",
    subtitle: "Jurisdiction & legal authority",
    content: (
      <div className="space-y-4 text-xs sm:text-sm text-[#8492A6] leading-relaxed">
        <p>
          These Terms are governed by and construed in accordance with the laws
          of the Province of Ontario and the federal laws of Canada applicable
          therein, without regard to conflict of law principles.
        </p>
        <div className="p-4 rounded-xl border border-white/10 bg-[#0A0D12]">
          <div className="text-xs font-semibold text-[#F0F3F6]">
            Legal Service & Corporate Entity
          </div>
          <div className="text-xs text-[#8492A6] mt-1">
            ONcue Technologies Inc.
            <br />
            Attention: Legal Department
            <br />
            Bay Street Financial District, Toronto, ON M5J 2T3, Canada
            <br />
            Email: <span className="text-blue-400 font-mono">legal@oncue.io</span>
          </div>
        </div>
      </div>
    ),
  },
];

export default function TermsOfServicePage() {
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
            <Link href="/privacy" className="hover:text-[#F0F3F6] transition-colors">
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[#F0F3F6] font-medium transition-colors"
            >
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-[#161B22] text-xs font-mono text-[#8492A6] mb-6 shadow-sm">
            <Scale className="w-3.5 h-3.5 text-blue-400" />
            <span>Contractor Master Agreement · Effective September 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#F0F3F6] leading-[1.15] mb-6 max-w-4xl mx-auto">
            Clear, honest terms for professional trades.
          </h1>

          <p className="text-base sm:text-lg text-[#8492A6] leading-relaxed max-w-2xl mx-auto">
            We believe commercial terms should be written in plain language with
            zero hidden clauses. Here is exactly how we operate and how we protect
            your contractor rights.
          </p>
        </section>

        {/* 3. The 4 Key Covenants in Elevated Glass Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TERMS_HIGHLIGHTS.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`rounded-xl border ${item.border} bg-gradient-to-b ${item.bg} p-6 shadow-xl backdrop-blur-md space-y-3 flex flex-col justify-between`}
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-[#F0F3F6] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#8492A6] leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1 text-[11px] font-mono text-[#555E6C]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Contractor Covenant</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. Complete Articles */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#22262B]">
            <h2 className="text-lg font-semibold text-[#F0F3F6] uppercase font-mono tracking-wider">
              Complete Terms Specification
            </h2>
            <span className="text-xs font-mono text-[#8492A6]">
              6 Core Articles
            </span>
          </div>

          <div className="space-y-6">
            {ARTICLES.map((article) => (
              <div
                key={article.id}
                id={article.id}
                className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5"
              >
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/5">
                  <div>
                    <div className="text-xs font-mono font-bold text-blue-400 mb-1">
                      ARTICLE {article.number}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#F0F3F6]">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#8492A6] mt-0.5">
                      {article.subtitle}
                    </p>
                  </div>
                </div>

                <div>{article.content}</div>
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

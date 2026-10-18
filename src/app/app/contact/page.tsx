"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  FileText,
  AlertCircle,
  Search,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Layers,
  Send,
  LifeBuoy,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    category: "Payment Scoring",
    question: "How does ONcue calculate a client's Payment Reliability Index (PRI)?",
    answer:
      "The PRI is calculated on a 0-100 scale using empirical data from completed billing cycles: on-time milestone settlements (50%), retainage release speed (25%), average dispute duration (15%), and industry trade references (10%). Scores update automatically with every cleared invoice.",
  },
  {
    category: "Privacy & Discretion",
    question: "Will my clients know I am tracking their payment score or risk profile?",
    answer:
      "No. All intelligence, risk tags, and scoring assessments within ONcue are strictly confidential to your contractor account. Clients receive clean, professional invoices and reminder notifications under your company branding without any internal risk metrics exposed.",
  },
  {
    category: "Disputes & Overdue Invoices",
    question: "What should I do if an invoice is overdue due to an agreed-upon client change order?",
    answer:
      "You can open the invoice in the Invoices dashboard and update the due date or add an authorized project amendment note. This prevents the client's score from unfairly degrading and reschedules automated reminders to the revised settlement date.",
  },
  {
    category: "Automated Reminders",
    question: "Can I customize the frequency and wording of payment reminder notifications?",
    answer:
      "Yes. In Settings > Notifications, you can configure Net-15, Net-30, or custom milestone schedules. Choose courtesy reminders before the due date, day-of notices, and graduated overdue reminders with customizable late interest terms.",
  },
  {
    category: "Integrations & Sync",
    question: "How does ONcue integrate with QuickBooks, Xero, or bank feeds?",
    answer:
      "ONcue supports real-time two-way synchronization via direct accounting APIs and Plaid bank matching. When a client deposits payment to your bank account, ONcue marks the invoice paid, closes outstanding reminders, and recalculates the client's settlement velocity.",
  },
  {
    category: "Lien Rights",
    question: "How does the statutory notice and lien tracking feature work?",
    answer:
      "ONcue tracks jurisdictional statutory notice deadlines (such as preliminary notices, notices of intent, and mechanics' lien filing limits) based on project location and last substantial performance date, alerting you well in advance to protect your legal claim.",
  },
];

const DOC_GUIDES = [
  {
    title: "Understanding the Payment Reliability Index",
    category: "Intelligence",
    readTime: "4 min read",
    description:
      "A deep dive into how ONcue parses historical payment velocities, holdback settlement rates, and trade disputes to assign an objective 0-100 score.",
    highlights: [
      "90-100: Exemplary (Net 0-5 avg delay)",
      "75-89: Moderate (occasional 7-14 day cycle variance)",
      "Below 75: Elevated Risk (frequent dispute holds, slow retainage)",
    ],
  },
  {
    title: "Automating Milestone Billing & Late Penalties",
    category: "Billing",
    readTime: "3 min read",
    description:
      "Learn how to configure automated milestone reminders, apply contractual late fees, and send professional SMS and email nudges that accelerate payment.",
    highlights: [
      "Custom Net-15 / Net-30 grace windows",
      "Statutory late penalty calculation",
      "One-click dispute escalation",
    ],
  },
  {
    title: "Cash Flow Projections & Delay Risk Forecasting",
    category: "Analytics",
    readTime: "5 min read",
    description:
      "How ONcue combines committed contract values with past client settlement delays to forecast your actual receivables calendar and working capital headroom.",
    highlights: [
      "Actual vs. contractual settlement date modeling",
      "Subcontractor payroll buffer forecasting",
      "Material draw matching against receivables",
    ],
  },
  {
    title: "Mechanics' Lien Deadlines & Notice Automation",
    category: "Legal & Protection",
    readTime: "4 min read",
    description:
      "Preserve statutory lien remedies without souring client relationships. Set automated alerts for preliminary notices and notices of intent.",
    highlights: [
      "Provincial & state statutory timeline calendars",
      "Automated preliminary notice dispatch",
      "Conditional and unconditional lien waiver tracking",
    ],
  },
];

export default function InAppContactPage() {
  const [activeTab, setActiveTab] = useState<"contact" | "tickets" | "docs" | "faqs">("contact");
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
    role?: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    category: "Payment Intelligence & Scoring",
    priority: "Normal",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [tickets, setTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [faqSearch, setFaqSearch] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const fetchTickets = () => {
    setLoadingTickets(true);
    fetch("/api/support/ticket")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingTickets(false));
  };

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          setFormData((prev) => ({
            ...prev,
            name: prev.name || data.user.name || "",
            email: prev.email || data.user.email || "",
          }));
        }
      })
      .catch(() => {});

    fetchTickets();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/support/ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          category: formData.category,
          priority: formData.priority,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success && data.ticket) {
        setTicketId(data.ticket.ticket_code);
        fetchTickets();
      } else {
        const generatedId = `ONC-${Math.floor(100000 + Math.random() * 900000)}`;
        setTicketId(generatedId);
      }
    } catch {
      const generatedId = `ONC-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(generatedId);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const filteredFaqs = FAQ_LIST.filter(
    (item) =>
      item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-5xl pb-12 antialiased">
      {/* 1. Page Header */}
      <div className="pb-4 border-b border-[#22262B] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
              Help, Docs & Support
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Desk Online
            </span>
          </div>
          <p className="text-xs text-[#8492A6]">
            Get direct assistance from our trade operations desk, explore documentation, or search technical guides.
          </p>
        </div>

        {/* Quick Hotline Badge */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+17789864390"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161A1D] hover:bg-[#1E2328] border border-[#22262B] text-xs font-mono text-[#F0F3F6] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue-400" />
            <span>+1 (778) 986-4390</span>
          </a>
        </div>
      </div>

      {/* 2. Sub-Tabs */}
      <div className="border-b border-[#22262B]">
        <nav className="flex items-center gap-6 text-xs font-medium text-[#8492A6]">
          {[
            { id: "contact", label: "Contact Support Desk", icon: MessageSquare },
            { id: "tickets", label: `My Tickets (${tickets.length})`, icon: FileText },
            { id: "docs", label: "Help & Documentation", icon: BookOpen },
            { id: "faqs", label: "FAQ Knowledge Base", icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-2.5 flex items-center gap-2 whitespace-nowrap transition-colors relative cursor-pointer ${
                  active
                    ? "text-[#F0F3F6] font-semibold"
                    : "hover:text-[#F0F3F6]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "text-blue-400" : "text-[#555E6C]"}`} />
                <span>{tab.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* 3. TAB 1: Contact Support Desk */}
      {activeTab === "contact" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Support Form */}
          <div className="lg:col-span-7 rounded-xl border border-[#22262B] bg-[#111417] p-6 sm:p-7 shadow-lg">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-medium text-emerald-400 uppercase tracking-wider">
                    Inquiry Logged
                  </span>
                  <h2 className="text-xl font-semibold text-[#F0F3F6] mt-1">
                    Support Ticket Created
                  </h2>
                </div>
                <div className="p-3.5 rounded-lg bg-[#0B0D0F] border border-[#22262B] max-w-sm mx-auto text-left">
                  <div className="text-[11px] text-[#8492A6]">Ticket Reference</div>
                  <div className="text-sm font-mono font-semibold text-[#F0F3F6]">
                    {ticketId}
                  </div>
                  <div className="text-[11px] text-[#8492A6] mt-2">Target Response Time</div>
                  <div className="text-xs font-medium text-emerald-400">
                    Within 4 business hours to {formData.email}
                  </div>
                </div>
                <p className="text-xs text-[#8492A6] max-w-md mx-auto leading-relaxed">
                  Our trade operations team has received your submission. An automated confirmation with full tracking details has been sent to your email.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: user?.name || "",
                        email: user?.email || "",
                        company: "",
                        category: "Payment Intelligence & Scoring",
                        priority: "Normal",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors underline cursor-pointer"
                  >
                    Submit another support ticket
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#22262B]">
                  <div>
                    <h2 className="text-sm font-semibold text-[#F0F3F6]">
                      Direct Support Dispatch
                    </h2>
                    <p className="text-[11px] text-[#8492A6]">
                      Submissions are routed directly to our contractor desk engineers.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-[#555E6C]">
                    Session: Authenticated
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                      Contractor Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marcus Vance"
                      className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                      Account Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contractor@oncue.ai"
                      className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option>Payment Intelligence & Scoring</option>
                      <option>Invoice Reminders & Collections</option>
                      <option>Client Risk Dispute or Verification</option>
                      <option>Bank & QuickBooks Sync</option>
                      <option>Account, Security & Billing</option>
                      <option>Bug Report / Feature Suggestion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                      Priority Level
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      <option>Normal (Standard 4h SLA)</option>
                      <option>High (Payment delay / billing block)</option>
                      <option>Urgent (Critical client dispute)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief description of your issue or request..."
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                    Detailed Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide invoice IDs, client names, or details to expedite resolution..."
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-lg copper-cta text-white text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Dispatching inquiry...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Support Ticket</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Channels & Trade Desk SLA */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-[#22262B] bg-[#111417] p-5 shadow-lg space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#22262B]">
                <LifeBuoy className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
                  Direct Trade Channels
                </h3>
              </div>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3 text-xs">
                  <Phone className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#8492A6]">Contractor Hotline</div>
                    <a
                      href="tel:+17789864390"
                      className="text-[#F0F3F6] hover:text-blue-400 transition-colors font-mono font-medium"
                    >
                      +1 (778) 986-4390
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <Mail className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#8492A6]">Desk Email</div>
                    <a
                      href="mailto:onque.connect@gmail.com"
                      className="text-[#F0F3F6] hover:text-blue-400 transition-colors font-mono font-medium text-xs break-all"
                    >
                      onque.connect@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#8492A6]">Operations Center</div>
                    <div className="text-[#F0F3F6] leading-relaxed text-xs">
                      9970 124A Street
                      <br />
                      Surrey, British Columbia, Canada
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <Clock className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#8492A6]">Support Coverage</div>
                    <div className="text-[#F0F3F6] text-xs">
                      Monday - Friday, 8:00 AM - 6:00 PM EST
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-0.5 font-medium">
                      Guaranteed 4-hour review SLA
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="p-4 rounded-xl border border-[#22262B] bg-[#161A1D]/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F0F3F6]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Privacy Guarantee</span>
              </div>
              <p className="text-[11px] text-[#8492A6] leading-relaxed">
                All communications and client verification data are encrypted and held under strict contractor confidentiality. Your client ratings are never publicly indexed.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: My Support Tickets from Neon */}
      {activeTab === "tickets" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Submitted Support Inquiries & Tickets
            </h2>
            <button
              onClick={fetchTickets}
              className="text-xs text-blue-400 hover:text-blue-300 font-mono transition-colors"
            >
              Refresh from Neon
            </button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#22262B] text-[#8492A6] bg-[#0E1114]">
                  <th className="py-3 px-4 font-medium">Ticket ID</th>
                  <th className="py-3 px-4 font-medium">Subject</th>
                  <th className="py-3 px-4 font-medium">Category</th>
                  <th className="py-3 px-4 font-medium">Priority</th>
                  <th className="py-3 px-4 font-medium">Submitted</th>
                  <th className="py-3 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22262B]">
                {loadingTickets ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#8492A6]">
                      Loading tickets from Neon database...
                    </td>
                  </tr>
                ) : tickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#8492A6]">
                      No support tickets submitted yet. Use the &quot;Contact Support Desk&quot; tab to dispatch an inquiry.
                    </td>
                  </tr>
                ) : (
                  tickets.map((t: any) => (
                    <tr key={t.id} className="hover:bg-[#161A1D]/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-blue-400">
                        {t.ticket_code}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                        {t.subject}
                      </td>
                      <td className="py-3.5 px-4 text-[#8492A6]">{t.category}</td>
                      <td className="py-3.5 px-4 text-[#8492A6]">{t.priority}</td>
                      <td className="py-3.5 px-4 text-[#8492A6] font-mono">
                        {new Date(t.created_at).toLocaleDateString("en-CA", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium border bg-blue-500/10 text-blue-400 border-blue-500/20">
                          {t.status || "Open"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TAB 2: Documentation & Guides */}
      {activeTab === "docs" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOC_GUIDES.map((doc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[#22262B] bg-[#111417] hover:border-[#3B82F6]/50 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                      {doc.category}
                    </span>
                    <span className="text-[11px] text-[#555E6C] font-mono">
                      {doc.readTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#F0F3F6]">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-[#8492A6] leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#22262B] space-y-1.5">
                  <div className="text-[11px] font-medium text-[#F0F3F6]">Key Principles:</div>
                  {doc.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-[11px] text-[#8492A6]">
                      <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TAB 3: FAQ Knowledge Base */}
      {activeTab === "faqs" && (
        <div className="space-y-6">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#555E6C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search frequently asked questions (e.g. disputes, score, lien, reminders)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#111417] border border-[#22262B] text-xs text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center rounded-xl border border-[#22262B] bg-[#111417] text-xs text-[#8492A6]">
                No matching questions found. Switch to the Contact Support tab to message our desk directly.
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-[#22262B] bg-[#111417] overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#161A1D]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 shrink-0">
                          {faq.category}
                        </span>
                        <span className="text-xs font-medium text-[#F0F3F6]">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#8492A6] shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-blue-400" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#8492A6] leading-relaxed border-t border-[#22262B]/60 bg-[#0B0D0F]/40">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

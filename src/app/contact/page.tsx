"use client";

import { useState } from "react";
import Link from "next/link";
import { OncueBrand } from "@/components/brand/oncue-brand";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    tradeType: "General Contractor",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

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
            <Link href="/about" className="hover:text-[#F0F3F6] transition-colors">
              About
            </Link>
            <Link
              href="/contact"
              className="text-[#F0F3F6] font-medium transition-colors"
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

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-16">
        <div className="max-w-xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#22262B] bg-[#111417] text-xs font-mono text-[#8492A6] mb-4">
            Direct Contractor Support
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F0F3F6] mb-3">
            Get in touch with the ONcue team.
          </h1>
          <p className="text-base text-[#8492A6] leading-relaxed">
            Have questions about payment intelligence, enterprise billing data
            sync, or client evaluation? We respond within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-[#111417] border border-[#22262B] rounded-lg p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mx-auto border border-[#10B981]/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-[#F0F3F6]">
                  Message Received
                </h2>
                <p className="text-sm text-[#8492A6] max-w-md mx-auto">
                  Thank you for reaching out. A senior member of our team will review
                  your inquiry and respond to <span className="text-[#F0F3F6]">{formData.email}</span> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        tradeType: "General Contractor",
                        message: "",
                      });
                    }}
                    className="text-xs text-[#3B82F6] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Vance"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-md bg-[#0B0D0F] border border-[#22262B] text-sm text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="marcus@vancecontracting.ca"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-md bg-[#0B0D0F] border border-[#22262B] text-sm text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                      Company / Trade Entity
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vance Electrical Services"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-md bg-[#0B0D0F] border border-[#22262B] text-sm text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                      Primary Trade Type
                    </label>
                    <select
                      value={formData.tradeType}
                      onChange={(e) =>
                        setFormData({ ...formData, tradeType: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-md bg-[#0B0D0F] border border-[#22262B] text-sm text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6] transition-colors"
                    >
                      <option>General Contractor</option>
                      <option>Electrical / Plumbing / HVAC</option>
                      <option>Framing & Drywall</option>
                      <option>Roofing & Masonry</option>
                      <option>Commercial Subcontractor</option>
                      <option>Other Trade Specialist</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                    How can we help? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your team's volume, invoicing challenges, or specific client verification requirements..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-md bg-[#0B0D0F] border border-[#22262B] text-sm text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-[#3B82F6] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Submitting inquiry...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & SLA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-5">
              <h3 className="text-sm font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
                Direct Channels
              </h3>

              <div className="flex items-start gap-3.5 text-sm">
                <Mail className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-[#8492A6]">Inquiries & Support</div>
                  <a
                    href="mailto:support@oncue.io"
                    className="text-[#F0F3F6] hover:text-[#3B82F6] transition-colors font-mono"
                  >
                    support@oncue.io
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm">
                <Phone className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-[#8492A6]">Contractor Desk</div>
                  <div className="text-[#F0F3F6] font-mono">+1 (888) 492-ONCUE</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm">
                <MapPin className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-[#8492A6]">Headquarters</div>
                  <div className="text-[#F0F3F6]">
                    Bay Street Financial District
                    <br />
                    Toronto, ON M5J 2T3, Canada
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm">
                <Clock className="w-4 h-4 text-[#3B82F6] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-[#8492A6]">Response Target</div>
                  <div className="text-[#F0F3F6]">
                    Monday – Friday, 8:00 AM – 6:00 PM EST
                    <div className="text-xs text-[#8492A6] mt-0.5">
                      Submissions reviewed within 4 business hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417]/50 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#F0F3F6]">
                <Shield className="w-4 h-4 text-[#10B981]" />
                Zero Commercial Spam Guarantee
              </div>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                We respect trade business owners. We will never sell your email or
                bombard your inbox with sales automation. Your information is used
                solely to answer your direct inquiry.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#22262B] bg-[#0B0D0F] py-10 text-xs text-[#8492A6] mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <OncueBrand size="sm" />
          <div className="flex items-center gap-6">
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
          </div>
          <div>© {new Date().getFullYear()} ONcue Technologies Inc.</div>
        </div>
      </footer>
    </div>
  );
}

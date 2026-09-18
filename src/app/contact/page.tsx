"use client";

import { useState } from "react";
import Link from "next/link";
import { OncueBrand } from "@/components/brand/oncue-brand";
import { SiteFooter } from "@/components/brand/site-footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  MessageSquare,
  Sparkles,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-[#F4F4F5] flex flex-col selection:bg-[#F95721]/30 selection:text-white">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070708]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <OncueBrand size="md" />
          <nav className="hidden md:flex items-center gap-8 text-sm text-[#A1A1AA]">
            <Link href="/" className="hover:text-[#F4F4F5] transition-colors">
              Product
            </Link>
            <Link href="/about" className="hover:text-[#F4F4F5] transition-colors">
              About
            </Link>
            <Link
              href="/contact"
              className="text-[#F4F4F5] font-medium transition-colors"
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
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F0F3F6] mb-4 leading-tight">
            Get in touch with ONcue
          </h1>
          <p className="text-sm sm:text-base text-[#8492A6] leading-relaxed">
            Have questions regarding payment intelligence scoring, custom trade
            agreements, or integrating billing data? Speak directly with our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form Card */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-6 sm:p-8 shadow-xl backdrop-blur-md">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_24px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-[#F0F3F6]">
                  Inquiry Dispatched Successfully
                </h2>
                <p className="text-xs sm:text-sm text-[#8492A6] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. A senior member of our trade operations desk will review your details and respond to <span className="text-[#F0F3F6] font-medium">{formData.email}</span> within 4 business hours.
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
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors underline"
                  >
                    Submit another inquiry
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-xs text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-blue-500 transition-colors"
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-xs text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                      Company Entity
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vance Electrical Services"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-xs text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-blue-500 transition-colors"
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-xs text-[#F0F3F6] focus:outline-none focus:border-blue-500 transition-colors"
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
                    placeholder="Tell us about your volume, invoicing challenges, or specific client verification requirements..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0B0D0F] border border-white/10 text-xs text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 text-white text-xs sm:text-sm font-medium transition-all shadow-[0_4px_16px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
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

          {/* Right Cards: Contact Channels & Desk SLA */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-6 shadow-xl backdrop-blur-md space-y-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
                  Direct Trade Channels
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 text-xs">
                  <Mail className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#8492A6]">Inquiries & Accounts</div>
                    <a
                      href="mailto:onque.connect@gmail.com"
                      className="text-[#F0F3F6] hover:text-blue-400 transition-colors font-mono font-medium text-xs"
                    >
                      onque.connect@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-xs">
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

                <div className="flex items-start gap-3.5 text-xs">
                  <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#8492A6]">Operations Center</div>
                    <div className="text-[#F0F3F6] leading-relaxed">
                      9970 124A Street
                      <br />
                      Surrey, British Columbia, Canada
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 text-xs">
                  <Clock className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-[11px] text-[#8492A6]">Support Hours</div>
                    <div className="text-[#F0F3F6]">
                      Monday – Friday, 8:00 AM – 6:00 PM EST
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">
                      Submissions reviewed within 4 business hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Professional Site Footer */}
      <SiteFooter />
    </div>
  );
}

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export function LandingCtaAndFooter() {
  return (
    <>
      {/* FINAL CTA SECTION */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white via-amber-50/20 to-slate-50 border-t border-slate-200/80 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-200/20 blur-[130px] rounded-full pointer-events-none -z-0" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono uppercase tracking-wider mb-6">
            Immediate Contractor Deployment
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] mb-6">
            Spend less time chasing.{" "}
            <span className="block text-slate-800">
              Spend more time <span className="text-amber-600">building.</span>
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto mb-10">
            Use payment intelligence to understand your clients, secure your cash flow, and make smarter decisions before your next project begins.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-6">
            <Link href="/app" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-8 h-12 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm"
              >
                <span>Get Started with ONcue</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/app" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-slate-300 bg-white hover:bg-slate-50 text-slate-800 h-12 rounded-xl px-7 text-sm shadow-sm"
              >
                Explore the Platform
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Canadian Trade Verified
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/90 bg-white pt-16 pb-12 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-100">
            {/* Brand column */}
            <div className="col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12.5L8.5 17L20 5.5"
                      stroke="#F59E0B"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  ON<span className="text-amber-600">cue</span>
                </span>
              </Link>

              <p className="text-slate-500 max-w-sm leading-relaxed text-xs">
                Payment intelligence and risk forecasting for commercial contractors and sub-trades across Canada.
              </p>

              <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-slate-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>All systems operational • Canadian Network</span>
              </div>
            </div>

            {/* Product column */}
            <div className="space-y-3">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] font-mono">
                Product
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/app/clients" className="hover:text-amber-600 transition-colors">
                    Client Intelligence
                  </Link>
                </li>
                <li>
                  <Link href="/app/invoices" className="hover:text-amber-600 transition-colors">
                    Payment Tracking
                  </Link>
                </li>
                <li>
                  <Link href="/app/insights" className="hover:text-amber-600 transition-colors">
                    AI Insights
                  </Link>
                </li>
                <li>
                  <Link href="/app/projects" className="hover:text-amber-600 transition-colors">
                    Payment Plans
                  </Link>
                </li>
                <li>
                  <Link href="/app/analytics" className="hover:text-amber-600 transition-colors">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company column */}
            <div className="space-y-3">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] font-mono">
                Company
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#product-studio" className="hover:text-amber-600 transition-colors">
                    Platform Studio
                  </a>
                </li>
                <li>
                  <a href="mailto:onque.connect@gmail.com" className="hover:text-amber-600 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <span className="text-slate-400 cursor-not-allowed">
                    Careers <span className="text-[10px] text-amber-600 font-mono">(Hiring)</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Resources column */}
            <div className="space-y-3">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] font-mono">
                Resources
              </div>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/app" className="hover:text-amber-600 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/app" className="hover:text-amber-600 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <span className="hover:text-amber-600 transition-colors cursor-pointer">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="hover:text-amber-600 transition-colors cursor-pointer">
                    Terms of Service
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © {new Date().getFullYear()} ONcue Payment Technologies Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>Toronto • Vancouver • Montreal</span>
              <span>Encrypted TLS 1.3</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

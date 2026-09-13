"use client";

import Link from "next/link";
import { OncueBrand } from "@/components/brand/oncue-brand";
import { ArrowUpRight, ShieldCheck, FileText, ArrowRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-[#22262B] bg-gradient-to-b from-[#0E1117] via-[#090C10] to-[#06080B] text-xs text-[#8492A6] overflow-hidden">
      {/* Subtle architectural ambient top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 space-y-12">
        {/* Top Section: Brand Statement & High-level Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand Presentation (Col 1-5) */}
          <div className="md:col-span-5 space-y-4">
            {/* ONcue Brand without Intelligence badge */}
            <OncueBrand size="md" withBadge={false} withTagline={false} />
            <p className="text-xs text-[#8492A6] leading-relaxed max-w-sm">
              Payment intelligence platform engineered for trade contractors.
              Verify client payment track records, predict delay risk, and
              structure protective milestone agreements before work begins.
            </p>
            <div className="pt-1">
              <Link
                href="/app"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <span>Launch Contractor Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Navigation Links (Col 6-12) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Platform */}
            <div className="space-y-3.5">
              <div className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
                Platform
              </div>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/app"
                    className="text-[#8492A6] hover:text-[#F0F3F6] transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/app/clients"
                    className="text-[#8492A6] hover:text-[#F0F3F6] transition-colors"
                  >
                    Client Directory
                  </Link>
                </li>
                <li>
                  <Link
                    href="/app/invoices"
                    className="text-[#8492A6] hover:text-[#F0F3F6] transition-colors"
                  >
                    Milestone Invoicing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/app/payments"
                    className="text-[#8492A6] hover:text-[#F0F3F6] transition-colors"
                  >
                    Remittance Ledger
                  </Link>
                </li>
                <li>
                  <Link
                    href="/app/insights"
                    className="text-[#8492A6] hover:text-[#F0F3F6] transition-colors"
                  >
                    AI Risk Engine
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Organization */}
            <div className="space-y-3.5">
              <div className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
                Company
              </div>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/about"
                    className="text-[#8492A6] hover:text-[#F0F3F6] transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#8492A6] hover:text-[#F0F3F6] transition-colors"
                  >
                    Contact Desk
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-[#8492A6] hover:text-[#F0F3F6] transition-colors"
                  >
                    Privacy Standard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-[#8492A6] hover:text-[#F0F3F6] transition-colors"
                  >
                    Master Terms
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Headquarters Location */}
            <div className="space-y-3.5 col-span-2 sm:col-span-1">
              <div className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
                Headquarters
              </div>
              <div className="text-xs text-[#8492A6] leading-relaxed space-y-1">
                <div className="text-[#F0F3F6] font-medium">ONcue Technologies Inc.</div>
                <div>Bay Street Financial District</div>
                <div>Toronto, ON M5J 2T3</div>
                <div>Canada</div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#22262B] to-transparent" />

        {/* Bottom Bar: Copyright & Clean Legal Routing */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#555E6C]">
          <div className="font-mono">
            © 2026 ONcue. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-[#8492A6] hover:text-[#F0F3F6] transition-colors font-medium"
            >
              Privacy Policy
            </Link>
            <span className="text-[#22262B]">•</span>
            <Link
              href="/terms"
              className="text-[#8492A6] hover:text-[#F0F3F6] transition-colors font-medium"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

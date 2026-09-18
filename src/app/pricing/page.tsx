"use client";

import React from "react";
import Link from "next/link";
import { OncueBrand } from "@/components/brand/oncue-brand";
import { SiteFooter } from "@/components/brand/site-footer";
import { PricingSection } from "@/components/pricing/pricing-section";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#070708] text-[#F4F4F5] flex flex-col selection:bg-[#F95721]/30 selection:text-white antialiased">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#070708]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <OncueBrand size="md" />
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#A1A1AA]">
              <Link
                href="/#how-it-works"
                className="hover:text-[#F4F4F5] transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#intelligence"
                className="hover:text-[#F4F4F5] transition-colors"
              >
                Intelligence
              </Link>
              <Link
                href="/pricing"
                className="text-[#F4F4F5] font-semibold transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="hover:text-[#F4F4F5] transition-colors"
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
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/app"
              className="text-xs font-medium text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors px-3 py-1.5"
            >
              Sign In
            </Link>
            <Link
              href="/app"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg copper-cta text-white text-xs font-medium transition-all shadow-sm"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* Main Pricing */}
      <main className="flex-1 py-12 sm:py-16">
        <PricingSection />
      </main>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}

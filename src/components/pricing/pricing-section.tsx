"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, X, ArrowRight, Info, ShieldCheck, Coins } from "lucide-react";

interface FeatureItem {
  name: string;
  included: boolean;
  info?: string;
}

interface PlanConfig {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  subtitle: string;
  monthlyPrice: string;
  yearlyPrice: string;
  periodText: string;
  buttonText: string;
  buttonHref: string;
  credits: string;
  features: FeatureItem[];
}

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  const plans: PlanConfig[] = [
    {
      id: "starter",
      name: "Starter",
      subtitle: "Best for solo contractors starting with intelligence",
      monthlyPrice: "Free",
      yearlyPrice: "Free",
      periodText: "",
      buttonText: "Get started now",
      buttonHref: "/app",
      credits: "1,000 intelligence credits",
      features: [
        { name: "Access to client reliability ledger", included: true, info: "Search and inspect contractor records" },
        { name: "Milestone draw schedule builder", included: true, info: "Calculate milestone stages" },
        { name: "Basic payment history tracking", included: true, info: "Up to 3 active projects" },
        { name: "Standard contractual terms advice", included: true, info: "Recommended Net 15 guidelines" },
        { name: "Advanced payment delinquency alerts", included: false, info: "Requires Pro tier" },
        { name: "Multi-client exposure risk analytics", included: false, info: "Requires Pro tier" },
        { name: "Priority payment notice automation", included: false, info: "Requires Pro tier" },
        { name: "Direct accounting & CRM integration", included: false, info: "Requires Enterprise" },
        { name: "Custom contract retainage benchmarks", included: false, info: "Requires Enterprise" },
        { name: "Multi-crew project permissions", included: false, info: "Requires Enterprise" },
        { name: "Dedicated trade account manager", included: false, info: "Requires Enterprise" },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      badge: "MOST POPULAR",
      isPopular: true,
      subtitle: "For growing trade businesses that need real intelligence",
      monthlyPrice: "$49",
      yearlyPrice: "$39",
      periodText: "/ month",
      buttonText: "Upgrade plan",
      buttonHref: "/app",
      credits: "5,000 intelligence credits",
      features: [
        { name: "Access to client reliability ledger", included: true, info: "Search and inspect contractor records" },
        { name: "Milestone draw schedule builder", included: true, info: "Calculate milestone stages" },
        { name: "Unlimited payment history tracking", included: true, info: "Full trailing records" },
        { name: "Calibrated Net & deposit term engine", included: true, info: "Mathematical terms calibration" },
        { name: "Advanced payment delinquency alerts", included: true, info: "Early warning signals" },
        { name: "Multi-client exposure risk analytics", included: true, info: "Portfolio turnaround variance" },
        { name: "Priority payment notice automation", included: true, info: "Automated Net reminders" },
        { name: "Direct accounting & CRM integration", included: false, info: "Requires Enterprise" },
        { name: "Custom contract retainage benchmarks", included: false, info: "Requires Enterprise" },
        { name: "Multi-crew project permissions", included: false, info: "Requires Enterprise" },
        { name: "Dedicated trade account manager", included: false, info: "Requires Enterprise" },
      ],
    },
    {
      id: "premium-plus",
      name: "Premium+",
      subtitle: "For large commercial firms with multi-team operations",
      monthlyPrice: "$129",
      yearlyPrice: "$96",
      periodText: "/ month",
      buttonText: "Upgrade plan",
      buttonHref: "/contact",
      credits: "29,000 intelligence credits",
      features: [
        { name: "Access to client reliability ledger", included: true, info: "Search and inspect contractor records" },
        { name: "Milestone draw schedule builder", included: true, info: "Calculate milestone stages" },
        { name: "Unlimited payment history tracking", included: true, info: "Full trailing records" },
        { name: "Calibrated Net & deposit term engine", included: true, info: "Mathematical terms calibration" },
        { name: "Advanced payment delinquency alerts", included: true, info: "Early warning signals" },
        { name: "Multi-client exposure risk analytics", included: true, info: "Portfolio turnaround variance" },
        { name: "Priority payment notice automation", included: true, info: "Automated Net reminders" },
        { name: "Direct accounting & CRM integration", included: true, info: "QuickBooks & Procore sync" },
        { name: "Custom contract retainage benchmarks", included: true, info: "Tailored to your market" },
        { name: "Multi-crew project permissions", included: true, info: "Role-based trade access" },
        { name: "Dedicated trade account manager", included: true, info: "SLA & priority escalation" },
      ],
    },
  ];

  return (
    <section
      id="pricing"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden select-none"
    >
      {/* Subtle side ambient glow matching the reference image */}
      <div className="absolute -left-48 top-1/4 w-96 h-[500px] bg-[#C87941]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -right-48 top-1/3 w-96 h-[500px] bg-[#C87941]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Container */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
        {/* Title */}
        <div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.15]">
            Pricing That Scales
            <br />
            <span className="italic font-serif bg-gradient-to-r from-[#E0A97E] via-[#F3C8A0] to-[#C88A58] bg-clip-text text-transparent">
              With Your Business
            </span>
          </h2>
        </div>

        {/* Monthly vs Yearly Switch with Discount Tag */}
        <div className="flex items-center gap-3 self-start md:self-end text-xs text-[#8492A6]">
          <span className={!isYearly ? "text-white font-medium" : "text-[#8492A6]"}>
            Monthly
          </span>

          {/* Toggle pill */}
          <button
            type="button"
            onClick={() => setIsYearly(!isYearly)}
            className="w-11 h-6 rounded-full bg-[#1A1E26] border border-white/10 p-0.5 transition-colors relative flex items-center cursor-pointer focus:outline-none"
            aria-label="Toggle annual billing"
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#C87941] shadow-md transition-transform ${isYearly ? "translate-x-5 bg-gradient-to-r from-[#D88D56] to-[#C87941]" : "translate-x-0.5"
                }`}
            />
          </button>

          <span className={isYearly ? "text-white font-medium" : "text-[#8492A6]"}>
            Yearly
          </span>

          <span className="text-[11px] font-mono text-[#D88D56] bg-[#C87941]/15 border border-[#C87941]/30 px-2.5 py-0.5 rounded-full">
            Save 25% with annual
          </span>
        </div>
      </div>

      {/* The 3 Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => {
          const isPro = plan.isPopular;
          const displayPrice = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`relative rounded-[28px] p-7 sm:p-8 flex flex-col justify-between transition-all backdrop-blur-xl ${isPro
                ? "bg-[#0E1015] border border-[#C87941]/40 shadow-[0_0_50px_rgba(200,121,65,0.15)]"
                : "bg-[#0B0D11] border border-white/[0.07] hover:border-white/15 shadow-xl"
                }`}
            >
              {/* Pro Card Warm Spotlight Glow */}
              {isPro && (
                <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-[#C87941]/25 via-[#C87941]/5 to-transparent rounded-t-[28px] blur-2xl pointer-events-none" />
              )}

              {/* Card Top Section */}
              <div className="relative z-10">
                {/* Plan Name & Floating Badge */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white tracking-tight">
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono tracking-widest font-bold bg-[#C87941]/20 border border-[#C87941]/40 text-[#F3C8A0] uppercase">
                      {plan.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#8492A6] mt-1.5 min-h-[34px] leading-relaxed">
                  {plan.subtitle}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 my-5">
                  <span className="text-5xl font-serif text-white tracking-tight">
                    {displayPrice}
                  </span>
                  {plan.periodText && (
                    <span className="text-xs text-[#8492A6] font-mono">
                      {plan.periodText}
                    </span>
                  )}
                </div>

                {/* Metallic Copper CTA Button */}
                <Link
                  href={plan.buttonHref}
                  className="w-full py-3 px-5 rounded-full bg-gradient-to-r from-[#C87941] via-[#D88D56] to-[#A85B28] hover:from-[#D88D56] hover:to-[#B86B35] text-white text-xs font-semibold tracking-wide transition-all shadow-[0_4px_22px_rgba(200,121,65,0.35)] hover:shadow-[0_6px_28px_rgba(200,121,65,0.5)] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{plan.buttonText}</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </span>
                </Link>

                {/* Credits / Volume Pill with 3D Coin Graphic */}
                <div className="flex items-center gap-2.5 pt-7 pb-5 border-b border-white/[0.06]">
                  {/* Stylized stacked bronze coins icon */}
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#E0A97E] to-[#A85B28] flex items-center justify-center text-white shadow-sm shrink-0">
                    <Coins className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-[#F0F4F8]">
                    {plan.credits}
                  </span>
                </div>

                {/* Feature List */}
                <div className="pt-6 space-y-3 text-xs">
                  {plan.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center justify-between gap-2 group/feat"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {feature.included ? (
                          <Check className="w-3.5 h-3.5 text-[#E0A97E] shrink-0" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-[#3A414D] shrink-0" />
                        )}
                        <span
                          className={`truncate text-xs ${feature.included
                            ? "text-[#C9D1D9]"
                            : "text-[#484F58]"
                            }`}
                        >
                          {feature.name}
                        </span>
                      </div>

                      {/* Tooltip info icon */}
                      {feature.info && (
                        <div className="relative shrink-0 text-[#484F58] hover:text-[#8492A6] cursor-help">
                          <Info className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enterprise Consultation Bar */}
      <div className="relative z-10 mt-12 p-6 rounded-2xl border border-white/[0.07] bg-[#0E1116]/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="text-sm font-semibold text-white">
            Need custom volume, firm-wide multi-seats, or custom ERP integration?
          </div>
          <p className="text-xs text-[#8492A6] mt-0.5">
            Our trade desk configures tailored payment intelligence pipelines for commercial general contractors.
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0 text-xs font-mono">
          <a
            href="mailto:onque.connect@gmail.com"
            className="text-[#E0A97E] hover:text-[#F3C8A0] transition-colors underline underline-offset-4"
          >
            onque.connect@gmail.com
          </a>
          <span className="text-white/20">|</span>
          <a
            href="tel:+17789864390"
            className="text-[#8492A6] hover:text-white transition-colors"
          >
            +1 (778) 986-4390
          </a>
        </div>
      </div>
    </section>
  );
}

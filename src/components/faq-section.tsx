"use client";

import * as React from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Is an ONcue Score a formal credit bureau report?",
    a: "No. ONcue is an operational payment-intelligence tool designed for trades and contractors. It analyzes invoice settlement records and payment behaviors (such as days-to-pay versus terms, variance, and follow-ups). It is an informational decision-support tool, not a consumer credit report.",
  },
  {
    q: "How does the system handle a brand new client with zero history?",
    a: "ONcue clearly flags clients with under three invoices as having 'Thin Data / Preliminary Confidence.' Rather than guessing or blacklisting, the Pre-Engagement Advisor provides sensible baseline industry standards (such as 30–35% upfront deposit and milestone progress billing) until reliable payment history is established.",
  },
  {
    q: "How does ONcue know if a payment delay is due to a legitimate dispute?",
    a: "Unlike generic credit score agencies, ONcue records invoice lifecycle events including dispute notices, change order reviews, and milestone sign-offs. If delay was due to an approved change order, it is categorized distinctly from chronic uncommunicative delinquency.",
  },
  {
    q: "Can my clients see their ONcue Score?",
    a: "Your internal notes, risk scores, and private contractor briefings are completely private to your business. Client-side verified records can optionally be shared only when you invite a client to review an agreed payment ledger.",
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-amber-400 uppercase mb-3">
            Questions & Answers
          </h2>
          <h3 className="text-3xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-white font-semibold text-sm sm:text-base hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-amber-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-400 leading-relaxed border-t border-slate-800/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

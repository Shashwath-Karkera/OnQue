import * as React from "react";
import {
  ShieldAlert,
  Sliders,
  FileSpreadsheet,
  BellRing,
  GitMerge,
  Scale,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function FeaturesGrid() {
  const features = [
    {
      icon: ShieldAlert,
      title: "0–100 ONcue Score with Confidence Index",
      description:
        "Every client gets an objective payment score based on real settlement dates, variance, and follow-ups required. Scored with clear Thin, Moderate, or Strong confidence bands.",
    },
    {
      icon: Sliders,
      title: "Pre-Engagement Contract Advisor",
      description:
        "Input your job size, duration, and client name before submitting a quote. Get recommended upfront deposit percentages, Net terms, and exposure caps.",
    },
    {
      icon: FileSpreadsheet,
      title: "Invoice Ledger Depth Visualizer",
      description:
        "See the whole story at a glance. Visual bars expose invoice payment lag, dispute history, and payment drop-offs when project budgets increase.",
    },
    {
      icon: BellRing,
      title: "Tone-Calibrated Follow-Up Escalations",
      description:
        "Generate email, SMS, and WhatsApp payment reminders with tone dynamically calibrated from polite nudge to final notice depending on relationship history.",
    },
    {
      icon: GitMerge,
      title: "Identity Matching & Entity Deduplication",
      description:
        "Fuzzy matching on company names, phone numbers, and addresses prevents bad actors from creating alias records to mask past delinquency.",
    },
    {
      icon: Scale,
      title: "Portfolio Exposure Concentration Alerts",
      description:
        "Detect when a single slow-paying GC is holding more than 40% of your open receivables before your weekly payroll is threatened.",
    },
  ];

  return (
    <section id="features" className="py-20 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-semibold tracking-widest text-amber-400 uppercase mb-3">
            Core Platform Capabilities
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built specifically for trade contractors.
          </h3>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            Engineered from real construction invoicing problems: slow retainage,
            disputed extras, and endless payment promises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <Card
                key={i}
                className="bg-slate-900/50 border-slate-800/70 hover:border-slate-700 hover:bg-slate-900/80 transition-all p-2"
              >
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-base font-bold text-white mb-2">
                    {f.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {f.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

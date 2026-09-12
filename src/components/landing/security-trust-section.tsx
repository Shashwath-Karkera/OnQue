import * as React from "react";
import { Lock, Shield, KeyRound, Server, EyeOff } from "lucide-react";

export function SecurityTrustSection() {
  const pillars = [
    {
      title: "Secure Authentication",
      desc: "Multi-factor verification, hardware key support, and encrypted session management for contractor accounts.",
      icon: KeyRound,
    },
    {
      title: "Protected Financial Information",
      desc: "Client invoice data and contract values are encrypted in transit via TLS 1.3 and at rest with AES-256.",
      icon: Lock,
    },
    {
      title: "Controlled Access",
      desc: "Granular role-based permissions allow you to share project milestones with estimators while protecting billing margins.",
      icon: Shield,
    },
    {
      title: "Data Privacy & Isolation",
      desc: "Your client lists and proprietary bid calculations remain strictly isolated to your organization workspace.",
      icon: EyeOff,
    },
    {
      title: "Reliable Infrastructure",
      desc: "Enterprise-grade hosting with continuous automated backups, 99.9% uptime SLA, and localized data residency in Canada.",
      icon: Server,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-50/70 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/60 border border-slate-300 text-slate-700 text-xs font-mono uppercase tracking-wider mb-4">
            Security & Governance
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
            Your business data deserves serious protection.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We treat contractor financial records with institutional-grade rigor. Here is how your billing schedules, invoices, and client relationships are protected.
          </p>
        </div>

        {/* Security Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-[0_2px_12px_rgba(15,23,42,0.03)] hover:shadow-[0_8px_24px_-4px_rgba(15,23,42,0.06)] hover:border-slate-300 transition-all duration-200"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 mb-5 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

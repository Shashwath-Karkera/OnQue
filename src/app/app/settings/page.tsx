"use client";

import * as React from "react";
import { useState } from "react";
import { Check, Shield } from "lucide-react";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<
    | "profile"
    | "business"
    | "notifications"
    | "preferences"
    | "security"
    | "privacy"
  >("profile");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* 1. Header */}
      <div className="pb-2 border-b border-[#22262B]">
        <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
          Settings
        </h1>
        <p className="text-xs text-[#8492A6] mt-1">
          Manage your contractor account profile, notifications, and payment defaults.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-md bg-[#161A1D] border border-[#22262B] text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Settings saved successfully.</span>
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="border-b border-[#22262B]">
        <nav className="flex items-center gap-6 text-xs font-medium text-[#8492A6] overflow-x-auto pb-2">
          {[
            { id: "profile", label: "Profile" },
            { id: "business", label: "Business" },
            { id: "notifications", label: "Notifications" },
            { id: "preferences", label: "Payment Preferences" },
            { id: "security", label: "Security" },
            { id: "privacy", label: "Data & Privacy" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`pb-1 whitespace-nowrap transition-colors ${activeSection === tab.id
                ? "text-[#F0F3F6] border-b-2 border-[#3B82F6]"
                : "hover:text-[#F0F3F6]"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Forms */}
      <form onSubmit={handleSave} className="space-y-6">
        {activeSection === "profile" && (
          <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-4">
            <h2 className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Personal Profile
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Shashwath Karkera"
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  defaultValue="onque.connect@gmail.com"
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === "business" && (
          <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-4">
            <h2 className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Business Entity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                  Legal Entity Name
                </label>
                <input
                  type="text"
                  defaultValue="ONcue Contracting Solutions Inc."
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                  Primary Trade
                </label>
                <input
                  type="text"
                  defaultValue="Commercial General Contractor"
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>
          </div>
        )}

        {activeSection === "notifications" && (
          <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-4">
            <h2 className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Alert Rules
            </h2>
            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-2.5 text-[#F0F3F6] cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded bg-[#0B0D0F] border-[#22262B] text-[#2563EB]"
                />
                <span>Email notification when an invoice becomes 3 days overdue</span>
              </label>
              <label className="flex items-center gap-2.5 text-[#F0F3F6] cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded bg-[#0B0D0F] border-[#22262B] text-[#2563EB]"
                />
                <span>Alert me when a client's reliability score drops by more than 5 points</span>
              </label>
              <label className="flex items-center gap-2.5 text-[#F0F3F6] cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded bg-[#0B0D0F] border-[#22262B] text-[#2563EB]"
                />
                <span>Weekly summary of outstanding milestone balances</span>
              </label>
            </div>
          </div>
        )}

        {activeSection === "preferences" && (
          <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-4">
            <h2 className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Payment Terms Defaults
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                  Default Payment Terms
                </label>
                <select className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]">
                  <option>Net 15 Days</option>
                  <option>Net 30 Days</option>
                  <option>Due on Receipt</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                  Minimum Deposit Recommendation
                </label>
                <select className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]">
                  <option>20% Upfront</option>
                  <option>25% Upfront</option>
                  <option>30% Upfront</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeSection === "security" && (
          <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-4">
            <h2 className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Security & Authentication
            </h2>
            <p className="text-xs text-[#8492A6]">
              Two-Factor Authentication (2FA) is enforced for financial disbursements.
            </p>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                2FA Enabled (Authenticator App)
              </span>
            </div>
          </div>
        )}

        {activeSection === "privacy" && (
          <div className="p-6 rounded-lg border border-[#22262B] bg-[#111417] space-y-4">
            <h2 className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Data & Privacy Controls
            </h2>
            <p className="text-xs text-[#8492A6] leading-relaxed">
              Your proprietary job economics, profit margins, and specific vendor
              sub-contracts remain confidential. Only anonymized payment settlement
              latency contributes to aggregate network intelligence.
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22262B]">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-medium text-white shadow-sm transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}

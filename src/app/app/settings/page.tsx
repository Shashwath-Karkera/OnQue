"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Check, Shield, Loader2, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<
    | "profile"
    | "business"
    | "notifications"
    | "preferences"
    | "security"
    | "privacy"
  >("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dynamic user profile fields
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  // Business Entity
  const [businessName, setBusinessName] = useState("");
  const [primaryTrade, setPrimaryTrade] = useState("");

  // Payment Preferences
  const [paymentTerms, setPaymentTerms] = useState("Net 15 Days");
  const [depositPct, setDepositPct] = useState("20");

  // Alert Rules
  const [alertOverdue, setAlertOverdue] = useState(true);
  const [alertScoreDrop, setAlertScoreDrop] = useState(true);
  const [alertWeeklySummary, setAlertWeeklySummary] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.settings) {
          const s = data.settings;
          setNameInput(s.name || "");
          setEmailInput(s.email || "");
          setPhoneInput(s.phone || "");
          setBusinessName(s.company_name || "");
          setPrimaryTrade(s.trade_specialty || "");
          setPaymentTerms(s.default_payment_terms || "Net 15 Days");
          setDepositPct(String(s.default_deposit_pct || 20));
          setAlertOverdue(s.alert_overdue_invoices ?? true);
          setAlertScoreDrop(s.alert_score_drop ?? true);
          setAlertWeeklySummary(s.alert_weekly_summary ?? true);
        }
      })
      .catch((err) => console.error("Failed to load settings:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameInput.trim(),
          phone: phoneInput.trim(),
          company_name: businessName.trim(),
          trade_specialty: primaryTrade.trim(),
          default_payment_terms: paymentTerms,
          default_deposit_pct: parseInt(depositPct, 10),
          alert_overdue_invoices: alertOverdue,
          alert_score_drop: alertScoreDrop,
          alert_weekly_summary: alertWeeklySummary,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3500);
      } else {
        setErrorMessage(data.error || "Failed to save settings to Neon.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl antialiased">
      {/* 1. Header */}
      <div className="pb-2 border-b border-[#22262B]">
        <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
          Settings
        </h1>
        <p className="text-xs text-[#8492A6] mt-1">
          Manage your contractor account profile, notifications, and payment defaults stored in Neon.
        </p>
      </div>

      {saved && (
        <div className="p-3.5 rounded-md bg-[#161A1D] border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 shadow-sm">
          <Check className="w-4 h-4" />
          <span>Preferences successfully saved and synchronized in Neon database.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
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
              className={`pb-1 whitespace-nowrap transition-colors cursor-pointer ${
                activeSection === tab.id
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
      {loading ? (
        <div className="py-16 flex items-center justify-center gap-2 text-xs text-[#8492A6]">
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
          <span>Loading settings from Neon...</span>
        </div>
      ) : (
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
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    disabled
                    title="Email is verified and linked to your Neon account"
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F]/60 border border-[#22262B] text-xs text-[#8492A6] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                    Direct Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+1 (555) 000-0000"
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
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Apex Construction Solutions Ltd."
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                    Primary Trade
                  </label>
                  <input
                    type="text"
                    value={primaryTrade}
                    onChange={(e) => setPrimaryTrade(e.target.value)}
                    placeholder="e.g. Commercial General Contractor, Mechanical, Electrical"
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
                    checked={alertOverdue}
                    onChange={(e) => setAlertOverdue(e.target.checked)}
                    className="rounded bg-[#0B0D0F] border-[#22262B] text-[#2563EB]"
                  />
                  <span>Email notification when an invoice becomes 3 days overdue</span>
                </label>
                <label className="flex items-center gap-2.5 text-[#F0F3F6] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alertScoreDrop}
                    onChange={(e) => setAlertScoreDrop(e.target.checked)}
                    className="rounded bg-[#0B0D0F] border-[#22262B] text-[#2563EB]"
                  />
                  <span>Alert me when a client&apos;s reliability score drops by more than 5 points</span>
                </label>
                <label className="flex items-center gap-2.5 text-[#F0F3F6] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alertWeeklySummary}
                    onChange={(e) => setAlertWeeklySummary(e.target.checked)}
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
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  >
                    <option value="Net 15 Days">Net 15 Days</option>
                    <option value="Net 30 Days">Net 30 Days</option>
                    <option value="Net 45 Days">Net 45 Days</option>
                    <option value="Due on Receipt">Due on Receipt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1.5">
                    Minimum Deposit Recommendation
                  </label>
                  <select
                    value={depositPct}
                    onChange={(e) => setDepositPct(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  >
                    <option value="10">10% Upfront</option>
                    <option value="15">15% Upfront</option>
                    <option value="20">20% Upfront</option>
                    <option value="25">25% Upfront</option>
                    <option value="30">30% Upfront</option>
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
                Multi-Factor OTP Authentication is enforced for all logins and remittance actions.
              </p>
              <div className="flex items-center gap-3">
                <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Neon Database Protected Sessions Active
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
                Your proprietary job economics, profit margins, and specific vendor sub-contracts
                remain strictly confidential in your isolated Neon database partition.
              </p>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22262B]">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-medium text-white shadow-sm transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

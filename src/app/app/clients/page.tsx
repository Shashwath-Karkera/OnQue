"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface ClientRecord {
  id: string;
  name: string;
  location: string;
  trade_type: string;
  projects_count: number;
  invoices_count: number;
  on_time_rate: number;
  avg_delay_days: number;
  outstanding_cad: number;
  score: number;
  risk_band: "Low Risk" | "Medium Risk" | "High Risk";
  updated_at: string;
}

export default function ClientsListPage() {
  const [clients, setClients] = useState<ClientRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Client Form State
  const [formName, setFormName] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formTrade, setFormTrade] = useState("General Contractor");
  const [formContactName, setFormContactName] = useState("");
  const [formContactEmail, setFormContactEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set("search", searchTerm.trim());
      if (riskFilter !== "All") params.set("risk", riskFilter);

      const res = await fetch(`/api/clients?${params.toString()}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.clients)) {
        setClients(data.clients);
      }
    } catch (err) {
      console.error("Failed to load clients:", err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, riskFilter]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError("Business name is required.");
      return;
    }
    setSaving(true);
    setFormError(null);

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName.trim(),
          location: formLocation.trim() || "Toronto, ON",
          tradeType: formTrade,
          contactName: formContactName.trim() || undefined,
          contactEmail: formContactEmail.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (data.success && data.client) {
        setClients((prev) => [data.client, ...prev]);
        setModalOpen(false);
        setFormName("");
        setFormContactName("");
        setFormContactEmail("");
        setToastMessage(`Client "${data.client.name}" registered and stored in Neon.`);
        setTimeout(() => setToastMessage(null), 4000);
        await fetchClients();
      } else {
        setFormError(data.error || "Failed to create client.");
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to create client.");
    } finally {
      setSaving(false);
    }
  };

  const formatCAD = (amount: number | string) => {
    const val = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(isNaN(val) ? 0 : val);
  };

  const formatRelativeDate = (dateStr?: string) => {
    if (!dateStr) return "Recently";
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.round((now.getTime() - date.getTime()) / (1000 * 3600 * 24));
    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} wk ago`;
    return date.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
  };

  const avgScore = clients.length > 0
    ? Math.round(clients.reduce((acc, c) => acc + (Number(c.score) || 0), 0) / clients.length)
    : 0;
  const totalExposure = clients.reduce((acc, c) => acc + Number(c.outstanding_cad || 0), 0);
  const lowRiskCount = clients.filter((c) => c.risk_band === "Low Risk").length;

  return (
    <div className="space-y-8 antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-lg bg-[#161A1D] border border-emerald-500/30 text-xs text-[#F0F3F6] flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#8492A6] hover:text-[#F0F3F6]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#22262B]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
            Clients
          </h1>
          <p className="text-xs text-[#8492A6] mt-1">
            Live client ledger, empirical payment scoring, and exposure tracking stored in Neon.
          </p>
        </div>

        <button
          onClick={() => {
            setFormError(null);
            setModalOpen(true);
          }}
          className="px-3.5 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ New Client</span>
        </button>
      </div>

      {/* 2. Top Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Total Active Clients</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] font-mono mt-1">
            {clients.length}
          </div>
          <div className="text-[11px] text-emerald-400 mt-0.5">
            {lowRiskCount} in Low Risk tier
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Average Portfolio Reliability</div>
          <div className="text-2xl font-semibold text-emerald-400 font-mono mt-1">
            {avgScore} <span className="text-xs text-[#8492A6] font-normal">/ 100</span>
          </div>
          <div className="text-[11px] text-[#8492A6] mt-0.5">
            Empirical rating median
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Total Client Exposure</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] font-mono mt-1">
            {formatCAD(totalExposure)}
          </div>
          <div className="text-[11px] text-amber-400 mt-0.5">
            Outstanding billing exposure
          </div>
        </div>
      </div>

      {/* 3. Search & Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#555E6C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clients by name, trade or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-md bg-[#111417] border border-[#22262B] text-xs text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-[#111417] border border-[#22262B] p-1 rounded-md text-xs font-medium self-stretch sm:self-auto">
          {["All", "Low Risk", "Medium Risk", "High Risk"].map((filter) => (
            <button
              key={filter}
              onClick={() => setRiskFilter(filter)}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                riskFilter === filter
                  ? "bg-[#161A1D] text-[#F0F3F6] shadow-xs border border-[#22262B]"
                  : "text-[#8492A6] hover:text-[#F0F3F6]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Professional Data Table */}
      <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-[#22262B] text-[#8492A6] bg-[#0E1114]">
              <th className="py-3 px-4 font-medium">Client</th>
              <th className="py-3 px-4 font-medium">Projects</th>
              <th className="py-3 px-4 font-medium">Invoices</th>
              <th className="py-3 px-4 font-medium">Paid On Time</th>
              <th className="py-3 px-4 font-medium">Avg Delay</th>
              <th className="py-3 px-4 font-medium">Outstanding</th>
              <th className="py-3 px-4 font-medium">Risk Indicator</th>
              <th className="py-3 px-4 font-medium">Last Activity</th>
              <th className="py-3 px-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#22262B]">
            {loading ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-xs text-[#8492A6]">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span>Loading clients from Neon database...</span>
                  </div>
                </td>
              </tr>
            ) : clients.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-xs text-[#8492A6]">
                  No clients matching your search or filter criteria.
                </td>
              </tr>
            ) : (
              clients.map((client) => {
                const onTimeRate = Number(client.on_time_rate ?? 100);
                const avgDelay = Number(client.avg_delay_days ?? 0);
                const outstanding = Number(client.outstanding_cad ?? 0);

                return (
                  <tr
                    key={client.id}
                    className="hover:bg-[#161A1D]/60 transition-colors group"
                  >
                    <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                      <Link
                        href={`/app/clients/${client.id}`}
                        className="hover:text-[#3B82F6] transition-colors"
                      >
                        <div className="font-semibold">{client.name}</div>
                        <div className="text-[11px] text-[#8492A6] font-normal">
                          {client.trade_type} · {client.location}
                        </div>
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-[#A0AEC0]">
                      {client.projects_count ?? 0}
                    </td>
                    <td className="py-3.5 px-4 text-[#A0AEC0]">
                      {client.invoices_count ?? 0}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium">
                      <span
                        className={
                          onTimeRate >= 85
                            ? "text-emerald-400"
                            : onTimeRate >= 70
                            ? "text-amber-400"
                            : "text-rose-400"
                        }
                      >
                        {onTimeRate}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#8492A6] font-mono">
                      {avgDelay.toFixed(1)} days
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#F0F3F6] font-semibold">
                      {formatCAD(outstanding)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                          client.risk_band === "Low Risk"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : client.risk_band === "Medium Risk"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                      >
                        {client.risk_band}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[#8492A6]">
                      {formatRelativeDate(client.updated_at)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/app/clients/${client.id}`}
                        className="text-xs text-[#3B82F6] hover:text-[#60A5FA] font-medium inline-flex items-center gap-1"
                      >
                        <span>Profile</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Subtle Informational Disclaimer */}
      <div className="text-[11px] text-[#555E6C] leading-relaxed">
        Risk indicators are calculated dynamically using settled billing cycles, holdback timelines, and statutory liens.
        Scores update in real time with each recorded remittance.
      </div>

      {/* Add Client Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0D0F]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111417] border border-[#22262B] rounded-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#F0F3F6]">
                Add New Client
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#8492A6] hover:text-[#F0F3F6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#8492A6]">
              Register a client to track invoices, milestones, and automated payment reliability scores.
            </p>

            {formError && (
              <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateClient} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Client Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skyline Architecture & Construction"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Toronto, ON"
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Industry Type
                  </label>
                  <select
                    value={formTrade}
                    onChange={(e) => setFormTrade(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  >
                    <option>General Contractor</option>
                    <option>Commercial General Contractor</option>
                    <option>Interior GC</option>
                    <option>Residential Developer</option>
                    <option>Luxury Custom Homes</option>
                    <option>Civil Infrastructure</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={formContactName}
                    onChange={(e) => setFormContactName(e.target.value)}
                    placeholder="e.g. Primary Project Manager"
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formContactEmail}
                    onChange={(e) => setFormContactEmail(e.target.value)}
                    placeholder="e.g. accounting@clientcompany.com"
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22262B]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded-md border border-[#22262B] text-xs font-medium text-[#8492A6] hover:text-[#F0F3F6] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-3 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-medium text-white shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Client</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

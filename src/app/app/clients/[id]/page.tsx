"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  CreditCard,
  Building2,
  Layers,
  Calendar,
  FileText,
  ShieldCheck,
  Clock,
  Loader2,
} from "lucide-react";

export default function ClientProfilePage() {
  const params = useParams();
  const clientId = (params?.id as string) || "";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    client: any;
    invoices: any[];
    projects: any[];
  } | null>(null);

  const [activeTab, setActiveTab] = useState<
    "overview" | "payments" | "projects" | "activity"
  >("overview");

  useEffect(() => {
    async function loadClient() {
      if (!clientId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/clients/${clientId}`);
        const json = await res.json();
        if (json.success) {
          setData(json);
        }
      } catch (err) {
        console.error("Failed to load client profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadClient();
  }, [clientId]);

  const formatCAD = (amount: number | string | undefined) => {
    const val = typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-CA", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3 text-xs text-[#8492A6]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span>Loading client profile and ledger from Neon...</span>
      </div>
    );
  }

  if (!data?.client) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-lg font-semibold text-[#F0F3F6]">Client Not Found</h2>
        <p className="text-xs text-[#8492A6]">
          This client record does not exist in your Neon database or you do not have permission to view it.
        </p>
        <Link
          href="/app/clients"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Clients</span>
        </Link>
      </div>
    );
  }

  const client = data.client;

  const invoices = data?.invoices || [];
  const projects = data?.projects || [];

  const paidInvoices = invoices.filter((i) => i.status === "Paid");
  const onTimeCount = paidInvoices.filter((i) => (i.delay_days ?? 0) <= 0).length;
  const lateCount = paidInvoices.filter((i) => (i.delay_days ?? 0) > 0).length;

  return (
    <div className="space-y-8 antialiased">
      {/* 1. Header with Breadcrumb & Action Buttons */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-[#8492A6]">
          <Link
            href="/app/clients"
            className="hover:text-[#F0F3F6] flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Clients</span>
          </Link>
          <span>/</span>
          <span className="text-[#F0F3F6] font-medium">{client.name}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#22262B]">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F0F3F6]">
                {client.name}
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  client.risk_band === "Low Risk"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : client.risk_band === "Medium Risk"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                }`}
              >
                {client.risk_band}
              </span>
            </div>
            <p className="text-xs text-[#8492A6] mt-1">
              {client.trade_type} · {client.location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/app/projects"
              className="px-3.5 py-1.5 rounded-lg bg-[#161A1D] hover:bg-[#22262B] border border-white/10 text-xs font-medium text-[#F0F3F6] transition-colors"
            >
              New Project
            </Link>
            <Link
              href="/app/payments"
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-xs font-medium text-white transition-all shadow-[0_4px_16px_rgba(37,99,235,0.3)]"
            >
              Record Payment
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Glassmorphic Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Score */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-emerald-500/40 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6] uppercase tracking-wider font-mono">
              Reliability
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl sm:text-4xl font-bold text-[#F0F3F6] font-mono">
              {client.score}
            </span>
            <span className="text-xs text-[#8492A6]">/ 100</span>
          </div>
          <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{client.risk_band} Assessment</span>
          </div>
        </div>

        {/* Card 2: Settlement Record */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-blue-500/40 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6] uppercase tracking-wider font-mono">
              Settlement Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F6] mt-2 font-mono">
            {Number(client.on_time_rate ?? 100)}%
          </div>
          <div className="text-xs text-[#8492A6] mt-2">
            {invoices.length > 0
              ? `${onTimeCount} of ${invoices.length} invoices on time`
              : "Strict payment verification"}
          </div>
        </div>

        {/* Card 3: Avg Delay */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-cyan-500/40 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6] uppercase tracking-wider font-mono">
              Avg Delay
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F6] mt-2 font-mono">
            {Number(client.avg_delay_days ?? 0).toFixed(1)} days
          </div>
          <div className="text-xs text-[#8492A6] mt-2">
            Standard: {client.recommended_terms || "Net 15 Days"}
          </div>
        </div>

        {/* Card 4: Settled Volume */}
        <div className="relative group overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md transition-all hover:border-amber-500/40 hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8492A6] uppercase tracking-wider font-mono">
              Total Volume
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#F0F3F6] mt-2 font-mono">
            {formatCAD(client.total_volume_cad)}
          </div>
          <div className="text-xs text-amber-400/90 mt-2 font-mono">
            {formatCAD(client.outstanding_cad)} active outstanding
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="border-b border-[#22262B]">
        <nav className="flex items-center gap-8 text-xs font-medium text-[#8492A6]">
          {(["overview", "payments", "projects", "activity"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 capitalize transition-colors cursor-pointer ${
                  activeTab === tab
                    ? "text-[#F0F3F6] border-b-2 border-[#3B82F6]"
                    : "hover:text-[#F0F3F6]"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Tab: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* ONcue Intelligence Glass Card */}
          <div className="rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-[#141820]/80 to-[#0E1117] p-5 shadow-xl backdrop-blur-md flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wider font-mono text-[#F0F3F6] flex items-center gap-2">
                <span>ONcue Payment Intelligence</span>
                <span className="text-[10px] text-emerald-400 font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Neon Synced
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#A0AEC0] leading-relaxed">
                {invoices.length > 0 ? (
                  <>
                    Client holds an empirical score of {client.score}/100 based on {invoices.length} historical invoice{invoices.length > 1 ? "s" : ""}.
                    Average delay velocity is {Number(client.avg_delay_days ?? 0).toFixed(1)} days.
                    Recommended contract terms specify {client.recommended_deposit_pct || 20}% upfront deposit on future jobs.
                  </>
                ) : (
                  <>
                    Client record initialized in Neon with {projects.length} project{projects.length !== 1 ? "s" : ""}. Baseline empirical score of {client.score}/100 active pending cleared remittance history.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Recommended Terms in 3 Cards */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Recommended Contract Terms</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md hover:border-blue-500/40 transition-colors">
                <div className="text-xs text-[#8492A6]">Upfront Deposit</div>
                <div className="text-xl font-bold text-[#F0F3F6] mt-2 font-mono">
                  {client.recommended_deposit_pct || 20}% Upfront
                </div>
                <div className="text-[11px] text-[#8492A6] mt-1">
                  Protects initial mobilization & materials
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md hover:border-blue-500/40 transition-colors">
                <div className="text-xs text-[#8492A6]">Payment Window</div>
                <div className="text-xl font-bold text-[#F0F3F6] mt-2 font-mono">
                  {client.recommended_terms || "Net 15 Days"}
                </div>
                <div className="text-[11px] text-[#8492A6] mt-1">
                  Matches client historical turnaround
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#161B22]/90 to-[#0F1318]/95 p-5 shadow-lg backdrop-blur-md hover:border-blue-500/40 transition-colors">
                <div className="text-xs text-[#8492A6]">Billing Schedule</div>
                <div className="text-xl font-bold text-[#F0F3F6] mt-2 font-mono">
                  {projects.length > 0 ? `${projects.length} Active ${projects.length === 1 ? "Project" : "Projects"}` : "Direct Invoices"}
                </div>
                <div className="text-[11px] text-[#8492A6] mt-1">
                  {projects.length > 0 ? `${projects[0].retainage_pct ?? 10}% statutory retainage holdback` : "No linked project holdbacks"}
                </div>
              </div>
            </div>
          </div>

          {/* Historical Settlement Breakdown Card */}
          <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#141820]/80 to-[#0E1117] p-6 shadow-xl backdrop-blur-md space-y-4">
            <div className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Historical Settlement Breakdown
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-lg bg-[#0A0D12] border border-white/5">
                <div className="text-xs text-[#8492A6]">On-time Payments</div>
                <div className="text-xl font-bold text-emerald-400 mt-1 font-mono">
                  {onTimeCount}
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0A0D12] border border-white/5">
                <div className="text-xs text-[#8492A6]">Late Settlements</div>
                <div className="text-xl font-bold text-amber-400 mt-1 font-mono">
                  {lateCount}
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0A0D12] border border-white/5">
                <div className="text-xs text-[#8492A6]">Total Invoices</div>
                <div className="text-xl font-bold text-[#F0F3F6] mt-1 font-mono">
                  {invoices.length}
                </div>
              </div>
              <div className="p-3.5 rounded-lg bg-[#0A0D12] border border-white/5">
                <div className="text-xs text-[#8492A6]">Active Projects</div>
                <div className="text-xl font-bold text-[#F0F3F6] mt-1 font-mono">
                  {projects.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: PAYMENTS / INVOICES */}
      {activeTab === "payments" && (
        <div className="rounded-xl border border-white/10 bg-[#111417] p-5 shadow-xl backdrop-blur-md">
          <div className="overflow-x-auto rounded-lg border border-white/5 bg-[#0A0D12]">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/5 text-[#8492A6] bg-[#0E1218]">
                  <th className="py-3 px-4 font-medium">Invoice #</th>
                  <th className="py-3 px-4 font-medium">Project</th>
                  <th className="py-3 px-4 font-medium">Amount</th>
                  <th className="py-3 px-4 font-medium">Issued</th>
                  <th className="py-3 px-4 font-medium">Due</th>
                  <th className="py-3 px-4 font-medium">Delay</th>
                  <th className="py-3 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-[#8492A6]">
                      No invoices recorded for this client yet.
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-[#F0F3F6]">
                        {inv.invoice_number}
                      </td>
                      <td className="py-3.5 px-4 text-[#A0AEC0]">
                        {inv.project_title || "Direct Engagement"}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#F0F3F6] font-mono">
                        {formatCAD(inv.amount_cad)}
                      </td>
                      <td className="py-3.5 px-4 text-[#8492A6]">{formatDate(inv.issued_date)}</td>
                      <td className="py-3.5 px-4 text-[#8492A6]">{formatDate(inv.due_date)}</td>
                      <td className="py-3.5 px-4 font-mono">
                        {(inv.delay_days ?? 0) <= 0 ? (
                          <span className="text-emerald-400">On time</span>
                        ) : (
                          <span className="text-rose-400">+{inv.delay_days} days</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                            inv.status === "Paid"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : inv.status === "Pending"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                              : inv.status === "Overdue"
                              ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                              : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: PROJECTS */}
      {activeTab === "projects" && (
        <div className="rounded-xl border border-white/10 bg-[#111417] p-5 shadow-xl backdrop-blur-md">
          <div className="overflow-x-auto rounded-lg border border-white/5 bg-[#0A0D12]">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/5 text-[#8492A6] bg-[#0E1218]">
                  <th className="py-3 px-4 font-medium">Project Name</th>
                  <th className="py-3 px-4 font-medium">Contract Value</th>
                  <th className="py-3 px-4 font-medium">Start Date</th>
                  <th className="py-3 px-4 font-medium">Retainage %</th>
                  <th className="py-3 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#8492A6]">
                      No active projects on file for this client.
                    </td>
                  </tr>
                ) : (
                  projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                        {proj.title}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#F0F3F6]">
                        {formatCAD(proj.contract_value_cad)}
                      </td>
                      <td className="py-3.5 px-4 text-[#8492A6]">{formatDate(proj.start_date)}</td>
                      <td className="py-3.5 px-4 font-mono text-[#8492A6]">
                        {proj.retainage_pct ?? 10}%
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                            proj.status === "Completed"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}
                        >
                          {proj.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: ACTIVITY */}
      {activeTab === "activity" && (
        <div className="rounded-xl border border-white/10 bg-[#111417] p-6 shadow-xl backdrop-blur-md space-y-4">
          <div className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
            Recent Activity & Settlement Events
          </div>
          <div className="space-y-3 text-xs">
            {invoices.length > 0 ? (
              invoices.slice(0, 5).map((inv) => (
                <div
                  key={inv.id}
                  className="flex items-start gap-3 text-[#A0AEC0] p-3 rounded-lg bg-[#0A0D12] border border-white/5"
                >
                  <span className="font-mono text-emerald-400 font-semibold shrink-0">
                    {formatDate(inv.issued_date)}:
                  </span>
                  <span>
                    Invoice {inv.invoice_number} ({formatCAD(inv.amount_cad)}) recorded as {inv.status}.
                  </span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-[#8492A6]">No recorded activity yet.</div>
            )}
          </div>
        </div>
      )}

      {/* Informational Disclaimer */}
      <div className="text-[11px] text-[#555E6C] leading-relaxed pt-2">
        Risk indicators are based on available payment history and are intended
        for informational purposes only. They do not guarantee future payment
        behavior.
      </div>
    </div>
  );
}

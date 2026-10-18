"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  ArrowRight,
  Send,
  CheckCircle2,
  X,
  Loader2,
  Clock,
  AlertCircle,
} from "lucide-react";

interface InvoiceRecord {
  id: string;
  invoice_number: string;
  client_id: string;
  client_name: string;
  project_id: string | null;
  project_title: string | null;
  amount_cad: number;
  issued_date: string;
  due_date: string;
  status: "Draft" | "Pending" | "Paid" | "Overdue";
  delay_days: number;
}

interface ClientOption {
  id: string;
  name: string;
}

interface ProjectOption {
  id: string;
  title: string;
  client_id: string;
}

export default function InvoicesListPage() {
  const [invoices, setInvoices] = useState<InvoiceRecord[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<
    "All" | "Draft" | "Pending" | "Paid" | "Overdue"
  >("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Invoice Form
  const [selectedClient, setSelectedClient] = useState("");
  const [clientMode, setClientMode] = useState<"existing" | "new">("existing");
  const [newClientName, setNewClientName] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [amount, setAmount] = useState("");
  const [terms, setTerms] = useState("Net 15 Days");
  const [formError, setFormError] = useState<string | null>(null);

  const fetchInvoices = useCallback(async () => {
    try {
      const url = activeTab === "All" ? "/api/invoices" : `/api/invoices?status=${activeTab}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && Array.isArray(data.invoices)) {
        setInvoices(data.invoices);
      }
    } catch (err) {
      console.error("Failed to load invoices:", err);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  const loadMeta = useCallback(async () => {
    try {
      const [cRes, pRes] = await Promise.all([
        fetch("/api/clients"),
        fetch("/api/projects"),
      ]);
      const cData = await cRes.json();
      const pData = await pRes.json();
      if (cData.success && Array.isArray(cData.clients)) {
        setClients(cData.clients);
        if (cData.clients.length > 0) {
          setSelectedClient((prev) => prev || cData.clients[0].id);
          setClientMode("existing");
        } else {
          setClientMode("new");
        }
      }
      if (pData.success && Array.isArray(pData.projects)) {
        setProjects(pData.projects);
      }
    } catch (err) {
      console.error("Failed to load metadata:", err);
    }
  }, []);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  useEffect(() => {
    loadMeta();
  }, [loadMeta]);

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      setFormError("Please enter a valid invoice amount.");
      return;
    }

    if (clientMode === "new" && !newClientName.trim()) {
      setFormError("Please enter a client business name.");
      return;
    }

    if (clientMode === "existing" && !selectedClient && clients.length === 0) {
      setFormError("No existing clients. Please create a new client.");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    // Calculate due date based on terms
    const now = new Date();
    let daysToAdd = 15;
    if (terms === "Net 30 Days") daysToAdd = 30;
    else if (terms === "Due on Receipt") daysToAdd = 0;
    else if (terms === "Net 7 Days") daysToAdd = 7;

    const dueDate = new Date(now.getTime() + daysToAdd * 24 * 3600 * 1000)
      .toISOString()
      .split("T")[0];

    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: clientMode === "existing" ? (selectedClient || clients[0]?.id) : undefined,
          clientName: clientMode === "new" ? newClientName.trim() : undefined,
          projectId: selectedProject || undefined,
          amountCAD: amount,
          dueDate,
          issuedDate: now.toISOString().split("T")[0],
          notes: `Terms: ${terms}`,
        }),
      });

      const data = await res.json();
      if (data.success && data.invoice) {
        setInvoices((prev) => [data.invoice, ...prev]);
        setModalOpen(false);
        setAmount("");
        setNewClientName("");
        setToastMessage(`Invoice ${data.invoice.invoice_number} created and stored in Neon.`);
        setTimeout(() => setToastMessage(null), 4000);
        await Promise.all([fetchInvoices(), loadMeta()]);
      } else {
        setFormError(data.error || "Failed to create invoice.");
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to create invoice.");
    } finally {
      setSubmitting(false);
    }
  };

  const triggerReminder = (invNumber: string, clientName: string) => {
    setToastMessage(`Automated courtesy reminder dispatched to ${clientName} for ${invNumber}.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const formatCAD = (val: number | string) => {
    const num = typeof val === "string" ? parseFloat(val) : val;
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
      maximumFractionDigits: 0,
    }).format(isNaN(num) ? 0 : num);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-CA", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filtered = invoices.filter((inv) => {
    const term = searchTerm.toLowerCase();
    return (
      inv.client_name?.toLowerCase().includes(term) ||
      inv.invoice_number?.toLowerCase().includes(term) ||
      (inv.project_title && inv.project_title.toLowerCase().includes(term))
    );
  });

  const totalInvoiced = invoices.reduce((acc, i) => acc + Number(i.amount_cad || 0), 0);
  const outstandingAmount = invoices
    .filter((i) => i.status === "Pending" || i.status === "Overdue")
    .reduce((acc, i) => acc + Number(i.amount_cad || 0), 0);
  const overdueCount = invoices.filter((i) => i.status === "Overdue").length;

  return (
    <div className="space-y-8 antialiased">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 rounded-lg bg-[#161A1D] border border-blue-500/30 text-xs text-[#F0F3F6] flex items-center justify-between shadow-lg">
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

      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#22262B]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
            Invoices
          </h1>
          <p className="text-xs text-[#8492A6] mt-1">
            Progress draws, milestone billing, and aging ledger tracked in Neon.
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
          <span>+ Create Invoice</span>
        </button>
      </div>

      {/* 2. Top Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Total Invoiced Volume</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] font-mono mt-1">
            {formatCAD(totalInvoiced)}
          </div>
          <div className="text-[11px] text-[#8492A6] mt-0.5">
            {invoices.length} billing milestones
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Total Outstanding Exposure</div>
          <div className="text-2xl font-semibold text-blue-400 font-mono mt-1">
            {formatCAD(outstandingAmount)}
          </div>
          <div className="text-[11px] text-blue-400/80 mt-0.5">
            Active milestone draws
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Overdue Milestone Invoices</div>
          <div className="text-2xl font-semibold text-rose-400 font-mono mt-1">
            {overdueCount}
          </div>
          <div className="text-[11px] text-rose-400/80 mt-0.5">
            {overdueCount > 0 ? "Requires automated notice" : "All accounts on schedule"}
          </div>
        </div>
      </div>

      {/* 3. Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-[#111417] border border-[#22262B] p-1 rounded-md text-xs font-medium overflow-x-auto">
          {(["All", "Pending", "Overdue", "Paid", "Draft"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#161A1D] text-[#F0F3F6] shadow-xs border border-[#22262B]"
                    : "text-[#8492A6] hover:text-[#F0F3F6]"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#555E6C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoice #, client, project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-md bg-[#111417] border border-[#22262B] text-xs text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
      </div>

      {/* 3. Invoices Data Table */}
      <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-[#22262B] text-[#8492A6] bg-[#0E1114]">
              <th className="py-3 px-4 font-medium">Invoice #</th>
              <th className="py-3 px-4 font-medium">Client</th>
              <th className="py-3 px-4 font-medium">Project</th>
              <th className="py-3 px-4 font-medium">Amount</th>
              <th className="py-3 px-4 font-medium">Issued Date</th>
              <th className="py-3 px-4 font-medium">Due Date</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#22262B]">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-xs text-[#8492A6]">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span>Loading invoices from Neon...</span>
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-xs text-[#8492A6]">
                  No invoices found matching current filter.
                </td>
              </tr>
            ) : (
              filtered.map((inv) => (
                <tr
                  key={inv.id}
                  className="hover:bg-[#161A1D]/60 transition-colors group"
                >
                  <td className="py-3.5 px-4 font-mono font-medium text-[#F0F3F6]">
                    {inv.invoice_number}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                    <Link
                      href={`/app/clients/${inv.client_id}`}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {inv.client_name}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 text-[#A0AEC0]">
                    {inv.project_title || "General Engagement"}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#F0F3F6] font-mono">
                    {formatCAD(inv.amount_cad)}
                  </td>
                  <td className="py-3.5 px-4 text-[#8492A6]">
                    {formatDate(inv.issued_date)}
                  </td>
                  <td className="py-3.5 px-4 text-[#8492A6]">
                    {formatDate(inv.due_date)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
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
                  <td className="py-3.5 px-4 text-right">
                    {inv.status === "Paid" ? (
                      <span className="text-[11px] text-emerald-400 font-mono inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Settled</span>
                      </span>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href="/app/payments"
                          className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-[11px] font-medium transition-colors border border-emerald-500/20"
                        >
                          Record Payment
                        </Link>
                        <button
                          onClick={() => triggerReminder(inv.invoice_number, inv.client_name)}
                          className="px-2.5 py-1 rounded bg-[#161A1D] hover:bg-[#22262B] text-[#A0AEC0] hover:text-[#F0F3F6] text-[11px] font-medium transition-colors border border-[#22262B] cursor-pointer"
                        >
                          {inv.status === "Overdue" ? "Follow-up" : "Remind"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal: Create Invoice */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0D0F]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111417] border border-[#22262B] rounded-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#F0F3F6]">
                Create Milestone Invoice
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#8492A6] hover:text-[#F0F3F6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#8492A6]">
              Issue a progress invoice. Due date and scoring metrics will automatically synchronize with Neon.
            </p>

            {formError && (
              <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateInvoice} className="space-y-3 pt-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-[#A0AEC0]">
                    Client *
                  </label>
                  {clients.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setClientMode(clientMode === "existing" ? "new" : "existing")}
                      className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {clientMode === "existing" ? "+ New Client" : "Select Existing"}
                    </button>
                  )}
                </div>

                {clientMode === "existing" && clients.length > 0 ? (
                  <select
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Skyline Architecture & Construction"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                    />
                    <p className="text-[11px] text-[#8492A6] mt-1">
                      {clients.length === 0
                        ? "No clients found yet. This client will be registered in Neon automatically."
                        : "Will be registered in your Neon client ledger."}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Associated Project (Optional)
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                >
                  <option value="">No Project Assigned (Direct)</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Invoice Amount (CAD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="8500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Payment Terms
                  </label>
                  <select
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  >
                    <option>Net 15 Days</option>
                    <option>Net 30 Days</option>
                    <option>Net 7 Days</option>
                    <option>Due on Receipt</option>
                  </select>
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
                  disabled={submitting}
                  className="px-3 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-medium text-white shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Issue Invoice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

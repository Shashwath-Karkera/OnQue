"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Plus,
  FileText,
  CreditCard,
  Loader2,
  X,
  Send,
  AlertCircle,
  Building,
} from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = (params?.id as string) || "";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    project: any;
    milestones: any[];
    invoices: any[];
  } | null>(null);

  // Modals state
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // New Invoice Form
  const [invoiceAmount, setInvoiceAmount] = useState("");
  const [invoiceNote, setInvoiceNote] = useState("");
  const [invoiceDueDate, setInvoiceDueDate] = useState(
    new Date(Date.now() + 15 * 24 * 3600 * 1000).toISOString().split("T")[0]
  );

  // Record Payment Form
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Direct EFT / Wire");

  const loadProject = useCallback(async () => {
    if (!projectId) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      const json = await res.json();
      if (json.success) {
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load project details:", err);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

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

  // Quick action: create invoice directly on this project
  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoiceAmount || parseFloat(invoiceAmount) <= 0) {
      setFormError("Please enter a valid invoice amount.");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: data?.project?.client_id,
          projectId: data?.project?.id,
          amountCAD: parseFloat(invoiceAmount),
          dueDate: invoiceDueDate,
          issuedDate: new Date().toISOString().split("T")[0],
          notes: invoiceNote.trim() || `Milestone draw for ${data?.project?.title}`,
        }),
      });

      const resData = await res.json();
      if (resData.success) {
        setInvoiceModalOpen(false);
        setInvoiceAmount("");
        setInvoiceNote("");
        setToastMessage(`Invoice ${resData.invoice.invoice_number} created and added to project!`);
        setTimeout(() => setToastMessage(null), 4000);
        await loadProject();
      } else {
        setFormError(resData.error || "Failed to create invoice.");
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to create invoice.");
    } finally {
      setSubmitting(false);
    }
  };

  // Quick action: record payment directly for an invoice on this project
  const handleOpenPaymentModal = (invId?: string, invAmount?: number) => {
    setFormError(null);
    if (invId) {
      setSelectedInvoiceId(invId);
      setPaymentAmount(String(invAmount || ""));
    } else {
      // Pick first unpaid invoice
      const unpaid = data?.invoices?.find((i) => i.status !== "Paid");
      if (unpaid) {
        setSelectedInvoiceId(unpaid.id);
        setPaymentAmount(String(unpaid.amount_cad || ""));
      }
    }
    setPaymentModalOpen(true);
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceId) {
      setFormError("Please select an invoice to settle.");
      return;
    }
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      setFormError("Please enter a valid payment amount.");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: selectedInvoiceId,
          amountCAD: parseFloat(paymentAmount),
          paymentMethod,
          settledAt: new Date().toISOString(),
        }),
      });

      const resData = await res.json();
      if (resData.success) {
        setPaymentModalOpen(false);
        setToastMessage("Payment recorded! Invoice settled and project balance updated.");
        setTimeout(() => setToastMessage(null), 4000);
        await loadProject();
      } else {
        setFormError(resData.error || "Failed to record payment.");
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to record payment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3 text-xs text-[#8492A6]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span>Loading project details from Neon...</span>
      </div>
    );
  }

  if (!data?.project) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-lg font-semibold text-[#F0F3F6]">Project Not Found</h2>
        <p className="text-xs text-[#8492A6]">
          This project record does not exist in your Neon database or you do not have permission to view it.
        </p>
        <Link
          href="/app/projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  const project = data.project;
  const invoices = data.invoices || [];

  const contractValue = Number(project.contract_value_cad || 0);
  const paidCad = Number(project.paid_cad || 0);
  const outstanding = Math.max(0, contractValue - paidCad);
  const progressPercent = contractValue > 0 ? Math.min(100, Math.round((paidCad / contractValue) * 100)) : 0;
  const unpaidInvoices = invoices.filter((i) => i.status !== "Paid");

  return (
    <div className="space-y-8 antialiased max-w-5xl">
      {/* Toast Alert */}
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

      {/* 1. Breadcrumbs & Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#22262B]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-[#8492A6]">
            <Link
              href="/app/projects"
              className="hover:text-[#F0F3F6] flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Projects</span>
            </Link>
            <span>/</span>
            <span className="text-[#F0F3F6] font-medium truncate max-w-xs">{project.title}</span>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
              {project.title}
            </h1>
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {project.status}
            </span>
          </div>

          <p className="text-xs text-[#8492A6]">
            Client:{" "}
            <Link
              href={`/app/clients/${project.client_id}`}
              className="text-[#3B82F6] hover:underline font-medium"
            >
              {project.client_name}
            </Link>
            {" · "}Started {formatDate(project.start_date)}
            {" · "}Holdback: {project.retainage_pct || 10}%
          </p>
        </div>

        {/* Quick Project Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => {
              setFormError(null);
              setInvoiceModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Bill Client</span>
          </button>

          <button
            onClick={() => handleOpenPaymentModal()}
            disabled={unpaidInvoices.length === 0}
            className="px-3.5 py-2 rounded-md bg-[#161A1D] hover:bg-[#20252B] border border-[#22262B] text-xs font-medium text-[#F0F3F6] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Record Payment</span>
          </button>
        </div>
      </div>

      {/* 2. Simplified Financial Progress Card */}
      <div className="p-6 rounded-xl bg-[#111417] border border-[#22262B] space-y-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
            Project Financial Overview
          </h2>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            {progressPercent}% Paid
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-[#0B0D0F] h-3 rounded-full overflow-hidden border border-[#22262B] p-0.5">
            <div
              style={{ width: `${progressPercent}%` }}
              className="bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#8492A6]">
            <span>$0</span>
            <span>Contract Total: {formatCAD(contractValue)}</span>
          </div>
        </div>

        {/* 3 Clear Stat Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#22262B]">
          <div className="p-3.5 rounded-lg bg-[#0B0D0F] border border-[#22262B]">
            <div className="text-xs text-[#8492A6]">Contract Total</div>
            <div className="text-xl font-bold text-[#F0F3F6] font-mono mt-1">
              {formatCAD(contractValue)}
            </div>
            <div className="text-[11px] text-[#8492A6] mt-0.5">Agreed contract sum</div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#0B0D0F] border border-[#22262B]">
            <div className="text-xs text-[#8492A6]">Total Paid to Date</div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
              {formatCAD(paidCad)}
            </div>
            <div className="text-[11px] text-emerald-400/80 mt-0.5">Cleared remittances</div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#0B0D0F] border border-[#22262B]">
            <div className="text-xs text-[#8492A6]">Balance Remaining</div>
            <div className="text-xl font-bold text-blue-400 font-mono mt-1">
              {formatCAD(outstanding)}
            </div>
            <div className="text-[11px] text-blue-400/80 mt-0.5">Outstanding to collect</div>
          </div>
        </div>
      </div>

      {/* 3. Single, Unified Project Invoices & Billing Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-[#F0F3F6]">
              Project Invoices & Payments
            </h2>
            <p className="text-xs text-[#8492A6] mt-0.5">
              All progress draws and milestones issued for this specific project.
            </p>
          </div>

          <button
            onClick={() => {
              setFormError(null);
              setInvoiceModalOpen(true);
            }}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Draw</span>
          </button>
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#22262B] text-[#8492A6] bg-[#0E1114]">
                <th className="py-3 px-4 font-medium">Invoice #</th>
                <th className="py-3 px-4 font-medium">Description / Draw</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium">Due Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#22262B]">
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8492A6]">
                    <div className="max-w-sm mx-auto space-y-3">
                      <FileText className="w-6 h-6 text-[#555E6C] mx-auto" />
                      <p>No invoices billed for this project yet.</p>
                      <button
                        onClick={() => {
                          setFormError(null);
                          setInvoiceModalOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium"
                      >
                        Create First Invoice
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#161A1D]/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-[#F0F3F6]">
                      <Link
                        href={`/app/invoices/${inv.id}`}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {inv.invoice_number}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 text-[#A0AEC0]">
                      {inv.notes || "Progress milestone draw"}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-[#F0F3F6]">
                      {formatCAD(inv.amount_cad)}
                    </td>
                    <td className="py-3.5 px-4 text-[#8492A6] font-mono">
                      {formatDate(inv.due_date)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                          inv.status === "Paid"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : inv.status === "Pending"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
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
                        <button
                          onClick={() => handleOpenPaymentModal(inv.id, Number(inv.amount_cad))}
                          className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          Record Payment
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Create Invoice directly for this project */}
      {invoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0D0F]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111417] border border-[#22262B] rounded-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#22262B]">
              <h3 className="text-sm font-semibold text-[#F0F3F6]">
                Bill Client for {project.title}
              </h3>
              <button
                onClick={() => setInvoiceModalOpen(false)}
                className="text-[#8492A6] hover:text-[#F0F3F6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateInvoice} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Client
                </label>
                <input
                  type="text"
                  disabled
                  value={project.client_name}
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F]/70 border border-[#22262B] text-xs text-[#8492A6]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Invoice Amount (CAD) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555E6C] text-xs">$</span>
                  <input
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    placeholder="e.g. 15000"
                    value={invoiceAmount}
                    onChange={(e) => setInvoiceAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Draw Description / Milestone Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Draw 1: Mobilization & Substructure Complete"
                  value={invoiceNote}
                  onChange={(e) => setInvoiceNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={invoiceDueDate}
                  onChange={(e) => setInvoiceDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#22262B]">
                <button
                  type="button"
                  onClick={() => setInvoiceModalOpen(false)}
                  className="px-3 py-1.5 rounded-md border border-[#22262B] text-xs text-[#8492A6] hover:text-[#F0F3F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium flex items-center gap-1.5 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Create Invoice</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Record Payment for this project's invoices */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0D0F]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111417] border border-[#22262B] rounded-xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#22262B]">
              <h3 className="text-sm font-semibold text-[#F0F3F6]">
                Record Payment for {project.title}
              </h3>
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="text-[#8492A6] hover:text-[#F0F3F6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleRecordPayment} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Select Unpaid Invoice *
                </label>
                <select
                  value={selectedInvoiceId}
                  onChange={(e) => {
                    setSelectedInvoiceId(e.target.value);
                    const inv = invoices.find((i) => i.id === e.target.value);
                    if (inv) setPaymentAmount(String(inv.amount_cad));
                  }}
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                >
                  <option value="">-- Choose an invoice --</option>
                  {unpaidInvoices.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.invoice_number} ({formatCAD(i.amount_cad)} - {i.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Amount Received (CAD) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555E6C] text-xs">$</span>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="1"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Payment Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                >
                  <option>Direct EFT / Wire</option>
                  <option>Interac e-Transfer</option>
                  <option>Certified Cheque</option>
                  <option>Progress Draw Escrow</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#22262B]">
                <button
                  type="button"
                  onClick={() => setPaymentModalOpen(false)}
                  className="px-3 py-1.5 rounded-md border border-[#22262B] text-xs text-[#8492A6] hover:text-[#F0F3F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium flex items-center gap-1.5 disabled:opacity-50"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Confirm Payment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

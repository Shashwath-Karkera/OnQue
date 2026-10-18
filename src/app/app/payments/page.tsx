"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { Plus, CheckCircle2, X, Loader2 } from "lucide-react";

interface PaymentRecord {
  id: string;
  client_id: string;
  client_name: string;
  invoice_id: string;
  invoice_number: string;
  amount_cad: number;
  payment_method: string;
  settlement_status: string;
  transaction_ref: string | null;
  settled_at: string;
}

interface InvoiceOption {
  id: string;
  invoice_number: string;
  client_id: string;
  client_name: string;
  amount_cad: number;
  status: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [invoices, setInvoices] = useState<InvoiceOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("");
  const [amountCAD, setAmountCAD] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentMethod, setPaymentMethod] = useState("Direct EFT / Wire");
  const [transactionRef, setTransactionRef] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const fetchPayments = useCallback(async () => {
    try {
      const res = await fetch("/api/payments");
      const data = await res.json();
      if (data.success && Array.isArray(data.payments)) {
        setPayments(data.payments);
      }
    } catch (err) {
      console.error("Failed to load payments:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchInvoices = useCallback(async () => {
    try {
      const res = await fetch("/api/invoices");
      const data = await res.json();
      if (data.success && Array.isArray(data.invoices)) {
        setInvoices(data.invoices);
        // Default to first pending or overdue invoice if available
        const openInv = data.invoices.find(
          (i: any) => i.status === "Pending" || i.status === "Overdue"
        );
        if (openInv) {
          setSelectedInvoiceId(openInv.id);
          setAmountCAD(String(openInv.amount_cad));
        } else if (data.invoices.length > 0) {
          setSelectedInvoiceId(data.invoices[0].id);
          setAmountCAD(String(data.invoices[0].amount_cad));
        }
      }
    } catch (err) {
      console.error("Failed to load invoices for payment selection:", err);
    }
  }, []);

  useEffect(() => {
    fetchPayments();
    fetchInvoices();
  }, [fetchPayments, fetchInvoices]);

  const handleSelectInvoice = (invId: string) => {
    setSelectedInvoiceId(invId);
    const matched = invoices.find((i) => i.id === invId);
    if (matched) {
      setAmountCAD(String(matched.amount_cad));
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoiceId) {
      setFormError("Please select an invoice to settle.");
      return;
    }
    if (!amountCAD || parseFloat(amountCAD) <= 0) {
      setFormError("Please enter a valid amount.");
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
          amountCAD: parseFloat(amountCAD),
          paymentMethod,
          transactionRef: transactionRef.trim() || undefined,
          settledAt: paymentDate ? new Date(paymentDate).toISOString() : new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        setToastMessage("Payment recorded in Neon. Invoice marked settled and client reliability index recalculated.");
        setTimeout(() => setToastMessage(null), 4500);
        await Promise.all([fetchPayments(), fetchInvoices()]);
      } else {
        setFormError(data.error || "Failed to record payment.");
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to record payment.");
    } finally {
      setSubmitting(false);
    }
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

  // Top metric calculations
  const totalSettled = payments.reduce(
    (acc, p) => acc + (p.settlement_status === "Completed" ? Number(p.amount_cad || 0) : 0),
    0
  );

  const pendingDisbursements = invoices
    .filter((i) => i.status === "Pending")
    .reduce((acc, i) => acc + Number(i.amount_cad || 0), 0);

  const overdueBalance = invoices
    .filter((i) => i.status === "Overdue")
    .reduce((acc, i) => acc + Number(i.amount_cad || 0), 0);

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

      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#22262B]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
            Payments
          </h1>
          <p className="text-xs text-[#8492A6] mt-1">
            Settlement records, incoming remittances, and payment ledger entries stored in Neon.
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
          <span>Record Payment</span>
        </button>
      </div>

      {/* 2. Top Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Total Settled Remittances</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] font-mono mt-1">
            {formatCAD(totalSettled)}
          </div>
          <div className="text-[11px] text-emerald-400 mt-0.5">
            {payments.length} verified remittances
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Pending Clearance</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] font-mono mt-1">
            {formatCAD(pendingDisbursements)}
          </div>
          <div className="text-[11px] text-[#8492A6] mt-0.5">
            Active milestone draws awaiting payment
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Overdue Balance</div>
          <div className="text-2xl font-semibold text-rose-400 font-mono mt-1">
            {formatCAD(overdueBalance)}
          </div>
          <div className="text-[11px] text-rose-400/80 mt-0.5">
            Invoices matured beyond agreed grace period
          </div>
        </div>
      </div>

      {/* 3. Payment History Ledger Table */}
      <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-[#22262B] text-[#8492A6] bg-[#0E1114]">
              <th className="py-3 px-4 font-medium">Payment ID</th>
              <th className="py-3 px-4 font-medium">Client</th>
              <th className="py-3 px-4 font-medium">Linked Invoice</th>
              <th className="py-3 px-4 font-medium">Amount</th>
              <th className="py-3 px-4 font-medium">Settled Date</th>
              <th className="py-3 px-4 font-medium">Method</th>
              <th className="py-3 px-4 font-medium">Reference</th>
              <th className="py-3 px-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#22262B]">
            {loading ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-xs text-[#8492A6]">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span>Loading payment ledger from Neon...</span>
                  </div>
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-xs text-[#8492A6]">
                  No remittance records found. Use &quot;Record Payment&quot; above to log a receipt.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-[#161A1D]/60 transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono text-[#8492A6]">
                    {p.id.slice(0, 8)}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                    {p.client_name}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#A0AEC0]">
                    {p.invoice_number || "Invoice Settled"}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-400 font-mono">
                    {formatCAD(p.amount_cad)}
                  </td>
                  <td className="py-3.5 px-4 text-[#8492A6]">{formatDate(p.settled_at)}</td>
                  <td className="py-3.5 px-4 text-[#8492A6]">{p.payment_method}</td>
                  <td className="py-3.5 px-4 text-[#8492A6] font-mono">
                    {p.transaction_ref || "-"}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {p.settlement_status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Record Payment Form Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0D0F]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111417] border border-[#22262B] rounded-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#F0F3F6]">
                Record Received Payment
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#8492A6] hover:text-[#F0F3F6]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#8492A6]">
              Recording a payment updates the invoice status to Paid, recalculates the client&apos;s PRI index, and reduces outstanding exposure.
            </p>

            {formError && (
              <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleRecordPayment} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Linked Invoice *
                </label>
                <select
                  value={selectedInvoiceId}
                  onChange={(e) => handleSelectInvoice(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                >
                  {invoices.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.invoice_number} - {inv.client_name} ({formatCAD(inv.amount_cad)} · {inv.status})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Amount (CAD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={amountCAD}
                    onChange={(e) => setAmountCAD(e.target.value)}
                    placeholder="6400"
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Settlement Date
                  </label>
                  <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
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
                  <option>Certified Check</option>
                  <option>Credit Card (Stripe)</option>
                  <option>Direct Deposit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Reference / Memo (Optional)
                </label>
                <input
                  type="text"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder="e.g. Wire Confirmation #98231 or Check #402"
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                />
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
                  <span>Confirm Settlement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

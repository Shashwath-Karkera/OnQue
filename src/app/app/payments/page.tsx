"use client";

import * as React from "react";
import { useState } from "react";
import { Plus, CheckCircle2, X } from "lucide-react";

interface PaymentRecord {
  id: string;
  client: string;
  invoice: string;
  amount: string;
  paymentDate: string;
  method: string;
  status: "Completed" | "Pending Clearing";
  notes?: string;
}

const PAYMENTS: PaymentRecord[] = [
  {
    id: "REM-8491",
    client: "Northstar Renovations",
    invoice: "INV-2024-041",
    amount: "$12,400",
    paymentDate: "Oct 13, 2024",
    method: "Direct EFT Transfer",
    status: "Completed",
    notes: "Milestone 2 sign-off funds",
  },
  {
    id: "REM-8420",
    client: "Apex Construction Group",
    invoice: "INV-2024-039",
    amount: "$8,400",
    paymentDate: "Sep 30, 2024",
    method: "Direct Wire",
    status: "Completed",
    notes: "Framing phase settlement",
  },
  {
    id: "REM-8390",
    client: "Crestview Custom Builders",
    invoice: "INV-2024-028",
    amount: "$14,000",
    paymentDate: "Sep 14, 2024",
    method: "Direct EFT Transfer",
    status: "Completed",
    notes: "Deposit release",
  },
  {
    id: "REM-8311",
    client: "Northstar Renovations",
    invoice: "INV-2024-025",
    amount: "$8,000",
    paymentDate: "Aug 22, 2024",
    method: "Direct EFT Transfer",
    status: "Completed",
    notes: "Subcontract draw #1",
  },
];

export default function PaymentsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(false);
    setToastMessage("Payment recorded successfully and client balance updated.");
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Toast */}
      {toastMessage && (
        <div className="p-3 rounded-md bg-[#161A1D] border border-[#22262B] text-xs text-[#F0F3F6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
            Settlement records, incoming remittances, and payment ledger entries.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record Payment</span>
        </button>
      </div>

      {/* 2. Top Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Total Received (MTD)</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] font-mono mt-1">
            $42,800
          </div>
          <div className="text-[11px] text-emerald-400 mt-0.5">
            +18% from last month
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Pending Clearance</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] font-mono mt-1">
            $8,400
          </div>
          <div className="text-[11px] text-[#8492A6] mt-0.5">
            2 pending disbursements
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Overdue Balance</div>
          <div className="text-2xl font-semibold text-rose-400 font-mono mt-1">
            $6,800
          </div>
          <div className="text-[11px] text-rose-400/80 mt-0.5">
            1 invoice over Net 15 terms
          </div>
        </div>
      </div>

      {/* 3. Payment History Ledger Table */}
      <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-[#22262B] text-[#8492A6] bg-[#0E1114]">
              <th className="py-3 px-4 font-medium">Receipt #</th>
              <th className="py-3 px-4 font-medium">Client</th>
              <th className="py-3 px-4 font-medium">Invoice</th>
              <th className="py-3 px-4 font-medium">Amount</th>
              <th className="py-3 px-4 font-medium">Payment Date</th>
              <th className="py-3 px-4 font-medium">Method</th>
              <th className="py-3 px-4 font-medium">Notes</th>
              <th className="py-3 px-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#22262B]">
            {PAYMENTS.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-[#161A1D]/60 transition-colors"
              >
                <td className="py-3.5 px-4 font-mono text-[#8492A6]">{p.id}</td>
                <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                  {p.client}
                </td>
                <td className="py-3.5 px-4 font-mono text-[#A0AEC0]">
                  {p.invoice}
                </td>
                <td className="py-3.5 px-4 font-semibold text-emerald-400 font-mono">
                  {p.amount}
                </td>
                <td className="py-3.5 px-4 text-[#8492A6]">{p.paymentDate}</td>
                <td className="py-3.5 px-4 text-[#8492A6]">{p.method}</td>
                <td className="py-3.5 px-4 text-[#8492A6]">{p.notes || "—"}</td>
                <td className="py-3.5 px-4 text-right">
                  <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
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
            <form onSubmit={handleRecordPayment} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Client *
                </label>
                <select className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6]">
                  <option>Northstar Renovations</option>
                  <option>Apex Construction Group</option>
                  <option>Summit Commercial Fitouts</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Linked Invoice
                  </label>
                  <input
                    type="text"
                    placeholder="INV-2024-049"
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Amount ($) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="6400"
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Payment Method
                  </label>
                  <select className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6]">
                    <option>Direct EFT / Wire</option>
                    <option>Interac e-Transfer</option>
                    <option>Certified Check</option>
                    <option>Credit Card (Stripe)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  placeholder="Optional reference number or check memo..."
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22262B]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded-md border border-[#22262B] text-xs font-medium text-[#8492A6] hover:text-[#F0F3F6]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-medium text-white shadow-sm"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

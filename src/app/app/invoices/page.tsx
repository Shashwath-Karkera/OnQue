"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  ArrowRight,
  Send,
  CheckCircle2,
  X,
} from "lucide-react";

interface InvoiceRecord {
  id: string;
  client: string;
  project: string;
  amount: string;
  issueDate: string;
  dueDate: string;
  status: "Draft" | "Pending" | "Paid" | "Overdue";
}

const INVOICES: InvoiceRecord[] = [
  {
    id: "INV-2024-049",
    client: "Northstar Renovations",
    project: "Bay Street Office Fit-out",
    amount: "$6,400",
    issueDate: "Oct 18, 2024",
    dueDate: "Nov 02, 2024",
    status: "Pending",
  },
  {
    id: "INV-2024-045",
    client: "Summit Commercial Fitouts",
    project: "Vaughan Logistics Hub",
    amount: "$15,200",
    issueDate: "Oct 16, 2024",
    dueDate: "Nov 01, 2024",
    status: "Pending",
  },
  {
    id: "INV-2024-041",
    client: "Northstar Renovations",
    project: "Bay Street Office Fit-out",
    amount: "$12,400",
    issueDate: "Sep 29, 2024",
    dueDate: "Oct 14, 2024",
    status: "Paid",
  },
  {
    id: "INV-2024-039",
    client: "Apex Construction Group",
    project: "Mississauga Plaza Framing",
    amount: "$8,400",
    issueDate: "Sep 15, 2024",
    dueDate: "Oct 02, 2024",
    status: "Paid",
  },
  {
    id: "INV-2024-032",
    client: "Vanguard Properties Ltd.",
    project: "Etobicoke Residential Block",
    amount: "$6,800",
    issueDate: "Sep 04, 2024",
    dueDate: "Sep 18, 2024",
    status: "Overdue",
  },
  {
    id: "INV-2024-052",
    client: "Crestview Custom Builders",
    project: "Oakville Estate Drywall",
    amount: "$9,200",
    issueDate: "Oct 20, 2024",
    dueDate: "Nov 05, 2024",
    status: "Draft",
  },
];

export default function InvoicesListPage() {
  const [activeTab, setActiveTab] = useState<
    "All" | "Draft" | "Pending" | "Paid" | "Overdue"
  >("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = INVOICES.filter((inv) => {
    const matchesTab = activeTab === "All" || inv.status === activeTab;
    const matchesSearch =
      inv.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.project.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const triggerReminder = (invId: string, clientName: string) => {
    setToastMessage(`Notice sent to ${clientName} for invoice ${invId}`);
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
            Invoices
          </h1>
          <p className="text-xs text-[#8492A6] mt-1">
            Track milestone draws, payment status, and dispatch formal notices.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Create Invoice</span>
        </button>
      </div>

      {/* 2. Tabs: All, Draft, Pending, Paid, Overdue */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1 bg-[#111417] border border-[#22262B] p-1 rounded-md text-xs font-medium">
          {(["All", "Draft", "Pending", "Paid", "Overdue"] as const).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded transition-colors ${
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

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#555E6C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search invoice or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-md bg-[#111417] border border-[#22262B] text-xs text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
      </div>

      {/* 3. Clean Invoices Data Table */}
      <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-[#22262B] text-[#8492A6] bg-[#0E1114]">
              <th className="py-3 px-4 font-medium">Invoice</th>
              <th className="py-3 px-4 font-medium">Client</th>
              <th className="py-3 px-4 font-medium">Project</th>
              <th className="py-3 px-4 font-medium">Amount</th>
              <th className="py-3 px-4 font-medium">Issue Date</th>
              <th className="py-3 px-4 font-medium">Due Date</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#22262B]">
            {filtered.map((inv) => (
              <tr
                key={inv.id}
                className="hover:bg-[#161A1D]/60 transition-colors group"
              >
                <td className="py-3.5 px-4 font-mono font-medium text-[#F0F3F6]">
                  {inv.id}
                </td>
                <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                  {inv.client}
                </td>
                <td className="py-3.5 px-4 text-[#A0AEC0]">{inv.project}</td>
                <td className="py-3.5 px-4 font-semibold text-[#F0F3F6] font-mono">
                  {inv.amount}
                </td>
                <td className="py-3.5 px-4 text-[#8492A6]">{inv.issueDate}</td>
                <td className="py-3.5 px-4 text-[#8492A6]">{inv.dueDate}</td>
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
                  {inv.status === "Overdue" ? (
                    <button
                      onClick={() => triggerReminder(inv.id, inv.client)}
                      className="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-medium transition-colors border border-rose-500/20"
                    >
                      Follow-up
                    </button>
                  ) : inv.status === "Pending" ? (
                    <button
                      onClick={() => triggerReminder(inv.id, inv.client)}
                      className="px-2.5 py-1 rounded bg-[#161A1D] hover:bg-[#22262B] text-[#A0AEC0] hover:text-[#F0F3F6] text-[11px] font-medium transition-colors border border-[#22262B]"
                    >
                      Remind
                    </button>
                  ) : (
                    <span className="text-[11px] text-[#555E6C]">Settled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-[#8492A6]">
            No invoices found matching current filter.
          </div>
        )}
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
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Client
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
                    Invoice Amount ($)
                  </label>
                  <input
                    type="number"
                    placeholder="8500"
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Payment Terms
                  </label>
                  <select className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6]">
                    <option>Net 15 Days</option>
                    <option>Net 30 Days</option>
                    <option>Due on Receipt</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#22262B]">
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1.5 rounded-md border border-[#22262B] text-xs font-medium text-[#8492A6] hover:text-[#F0F3F6]"
              >
                Cancel
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-3 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-medium text-white shadow-sm"
              >
                Issue Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

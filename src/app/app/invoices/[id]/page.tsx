"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MOCK_INVOICES, Invoice, MOCK_CLIENTS } from "@/lib/mock-data";

export default function InvoiceDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const invoice: Invoice =
    MOCK_INVOICES.find((i) => i.id === id) || MOCK_INVOICES[0];
  const client =
    MOCK_CLIENTS.find((c) => c.id === invoice.clientId) || MOCK_CLIENTS[0];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/app/invoices" className="hover:text-amber-700 flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" />
          <span>Invoices</span>
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">{invoice.id}</span>
      </div>

      {/* Invoice Overview Card */}
      <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-[0_2px_16px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Invoice {invoice.id}
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold ${
                  invoice.status === "Paid"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : invoice.status === "Pending"
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {invoice.status}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Project: <span className="text-slate-900 font-medium">{invoice.projectName}</span> • Milestone: {invoice.milestone}
            </p>
          </div>

          <div className="flex items-center gap-6 bg-slate-50 px-6 py-3.5 rounded-xl border border-slate-200/90 shrink-0 shadow-2xs">
            <div>
              <div className="text-xs text-slate-500">Amount Due</div>
              <div className="text-3xl font-bold font-mono text-slate-900">
                ${invoice.amountCAD.toLocaleString()} CAD
              </div>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div>
              <div className="text-xs text-slate-500">Due Date</div>
              <div className="text-base font-bold font-mono text-amber-800">
                {invoice.dueDate}
              </div>
            </div>
          </div>
        </div>

        {/* Client Risk Snapshot */}
        <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-amber-900 text-xs">
              NR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">{client.name}</span>
                <span className="text-xs text-emerald-700 font-mono font-medium">
                  Reliability: {client.score}/100 ({client.riskBand})
                </span>
              </div>
              <div className="text-xs text-slate-500">
                Avg delay: {client.avgPaymentDelayDays} days • {client.paidOnTime} of {client.totalInvoices} invoices paid on time
              </div>
            </div>
          </div>

          <Link href={`/app/clients/${client.id}`}>
            <Button size="sm" variant="outline" className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs h-8 shadow-2xs">
              Client Intelligence Profile →
            </Button>
          </Link>
        </div>

        {/* Automated Reminders Schedule */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <span>Automated Reminders Dispatch Sequence</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">Multi-Channel Active</span>
          </div>

          <div className="space-y-2.5">
            {invoice.remindersSent.map((rem, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-mono text-amber-700 font-semibold shadow-2xs">
                    0{idx + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{rem.stage}</div>
                    <div className="text-xs text-slate-500">
                      Dispatched on <span className="font-mono text-slate-700 font-medium">{rem.date}</span> via {rem.channel}
                    </div>
                  </div>
                </div>

                <span className="text-xs font-mono px-2.5 py-1 rounded bg-white text-slate-700 border border-slate-200 shadow-2xs">
                  {rem.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Calendar,
  Building,
  DollarSign,
  FileText,
} from "lucide-react";

export default function InvoiceDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    invoice: any;
    client: any;
    project: any;
  } | null>(null);

  useEffect(() => {
    async function loadInvoice() {
      if (!id) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/invoices/${id}`);
        const json = await res.json();
        if (json.success) {
          setData(json);
        }
      } catch (err) {
        console.error("Failed to load invoice:", err);
      } finally {
        setLoading(false);
      }
    }
    loadInvoice();
  }, [id]);

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
        <span>Loading invoice details and ledger entry from Neon...</span>
      </div>
    );
  }

  if (!data?.invoice) {
    return (
      <div className="py-24 text-center space-y-4">
        <h2 className="text-lg font-semibold text-[#F0F3F6]">Invoice Not Found</h2>
        <p className="text-xs text-[#8492A6]">
          This invoice record does not exist in your Neon database or you do not have permission to view it.
        </p>
        <Link
          href="/app/invoices"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Invoices</span>
        </Link>
      </div>
    );
  }

  const { invoice, client, project } = data;

  return (
    <div className="space-y-8 antialiased">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#8492A6]">
        <Link href="/app/invoices" className="hover:text-[#F0F3F6] flex items-center gap-1 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Invoices</span>
        </Link>
        <span>/</span>
        <span className="text-[#F0F3F6] font-medium">{invoice.invoice_number}</span>
      </div>

      {/* Invoice Overview Card */}
      <div className="rounded-xl border border-white/10 bg-gradient-to-b from-[#141820]/90 to-[#0E1117] p-6 sm:p-8 shadow-xl backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#22262B]">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-semibold text-[#F0F3F6] tracking-tight font-mono">
                {invoice.invoice_number}
              </h1>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  invoice.status === "Paid"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : invoice.status === "Pending"
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {invoice.status}
              </span>
            </div>
            <p className="text-xs text-[#8492A6] mt-1.5">
              Project:{" "}
              {project ? (
                <Link href={`/app/projects/${project.id}`} className="text-blue-400 hover:underline">
                  {project.title}
                </Link>
              ) : (
                <span className="text-[#F0F3F6] font-medium">Direct Client Milestone</span>
              )}
              {invoice.notes ? ` · ${invoice.notes}` : ""}
            </p>
          </div>

          <div className="flex items-center gap-6 bg-[#0B0D0F] px-6 py-4 rounded-xl border border-[#22262B] shrink-0">
            <div>
              <div className="text-xs text-[#8492A6]">Amount Due</div>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#F0F3F6]">
                {formatCAD(invoice.amount_cad)}
              </div>
            </div>
            <div className="h-10 w-px bg-[#22262B]" />
            <div>
              <div className="text-xs text-[#8492A6]">Due Date</div>
              <div className="text-sm sm:text-base font-semibold font-mono text-blue-400">
                {formatDate(invoice.due_date)}
              </div>
            </div>
          </div>
        </div>

        {/* Client Risk Snapshot */}
        {client && (
          <div className="my-6 p-4 rounded-xl bg-[#0B0D0F] border border-[#22262B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-bold text-blue-400 text-xs font-mono">
                {client.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#F0F3F6]">{client.name}</span>
                  <span className="text-xs text-emerald-400 font-mono font-medium">
                    Reliability: {client.score}/100 ({client.risk_band})
                  </span>
                </div>
                <div className="text-xs text-[#8492A6] mt-0.5">
                  Industry: {client.trade_type} · Location: {client.location}
                </div>
              </div>
            </div>

            <Link
              href={`/app/clients/${client.id}`}
              className="px-3.5 py-1.5 rounded-md bg-[#161A1D] hover:bg-[#22262B] border border-white/10 text-xs font-medium text-[#F0F3F6] transition-colors"
            >
              Client Intelligence Profile →
            </Link>
          </div>
        )}

        {/* Invoice Lifecycle Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-[#0B0D0F] border border-[#22262B]">
            <div className="text-xs text-[#8492A6]">Issued Date</div>
            <div className="text-sm font-medium text-[#F0F3F6] mt-1 font-mono">
              {formatDate(invoice.issued_date)}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#0B0D0F] border border-[#22262B]">
            <div className="text-xs text-[#8492A6]">Settlement Delay Track</div>
            <div className="text-sm font-medium text-[#F0F3F6] mt-1 font-mono">
              {invoice.delay_days > 0 ? (
                <span className="text-rose-400">+{invoice.delay_days} days overdue</span>
              ) : (
                <span className="text-emerald-400">On schedule</span>
              )}
            </div>
          </div>
          <div className="p-4 rounded-lg bg-[#0B0D0F] border border-[#22262B]">
            <div className="text-xs text-[#8492A6]">Neon Sync Status</div>
            <div className="text-sm font-medium text-emerald-400 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Ledger Row</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

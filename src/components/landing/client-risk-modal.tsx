"use client";

import * as React from "react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, CheckCircle2 } from "lucide-react";
import { MOCK_CLIENTS, Client } from "@/lib/mock-data";
import Link from "next/link";

interface ClientRiskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClientRiskModal({ open, onOpenChange }: ClientRiskModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client>(MOCK_CLIENTS[0]);

  const filteredClients = MOCK_CLIENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.trade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-white border border-slate-200 text-slate-800 p-0 overflow-hidden shadow-2xl rounded-2xl">
        <DialogHeader className="p-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 font-semibold">
              Payment Intelligence Engine
            </span>
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900 tracking-tight">
            Check Client Payment Reliability
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Search verified Canadian commercial contractors and project owners to view historical payment behavior.
          </DialogDescription>

          <div className="relative mt-3">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client name, trade or city (e.g. Northstar, Apex, Toronto)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
            />
          </div>
        </DialogHeader>

        {/* Quick select pills */}
        <div className="px-6 py-2.5 bg-slate-50/70 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-500 shrink-0 font-medium">Sample Profiles:</span>
          {filteredClients.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedClient(c)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors shrink-0 ${
                selectedClient.id === c.id
                  ? "bg-amber-100 text-amber-900 border border-amber-300 font-semibold"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-2xs"
              }`}
            >
              {c.name} ({c.score}/100)
            </button>
          ))}
        </div>

        {/* Selected Client Intelligence Summary */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50/70 border border-slate-200/80">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-bold text-slate-900">{selectedClient.name}</h4>
                {selectedClient.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Client
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedClient.trade} • {selectedClient.location}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-500 font-medium">Payment Reliability</div>
                <div
                  className={`text-xl font-bold font-mono ${
                    selectedClient.score >= 80
                      ? "text-emerald-600"
                      : selectedClient.score >= 60
                      ? "text-amber-600"
                      : "text-rose-600"
                  }`}
                >
                  {selectedClient.score} / 100
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${
                  selectedClient.score >= 80
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : selectedClient.score >= 60
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                {selectedClient.riskBand}
              </div>
            </div>
          </div>

          {/* Key Payment Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[11px] text-slate-500 font-medium">Recorded Invoices</div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                {selectedClient.totalInvoices}
              </div>
              <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
                {selectedClient.paidOnTime} paid on time
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[11px] text-slate-500 font-medium">Avg Payment Delay</div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                {selectedClient.avgPaymentDelayDays} days
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {selectedClient.latePayments} late invoices
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="text-[11px] text-slate-500 font-medium">Total Billed & Paid</div>
              <div className="text-lg font-bold font-mono text-slate-900 mt-0.5">
                ${selectedClient.totalPaidCAD.toLocaleString()} CAD
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                ${selectedClient.outstandingCAD.toLocaleString()} open
              </div>
            </div>
          </div>

          {/* AI Intelligence Assessment */}
          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                AI Assessment & Recommendation
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed mb-3">
              &ldquo;{selectedClient.aiVerdict}&rdquo;
            </p>

            <div className="space-y-1.5 pt-2 border-t border-amber-200/60">
              <div className="text-[11px] font-semibold text-amber-900">Recommended Safeguards:</div>
              <ul className="space-y-1">
                {selectedClient.recommendedTerms.map((term, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Data sourced from trade-verified invoices across Canada
          </span>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-xs"
            >
              Close
            </Button>
            <Link href={`/app/clients/${selectedClient.id}`} onClick={() => onOpenChange(false)}>
              <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold gap-1.5 shadow-sm">
                <span>View Complete Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

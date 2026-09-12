"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  X,
} from "lucide-react";

interface ClientRecord {
  id: string;
  name: string;
  location: string;
  trade: string;
  projects: number;
  invoices: number;
  paidOnTime: string;
  avgDelay: string;
  outstanding: string;
  risk: "Low Risk" | "Medium Risk" | "High Risk";
  lastActivity: string;
}

const CLIENTS: ClientRecord[] = [
  {
    id: "1",
    name: "Northstar Renovations",
    location: "Toronto, Canada",
    trade: "General Contractor",
    projects: 5,
    invoices: 24,
    paidOnTime: "92%",
    avgDelay: "1.8 days",
    outstanding: "$6,400",
    risk: "Low Risk",
    lastActivity: "2 days ago",
  },
  {
    id: "2",
    name: "Apex Construction Group",
    location: "Mississauga, Canada",
    trade: "Commercial GC",
    projects: 4,
    invoices: 18,
    paidOnTime: "71%",
    avgDelay: "6.2 days",
    outstanding: "$12,800",
    risk: "Medium Risk",
    lastActivity: "Yesterday",
  },
  {
    id: "3",
    name: "Summit Commercial Fitouts",
    location: "Vaughan, Canada",
    trade: "Interior GC",
    projects: 3,
    invoices: 14,
    paidOnTime: "86%",
    avgDelay: "3.4 days",
    outstanding: "$15,200",
    risk: "Low Risk",
    lastActivity: "4 days ago",
  },
  {
    id: "4",
    name: "Vanguard Properties Ltd.",
    location: "Etobicoke, Canada",
    trade: "Residential Developer",
    projects: 2,
    invoices: 12,
    paidOnTime: "42%",
    avgDelay: "18.4 days",
    outstanding: "$6,800",
    risk: "High Risk",
    lastActivity: "14 days ago",
  },
  {
    id: "5",
    name: "Crestview Custom Builders",
    location: "Oakville, Canada",
    trade: "Luxury Custom Homes",
    projects: 2,
    invoices: 9,
    paidOnTime: "100%",
    avgDelay: "0.5 days",
    outstanding: "$0",
    risk: "Low Risk",
    lastActivity: "1 week ago",
  },
  {
    id: "6",
    name: "Harborpoint Developers",
    location: "Hamilton, Canada",
    trade: "Multi-family Residential",
    projects: 1,
    invoices: 6,
    paidOnTime: "66%",
    avgDelay: "9.1 days",
    outstanding: "$9,500",
    risk: "Medium Risk",
    lastActivity: "3 days ago",
  },
];

export default function ClientsListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");

  const filtered = CLIENTS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.trade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk =
      riskFilter === "All" || c.risk.toLowerCase().includes(riskFilter.toLowerCase());
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-8">
      {/* 1. Header & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#22262B]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
            Clients
          </h1>
          <p className="text-xs text-[#8492A6] mt-1">
            Manage clients and understand their payment behavior.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ Add Client</span>
        </button>
      </div>

      {/* 2. Search & Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-[#555E6C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clients..."
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
              className={`px-3 py-1 rounded transition-colors ${
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

      {/* 3. Professional Data Table (Primary UI pattern) */}
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
            {filtered.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-[#161A1D]/60 transition-colors group"
              >
                <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                  <Link
                    href={`/app/clients/${client.id}`}
                    className="hover:text-[#3B82F6] transition-colors"
                  >
                    <div>{client.name}</div>
                    <div className="text-[11px] text-[#8492A6] font-normal">
                      {client.trade} · {client.location}
                    </div>
                  </Link>
                </td>
                <td className="py-3.5 px-4 text-[#A0AEC0]">{client.projects}</td>
                <td className="py-3.5 px-4 text-[#A0AEC0]">{client.invoices}</td>
                <td className="py-3.5 px-4 font-mono font-medium">
                  <span
                    className={
                      parseInt(client.paidOnTime) >= 85
                        ? "text-emerald-400"
                        : parseInt(client.paidOnTime) >= 70
                        ? "text-amber-400"
                        : "text-rose-400"
                    }
                  >
                    {client.paidOnTime}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#8492A6] font-mono">
                  {client.avgDelay}
                </td>
                <td className="py-3.5 px-4 font-mono text-[#F0F3F6] font-semibold">
                  {client.outstanding}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                      client.risk === "Low Risk"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : client.risk === "Medium Risk"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    }`}
                  >
                    {client.risk}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[#8492A6]">{client.lastActivity}</td>
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
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-xs text-[#8492A6]">
            No clients matching your search or filter criteria.
          </div>
        )}
      </div>

      {/* Subtle Informational Disclaimer */}
      <div className="text-[11px] text-[#555E6C] leading-relaxed">
        Risk indicators are based on available payment history and are intended
        for informational purposes only. They do not guarantee future payment
        behavior.
      </div>

      {/* Simple Add Client Modal */}
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
              Add a client to track invoices, milestones, and payment reliability.
            </p>
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Client Business Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Skyline Architecture & Construction"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
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
                    placeholder="e.g. Toronto, ON"
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Industry Type
                  </label>
                  <select className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]">
                    <option>General Contractor</option>
                    <option>Commercial Developer</option>
                    <option>Residential Owner</option>
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
                onClick={() => {
                  setModalOpen(false);
                  setNewClientName("");
                }}
                className="px-3 py-1.5 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-xs font-medium text-white shadow-sm"
              >
                Save Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

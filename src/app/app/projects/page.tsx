"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight, X, Calendar } from "lucide-react";

interface ProjectRecord {
  id: string;
  name: string;
  client: string;
  value: string;
  startDate: string;
  status: "Active" | "Completed" | "Pending Contract";
  outstanding: string;
  milestones: string;
}

const PROJECTS: ProjectRecord[] = [
  {
    id: "proj-1",
    name: "Bay Street Commercial Fit-out",
    client: "Northstar Renovations",
    value: "$48,000",
    startDate: "Aug 15, 2024",
    status: "Active",
    outstanding: "$6,400",
    milestones: "3 of 4 stages completed",
  },
  {
    id: "proj-2",
    name: "Mississauga Plaza Framing & Drywall",
    client: "Apex Construction Group",
    value: "$34,500",
    startDate: "Sep 01, 2024",
    status: "Active",
    outstanding: "$12,800",
    milestones: "2 of 4 stages completed",
  },
  {
    id: "proj-3",
    name: "Vaughan Logistics Center HVAC",
    client: "Summit Commercial Fitouts",
    value: "$62,000",
    startDate: "Sep 20, 2024",
    status: "Active",
    outstanding: "$15,200",
    milestones: "1 of 5 stages completed",
  },
  {
    id: "proj-4",
    name: "Yorkville Boutique Retail Renovation",
    client: "Northstar Renovations",
    value: "$32,500",
    startDate: "May 10, 2024",
    status: "Completed",
    outstanding: "$0",
    milestones: "All stages finalized",
  },
];

export default function ProjectsListPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#22262B]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
            Projects
          </h1>
          <p className="text-xs text-[#8492A6] mt-1">
            Track contracted values, progress draws, and milestone schedules.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-3.5 py-2 rounded-md bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-medium transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ New Project</span>
        </button>
      </div>

      {/* 2. Projects Data Table (Linear style, not giant cards) */}
      <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-[#22262B] text-[#8492A6] bg-[#0E1114]">
              <th className="py-3 px-4 font-medium">Project Name</th>
              <th className="py-3 px-4 font-medium">Client</th>
              <th className="py-3 px-4 font-medium">Contract Value</th>
              <th className="py-3 px-4 font-medium">Start Date</th>
              <th className="py-3 px-4 font-medium">Milestones Progress</th>
              <th className="py-3 px-4 font-medium">Outstanding</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#22262B]">
            {PROJECTS.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-[#161A1D]/60 transition-colors group"
              >
                <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                  {p.name}
                </td>
                <td className="py-3.5 px-4 text-[#A0AEC0]">{p.client}</td>
                <td className="py-3.5 px-4 font-semibold text-[#F0F3F6] font-mono">
                  {p.value}
                </td>
                <td className="py-3.5 px-4 text-[#8492A6]">{p.startDate}</td>
                <td className="py-3.5 px-4 text-[#8492A6]">{p.milestones}</td>
                <td className="py-3.5 px-4 font-mono font-medium text-[#F0F3F6]">
                  {p.outstanding}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-medium border ${p.status === "Active"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/app/projects/${p.id}`}
                    className="text-xs text-[#3B82F6] hover:text-[#60A5FA] font-medium inline-flex items-center gap-1"
                  >
                    <span>Overview</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: New Project */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B0D0F]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111417] border border-[#22262B] rounded-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#F0F3F6]">
                Create New Project
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
                  Project Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dupont St Commercial Renovation"
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Contract Value ($)
                  </label>
                  <input
                    type="number"
                    placeholder="24000"
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6]"
                  />
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
                Initialize Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

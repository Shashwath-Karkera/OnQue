"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Plus,
  FileText,
  CreditCard,
} from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();

  const project = {
    title: "Bay Street Commercial Fit-out",
    client: "Northstar Renovations",
    clientId: "1",
    totalValue: "$48,000",
    startDate: "Aug 15, 2024",
    status: "Active",
    terms: "Net 15 Days · Milestone Escrow",
    outstanding: "$6,400",
    milestones: [
      {
        id: "M1",
        name: "Initial Mobilization & Rough-in",
        amount: "$12,000 (25%)",
        status: "Settled",
        dueDate: "Aug 20, 2024",
      },
      {
        id: "M2",
        name: "Mechanical & Electrical Inspection",
        amount: "$14,400 (30%)",
        status: "Settled",
        dueDate: "Sep 25, 2024",
      },
      {
        id: "M3",
        name: "Drywall, Taping & Prime Coat",
        amount: "$12,000 (25%)",
        status: "Settled",
        dueDate: "Oct 14, 2024",
      },
      {
        id: "M4",
        name: "Architectural Trim & Final Sign-off",
        amount: "$9,600 (20%)",
        status: "In Progress",
        dueDate: "Nov 15, 2024",
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* 1. Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-[#8492A6]">
        <Link
          href="/app/projects"
          className="hover:text-[#F0F3F6] flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Projects</span>
        </Link>
        <span>/</span>
        <span className="text-[#F0F3F6] font-medium">{project.title}</span>
      </div>

      {/* 2. Unified Project Header */}
      <div className="p-6 rounded-lg bg-[#111417] border border-[#22262B]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#22262B]">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {project.status}
              </span>
              <span className="text-xs text-[#8492A6]">
                Started {project.startDate}
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
              {project.title}
            </h1>
            <p className="text-xs text-[#8492A6] mt-1">
              Client:{" "}
              <Link
                href={`/app/clients/${project.clientId}`}
                className="text-[#3B82F6] hover:underline"
              >
                {project.client}
              </Link>
              {" · "}Terms: {project.terms}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-8">
            <div>
              <div className="text-xs text-[#8492A6]">Contract Value</div>
              <div className="text-2xl font-semibold text-[#F0F3F6] font-mono mt-1">
                {project.totalValue}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#8492A6]">Outstanding</div>
              <div className="text-2xl font-semibold text-blue-400 font-mono mt-1">
                {project.outstanding}
              </div>
            </div>
          </div>
        </div>

        {/* Milestone Schedule Table */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-[#F0F3F6] uppercase tracking-wider font-mono">
              Milestone Schedule & Billing Triggers
            </h3>
            <span className="text-xs text-[#8492A6]">
              3 of 4 stages signed off
            </span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#0B0D0F]">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#22262B] text-[#8492A6]">
                  <th className="py-2.5 px-4 font-medium">Stage</th>
                  <th className="py-2.5 px-4 font-medium">Description</th>
                  <th className="py-2.5 px-4 font-medium">Amount</th>
                  <th className="py-2.5 px-4 font-medium">Target Date</th>
                  <th className="py-2.5 px-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#22262B]/50">
                {project.milestones.map((m) => (
                  <tr key={m.id}>
                    <td className="py-3 px-4 font-mono text-[#8492A6]">{m.id}</td>
                    <td className="py-3 px-4 font-medium text-[#F0F3F6]">
                      {m.name}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#F0F3F6]">
                      {m.amount}
                    </td>
                    <td className="py-3 px-4 text-[#8492A6]">{m.dueDate}</td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-medium border ${m.status === "Settled"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}
                      >
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

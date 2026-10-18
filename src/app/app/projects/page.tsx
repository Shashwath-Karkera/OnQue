"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, ArrowRight, X, Loader2, CheckCircle2 } from "lucide-react";

interface ProjectRecord {
  id: string;
  client_id: string;
  client_name: string;
  title: string;
  contract_value_cad: number;
  paid_cad: number;
  retainage_pct: number;
  start_date: string;
  target_end_date: string;
  status: "In Progress" | "Completed" | "Pending Approval";
}

interface ClientOption {
  id: string;
  name: string;
}

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Project Form
  const [title, setTitle] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientMode, setClientMode] = useState<"existing" | "new">("existing");
  const [newClientName, setNewClientName] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString().split("T")[0]
  );
  const [retainagePct, setRetainagePct] = useState("10");
  const [formError, setFormError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadClients = useCallback(async () => {
    try {
      const res = await fetch("/api/clients");
      const data = await res.json();
      if (data.success && Array.isArray(data.clients)) {
        setClients(data.clients);
        if (data.clients.length > 0) {
          setClientId((prev) => prev || data.clients[0].id);
          setClientMode("existing");
        } else {
          setClientMode("new");
        }
      }
    } catch (err) {
      console.error("Failed to load clients:", err);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    loadClients();
  }, [fetchProjects, loadClients]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !contractValue) {
      setFormError("Project title and contract value are required.");
      return;
    }

    if (clientMode === "new" && !newClientName.trim()) {
      setFormError("Please enter a client business name.");
      return;
    }

    if (clientMode === "existing" && !clientId && clients.length === 0) {
      setFormError("No existing clients. Please switch to create a new client.");
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: clientMode === "existing" ? (clientId || (clients[0]?.id)) : undefined,
          clientName: clientMode === "new" ? newClientName.trim() : undefined,
          title: title.trim(),
          contractValueCAD: parseFloat(contractValue),
          startDate,
          targetEndDate: endDate,
          retainagePct: parseInt(retainagePct) || 10,
        }),
      });

      const data = await res.json();
      if (data.success && data.project) {
        setProjects((prev) => [data.project, ...prev]);
        setModalOpen(false);
        setTitle("");
        setNewClientName("");
        setContractValue("");
        setToastMessage(`Project "${data.project.title}" initialized and stored in Neon.`);
        setTimeout(() => setToastMessage(null), 4000);
        await Promise.all([fetchProjects(), loadClients()]);
      } else {
        setFormError(data.error || "Failed to create project.");
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to create project.");
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

  const totalContracted = projects.reduce(
    (acc, p) => acc + Number(p.contract_value_cad || 0),
    0
  );
  const activeCount = projects.filter((p) => p.status === "In Progress").length;
  const totalRetainage = projects.reduce(
    (acc, p) => acc + (Number(p.contract_value_cad || 0) * (Number(p.retainage_pct || 10) / 100)),
    0
  );

  return (
    <div className="space-y-8 antialiased">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-3.5 rounded-lg bg-[#161A1D] border border-blue-500/30 text-xs text-[#F0F3F6] flex items-center justify-between shadow-lg">
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
            Projects
          </h1>
          <p className="text-xs text-[#8492A6] mt-1">
            Contracted values, progress draws, and milestone schedules stored in Neon.
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
          <span>+ New Project</span>
        </button>
      </div>

      {/* 2. Top Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Total Contracted Portfolio</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] font-mono mt-1">
            {formatCAD(totalContracted)}
          </div>
          <div className="text-[11px] text-[#8492A6] mt-0.5">
            {projects.length} project commitments
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Active In Progress Jobs</div>
          <div className="text-2xl font-semibold text-blue-400 font-mono mt-1">
            {activeCount}
          </div>
          <div className="text-[11px] text-blue-400/80 mt-0.5">
            Under active mobilization
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#111417] border border-[#22262B]">
          <div className="text-xs text-[#8492A6]">Total Statutory Holdback</div>
          <div className="text-2xl font-semibold text-[#F0F3F6] font-mono mt-1">
            {formatCAD(totalRetainage)}
          </div>
          <div className="text-[11px] text-amber-400 mt-0.5">
            Statutory lien retainage reserve
          </div>
        </div>
      </div>

      {/* 3. Projects Data Table */}
      <div className="overflow-x-auto rounded-lg border border-[#22262B] bg-[#111417]">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-[#22262B] text-[#8492A6] bg-[#0E1114]">
              <th className="py-3 px-4 font-medium">Project Name</th>
              <th className="py-3 px-4 font-medium">Client</th>
              <th className="py-3 px-4 font-medium">Contract Value</th>
              <th className="py-3 px-4 font-medium">Start Date</th>
              <th className="py-3 px-4 font-medium">Retainage %</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#22262B]">
            {loading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-xs text-[#8492A6]">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                    <span>Loading projects from Neon...</span>
                  </div>
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-xs text-[#8492A6]">
                  No active projects found. Click &quot;+ New Project&quot; above to initialize one.
                </td>
              </tr>
            ) : (
              projects.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-[#161A1D]/60 transition-colors group"
                >
                  <td className="py-3.5 px-4 font-medium text-[#F0F3F6]">
                    <Link
                      href={`/app/projects/${p.id}`}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {p.title}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 text-[#A0AEC0]">
                    <Link
                      href={`/app/clients/${p.client_id}`}
                      className="hover:text-[#F0F3F6] transition-colors"
                    >
                      {p.client_name}
                    </Link>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#F0F3F6] font-mono">
                    {formatCAD(p.contract_value_cad)}
                  </td>
                  <td className="py-3.5 px-4 text-[#8492A6]">{formatDate(p.start_date)}</td>
                  <td className="py-3.5 px-4 font-mono text-[#8492A6]">{p.retainage_pct ?? 10}%</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-medium border ${
                        p.status === "In Progress"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : p.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
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
              ))
            )}
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
            <p className="text-xs text-[#8492A6]">
              Set up a commercial or residential contract to associate progress billing and milestones.
            </p>

            {formError && (
              <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateProject} className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dupont St Commercial Renovation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-[#A0AEC0]">
                    Client *
                  </label>
                  {clients.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setClientMode(clientMode === "existing" ? "new" : "existing")}
                      className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {clientMode === "existing" ? "+ New Client" : "Select Existing"}
                    </button>
                  )}
                </div>

                {clientMode === "existing" && clients.length > 0 ? (
                  <select
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  >
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Skyline Architecture & Construction"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                    />
                    <p className="text-[11px] text-[#8492A6] mt-1">
                      {clients.length === 0
                        ? "No clients found yet. This client will be registered in Neon automatically."
                        : "Will be registered in your Neon client ledger."}
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Contract Value (CAD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="45000"
                    value={contractValue}
                    onChange={(e) => setContractValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Retainage Holdback %
                  </label>
                  <select
                    value={retainagePct}
                    onChange={(e) => setRetainagePct(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  >
                    <option value="10">10% Standard Holdback</option>
                    <option value="5">5% Reduced Holdback</option>
                    <option value="15">15% Escrow Holdback</option>
                    <option value="0">0% No Holdback</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#A0AEC0] mb-1">
                    Target End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-md bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
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
                  <span>Initialize Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  CreditCard,
  Lightbulb,
  BarChart3,
  Bell,
  Settings,
  Menu,
  X,
  Search,
  Plus,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { OncueBrand } from "@/components/brand/oncue-brand";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const PRIMARY_NAV = [
  { label: "Overview", href: "/app", icon: LayoutDashboard },
  { label: "Clients", href: "/app/clients", icon: Users },
  { label: "Projects", href: "/app/projects", icon: Briefcase },
  { label: "Invoices", href: "/app/invoices", icon: FileText },
  { label: "Payments", href: "/app/payments", icon: CreditCard },
  { label: "Insights", href: "/app/insights", icon: Lightbulb },
  { label: "Analytics", href: "/app/analytics", icon: BarChart3 },
];

const SECONDARY_NAV = [
  { label: "Notifications", href: "/app/notifications", icon: Bell },
  { label: "Settings", href: "/app/settings", icon: Settings },
  { label: "Help & Docs", href: "/about", icon: HelpCircle },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name: string;
    role: string;
    avatar_url?: string | null;
  } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    router.push("/login");
    router.refresh();
  };

  const getInitials = (nameStr: string) => {
    if (!nameStr) return "ON";
    const parts = nameStr.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return nameStr.slice(0, 2).toUpperCase();
  };

  const isActive = (href: string) => {
    if (href === "/app") return pathname === "/app";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#F0F3F6] flex flex-col antialiased selection:bg-blue-600/30 selection:text-white">
      {/* Mobile Header */}
      <div className="md:hidden h-14 bg-[#111417] border-b border-[#22262B] px-4 flex items-center justify-between sticky top-0 z-40">
        <OncueBrand size="sm" linkHref="/app" />
        <div className="flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-[#8492A6] hover:text-rose-400 hover:bg-[#161A1D] transition-colors"
            title="Log Out"
            aria-label="Log Out"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#8492A6] hover:text-[#F0F3F6]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Desktop */}
        <aside className="hidden md:flex w-60 bg-[#111417] border-r border-[#22262B] flex-col justify-between shrink-0">
          <div className="p-4 space-y-6">
            <div className="px-2 pt-1">
              <OncueBrand size="md" linkHref="/app" withTagline={false} />
            </div>

            {/* Navigation List */}
            <nav className="space-y-0.5">
              <div className="px-2 pb-1.5 text-[11px] font-mono uppercase tracking-wider text-[#555E6C]">
                Workspace
              </div>
              {PRIMARY_NAV.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                      active
                        ? "bg-[#161A1D] text-[#F0F3F6] border border-[#22262B] shadow-sm"
                        : "text-[#8492A6] hover:text-[#F0F3F6] hover:bg-[#161A1D]/50"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        active ? "text-[#3B82F6]" : "text-[#555E6C]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Nav & User Profile */}
          <div className="p-4 border-t border-[#22262B] space-y-3">
            <nav className="space-y-0.5">
              {SECONDARY_NAV.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      active
                        ? "text-[#F0F3F6] bg-[#161A1D]"
                        : "text-[#8492A6] hover:text-[#F0F3F6]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#555E6C]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Session Pill & Full-Width Logout */}
            <div className="pt-2 border-t border-[#22262B] space-y-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-amber-500 border border-[#22262B] flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm">
                  {getInitials(user?.name || "Shashwath K")}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-[#F0F3F6] leading-none truncate">
                    {user?.name || "Shashwath K."}
                  </span>
                  <span className="text-[10px] text-[#8492A6] mt-0.5 truncate">
                    {user?.email || "contractor@oncue.ai"}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-1.5 px-3 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-[#0B0D0F]/90 backdrop-blur-sm flex flex-col">
            <div className="h-14 bg-[#111417] border-b border-[#22262B] px-4 flex items-center justify-between">
              <OncueBrand size="sm" linkHref="/app" />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[#8492A6] hover:text-[#F0F3F6]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              <nav className="space-y-1">
                {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                        active
                          ? "bg-[#161A1D] text-[#F0F3F6] border border-[#22262B]"
                          : "text-[#8492A6]"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#3B82F6]" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Drawer Logout */}
              <div className="pt-4 border-t border-[#22262B] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-amber-500 flex items-center justify-center text-xs font-bold text-white">
                    {getInitials(user?.name || "Shashwath K")}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-[#F0F3F6]">
                      {user?.name || "Shashwath K."}
                    </span>
                    <span className="text-[10px] text-[#555E6C]">
                      {user?.email || "contractor@oncue.ai"}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-medium flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content View with Top Utility Bar */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Header Bar */}
          <header className="h-14 border-b border-[#22262B] bg-[#0B0D0F]/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
            {/* Global Search */}
            <div className="relative w-72">
              <Search className="w-3.5 h-3.5 text-[#555E6C] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients, invoices, projects... (⌘K)"
                className="w-full pl-9 pr-3 py-1.5 rounded-md bg-[#111417] border border-[#22262B] text-xs text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>

            {/* Top Right Utilities */}
            <div className="flex items-center gap-3 text-xs">
              <ThemeToggle className="h-8 w-8" />
              <Link
                href="/app/clients"
                className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-medium flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Add Client</span>
              </Link>

              <Link
                href="/app/notifications"
                className="p-2 text-[#8492A6] hover:text-[#F0F3F6] relative rounded-lg hover:bg-[#161A1D] transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] absolute top-1.5 right-1.5" />
              </Link>

              {/* Prominent Dashboard Log Out Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ml-2"
                title="Log Out of ONcue"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Log Out</span>
              </button>
            </div>
          </header>

          {/* Dynamic Page Content */}
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

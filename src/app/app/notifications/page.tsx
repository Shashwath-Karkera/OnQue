"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, CheckCheck, Loader2, Bell } from "lucide-react";

interface NotificationItem {
  id: string;
  category: "Payment overdue" | "Payment received" | "Client risk changed" | "Upcoming due date";
  headline: string;
  detail: string;
  link: string;
  unread: boolean;
  created_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
      }
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAllAsRead = async () => {
    setUpdating(true);
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("notifications-updated"));
      }
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    } finally {
      setUpdating(false);
    }
  };

  const markSingleAsRead = async (id: string) => {
    try {
      fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
      );
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("notifications-updated"));
      }
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const formatRelativeTime = (dateStr: string) => {
    if (!dateStr) return "Recently";
    const date = new Date(dateStr);
    const now = new Date();
    const diffSec = Math.round((now.getTime() - date.getTime()) / 1000);
    if (diffSec < 60) return "Just now";
    const diffMin = Math.round(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.round(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-CA", { month: "short", day: "numeric" });
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="space-y-8 max-w-4xl antialiased">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#22262B]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
            Notifications
          </h1>
          <p className="text-xs text-[#8492A6] mt-1">
            Real-time payment alerts, milestone due dates, and risk changes synchronized from Neon.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#8492A6]">
            {unreadCount} unread
          </span>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              disabled={updating}
              className="px-2.5 py-1 rounded bg-[#161A1D] hover:bg-[#22262B] border border-[#22262B] text-xs text-[#F0F3F6] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Mark all read</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Notifications List */}
      <div className="divide-y divide-[#22262B] border border-[#22262B] rounded-lg bg-[#111417]">
        {loading ? (
          <div className="py-16 text-center text-xs text-[#8492A6]">
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              <span>Loading notifications from Neon...</span>
            </div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#8492A6] space-y-2">
            <Bell className="w-6 h-6 mx-auto text-[#555E6C]" />
            <p>You&apos;re completely up to date. No pending alerts.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <Link
              key={item.id}
              href={item.link || "/app"}
              onClick={() => {
                if (item.unread) markSingleAsRead(item.id);
              }}
              className={`p-5 flex items-start justify-between gap-4 hover:bg-[#161A1D] transition-colors group block ${
                item.unread ? "bg-[#111417]" : "bg-[#0E1114]/50 opacity-90"
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                      item.category === "Payment overdue"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : item.category === "Payment received"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : item.category === "Client risk changed"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-[#8492A6]">
                    {formatRelativeTime(item.created_at)}
                  </span>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                  )}
                </div>
                <div className="text-sm font-medium text-[#F0F3F6] group-hover:text-blue-400 transition-colors pt-0.5">
                  {item.headline}
                </div>
                <p className="text-xs text-[#8492A6] leading-relaxed max-w-2xl">
                  {item.detail}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs text-[#555E6C] group-hover:text-blue-400 transition-colors shrink-0 pt-1">
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NotificationItem {
  id: string;
  category: "Payment overdue" | "Payment received" | "Client risk changed" | "Upcoming due date";
  headline: string;
  detail: string;
  timestamp: string;
  unread: boolean;
  link: string;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    category: "Payment overdue",
    headline: "Northstar Renovations — Invoice #1042 is 4 days overdue.",
    detail: "Net 15 milestone maturity passed on Oct 14. One-click reminder available in invoices.",
    timestamp: "2 hours ago",
    unread: true,
    link: "/app/invoices",
  },
  {
    id: "2",
    category: "Payment received",
    headline: "Apex Construction paid Invoice #1038.",
    detail: "Direct deposit of $8,400 received and cleared through bank integration.",
    timestamp: "Yesterday, 3:45 PM",
    unread: true,
    link: "/app/payments",
  },
  {
    id: "3",
    category: "Client risk changed",
    headline: "Northstar Renovations' payment reliability has decreased.",
    detail: "Indicator updated to 92/100 due to minor retainage settlement lag.",
    timestamp: "Oct 12, 2024",
    unread: false,
    link: "/app/clients/1",
  },
  {
    id: "4",
    category: "Upcoming due date",
    headline: "Summit Commercial — Invoice #1045 due in 3 days.",
    detail: "Automated courtesy payment notice scheduled for dispatch tomorrow at 9:00 AM.",
    timestamp: "Oct 10, 2024",
    unread: false,
    link: "/app/invoices",
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#22262B]">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#F0F3F6]">
            Notifications
          </h1>
          <p className="text-xs text-[#8492A6] mt-1">
            Actionable payment alerts, due date warnings, and reliability updates.
          </p>
        </div>
        <span className="text-xs font-mono text-[#8492A6]">
          2 unread
        </span>
      </div>

      {/* 2. Actionable Notifications List (Clean and uncrowded) */}
      <div className="divide-y divide-[#22262B] border border-[#22262B] rounded-lg bg-[#111417]">
        {NOTIFICATIONS.map((item) => (
          <Link
            key={item.id}
            href={item.link}
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
                <span className="text-xs text-[#8492A6]">{item.timestamp}</span>
              </div>
              <div className="text-sm font-medium text-[#F0F3F6] group-hover:text-blue-400 transition-colors pt-0.5">
                {item.headline}
              </div>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                {item.detail}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#555E6C] group-hover:text-[#F0F3F6] shrink-0 mt-2 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}

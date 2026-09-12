import * as React from "react";
import Link from "next/link";
import { Shield, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
              <span className="text-amber-400 font-black text-xs">Q</span>
            </div>
            <span className="text-white font-bold text-base tracking-tight">
              ONcue
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 text-xs">
              Payment Intelligence for Trades & Contractors
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#risk-reads" className="hover:text-white transition-colors">
              Live Reads
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Platform
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms & Privacy
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} ONcue Inc. All rights reserved. Built for modern contractors.
          </p>
          <p className="text-slate-400 text-center md:text-right max-w-lg">
            Notice: ONcue provides informational business analytics and workflow tools for contractors. It does not constitute a consumer credit report or credit score under the Fair Credit Reporting Act (FCRA).
          </p>
        </div>
      </div>
    </footer>
  );
}

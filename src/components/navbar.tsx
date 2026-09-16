"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ShieldAlert, ChevronRight, Activity } from "lucide-react";

interface NavbarProps {
  onCheckClientClick: () => void;
}

export function Navbar({ onCheckClientClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-amber-500/50 transition-colors shadow-sm">
              <svg
                className="w-5 h-5"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1"
                  y="1"
                  width="30"
                  height="30"
                  rx="8"
                  className="stroke-slate-700 group-hover:stroke-amber-500/60 transition-colors"
                  strokeWidth="2"
                />
                <path
                  d="M9 17.5L13.5 22L23 11"
                  stroke="#F59E0B"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                ONcue
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  AI v2.4
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a
              href="#risk-reads"
              className="hover:text-white transition-colors"
            >
              Live Reads
            </a>
            <a
              href="#how-it-works"
              className="hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="hover:text-white transition-colors"
            >
              Platform
            </a>
            <a
              href="#faq"
              className="hover:text-white transition-colors"
            >
              FAQ
            </a>
          </nav>
        </div>

        {/* Action Buttons & Status */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400 mr-2 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>41,000+ Invoices Tracked</span>
          </div>

          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-300 hover:text-white"
            >
              Sign In
            </Button>
          </Link>

          <Button
            size="sm"
            onClick={onCheckClientClick}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/10"
          >
            Check a Client
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <Button
            size="sm"
            onClick={onCheckClientClick}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs h-8 px-2.5"
          >
            Check Client
          </Button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm">
            <a
              href="#risk-reads"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Live Reads
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              How It Works
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              Platform
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-white"
            >
              FAQ
            </a>
          </nav>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <Button
                variant="outline"
                className="w-full justify-center"
              >
                Sign In
              </Button>
            </Link>
            <Button
              className="w-full justify-center bg-amber-500 text-slate-950 font-bold"
              onClick={() => {
                setMobileMenuOpen(false);
                onCheckClientClick();
              }}
            >
              Check a Client Risk
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

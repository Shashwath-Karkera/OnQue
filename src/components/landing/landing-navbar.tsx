"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

interface LandingNavbarProps {
  onCheckClientClick: () => void;
}

export function LandingNavbar({ onCheckClientClick }: LandingNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: ONcue Brand Logo / Wordmark */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center group-hover:bg-amber-500/20 transition-all shadow-sm">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 12.5L8.5 17L20 5.5"
                  stroke="#D97706"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-950">
                ON<span className="text-amber-600">cue</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                Payment Intelligence
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#product-studio" className="hover:text-slate-950 transition-colors">
              Product Studio
            </a>
            <a href="#how-it-works" className="hover:text-slate-950 transition-colors">
              How It Works
            </a>
            <a href="#problem" className="hover:text-slate-950 transition-colors">
              The Problem
            </a>
            <a href="#security" className="hover:text-slate-950 transition-colors">
              Security
            </a>
          </nav>
        </div>

        {/* Right Navigation CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onCheckClientClick}
            className="text-xs text-slate-700 hover:text-slate-950 font-semibold px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
          >
            Check Client Risk
          </button>

          <Link href="/app">
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-700 hover:text-slate-950 hover:bg-slate-100 text-xs font-semibold px-3 h-8"
            >
              Log in
            </Button>
          </Link>

          <Link href="/app">
            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-8 px-3.5 rounded-lg shadow-sm shadow-amber-500/20 flex items-center gap-1.5 transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <Link href="/app">
            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-7 px-2.5 rounded-md"
            >
              Get Started
            </Button>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-950 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-200 bg-white/98 backdrop-blur-2xl px-5 pt-3 pb-5 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-sm">
            <a
              href="#product-studio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-950"
            >
              Product Studio
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-950"
            >
              How It Works
            </a>
            <a
              href="#problem"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-950"
            >
              The Problem
            </a>
            <a
              href="#security"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-950"
            >
              Security
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onCheckClientClick();
              }}
              className="w-full text-center py-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg"
            >
              Check a Client Reliability
            </button>
            <Link href="/app" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs h-9">
                Open App Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

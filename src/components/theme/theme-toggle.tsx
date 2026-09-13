"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`relative p-2 rounded-lg border transition-all flex items-center justify-center ${
        theme === "dark"
          ? "bg-[#161A1D] border-[#22262B] text-[#F0F3F6] hover:bg-[#22262B] hover:text-amber-400"
          : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200 hover:text-blue-600"
      } ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}

"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function LogoEntryLoader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<
    "calibrating" | "analyzing" | "decrypting" | "ready"
  >("calibrating");

  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (pct < 30) {
        setPhase("calibrating");
      } else if (pct < 65) {
        setPhase("analyzing");
      } else if (pct < 90) {
        setPhase("decrypting");
      } else {
        setPhase("ready");
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setVisible(false);
        }, 400);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const phaseLabels = {
    calibrating: "CALIBRATING TRADE LEDGER",
    analyzing: "COMPILING SETTLEMENT HISTORIES",
    decrypting: "OPTIMIZING RISK ENGINE",
    ready: "SYSTEM ONLINE",
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="entry-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px)",
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#06080B] text-white select-none overflow-hidden"
        >
          {/* 1. Subtle Precision Ambient Grid */}
          <div
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />

          {/* 2. Deep Luminous Radial Volumetric Lighting */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Core electric cyan glow */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.35, 0.55, 0.35],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.5,
                ease: "easeInOut",
              }}
              className="w-[520px] h-[520px] rounded-full bg-[#1D4ED8]/30 blur-[130px]"
            />
            {/* Outer deep royal blue glow */}
            <div className="w-[720px] h-[720px] rounded-full bg-[#0A1F44]/40 blur-[170px]" />
            {/* Accent gold spark glow reflecting the arrow */}
            <motion.div
              animate={{
                opacity: [0.15, 0.35, 0.15],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.8,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="w-[280px] h-[280px] rounded-full bg-[#EAB308]/15 blur-[90px]"
            />
          </div>

          {/* 3. Concentric Orbital Energy Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Orbital Ring 1 - slow clockwise */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
              className="w-[360px] sm:w-[460px] h-[360px] sm:h-[460px] rounded-full border border-blue-500/10 border-dashed"
            />
            {/* Orbital Ring 2 - counter-clockwise */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 32, ease: "linear" }}
              className="w-[480px] sm:w-[620px] h-[480px] sm:h-[620px] rounded-full border border-white/[0.04]"
            >
              {/* Satellite pulse on ring */}
              <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60A5FA] -top-1 left-1/2 absolute" />
            </motion.div>
          </div>

          {/* 4. Foreground Hero Stage */}
          <div className="relative z-10 flex flex-col items-center max-w-2xl px-6 text-center">
            {/* Floating Metallic Emblem Container with dynamic elevation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-8"
            >
              {/* Floating idle breathing animation */}
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Backlight reflection aura */}
                <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-blue-600/25 via-cyan-500/15 to-amber-500/20 blur-2xl pointer-events-none" />

                {/* Glass Prism Display Frame */}
                <div className="relative w-80 sm:w-[420px] aspect-[21/9] rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#0E1726]/90 via-[#090E17]/95 to-[#05080E] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(37,99,235,0.2)] backdrop-blur-xl flex items-center justify-center p-3">
                  {/* Subtle top glare edge */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                  {/* High-fidelity Metallic Logo */}
                  <Image
                    src="/oncue-logo.png"
                    alt="ONcue Logo"
                    fill
                    className="object-contain p-3 filter drop-shadow-[0_10px_28px_rgba(15,23,42,0.85)]"
                    priority
                  />

                  {/* Primary High-Gloss Metallic Sweep */}
                  <motion.div
                    initial={{ x: "-150%" }}
                    animate={{ x: "250%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.6,
                      ease: "easeInOut",
                      delay: 0.4,
                    }}
                    className="absolute inset-0 w-2/5 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
                  />

                  {/* Secondary subtle warm gold glimmer sweep matching arrow */}
                  <motion.div
                    initial={{ x: "-180%" }}
                    animate={{ x: "280%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.2,
                      ease: "easeInOut",
                      delay: 1.2,
                    }}
                    className="absolute inset-0 w-1/4 h-full bg-gradient-to-r from-transparent via-amber-400/20 to-transparent skew-x-12 pointer-events-none"
                  />

                  {/* Modern corner bracket accents */}
                  <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30" />
                  <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30" />
                  <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30" />
                  <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30" />
                </div>
              </motion.div>
            </motion.div>

            {/* Typography: Wordmark without redundant badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="space-y-1.5 mb-7"
            >
              <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F0F3F6] font-sans">
                ON<span className="text-[#3B82F6]">cue</span>
              </div>
              <p className="text-xs sm:text-sm text-[#8492A6] font-normal tracking-wide">
                Payment intelligence for contractors.
              </p>
            </motion.div>

            {/* 5-Second Precision Progress Console */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-72 sm:w-96 space-y-3"
            >
              {/* Sleek Multistage Track Bar */}
              <div className="relative w-full h-[3px] bg-[#111417] border border-white/10 rounded-full overflow-hidden p-[0.5px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#1D4ED8] via-[#38BDF8] to-[#F59E0B] rounded-full shadow-[0_0_16px_rgba(56,189,248,0.7)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Live Telemetry Status Details */}
              <div className="flex items-center justify-between text-[11px] font-mono tracking-wider">
                <span className="text-[#8492A6] flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                  </span>
                  <span>{phaseLabels[phase]}</span>
                </span>
                <span className="font-semibold text-[#F0F3F6] tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

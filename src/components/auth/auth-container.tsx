"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
} from "lucide-react";
import { evaluatePasswordStrength } from "@/lib/auth/security";
import {
  signInWithGooglePopup,
  isFirebaseConfigured,
} from "@/lib/firebase/client";

interface AuthContainerProps {
  initialMode?: "login" | "register";
}

export function AuthContainer({ initialMode = "login" }: AuthContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/app";

  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [step, setStep] = useState<"form" | "otp">("form");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP state
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Status & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Password evaluation
  const passwordStrength = evaluatePasswordStrength(password);

  // Handle Resend Cooldown Countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Clear errors on mode switch
  const handleModeChange = (newMode: "login" | "register") => {
    setMode(newMode);
    setStep("form");
    setErrorMessage(null);
    setSuccessMessage(null);
    window.history.replaceState(null, "", newMode === "login" ? "/login" : "/register");
  };

  // ---------------------------------------------------------------------------
  // 1. FORM SUBMISSION (LOGIN / REGISTER)
  // ---------------------------------------------------------------------------
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (mode === "register") {
      if (!name.trim()) {
        setErrorMessage("Please enter your full name.");
        return;
      }
      if (!passwordStrength.isValid) {
        setErrorMessage(
          "Password must contain at least 8 characters, an uppercase letter, and a number."
        );
        return;
      }
    }

    setIsLoading(true);

    try {
      if (mode === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          if (data.requiresVerification) {
            setStep("otp");
            setResendCooldown(60);
            setSuccessMessage(
              "Account verification required. A 6-digit code has been sent to your email."
            );
          } else {
            setErrorMessage(data.error || "Authentication failed.");
          }
          setIsLoading(false);
          return;
        }

        setSuccessMessage("Authentication successful! Redirecting...");
        setTimeout(() => {
          router.push(callbackUrl);
          router.refresh();
        }, 600);
      } else {
        // Register flow -> Sends OTP
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          setErrorMessage(data.error || "Failed to initiate registration.");
          setIsLoading(false);
          return;
        }

        setStep("otp");
        setResendCooldown(60);
        setSuccessMessage(`A 6-digit verification code has been sent to ${email}`);
        setIsLoading(false);
      }
    } catch {
      setErrorMessage("Network error occurred. Please check your connection.");
      setIsLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // 2. OTP INPUT HANDLING
  // ---------------------------------------------------------------------------
  const handleOtpChange = (index: number, value: string) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    if (!cleaned && value !== "") return;

    const newOtp = [...otp];
    newOtp[index] = cleaned.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (cleaned && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }

    // Auto-submit if all 6 digits entered
    if (index === 5 && cleaned && newOtp.every((digit) => digit.length === 1)) {
      triggerVerifyOtp(newOtp.join(""));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);

    if (pasted.length === 6) {
      otpInputsRef.current[5]?.focus();
      triggerVerifyOtp(pasted);
    } else {
      otpInputsRef.current[pasted.length]?.focus();
    }
  };

  const triggerVerifyOtp = async (codeToVerify?: string) => {
    const finalCode = codeToVerify || otp.join("");
    if (finalCode.length !== 6) {
      setErrorMessage("Please enter all 6 digits of the code.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: finalCode,
          purpose: "register",
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Verification failed.");
        setIsLoading(false);
        return;
      }

      // If user registered with OTP, switch to login tab and ask them to sign in
      if (data.requiresLogin) {
        setSuccessMessage("Account verified successfully! Please enter your password to sign in.");
        setMode("login");
        setStep("form");
        setPassword("");
        setIsLoading(false);
        return;
      }

      setSuccessMessage("Authentication successful! Redirecting...");
      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 700);
    } catch {
      setErrorMessage("Verification request failed. Please try again.");
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, purpose: "register" }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Failed to resend code.");
        setIsLoading(false);
        return;
      }

      setResendCooldown(60);
      setSuccessMessage("A fresh verification code was sent to your email.");
      setOtp(["", "", "", "", "", ""]);
      otpInputsRef.current[0]?.focus();
      setIsLoading(false);
    } catch {
      setErrorMessage("Could not resend code. Please try again.");
      setIsLoading(false);
    }
  };

  // ---------------------------------------------------------------------------
  // 3. GOOGLE SIGN-IN & REGISTRATION (FIREBASE)
  // ---------------------------------------------------------------------------
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (!isFirebaseConfigured()) {
        setErrorMessage(
          "Google Sign-In is not configured: Missing Firebase credentials in .env.local"
        );
        setIsGoogleLoading(false);
        return;
      }

      const { idToken } = await signInWithGooglePopup();

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken, action: mode }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.error || "Google authentication failed.");
        setIsGoogleLoading(false);
        return;
      }

      if (data.requiresLogin) {
        setSuccessMessage(
          data.message ||
            "Account registered successfully! Please click 'Continue with Google' to sign in."
        );
        setMode("login");
        setStep("form");
        window.history.replaceState(null, "", "/login");
        setIsGoogleLoading(false);
        return;
      }

      setSuccessMessage("Google authentication successful! Redirecting to dashboard...");
      setTimeout(() => {
        router.push(callbackUrl);
        router.refresh();
      }, 600);
    } catch (err: any) {
      console.error("[Google Auth Error]", err);
      const code = err?.code || "";
      const msg = err?.message || "";

      if (
        code === "auth/configuration-not-found" ||
        msg.includes("configuration-not-found")
      ) {
        setErrorMessage(
          "Google Sign-In is not enabled yet in your Firebase project. In the Firebase Console: Go to Authentication > Sign-in method, click Google, toggle Enable, and save."
        );
      } else if (
        code === "auth/popup-closed-by-user" ||
        msg.includes("popup-closed-by-user")
      ) {
        setErrorMessage("Google sign-in popup was closed before completing.");
      } else if (
        code === "auth/popup-blocked" ||
        msg.includes("popup-blocked")
      ) {
        setErrorMessage(
          "Sign-in popup was blocked by your browser. Please allow popups for this site."
        );
      } else if (
        code === "auth/unauthorized-domain" ||
        msg.includes("unauthorized-domain")
      ) {
        setErrorMessage(
          "This domain is not authorized in Firebase Console. Add 'localhost' under Authentication > Settings > Authorized domains."
        );
      } else if (code === "auth/cancelled-popup-request") {
        // User triggered another popup before previous completed
      } else if (
        code === "auth/network-request-failed" ||
        msg.includes("network-request-failed")
      ) {
        setErrorMessage(
          "Network error connecting to Google. Please check your internet connection."
        );
      } else {
        setErrorMessage(msg || "Failed to authenticate with Google.");
      }
      setIsGoogleLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#F0F3F6] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-amber-500/20 selection:text-amber-300">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Centered Auth Card */}
      <div className="w-full max-w-[440px] rounded-2xl border border-[#22262B] bg-[#111417]/95 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] p-6 sm:p-8 relative z-10 mx-auto">
        {/* Brand Header */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-amber-500/50 transition-colors shadow-sm">
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
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              ON<span className="text-[#3B82F6]">cue</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {step === "otp"
              ? "Verify your email"
              : mode === "login"
              ? "Sign in to ONcue"
              : "Create your account"}
          </h1>
          <p className="text-xs text-[#8492A6] mt-1">
            {step === "otp"
              ? "Enter the 6-digit code sent to your inbox"
              : mode === "login"
              ? "Welcome back. Enter your credentials to continue."
              : "Get started with automated payment intelligence."}
          </p>
        </div>

        {/* Tab Switcher (Visible in Form step) */}
        {step === "form" && (
          <div className="flex items-center gap-1.5 p-1 bg-[#0B0D0F] border border-[#22262B] rounded-xl w-full mb-6">
            <button
              type="button"
              onClick={() => handleModeChange("login")}
              className={`relative flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === "login"
                  ? "text-white bg-[#1E232A] shadow-sm"
                  : "text-[#8492A6] hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleModeChange("register")}
              className={`relative flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === "register"
                  ? "text-white bg-[#1E232A] shadow-sm"
                  : "text-[#8492A6] hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* Feedback / Alert Banners */}
        <AnimatePresence mode="wait">
          {errorMessage && (
            <motion.div
              key="auth-error-banner"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              key="auth-success-banner"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================================================================= */}
        {/* STEP 1: FORM (LOGIN / REGISTER)                                   */}
        {/* ================================================================= */}
        {step === "form" && (
          <div className="space-y-4">
            {/* 1-Click Google Sign In / Registration */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading || isGoogleLoading}
              className="w-full h-11 rounded-xl bg-[#16191E] hover:bg-[#1C2128] border border-[#2A3038] hover:border-[#3E4756] text-[#F0F3F6] font-semibold text-xs flex items-center justify-center gap-3 transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isGoogleLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              ) : (
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>
                {isGoogleLoading
                  ? "Connecting to Google..."
                  : mode === "login"
                  ? "Continue with Google"
                  : "Sign up with Google"}
              </span>
            </button>

            {/* Centered Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-[#22262B] w-full" />
              <span className="bg-[#111417] px-3 text-[10px] font-semibold tracking-wider text-[#6E7681] uppercase absolute">
                or with email
              </span>
            </div>

            {/* Input Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Full Name (Register Mode Only) */}
              {mode === "register" && (
                <div>
                  <label className="block text-xs font-medium text-[#CED5DC] mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#6E7681] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Marcus Vance"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-[#CED5DC] mb-1.5">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6E7681] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-[#3B82F6] transition-colors"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-[#CED5DC]">
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          "To reset your password, please contact your administrator or request an OTP verification."
                        )
                      }
                      className="text-[11px] text-[#3B82F6] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#6E7681] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#0B0D0F] border border-[#22262B] text-xs text-[#F0F3F6] placeholder-[#555E6C] focus:outline-none focus:border-[#3B82F6] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1.5 text-[#6E7681] hover:text-[#CED5DC] absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Password Strength Meter (Register Mode Only) */}
                {mode === "register" && password.length > 0 && (
                  <div className="mt-2.5 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#8492A6]">Strength</span>
                      <span
                        className={`font-semibold ${
                          passwordStrength.score >= 3
                            ? "text-emerald-400"
                            : passwordStrength.score === 2
                            ? "text-amber-400"
                            : "text-rose-400"
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="grid grid-cols-4 gap-1.5 h-1.5">
                      {[1, 2, 3, 4].map((stepIdx) => (
                        <div
                          key={stepIdx}
                          className={`rounded-full transition-all duration-300 ${
                            passwordStrength.score >= stepIdx
                              ? passwordStrength.score >= 3
                                ? "bg-emerald-500"
                                : passwordStrength.score === 2
                                ? "bg-amber-500"
                                : "bg-rose-500"
                              : "bg-[#22262B]"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Criteria Checklist */}
                    <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px] text-[#8492A6]">
                      <span
                        className={`flex items-center gap-1 ${
                          passwordStrength.hasLength ? "text-emerald-400" : ""
                        }`}
                      >
                        • 8+ characters
                      </span>
                      <span
                        className={`flex items-center gap-1 ${
                          passwordStrength.hasUpper ? "text-emerald-400" : ""
                        }`}
                      >
                        • Uppercase letter
                      </span>
                      <span
                        className={`flex items-center gap-1 ${
                          passwordStrength.hasLower ? "text-emerald-400" : ""
                        }`}
                      >
                        • Lowercase letter
                      </span>
                      <span
                        className={`flex items-center gap-1 ${
                          passwordStrength.hasNumber ? "text-emerald-400" : ""
                        }`}
                      >
                        • Number or symbol
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 disabled:opacity-50 mt-3 cursor-pointer"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <>
                    <span>
                      {mode === "login"
                        ? "Sign In"
                        : "Continue to Email Verification"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Toggle Note */}
            <div className="text-center pt-3 text-xs text-[#8492A6]">
              {mode === "login" ? (
                <span>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => handleModeChange("register")}
                    className="text-amber-400 hover:underline font-semibold cursor-pointer"
                  >
                    Create Account
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => handleModeChange("login")}
                    className="text-amber-400 hover:underline font-semibold cursor-pointer"
                  >
                    Sign In
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 2: 6-DIGIT OTP VERIFICATION SCREEN                         */}
        {/* ================================================================= */}
        {step === "otp" && (
          <motion.div
            key="otp-step-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Back to form button */}
            <button
              type="button"
              onClick={() => setStep("form")}
              className="inline-flex items-center gap-1.5 text-xs text-[#8492A6] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back / Change Email</span>
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-3">
                <Mail className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold tracking-tight text-white">
                Check your inbox
              </h3>
              <p className="text-xs text-[#8492A6] leading-relaxed">
                We sent a 6-digit code to{" "}
                <strong className="text-[#F0F3F6] font-semibold">{email}</strong>.
                <span className="block text-amber-400/90 mt-1 font-medium">Expires in 1 minute.</span>
              </p>
            </div>

            {/* 6 Auto-Advancing Digit Boxes */}
            <div className="flex items-center justify-center gap-2 py-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    otpInputsRef.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  onPaste={handleOtpPaste}
                  className="w-11 h-13 sm:w-12 sm:h-14 rounded-xl bg-[#0B0D0F] border border-[#22262B] text-center text-xl font-bold font-mono text-[#F0F3F6] focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all shadow-inner"
                />
              ))}
            </div>



            {/* Verify CTA */}
            <button
              type="button"
              onClick={() => triggerVerifyOtp()}
              disabled={isLoading || otp.some((d) => !d)}
              className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              ) : (
                <>
                  <span>Verify Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Resend Cooldown */}
            <div className="flex items-center justify-between text-xs text-[#8492A6] pt-2 border-t border-[#22262B]">
              <span>Didn&apos;t receive email?</span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || isLoading}
                className={`font-semibold transition-colors ${
                  resendCooldown > 0
                    ? "text-[#555E6C] cursor-not-allowed"
                    : "text-amber-400 hover:underline cursor-pointer"
                }`}
              >
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : "Resend Code"}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

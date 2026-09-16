import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthContainer } from "@/components/auth/auth-container";

export const metadata: Metadata = {
  title: "Sign In - ONcue Payment Intelligence",
  description:
    "Secure enterprise login for ONcue payment risk analysis and contractor cashflow defense.",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0D0F] flex items-center justify-center text-[#8492A6]">
          Loading secure session...
        </div>
      }
    >
      <AuthContainer initialMode="login" />
    </Suspense>
  );
}

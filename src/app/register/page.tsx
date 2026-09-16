import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthContainer } from "@/components/auth/auth-container";

export const metadata: Metadata = {
  title: "Create Account - ONcue Payment Intelligence",
  description:
    "Register for ONcue with verified email OTP security and bank-grade encryption.",
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0D0F] flex items-center justify-center text-[#8492A6]">
          Loading registration shield...
        </div>
      }
    >
      <AuthContainer initialMode="register" />
    </Suspense>
  );
}

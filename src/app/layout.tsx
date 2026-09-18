import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ONcue — Know How a Client Pays Before You Start the Job",
  description:
    "Payment intelligence platform for contractors and freelancers. Predict payment behavior, manage milestone schedules, and reduce risk before and during every project.",
  keywords: [
    "contractor payment risk",
    "invoice risk score",
    "construction payment terms",
    "credit intelligence for trades",
    "late payment prediction",
    "contractor milestone schedule",
  ],
  authors: [{ name: "ONcue Intelligence" }],
  openGraph: {
    title: "ONcue — Stop Chasing Payments. Start Making Smarter Decisions.",
    description:
      "Payment intelligence platform for contractors and freelancers. Predict payment behavior and protect your cash flow.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { LogoEntryLoader } from "@/components/brand/logo-entry-loader";
import { ThemeProvider } from "@/components/theme/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#070708] text-[#F4F4F5] font-sans antialiased selection:bg-[#F95721]/30 selection:text-white flex flex-col`}
      >
        <ThemeProvider>
          <LogoEntryLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

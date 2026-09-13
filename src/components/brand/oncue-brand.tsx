"use client";

import Image from "next/image";
import Link from "next/link";

interface OncueBrandProps {
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  withBadge?: boolean;
  className?: string;
  linkHref?: string;
}

export function OncueBrand({
  size = "md",
  withTagline = false,
  withBadge = true,
  className = "",
  linkHref = "/",
}: OncueBrandProps) {
  const dimensions = {
    sm: { img: 24, text: "text-base", sub: "text-[10px]" },
    md: { img: 30, text: "text-lg", sub: "text-xs" },
    lg: { img: 40, text: "text-2xl", sub: "text-sm" },
  }[size];

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <div className="relative flex items-center justify-center shrink-0">
        <Image
          src="/oncue-logo.png"
          alt="ONcue"
          width={dimensions.img}
          height={dimensions.img}
          priority
          className="object-contain drop-shadow-[0_2px_8px_rgba(37,99,235,0.25)] rounded-sm"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-semibold tracking-tight text-[#F0F3F6] ${dimensions.text} leading-none`}
          >
            ON<span className="text-[#3B82F6]">cue</span>
          </span>
          {withBadge && (
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#161A1D] text-[#8492A6] border border-[#22262B] leading-none">
              Intelligence
            </span>
          )}
        </div>
        {withTagline && (
          <span
            className={`text-[#8492A6] tracking-tight mt-0.5 ${dimensions.sub} leading-none`}
          >
            Payment intelligence for contractors
          </span>
        )}
      </div>
    </div>
  );

  if (linkHref) {
    return (
      <Link href={linkHref} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}

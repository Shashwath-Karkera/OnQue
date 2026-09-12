import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20 hover:bg-amber-400 hover:shadow-amber-500/30",
        destructive:
          "bg-rose-600 text-white shadow-sm hover:bg-rose-500",
        outline:
          "border border-slate-800 bg-slate-900/60 backdrop-blur-sm text-slate-200 hover:bg-slate-800/80 hover:text-white hover:border-slate-700",
        secondary:
          "bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700/50",
        ghost:
          "text-slate-300 hover:bg-slate-800/60 hover:text-white",
        link:
          "text-amber-400 underline-offset-4 hover:underline p-0 h-auto",
        glow:
          "bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold shadow-[0_0_24px_rgba(245,158,11,0.35)] hover:shadow-[0_0_32px_rgba(245,158,11,0.5)] hover:brightness-105",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base font-medium",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

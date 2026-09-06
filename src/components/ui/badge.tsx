import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "success"
    | "warning"
    | "destructive"
    | "indigo"
    | "verified"
    | "derived";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-all duration-200 backdrop-blur-sm";

  const variants = {
    default: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 shadow-xs",
    secondary: "bg-slate-200/70 dark:bg-white/[0.06] text-slate-800 dark:text-slate-200 border border-slate-300/80 dark:border-white/[0.08]",
    outline: "border border-slate-300 dark:border-white/[0.12] text-slate-700 dark:text-slate-200 bg-transparent",
    success: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 shadow-xs",
    warning: "bg-amber-500/15 text-amber-900 dark:text-amber-300 border border-amber-500/30 shadow-xs",
    destructive: "bg-red-500/15 text-red-800 dark:text-red-300 border border-red-500/30 shadow-xs",
    indigo: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 shadow-xs",
    verified:
      "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 shadow-xs",
    derived:
      "bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/[0.06]",
  };

  return <div className={cn(base, variants[variant], className)} {...props} />;
}

export { Badge };

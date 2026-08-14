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
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors";

  const variants = {
    default: "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30",
    secondary: "bg-slate-800 text-slate-300 border border-slate-700",
    outline: "border border-slate-700 text-slate-300",
    success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
    destructive: "bg-red-500/15 text-red-400 border border-red-500/30",
    indigo: "bg-indigo-500/20 text-indigo-300 border border-indigo-400/30",
    verified:
      "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-xs",
    derived:
      "bg-slate-900/80 text-slate-400 border border-slate-700/60",
  };

  return <div className={cn(base, variants[variant], className)} {...props} />;
}

export { Badge };

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "success"
    | "accent"
    | "glass";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.97] active:shadow-inner";

    const variants = {
      default:
        "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 hover:shadow-indigo-500/25 hover:shadow-lg hover:-translate-y-0.5",
      secondary:
        "bg-slate-100 hover:bg-slate-200/80 text-slate-800 border border-slate-200/80 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] dark:text-slate-100 dark:border-white/[0.08] backdrop-blur-sm hover:-translate-y-0.5 shadow-xs",
      outline:
        "border border-slate-300 dark:border-white/[0.1] bg-transparent text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.05] hover:text-slate-950 dark:hover:text-white backdrop-blur-sm",
      ghost:
        "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-950 dark:hover:text-white hover:backdrop-blur-sm",
      destructive:
        "bg-red-600 text-white hover:bg-red-500 shadow-sm hover:shadow-red-500/25 hover:shadow-lg hover:-translate-y-0.5",
      success:
        "bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm hover:shadow-emerald-500/25 hover:shadow-lg hover:-translate-y-0.5",
      accent:
        "bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600 bg-[length:200%_100%] text-white shadow-lg shadow-indigo-500/20 hover:bg-[position:100%_0] hover:shadow-indigo-500/40 hover:shadow-xl hover:-translate-y-0.5",
      glass:
        "bg-white/70 dark:bg-white/[0.06] backdrop-blur-xl text-slate-900 dark:text-white border border-slate-200/80 dark:border-white/[0.1] shadow-md hover:bg-white/90 dark:hover:bg-white/[0.1] hover:border-indigo-400/40 dark:hover:border-white/[0.18] hover:shadow-xl hover:-translate-y-0.5",
    };

    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 rounded-lg px-3 text-xs",
      lg: "h-12 rounded-xl px-6 text-base font-semibold",
      icon: "h-10 w-10 p-0 rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

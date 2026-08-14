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
    | "accent";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.98]";

    const variants = {
      default:
        "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 hover:shadow-indigo-500/25 hover:shadow-md",
      secondary:
        "bg-slate-800 text-slate-100 hover:bg-slate-700 hover:text-white border border-slate-700/60",
      outline:
        "border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800/80 hover:text-white hover:border-slate-600",
      ghost:
        "text-slate-300 hover:bg-slate-800/60 hover:text-white",
      destructive:
        "bg-red-600 text-white hover:bg-red-500 shadow-sm hover:shadow-red-500/25 hover:shadow-md",
      success:
        "bg-emerald-600 text-white hover:bg-emerald-500 shadow-sm hover:shadow-emerald-500/25 hover:shadow-md",
      accent:
        "bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-sm hover:from-indigo-400 hover:to-blue-500 hover:shadow-indigo-500/30 hover:shadow-lg",
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

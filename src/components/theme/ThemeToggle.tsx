"use client";

import React, { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  if (!mounted) {
    return (
      <button
        type="button"
        className={`relative p-2 rounded-xl text-slate-400 glass-subtle border border-white/[0.08] transition-all duration-300 opacity-60 ${className}`}
        aria-label="Toggle theme"
      >
        <span className="h-4 w-4 block" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative flex items-center gap-2 p-2 rounded-xl transition-all duration-300 cursor-pointer active:scale-95 select-none ${
        isDark
          ? "bg-slate-900/80 hover:bg-slate-800/90 text-amber-300 border border-amber-500/20 shadow-xs hover:shadow-amber-500/10 hover:border-amber-400/30"
          : "bg-white/90 hover:bg-slate-100 text-indigo-600 border border-slate-200/90 shadow-xs hover:shadow-indigo-500/15 hover:border-indigo-400/40"
      } ${className}`}
      title={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Night Mode"}
    >
      <div className="relative h-4 w-4 flex items-center justify-center overflow-hidden">
        {/* Sun Icon (Rotates and scales in when in dark mode, ready to switch to light) */}
        <Sun
          className={`h-4 w-4 transition-all duration-500 transform ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-amber-400 fill-amber-400/20"
              : "-rotate-90 scale-0 opacity-0 absolute"
          }`}
        />
        {/* Moon Icon (Rotates and scales in when in light mode, ready to switch to dark) */}
        <Moon
          className={`h-4 w-4 transition-all duration-500 transform ${
            !isDark
              ? "rotate-0 scale-100 opacity-100 text-indigo-600 fill-indigo-600/20"
              : "rotate-90 scale-0 opacity-0 absolute"
          }`}
        />
      </div>

      {showLabel && (
        <span
          className={`text-xs font-semibold tracking-wide transition-colors ${
            isDark ? "text-slate-300 group-hover:text-white" : "text-slate-700 group-hover:text-slate-900"
          }`}
        >
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}

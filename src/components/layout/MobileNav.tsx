"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Target,
  FileCheck2,
  BarChart3,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  const tabs = [
    {
      label: "Home",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Learn",
      href: "/learn",
      icon: BookOpen,
    },
    {
      label: "Practice",
      href: "/practice",
      icon: Target,
    },
    {
      label: "Mocks",
      href: "/mocks",
      icon: FileCheck2,
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/85 dark:bg-[#0b0f19]/90 backdrop-blur-xl border-t border-slate-200/80 dark:border-white/[0.08] px-2 py-1 safe-bottom shadow-lg">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/dashboard" && pathname.startsWith(tab.href));

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-150 relative min-w-[50px]",
                isActive
                  ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              )}
            >
              {isActive && (
                <span className="absolute -top-1 w-6 h-1 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50"></span>
              )}
              <tab.icon
                className={cn(
                  "h-5 w-5 transition-transform",
                  isActive ? "scale-110 text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"
                )}
              />
              <span className="text-[10px] tracking-tight mt-1">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
